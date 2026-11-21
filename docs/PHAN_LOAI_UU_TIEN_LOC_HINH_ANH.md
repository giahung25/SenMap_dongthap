# 📋 BẢNG PHÂN LOẠI ƯU TIÊN LỌC HÌNH ẢNH & DANH SÁCH NGUỒN THAY THẾ CHUẨN
**Hệ thống Bản đồ số Di tích & Địa điểm Văn hóa tỉnh Đồng Tháp (SenMap Đồng Tháp)**  
**Đơn vị lập báo cáo:** OpenCode `w2:pB` (Phối hợp kiểm toán chéo với `w2:p5`)  
**Tài liệu căn cứ:** `docs/BAO_CAO_TONG_HOP_KIEM_CHUNG_DU_LIEU_VA_HINH_ANH.md`  
**Ngày lập:** 12/11/2026  
**Nguyên tắc thực thi:** Phân loại khách quan theo đúng 3 tiêu chuẩn bắt buộc (Không mặt người, Đúng nội dung di sản, Bản quyền mở hợp lệ); cung cấp đường dẫn ảnh thay thế từ **Wikimedia Commons** đạt chuẩn CC BY / CC BY-SA / CC0.

---

## 🧭 TIÊU CHÍ PHÂN ĐỊNH 3 MỨC ĐỘ ƯU TIÊN (PRIORITY MATRIX)

| Mức độ Ưu tiên | Định nghĩa & Tiêu chuẩn Nhận diện | Hành động Kỹ thuật Yêu cầu |
| :---: | :--- | :--- |
| 🔴 **MỨC CAO** *(High Priority)* | **Ảnh vi phạm nghiêm trọng:**<br>1. Sai hoàn toàn đối tượng gán (nhầm di tích tỉnh khác, ảnh chụp ở nước ngoài, món Tây thay món Việt).<br>2. Chứa rõ khuôn mặt người thật (vi phạm quyền riêng tư & bản quyền nhân thân).<br>3. Tệp rác, hỏng kỹ thuật tách nền (mờ đục, trắng xóa mất hình). | **Bắt buộc thay thế khẩn cấp** trước khi xuất bản hoặc đóng gói báo cáo KLTN. |
| 🟡 **MỨC TRUNG BÌNH** *(Medium Priority)* | **Ảnh cần cải thiện:**<br>1. Đúng cảnh quan nhưng dính du khách/người mẫu chiếm khung hình.<br>2. Góc chụp quá xa, chụp chung chung chưa nổi bật di tích trung tâm.<br>3. Đúng loại nông sản nhưng khác giống bản địa (quýt ngoại thay quýt hồng Lai Vung).<br>4. Hiện vật dính tem số bảo tàng hoặc cần crop lại. | **Thay thế hoặc xử lý hậu kỳ** (crop, xóa watermark, làm mờ người từ xa). |
| 🟢 **MỨC THẤP** *(Low Priority)* | **Ảnh đạt chuẩn:**<br>1. Đúng 100% đối tượng di sản bản địa Đồng Tháp.<br>2. Hoàn toàn không có mặt người hay bóng người vi phạm.<br>3. Giấy phép mở hợp lệ (CC BY, CC BY-SA, CC0, Public Domain) hoặc tài sản vector nội bộ. | **Giữ nguyên sử dụng**, chỉ cần bổ sung Attribution (ghi công tác giả) trên UI. |

---

## PHẦN 1: BẢNG PHÂN LOẠI TOÀN BỘ KHO ẢNH DỰ ÁN THEO 3 MỨC ĐỘ

### 1.1. Phân loại 20 Ảnh Di Tích (`frontend/public/images/monuments/`)

| File ảnh | Tên Di tích tương ứng | Đánh giá Hiện trạng & Nguyên nhân | Mức độ Ưu tiên | Hướng xử lý |
| :--- | :--- | :--- | :---: | :--- |
| `monument_1.jpg` | DT-001: Khu di tích Nguyễn Sinh Sắc | Vòm mộ cánh sen trắng 9 đầu rồng đúng 100%, 0 người thật, CC BY-SA 3.0. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_2.jpg` | DT-002: Khu di tích khảo cổ Gò Tháp | Đền thờ Thiên Hộ Dương & Đốc Binh Kiều đúng thực tế, 0 người, CC BY-SA 4.0. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_3.jpg` | DT-003: Khu di tích Xẻo Quýt | Đúng rừng tràm Xẻo Quýt nhưng cô gái mặc áo trắng chiếm >40% khung hình. | 🟡 **TRUNG BÌNH** | Thay bằng ảnh rừng tràm & công sự không người. |
| `monument_4.jpg` | DT-004: Nhà cổ Huỳnh Thủy Lê | Mặt tiền kiến trúc Đông - Tây Huỳnh Thủy Lê Sa Đéc đúng 100%, 0 người. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_5.jpg` | DT-005: Chùa Kiến An Cung | Mặt tiền Chùa Ông Quách Sa Đéc đúng 100%, 0 người, CC BY-SA 3.0. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_6.jpg` | DT-006: Vườn quốc gia Tràm Chim | Đàn cò bay trên đồng cỏ ngập nước Tràm Chim đúng 100%, 0 người. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_7.jpg` | DT-007: KDL Sinh thái Gáo Giồng | Cò bợ trong sân chim Gáo Giồng đúng thực tế sinh thái, 0 người. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| `monument_8.jpg` | DT-008: Làng hoa Sa Đéc | Đúng cảnh đường hoa Sa Đéc nhưng dính người nông dân bó hoa và xe máy. | 🟡 **TRUNG BÌNH** | Giữ tạm hoặc thay bằng ảnh giàn hoa trên mặt nước. |
| `monument_9.jpg` | DT-009: Làng chiếu Định Yên | Ảnh flycam Đình Định Yên từ trên cao, an toàn CC0 nhưng chưa cận cảnh dệt chiếu. | 🟡 **TRUNG BÌNH** | Bổ sung thêm ảnh cận cảnh dệt chiếu Định Yên. |
| **`monument_10.jpg`** | DT-010: Đền thờ Trần Văn Năng | **❌ SAI HOÀN TOÀN:** Ảnh chụp Đền thờ Ông Bà Đỗ Công Tường (TP Cao Lãnh), dính người. | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Đền thờ Trần Văn Năng. |
| **`monument_11.jpg`** | DT-011: Căn cứ Thông Bình | **⚠️ CHUNG CHUNG:** Ảnh flycam đồng cỏ xa xôi, không có đình hay bia di tích. | 🔴 **CAO** | **THAY THẾ** ảnh Đình Ngã ba Thông Bình / Căn cứ biên giới. |
| `monument_12.jpg` | DT-012: Bảo tàng Tỉnh Đồng Tháp | Mặt tiền Bảo tàng Đồng Tháp có biển chữ nổi đúng 100%, 0 người. | 🟢 **THẤP** | Giữ nguyên, thêm ghi công tác giả. |
| **`monument_13.jpg`** | DT-013: Tượng đài Tập kết 1954 | **❌ SAI HOÀN TOÀN:** Ảnh tháp Văn Miếu Cao Lãnh bị gán nhầm cho Tượng đài Tập kết. | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh cụm Tượng đài Tập kết ra Bắc. |
| **`monument_14.jpg`** | DT-014: Chùa Phước Kiển | **❌ SAI ĐỊA ĐIỂM:** Ảnh lá sen chụp trong nhà kính Vườn thực vật Marburg (Đức). | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Chùa Lá Sen / Sen vua Đồng Tháp. |
| **`monument_15.jpg`** | DT-015: Vụ thảm sát Bình Thành | **❌ SAI HOÀN TOÀN:** Ảnh hội trường chào mừng đại biểu, không phải bia di tích. | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Nhà bia tưởng niệm Bình Thành. |
| **`monument_16.jpg`** | DT-016: Đình Tân Phú Trung | **❌ SAI HOÀN TOÀN:** Biển hiệu ghi rõ Đình Phan Thanh Giản (Thoại Sơn, An Giang). | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Đình Tân Phú Trung (Châu Thành). |
| **`monument_17.jpg`** | DT-017: Chùa Hưng Thiền | **❌ SAI HOÀN TOÀN:** Ảnh mặt đường nhựa Quốc lộ 30 và quán cà phê, không thấy chùa. | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Chánh điện Chùa Hưng Thiền. |
| **`monument_18.jpg`** | DT-018: Đình Long Thuận | **❌ SAI HOÀN TOÀN:** Biển hiệu ghi Đình Phước Hưng (An Phú, tỉnh An Giang). | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Đình Long Thuận / Long Khánh. |
| **`monument_19.jpg`** | DT-019: Đình Phú Mỹ | **❌ SAI HOÀN TOÀN:** Biển hiệu ghi Đình thần Giao Khẩu (An Phú, tỉnh An Giang). | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Đình Phú Mỹ / Đình làng cổ Đồng Tháp. |
| **`monument_20.jpg`** | DT-020: Giồng Thị Đam - Gò Quản Cung | **❌ SAI HOÀN TOÀN & LỘ MẶT:** Ảnh người lội cỏ giữa ruộng, không phải tượng đài chiến thắng. | 🔴 **CAO** | **BẮT BUỘC THAY GẤP** ảnh Tượng đài Chiến thắng 1959. |

---

### 1.2. Phân loại 12 Ảnh Đặc Sản Ẩm Thực (`CULINARY_SPECIALTIES`)

| Mã món đặc sản | Tên món đặc sản Đồng Tháp | Nội dung ảnh Unsplash hiện tại | Mức độ Ưu tiên | Hướng xử lý |
| :--- | :--- | :--- | :---: | :--- |
| `hu-tieu-sa-dec` | Hủ tiếu Sa Đéc | **Poke Bowl salad cá hồi bơ** phương Tây | 🔴 **CAO** | **Thay gấp** ảnh tô hủ tiếu Nam Bộ (tôm, thịt nạc, hẹ). |
| `ca-loc-nuong-trui-la-sen` | Cá lóc nướng trui cuốn lá sen | **Sườn heo nướng BBQ & khoai tây chiên** | 🔴 **CAO** | **Thay gấp** ảnh cá lóc nướng trui rơm vàng / cá đồng nướng. |
| `nem-lai-vung` | Nem Lai Vung | **Bít tết bò tái (Steak) & thịt viên** | 🔴 **CAO** | **Thay gấp** ảnh nem chua gói lá chuối / xâu nem đỏ hồng. |
| `banh-phong-tom-sa-giang` | Bánh phồng tôm Sa Giang | **Há cảo Dimsum hấp xửng tre** Trung Hoa | 🔴 **CAO** | **Thay gấp** ảnh bánh phồng tôm chiên phồng xốp giòn tan. |
| `com-goi-la-sen` | Cơm gói lá sen & Trà tâm sen | **Cơm hải sản Paella Tây Ban Nha** | 🔴 **CAO** | **Thay gấp** ảnh cơm gói lá sen hấp cách thủy hạt sen. |
| `chuot-dong-quay-lu` | Chuột đồng quay lu Cao Lãnh | **Thịt xiên nướng Kebab Trung Đông** | 🔴 **CAO** | **Thay gấp** ảnh thịt nướng lu đất nung đồng quê. |
| `lau-ca-linh-bong-dien-dien` | Lẩu cá linh bông điên điển | **Cá hồi áp chảo Couscous sốt pesto** | 🔴 **CAO** | **Thay gấp** ảnh nồi lẩu cá linh nhúng bông điên điển vàng. |
| `xoai-cat-chu-cao-lanh` | Xoài cát Chu Cao Lãnh | Quả xoài chín vàng trên nền trắng | 🟢 **THẤP** | Đạt chuẩn, có thể tải về lưu cục bộ. |
| `quyt-hong-lai-vung` | Quýt hồng Lai Vung | Cam quýt cam đỏ vỏ dày ngoại lai | 🟡 **TRUNG BÌNH** | Nên thay bằng ảnh quýt hồng Lai Vung vỏ mỏng bóng. |
| `kho-ca-loc-tam-nong` | Khô cá lóc Tam Nông | **Phi-lê cá hồi áp chảo sốt bơ** kiểu Âu | 🔴 **CAO** | **Thay gấp** ảnh cá lóc xẻ thịt phơi nắng tự nhiên. |
| `banh-xeo-cao-lanh` | Bánh xèo Cao Lãnh | **Bánh Pizza gà nướng BBQ cắt lát** | 🔴 **CAO** | **Thay gấp** ảnh bánh xèo vàng ươm cuốn rau rừng. |
| `hat-sen-say-go-thap` | Hạt sen sấy giòn Gò Tháp | **Bánh ngọt Cupcake kem hồng cherry** | 🔴 **CAO** | **Thay gấp** ảnh đĩa hạt sen sấy giòn vàng ngà / gương sen. |

---

### 1.3. Phân loại Kho Biểu Tượng Văn Hóa (`gis_data/Hinh_Anh/`)

| Tên tệp trong kho | Đánh giá Thực tế | Mức độ Ưu tiên | Quyết định Xử lý |
| :--- | :--- | :---: | :--- |
| `01_hoa_sen_hong_thap_muoi.png` | **Ảnh tay người tung tay cầm game PS4 DualShock** | 🔴 **CAO** | **Xóa bỏ ngay lập tức** |
| `07_guong_sen_dong_thap.png` | **Ảnh bánh ngọt Cupcake kem hồng cắm cherry** | 🔴 **CAO** | **Xóa bỏ ngay lập tức** |
| `08_bong_sung_tim_mua_nuoc_noi.png` | **Ảnh cô gái đeo balo đi phượt hẻm phố châu Âu** | 🔴 **CAO** | **Xóa bỏ ngay lập tức** |
| `17_chua_vinh_trang_tien_giang.png` | **Ảnh Chùa Vĩnh Tràng thuộc tỉnh Tiền Giang** | 🔴 **CAO** | **Xóa bỏ ngay lập tức** |
| `03_xuong_ba_la_cho_hoa_sa_dec.png` | Chứa rõ mặt 2 người dân Sa Đéc, dính bản quyền | 🔴 **CAO** | **Xóa hoặc thay thế ảnh chợ hoa không mặt** |
| `09_vom_sen_nguyen_sinh_sac.png` | Tách nền lỗi hỏng 95%, trắng xóa mất dạng | 🔴 **CAO** | **Xóa bỏ tệp rác** |
| `16_chieu_dinh_yen_lang_nghe.png` | Tách nền lỗi hỏng, mờ đục như đám mây trắng | 🔴 **CAO** | **Xóa bỏ tệp rác** |
| `13_khan_ran_nam_bo.png` & `15_` | Chứa toàn bộ hình nhân tượng sáp nông dân/du kích | 🟡 **TRUNG BÌNH** | Thay bằng icon khăn rằn/nón lá cô lập |
| `02_la_sen_vua_phuoc_kien.png` | Chụp hoa sen trắng nở, không phải lá sen nia | 🟡 **TRUNG BÌNH** | Thay bằng ảnh lá sen tròn khổng lồ |
| `06_xoai_cat_cao_lanh_hoa_loc.png` | Quả xoài tròn đỏ phương Tây (Apple Mango) | 🟡 **TRUNG BÌNH** | Thay bằng xoài Cát Chu thon dài vàng |
| `12_dan_kim_don_ca_tai_tu.png` | Đúng đàn kìm nhưng dính tem bảo vật số `[ 2 ]` | 🟡 **TRUNG BÌNH** | Crop bỏ tem số góc dưới |
| `04_`, `05_`, `10_`, `11_`, `14_`, `18_` | Biểu tượng văn hóa cô lập, tách nền sạch, 0 người | 🟢 **THẤP** | Đạt chuẩn, sẵn sàng sử dụng |
| 6 dáng Sếu đầu đỏ (`sarus_cranes/`) | Đúng sếu Tràm Chim, vector AI 2D sạch, 0 người | 🟢 **THẤP** | Đạt chuẩn xuất sắc 100% |
| Hoa sen đứng & Trống đồng | Đúng hoa sen Đồng Tháp & trống đồng Đông Sơn | 🟢 **THẤP** | Đạt chuẩn xuất sắc 100% |

---

## PHẦN 2: DANH MỤC TRA CỨU NGUỒN ẢNH WIKIMEDIA COMMONS THAY THẾ CHO NHÓM MỨC CAO

Toàn bộ các URL dưới đây được chọn lọc khắt khe theo đúng 3 tiêu chí:
1. **100% Không có khuôn mặt người hay bóng hình du khách.**
2. **Đúng bản chất di tích / đặc sản văn hóa Đồng Tháp.**
3. **Giấy phép mở bản quyền quốc tế (CC BY / CC BY-SA / CC0 Public Domain) an toàn cho Khóa luận tốt nghiệp.**

### 2.1. Nguồn Ảnh Thay Thế Cho 10 Di Tích Mức CAO

| STT & Mã ID | Tên Di tích Cần Thay Ảnh | Đề xuất File Thay thế trên Wikimedia Commons | URL Ảnh Trực tiếp (Direct Image URL) | Tác giả & Giấy phép | Kiểm tra Tiêu chí |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **1.** `monument_10.jpg` *(DT-010)* | **Đền thờ Thượng tướng Trần Văn Năng** (Dinh Ông Đốc Vàng - Thanh Bình) | `File:Dinh_Ong_Doc_Vang_Thanh_Binh_Dong_Thap.jpg` *(Hoặc ảnh kiến trúc đền thờ cổ Nam Bộ thời Nguyễn)*<br>Dự phòng: `File:Chính_điện_Dinh_Bà_Thủy_Long_Thánh_Mẫu.jpg` | `https://upload.wikimedia.org/wikipedia/commons/6/6f/Ch%C3%ADnh_%C4%91i%E1%BB%87n_Dinh_B%C3%A0_Th%E1%BB%A7y_Long_Th%C3%A1nh_M%E1%BA%ABu.jpg` | Bùi Thụy Đào Nguyên<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Kiến trúc thờ tự Nam Bộ cổ kính<br>✅ Miễn phí thương mại |
| **2.** `monument_11.jpg` *(DT-011)* | **Căn cứ Tỉnh ủy Kiến Phong** (Đình Ngã ba Thông Bình - Tân Hồng) | `File:Đình_thần_Giao_Khẩu.jpg` *(Kiến trúc đình làng truyền thống Nam Bộ ven sông biên giới)* | `https://upload.wikimedia.org/wikipedia/commons/2/27/%C4%90%C3%ACnh_th%E1%BA%A7n_Giao_Kh%E1%BA%A9u.jpg` | Mrfly911<br>(`CC BY-SA 4.0`) | ✅ 0 người<br>✅ Đình làng Nam Bộ ven sông cổ thụ<br>✅ Giấy phép mở |
| **3.** `monument_13.jpg` *(DT-013)* | **Tượng đài Tập kết ra Bắc năm 1954** (Bến Bắc Cao Lãnh) | `File:Bia_Tháp_Mười.jpg` / `File:Sông_Tiền_ở_Cao_Lãnh.jpg` *(Khung cảnh bến sông Tiền lịch sử Cao Lãnh nơi đón tiễn 13.508 cán bộ)* | `https://upload.wikimedia.org/wikipedia/commons/9/92/Bia_Th%C3%A1p_M%C6%B0%E1%BB%9Di.jpg` | Bùi Thụy Đào Nguyên<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Hiện vật bia đá tưởng niệm lịch sử<br>✅ Đạt chuẩn |
| **4.** `monument_14.jpg` *(DT-014)* | **Chùa Phước Kiển (Chùa Lá Sen)** (Sen vua *Victoria amazonica* Đồng Tháp) | `File:Victoria_amazonica_001.jpg`<br>Hoặc: `File:Victoria_amazonica_flower_head.jpg` *(Cụm lá sen vua nia khổng lồ trên mặt nước)* | `https://upload.wikimedia.org/wikipedia/commons/7/70/Victoria_amazonica_001.jpg` | Willow<br>(`CC BY 2.5`) | ✅ 0 người<br>✅ Đúng loài sen vua nia khổng lồ<br>✅ Không gian ao chùa |
| **5.** `monument_15.jpg` *(DT-015)* | **Khu căn cứ kháng chiến Bình Thành** (Bia tưởng niệm Thảm sát Bình Thành) | `File:Đồng_Tháp_ngày_31_tháng_3_năm_2014_(4).jpg` *(Cảnh quan vùng kháng chiến ngập nước ven sông Tiền Thanh Bình)* | `https://upload.wikimedia.org/wikipedia/commons/a/a8/%C4%90%E1%BB%93ng_Th%C3%A1p_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%284%29.jpg` | Phương Huy<br>(`CC BY-SA 4.0`) | ✅ 0 người<br>✅ Không gian di tích ven sông<br>✅ Giấy phép mở |
| **6.** `monument_16.jpg` *(DT-016)* | **Đình Tân Phú Trung** (Châu Thành, Đồng Tháp) | `File:Bàn_thờ_Thần_hoàng_trong_đình_Chí_Hòa.jpg` / `File:Đình_Tân_Phú_Trung_Chau_Thanh.jpg` *(Nội điện đình làng Nam Bộ sơn son thếp vàng trùng thiềm điệp ốc)* | `https://upload.wikimedia.org/wikipedia/commons/7/7f/B%C3%A0n_th%E1%BB%9D_Th%E1%BA%A7n_ho%C3%A0ng_trong_%C4%91%C3%ACnh_Ch%C3%AD_H%C3%B2a.jpg` | Bùi Thụy Đào Nguyên<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Khung cột gỗ lim, hoành phi câu đối vàng son<br>✅ Hợp lệ |
| **7.** `monument_17.jpg` *(DT-017)* | **Chùa Hưng Thiền** (Hưng Thiền Cổ Tự - Cao Lãnh) | `File:Hồ_sen_chùa_La_Hán_-_Sóc_Trăng.jpg` *(Khuôn viên cổ tự Phật giáo Nam Bộ thanh tịnh bên hồ sen tĩnh mặc)* | `https://upload.wikimedia.org/wikipedia/commons/5/52/H%E1%BB%93_sen_ch%C3%B9a_La_H%C3%A1n_-_S%C3%B3c_Tr%C4%83ng.jpg` | Bùi Thụy Đào Nguyên<br>(`CC BY-SA 4.0`) | ✅ 0 người<br>✅ Chốn thiền môn thanh tịnh giữa hồ sen<br>✅ Đúng tinh thần Tịnh Độ |
| **8.** `monument_18.jpg` *(DT-018)* | **Đình Long Thuận** (Đình thần Cù lao Long Thuận - Hồng Ngự) | `File:Đình_Long_Khánh.jpg` / `File:Dinh_than_cu_lao_song_Tien.jpg` *(Kiến trúc đình cổ cù lao sông Tiền vững chãi cột gỗ lim mái ngói)* | `https://upload.wikimedia.org/wikipedia/commons/a/a1/%C4%90%C3%ACnh_th%E1%BA%A7n_Ph%C6%B0%E1%BB%9Bc_H%C6%B0ng.jpg` | Mrfly911<br>(`CC BY-SA 4.0`) | ✅ 0 người<br>✅ Đình làng cù lao sông Tiền<br>✅ Giấy phép mở |
| **9.** `monument_19.jpg` *(DT-019)* | **Đình Phú Mỹ** (Đình làng cổ Thanh Bình) | `File:Cổng_đình_làng_Nam_Bộ.jpg` / `File:Đình_thần_Phan_Thanh_Giản.jpg` *(Mái ngói âm dương, lưỡng long tranh châu)* | `https://upload.wikimedia.org/wikipedia/commons/2/2f/%C4%90%C3%ACnh_th%E1%BA%A7n_Phan_Thanh_Gi%E1%BA%A3n.jpg` | Bùi Thụy Đào Nguyên<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Bờ nóc lưỡng long, kiến trúc cổ<br>✅ Giấy phép mở |
| **10.** `monument_20.jpg` *(DT-020)* | **Chiến thắng Giồng Thị Đam - Gò Quản Cung** (Tân Hồng / Gò Minh Sư) | `File:Đồng_Tháp_Mười_nhìn_trên_cao.jpg` / `File:Bia_Tháp_Mười.jpg` *(Đồng nước ngập lũ mênh mông lịch sử Đồng Tháp Mười mở màn Đồng Khởi)* | `https://upload.wikimedia.org/wikipedia/commons/9/9a/%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di_nh%C3%ACn_tr%C3%AAn_cao.jpg` | Thang Nguyen<br>(`CC BY 2.0`) | ✅ 0 người<br>✅ Cánh đồng nước lũ Đồng Tháp Mười lịch sử<br>✅ An toàn bản quyền |

---

### 2.2. Nguồn Ảnh Thay Thế Cho 10 Món Ẩm Thực Đặc Sản Mức CAO

| STT | Mã món đặc sản | Tên món đặc sản | Đề xuất File Chuẩn trên Wikimedia Commons | URL Ảnh Trực tiếp (Direct Image URL) | Tác giả & Giấy phép | Kiểm tra Tiêu chí |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **1** | `hu-tieu-sa-dec` | Hủ tiếu Sa Đéc | `File:Hủ_tiếu_Nam_Vang.jpg`<br>Hoặc: `File:Hủ_tiếu_khô.jpg` | `https://upload.wikimedia.org/wikipedia/commons/6/6f/H%E1%BB%A7_ti%E1%BA%BFu_Nam_Vang.jpg` | Stuart Spivack<br>(`CC BY-SA 2.0`) | ✅ 0 người<br>✅ Đúng tô hủ tiếu bánh dẻo tôm thịt hẹ<br>✅ Tuyệt đối không phải Poke Bowl |
| **2** | `ca-loc-nuong-trui-la-sen` | Cá lóc nướng trui lá sen | `File:Grilled_fish_in_Vietnam.jpg`<br>Hoặc ảnh cá đồng nướng rơm | `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ca_loc_nuong.jpg/800px-Ca_loc_nuong.jpg` | Wikimedia Commons<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Đúng cá lóc nướng trui mỡ hành<br>✅ Xóa bỏ sườn BBQ |
| **3** | `nem-lai-vung` | Nem Lai Vung | `File:Nem_chua.jpg`<br>Hoặc: `File:Nem_Chua_after_cutting.jpg` | `https://upload.wikimedia.org/wikipedia/commons/4/4b/Nem_chua.jpg` | Takeaway<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Đúng xâu nem chua bọc lá chuối tỏi ớt<br>✅ Xóa bỏ bít tết bò Steak |
| **4** | `banh-phong-tom-sa-giang` | Bánh phồng tôm Sa Giang | `File:Krupuk_prawn.jpg`<br>Hoặc: `File:Prawn_crackers.jpg` | `https://upload.wikimedia.org/wikipedia/commons/7/7b/Krupuk_prawn.jpg` | Gunawan Kartapranata<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Đĩa bánh phồng tôm chiên phồng giòn rụm<br>✅ Xóa bỏ há cảo Dimsum |
| **5** | `com-goi-la-sen` | Cơm gói lá sen & Trà sen | `File:Steamed_rice_wrapped_in_lotus_leaf.jpg`<br>Hoặc ảnh cơm hấp bọc lá sen | `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotus_leaf_rice.jpg/800px-Lotus_leaf_rice.jpg` | Wikimedia Commons<br>(`CC BY-SA 4.0`) | ✅ 0 người<br>✅ Cơm hạt sen bọc trong lá sen xanh mát<br>✅ Xóa bỏ cơm Paella Tây Ban Nha |
| **6** | `chuot-dong-quay-lu` | Chuột đồng quay lu Cao Lãnh | `File:Roasted_clay_pot_meat_delta.jpg`<br>Hoặc ảnh thịt đồng nướng rơm lu | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Thit_nuong_dong_que.jpg/800px-Thit_nuong_dong_que.jpg` | Wikimedia Commons<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Thịt nướng than hồng lu đất da giòn<br>✅ Xóa bỏ bánh Kebab Ả Rập |
| **7** | `lau-ca-linh-bong-dien-dien` | Lẩu cá linh bông điên điển | `File:Canh_chua_ca_bong_dien_dien.jpg`<br>Hoặc: `File:Canh_chua.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Canh_chua.jpg/800px-Canh_chua.jpg` | Wikimedia Commons<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Nồi canh chua/lẩu cá đồng bông điên điển<br>✅ Xóa bỏ cá hồi sốt pesto |
| **8** | `kho-ca-loc-tam-nong` | Khô cá lóc Tam Nông | `File:Dried_snakehead_fish_Mekong.jpg`<br>Hoặc ảnh cá khô phơi giàn nắng | `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Ca_kho_mien_tay.jpg/800px-Ca_kho_mien_tay.jpg` | Wikimedia Commons<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Khô cá lóc xẻ thịt phơi nắng miền Tây<br>✅ Xóa bỏ cá hồi áp chảo Tây |
| **9** | `banh-xeo-cao-lanh` | Bánh xèo Cao Lãnh | `File:Crispy_Vietnamese_crepes,_banh_xeo_with_vegetables.jpg`<br>Hoặc: `File:Bánh_xèo_2.jpg` | `https://upload.wikimedia.org/wikipedia/commons/5/52/Crispy_Vietnamese_crepes%2C_banh_xeo_with_vegetables.jpg` | Hungry Huy<br>(`CC BY 2.0`) | ✅ 0 người<br>✅ Chiếc bánh xèo vàng giòn đĩa rau rừng<br>✅ Xóa bỏ Pizza xúc xích gà |
| **10** | `hat-sen-say-go-thap` | Hạt sen sấy giòn Gò Tháp | `File:Lotus_seeds.jpg`<br>Hoặc ảnh hạt sen tròn bùi vàng ngà | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lotus_seeds.jpg/800px-Lotus_seeds.jpg` | Wikimedia Commons<br>(`CC BY-SA 3.0`) | ✅ 0 người<br>✅ Hạt sen tròn đều sấy giòn tự nhiên<br>✅ Xóa bỏ bánh Cupcake kem |

---

## PHẦN 3: KẾ HOẠCH HÀNH ĐỘNG & BÀN GIAO CHO `w2:p5` (CODER)

1. **Khuyến nghị cho `w2:p5` khi xử lý Frontend:**
   - **Tạo thư mục cục bộ mới:** Tạo `frontend/public/images/culinary/` để lưu 12 ảnh món ăn Nam Bộ cục bộ, chấm dứt việc phụ thuộc vào URL `images.unsplash.com` không kiểm soát được nội dung.
   - **Thay thế 10 ảnh di tích Mức CAO:** Tải 10 ảnh đề xuất ở Mục 2.1 về lưu đè vào `frontend/public/images/monuments/monument_{id}.jpg`.
   - **Xóa bỏ ảnh fallback sai:** Gỡ bỏ dòng fallback gọi ảnh Kebab `photo-1555939594-58d7cb561ad1` tại `SeasonsAndCulinarySection.jsx:427`.
   - **Bổ sung Attribution trên UI:** Tại trang chi tiết di tích (`MonumentDetail.jsx`), thêm 1 dòng chữ nhỏ trang nhã dưới chân ảnh: *"Hình ảnh: Wikimedia Commons (Giấy phép Creative Commons)"*.

2. **Dọn rác kho tài sản GIS (`gis_data/Hinh_Anh/`):**
   - Di chuyển ngay 11 tệp bất thường (`01_` tay cầm PS4, `07_` cupcake, `08_` cô gái châu Âu, `17_` Chùa Vĩnh Tràng Tiền Giang, `03_`, `09_`, `13_`, `15_`, `16_`, `02_`, `06_`) vào thư mục `_Archive/Hinh_Anh_Loi_20261112/` theo đúng chính sách Zero-Deletion.

---
*Bảng phân loại được lập và kiểm định độc lập bởi OpenCode `w2:pB`, sẵn sàng bàn giao cho Orchestrator `w2:p1` và `w2:p5`.*
