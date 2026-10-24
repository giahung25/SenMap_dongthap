from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_ENV_PATH = Path(__file__).resolve().parents[3] / ".env"
BACKEND_ENV_PATH = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    PROJECT_NAME: str = "SenMap Đồng Tháp - Hệ thống Bản đồ số Di tích Văn hóa"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres123"
    POSTGRES_DB: str = "ditich_dongthap"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres123@localhost:5432/ditich_dongthap"

    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    # Bounding Box Guard Đồng Tháp (WGS 84 - SRID 4326)
    DONG_THAP_LON_MIN: float = 105.15
    DONG_THAP_LON_MAX: float = 105.95
    DONG_THAP_LAT_MIN: float = 10.10
    DONG_THAP_LAT_MAX: float = 10.95

    model_config = SettingsConfigDict(
        env_file=(str(ROOT_ENV_PATH), str(BACKEND_ENV_PATH)),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def sqlalchemy_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+psycopg://", 1)
        return url

    @property
    def cors_origin_list(self) -> List[str]:
        origins = [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]
        for default_origin in ["http://localhost:5173", "http://127.0.0.1:5173", "*"]:
            if default_origin not in origins:
                origins.append(default_origin)
        return origins


settings = Settings()
