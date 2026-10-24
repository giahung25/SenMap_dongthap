from sqlalchemy import (
    Column,
    Integer,
    BigInteger,
    String,
    Text,
    Boolean,
    Numeric,
    DateTime,
    ForeignKey,
    func,
)
from sqlalchemy.orm import relationship
from app.core.database import Base


class DanhMuc(Base):
    __tablename__ = "danh_muc"

    id = Column(Integer, primary_key=True, index=True)
    ten_danh_muc = Column(String(100), nullable=False, unique=True)
    mo_ta = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    di_tich_list = relationship("DiTich", back_populates="danh_muc")


class HuyenTp(Base):
    __tablename__ = "huyen_tp"

    id = Column(Integer, primary_key=True, index=True)
    ten_huyen_tp = Column(String(100), nullable=False, unique=True)
    loai = Column(String(20), default="huyen")

    di_tich_list = relationship("DiTich", back_populates="huyen_tp")


class QuanTriVien(Base):
    __tablename__ = "quan_tri_vien"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    ho_ten = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False, default="editor")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class DiTich(Base):
    __tablename__ = "di_tich"

    id = Column(Integer, primary_key=True, index=True)
    id_danh_muc = Column(Integer, ForeignKey("danh_muc.id", ondelete="RESTRICT"), nullable=False)
    id_huyen_tp = Column(Integer, ForeignKey("huyen_tp.id", ondelete="RESTRICT"), nullable=False)
    ten_di_tich = Column(String(255), nullable=False)
    ten_khac = Column(String(255), nullable=True)
    cap_xep_hang = Column(String(50), nullable=False)
    dia_chi = Column(String(255), nullable=False)
    lich_su = Column(Text, nullable=False)
    thoi_gian_mo_cua = Column(String(100), default="Tự do tham quan")
    gia_ve = Column(Numeric(12, 2), default=0.00)
    luu_y_tham_quan = Column(Text, nullable=True)
    trang_thai = Column(String(20), nullable=False, default="published")
    luot_xem = Column(Integer, nullable=False, default=0)
    luot_quet_qr = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    danh_muc = relationship("DanhMuc", back_populates="di_tich_list")
    huyen_tp = relationship("HuyenTp", back_populates="di_tich_list")
    hinh_anh_list = relationship("HinhAnh", back_populates="di_tich", cascade="all, delete-orphan")
    qr_code = relationship("QrCode", back_populates="di_tich", uselist=False, cascade="all, delete-orphan")


class HinhAnh(Base):
    __tablename__ = "hinh_anh"

    id = Column(Integer, primary_key=True, index=True)
    id_di_tich = Column(Integer, ForeignKey("di_tich.id", ondelete="CASCADE"), nullable=False)
    url = Column(String(500), nullable=False)
    chu_thich = Column(String(255), nullable=True)
    is_thumbnail = Column(Boolean, default=False)
    thu_tu = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    di_tich = relationship("DiTich", back_populates="hinh_anh_list")


class QrCode(Base):
    __tablename__ = "qr_code"

    id = Column(Integer, primary_key=True, index=True)
    id_di_tich = Column(Integer, ForeignKey("di_tich.id", ondelete="CASCADE"), nullable=False, unique=True)
    qr_url = Column(String(500), nullable=False)
    file_path = Column(String(500), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    di_tich = relationship("DiTich", back_populates="qr_code")


class NhatKyQuetQr(Base):
    __tablename__ = "nhat_ky_quet_qr"

    id = Column(BigInteger, primary_key=True, index=True)
    id_di_tich = Column(Integer, ForeignKey("di_tich.id", ondelete="SET NULL"), nullable=True)
    thoi_gian = Column(DateTime(timezone=True), server_default=func.now())
    user_agent = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)
