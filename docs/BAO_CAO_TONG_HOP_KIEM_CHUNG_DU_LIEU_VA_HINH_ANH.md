# BÁO CÁO TỔNG HỢP KIỂM CHỨNG DỮ LIỆU & HÌNH ẢNH TOÀN HỆ THỐNG

- **Dự án:** Hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp (*SenMap Đồng Tháp*)
- **Nhánh Git:** `audit/data-and-image-verification`
- **Ngày tổng hợp:** 2026-11-12
- **Người tổng hợp:** `CODER_1` (`w2:p5`) theo điều phối của Orchestrator (`w2:p1`)
- **Nguồn đầu vào đối chiếu chéo (4 báo cáo độc lập từ 2 cặp Agent):**
  1. `docs/BAO_CAO_KIEM_CHUNG_NHOM_1_P5.md` (`w2:p5` — Kiểm toán `DT-001..010`, Trang chủ/Tuyến, 20 ảnh `monuments/` + 12 ảnh ẩm thực)
  2. `docs/BAO_CAO_KIEM_CHUNG_NHOM_2_PB.md` (`w2:pB` — Kiểm toán `DT-011..020`, Tuyên bố ngoại lai Tiền Giang/UNESCO, 4 Mùa/12 Đặc sản, `cultural_motifs/` & `gis_data/Hinh_Anh/`)
  3. `docs/BAO_CAO_KIEM_CHUNG_HINH_ANH_P4.md` (`w2:p4` — Kiểm toán tọa độ GPS CSV/SQL/JS, CV Haar/HOG & bản quyền ảnh)
  4. `docs/BAO_CAO_KIEM_CHUNG_THONG_TIN_P8.md` (`w2:p8` — Kiểm chứng độc lập 20 di tích, 4 tuyến, 12 đặc sản, phân định Tiền Giang & 20 ảnh di tích)

---

## TÓM TẮT ĐIỀU HÀNH (EXECUTIVE SUMMARY)

| Hạng mục kiểm toán | Tổng số đối tượng | Đạt / Đúng | Sai một phần / Cảnh báo | Sai / Cần thay gấp | Kết luận trọng yếu |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **20 Di tích (`DT-001`–`DT-020`)** | 20 | 12 | 5 | 3 | `DT-018` sai cấp xếp hạng (`Quốc gia` → thực tế `Cấp tỉnh`); `DT-009` & `DT-010` sai số Quyết định (`2684` → `3084`; `65/2004` là đền ở Thanh Hóa); `DT-017` gán nhầm tượng Quan Âm 33m; `DT-019` chưa đủ văn bản xếp hạng 2012. |
| **Tọa độ GPS (CSV / SQL / JS)** | 20 | 20 (100%) | 0 | 0 | Khớp tuyệt đối ($\Delta \le 10^{-6}$ độ), 100% nằm trong Bounding Box Đồng Tháp (`10.10–10.95°N`, `105.15–105.95°E`). |
| **4 Tuyến, 4 Mùa, 12 Đặc sản & Hero** | 22+ | 18 | 3 | 1 | `TRAIL-OCEO` còn lỗi Đình Long Thuận sắc phong Tự Đức `1852`; `TRAIL-SADEC` & `SEAL-CL-17` gán nhầm tượng 33m cho Chùa Hưng Thiền; `Hero` đúng theo tỉnh Đồng Tháp cũ trước sáp nhập 2025. |
| **20 Ảnh Di tích (`monuments/`)** | 20 | 10 | 2 (`#3`, `#8` có người; `#11` chung chung) | 9–10 (`#10, 11, 13, 14, 15, 16, 17, 18, 19, 20`) | 100% đã strip EXIF; **19/20 ảnh mang giấy phép `CC BY` / `CC BY-SA` nhưng UI chưa ghi công**; 9–10 ảnh gán nhầm đền/đình An Giang, vườn thực vật Đức, đường QL30, tháp Văn Miếu, hội trường, người lội ruộng. |
| **12 Ảnh Ẩm thực (`CULINARY_SPECIALTIES`)** | 12 | 1 (`Xoài`) | 1 (`Quýt`) | 10 | Không có thư mục `frontend/public/images/culinary/`; đang gọi URL Unsplash ngoài và **10/12 món sai hoàn toàn món Việt** (Poke bowl, Sườn BBQ, Steak, Dimsum, Paella, Kebab, Pizza, Cupcake...). |
| **Kho `cultural_motifs/` & `gis_data/Hinh_Anh/`** | 34+ | 22 | 1 (`#12 đàn kìm`) | 11 | `frontend/public/images/cultural_motifs/` sạch và đạt chuẩn (lưu ý trùng file hoa sen). Ngược lại, `gis_data/Hinh_Anh/bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/` chứa **3 file hỏng/sai kỳ quái (`01_` tay cầm PS4, `07_` cupcake, `08_` cô gái đi phố châu Âu)**, 1 file ngoài tỉnh (`17_` Chùa Vĩnh Tràng Tiền Giang), 3 file dính người/tượng người (`03_, 13_, 15_`), 2 file tách nền hỏng (`09_, 16_`), 2 file sai sinh học (`02_, 06_`). |

---

## PHẦN I — KIỂM CHỨNG THÔNG TIN (FACT-CHECKING OUTCOME)

> **Lưu ý cấu trúc kho mã nguồn:** Tệp `frontend/src/data/mockMonuments.js` không tồn tại; dữ liệu thực tế nằm tại `frontend/src/data/monumentsData.js` (`INITIAL_MONUMENTS`, ID `1..20`), `frontend/src/data/culturalHeritageData.js`, `frontend/src/data/monumentsTranslationsEn.js`, và `database/Mock_Data/02_seed_20_di_tich.sql`.

### 1.1. Bảng Kiểm Chứng 20 Di Tích (`DT-001` – `DT-020`)

| Tuyên bố cần kiểm chứng (Claim) | Trạng thái | Danh sách nguồn đối chiếu kèm liên kết (URL) | Mức độ rủi ro hoặc sai lệch của thông tin gốc |
| :--- | :---: | :--- | :--- |
| **DT-001 — Khu di tích Nguyễn Sinh Sắc:** Xếp hạng Di tích Quốc gia ngày `09/04/1992` (`QĐ 413/QĐ-BVHTT`); nâng cấp Quốc gia đặc biệt ngày `11/09/2025` (`QĐ 1959/QĐ-TTg`); khởi công `22/08/1975`, khánh thành `13/02/1977`, diện tích `> 9 ha`, vòm mộ `14,95m`; audio ghi `"hồ sen пяти cánh"`. | **Một phần** *(Số QĐ 1992 Unverified; lỗi chính tả)* | 1. Cổng TTĐT Chính phủ: https://xaydungchinhsach.chinhphu.vn/danh-sach-di-tich-quoc-gia-dac-biet-119260211160043009.htm<br>2. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa-vat-the/khu-di-tich-cu-pho-bang-nguyen-sinh-sac-phuong-4-thanh-pho-cao-lanh-tinh-dong-thap-141.html<br>3. Báo Thanh tra: https://thanhtra.com.vn/van-hoa-the-thao-BE2162E3A/dong-thap-di-tich-mo-cu-pho-bang-nguyen-sinh-sac-duoc-xep-hang-di-tich-quoc-gia-dac-biet-fd59b00e0.html | **Thấp–Trung bình:** Mốc `1975–1977`, `09/04/1992` và `QĐ 1959/QĐ-TTg` (`11/09/2025`) chính xác. Tuy nhiên số `413/QĐ-BVHTT` bị ghi trùng với `DT-003` (chưa xác minh được văn bản gốc của năm 1992); lỗi gõ ký tự Cyrillic `"пяти cánh"` tại `monumentsData.js:58`. |
| **DT-002 — Khu di tích khảo cổ Gò Tháp:** Xếp hạng QG năm `1998` (`QĐ 1456/QĐ-BVHTT`); Quốc gia đặc biệt `27/09/2012` (`QĐ 1419/QĐ-TTg`); quy hoạch `hơn 300 ha`; lễ hội 14–16/3 & 14–16/11 ÂL. | **Một phần** | 1. Cục Di sản Văn hóa: https://dsvh.gov.vn/di-tich-khao-co-va-kien-truc-nghe-thuat-go-thap-2966<br>2. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa-vat-the/di-tich-quoc-gia-dac-biet-go-thap-xa-tan-kieu-huyen-thap-muoi-tinh-dong-thap-139.html<br>3. TTXVN: https://nvsk.vnanet.vn/di-tich-khao-co-va-kien-truc-nghe-thuat-go-thap-1-32950.vna | **Trung bình:** `QĐ 1419/QĐ-TTg` (`27/09/2012`), di chỉ Óc Eo/Phù Nam và 2 kỳ lễ hội chính xác. Sai lệch: `dsvh.gov.vn` ghi diện tích quy hoạch khoảng **`290 ha`** (không phải `> 300 ha`); nguồn `baotang.dongthap.gov.vn` ghi xếp hạng QG lần đầu năm `1989`, mâu thuẫn với `1998` (`QĐ 1456`). |
| **DT-003 — Khu di tích Xẻo Quýt:** Xếp hạng QG `09/04/1992` (`QĐ 413/QĐ-BVHTT`); diện tích `50 ha` (`20 ha` rừng tràm nguyên sinh); căn cứ Tỉnh ủy Kiến Phong `1960–1975`. | **Đúng** *(Số QĐ 413 Unverified)* | 1. Cục Bảo tồn Thiên nhiên (NBCA): https://nbca.gov.vn/khu-bao-ve-canh-quan-xeo-quyt-dong-thap/<br>2. Cục TT Đối ngoại (`vietnam.vn`): https://www.vietnam.vn/dong-thap-khu-di-tich-xeo-quyt | **Thấp:** Ngày `09/04/1992`, mốc `1960–1975` và diện tích `50 ha` (`20 ha` rừng tràm) khớp `nbca.gov.vn` (lưu ý `vietnam.vn` ghi quy hoạch mở rộng `63 ha`). Số hiệu `413/QĐ-BVHTT` chưa đối chiếu được văn bản gốc. |
| **DT-004 — Nhà cổ Huỳnh Thủy Lê:** Xây `1895`, trùng tu `1917`, rộng `258 m²`, chuyện tình `1929` với Marguerite Duras (*L'Amant* 1984 giải Goncourt); Di tích QG `2009` (cấp tỉnh `2008`). | **Đúng** *(Mốc 2008 & số QĐ Unverified)* | 1. Báo Nhân Dân: https://nhandan.vn/ve-dep-kien-truc-nha-co-huynh-thuy-le-post812367.html | **Thấp:** Năm `1895`, `1917`, `258 m²`, `1929`, *L'Amant* (1984) và Di tích QG năm `2009` chính xác. Chi tiết `"cấp tỉnh năm 2008"` và số hiệu QĐ (`4705/QĐ-BVHTTDL` do `w2:p8` nêu) chưa tìm thấy văn bản gốc công bố trực tuyến trong đợt kiểm tra. |
| **DT-005 — Chùa Kiến An Cung:** Xếp hạng QG `27/04/1990`; người Hoa Phúc Kiến xây `1924–1927`, kết cấu chữ "Công", mái 3 lớp không đinh sắt, lễ `22/2` & `22/8` ÂL. | **Đúng** | 1. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa/kien-an-cung-140.html<br>2. Cục DSVH (danh mục tu bổ): https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018 | **Rất thấp:** Khớp hoàn toàn với hồ sơ Bảo tàng Đồng Tháp (`1924–1927`, `27/04/1990`, chữ "Công", không kèo/ráp mộng). |
| **DT-006 — Vườn quốc gia Tràm Chim:** Thành lập VQG `29/12/1998` (`QĐ 253/1998/QĐ-TTg`); `7.313 ha`; Khu Ramsar thứ `2.000` thế giới và thứ `4` Việt Nam ngày `02/02/2012`. | **Đúng** | 1. Ban Thư ký Công ước Ramsar: https://rsis.ramsar.org/ris/2000<br>2. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/11406<br>3. Luật Minh Khuê (`QĐ 253/1998/QĐ-TTg`): https://luatminhkhue.vn/van-ban/quyet-dinh-253-1998-qd-ttg.aspx | **Không có sai lệch:** Các chỉ số pháp lý và quốc tế khớp 100%. *(Lưu ý nhỏ: tọa độ hệ thống đặt tại cổng/trụ sở VQG, cách tâm vùng Ramsar trên `rsis.ramsar.org` khoảng 4 km — hợp lý cho mục đích dẫn đường du khách).* |
| **DT-007 — Khu DLST Gáo Giồng:** Trồng tràm sau `1985`, mở cửa du lịch `03/2003`, tổng `1.700 ha`, đài quan sát `18m`, sân chim `36 ha` (bản VI) vs `40 ha` (bản EN). | **Một phần** *(Mâu thuẫn nội bộ)* | 1. TTXVN / Báo Tin Tức (21/11/2024): https://baotintuc.vn/bao-ve-he-sinh-thai-rung-gan-voi-phat-trien-du-lich-ben-vung-post545943.html<br>2. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/11406 | **Trung bình:** Mốc `1985`, `2003` đúng. Tuy nhiên repo tự mâu thuẫn: `monumentsData.js` (VI) ghi sân chim `36 ha`, tổng `1.700 ha` (TTXVN 2024 ghi `1.657 ha`, sân chim `40 ha`), trong khi `monumentsTranslationsEn.js:158` lại ghi `40-hectare`. |
| **DT-008 — Làng hoa Sa Đéc:** Làng nghề `> 100 năm`, trồng hoa trên giàn cao mặt nước, `> 950 ha`, `> 4.000 hộ`, `> 2.000 giống hoa`; Di sản văn hóa phi vật thể Quốc gia. | **Đúng** | 1. Báo Thanh Niên (28/12/2025): https://thanhnien.vn/nghe-trong-hoa-kieng-o-sa-dec-la-di-san-van-hoa-phi-vat-the-quoc-gia-18525122814212274.htm<br>2. Cục Du lịch QGVN: https://nongthon.vietnamtourism.gov.vn/lang-hoa-sa-dec-diem-den-huong-sac-bon-mua-cua-vung-dong-thap/ | **Thấp:** Đã được công nhận Di sản văn hóa phi vật thể QG cuối năm 2025 (`QĐ` công bố 12/2025). Chênh lệch nhỏ về diện tích theo kỳ thống kê (`946–1.000 ha`). *(Lưu ý: `w2:p8` ghi `QĐ 471/QĐ-BVHTTDL (2023)` là chưa chuẩn xác về mốc thời gian công nhận của Nghề trồng hoa kiểng Sa Đéc).* |
| **DT-009 — Làng nghề dệt chiếu Định Yên:** Nghề dệt chiếu là Di sản phi vật thể QG ngày `05/08/2013` theo `QĐ 2684/QĐ-BVHTTDL`; Đình Định Yên xếp hạng Di tích QG năm `2012`. | **Sai** *(Sai số QĐ & ngày)* | 1. Cục Di sản Văn hóa: https://dsvh.gov.vn/nghe-det-chieu-o-dong-thap-22265<br>2. Cục DSVH (Đình Định Yên): https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>3. Luật Việt Nam (`QĐ 2684/QĐ-BVHTTDL`): https://luatvietnam.vn/van-hoa/quyet-dinh-2684-qd-bvhttdl-bo-van-hoa-the-thao-va-du-lich-407299-d1.html | **Cao (Sai sự thật văn bản pháp lý):** Theo Cục DSVH (`dsvh.gov.vn`), nghề dệt chiếu Định Yên được ghi danh tại **`QĐ 3084/QĐ-BVHTTDL ngày 09/09/2013`**, KHÔNG PHẢI `2684/QĐ-BVHTTDL` ngày `05/08/2013` (QĐ `2684` là văn bản hành chính khác về quy chế hội đồng năm 2013). |
| **DT-010 — Đền thờ Thượng tướng Trần Văn Năng:** Xếp hạng Di tích QG ngày `19/08/2004` (`QĐ 65/2004/QĐ-BVHTT`); năm sinh/mất ghi `(1763–1838)` đầu đoạn rồi ghi mất `1835` cuối đoạn. | **Sai** *(Sai số QĐ, ngày & mâu thuẫn năm mất)* | 1. Thư viện Pháp luật (`QĐ 65/2004/QĐ-BVHTT`): https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Quyet-dinh-65-2004-QD-BVHTT-xep-hang-di-tich-quoc-gia-Den-tho-Tran-Khat-Chan-xa-Vinh-Thinh-huyen-Vinh-Loc-tinh-Thanh-Hoa-17611.aspx<br>2. Cục Văn thư Lưu trữ NN: https://archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/chau-ban-trieu-nguyen-tai-lieu-quy-gia-ve-vi-anh-hung-dan-toc-tran-van-nang.htm<br>3. Câu chuyện lịch sử: https://cauchuyenlichsu.vn/ky-uc-song-mai/anh-hung-dan-toc-thuong-tuong-quan-cong-tran-van-nang | **Cao:** `QĐ 65/2004/QĐ-BVHTT` (`10/08/2004`) thực chất xếp hạng **Đền thờ Trần Khát Chân ở Thanh Hóa**! Bằng xếp hạng Đền thờ Trần Văn Năng cấp ngày **`19/01/2004`** (cùng đợt `QĐ 02/2004/QĐ-BVHTT`). Đồng thời châu bản triều Nguyễn xác nhận ông mất năm **`1835`**, cần xóa `(1763–1838)` tại `monumentsData.js:345`. |
| **DT-011 — Căn cứ Tỉnh ủy Kiến Phong (Đình Ngã ba Thông Bình):** Đồn Bảo Thông Bình thời Nguyễn (Thoại Ngọc Hầu), căn cứ cách mạng Tỉnh ủy Kiến Phong; Di tích Cấp tỉnh theo QĐ ngày `18/01/2016`. | **Đúng** | 1. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/37839<br>2. Cổng TTĐT Huyện Tân Hồng (`tanhong.dongthap.gov.vn` — ghi nhận qua `w2:p8`) | **Thấp:** Khớp bối cảnh lịch sử Bảo Thông Bình bên sông Sở Hạ giáp biên giới Campuchia và cấp xếp hạng Cấp tỉnh (2016). |
| **DT-012 — Bảo tàng Tỉnh Đồng Tháp:** Dinh Cò Tây & nhà trưng bày; Cấp tỉnh (`QĐ 938/QĐ-UBND` `05/09/2008`, thành lập `15/05/1978`); lưu giữ `> 30.000 hiện vật`, nhắc `"3 Bảo vật Quốc gia Óc Eo"`. | **Một phần** *(Cần cập nhật số BVQG)* | 1. Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>2. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/nha-trung-bay/bao-tang-tinh-dong-thap-134.html<br>3. Báo Đồng Tháp: https://baodongthap.vn/giu-gin-va-phat-huy-gia-tri-bao-vat-quoc-gia-a231809.html<br>4. VietnamPlus (TTXVN): https://www.vietnamplus.vn/kham-pha-cac-gia-tri-dac-biet-cua-5-bao-vat-quoc-gia-o-tinh-dong-thap-post1071944.vnp | **Thấp:** Lịch sử thành lập và xếp hạng cụm Dinh Cò Tây cấp tỉnh chính xác. Tuy nhiên dữ liệu cũ ghi `"3 Bảo vật Quốc gia"`, hiện tỉnh Đồng Tháp đã có **5 Bảo vật Quốc gia** (cần cập nhật). |
| **DT-013 — Tượng đài Tập kết ra Bắc 1954:** Di tích QG ngày `24/02/2023`; khánh thành `29/10/2019`, diện tích `12.000 m²`, tượng đài `11m`, tiễn `13.508` cán bộ/chiến sĩ trong `100 ngày`. | **Đúng** *(Số `13.508` chưa kiểm văn bản gốc)* | 1. TTXVN (`nvsk.vnanet.vn`): https://nvsk.vnanet.vn/le-don-nhan-bang-xep-hang-di-tich-lich-su-quoc-gia-dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-4-155087.vna<br>2. Báo Tiền Phong: https://tienphong.vn/dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-tro-thanh-di-tich-lich-su-quoc-gia-post1582569.tpo | **Thấp:** Ngày xếp hạng QG `24/02/2023`, khánh thành `29/10/2019`, các chỉ số tượng đài khớp báo chí chính thống; số hiệu QĐ `398` vs `401/QĐ-BVHTTDL` giữa P4/P8 cần rà lại văn bản gốc. |
| **DT-014 — Chùa Phước Kiển (Chùa Lá Sen):** Khởi dựng trước `1847` (triều Thiệu Trị), bom phá `1966`, sen vua *Victoria amazonica* từ `1992`, lá rộng `2–3m` chịu tải `70–80kg`. | **Đúng** | 1. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/43917<br>2. Báo Dân Trí: https://dantri.com.vn/doi-song/ngoi-chua-ky-la-o-mien-tay-nguoi-nang-100kg-co-the-dung-tren-la-sen-20260705132415361.htm | **Thấp:** Thuộc nhóm điểm du lịch văn hóa – tâm linh, thông số lá sen vua và lịch sử chùa chính xác. |
| **DT-015 — Khu căn cứ kháng chiến Bình Thành:** Địa điểm Vụ thảm sát Bình Thành (`11–12/11/1954`, 34 đồng bào); Di tích QG ngày `19/01/2004` (`QĐ 02/2004/QĐ-BVHTT`). | **Đúng** | 1. Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>2. CSDL VBPL (`vbpl.vn`): https://vbpl.vn/van-ban/chi-tiet/quyet-dinh-so-02-2004-qd-bvhtt-ve-viec-xep-hang-di-tich-quoc-gia--80459 | **Không có sai lệch:** Khớp 100% văn bản pháp quy và sự kiện lịch sử. |
| **DT-016 — Đình Tân Phú Trung:** Khởi dựng `1853`, sắc phong Tự Đức `1854`, Di tích Kiến trúc nghệ thuật QG ngày `06/06/2012` (`monumentsData.js` ghi `1854`, nhưng `SEAL-CT-16` trong `culturalHeritageData.js:464` ghi `1852`). | **Một phần** *(Xung đột nội bộ 2 file)* | 1. Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>2. Báo Đồng Tháp (16/06/2026): https://baodongthap.vn/giu-hon-di-san-giua-nhip-song-hien-dai-a242059.html<br>3. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/29143 | **Trung bình:** Báo Đồng Tháp xác nhận Đình Tân Phú Trung là Di tích QG (2012) và có sắc phong Tự Đức năm **`1854`** (`monumentsData.js` đúng). Cần sửa con dấu `SEAL-CT-16` từ `1852` → `1854`. |
| **DT-017 — Chùa Hưng Thiền:** Cổ tự thế kỷ XVIII (`> 250 năm`), đạo tràng Ni chúng lớn thờ Phật A Di Đà bằng đồng (`monumentsData.js`); tuy nhiên `TRAIL-SADEC` & `SEAL-CL-17` (`culturalHeritageData.js:185,193,475`) lại ghi `"tượng Bồ tát Quán Thế Âm cao 33 mét"`. | **Một phần** *(Sai lệch mô tả tượng 33m)* | 1. Deep Culture VN: https://deepculture.vn/van-hoa/dong-thap/chua-hung-thien<br>2. Phật Sự Online: https://www.phatsuonline.vn/dong-thap-be-mac-khoa-tu-xuat-gia-gieo-duyen-lan-thu-18-tai-chua-hung-thien-xa-my-tho-16<br>3. Phật giáo Đồng Tháp: https://www.phatgiaodongthap.vn/2025/09/video-chua-hung-thien-be-giang-khoa-cu.html | **Cao:** Chùa Hưng Thiền (xã Mỹ Hội cũ / Mỹ Thọ) là trường hạ Ni chúng tu học Tịnh Độ, **không có tượng Quan Âm lộ thiên 33m** (dữ liệu trong `culturalHeritageData.js` và `SEAL-CL-17` đã nhầm sang chùa khác như Hưng Long/Tiền Giang hoặc Hưng Thiện/Bạc Liêu). |
| **DT-018 — Đình Long Thuận:** Hệ thống ghi `ranking: "Quốc gia"` (2009), khởi dựng `1876`, sắc phong Bảo Đại `1936` (`monumentsData.js:596-601`); trong khi `SEAL-HN-18` và `TRAIL-OCEO` ghi `"sắc phong Tự Đức 1852"`. | **Sai** *(Sai cấp di tích & xung đột sắc phong)* | 1. Cục DSVH (danh mục cấp tỉnh & QG Đồng Tháp): https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>2. Cục Du lịch QGVN (Đình Long Khánh): https://vietnamtourism.gov.vn/post/57733 | **Nghiêm trọng (Critical):** Văn bản của `dsvh.gov.vn` liệt kê rõ **Đình Long Thuận (xã Long Thuận, huyện Hồng Ngự)** là **Di tích Cấp tỉnh** (được UBND tỉnh xếp hạng năm 2009), KHÔNG PHẢI Di tích Quốc gia (di tích cấp Quốc gia năm 2009 tại Hồng Ngự là Đình Long Khánh). Đồng thời cần xóa `"Sắc phong Tự Đức 1852"` tại `TRAIL-OCEO` và `SEAL-HN-18`. |
| **DT-019 — Đình Phú Mỹ:** Hệ thống ghi Di tích lịch sử – văn hóa `Cấp tỉnh` năm `2012` tại xã Phú Lợi, huyện Thanh Bình (`SEAL-TB-19`). | **Chưa có đủ bằng chứng (Unverified)** | 1. Cổng TTĐT Huyện Thanh Bình: https://thanhbinh.dongthap.gov.vn/gioi-thieu<br>2. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa-vat-the/ | **Trung bình:** Chưa tìm thấy quyết định pháp lý xác nhận `"Đình Phú Mỹ xã Phú Lợi xếp hạng cấp tỉnh năm 2012"` trong danh mục công khai của Cục DSVH/Bảo tàng Đồng Tháp (ở Thanh Bình có Bến đò Phú Mỹ và Đình Tân Phú). |
| **DT-020 — Chiến thắng Giồng Thị Đam – Gò Quản Cung:** Trận `26/09/1959` (Tiểu đoàn 502) mở màn Đồng Khởi Đồng Tháp Mười; Di tích QG ngày `19/01/2004` (`QĐ 02/2004/QĐ-BVHTT`). | **Đúng** | 1. Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/he-thong-trung-bay/di-tich-lich-su-chien-thang-giong-thi-dam-go-quan-cung-120.html<br>2. Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018<br>3. Báo QĐND: http://sknc.qdnd.vn/ky-niem-sau-sac/chien-thang-trong-mua-nuoc-noi-501607 | **Không có sai lệch:** Sự kiện, ngày tháng và cấp/số quyết định Di tích Quốc gia khớp 100%. |

---

### 1.2. Bảng Kiểm Chứng 4 Tuyến Du Lịch, 4 Mùa, 12 Đặc Sản & Số Liệu Trang Chủ

| Tuyên bố cần kiểm chứng (Claim) | Trạng thái | Danh sách nguồn đối chiếu kèm liên kết (URL) | Mức độ rủi ro hoặc sai lệch của thông tin gốc |
| :--- | :---: | :--- | :--- |
| **Trang chủ (`HeroPortalSection.jsx`):** `20 di tích` trên bản đồ SenMap Đồng Tháp; `02 Di tích Quốc gia Đặc biệt` (Nguyễn Sinh Sắc & Gò Tháp). | **Một phần** *(Đúng theo tỉnh Đồng Tháp cũ)* | 1. Cổng TTĐT Chính phủ: https://xaydungchinhsach.chinhphu.vn/danh-sach-di-tich-quoc-gia-dac-biet-119260211160043009.htm<br>2. Cổng thông tin địa giới mới: https://tinhthanhvn.com/province/dong-thap | **Trung bình:** Đúng với 20 điểm được nạp trong SenMap và đúng với địa bàn **tỉnh Đồng Tháp trước sáp nhập 2025**. Nếu xét **tỉnh Đồng Tháp mới** (hợp nhất Tiền Giang), số Di tích QGĐB còn bao gồm *Chiến thắng Ấp Bắc*, *Rạch Gầm – Xoài Mút*, *Khởi nghĩa Trương Định*... Cần ghi rõ phạm vi trong phần giới thiệu. |
| **Trang chủ (`HeroPortalSection.jsx`):** `Khu Ramsar Thế giới thứ 2.000` (Tràm Chim); `100+ Năm Làng Hoa Sa Đéc`; `1000+ Cổ vật Óc Eo & Bảo vật Quốc gia` — trầm tích `1.700 năm` văn minh Phù Nam. | **Đúng** | 1. Ramsar: https://rsis.ramsar.org/ris/2000<br>2. Báo Thanh Niên: https://thanhnien.vn/nghe-trong-hoa-kieng-o-sa-dec-la-di-san-van-hoa-phi-vat-the-quoc-gia-18525122814212274.htm<br>3. Cục DSVH (Gò Tháp > 1.500 năm): https://dsvh.gov.vn/di-tich-khao-co-va-kien-truc-nghe-thuat-go-thap-2966 | **Thấp:** Các mốc số liệu Ramsar #2000, làng hoa >100 năm và >1.000 hiện vật Óc Eo từ 13 mộ táng Gò Tháp đều có căn cứ; `1.700 năm` là con số khái quát hợp lệ trong khung Óc Eo thế kỷ I–VII SCN (`> 1.500 năm`). |
| **Trang chủ (`HeroPortalSection.jsx:130-139`):** *"Tháp Mười đẹp nhất bông sen / Việt Nam đẹp nhất có tên Bác Hồ"* — Bảo Định Giang (1946). | **Một phần** *(Dị bản truyền miệng)* | 1. Báo Xây dựng: https://baoxaydung.vn/vi-dau-co-cau-tho-thap-muoi-dep-nhat-bong-sen-192166215.htm | **Thấp:** Tác giả Bảo Định Giang sáng tác năm 1946 tại Đồng Tháp Mười là đúng, nhưng văn bản gốc năm 1946 viết theo phương ngữ Nam Bộ là **`"nhứt"`** và **`"Cụ Hồ"`**; nên chú thích dị bản truyền miệng để tăng giá trị học thuật. |
| **Tuyến `TRAIL-OCEO` (`culturalHeritageData.js:107-108`):** *"Đình làng cổ Phú Mỹ và Đình Long Thuận ... lưu giữ trọn vẹn những bản sắc phong của vua Tự Đức năm 1852"*. | **Sai** | Dữ liệu gốc `monumentsData.js:597-601` & `dsvh.gov.vn` (đã dẫn ở DT-018) | **Cao:** Mâu thuẫn trực tiếp trong cùng kho dữ liệu (`monumentsData.js` ghi Đình Long Thuận lập năm `1876`, sắc phong Bảo Đại `1936`). Lỗi đã sửa trong bản EN nhưng **chưa sửa ở `culturalHeritageData.js`**. |
| **Tuyến `TRAIL-RED` & `TRAIL-ECO` (`culturalHeritageData.js`):** 100 ngày Tập kết 1954 tại Cao Lãnh (`13.508` người), trận Giồng Thị Đam (`26/09/1959`), Xẻo Quýt (`1960–1975`), 30.000 hiện vật Bảo tàng; Tràm Chim – Gáo Giồng – Xẻo Quýt. | **Đúng** | 1. TTXVN: https://nvsk.vnanet.vn/le-don-nhan-bang-xep-hang-di-tich-lich-su-quoc-gia-dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-4-155087.vna<br>2. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/43917 | **Rất thấp:** Tuyến hành trình hợp lý về địa lý (85–120 km) và khớp sử liệu. |
| **Tuyến `TRAIL-SADEC` (`culturalHeritageData.js:185,193`):** Chùa Phước Kiển sen vua chịu tải 70–80kg, Chợ ma chiếu Định Yên, và *"chiêm ngưỡng tượng Bồ tát Quán Thế Âm cao 33 mét tại Chùa Hưng Thiền"*. | **Một phần** *(Sai chi tiết tượng 33m)* | 1. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/43917<br>2. Deep Culture VN: https://deepculture.vn/van-hoa/dong-thap/chua-hung-thien | **Cao:** Các di tích dọc Sa Đéc – Châu Thành – Lấp Vò chính xác, riêng chi tiết **tượng Quan Âm 33m tại Chùa Hưng Thiền là sai** (cần gỡ khỏi `story_vi`, `story_en`, `highlights_vi`, `highlights_en`, `SEAL-CL-17`). |
| **4 Mùa Văn hóa (`SEASONAL_CALENDAR`):** Mùa Sen (T5–T8), Mùa Nước Nổi (T9–T11), Mùa Hoa Tết Sa Đéc (T12–T2), Mùa Lễ hội Gò Tháp (T3 & T11 ÂL). | **Đúng** | 1. Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/11406<br>2. Cục DSVH (Lễ hội Gò Tháp): https://dsvh.gov.vn/di-tich-khao-co-va-kien-truc-nghe-thuat-go-thap-2966 | **Không có sai lệch:** Phù hợp 100% chu kỳ thủy văn – sinh thái và lịch lễ hội truyền thống Đồng Tháp. |
| **12 Đặc sản Ẩm thực (`CULINARY_SPECIALTIES`):** Hủ tiếu Sa Đéc, Cá lóc nướng trui lá sen, Nem Lai Vung, Bánh phồng tôm Sa Giang, Cơm lá sen, Chuột đồng quay lu, Lẩu cá linh bông điên điển, Xoài cát Chu Cao Lãnh, Quýt hồng Lai Vung, Khô cá lóc Tam Nông, Bánh xèo Cao Lãnh, Hạt sen sấy Gò Tháp. | **Đúng** *(Về nội dung chữ)* | 1. Cục Sở hữu trí tuệ (`ipvietnam.gov.vn`): https://ipvietnam.gov.vn/ (chỉ dẫn địa lý Xoài Cao Lãnh & nhãn hiệu Quýt hồng Lai Vung)<br>2. Báo Đồng Tháp & Truyền thông địa phương | **Thấp (về văn bản) / Nghiêm trọng (về ảnh đi kèm):** Toàn bộ 12 món văn bản đều là đặc sản bản địa đích thực của Đồng Tháp, nhưng hình ảnh minh họa đang sai 10/12 món (xem Phần II). |

---

### 1.3. Bảng Phân Định Tuyên Bố Ngoại Lai (Tiền Giang – Đồng Tháp) & Di Sản UNESCO

| Tuyên bố cần kiểm chứng (Claim) | Trạng thái | Danh sách nguồn đối chiếu kèm liên kết (URL) | Mức độ rủi ro hoặc sai lệch của thông tin gốc |
| :--- | :---: | :--- | :--- |
| **Chiến thắng Rạch Gầm – Xoài Mút (1785):** Di tích Quốc gia đặc biệt (`QĐ 2408/QĐ-TTg`). | **Đúng** *(Thuộc địa bàn Tiền Giang cũ)* | 1. Cục Di sản Văn hóa: https://dsvh.gov.vn/di-tich-lich-su-dia-diem-chien-thang-rach-gam-xoai-mut-1209 | **Cao nếu gộp nhầm:** Thuộc xã Kim Sơn, Châu Thành, Tiền Giang; không đưa vào tập 20 di tích Đồng Tháp hiện tại. |
| **Địa điểm Chiến thắng Ấp Bắc (02/01/1963):** Di tích Quốc gia đặc biệt (`QĐ 1649/QĐ-TTg` 2022). | **Đúng** *(Thuộc địa bàn Tiền Giang cũ)* | 1. Bộ VHTTDL: https://bvhttdl.gov.vn/ | **Cao nếu gộp nhầm:** Tọa lạc tại Cai Lậy, Tiền Giang. Không thuộc phạm vi 20 điểm khảo sát của Đồng Tháp cũ. |
| **Địa điểm Khởi nghĩa Trương Định (1859–1864):** Di tích Quốc gia đặc biệt (`QĐ 2499/QĐ-TTg` 2016). | **Đúng** *(Thuộc địa bàn Tiền Giang cũ)* | 1. Cục Di sản Văn hóa: https://dsvh.gov.vn/di-tich-khoi-nghia-truong-dinh-tinh-tien-giang-22181 | **Cao nếu gộp nhầm:** Tọa lạc tại Gò Công, Tiền Giang. |
| **Chùa Vĩnh Tràng:** Di tích Kiến trúc nghệ thuật Quốc gia (`1984`). | **Đúng** *(Thuộc Tiền Giang — ĐÃ LỌT ẢNH VÀO KHO ĐỒNG THÁP)* | 1. Bộ VHTTDL / Cục DSVH | **Nghiêm trọng:** Tọa lạc tại Mỹ Tho, Tiền Giang, nhưng tệp `17_chua_vinh_trang_tien_giang.png` đang nằm trong `gis_data/Hinh_Anh/bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/`. Phải xóa bỏ ngay. |
| **Làng cổ Đông Hòa Hiệp:** Di tích Kiến trúc nghệ thuật Quốc gia (2017), dự án bảo tồn JICA / UNESCO Châu Á – Thái Bình Dương (2003–2004). | **Đúng** *(Thuộc Tiền Giang cũ)* | 1. Cục DSVH / JICA | **Trung bình:** Tọa lạc tại Cái Bè, Tiền Giang; không thuộc Đồng Tháp cũ. |
| **Nghệ thuật Đờn ca tài tử Nam Bộ (UNESCO 2013):** Di sản văn hóa phi vật thể đại diện của nhân loại (`05/12/2013`, `QĐ 5079/QĐ-BVHTTDL`). | **Đúng** | 1. UNESCO: https://ich.unesco.org/en/RL/art-of-dn-ca-tai-t-music-and-song-in-southern-viet-nam-00733<br>2. Cục DSVH: https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789 | **Không có sai lệch:** Di sản chung của 21 tỉnh thành Nam Bộ (trong đó có Đồng Tháp). |

---

## PHẦN II — KIỂM TOÁN TOÀN BỘ HÌNH ẢNH (IMAGE AUDIT — 3 TIÊU CHÍ BẮT BUỘC)

### 2.1. Nhóm `frontend/public/images/monuments/` (20 ảnh di tích)

- **Cảnh báo hệ thống về EXIF & Bản quyền:** Toàn bộ 20 ảnh đã bị **xóa sạch metadata EXIF (`EXIF={}`)** khi đưa vào repo. Đối chiếu Wikimedia Commons API cho thấy **19/20 ảnh là `CC BY` / `CC BY-SA`** (chỉ `monument_9.jpg` là `CC0`). Giao diện hiện **chưa hiển thị dòng ghi công tác giả và liên kết giấy phép (Attribution)** theo điều kiện bắt buộc của Creative Commons.

| File ảnh | Di tích được gán | 1. Có mặt/bóng người? | 2. Bản quyền & Giấy phép | 3. Đúng với nội dung được gán? | Kết luận |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `monument_1.jpg` | DT-001: Nguyễn Sinh Sắc | **Không** (chỉ có ảnh thờ nhỏ từ xa) | `CC BY-SA 3.0` (Bùi Thụy Đào Nguyên) — Cần ghi công | **ĐÚNG** — Vòm mộ cánh sen trắng 9 đầu rồng tại Cao Lãnh. | **ĐẠT** *(thêm Attribution)* |
| `monument_2.jpg` | DT-002: Gò Tháp | **Không** *(CV báo giả trên cột đình; mắt thường 0 người)* | `CC BY-SA 4.0` (Bùi Thụy Đào Nguyên) — Cần ghi công | **ĐÚNG** — Đền thờ & tượng đài Thiên hộ Võ Duy Dương – Đốc binh Kiều. | **ĐẠT** *(thêm Attribution)* |
| `monument_3.jpg` | DT-003: Xẻo Quýt | **CÓ NGƯỜI** (cô gái quay lưng mặc hoodie trắng chiếm trung tâm xuồng + tay người chèo) | File local khác ảnh Wikimedia (`ZuckPham` `CC BY-SA 4.0`) — Cần xác minh nguồn thực | **ĐÚNG CẢNH QUAN** — Rừng tràm Xẻo Quýt, nhưng người mẫu chiếm >40% ảnh. | **RÀ SOÁT / THAY ẢNH KHÔNG NGƯỜI** |
| `monument_4.jpg` | DT-004: Huỳnh Thủy Lê | **Không** *(0 mặt thật khi soi trực quan)* | `CC BY-SA 3.0` (Bùi Thụy Đào Nguyên) — Cần ghi công | **ĐÚNG** — Mặt tiền Nhà cổ Huỳnh Thủy Lê, Sa Đéc. | **ĐẠT** *(thêm Attribution)* |
| `monument_5.jpg` | DT-005: Kiến An Cung | **Không** *(0 mặt thật khi soi trực quan)* | `CC BY-SA 3.0` (Bùi Thụy Đào Nguyên) — Cần ghi công | **ĐÚNG** — Mặt tiền & biển hiệu `"KIẾN AN CUNG (CHÙA ÔNG QUÁCH)"`. | **ĐẠT** *(thêm Attribution)* |
| `monument_6.jpg` | DT-006: Tràm Chim | **Không** | `CC BY-SA 3.0` (Quoilp) — Cần ghi công | **ĐÚNG** — Đàn cò trên đồng cỏ ngập nước và rừng tràm. | **ĐẠT** *(thêm Attribution)* |
| `monument_7.jpg` | DT-007: Gáo Giồng | **Không** | `CC BY-SA 3.0` (Neitram) — Cần ghi công | **ĐÚNG** — Chim cò bợ tại Sân chim Gáo Giồng. | **ĐẠT** *(thêm Attribution)* |
| `monument_8.jpg` | DT-008: Làng hoa Sa Đéc | **CÓ 3 NGƯỜI** (2 nông dân ngồi bó hoa, 1 người đi xe máy đeo khẩu trang) | `CC BY-SA 4.0` (Tonbi ko) — Cần ghi công | **ĐÚNG** — Cảnh bó hoa cúc/mào gà dọc đường làng hoa Sa Đéc. | **CHẤP NHẬN / LÀM MỜ NHẸ** |
| `monument_9.jpg` | DT-009: Định Yên | **CÓ BÓNG NGƯỜI TỪ XA** (flycam trên cao, người nhỏ li ti) | **`CC0` (Public Domain)** (Duong Dang Khoi) — An toàn bản quyền | **ĐÚNG ĐỊA ĐIỂM** — Đình thần Định Yên ven ngã ba rạch (không thấy cận cảnh dệt chiếu). | **ĐẠT** *(an toàn bản quyền)* |
| **`monument_10.jpg`** | DT-010: Đền Trần Văn Năng | **CÓ NGƯỜI** (1 người áo đỏ quay lưng + bóng người bên phải) | `CC BY-SA 3.0` (Bùi Thụy Đào Nguyên) | **❌ SAI HOÀN TOÀN** — Biển hiệu ghi rõ **`"ĐỀN THỜ ÔNG BÀ ĐỖ CÔNG TƯỜNG"`** (TP Cao Lãnh), không phải Đền Trần Văn Năng (Thanh Bình). | **THAY GẤP** |
| **`monument_11.jpg`** | DT-011: Căn cứ Thông Bình | **Không** | `CC BY-SA 2.0` (Thang Nguyen) | **⚠️ CHUNG CHUNG** — Ảnh flycam đồng cỏ Đồng Tháp Mười, không có đình/bia di tích Thông Bình. | **NÊN THAY** |
| `monument_12.jpg` | DT-012: Bảo tàng Đồng Tháp | **Không** *(đã kiểm trực quan)* | `CC BY-SA 3.0` (Bùi Thụy Đào Nguyên) — Cần ghi công | **ĐÚNG** — Có biển chữ nổi `"BẢO TÀNG ĐỒNG THÁP"`. | **ĐẠT** *(thêm Attribution)* |
| **`monument_13.jpg`** | DT-013: Tập kết 1954 | **Không** | `CC BY-SA 4.0` (Phương Huy) | **❌ SAI HOÀN TOÀN** — Ảnh tháp 7 tầng hồ sen Công viên Văn Miếu Cao Lãnh, không phải Tượng đài Tập kết 1954. | **THAY GẤP** |
| **`monument_14.jpg`** | DT-014: Chùa Phước Kiển | **Không** | `CC BY 2.5` (Willow) | **❌ SAI ĐỊA ĐIỂM (TẠI ĐỨC)** — Ảnh lá sen vua chụp trong **nhà kính Vườn thực vật Marburg (Đức)**, không phải Chùa Phước Kiển! | **THAY GẤP** |
| **`monument_15.jpg`** | DT-015: Bình Thành | **Không** | `CC BY-SA 4.0` (Phương Huy) | **❌ SAI HOÀN TOÀN** — Ảnh hội trường có băng rôn `"CHÀO MỪNG ĐẠI BIỂU"`, không phải bia/tượng đài di tích Bình Thành. | **THAY GẤP** |
| **`monument_16.jpg`** | DT-016: Đình Tân Phú Trung | **Không** | `CC BY 3.0` (Bùi Thụy Đào Nguyên) | **❌ SAI HOÀN TOÀN (TỈNH AN GIANG)** — Biển hiệu ghi rõ **`"ĐÌNH - THẦN PHAN-THANH-GIẢN"`** (Óc Eo, Thoại Sơn, An Giang). | **THAY GẤP** |
| **`monument_17.jpg`** | DT-017: Chùa Hưng Thiền | **CÓ NGƯỜI TỪ XA** (2–3 người đi xe máy trên QL30) | `CC BY-SA 3.0` (NDS) | **❌ SAI HOÀN TOÀN** — Chỉ chụp mặt đường nhựa **Quốc lộ 30** và quán `"Café Duyên"`, không thấy chùa. | **THAY GẤP** |
| **`monument_18.jpg`** | DT-018: Đình Long Thuận | **Không** | `CC BY-SA 4.0` (Mrfly911) | **❌ SAI HOÀN TOÀN (TỈNH AN GIANG)** — Biển hiệu ghi **`"ĐÌNH PHƯỚC HƯNG"`** (An Phú, An Giang). | **THAY GẤP** |
| **`monument_19.jpg`** | DT-019: Đình Phú Mỹ | **Không** | `CC BY-SA 4.0` (Mrfly911) | **❌ SAI HOÀN TOÀN (TỈNH AN GIANG)** — Biển hiệu ghi **`"ĐÌNH THẦN GIAO KHẨU - THỊ TRẤN AN PHÚ"`** (An Phú, An Giang). | **THAY GẤP** |
| **`monument_20.jpg`** | DT-020: Giồng Thị Đam | **CÓ MẶT NGƯỜI RÕ** (nam áo polo trắng đội mũ tai bèo lội cỏ giữa ảnh) | `CC BY-SA 3.0` (Nhthien) | **❌ SAI HOÀN TOÀN** — Ảnh người lội ruộng cỏ Đồng Tháp Mười, không phải Tượng đài Chiến thắng Giồng Thị Đam – Gò Quản Cung. | **THAY GẤP** |

---

### 2.2. Nhóm `culinary/` (12 ảnh đặc sản ẩm thực) & `seasons/` (4 mùa)

- **Hiện trạng thư mục:** Thư mục cục bộ `frontend/public/images/culinary/` và `frontend/public/images/seasons/` **chưa tồn tại** trong mã nguồn.
  - `SEASONAL_CALENDAR` hiển thị bằng Material Icons & thẻ nội dung (không gán ảnh riêng trong `seasons/`).
  - `CULINARY_SPECIALTIES` (`culturalHeritageData.js:642-959`) gọi trực tiếp **12 URL `images.unsplash.com`** (kèm 1 URL fallback trong `SeasonsAndCulinarySection.jsx:427`).
- **Bản quyền & Mặt người (12 ảnh Unsplash):** **0/12 ảnh có mặt người** (các điểm do OpenCV Haar báo ở `w2:p4` là báo giả trên vỉ nướng/pizza/bóng trái quýt); toàn bộ dùng theo **Unsplash License** miễn phí, không watermark.
- **Độ khớp nội dung (Thất bại 10/12 món):**

| Mã món (`CULINARY_SPECIALTIES`) | Nội dung thực tế trong ảnh Unsplash | Kết quả 3 tiêu chí | Khuyến nghị |
| :--- | :--- | :--- | :--- |
| `hu-tieu-sa-dec` | **Poke Bowl salad cá hồi sống, bơ & chanh** (không phải Hủ tiếu Sa Đéc) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `ca-loc-nuong-trui-la-sen` | **Sườn heo nướng BBQ & khoai tây chiên** (không phải Cá lóc nướng trui) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `nem-lai-vung` | **Bít tết bò tái (Steak) & thịt viên** (không phải Nem Lai Vung) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `banh-phong-tom-sa-giang` | **Há cảo Dimsum hấp xửng tre** (không phải Bánh phồng tôm) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `com-goi-la-sen` | **Cơm hải sản Paella Tây Ban Nha trong chảo** (không phải Cơm lá sen) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `chuot-dong-quay-lu` *(+ Fallback)* | **Thịt xiên Kebab Trung Đông trên bánh mì dẹt** (không phải Chuột quay lu) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & bỏ fallback này |
| `lau-ca-linh-bong-dien-dien` | **Couscous cá hồi áp chảo & sốt pesto** (không phải Lẩu cá linh bông điên điển) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `xoai-cat-chu-cao-lanh` | Quả xoài chín vàng trên nền trắng | Không người \| Unsplash \| **✅ CHẤP NHẬN** | Có thể tải về local |
| `quyt-hong-lai-vung` | Cam/quýt cam đỏ vỏ dày kiểu phương Tây | Không người \| Unsplash \| **⚠️ TẠM (khác giống)** | Nên thay quýt hồng Lai Vung |
| `kho-ca-loc-tam-nong` | **Phi-lê cá hồi áp chảo kiểu Âu** (không phải Khô cá lóc) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `banh-xeo-cao-lanh` | **Bánh Pizza gà nướng BBQ cắt lát** (không phải Bánh xèo miền Tây) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |
| `hat-sen-say-go-thap` | **Bánh Cupcake kem hồng gắn quả cherry** (không phải Hạt sen sấy) | Không người \| Unsplash \| **❌ SAI MÓN** | Thay & lưu cục bộ |

---

### 2.3. Nhóm `frontend/public/images/cultural_motifs/` (Sếu đầu đỏ, Hoa sen, Trống đồng)

| Nhóm tệp | 1. Có mặt/bóng người? | 2. Bản quyền | 3. Đúng nội dung? | Kết luận |
| :--- | :---: | :--- | :---: | :--- |
| `sarus_cranes/crane_1..7*.png` (7 tệp thực tế trên đĩa) | **Không** | Vector 2D nội bộ dự án, không dính bản quyền | **ĐÚNG** — Đúng đặc trưng sinh học *Grus antigone sharpii* (đầu cổ đỏ, thân xám tro), Alpha trong suốt sạch. | **ĐẠT 100%** |
| `lotus_bloom_dong_thap.png` & `lotus_bouquet_vertical.png` | **Không** | Tranh số nội bộ dự án (lưu ý 2 tệp trùng 100% nội dung 610 KB; `lotus_bloom_dong_thap.png` có cuống sen sạch) | **ĐÚNG** — Cụm hoa sen hồng Tháp Mười. | **ĐẠT** *(cân nhắc bỏ file trùng)* |
| `bronze_drum_dong_son.png` | **Không** | Đồ họa hoa văn cổ đại (Public Domain) | **ĐÚNG** — Mặt trống đồng Đông Sơn. | **ĐẠT 100%** |

---

### 2.4. Nhóm `gis_data/Hinh_Anh/` (Kho ảnh gốc & 18 biểu tượng mới tách nền)

| Thư mục / Tệp | 1. Có mặt/bóng người? | 2. Bản quyền & Kỹ thuật | 3. Đúng nội dung gán? | Kết luận |
| :--- | :---: | :--- | :--- | :---: |
| `02_Da_Loc_Tach_Nen/01_hoa_sen_hong_thap_muoi.png` | **CÓ BÀN TAY NGƯỜI** | Ảnh stock thương mại cắt nham nhở | **❌ SAI HOÀN TOÀN** — Ảnh **tay cầm chơi game PS4 DualShock 4** bay trên bàn tay người! | **XÓA NGAY** |
| `02_Da_Loc_Tach_Nen/07_guong_sen_dong_thap.png` | **Không** | Ảnh bánh ngọt stock cắt nền | **❌ SAI HOÀN TOÀN** — Ảnh **bánh Cupcake kem hồng quả cherry**! | **XÓA NGAY** |
| `02_Da_Loc_Tach_Nen/08_bong_sung_tim_mua_nuoc_noi.png` | **CÓ NGƯỜI THẬT** (cô gái đeo balo, đầu bị xóa trắng) | Ảnh du lịch phố châu Âu (Unsplash/Pexels) | **❌ SAI HOÀN TOÀN** — Ảnh **cô gái đi phượt trong hẻm phố châu Âu**, không phải bông súng! | **XÓA NGAY** |
| `02_Da_Loc_Tach_Nen/17_chua_vinh_trang_tien_giang.png` | **Không** | Ảnh chùa tách nền mờ đục như sương mù | **❌ SAI ĐỊA BÀN** — Chùa Vĩnh Tràng thuộc **tỉnh Tiền Giang**, không thuộc Đồng Tháp. | **XÓA NGAY** |
| `02_Da_Loc_Tach_Nen/03_xuong_ba_la_cho_hoa_sa_dec.png` | **CÓ RÕ MẶT 2 NGƯỜI THẬT** | Ảnh nhiếp ảnh đời sống, chưa xin phép nhân thân; tách nền thủng lỗ trắng | Đúng bối cảnh xuồng hoa nhưng vi phạm tiêu chí không mặt người & chất lượng tách nền kém. | **XÓA / THAY** |
| `02_Da_Loc_Tach_Nen/13_khan_ran_nam_bo.png` & `15_bo_doi_non_la_khan_ran.png` | **CÓ TƯỢNG HÌNH NGƯỜI** | Ảnh chụp mô hình tượng sáp bảo tàng | Sai đối tượng cô lập (`13_` chụp tượng nông dân gặt lúa thay vì khăn rằn). | **XÓA / THAY** |
| `02_Da_Loc_Tach_Nen/09_vom_sen_nguyen_sinh_sac.png` & `16_chieu_dinh_yen_lang_nghe.png` | **Không** | Tách nền lỗi nặng (mất 90–95% vật thể / trắng đục) | Tệp hỏng kỹ thuật, không dùng được. | **XÓA NGAY** |
| `02_Da_Loc_Tach_Nen/02_la_sen_vua_phuoc_kien.png` & `06_xoai_cat_cao_lanh_hoa_loc.png` | **Không** | Ảnh Wikimedia/stock tách nền | **❌ SAI SINH HỌC** — `02_` chụp hoa súng/sen nở (không phải lá sen nia); `06_` chụp xoài tròn vỏ đỏ phương Tây (không phải Xoài Cát Chu vàng thuôn). | **THAY THẾ** |
| `02_Da_Loc_Tach_Nen/12_dan_kim_don_ca_tai_tu.png` | **Không** | Ảnh hiện vật bảo tàng | Đúng đàn kìm nhưng dính tem số `[ 2 ]` màu đỏ góc dưới. | **CROP TEM `[ 2 ]`** |
| 6 tệp đạt chuẩn trong `02_Da_Loc_Tach_Nen/` (`04_bong_dien_dien`, `05_quyt_hong`, `10_vang_la_oc_eo`, `11_tuong_co`, `14_non_la`, `18_nha_co_huynh_thuy_le`) | **Không** | Ảnh hiện vật/vật thể cô lập tách nền sạch | **ĐÚNG** nội dung gán. | **ĐẠT** *(cần xác minh giấy phép gốc khi xuất bản)* |
| `03_Vector_My_Thuat_Tach_Nen/` (3 vector), `seu_dau_do/`, `hoa_sen/` | **Không** | Đồ họa vector/tư liệu nội bộ sạch | **ĐÚNG 100%** (hoa sen, lá sen vua chuẩn dáng tròn, bánh xe Óc Eo, sếu đầu đỏ). | **ĐẠT 100%** |

---

## PHẦN III — ĐỐI CHIẾU CHÉO 2 CẶP AGENT & DANH MỤC CẦN SỬA CHỮA

### 3.1. Kết quả Đối chiếu Chéo & Phân xử Bất đồng giữa 4 Báo cáo

1. **Về Pháp lý Di tích (`P5` + `PB` + `P8` vs `P4`):**
   - `P4` kết luận *"XÁC THỰC 100%"* cho cả `DT-009` (`2684/QĐ-BVHTTDL`), `DT-010` (`65/2004/QĐ-BVHTT`), và `DT-018` (Đình Long Thuận cấp Quốc gia).
   - **Phân xử:** **`P5`, `PB` và `P8` ĐÚNG** (đã xác minh trực tiếp bằng văn bản pháp quy):
     - `DT-009` đúng là **`3084/QĐ-BVHTTDL ngày 09/09/2013`** (`dsvh.gov.vn`).
     - `DT-010` số `65/2004/QĐ-BVHTT` là đền ở Thanh Hóa; ngày cấp đúng của Trần Văn Năng là **`19/01/2004`** (`thuvienphapluat.vn` & `cauchuyenlichsu.vn`).
     - `DT-018` Đình Long Thuận là **Di tích Cấp tỉnh** (`dsvh.gov.vn` văn bản 2018 xác nhận trực tiếp).
2. **Về Chùa Hưng Thiền (`DT-017`: `PB` vs `P8`):**
   - `P8` xác nhận đúng tượng Quán Thế Âm 33m tại Chùa Hưng Thiền; `PB` phản bác đây là nhầm lẫn với chùa tỉnh khác.
   - **Phân xử:** **`PB` ĐÚNG** — Hồ sơ `monumentsData.js:569` và `deepculture.vn` đều xác nhận Chùa Hưng Thiền (Cao Lãnh) là trường hạ Ni giới thờ Phật A Di Đà bằng đồng, không có tượng Quan Âm lộ thiên 33m.
3. **Về Kho `02_Da_Loc_Tach_Nen/` (`PB` vs `P4`):**
   - `P4` ghi 18 PNG trong thư mục này *"toàn bộ là hiện vật tĩnh, 100% KHÔNG CÓ KHUÔN MẶT NGƯỜI THẬT, kênh Alpha sạch sẽ"*.
   - **Phân xử:** **`PB` ĐÚNG** — Kiểm tra thị giác trực tiếp trên tệp khẳng định `01_` là **tay cầm PS4**, `07_` là **cupcake**, `08_` là **cô gái du lịch ở châu Âu**, `03_` có **rõ 2 mặt người dân**, `17_` là **Chùa Vĩnh Tràng (Tiền Giang)**. Kết luận này cho thấy `P4` đã không kiểm tra thị giác từng tệp trong thư mục `02_Da_Loc_Tach_Nen/`.
4. **Về Nhận diện Khuôn mặt & Địa danh Ảnh Di tích (`P4`/`P8` vs `P5`):**
   - `P4` dùng OpenCV Haar báo `monument_2, 4, 5, 12, 14` có 2–3 mặt người; `P5` và `P8` kiểm tra trực quan xác nhận **`monument_1, 2, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 18, 19` KHÔNG CÓ MẶT NGƯỜI** (Haar nhận diện nhầm trên cột gỗ/tán lá/lan can; riêng `monument_3, 8, 9, 10, 17, 20` mới có người/bóng người, trong đó `monument_20` lộ mặt rõ nhất).
   - Về địa danh ảnh sai: đối chiếu trực tiếp biển hiệu trong ảnh và Wikimedia Commons xác nhận `monument_14.jpg` là Vườn thực vật **Marburg (Đức)**, `monument_15.jpg` là **hội trường**, và `monument_16, 18, 19` là các đình tại huyện Thoại Sơn / An Phú (**tỉnh An Giang**) — chuẩn xác hơn dự đoán Bến Tre / Sa Đéc / Bạc Liêu của `P4`/`P8`.
5. **Về 12 Ảnh Ẩm thực (`P5` vs `P4`):**
   - `P4` đánh giá 4 món (`xoai`, `quyt`, `kho-ca-loc`, `hat-sen-say`) là *"PHÙ HỢP 85–90%"*.
   - **Phân xử:** **`P5` ĐÚNG** — Xem ảnh trực tiếp cho thấy `kho-ca-loc` thực chất là **phi-lê cá hồi áp chảo kiểu Âu** và `hat-sen-say` thực chất là **bánh Cupcake kem hồng**, nâng tổng số ảnh ẩm thực sai hoàn toàn lên **10/12 món**.

---

### 3.2. Danh mục Hành động Khắc phục Bắt buộc (Remediation Checklist)

1. **Sửa dữ liệu văn bản & pháp lý (`monumentsData.js`, `culturalHeritageData.js`, `monumentsTranslationsEn.js`, `02_seed_20_di_tich.sql`):**
   - `DT-018` (Đình Long Thuận): Chuyển `ranking` từ `"Quốc gia"` → **`"Cấp tỉnh"`** (đồng bộ cả JS và SQL).
   - `DT-009` (Định Yên): Sửa `2684/QĐ-BVHTTDL ngày 05/08/2013` → **`3084/QĐ-BVHTTDL ngày 09/09/2013`**.
   - `DT-010` (Trần Văn Năng): Xóa số QĐ sai `65/2004/QĐ-BVHTT`, sửa ngày công nhận thành **`19/01/2004`**, thống nhất năm mất **`1835`** (bỏ `1763–1838`).
   - `DT-001`: Sửa `"hồ sen пяти cánh"` → **`"hồ sen năm cánh"`** (`monumentsData.js:58`); rà soát số QĐ năm 1992.
   - `DT-002` & `DT-007`: Cập nhật diện tích quy hoạch Gò Tháp (`~290 ha`) và đồng bộ diện tích sân chim Gáo Giồng giữa VI/EN (`40 ha` theo TTXVN 2024 hoặc ghi chú thống nhất).
   - `DT-012`: Cập nhật số Bảo vật Quốc gia từ `3` → **`5 Bảo vật Quốc gia`**.
   - `culturalHeritageData.js`:
     - Dòng `107–108` (`TRAIL-OCEO`) & `SEAL-HN-18`: Xóa chi tiết Đình Long Thuận có sắc phong Tự Đức 1852.
     - Dòng `185, 193, 475` (`TRAIL-SADEC` & `SEAL-CL-17`): Xóa chi tiết tượng Bồ tát Quán Thế Âm 33m khỏi Chùa Hưng Thiền.
     - `SEAL-CT-16` (dòng `464`): Sửa sắc phong Tự Đức từ `1852` → **`1854`**.
   - `DT-019` (Đình Phú Mỹ): Bổ sung trích dẫn quyết định xếp hạng cấp tỉnh chính thức hoặc ghi chú rõ trạng thái xác minh thực địa.
   - `HeroPortalSection.jsx`: Ghi rõ phạm vi `"02 Di tích QGĐB (theo địa bàn tỉnh Đồng Tháp trước sáp nhập 2025)"`; chú thích dị bản `"nhứt"` / `"Cụ Hồ"` (1946).
2. **Thay thế 10 ảnh di tích sai & bổ sung ghi công bản quyền (`frontend/public/images/monuments/`):**
   - Bắt buộc thay thế **9 ảnh sai hoàn toàn** (`10, 13, 14, 15, 16, 17, 18, 19, 20`) và nâng cấp ảnh **#11** (cũng như cân nhắc thay **#3** bằng ảnh rừng tràm Xẻo Quýt không có du khách chiếm khung hình).
   - Bổ sung trường `photoAuthor` / `photoLicense` và hiển thị **Attribution (`CC BY` / `CC BY-SA`)** trên UI chi tiết di tích đối với các ảnh dùng từ Wikimedia Commons.
3. **Thay thế 10–11 ảnh ẩm thực & lưu cục bộ (`frontend/public/images/culinary/`):**
   - Tạo thư mục `frontend/public/images/culinary/`, tải/chụp ảnh đúng món ăn Nam Bộ cho ít nhất 10 món sai (`hu-tieu-sa-dec`, `ca-loc-nuong-trui-la-sen`, `nem-lai-vung`, `banh-phong-tom-sa-giang`, `com-goi-la-sen`, `chuot-dong-quay-lu`, `lau-ca-linh-bong-dien-dien`, `kho-ca-loc-tam-nong`, `banh-xeo-cao-lanh`, `hat-sen-say-go-thap`) và loại bỏ ảnh fallback Kebab (`photo-1555939594-58d7cb561ad1`) trong `SeasonsAndCulinarySection.jsx:427`.
4. **Dọn rác `gis_data/Hinh_Anh/bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/`:**
   - Di chuyển vào `_Archive/` (theo chính sách Zero-Deletion trong `AGENTS.md`) hoặc thay thế 11 tệp lỗi/sai: `01_` (tay cầm PS4), `02_` (hoa thay lá), `03_` (2 mặt người), `06_` (xoài đỏ Tây), `07_` (cupcake), `08_` (du khách châu Âu), `09_` (hỏng tách nền), `13_` & `15_` (tượng người), `16_` (hỏng tách nền), `17_` (Chùa Vĩnh Tràng Tiền Giang); crop tem `[ 2 ]` trên `12_dan_kim_don_ca_tai_tu.png`.
5. **Vệ sinh thư mục gốc (Directory Hygiene):**
   - Đã kiểm tra thư mục gốc `D:\KLTN24` tại thời điểm lập báo cáo: **0 tệp `.py` nháp còn sót lại** ở root (các script kiểm toán tạm trước đó đã được dọn sạch).
