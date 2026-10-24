from typing import List, Optional
from fastapi import APIRouter, Body, Depends, HTTPException, Query, Request, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.monument_repo import MonumentRepository
from app.schemas.monument import (
    CategoryOut,
    DistrictOut,
    HealthResponse,
    MonumentCreate,
    MonumentFeature,
    MonumentFeatureCollection,
    NearbyFeatureCollection,
    QrScanRequest,
    QrScanResponse,
    StatsResponse,
)
from app.services.monument_service import MonumentService

router = APIRouter(prefix="/api/v1", tags=["SenMap Đồng Tháp GIS API"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Kiểm tra trạng thái kết nối CSDL PostGIS",
    description="Kiểm tra kết nối trực tiếp tới PostgreSQL/PostGIS, trả về phiên bản PostGIS và tổng số di tích hiện có.",
)
def health_check(db: Session = Depends(get_db)) -> HealthResponse:
    data = MonumentRepository.check_health(db)
    return HealthResponse(**data)


@router.get(
    "/categories",
    response_model=List[CategoryOut],
    summary="Danh sách danh mục loại hình di tích",
    description="Trả về toàn bộ các loại hình di tích văn hóa - lịch sử trên địa bàn tỉnh Đồng Tháp kèm số lượng di tích.",
)
def list_categories(db: Session = Depends(get_db)) -> List[CategoryOut]:
    rows = MonumentRepository.get_categories(db)
    return [CategoryOut(**r) for r in rows]


@router.get(
    "/districts",
    response_model=List[DistrictOut],
    summary="Danh sách đơn vị hành chính cấp Huyện/Thành phố",
    description="Trả về 12 đơn vị hành chính (TP Cao Lãnh, TP Sa Đéc, TP Hồng Ngự và 9 huyện) của tỉnh Đồng Tháp.",
)
def list_districts(db: Session = Depends(get_db)) -> List[DistrictOut]:
    rows = MonumentRepository.get_districts(db)
    return [DistrictOut(**r) for r in rows]


@router.get(
    "/monuments",
    response_model=MonumentFeatureCollection,
    summary="Danh sách di tích chuẩn GeoJSON FeatureCollection (RFC 7946)",
    description=(
        "Trả về danh sách các di tích lịch sử - văn hóa tỉnh Đồng Tháp theo chuẩn GeoJSON FeatureCollection "
        "(tọa độ `[lon, lat]` WGS84 SRID 4326). Hỗ trợ tìm kiếm mờ (`q`), lọc theo danh mục (`id_danh_muc`), "
        "đơn vị hành chính (`id_huyen_tp`) và cấp xếp hạng (`cap_xep_hang`)."
    ),
)
def get_monuments(
    q: Optional[str] = Query(default=None, description="Từ khóa tìm kiếm mờ theo tên di tích, tên khác hoặc địa chỉ"),
    id_danh_muc: Optional[int] = Query(default=None, description="Lọc theo ID danh mục loại hình di tích"),
    id_huyen_tp: Optional[int] = Query(default=None, description="Lọc theo ID huyện/thành phố"),
    cap_xep_hang: Optional[str] = Query(default=None, description="Lọc theo cấp xếp hạng di tích"),
    db: Session = Depends(get_db),
) -> MonumentFeatureCollection:
    fc = MonumentService.get_feature_collection(
        db=db,
        q=q,
        id_danh_muc=id_danh_muc,
        id_huyen_tp=id_huyen_tp,
        cap_xep_hang=cap_xep_hang,
    )
    return MonumentFeatureCollection(**fc)


@router.get(
    "/monuments/nearby",
    response_model=NearbyFeatureCollection,
    summary="Tìm kiếm di tích lân cận theo bán kính (PostGIS Spatial Query)",
    description=(
        "Sử dụng hàm không gian PostGIS `ST_DWithin` (trên chỉ mục GiST) và `ST_DistanceSphere` để tìm "
        "các di tích trong bán kính `radius_km` tính từ tọa độ `(lon, lat)` của người dùng."
    ),
)
def get_nearby_monuments(
    lon: float = Query(default=105.63, description="Kinh độ (Longitude) WGS84, mặc định trung tâm TP Cao Lãnh"),
    lat: float = Query(default=10.45, description="Vĩ độ (Latitude) WGS84, mặc định trung tâm TP Cao Lãnh"),
    radius_km: float = Query(default=10.0, gt=0, le=200.0, description="Bán kính tìm kiếm tính bằng km"),
    db: Session = Depends(get_db),
) -> NearbyFeatureCollection:
    result = MonumentService.get_nearby_monuments(
        db=db,
        lon=lon,
        lat=lat,
        radius_km=radius_km,
    )
    return NearbyFeatureCollection(**result)


@router.get(
    "/monuments/{monument_id}",
    response_model=MonumentFeature,
    summary="Chi tiết 1 di tích (GeoJSON Feature kèm hình ảnh & QR Code)",
    description=(
        "Trả về thông tin chi tiết của một di tích theo chuẩn GeoJSON Feature, bao gồm thư viện hình ảnh "
        "`hinh_anh`, thông tin mã định danh `qr_code`, đồng thời tự động tăng `luot_xem + 1`."
    ),
)
def get_monument_detail(
    monument_id: int,
    db: Session = Depends(get_db),
) -> MonumentFeature:
    feature = MonumentService.get_monument_detail(
        db=db,
        monument_id=monument_id,
        increment_view=True,
    )
    if not feature:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy di tích với id={monument_id}",
        )
    return MonumentFeature(**feature)


@router.post(
    "/monuments",
    response_model=MonumentFeature,
    status_code=status.HTTP_201_CREATED,
    summary="Tạo mới di tích (áp dụng Bounding Box Guard Đồng Tháp)",
    description=(
        "Tạo mới một di tích văn hóa trên địa bàn tỉnh Đồng Tháp. Bắt buộc kiểm tra tọa độ nằm trong khung "
        "Bounding Box Đồng Tháp (`105.15 <= lon <= 105.95`, `10.10 <= lat <= 10.95`). Nếu vi phạm sẽ trả về HTTP 422."
    ),
)
def create_monument(
    payload: MonumentCreate,
    db: Session = Depends(get_db),
) -> MonumentFeature:
    feature = MonumentService.create_monument(db=db, payload=payload)
    return MonumentFeature(**feature)


@router.delete(
    "/monuments/{monument_id}",
    status_code=status.HTTP_200_OK,
    summary="Xóa di tích theo ID",
    description="Xóa một di tích khỏi cơ sở dữ liệu (hỗ trợ quản trị CMS và dọn dẹp dữ liệu kiểm thử).",
)
def delete_monument(
    monument_id: int,
    db: Session = Depends(get_db),
):
    deleted = MonumentRepository.delete_monument(db=db, monument_id=monument_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy di tích với id={monument_id}",
        )
    return {"status": "deleted", "id": monument_id}


@router.post(
    "/monuments/{monument_id}/qr-scan",
    response_model=QrScanResponse,
    summary="Ghi nhận lượt quét mã QR tại thực địa",
    description=(
        "Ghi vết truy cập thực địa vào bảng `nhat_ky_quet_qr` (lưu `user_agent`, `ip_address`, `thoi_gian`) "
        "và tăng bộ đếm `luot_quet_qr + 1` cho di tích tương ứng."
    ),
)
def record_monument_qr_scan(
    monument_id: int,
    request: Request,
    payload: Optional[QrScanRequest] = Body(default=None),
    db: Session = Depends(get_db),
) -> QrScanResponse:
    user_agent = (
        (payload.user_agent if payload and payload.user_agent else None)
        or request.headers.get("user-agent")
        or "SenMap-QR-Client"
    )
    ip_address = (
        (payload.ip_address if payload and payload.ip_address else None)
        or (request.client.host if request.client else None)
        or "127.0.0.1"
    )

    result = MonumentRepository.record_qr_scan(
        db=db,
        monument_id=monument_id,
        user_agent=user_agent,
        ip_address=ip_address,
    )
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy di tích với id={monument_id} để ghi nhận QR scan",
        )
    return QrScanResponse(**result)


@router.get(
    "/stats",
    response_model=StatsResponse,
    summary="Thống kê tổng quan Dashboard Admin",
    description=(
        "Trả về số liệu tổng hợp phục vụ Dashboard Quản trị: tổng số di tích, phân bố theo cấp xếp hạng, "
        "theo danh mục, theo huyện/thành phố, tổng lượt xem trực tuyến và tổng lượt quét mã QR thực địa."
    ),
)
def get_dashboard_stats(db: Session = Depends(get_db)) -> StatsResponse:
    stats = MonumentRepository.get_stats(db)
    return StatsResponse(**stats)
