from typing import Any, Dict, List, Optional
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.schemas.monument import MonumentCreate, MonumentUpdate


class MonumentRepository:
    """Repository thực thi các truy vấn không gian PostGIS và CRUD cho di tích Đồng Tháp."""

    @staticmethod
    def check_health(db: Session) -> Dict[str, Any]:
        sql = text(
            """
            SELECT
                PostGIS_Version() AS postgis_version,
                (SELECT COUNT(*) FROM di_tich) AS total_monuments
            """
        )
        row = db.execute(sql).mappings().first()
        total = int(row["total_monuments"]) if row else 0
        return {
            "status": "ok",
            "database": "connected",
            "postgis_version": str(row["postgis_version"]) if row else "unknown",
            "total_monuments": total,
            "tong_di_tich": total,
        }

    @staticmethod
    def get_categories(db: Session) -> List[Dict[str, Any]]:
        sql = text(
            """
            SELECT
                dm.id,
                dm.ten_danh_muc,
                dm.mo_ta,
                COUNT(dt.id) AS so_luong_di_tich
            FROM danh_muc dm
            LEFT JOIN di_tich dt
                ON dt.id_danh_muc = dm.id AND dt.trang_thai = 'published'
            GROUP BY dm.id, dm.ten_danh_muc, dm.mo_ta
            ORDER BY dm.id ASC
            """
        )
        rows = db.execute(sql).mappings().all()
        return [dict(r) for r in rows]

    @staticmethod
    def get_districts(db: Session) -> List[Dict[str, Any]]:
        sql = text(
            """
            SELECT
                ht.id,
                ht.ten_huyen_tp,
                ht.loai,
                COUNT(dt.id) AS so_luong_di_tich
            FROM huyen_tp ht
            LEFT JOIN di_tich dt
                ON dt.id_huyen_tp = ht.id AND dt.trang_thai = 'published'
            GROUP BY ht.id, ht.ten_huyen_tp, ht.loai
            ORDER BY ht.id ASC
            """
        )
        rows = db.execute(sql).mappings().all()
        return [dict(r) for r in rows]

    @staticmethod
    def list_monuments(
        db: Session,
        q: Optional[str] = None,
        id_danh_muc: Optional[int] = None,
        id_huyen_tp: Optional[int] = None,
        cap_xep_hang: Optional[str] = None,
        trang_thai: Optional[str] = "published",
    ) -> List[Dict[str, Any]]:
        conditions = ["1=1"]
        params: Dict[str, Any] = {}

        if trang_thai:
            conditions.append("d.trang_thai = :trang_thai")
            params["trang_thai"] = trang_thai

        if id_danh_muc is not None:
            conditions.append("d.id_danh_muc = :id_danh_muc")
            params["id_danh_muc"] = id_danh_muc

        if id_huyen_tp is not None:
            conditions.append("d.id_huyen_tp = :id_huyen_tp")
            params["id_huyen_tp"] = id_huyen_tp

        if cap_xep_hang:
            conditions.append("d.cap_xep_hang = :cap_xep_hang")
            params["cap_xep_hang"] = cap_xep_hang

        if q and q.strip():
            q_clean = q.strip()
            params["q_like"] = f"%{q_clean}%"
            params["q_raw"] = q_clean
            conditions.append(
                """(
                    d.ten_di_tich ILIKE :q_like
                    OR COALESCE(d.ten_khac, '') ILIKE :q_like
                    OR d.dia_chi ILIKE :q_like
                    OR d.lich_su ILIKE :q_like
                    OR word_similarity(:q_raw, d.ten_di_tich) > 0.35
                )"""
            )

        where_clause = " AND ".join(conditions)
        sql = text(
            f"""
            SELECT
                d.id,
                d.ten_di_tich,
                d.ten_khac,
                d.id_danh_muc,
                dm.ten_danh_muc,
                d.id_huyen_tp,
                ht.ten_huyen_tp,
                ht.loai AS loai_huyen_tp,
                d.cap_xep_hang,
                d.dia_chi,
                ST_X(d.geom) AS lon,
                ST_Y(d.geom) AS lat,
                d.lich_su,
                d.thoi_gian_mo_cua,
                d.gia_ve,
                d.luu_y_tham_quan,
                d.trang_thai,
                d.luot_xem,
                d.luot_quet_qr,
                d.created_at,
                d.updated_at,
                (
                    SELECT ha.url
                    FROM hinh_anh ha
                    WHERE ha.id_di_tich = d.id
                    ORDER BY ha.is_thumbnail DESC, ha.thu_tu ASC, ha.id ASC
                    LIMIT 1
                ) AS thumbnail_url,
                qr.qr_url
            FROM di_tich d
            JOIN danh_muc dm ON dm.id = d.id_danh_muc
            JOIN huyen_tp ht ON ht.id = d.id_huyen_tp
            LEFT JOIN qr_code qr ON qr.id_di_tich = d.id
            WHERE {where_clause}
            ORDER BY d.id ASC
            """
        )
        rows = db.execute(sql, params).mappings().all()
        return [dict(r) for r in rows]

    @staticmethod
    def find_nearby_monuments(
        db: Session,
        lon: float,
        lat: float,
        radius_km: float = 10.0,
    ) -> List[Dict[str, Any]]:
        radius_m = radius_km * 1000.0
        sql = text(
            """
            SELECT
                d.id,
                d.ten_di_tich,
                d.ten_khac,
                d.id_danh_muc,
                dm.ten_danh_muc,
                d.id_huyen_tp,
                ht.ten_huyen_tp,
                ht.loai AS loai_huyen_tp,
                d.cap_xep_hang,
                d.dia_chi,
                ST_X(d.geom) AS lon,
                ST_Y(d.geom) AS lat,
                d.lich_su,
                d.thoi_gian_mo_cua,
                d.gia_ve,
                d.luu_y_tham_quan,
                d.trang_thai,
                d.luot_xem,
                d.luot_quet_qr,
                d.created_at,
                d.updated_at,
                ROUND(
                    (
                        ST_DistanceSphere(
                            d.geom,
                            ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
                        ) / 1000.0
                    )::numeric,
                    2
                ) AS distance_km,
                (
                    SELECT ha.url
                    FROM hinh_anh ha
                    WHERE ha.id_di_tich = d.id
                    ORDER BY ha.is_thumbnail DESC, ha.thu_tu ASC, ha.id ASC
                    LIMIT 1
                ) AS thumbnail_url,
                qr.qr_url
            FROM di_tich d
            JOIN danh_muc dm ON dm.id = d.id_danh_muc
            JOIN huyen_tp ht ON ht.id = d.id_huyen_tp
            LEFT JOIN qr_code qr ON qr.id_di_tich = d.id
            WHERE d.trang_thai = 'published'
              AND ST_DWithin(
                  d.geom::geography,
                  ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
                  :radius_m
              )
            ORDER BY distance_km ASC, d.id ASC
            """
        )
        rows = db.execute(
            sql,
            {"lon": lon, "lat": lat, "radius_m": radius_m},
        ).mappings().all()
        return [dict(r) for r in rows]

    @staticmethod
    def get_monument_by_id(
        db: Session,
        monument_id: int,
        increment_view: bool = True,
    ) -> Optional[Dict[str, Any]]:
        if increment_view:
            update_sql = text(
                "UPDATE di_tich SET luot_xem = luot_xem + 1 WHERE id = :id"
            )
            res = db.execute(update_sql, {"id": monument_id})
            if res.rowcount == 0:
                db.rollback()
                return None
            db.commit()

        sql = text(
            """
            SELECT
                d.id,
                d.ten_di_tich,
                d.ten_khac,
                d.id_danh_muc,
                dm.ten_danh_muc,
                d.id_huyen_tp,
                ht.ten_huyen_tp,
                ht.loai AS loai_huyen_tp,
                d.cap_xep_hang,
                d.dia_chi,
                ST_X(d.geom) AS lon,
                ST_Y(d.geom) AS lat,
                d.lich_su,
                d.thoi_gian_mo_cua,
                d.gia_ve,
                d.luu_y_tham_quan,
                d.trang_thai,
                d.luot_xem,
                d.luot_quet_qr,
                d.created_at,
                d.updated_at
            FROM di_tich d
            JOIN danh_muc dm ON dm.id = d.id_danh_muc
            JOIN huyen_tp ht ON ht.id = d.id_huyen_tp
            WHERE d.id = :id
            """
        )
        row = db.execute(sql, {"id": monument_id}).mappings().first()
        if not row:
            return None

        data = dict(row)

        img_sql = text(
            """
            SELECT id, id_di_tich, url, chu_thich, is_thumbnail, thu_tu
            FROM hinh_anh
            WHERE id_di_tich = :id
            ORDER BY is_thumbnail DESC, thu_tu ASC, id ASC
            """
        )
        images = [dict(r) for r in db.execute(img_sql, {"id": monument_id}).mappings().all()]

        qr_sql = text(
            """
            SELECT id, id_di_tich, qr_url, file_path
            FROM qr_code
            WHERE id_di_tich = :id
            LIMIT 1
            """
        )
        qr_row = db.execute(qr_sql, {"id": monument_id}).mappings().first()
        qr_data = dict(qr_row) if qr_row else None

        data["hinh_anh"] = images
        data["thumbnail_url"] = images[0]["url"] if images else None
        data["qr_code"] = qr_data
        data["qr_url"] = qr_data["qr_url"] if qr_data else None
        return data

    @staticmethod
    def create_monument(db: Session, payload: MonumentCreate) -> Dict[str, Any]:
        insert_sql = text(
            """
            INSERT INTO di_tich (
                id_danh_muc,
                id_huyen_tp,
                ten_di_tich,
                ten_khac,
                cap_xep_hang,
                dia_chi,
                geom,
                lich_su,
                thoi_gian_mo_cua,
                gia_ve,
                luu_y_tham_quan,
                trang_thai
            ) VALUES (
                :id_danh_muc,
                :id_huyen_tp,
                :ten_di_tich,
                :ten_khac,
                :cap_xep_hang,
                :dia_chi,
                ST_SetSRID(ST_MakePoint(:lon, :lat), 4326),
                :lich_su,
                :thoi_gian_mo_cua,
                :gia_ve,
                :luu_y_tham_quan,
                :trang_thai
            )
            RETURNING id
            """
        )
        new_id = db.execute(
            insert_sql,
            {
                "id_danh_muc": payload.id_danh_muc,
                "id_huyen_tp": payload.id_huyen_tp,
                "ten_di_tich": payload.ten_di_tich,
                "ten_khac": payload.ten_khac,
                "cap_xep_hang": payload.cap_xep_hang,
                "dia_chi": payload.dia_chi,
                "lon": payload.lon,
                "lat": payload.lat,
                "lich_su": payload.lich_su,
                "thoi_gian_mo_cua": payload.thoi_gian_mo_cua or "Tự do tham quan",
                "gia_ve": payload.gia_ve if payload.gia_ve is not None else 0.0,
                "luu_y_tham_quan": payload.luu_y_tham_quan,
                "trang_thai": payload.trang_thai or "published",
            },
        ).scalar_one()

        if payload.thumbnail_url:
            db.execute(
                text(
                    """
                    INSERT INTO hinh_anh (id_di_tich, url, chu_thich, is_thumbnail, thu_tu)
                    VALUES (:id_di_tich, :url, :chu_thich, TRUE, 1)
                    """
                ),
                {
                    "id_di_tich": new_id,
                    "url": payload.thumbnail_url,
                    "chu_thich": payload.ten_di_tich,
                },
            )

        db.execute(
            text(
                """
                INSERT INTO qr_code (id_di_tich, qr_url, file_path)
                VALUES (:id_di_tich, :qr_url, :file_path)
                """
            ),
            {
                "id_di_tich": new_id,
                "qr_url": f"https://senmap.dongthap.gov.vn/di-tich/{new_id}",
                "file_path": f"/static/qrcodes/di_tich_{new_id}.png",
            },
        )
        db.commit()
        return MonumentRepository.get_monument_by_id(db, new_id, increment_view=False)  # type: ignore

    @staticmethod
    def delete_monument(db: Session, monument_id: int) -> bool:
        res = db.execute(
            text("DELETE FROM di_tich WHERE id = :id"),
            {"id": monument_id},
        )
        db.commit()
        return res.rowcount > 0

    @staticmethod
    def record_qr_scan(
        db: Session,
        monument_id: int,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> Optional[Dict[str, Any]]:
        check_row = (
            db.execute(
                text("SELECT id, ten_di_tich FROM di_tich WHERE id = :id"),
                {"id": monument_id},
            )
            .mappings()
            .first()
        )
        if not check_row:
            return None

        log_row = (
            db.execute(
                text(
                    """
                    INSERT INTO nhat_ky_quet_qr (id_di_tich, user_agent, ip_address)
                    VALUES (:id_di_tich, :user_agent, :ip_address)
                    RETURNING id, thoi_gian
                    """
                ),
                {
                    "id_di_tich": monument_id,
                    "user_agent": user_agent or "SenMap-Mobile-Scanner",
                    "ip_address": ip_address or "127.0.0.1",
                },
            )
            .mappings()
            .first()
        )

        updated_row = (
            db.execute(
                text(
                    """
                    UPDATE di_tich
                    SET luot_quet_qr = luot_quet_qr + 1
                    WHERE id = :id
                    RETURNING ten_di_tich, luot_quet_qr
                    """
                ),
                {"id": monument_id},
            )
            .mappings()
            .first()
        )
        db.commit()

        return {
            "status": "success",
            "id_di_tich": monument_id,
            "ten_di_tich": updated_row["ten_di_tich"],
            "luot_quet_qr": int(updated_row["luot_quet_qr"]),
            "log_id": int(log_row["id"]),
            "thoi_gian": log_row["thoi_gian"],
            "message": "Đã ghi nhận lượt quét mã QR thực địa thành công",
        }

    @staticmethod
    def get_stats(db: Session) -> Dict[str, Any]:
        summary_row = (
            db.execute(
                text(
                    """
                    SELECT
                        COUNT(*) AS tong_di_tich,
                        COALESCE(SUM(luot_xem), 0) AS tong_luot_xem,
                        COALESCE(SUM(luot_quet_qr), 0) AS tong_luot_quet_qr
                    FROM di_tich
                    WHERE trang_thai = 'published'
                    """
                )
            )
            .mappings()
            .first()
        )

        ranking_rows = (
            db.execute(
                text(
                    """
                    SELECT cap_xep_hang, COUNT(*) AS so_luong
                    FROM di_tich
                    WHERE trang_thai = 'published'
                    GROUP BY cap_xep_hang
                    ORDER BY so_luong DESC
                    """
                )
            )
            .mappings()
            .all()
        )

        category_rows = (
            db.execute(
                text(
                    """
                    SELECT dm.id, dm.ten_danh_muc, COUNT(d.id) AS so_luong
                    FROM danh_muc dm
                    LEFT JOIN di_tich d ON d.id_danh_muc = dm.id AND d.trang_thai = 'published'
                    GROUP BY dm.id, dm.ten_danh_muc
                    ORDER BY dm.id ASC
                    """
                )
            )
            .mappings()
            .all()
        )

        district_rows = (
            db.execute(
                text(
                    """
                    SELECT ht.id, ht.ten_huyen_tp, ht.loai, COUNT(d.id) AS so_luong
                    FROM huyen_tp ht
                    LEFT JOIN di_tich d ON d.id_huyen_tp = ht.id AND d.trang_thai = 'published'
                    GROUP BY ht.id, ht.ten_huyen_tp, ht.loai
                    ORDER BY so_luong DESC, ht.id ASC
                    """
                )
            )
            .mappings()
            .all()
        )

        top_rows = (
            db.execute(
                text(
                    """
                    SELECT
                        d.id,
                        d.ten_di_tich,
                        d.cap_xep_hang,
                        ht.ten_huyen_tp,
                        d.luot_xem,
                        d.luot_quet_qr
                    FROM di_tich d
                    JOIN huyen_tp ht ON ht.id = d.id_huyen_tp
                    WHERE d.trang_thai = 'published'
                    ORDER BY d.luot_xem DESC, d.luot_quet_qr DESC
                    LIMIT 5
                    """
                )
            )
            .mappings()
            .all()
        )

        tong_di_tich = int(summary_row["tong_di_tich"]) if summary_row else 0
        tong_luot_xem = int(summary_row["tong_luot_xem"]) if summary_row else 0
        tong_luot_quet_qr = int(summary_row["tong_luot_quet_qr"]) if summary_row else 0

        theo_cap_xep_hang = {
            str(r["cap_xep_hang"]): int(r["so_luong"]) for r in ranking_rows
        }
        by_ranking = [
            {"cap_xep_hang": str(r["cap_xep_hang"]), "so_luong": int(r["so_luong"])}
            for r in ranking_rows
        ]

        return {
            "tong_di_tich": tong_di_tich,
            "total_monuments": tong_di_tich,
            "tong_luot_xem": tong_luot_xem,
            "total_views": tong_luot_xem,
            "tong_luot_quet_qr": tong_luot_quet_qr,
            "total_qr_scans": tong_luot_quet_qr,
            "theo_cap_xep_hang": theo_cap_xep_hang,
            "by_ranking": by_ranking,
            "theo_danh_muc": [
                {
                    "id": int(r["id"]),
                    "ten_danh_muc": str(r["ten_danh_muc"]),
                    "so_luong": int(r["so_luong"]),
                }
                for r in category_rows
            ],
            "theo_huyen_tp": [
                {
                    "id": int(r["id"]),
                    "ten_huyen_tp": str(r["ten_huyen_tp"]),
                    "loai": str(r["loai"]),
                    "so_luong": int(r["so_luong"]),
                }
                for r in district_rows
            ],
            "top_di_tich": [dict(r) for r in top_rows],
        }
