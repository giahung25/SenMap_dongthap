import csv
import json
import re
import sys
from collections import Counter
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.main import app
from app.schemas.monument import MonumentCreate, MonumentFeatureCollection
from app.services.monument_service import MonumentService

REPO_ROOT = Path(__file__).resolve().parents[2]
INIT_SQL_PATH = REPO_ROOT / "database" / "Scripts" / "01_init_schema.sql"
SEED_SQL_PATH = REPO_ROOT / "database" / "Mock_Data" / "02_seed_20_di_tich.sql"
DB_DOC_PATH = REPO_ROOT / "database" / "THIET_KE_CSDL_CHI_TIET.md"
FRONTEND_DATA_PATH = REPO_ROOT / "frontend" / "src" / "data" / "monumentsData.js"
PUBLIC_DIR = REPO_ROOT / "frontend" / "public"
GIS_CSV_PATH = REPO_ROOT / "gis_data" / "Toa_Do" / "01_DanhSach_KhaoSat_20DiTich.csv"
GIS_GEOJSON_PATH = REPO_ROOT / "gis_data" / "Toa_Do" / "02_DiTich_DongThap.geojson"
GIS_JSON_PATH = REPO_ROOT / "gis_data" / "Toa_Do" / "03_DanhSach_ChiTiet_20DiTich.json"

client = TestClient(app)

ROW_PATTERN = re.compile(
    r"\(\s*(\d+),\s*(\d+),\s*(\d+),\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*ST_SetSRID\(ST_MakePoint\(([0-9.]+),\s*([0-9.]+)\),\s*4326\),\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*'((?:[^']|'')*)',\s*([0-9.]+),\s*\n"
    r"\s*'((?:[^']|'')*)',\s*\n"
    r"\s*'([^']+)',\s*(\d+),\s*(\d+)\s*\n\s*\)"
)


def _load_seed_monuments():
    sql_text = SEED_SQL_PATH.read_text(encoding="utf-8")
    m = re.search(r"INSERT INTO di_tich.*?VALUES(.*?)ON CONFLICT", sql_text, re.S)
    assert m is not None, "Không tìm thấy câu lệnh INSERT INTO di_tich trong 02_seed_20_di_tich.sql"
    rows = ROW_PATTERN.findall(m.group(1))
    assert len(rows) == 20, f"Kỳ vọng 20 di tích trong SQL seed, tìm thấy {len(rows)}"
    parsed = {}
    for r in rows:
        mid = int(r[0])
        parsed[mid] = {
            "id": mid,
            "id_danh_muc": int(r[1]),
            "id_huyen_tp": int(r[2]),
            "ten_di_tich": r[3].replace("''", "'"),
            "ten_khac": r[4].replace("''", "'"),
            "cap_xep_hang": r[5].replace("''", "'"),
            "dia_chi": r[6].replace("''", "'"),
            "lon": float(r[7]),
            "lat": float(r[8]),
            "lich_su": r[9].replace("''", "'"),
            "thoi_gian_mo_cua": r[10].replace("''", "'"),
            "gia_ve": float(r[11]),
            "luu_y_tham_quan": r[12].replace("''", "'"),
            "trang_thai": r[13],
            "luot_xem": int(r[14]),
            "luot_quet_qr": int(r[15]),
        }
    return parsed


def _load_frontend_monuments():
    raw = FRONTEND_DATA_PATH.read_text(encoding="utf-8")
    marker = "export const INITIAL_MONUMENTS = "
    idx = raw.index(marker) + len(marker)
    arr = json.loads(raw[idx:].strip().rstrip(";"))
    return {m["id"]: m for m in arr}


def test_schema_and_design_doc_alignment():
    """Đảm bảo 01_init_schema.sql và THIET_KE_CSDL_CHI_TIET.md khớp 100% về CHECK constraint, BBox, Index và Trigger."""
    init_sql = INIT_SQL_PATH.read_text(encoding="utf-8")
    db_doc = DB_DOC_PATH.read_text(encoding="utf-8")

    for table in (
        "danh_muc",
        "huyen_tp",
        "quan_tri_vien",
        "di_tich",
        "hinh_anh",
        "qr_code",
        "nhat_ky_quet_qr",
    ):
        assert f"CREATE TABLE {table}" in init_sql
        assert f"`{table}`" in db_doc

    for rank in ("Quốc gia đặc biệt", "Quốc gia", "Cấp tỉnh", "Điểm du lịch/Làng nghề"):
        assert f"'{rank}'" in init_sql
        assert f"'{rank}'" in db_doc

    assert "chk_dong_thap_bbox" in init_sql
    assert "chk_dong_thap_bbox" in db_doc
    assert "USING GIST (geom)" in init_sql
    assert "gin_trgm_ops" in init_sql
    assert "trigger_update_timestamp()" in init_sql
    assert "trigger_update_timestamp()" in db_doc
    assert "update_modified_column()" not in db_doc


def test_seed_sql_idempotency_fk_images_and_qr():
    """Đảm bảo 02_seed_20_di_tich.sql idempotent, đủ 5 danh mục, 12 huyện, 20 ảnh tồn tại, 20 qr_code và reset sequence."""
    seed_sql = SEED_SQL_PATH.read_text(encoding="utf-8")
    monuments = _load_seed_monuments()

    for mid, m in monuments.items():
        assert 1 <= m["id_danh_muc"] <= 5, f"DT-{mid:03d} id_danh_muc không hợp lệ"
        assert 1 <= m["id_huyen_tp"] <= 12, f"DT-{mid:03d} id_huyen_tp không hợp lệ"
        assert m["trang_thai"] == "published"

    assert "ON CONFLICT (id) DO UPDATE SET" in seed_sql
    assert "DELETE FROM hinh_anh WHERE id_di_tich BETWEEN 1 AND 20 AND is_thumbnail = TRUE;" in seed_sql
    assert "INSERT INTO qr_code" in seed_sql
    assert "pg_get_serial_sequence('di_tich', 'id')" in seed_sql

    img_urls = re.findall(r"(/images/monuments/monument_\d+\.jpg)", seed_sql)
    assert len(img_urls) == 20
    for rel_url in img_urls:
        disk_path = PUBLIC_DIR / rel_url.lstrip("/")
        assert disk_path.exists() and disk_path.stat().st_size > 10_000, f"Thiếu ảnh {disk_path}"


def test_seed_sql_standardized_legal_historical_facts():
    """Kiểm chứng 100% các mốc pháp lý - lịch sử đã hiệu đính trong 02_seed_20_di_tich.sql."""
    monuments = _load_seed_monuments()

    # DT-001 & DT-002
    assert "9–11 ha" in monuments[1]["lich_su"]
    assert "1959/QĐ-TTg" in monuments[1]["lich_su"]
    assert "290–300 ha" in monuments[2]["lich_su"]

    # DT-009: QĐ 3084/QĐ-BVHTTDL ngày 09/09/2013
    assert monuments[9]["cap_xep_hang"] == "Quốc gia"
    assert "3084/QĐ-BVHTTDL" in monuments[9]["lich_su"]
    assert "09/09/2013" in monuments[9]["lich_su"]
    assert "2684/QĐ-BVHTTDL" not in monuments[9]["lich_su"]

    # DT-010: QĐ 04/2004/QĐ-BVHTT, năm mất 1835
    assert monuments[10]["cap_xep_hang"] == "Quốc gia"
    assert "04/2004/QĐ-BVHTT" in monuments[10]["lich_su"]
    assert "1763–1835" in monuments[10]["lich_su"]
    assert "1838" not in monuments[10]["lich_su"]
    assert "65/2004" not in monuments[10]["lich_su"]

    # DT-012: 5 Bảo vật Quốc gia
    assert monuments[12]["cap_xep_hang"] == "Cấp tỉnh"
    assert "5 Bảo vật Quốc gia" in monuments[12]["lich_su"]

    # DT-016: Sắc phong 1854
    assert "1854" in monuments[16]["lich_su"]

    # DT-017: Không gán nhầm tượng Quan Âm 33m
    assert "33 mét" not in monuments[17]["lich_su"]

    # DT-018: Đình Long Thuận = Cấp tỉnh (QĐ 1354/QĐ-UBND-HC)
    assert monuments[18]["cap_xep_hang"] == "Cấp tỉnh"
    assert "1354/QĐ-UBND-HC" in monuments[18]["lich_su"]
    assert "1876" in monuments[18]["lich_su"]
    assert "1936" in monuments[18]["lich_su"]

    counts = Counter(m["cap_xep_hang"] for m in monuments.values())
    assert dict(counts) == {
        "Quốc gia đặc biệt": 2,
        "Quốc gia": 10,
        "Cấp tỉnh": 4,
        "Điểm du lịch/Làng nghề": 4,
    }


def test_cross_layer_sync_sql_frontend_and_gis():
    """Đảm bảo 20/20 tọa độ, tên và cấp xếp hạng đồng bộ 100% giữa SQL, Frontend JS và 3 file GIS."""
    sql_monuments = _load_seed_monuments()
    js_monuments = _load_frontend_monuments()
    geojson_data = json.loads(GIS_GEOJSON_PATH.read_text(encoding="utf-8"))
    gis_json_list = json.loads(GIS_JSON_PATH.read_text(encoding="utf-8"))

    assert len(geojson_data["features"]) == 20
    assert len(gis_json_list) == 20

    geojson_map = {int(f["properties"]["id"]): f for f in geojson_data["features"]}
    gis_json_map = {int(item["id"]): item for item in gis_json_list}

    csv_rows = {}
    with GIS_CSV_PATH.open("r", encoding="utf-8-sig", newline="") as fh:
        for idx, row in enumerate(csv.DictReader(fh), start=1):
            csv_rows[idx] = row

    assert len(csv_rows) == 20

    for mid in range(1, 21):
        s = sql_monuments[mid]
        j = js_monuments[mid]
        gf = geojson_map[mid]
        gj = gis_json_map[mid]
        cr = csv_rows[mid]

        # Bounding Box Đồng Tháp
        assert 105.15 <= s["lon"] <= 105.95
        assert 10.10 <= s["lat"] <= 10.95

        # Khớp tọa độ tuyệt đối giữa SQL, JS, GeoJSON, JSON chi tiết và CSV
        assert abs(s["lon"] - float(j["lon"])) <= 1e-6
        assert abs(s["lat"] - float(j["lat"])) <= 1e-6
        assert abs(s["lon"] - float(gf["geometry"]["coordinates"][0])) <= 1e-6
        assert abs(s["lat"] - float(gf["geometry"]["coordinates"][1])) <= 1e-6
        assert abs(s["lon"] - float(gj["lon"])) <= 1e-6
        assert abs(s["lat"] - float(gj["lat"])) <= 1e-6

        # Khớp tên & cấp xếp hạng trên toàn bộ các tầng
        assert s["ten_di_tich"] == j["name"] == gj["ten_di_tich"]
        assert s["cap_xep_hang"] == j["ranking"] == gf["properties"]["cap_xep_hang"] == gj["cap_xep_hang"]
        assert s["cap_xep_hang"] == cr.get("Cap_Xep_Hang", s["cap_xep_hang"])


def test_fastapi_root_schema_bbox_guard_and_geojson_contract():
    """Kiểm thử tầng FastAPI/Pydantic v2/Service (Root, Bounding Box Guard 422, RFC 7946 FeatureCollection)."""
    # 1. Root endpoint hoạt động chuẩn
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["health"] == "/api/v1/health"

    # 2. Bounding Box Guard chặn tọa độ ngoài tỉnh (HTTP 422) ngay tại tầng Pydantic v2
    out_of_bounds_res = client.post(
        "/api/v1/monuments",
        json={
            "ten_di_tich": "Di tích ngoài tỉnh test",
            "id_danh_muc": 1,
            "id_huyen_tp": 1,
            "cap_xep_hang": "Cấp tỉnh",
            "dia_chi": "Quận 1, TP.HCM",
            "lon": 106.7,
            "lat": 10.7,
            "lich_su": "Ngoài khung Đồng Tháp",
        },
    )
    assert out_of_bounds_res.status_code == 422

    with pytest.raises(ValidationError):
        MonumentCreate(
            ten_di_tich="Sai vĩ độ",
            dia_chi="Ngoài tỉnh",
            lon=105.63,
            lat=9.8,
        )

    # 3. Validate chuyển đổi 20 bản ghi SQL seed sang chuẩn GeoJSON FeatureCollection (RFC 7946)
    monuments = _load_seed_monuments()
    features = []
    for mid in range(1, 21):
        row = dict(monuments[mid])
        row["thumbnail_url"] = f"/images/monuments/monument_{mid}.jpg"
        row["qr_url"] = f"https://senmap.dongthap.gov.vn/di-tich/{mid}"
        features.append(MonumentService.row_to_geojson_feature(row))

    fc = MonumentFeatureCollection(type="FeatureCollection", total=len(features), count=len(features), features=features)
    assert fc.total == 20
    assert fc.features[17].id == 18
    assert fc.features[17].properties.cap_xep_hang == "Cấp tỉnh"
    assert fc.features[17].geometry.coordinates == [105.309619, 10.755962]
