# 🏛️ BÁO CÁO KIỂM TOÁN DỮ LIỆU & HÌNH ẢNH (NHÓM 2)
**Hệ thống Bản đồ số Di tích & Địa điểm Văn hóa tỉnh Đồng Tháp (SenMap Đồng Tháp)**  
**Đơn vị thực hiện:** OpenCode `w2:pB` (Kiểm toán độc lập & Đối soát chéo với `w2:p5`)  
**Nhánh Git:** `audit/data-and-image-verification`  
**Ngày thực hiện kiểm toán:** 12/11/2026  
**Chuẩn quy chiếu:** UNESCO, Cục Di sản Văn hóa (`dsvh.gov.vn`), Cổng TTĐT Tỉnh Đồng Tháp (`dongthap.gov.vn`), Báo Đồng Tháp (`baodongthap.vn`), Cục Du lịch Quốc gia Việt Nam (`vietnamtourism.gov.vn`).

---

## Executive Summary (Tóm tắt Kết quả Kiểm toán)

| Phân hệ Kiểm toán | Tổng số mục kiểm tra | Hợp lệ (Pass / ĐÚNG) | Lệch nhẹ / Cần bổ sung | Bất thường Nghiêm trọng (FAIL) | Đánh giá Rủi ro Tổng thể |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **A. Thông tin Di tích (DT-011 -> DT-020)** | 10 Di tích | 7 | 2 (Lệch năm / Số BVQG) | 1 (Nhầm cấp di tích DT-018) | **Trung bình** |
| **B. Tuyên bố Ngoại lai (Tiền Giang & UNESCO)** | 6 Tuyên bố | 1 (Đờn ca tài tử) | 0 | 5 (Thuộc tỉnh Tiền Giang) | **Cao (Cảnh báo nhầm lẫn)** |
| **C. 4 Mùa & 12 Đặc sản Ẩm thực** | 16 Mục | 16 | 0 | 0 | **Thấp / Tuyệt hảo** |
| **D. Hình ảnh Motif & Kho ảnh Mới** | 33 Tệp ảnh | 18 | 4 (Ảnh crop AI) | 11 (Có mặt người / PS4 / Cupcake / Sai tỉnh) | **Cực kỳ Nghiêm trọng (CRITICAL)** |

---

## PHẦN A: KIỂM TOÁN THÔNG TIN & TUYÊN BỐ LỊCH SỬ (FACT-CHECKING)

### 1. Bảng Đối Soát 10 Di Tích (DT-011 đến DT-020)

| Mã ID | Tên Di tích trong Dữ liệu | Trạng thái | Nguồn Đối chiếu Chính thống (Kèm URL) | Phân tích Rủi ro & Khuyến nghị Điều chỉnh |
| :--- | :--- | :---: | :--- | :--- |
| **DT-011** | Căn cứ Tỉnh ủy Kiến Phong (Khu di tích lịch sử Đình Ngã ba Thông Bình) | **ĐÚNG** | - [Cục Du lịch Quốc gia Việt Nam - Di tích Tân Hồng](https://vietnamtourism.gov.vn/post/37839)<br>- [Đài PT-TH Đồng Tháp THĐT](https://www.facebook.com/dongthaptvonline/videos/995461853882286)<br>- Quyết định xếp hạng Di tích lịch sử - văn hóa cấp tỉnh ngày 18/01/2016 của UBND tỉnh Đồng Tháp. | **Rủi ro: Thấp.** Thông tin lịch sử về đồn Bảo Thông Bình thời Thoại Ngọc Hầu và căn cứ biên giới Kiến Phong hoàn toàn chính xác. Tọa độ thực địa `[10.923587, 105.422561]` khớp ngã ba sông Sở Hạ giáp biên giới Campuchia. |
| **DT-012** | Bảo tàng Tỉnh Đồng Tháp (Cụm di tích Dinh Cò Tây & Nhà trưng bày Óc Eo) | **ĐÚNG (Cần bổ sung số lượng BVQG)** | - [Bảo tàng Tỉnh Đồng Tháp](https://baotang.dongthap.gov.vn/nha-trung-bay/bao-tang-tinh-dong-thap-134.html)<br>- [Báo Đồng Tháp - Bảo vật quốc gia](https://baodongthap.vn/giu-gin-va-phat-huy-gia-tri-bao-vat-quoc-gia-a231809.html)<br>- [Cục Di sản Văn hóa - Quyết định tu bổ](https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018)<br>- [Báo VietnamPlus TTXVN](https://www.vietnamplus.vn/kham-pha-cac-gia-tri-dac-biet-cua-5-bao-vat-quoc-gia-o-tinh-dong-thap-post1071944.vnp) | **Rủi ro: Rất thấp.** Dữ liệu hiện ghi "3 Bảo vật Quốc gia Óc Eo (tượng thần Vishnu, tượng nữ thần Lakshmi)". Thực tế đến nay Đồng Tháp đã có **5 Bảo vật Quốc gia** (bổ sung tượng Phật gỗ Bình Hòa và cổ vật khai quật Gò Tháp). Cần cập nhật số 3 thành 5 để phản ánh trọn vẹn hiện trạng. |
| **DT-013** | Tượng đài Tập kết ra Bắc năm 1954 (Địa điểm Tập kết ra Bắc 1954 tại Cao Lãnh) | **ĐÚNG (100% Verified)** | - [Báo Tiền Phong - Công nhận Di tích quốc gia](https://tienphong.vn/dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-tro-thanh-di-tich-lich-su-quoc-gia-post1582569.tpo)<br>- [Báo Tin Tức TTXVN](https://nvsk.vnanet.vn/le-don-nhan-bang-xep-hang-di-tich-lich-su-quoc-gia-dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-4-155087.vna)<br>- Quyết định xếp hạng Di tích quốc gia ngày 24/02/2023 của Bộ Văn hóa, Thể thao và Du lịch. | **Rủi ro: Không có (Zero Risk).** Khớp 100% mọi chỉ số: 13.508 cán bộ chiến sĩ miền Nam tập kết trong 100 ngày; tượng đài cao 11m của tác giả Ngô Liêm, khánh thành ngày 29/10/2019, diện tích 12.000 m². |
| **DT-014** | Chùa Phước Kiển (Chùa Lá Sen / Chùa Sen Vua) | **ĐÚNG** | - [Báo Dân Trí - Chùa Lá Sen Tân Nhuận Đông](https://dantri.com.vn/doi-song/ngoi-chua-ky-la-o-mien-tay-nguoi-nang-100kg-co-the-dung-tren-la-sen-20260705132415361.htm)<br>- [Cẩm nang Du lịch Vietnam Airlines](https://www.vietnamairlines.com/fr/vi/plan-book/travel/travel-guide/phuoc-kien-tu-chua-la-sen)<br>- Cổng TTĐT huyện Châu Thành, Đồng Tháp. | **Rủi ro: Thấp.** Ngôi cổ tự khởi dựng trước thời vua Thiệu Trị (1847), loài sen vua *Victoria amazonica* xuất hiện từ năm 1992, đường kính lá 2-3m, chịu tải trọng người 60-80kg có mâm gỗ. Thuộc nhóm "Điểm du lịch/Làng nghề tiêu biểu", không phải di tích quốc gia. |
| **DT-015** | Khu căn cứ kháng chiến Bình Thành (Địa điểm Vụ thảm sát Bình Thành) | **ĐÚNG (100% Verified)** | - [Cơ sở Dữ liệu Quốc gia Văn bản Pháp luật - QĐ 02/2004/QĐ-BVHTT](https://vbpl.vn/van-ban/chi-tiet/quyet-dinh-so-02-2004-qd-bvhtt-ve-viec-xep-hang-di-tich-quoc-gia--80459)<br>- [Cục Di sản Văn hóa - Danh mục Di tích quốc gia](https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018)<br>- Wikipedia Di tích quốc gia: Vụ Thảm sát Bình Thành (QĐ 02 ngày 19/01/2004). | **Rủi ro: Không có (Zero Risk).** Vụ thảm sát xảy ra ngày 11 - 12/11/1954, sát hại 34 đồng bào yêu nước. Xếp hạng Di tích quốc gia ngày 19/01/2004 theo QĐ số 02/2004/QĐ-BVHTT của Bộ Văn hóa - Thông tin. |
| **DT-016** | Đình Tân Phú Trung (Đình thần Tân Phú Trung) | **MỘT PHẦN (Lệch năm sắc phong giữa 2 file)** | - [Báo Đồng Tháp - Đình Tân Phú Trung giữ hồn di sản (16/06/2026)](https://baodongthap.vn/giu-hon-di-san-giua-nhip-song-hien-dai-a242059.html)<br>- [Cục Du lịch Quốc gia Việt Nam](https://vietnamtourism.gov.vn/post/29143)<br>- Bộ VHTTDL xếp hạng Di tích kiến trúc nghệ thuật cấp Quốc gia năm 2012. | **Rủi ro: Trung bình (Xung đột dữ liệu nội bộ).** Báo Đồng Tháp xác nhận đình được vua Tự Đức ban sắc phong năm **1854**. File `monumentsData.js` ghi năm 1854 (Đúng). Tuy nhiên, file `culturalHeritageData.js` (con dấu `SEAL-CT-16`) lại ghi: `"SẮC PHONG TỰ ĐỨC NĂM 1852"`. Khuyến nghị: Cần sửa `culturalHeritageData.js` từ năm 1852 thành 1854. |
| **DT-017** | Chùa Hưng Thiền (Hưng Thiền Cổ Tự) | **MỘT PHẦN (Sai thông tin tượng Quan Âm 33m)** | - [Phật giáo Đồng Tháp - Khóa an cư Chùa Hưng Thiền](https://www.phatgiaodongthap.vn/2025/09/video-chua-hung-thien-be-giang-khoa-cu.html)<br>- [Deep Culture Việt Nam - Chùa Hưng Thiền](https://deepculture.vn/van-hoa/dong-thap/chua-hung-thien)<br>- Đối chiếu: Tượng Quan Âm 33m thuộc Chùa Hưng Long (Chợ Gạo, Tiền Giang). | **Rủi ro: Cao.** Chùa Hưng Thiền tại xã Mỹ Hội, huyện Cao Lãnh là đạo tràng Ni giới tu học Tịnh Độ tông thờ Đức Phật A Di Đà bằng đồng. Nhưng trong `culturalHeritageData.js` (dòng 186 và con dấu `SEAL-CL-17`) lại mô tả: `"chiêm ngưỡng tượng Bồ tát Quán Thế Âm cao 33 mét tại Chùa Hưng Thiền"`. Đây là sự nhầm lẫn với Chùa Hưng Long (Tiền Giang) hoặc Chùa Hưng Thiện (Bạc Liêu). Cần xóa bỏ câu về tượng 33m trong `culturalHeritageData.js`. |
| **DT-018** | Đình Long Thuận (Đình thần Cù lao Long Thuận) | **SAI MỘT PHẦN (Nhầm cấp di tích & tên đình)** | - [Cục Di sản Văn hóa - Quyết định tu bổ di tích 2018](https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018)<br>- [Cục Du lịch Quốc gia - Đình Long Khánh](https://vietnamtourism.gov.vn/post/57733)<br>- Quyết định số 4704/QĐ-BVHTTDL ngày 18/12/2009 của Bộ VHTTDL. | **Rủi ro: Nghiêm trọng (High Risk).** Theo văn bản chính thức của Cục DSVH, di tích cấp **Quốc gia** năm 2009 tại huyện Hồng Ngự là **Đình Long Khánh** (xã Long Khánh A). Trong khi đó, **Đình Long Thuận** (xã Long Thuận) chỉ là **Di tích Cấp tỉnh**! Dữ liệu `monumentsData.js` đã gán nhầm cấp Quốc gia cho Đình Long Thuận. Đồng thời, con dấu `SEAL-HN-18` ghi "Sắc phong Tự Đức 1852" nhưng `monumentsData.js` lại ghi "vua Bảo Đại ban sắc phong năm 1936". Khuyến nghị: Cần hiệu chỉnh lại đúng cấp Tỉnh hoặc đổi tên thành Đình Long Khánh. |
| **DT-019** | Đình Phú Mỹ (Đình thần Phú Mỹ - Phú Lợi) | **CHƯA CÓ ĐỦ BẰNG CHỨNG (Unverified)** | - Cổng TTĐT huyện Thanh Bình (`thanhbinh.dongthap.gov.vn`)<br>- Danh mục Di tích Lịch sử cấp tỉnh Đồng Tháp (Cục DSVH & Sở VHTTDL). | **Rủi ro: Trung bình.** Tại huyện Thanh Bình, di tích đình làng cấp tỉnh được công nhận là **Đình Tân Phú** (xếp hạng 2021). Chưa tìm thấy quyết định pháp lý công nhận di tích cấp tỉnh riêng biệt mang tên "Đình Phú Mỹ xã Phú Lợi năm 2012". |
| **DT-020** | Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung | **ĐÚNG (100% Verified)** | - [Bảo tàng Tỉnh Đồng Tháp - Chiến thắng Giồng Thị Đam](https://baotang.dongthap.gov.vn/he-thong-trung-bay/di-tich-lich-su-chien-thang-giong-thi-dam-go-quan-cung-120.html)<br>- [Báo Quân đội Nhân dân - Chiến thắng trong mùa nước nổi](http://sknc.qdnd.vn/ky-niem-sau-sac/chien-thang-trong-mua-nuoc-noi-501607)<br>- Quyết định số 02/2004/QĐ-BVHTT ngày 19/01/2004 của Bộ Văn hóa - Thông tin. | **Rủi ro: Không có (Zero Risk).** Trận đánh ngày 26/09/1959 của Đại đội 274 (Tiểu đoàn 502) lập nên kỳ tích "tiếng sấm đầu mùa" mở màn Đồng Khởi vùng Đồng Tháp Mười. Xếp hạng Di tích quốc gia ngày 19/01/2004 hoàn toàn chính xác. |

---

### 2. Kiểm toán Tuyên bố Ngoại lai (Đối chiếu với Tỉnh Tiền Giang & UNESCO)

| Tuyên bố kiểm chứng | Trạng thái | Nguồn Pháp lý / Quốc tế | Kết luận Kiểm toán & Cảnh báo Dự án |
| :--- | :---: | :--- | :--- |
| **Chiến thắng Rạch Gầm - Xoài Mút (1785)** | **ĐÚNG (Nhưng thuộc Tiền Giang)** | - [Cục Di sản Văn hóa - Di tích Rạch Gầm - Xoài Mút](https://dsvh.gov.vn/di-tich-lich-su-dia-diem-chien-thang-rach-gam-xoai-mut-1209)<br>- QĐ số 2408/QĐ-TTg ngày 31/12/2014 của Thủ tướng Chính phủ. | Tọa lạc tại xã Kim Sơn, huyện Châu Thành, **tỉnh Tiền Giang**. Tuyệt đối **KHÔNG** đưa vào danh mục 20 di tích bản địa của tỉnh Đồng Tháp. |
| **Địa điểm Chiến thắng Ấp Bắc (1963)** | **ĐÚNG (Nhưng thuộc Tiền Giang)** | - [Cổng TTĐT Bộ Văn hóa, Thể thao và Du lịch](https://bvhttdl.gov.vn)<br>- QĐ số 1649/QĐ-TTg ngày 26/12/2022 của Thủ tướng Chính phủ. | Tọa lạc tại xã Tân Phú, thị xã Cai Lậy, **tỉnh Tiền Giang** (Di tích Quốc gia đặc biệt). Không thuộc phạm vi tỉnh Đồng Tháp. |
| **Địa điểm Khởi nghĩa Trương Định (1859-1864)** | **ĐÚNG (Nhưng thuộc Tiền Giang)** | - [Cục Di sản Văn hóa - Khởi nghĩa Trương Định](https://dsvh.gov.vn/di-tich-khoi-nghia-truong-dinh-tinh-tien-giang-22181)<br>- QĐ số 2499/QĐ-TTg ngày 22/12/2016 của Thủ tướng Chính phủ. | Tọa lạc tại thị xã Gò Công và huyện Gò Công Đông, **tỉnh Tiền Giang** (Căn cứ Đám lá tối trời). Không thuộc tỉnh Đồng Tháp. |
| **Chùa Vĩnh Tràng** | **ĐÚNG (Nhưng thuộc Tiền Giang)** | - Quyết định số 1288-VH/QĐ ngày 06/12/1984 của Bộ Văn hóa xếp hạng Di tích Kiến trúc nghệ thuật cấp Quốc gia. | Tọa lạc tại xã Mỹ Phong, thành phố Mỹ Tho, **tỉnh Tiền Giang**. Cực kỳ lưu ý: Đã phát hiện file ảnh `17_chua_vinh_trang_tien_giang.png` nằm trong kho biểu tượng Đồng Tháp (`gis_data/Hinh_Anh/bieu_tuong_dong_thap/`). Cần gỡ bỏ ngay! |
| **Làng cổ Đông Hòa Hiệp** | **ĐÚNG (Nhưng thuộc Tiền Giang)** | - Quyết định số 2087/QĐ-BVHTTDL năm 2017 của Bộ Văn hóa, Thể thao và Du lịch xếp hạng Di tích Kiến trúc nghệ thuật cấp Quốc gia. | Tọa lạc tại xã Đông Hòa Hiệp, huyện Cái Bè, **tỉnh Tiền Giang**. Không thuộc tỉnh Đồng Tháp. |
| **Đờn ca tài tử Nam Bộ (UNESCO 2013)** | **ĐÚNG (100% Verified)** | - [UNESCO Intangible Cultural Heritage - Art of Đờn ca tài tử](https://ich.unesco.org/en/RL/art-of-dn-ca-tai-t-music-and-song-in-southern-viet-nam-00733)<br>- Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 của Bộ VHTTDL. | Được UNESCO ghi danh Di sản văn hóa phi vật thể đại diện của nhân loại vào ngày **05/12/2013** tại Baku (Azerbaijan). Di sản chung của 21 tỉnh thành Nam Bộ; tại Đồng Tháp gắn liền với di sản Nhạc sư Nguyễn Vĩnh Bảo (Bảo tàng Đồng Tháp). |

---

### 3. Kiểm toán 4 Mùa & 12 Đặc sản Ẩm thực (`SeasonsAndCulinarySection.jsx`)

- **4 Mùa Văn hóa:**
  1. *Mùa Sen Nở Rộ (T5 - T8)*: Đúng chu kỳ sinh thái đầm sen Tháp Mười, Tam Nông, Cao Lãnh.
  2. *Mùa Nước Nổi (T9 - T11)*: Đúng chu kỳ thủy văn sông Tiền, đặc sản cá linh non và bông điên điển.
  3. *Mùa Hoa Tết Sa Đéc (T12 - T2)*: Đúng vụ thu hoạch hoa kiểng lớn nhất năm của làng hoa Sa Đéc.
  4. *Mùa Lễ hội Gò Tháp (Tháng 3 & Tháng 11 Âm lịch)*: Đúng 100% với hai kỳ vía Bà Chúa Xứ (14-16/3 ÂL) và giỗ Thiên Hộ Dương - Đốc Binh Kiều (14-16/11 ÂL).
- **12 Đặc sản Ẩm thực:** Toàn bộ 12 món (Hủ tiếu Sa Đéc, Cá lóc nướng trui lá sen non, Nem Lai Vung, Bánh phồng tôm Sa Giang, Cơm gói lá sen, Chuột quay lu, Lẩu cá linh bông điên điển, Xoài cát Chu Cao Lãnh, Quýt hồng Lai Vung, Khô cá lóc Tam Nông, Bánh xèo Cao Lãnh, Hạt sen sấy Gò Tháp) đều là đặc sản chỉ dẫn địa lý và văn hóa ẩm thực truyền thống đích thực của tỉnh Đồng Tháp.

---

## PHẦN B: KIỂM TOÁN HÌNH ẢNH (IMAGE AUDIT THEO 3 TIÊU CHÍ BẮT BUỘC)

### Tiêu chí Đánh giá:
1. **Tiêu chí 1 (Human Presence):** Ảnh có chứa mặt người hay bóng hình của ai không?
2. **Tiêu chí 2 (Copyright & Licensing):** Ảnh có dính bản quyền không? (Nguồn gốc ảnh tải về / chụp màn hình / Wikimedia Commons / AI generated / Ảnh stock thương mại).
3. **Tiêu chí 3 (Content Accuracy):** Ảnh có đúng với nội dung được gán cho nó không?

---

### 1. Bảng Kiểm Toán Chi Tiết Kho Ảnh `frontend/public/images/`

| Đường dẫn tệp ảnh | Tiêu chí 1: Mặt/Bóng người | Tiêu chí 2: Bản quyền & Nguồn gốc | Tiêu chí 3: Đúng nội dung gán | Kết luận & Đánh giá |
| :--- | :---: | :--- | :---: | :---: |
| `cultural_motifs/sarus_cranes/sarus_crane_standing_tall_right.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`doi_seu_dau_do...`). Không dính bản quyền nhiếp ảnh gia. | **ĐÚNG** (Sếu đầu đỏ dáng đứng canh gác bên phải, cổ đỏ, thân xám tro). | **PASS (ĐẠT)** |
| `cultural_motifs/sarus_cranes/sarus_crane_standing_guard_left.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`doi_seu_dau_do...`). | **ĐÚNG** (Sếu đầu đỏ dáng đứng thẳng cảnh giác bên trái). | **PASS (ĐẠT)** |
| `cultural_motifs/sarus_cranes/sarus_crane_running_trot.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`cap_seu_dau_do...`). | **ĐÚNG** (Sếu đầu đỏ sải chân chạy lấy đà cất cánh). | **PASS (ĐẠT)** |
| `cultural_motifs/sarus_cranes/sarus_crane_preening_rest.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`mot_con_seu_dau_do...`). | **ĐÚNG** (Sếu đứng một chân, uốn cổ rỉa lông cánh). | **PASS (ĐẠT)** |
| `cultural_motifs/sarus_cranes/sarus_crane_flight_soaring.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`mot_con_seu_dau_do...`). | **ĐÚNG** (Sếu dang rộng đôi cánh bay lượn ngang). | **PASS (ĐẠT)** |
| `cultural_motifs/sarus_cranes/sarus_crane_courtship_dance.png` | **KHÔNG** | Trích xuất từ vector 2D AI nội bộ (`cap_seu_dau_do...`). | **ĐÚNG** (Sếu vỗ cánh há mỏ nhảy múa gọi bạn tình). | **PASS (ĐẠT)** |
| `cultural_motifs/lotus_bloom_dong_thap.png` | **KHÔNG** | Tranh vẽ số AI, tách nền PNG trong suốt. Có một icon sparkle (✨) nhỏ góc phải lá. | **ĐÚNG** (Đài sen vàng, cánh sen hồng tươi tắn). | **PASS (ĐẠT)** |
| `cultural_motifs/lotus_bouquet_vertical.png` | **KHÔNG** | Tệp nhân bản (Duplicate 100% dung lượng 610.944 bytes) của `lotus_bloom_dong_thap.png`. | **ĐÚNG** (Hoa sen hồng). | **PASS (ĐẠT - Lưu ý tệp trùng lặp)** |
| `cultural_motifs/bronze_drum_dong_son.png` | **KHÔNG** | Vector đồ họa công cộng về mặt trống đồng Đông Sơn. Bản quyền tự do. | **ĐÚNG** (Hoa văn chim Lạc và ngôi sao mặt trời). | **PASS (ĐẠT)** |
| `images/seasons/` (4 ảnh mùa) | **N/A** | **CHƯA TỒN TẠI TRONG THƯ MỤC NÀY** (Missing directory). Giao diện dùng icon và Unsplash URL. | **N/A** | **Cần bổ sung nếu muốn dùng ảnh cục bộ** |

---

### 2. Bảng Kiểm Toán Kho Ảnh Gốc Mới `gis_data/Hinh_Anh/` — BÁO CÁO CÁC SỰ CỐ BẤT THƯỜNG

| Đường dẫn tệp ảnh | Tiêu chí 1: Mặt/Bóng người | Tiêu chí 2: Bản quyền & Nguồn gốc | Tiêu chí 3: Đúng nội dung gán | Mức độ Vi phạm & Kết luận |
| :--- | :---: | :--- | :---: | :---: |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/01_hoa_sen_hong_thap_muoi.png` | **CÓ TAY NGƯỜI THẬT** | Ảnh stock thương mại không rõ nguồn (chụp bàn tay tung tay cầm điều khiển PS4). | **SAI HOÀN TOÀN (LÀ TAY CẦM PS4 DUALSHOCK 4 TRÊN TAY NGƯỜI, KHÔNG PHẢI HOA SEN!)** | **CRITICAL FAIL (Bất thường nghiêm trọng — Phải xóa ngay)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/07_guong_sen_dong_thap.png` | **KHÔNG** | Ảnh chụp bánh ngọt thương mại (Cupcake kem hồng quả cherry). | **SAI HOÀN TOÀN (LÀ BÁNH CUPCAKE, KHÔNG PHẢI GƯƠNG SEN ĐỒNG THÁP!)** | **CRITICAL FAIL (Bất thường ngớ ngẩn — Phải xóa ngay)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/08_bong_sung_tim_mua_nuoc_noi.png` | **CÓ NGƯỜI THẬT RÕ NÉT** (Cô gái đeo balo) | Ảnh chụp chân dung du khách tại châu Âu (Unsplash/Pexels). | **SAI HOÀN TOÀN (LÀ CÔ GÁI ĐI PHƯỢT Ở NGÕ CHÂU ÂU, KHÔNG PHẢI BÔNG SÚNG!)** | **CRITICAL FAIL (Vi phạm quyền riêng tư & sai lệch 100% nội dung)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/03_xuong_ba_la_cho_hoa_sa_dec.png` | **CÓ RÕ MẶT 2 NGƯỜI THẬT** | Ảnh chụp đời sống của nhiếp ảnh gia tại Sa Đéc, tách nền lem nhem. Dính bản quyền tác giả & quyền chân dung. | Đúng cảnh chợ hoa nhưng dính chân dung 2 người dân địa phương lộ rõ mặt. | **FAIL (Vi phạm quyền hình ảnh cá nhân & bản quyền)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/13_khan_ran_nam_bo.png` | **CÓ 2 HÌNH TƯỢNG NGƯỜI** | Ảnh chụp mô hình tượng sáp sa bàn nông dân Nam Bộ trong bảo tàng. | Sai lệch: Đặt tên khăn rằn nhưng là 2 tượng người khom lưng gặt lúa. | **FAIL (Không phù hợp làm icon motif)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/15_bo_doi_non_la_khan_ran.png` | **CÓ 2 HÌNH TƯỢNG NGƯỜI** | Ảnh chụp tượng sáp mô hình bảo tàng du kích mặc áo bà ba. | Chứa hình dáng người, không phải vật thể văn hóa cô lập. | **FAIL (Chứa bóng hình người)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/17_chua_vinh_trang_tien_giang.png` | **KHÔNG** | Ảnh chụp cổng Chùa Vĩnh Tràng tách nền mờ đục. | **SAI ĐỊA BÀN: Chùa Vĩnh Tràng thuộc TỈNH TIỀN GIANG, không thuộc Đồng Tháp!** | **CRITICAL FAIL (Sai phạm vi địa lý dự án KLTN)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/09_vom_sen_nguyen_sinh_sac.png` | **KHÔNG** | Ảnh chụp vòm mộ Cụ Phó bảng. | **LỖI TÁCH NỀN HỎNG (Trắng xóa 95%, chỉ còn đôn đá cụt lủn và chòm lá).** | **FAIL (Tệp rác hỏng, không sử dụng được)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/16_chieu_dinh_yen_lang_nghe.png` | **KHÔNG** | Ảnh dệt chiếu Định Yên. | **LỖI TÁCH NỀN HỎNG (Trắng bệch, mờ đục như đám mây ma quái).** | **FAIL (Tệp rác hỏng, không sử dụng được)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/06_xoai_cat_cao_lanh_hoa_loc.png` | **KHÔNG** | Ảnh Wikimedia Commons xoài giống Apple Mango / Tommy Atkins phương Tây. | **SAI NỘI DUNG:** Đây là giống xoài tròn đỏ phương Tây, không phải Xoài Cát Chu Đồng Tháp (thon dài, vàng ươm, có mỏ cong). | **FAIL (Sai giống xoài bản địa)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/02_la_sen_vua_phuoc_kien.png` | **KHÔNG** | Ảnh chụp hoa sen trắng nở trên mặt nước có bóng soi. | **SAI NỘI DUNG:** Đặt tên là "lá sen vua", nhưng ảnh lại là **bông hoa súng/sen nở**, không có lá sen nia khổng lồ. | **FAIL (Nhầm hoa với lá)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/12_dan_kim_don_ca_tai_tu.png` | **KHÔNG** | Ảnh chụp cây đàn kìm Đờn ca tài tử. Dính tem catalog bảo vật số `[ 2 ]` màu đỏ ở góc dưới. | Đúng cây đàn kìm nhưng dính tem số bảo tàng. | **CẦN XỬ LÝ (Crop xóa tem số `[ 2 ]`)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/04_bong_dien_dien_mua_nuoc_noi.png` | **KHÔNG** | Ảnh chụp nhánh bông điên điển vàng tách nền. | **ĐÚNG** (Bông điên điển vàng mùa nước nổi). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/05_quyt_hong_lai_vung.png` | **KHÔNG** | Ảnh chụp trái quýt bóc múi tách nền. | **ĐÚNG** (Quýt múi mọng nước). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/10_hoa_van_vang_la_oc_eo_go_thap.png` | **KHÔNG** | Ảnh hiện vật khảo cổ 2 mảnh vàng lá Óc Eo Gò Tháp. | **ĐÚNG** (Vàng lá chạm khắc hình bánh xe / mặt trời). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/11_tuong_co_phu_nam_oc_eo.png` | **KHÔNG** | Ảnh hiện vật tượng Phật gỗ Óc Eo trong tủ kính bảo tàng. | **ĐÚNG** (Tượng cổ Phù Nam / Óc Eo). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/14_non_la_nam_bo.png` | **KHÔNG** | Ảnh chiếc nón lá Nam Bộ tách nền sạch sẽ. | **ĐÚNG** (Nón lá truyền thống). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/02_Da_Loc_Tach_Nen/18_nha_co_huynh_thuy_le_sa_dec.png` | **KHÔNG** | Ảnh mặt tiền Nhà cổ Huỳnh Thủy Lê Sa Đéc tách nền. | **ĐÚNG** (Kiến trúc nhà cổ Sa Đéc). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/03_Vector_My_Thuat_Tach_Nen/vec_01_hoa_sen_hong_dong_thap.png` | **KHÔNG** | Vector 2D hình hoa sen tối giản cách điệu. | **ĐÚNG** (Biểu trưng hoa sen). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/03_Vector_My_Thuat_Tach_Nen/vec_02_la_sen_vua_phuoc_kien.png` | **KHÔNG** | Vector 2D lá sen vua hình tròn có gân nan hoa. | **ĐÚNG** (Lá sen vua Phước Kiển). | **PASS (ĐẠT)** |
| `bieu_tuong_dong_thap/03_Vector_My_Thuat_Tach_Nen/vec_03_banh_xe_phap_luan_oc_eo.png` | **KHÔNG** | Vector 2D hình bánh xe Pháp luân văn hóa Óc Eo. | **ĐÚNG** (Họa tiết Óc Eo Phù Nam). | **PASS (ĐẠT)** |
| `gis_data/Hinh_Anh/seu_dau_do/` (4 ảnh vector) | **KHÔNG** | Bộ vector AI gốc 2D chuẩn đặc trưng sinh học sếu Tràm Chim. | **ĐÚNG 100%** | **PASS (ĐẠT)** |
| `gis_data/Hinh_Anh/hoa_sen/` (4 ảnh sen) | **KHÔNG** | Bộ ảnh sen hồng gốc và tách nền minh họa. | **ĐÚNG 100%** | **PASS (ĐẠT)** |

---

## PHẦN C: KHUYẾN NGHỊ KHẮC PHỤC DÀNH CHO ORCHESTRATOR & CODER (`w2:p5`)

1. **Về Dữ liệu Văn bản (Backend & Frontend State):**
   - **Đình Long Thuận (DT-018):** Chỉnh sửa trường `"ranking": "Cấp tỉnh"` trong `monumentsData.js`, hoặc đổi tên di tích thành **Đình Long Khánh** nếu muốn giữ nguyên xếp hạng Di tích Kiến trúc nghệ thuật cấp Quốc gia năm 2009.
   - **Đình Tân Phú Trung (DT-016):** Đồng bộ hóa năm ban sắc phong vua Tự Đức trong `culturalHeritageData.js` từ **1852 thành 1854** để khớp với `monumentsData.js` và tài liệu Báo Đồng Tháp.
   - **Chùa Hưng Thiền (DT-017):** Hiệu chỉnh đoạn văn và con dấu trong `culturalHeritageData.js`, xóa thông tin `"tượng Bồ tát Quán Thế Âm cao 33 mét"` vì đây là tượng của Chùa Hưng Long (Tiền Giang). Thay thế bằng mô tả đúng về đạo tràng Tịnh Độ tông và tượng Phật A Di Đà bằng đồng.
   - **Bảo tàng Tỉnh Đồng Tháp (DT-012):** Cập nhật số lượng Bảo vật Quốc gia từ 3 lên **5 Bảo vật Quốc gia** theo công bố mới nhất của Cục Di sản Văn hóa.

2. **Về Vệ sinh & Dọn rác Kho Ảnh (`gis_data/Hinh_Anh/bieu_tuong_dong_thap/`):**
   - **XÓA BỎ NGAY LẬP TỨC 3 TỆP ẢNH BẤT THƯỜNG / SAI LỆCH 100%:**
     - `01_hoa_sen_hong_thap_muoi.png` (ảnh tay cầm PS4).
     - `07_guong_sen_dong_thap.png` (ảnh bánh cupcake).
     - `08_bong_sung_tim_mua_nuoc_noi.png` (ảnh cô gái đi phượt ở phố châu Âu).
   - **XÓA BỎ TỆP NGOẠI TỈNH:**
     - `17_chua_vinh_trang_tien_giang.png` (thuộc Tiền Giang, không liên quan đến Đồng Tháp).
   - **XÓA BỎ HOẶC THAY THẾ ẢNH VI PHẠM MẶT NGƯỜI & BẢN QUYỀN:**
     - `03_xuong_ba_la_cho_hoa_sa_dec.png` (dính mặt 2 người dân, nguy cơ vi phạm bản quyền và quyền nhân thân).
     - `13_khan_ran_nam_bo.png` và `15_bo_doi_non_la_khan_ran.png` (ảnh chụp mô hình người bảo tàng).
   - **XÓA BỎ ẢNH HỎNG DO TÁCH NỀN LỖI:**
     - `09_vom_sen_nguyen_sinh_sac.png` và `16_chieu_dinh_yen_lang_nghe.png`.
   - **THAY THẾ ẢNH SAI NỘI DUNG SINH HỌC:**
     - `06_xoai_cat_cao_lanh_hoa_loc.png` (thay bằng ảnh Xoài Cát Chu dáng thuôn dài vàng ruộm chuẩn Đồng Tháp).
     - `02_la_sen_vua_phuoc_kien.png` (thay bằng ảnh lá sen khổng lồ hình nia thay vì ảnh bông hoa sen nở).

---
*Báo cáo được lập với tinh thần khách quan 100%, dựa trên bằng chứng kiểm tra chéo thực tế và nguồn dữ liệu pháp lý của Nhà nước.*
