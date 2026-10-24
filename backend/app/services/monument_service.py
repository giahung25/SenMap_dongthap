from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session
from app.repositories.monument_repo import MonumentRepository
from app.schemas.monument import MonumentCreate


class MonumentService:
    """Service xử lý nghiệp vụ GIS và chuyển đổi chuẩn GeoJSON (RFC 7946)."""

    @staticmethod
    def row_to_geojson_feature(row: Dict[str, Any]) -> Dict[str, Any]:
        lon = float(row["lon"])
        lat = float(row["lat"])
        gia_ve = float(row["gia_ve"]) if row.get("gia_ve") is not None else 0.0
        distance_km = (
            float(row["distance_km"])
            if row.get("distance_km") is not None
            else None
        )

        properties: Dict[str, Any] = {
            "id": int(row["id"]),
            "ten_di_tich": row["ten_di_tich"],
            "ten_khac": row.get("ten_khac"),
            "id_danh_muc": int(row["id_danh_muc"]),
            "ten_danh_muc": row.get("ten_danh_muc"),
            "id_huyen_tp": int(row["id_huyen_tp"]),
            "ten_huyen_tp": row.get("ten_huyen_tp"),
            "loai_huyen_tp": row.get("loai_huyen_tp"),
            "cap_xep_hang": row["cap_xep_hang"],
            "dia_chi": row["dia_chi"],
            "lon": lon,
            "lat": lat,
            "kinh_do": lon,
            "vi_do": lat,
            "lich_su": row["lich_su"],
            "thoi_gian_mo_cua": row.get("thoi_gian_mo_cua") or "Tự do tham quan",
            "gia_ve": gia_ve,
            "luu_y_tham_quan": row.get("luu_y_tham_quan"),
            "trang_thai": row.get("trang_thai") or "published",
            "luot_xem": int(row.get("luot_xem") or 0),
            "luot_quet_qr": int(row.get("luot_quet_qr") or 0),
            "thumbnail_url": row.get("thumbnail_url"),
            "qr_url": row.get("qr_url"),
            "distance_km": distance_km,
            "hinh_anh": row.get("hinh_anh"),
            "qr_code": row.get("qr_code"),
            "created_at": row.get("created_at"),
            "updated_at": row.get("updated_at"),
        }

        feature: Dict[str, Any] = {
            "type": "Feature",
            "id": int(row["id"]),
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat],
            },
            "properties": properties,
            "hinh_anh": row.get("hinh_anh"),
            "qr_code": row.get("qr_code"),
            "distance_km": distance_km,
        }
        return feature

    @classmethod
    def get_feature_collection(
        cls,
        db: Session,
        q: Optional[str] = None,
        id_danh_muc: Optional[int] = None,
        id_huyen_tp: Optional[int] = None,
        cap_xep_hang: Optional[str] = None,
    ) -> Dict[str, Any]:
        rows = MonumentRepository.list_monuments(
            db=db,
            q=q,
            id_danh_muc=id_danh_muc,
            id_huyen_tp=id_huyen_tp,
            cap_xep_hang=cap_xep_hang,
        )
        features = [cls.row_to_geojson_feature(r) for r in rows]
        return {
            "type": "FeatureCollection",
            "total": len(features),
            "count": len(features),
            "features": features,
        }

    @classmethod
    def get_nearby_monuments(
        cls,
        db: Session,
        lon: float,
        lat: float,
        radius_km: float = 10.0,
    ) -> Dict[str, Any]:
        rows = MonumentRepository.find_nearby_monuments(
            db=db,
            lon=lon,
            lat=lat,
            radius_km=radius_km,
        )
        features = [cls.row_to_geojson_feature(r) for r in rows]
        items: List[Dict[str, Any]] = []
        for f in features:
            item = dict(f["properties"])
            item["geometry"] = f["geometry"]
            items.append(item)

        return {
            "type": "FeatureCollection",
            "center": {"lon": lon, "lat": lat},
            "radius_km": radius_km,
            "total": len(features),
            "count": len(features),
            "features": features,
            "items": items,
        }

    @classmethod
    def get_monument_detail(
        cls,
        db: Session,
        monument_id: int,
        increment_view: bool = True,
    ) -> Optional[Dict[str, Any]]:
        row = MonumentRepository.get_monument_by_id(
            db=db,
            monument_id=monument_id,
            increment_view=increment_view,
        )
        if not row:
            return None
        return cls.row_to_geojson_feature(row)

    @classmethod
    def create_monument(
        cls,
        db: Session,
        payload: MonumentCreate,
    ) -> Dict[str, Any]:
        row = MonumentRepository.create_monument(db=db, payload=payload)
        return cls.row_to_geojson_feature(row)
