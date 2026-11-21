import socket
import sys
from pathlib import Path

import pytest

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from fastapi.testclient import TestClient
from app.core.config import settings
from app.main import app

client = TestClient(app)


def _is_postgis_reachable() -> bool:
    try:
        with socket.create_connection(
            (settings.POSTGRES_HOST, int(settings.POSTGRES_PORT)),
            timeout=1.0,
        ):
            return True
    except OSError:
        return False


pytestmark = pytest.mark.skipif(
    not _is_postgis_reachable(),
    reason=(
        f"PostgreSQL/PostGIS chưa khởi chạy trên "
        f"{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT} (cần bật Docker Desktop / postgis container)"
    ),
)


def test_health_check_postgis():
    """Kiểm tra kết nối PostGIS, phiên bản PostGIS và tổng số 20 di tích."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    assert "3." in data["postgis_version"]
    assert data["total_monuments"] == 20
    assert data["tong_di_tich"] == 20


def test_categories_and_districts():
    """Kiểm tra danh sách 5 danh mục di tích và 12 đơn vị hành chính tỉnh Đồng Tháp."""
    cat_res = client.get("/api/v1/categories")
    assert cat_res.status_code == 200
    categories = cat_res.json()
    assert len(categories) == 5
    assert any("Óc Eo" in c["ten_danh_muc"] for c in categories)

    dist_res = client.get("/api/v1/districts")
    assert dist_res.status_code == 200
    districts = dist_res.json()
    assert len(districts) == 12
    assert any(d["ten_huyen_tp"] == "TP Cao Lãnh" for d in districts)
    assert any(d["ten_huyen_tp"] == "TP Sa Đéc" for d in districts)


def test_get_20_monuments_geojson_rfc7946():
    """Kiểm tra danh sách 20 di tích trả về đúng chuẩn GeoJSON FeatureCollection (RFC 7946)."""
    response = client.get("/api/v1/monuments")
    assert response.status_code == 200
    fc = response.json()
    assert fc["type"] == "FeatureCollection"
    assert fc["total"] == 20
    assert len(fc["features"]) == 20

    for feature in fc["features"]:
        assert feature["type"] == "Feature"
        assert feature["geometry"]["type"] == "Point"
        coords = feature["geometry"]["coordinates"]
        assert len(coords) == 2
        lon, lat = coords[0], coords[1]
        # Kiểm tra chuẩn RFC 7946 [lon, lat] nằm trong Bounding Box Đồng Tháp
        assert 105.15 <= lon <= 105.95, f"Kinh độ {lon} ngoài Đồng Tháp"
        assert 10.10 <= lat <= 10.95, f"Vĩ độ {lat} ngoài Đồng Tháp"
        props = feature["properties"]
        assert props["ten_di_tich"]
        assert props["thumbnail_url"]


def test_filter_monuments_by_query_and_criteria():
    """Kiểm tra bộ lọc tìm kiếm mờ (q), danh mục, huyện/thành phố và cấp xếp hạng."""
    # 1. Tìm kiếm mờ theo từ khóa "Gò Tháp"
    res_q = client.get("/api/v1/monuments", params={"q": "Gò Tháp"})
    assert res_q.status_code == 200
    features_q = res_q.json()["features"]
    assert len(features_q) >= 1
    assert any("Gò Tháp" in f["properties"]["ten_di_tich"] for f in features_q)

    # 2. Lọc theo TP Sa Đéc (id_huyen_tp = 2)
    res_sadec = client.get("/api/v1/monuments", params={"id_huyen_tp": 2})
    assert res_sadec.status_code == 200
    features_sadec = res_sadec.json()["features"]
    assert len(features_sadec) == 3
    for f in features_sadec:
        assert f["properties"]["ten_huyen_tp"] == "TP Sa Đéc"

    # 3. Lọc theo cấp xếp hạng "Quốc gia đặc biệt"
    res_rank = client.get(
        "/api/v1/monuments",
        params={"cap_xep_hang": "Quốc gia đặc biệt"},
    )
    assert res_rank.status_code == 200
    features_rank = res_rank.json()["features"]
    assert len(features_rank) >= 1
    assert any("Gò Tháp" in f["properties"]["ten_di_tich"] for f in features_rank)


def test_nearby_monuments_postgis_spatial_query():
    """Kiểm tra truy vấn không gian PostGIS ST_DWithin & ST_DistanceSphere tại TP Cao Lãnh."""
    response = client.get(
        "/api/v1/monuments/nearby",
        params={"lon": 105.63, "lat": 10.45, "radius_km": 10.0},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert data["total"] >= 3
    features = data["features"]

    distances = [f["properties"]["distance_km"] for f in features]
    assert distances == sorted(distances)
    for d in distances:
        assert 0.0 <= d <= 10.0

    names = [f["properties"]["ten_di_tich"] for f in features]
    assert any("Nguyễn Sinh Sắc" in n for n in names)


def test_get_monument_detail_and_increment_views():
    """Kiểm tra chi tiết 1 di tích (kèm hinh_anh, qr_code) và tự động tăng luot_xem + 1."""
    res1 = client.get("/api/v1/monuments/1")
    assert res1.status_code == 200
    feat1 = res1.json()
    assert feat1["type"] == "Feature"
    assert feat1["id"] == 1
    views_before = feat1["properties"]["luot_xem"]
    assert isinstance(feat1["properties"]["hinh_anh"], list)
    assert len(feat1["properties"]["hinh_anh"]) >= 1
    assert feat1["properties"]["qr_code"] is not None
    assert "qr_url" in feat1["properties"]["qr_code"]

    res2 = client.get("/api/v1/monuments/1")
    assert res2.status_code == 200
    views_after = res2.json()["properties"]["luot_xem"]
    assert views_after == views_before + 1

    # Kiểm tra 404 khi ID không tồn tại
    res_404 = client.get("/api/v1/monuments/999999")
    assert res_404.status_code == 404


def test_bounding_box_guard_dong_thap_422_and_valid_create():
    """Kiểm tra Bounding Box Guard Đồng Tháp chặn tọa độ ngoài tỉnh (HTTP 422) và cho phép tọa độ hợp lệ."""
    # 1. Tọa độ ngoài tỉnh Đồng Tháp (lon=106.7, lat=10.7 - TP.HCM) -> Phải bị chặn 422
    invalid_payload_lon = {
        "ten_di_tich": "Di tích thử nghiệm ngoài tỉnh",
        "id_danh_muc": 1,
        "id_huyen_tp": 1,
        "cap_xep_hang": "Cấp tỉnh",
        "dia_chi": "Quận 1, TP. Hồ Chí Minh",
        "lon": 106.7,
        "lat": 10.7,
        "lich_su": "Tọa độ nằm ngoài khung Bounding Box Đồng Tháp.",
    }
    res_422_lon = client.post("/api/v1/monuments", json=invalid_payload_lon)
    assert res_422_lon.status_code == 422

    # 2. Tọa độ vĩ độ ngoài tỉnh Đồng Tháp (lon=105.63, lat=9.8 - Cà Mau/Bạc Liêu) -> Phải bị chặn 422
    invalid_payload_lat = {
        "ten_di_tich": "Di tích thử nghiệm sai vĩ độ",
        "id_danh_muc": 1,
        "id_huyen_tp": 1,
        "cap_xep_hang": "Cấp tỉnh",
        "dia_chi": "Ngoài tỉnh Đồng Tháp",
        "lon": 105.63,
        "lat": 9.8,
        "lich_su": "Vĩ độ nhỏ hơn 10.10.",
    }
    res_422_lat = client.post("/api/v1/monuments", json=invalid_payload_lat)
    assert res_422_lat.status_code == 422

    # 3. Tọa độ hợp lệ trong lòng TP Cao Lãnh, Đồng Tháp -> Tạo thành công 201 và xóa dọn dẹp
    valid_payload = {
        "ten_di_tich": "Di tích Kiểm thử Tự động Pytest Cao Lãnh",
        "ten_khac": "Điểm test GIS Đồng Tháp",
        "id_danh_muc": 1,
        "id_huyen_tp": 1,
        "cap_xep_hang": "Cấp tỉnh",
        "dia_chi": "Phường 1, TP Cao Lãnh, Đồng Tháp",
        "lon": 105.635,
        "lat": 10.455,
        "lich_su": "Di tích phục vụ kiểm thử tự động Bounding Box Guard Đồng Tháp.",
        "gia_ve": 0,
    }
    res_create = client.post("/api/v1/monuments", json=valid_payload)
    assert res_create.status_code == 201
    created_feature = res_create.json()
    new_id = created_feature["id"]
    assert created_feature["geometry"]["coordinates"] == [105.635, 10.455]

    # Dọn dẹp bản ghi test để bảo toàn đúng 20 di tích chuẩn trong CSDL
    res_del = client.delete(f"/api/v1/monuments/{new_id}")
    assert res_del.status_code == 200


def test_qr_scan_logging_and_stats():
    """Kiểm tra ghi log quét mã QR thực địa và endpoint thống kê tổng quan Dashboard Admin."""
    stats_before = client.get("/api/v1/stats").json()
    qr_before = stats_before["tong_luot_quet_qr"]

    scan_res = client.post(
        "/api/v1/monuments/1/qr-scan",
        json={"user_agent": "Pytest-Mobile-QR-Scanner/1.0", "ip_address": "192.168.1.100"},
    )
    assert scan_res.status_code == 200
    scan_data = scan_res.json()
    assert scan_data["status"] == "success"
    assert scan_data["id_di_tich"] == 1
    assert scan_data["log_id"] > 0

    stats_after = client.get("/api/v1/stats").json()
    assert stats_after["tong_di_tich"] == 20
    assert stats_after["tong_luot_quet_qr"] == qr_before + 1
    assert "Quốc gia" in stats_after["theo_cap_xep_hang"]
    assert "Quốc gia đặc biệt" in stats_after["theo_cap_xep_hang"]


def test_standardized_historical_and_legal_records():
    """Xác minh dữ liệu pháp lý & lịch sử đã chuẩn hóa trên CSDL PostGIS (DT-009, DT-010, DT-012, DT-018)."""
    # DT-009: Làng nghề dệt chiếu Định Yên — QĐ 3084/QĐ-BVHTTDL ngày 09/09/2013
    dt09 = client.get("/api/v1/monuments/9").json()["properties"]
    assert dt09["cap_xep_hang"] == "Quốc gia"
    assert "3084/QĐ-BVHTTDL" in dt09["lich_su"]
    assert "09/09/2013" in dt09["lich_su"]
    assert "2684/QĐ-BVHTTDL" not in dt09["lich_su"]

    # DT-010: Đền thờ Thượng tướng Trần Văn Năng — QĐ 04/2004/QĐ-BVHTT, năm mất 1835
    dt10 = client.get("/api/v1/monuments/10").json()["properties"]
    assert dt10["cap_xep_hang"] == "Quốc gia"
    assert "04/2004/QĐ-BVHTT" in dt10["lich_su"]
    assert "1763–1835" in dt10["lich_su"]
    assert "1838" not in dt10["lich_su"]
    assert "65/2004" not in dt10["lich_su"]

    # DT-012: Bảo tàng Tỉnh Đồng Tháp — 5 Bảo vật Quốc gia
    dt12 = client.get("/api/v1/monuments/12").json()["properties"]
    assert dt12["cap_xep_hang"] == "Cấp tỉnh"
    assert "5 Bảo vật Quốc gia" in dt12["lich_su"]

    # DT-018: Đình Long Thuận — Cấp tỉnh (QĐ 1354/QĐ-UBND-HC), lập 1876, sắc phong Bảo Đại 1936
    dt18 = client.get("/api/v1/monuments/18").json()["properties"]
    assert dt18["cap_xep_hang"] == "Cấp tỉnh"
    assert "1354/QĐ-UBND-HC" in dt18["lich_su"]
    assert "1876" in dt18["lich_su"]
    assert "1936" in dt18["lich_su"]

    # Phân bố cấp xếp hạng tổng thể trên 20 di tích
    stats = client.get("/api/v1/stats").json()["theo_cap_xep_hang"]
    assert stats == {
        "Quốc gia đặc biệt": 2,
        "Quốc gia": 10,
        "Cấp tỉnh": 4,
        "Điểm du lịch/Làng nghề": 4,
    }

