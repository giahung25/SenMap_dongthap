from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers.monuments import router as monuments_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Backend API Web GIS giới thiệu và tra cứu các di tích lịch sử, văn hóa trên địa bàn tỉnh Đồng Tháp. "
        "Sử dụng PostgreSQL 16 + PostGIS 3.4 (hệ quy chiếu WGS 84 - EPSG:4326) và chuẩn GeoJSON RFC 7946."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(monuments_router)


@app.get(
    "/",
    summary="Root Endpoint",
    description="Thông tin cơ bản và đường dẫn tài liệu Swagger UI của hệ thống SenMap Đồng Tháp.",
    tags=["Root"],
)
def root():
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/api/v1/health",
    }
