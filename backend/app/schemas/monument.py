from datetime import datetime
from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from app.core.config import settings

VALID_CAP_XEP_HANG = (
    "Quốc gia đặc biệt",
    "Quốc gia",
    "Cấp tỉnh",
    "Điểm du lịch/Làng nghề",
)


def validate_dong_thap_bbox(lon: float, lat: float) -> None:
    """Kiểm tra tọa độ nằm trong khung Bounding Box tỉnh Đồng Tháp (WGS 84 - SRID 4326)."""
    if not (settings.DONG_THAP_LON_MIN <= lon <= settings.DONG_THAP_LON_MAX):
        raise ValueError(
            f"Kinh độ (lon={lon}) nằm ngoài phạm vi tỉnh Đồng Tháp "
            f"[{settings.DONG_THAP_LON_MIN} .. {settings.DONG_THAP_LON_MAX}]"
        )
    if not (settings.DONG_THAP_LAT_MIN <= lat <= settings.DONG_THAP_LAT_MAX):
        raise ValueError(
            f"Vĩ độ (lat={lat}) nằm ngoài phạm vi tỉnh Đồng Tháp "
            f"[{settings.DONG_THAP_LAT_MIN} .. {settings.DONG_THAP_LAT_MAX}]"
        )


class CategoryOut(BaseModel):
    id: int
    ten_danh_muc: str
    mo_ta: Optional[str] = None
    so_luong_di_tich: Optional[int] = 0

    model_config = ConfigDict(from_attributes=True)


class DistrictOut(BaseModel):
    id: int
    ten_huyen_tp: str
    loai: str
    so_luong_di_tich: Optional[int] = 0

    model_config = ConfigDict(from_attributes=True)


class ImageOut(BaseModel):
    id: int
    id_di_tich: int
    url: str
    chu_thich: Optional[str] = None
    is_thumbnail: bool = False
    thu_tu: int = 0

    model_config = ConfigDict(from_attributes=True)


class QrCodeOut(BaseModel):
    id: int
    id_di_tich: int
    qr_url: str
    file_path: str

    model_config = ConfigDict(from_attributes=True)


class GeoJSONGeometry(BaseModel):
    type: Literal["Point"] = "Point"
    coordinates: List[float] = Field(
        ...,
        description="Tọa độ chuẩn GeoJSON RFC 7946: [kinh_do (lon), vi_do (lat)]",
        min_length=2,
        max_length=2,
    )


class MonumentProperties(BaseModel):
    id: int
    ten_di_tich: str
    ten_khac: Optional[str] = None
    id_danh_muc: int
    ten_danh_muc: Optional[str] = None
    id_huyen_tp: int
    ten_huyen_tp: Optional[str] = None
    loai_huyen_tp: Optional[str] = None
    cap_xep_hang: str
    dia_chi: str
    lon: float
    lat: float
    kinh_do: float
    vi_do: float
    lich_su: str
    thoi_gian_mo_cua: Optional[str] = "Tự do tham quan"
    gia_ve: float = 0.0
    luu_y_tham_quan: Optional[str] = None
    trang_thai: str = "published"
    luot_xem: int = 0
    luot_quet_qr: int = 0
    thumbnail_url: Optional[str] = None
    qr_url: Optional[str] = None
    distance_km: Optional[float] = None
    hinh_anh: Optional[List[ImageOut]] = None
    qr_code: Optional[QrCodeOut] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class MonumentFeature(BaseModel):
    type: Literal["Feature"] = "Feature"
    id: int
    geometry: GeoJSONGeometry
    properties: MonumentProperties
    hinh_anh: Optional[List[ImageOut]] = None
    qr_code: Optional[QrCodeOut] = None
    distance_km: Optional[float] = None


class MonumentFeatureCollection(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    total: int
    count: int
    features: List[MonumentFeature]


class NearbyFeatureCollection(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    center: Dict[str, float]
    radius_km: float
    total: int
    count: int
    features: List[MonumentFeature]
    items: List[Dict[str, Any]]


class MonumentCreate(BaseModel):
    ten_di_tich: str = Field(..., min_length=2, max_length=255)
    ten_khac: Optional[str] = Field(default=None, max_length=255)
    id_danh_muc: int = Field(default=1, ge=1)
    id_huyen_tp: int = Field(default=1, ge=1)
    cap_xep_hang: str = Field(default="Cấp tỉnh")
    dia_chi: str = Field(..., min_length=3, max_length=255)
    lon: float = Field(..., description="Kinh độ WGS84 trong phạm vi Đồng Tháp [105.15 .. 105.95]")
    lat: float = Field(..., description="Vĩ độ WGS84 trong phạm vi Đồng Tháp [10.10 .. 10.95]")
    lich_su: str = Field(default="Di tích lịch sử văn hóa trên địa bàn tỉnh Đồng Tháp.")
    thoi_gian_mo_cua: Optional[str] = Field(default="Tự do tham quan", max_length=100)
    gia_ve: Optional[float] = Field(default=0.0, ge=0)
    luu_y_tham_quan: Optional[str] = None
    trang_thai: Optional[str] = Field(default="published")
    thumbnail_url: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_coordinate_aliases(cls, data: Any) -> Any:
        if isinstance(data, dict):
            copied = dict(data)
            if "lon" not in copied and "kinh_do" in copied:
                copied["lon"] = copied["kinh_do"]
            if "lon" not in copied and "lng" in copied:
                copied["lon"] = copied["lng"]
            if "lat" not in copied and "vi_do" in copied:
                copied["lat"] = copied["vi_do"]
            if "dia_chi" not in copied or not copied.get("dia_chi"):
                copied["dia_chi"] = "Tỉnh Đồng Tháp"
            if "lich_su" not in copied or not copied.get("lich_su"):
                copied["lich_su"] = "Di tích lịch sử văn hóa tiêu biểu tỉnh Đồng Tháp."
            return copied
        return data

    @field_validator("lon")
    @classmethod
    def check_lon_dong_thap(cls, v: float) -> float:
        if not (settings.DONG_THAP_LON_MIN <= v <= settings.DONG_THAP_LON_MAX):
            raise ValueError(
                f"Bounding Box Guard Đồng Tháp: Kinh độ (lon={v}) phải nằm trong khoảng "
                f"[{settings.DONG_THAP_LON_MIN}, {settings.DONG_THAP_LON_MAX}]"
            )
        return v

    @field_validator("lat")
    @classmethod
    def check_lat_dong_thap(cls, v: float) -> float:
        if not (settings.DONG_THAP_LAT_MIN <= v <= settings.DONG_THAP_LAT_MAX):
            raise ValueError(
                f"Bounding Box Guard Đồng Tháp: Vĩ độ (lat={v}) phải nằm trong khoảng "
                f"[{settings.DONG_THAP_LAT_MIN}, {settings.DONG_THAP_LAT_MAX}]"
            )
        return v

    @field_validator("cap_xep_hang")
    @classmethod
    def check_cap_xep_hang(cls, v: str) -> str:
        mapping = {
            "Điểm du lịch": "Điểm du lịch/Làng nghề",
            "Làng nghề": "Điểm du lịch/Làng nghề",
        }
        normalized = mapping.get(v, v)
        if normalized not in VALID_CAP_XEP_HANG:
            raise ValueError(
                f"Cấp xếp hạng không hợp lệ: '{v}'. Cho phép: {', '.join(VALID_CAP_XEP_HANG)}"
            )
        return normalized


class MonumentUpdate(BaseModel):
    ten_di_tich: Optional[str] = Field(default=None, min_length=2, max_length=255)
    ten_khac: Optional[str] = None
    id_danh_muc: Optional[int] = Field(default=None, ge=1)
    id_huyen_tp: Optional[int] = Field(default=None, ge=1)
    cap_xep_hang: Optional[str] = None
    dia_chi: Optional[str] = None
    lon: Optional[float] = None
    lat: Optional[float] = None
    lich_su: Optional[str] = None
    thoi_gian_mo_cua: Optional[str] = None
    gia_ve: Optional[float] = Field(default=None, ge=0)
    luu_y_tham_quan: Optional[str] = None
    trang_thai: Optional[str] = None
    thumbnail_url: Optional[str] = None

    @field_validator("lon")
    @classmethod
    def check_lon_dong_thap(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and not (settings.DONG_THAP_LON_MIN <= v <= settings.DONG_THAP_LON_MAX):
            raise ValueError(
                f"Bounding Box Guard Đồng Tháp: Kinh độ (lon={v}) phải nằm trong khoảng "
                f"[{settings.DONG_THAP_LON_MIN}, {settings.DONG_THAP_LON_MAX}]"
            )
        return v

    @field_validator("lat")
    @classmethod
    def check_lat_dong_thap(cls, v: Optional[float]) -> Optional[float]:
        if v is not None and not (settings.DONG_THAP_LAT_MIN <= v <= settings.DONG_THAP_LAT_MAX):
            raise ValueError(
                f"Bounding Box Guard Đồng Tháp: Vĩ độ (lat={v}) phải nằm trong khoảng "
                f"[{settings.DONG_THAP_LAT_MIN}, {settings.DONG_THAP_LAT_MAX}]"
            )
        return v


class QrScanRequest(BaseModel):
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None


class QrScanResponse(BaseModel):
    status: str = "success"
    id_di_tich: int
    ten_di_tich: str
    luot_quet_qr: int
    log_id: int
    thoi_gian: datetime
    message: str = "Đã ghi nhận lượt quét mã QR thực địa thành công"


class HealthResponse(BaseModel):
    status: str = "ok"
    database: str = "connected"
    postgis_version: str
    total_monuments: int
    tong_di_tich: int


class StatsResponse(BaseModel):
    tong_di_tich: int
    total_monuments: int
    tong_luot_xem: int
    total_views: int
    tong_luot_quet_qr: int
    total_qr_scans: int
    theo_cap_xep_hang: Dict[str, int]
    by_ranking: List[Dict[str, Any]]
    theo_danh_muc: List[Dict[str, Any]]
    theo_huyen_tp: List[Dict[str, Any]]
    top_di_tich: List[Dict[str, Any]]
