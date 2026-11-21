# HỒ SƠ ĐỐI CHỨNG PHÁP LÝ & KỊCH BẢN PHẢN BIỆN DỮ LIỆU KHÓA LUẬN TỐT NGHIỆP

- **Dự án:** Hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp (*SenMap Đồng Tháp*)
- **Sinh viên thực hiện:** Phan Trần Gia Hưng (MSSV: `0024417689` — Lớp: `ĐHCNTT24B-IT`)
- **Giảng viên hướng dẫn:** ThS. GVC. Huỳnh Lê Uyên Minh
- **Nhánh Git:** `audit/data-and-image-verification`
- **Ngày lập hồ sơ:** 2026-11-12
- **Mục đích sử dụng:** Tài liệu tra cứu nhanh, đối chứng pháp lý gốc và phản biện trực tiếp trước Hội đồng bảo vệ Khóa luận tốt nghiệp khi phát sinh nghi vấn về tính chính xác của số liệu, niên đại, phân cấp di tích, di sản phi vật thể và bản quyền hình ảnh trên hệ thống.

> **Nguyên tắc vàng khi phản biện trước Hội đồng:** Chỉ trích dẫn số hiệu Quyết định và URL đã được xác minh trực tiếp trên văn bản/cổng thông tin chính thống. Với các con số trôi nổi trên mạng hoặc suy đoán từ báo thứ cấp nhưng **chưa khớp văn bản gốc** (được gắn nhãn `[Cảnh báo đính chính]` trong hồ sơ này), tuyệt đối không đọc nhầm để tránh tự mâu thuẫn trước Hội đồng.

---

## PHẦN 1 — HỆ THỐNG THỨ BẬC NGUỒN CHUẨN ƯU TIÊN (SOURCE OF TRUTH HIERARCHY)

Khi có sự chênh lệch số liệu giữa các bài báo, blog du lịch, Wikipedia hay tài liệu cũ, hệ thống SenMap Đồng Tháp áp dụng **4 tầng ưu tiên pháp lý – khoa học** theo thứ tự từ cao xuống thấp:

| Tầng ưu tiên | Loại nguồn chuẩn (Authoritative Source) | Cơ quan / Tên miền đại diện | Vai trò pháp lý khi phản biện |
| :---: | :--- | :--- | :--- |
| **Tầng 1** *(Cao nhất)* | **Quyết định của Thủ tướng Chính phủ & Văn bản quy phạm pháp luật Quốc gia** | Cổng TTĐT Chính phủ (`chinhphu.vn`, `xaydungchinhsach.chinhphu.vn`), CSDL Quốc gia VBPL (`vbpl.vn`), Luật Việt Nam (`luatvietnam.vn`), Thư viện Pháp luật | Quyết định tối cao về xếp hạng **Di tích Quốc gia đặc biệt**, thành lập **Vườn Quốc gia**, và khoanh vùng pháp lý. |
| **Tầng 2** | **Quyết định của Bộ VHTTDL & Hồ sơ Cục Di sản Văn hóa** | Cục Di sản Văn hóa (`dsvh.gov.vn`), Bộ VHTTDL (`bvhttdl.gov.vn`), Cục Du lịch QGVN (`vietnamtourism.gov.vn`), Cục Bảo tồn Thiên nhiên (`nbca.gov.vn`) | Căn cứ chuẩn để xác định **Di tích cấp Quốc gia**, **Di sản văn hóa phi vật thể Quốc gia**, ranh giới và diện tích quy hoạch bảo tồn hiện hành. |
| **Tầng 3** | **Hồ sơ Quốc tế (UNESCO / Công ước Ramsar)** | UNESCO (`ich.unesco.org`), Ban Thư ký Công ước Ramsar (`rsis.ramsar.org`) | Chuẩn quốc tế đối với **Khu Ramsar #2.000 (Tràm Chim)** và **Di sản phi vật thể nhân loại (Đờn ca tài tử Nam Bộ)**. |
| **Tầng 4** | **Cổng TTĐT Địa phương, Bảo tàng, Lưu trữ & Báo chí Chính thống** | Cổng TTĐT Đồng Tháp (`dongthap.gov.vn`), Bảo tàng Đồng Tháp (`baotang.dongthap.gov.vn`), Cục Văn thư Lưu trữ NN (`archives.org.vn`), TTXVN / Báo Nhân Dân / Báo Đồng Tháp | Nguồn đối chứng về **Di tích cấp Tỉnh**, hiện vật bảo tàng, châu bản lịch sử, nhân vật và sự kiện địa phương. |

---

## PHẦN 2 — HỒ SƠ PHÁP LÝ, URL GỐC & KỊCH BẢN PHẢN BIỆN 20 DI TÍCH (`ID 1` – `ID 20`)

### Tổng quan Phân cấp 20 Di tích Hiện hành trên Hệ thống (`monumentsData.js`)
- **02 Di tích Quốc gia đặc biệt:** Khu di tích Nguyễn Sinh Sắc (`ID 1`), Khu di tích khảo cổ Gò Tháp (`ID 2`).
- **10 Di tích cấp Quốc gia:** Xẻo Quýt (`ID 3`), Nhà cổ Huỳnh Thủy Lê (`ID 4`), Chùa Kiến An Cung (`ID 5`), Vườn Quốc gia Tràm Chim (`ID 6`), Làng nghề dệt chiếu Định Yên (`ID 9`), Đền thờ Thượng tướng Trần Văn Năng (`ID 10`), Địa điểm Tập kết ra Bắc năm 1954 (`ID 13`), Khu căn cứ kháng chiến Bình Thành (`ID 15`), Đình Tân Phú Trung (`ID 16`), Chiến thắng Giồng Thị Đam – Gò Quản Cung (`ID 20`).
- **04 Di tích cấp Tỉnh:** Căn cứ Tỉnh ủy Kiến Phong Thông Bình (`ID 11`), Bảo tàng Tỉnh Đồng Tháp (`ID 12`), Đình Long Thuận (`ID 18`), Đình Phú Mỹ (`ID 19`).
- **04 Điểm du lịch / Làng nghề tiêu biểu:** KDLST Gáo Giồng (`ID 7`), Làng hoa Sa Đéc (`ID 8`), Chùa Phước Kiển (`ID 14`), Chùa Hưng Thiền (`ID 17`).

---

#### `ID 01` — Khu di tích Nguyễn Sinh Sắc (`TP. Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Quốc gia đặc biệt`
- **Văn bản pháp lý & Nguồn gốc:**
  - Xếp hạng Di tích Quốc gia: ngày `09/04/1992` (hệ thống ghi `QĐ 413/QĐ-BVHTT` — lưu ý văn bản gốc 1992 trùng số với Xẻo Quýt chưa trích lục trực tuyến).
  - Nâng cấp **Di tích Quốc gia đặc biệt:** **Quyết định số `1959/QĐ-TTg` ngày `11/09/2025`** của Thủ tướng Chính phủ.
  - Diện tích quy hoạch: **~9–11 ha** (khởi công trùng tu `22/08/1975`, khánh thành `13/02/1977`).
  - **URL đối chứng:**
    - Cổng TTĐT Chính phủ: https://xaydungchinhsach.chinhphu.vn/danh-sach-di-tich-quoc-gia-dac-biet-119260211160043009.htm
    - Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa-vat-the/khu-di-tich-cu-pho-bang-nguyen-sinh-sac-phuong-4-thanh-pho-cao-lanh-tinh-dong-thap-141.html
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Nhiều sách/tài liệu cũ ghi Khu di tích Nguyễn Sinh Sắc chỉ là Di tích cấp Quốc gia (1992) và diện tích khoảng 3,6 ha (hoặc con số khác), tại sao hệ thống ghi Quốc gia đặc biệt và ~9–11 ha?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, `3,6 ha` là diện tích giai đoạn đầu khi mới xây dựng (`1975–1977`). Sau các đợt mở rộng Không gian văn hóa Làng Hòa An xưa và khu tái hiện Nhà sàn Bác Hồ, tổng diện tích khu di tích đạt **hơn 9 ha (~9–11 ha)** theo hồ sơ chính thức của Bảo tàng Đồng Tháp. Đặc biệt, ngày **11/09/2025**, Thủ tướng Chính phủ đã ban hành **Quyết định số `1959/QĐ-TTg`** chính thức nâng hạng nơi đây lên **Di tích Quốc gia đặc biệt** (được đăng tải trên Cổng Thông tin Điện tử Chính phủ). Hệ thống đã cập nhật theo văn bản mới nhất này."

#### `ID 02` — Khu di tích khảo cổ Gò Tháp (`Huyện Tháp Mười`)
- **Phân cấp trên hệ thống:** `Quốc gia đặc biệt`
- **Văn bản pháp lý & Nguồn gốc:**
  - Xếp hạng Di tích Quốc gia đặc biệt: **Quyết định số `1419/QĐ-TTg` ngày `27/09/2012`** của Thủ tướng Chính phủ (`dsvh.gov.vn` STT 32).
  - Xếp hạng Quốc gia lần đầu: `1998` (`1456/QĐ-BVHTT` trên hệ thống; lưu ý trang Bảo tàng Đồng Tháp có tài liệu nhắc năm `1989`).
  - Diện tích bảo tồn chuẩn: **~290 ha** (hệ thống ghi đồng bộ `~290–300 ha`).
  - **URL đối chứng:**
    - Cục Di sản Văn hóa (hồ sơ Gò Tháp): https://dsvh.gov.vn/di-tich-khao-co-va-kien-truc-nghe-thuat-go-thap-2966
    - Cục DSVH (Danh mục Di tích QGĐB, STT 32): https://dsvh.gov.vn/danh-muc-di-tich-quoc-gia-dac-biet-1752
    - Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa-vat-the/di-tich-quoc-gia-dac-biet-go-thap-xa-tan-kieu-huyen-thap-muoi-tinh-dong-thap-139.html
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Có tài liệu ghi Gò Tháp xếp hạng theo `QĐ 2383/QĐ-TTg` (hoặc ngày `06/12/2012`), và diện tích là 300 ha hay 290 ha?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, theo Danh mục Di tích Quốc gia đặc biệt chính thức trên cổng **Cục Di sản Văn hóa (`dsvh.gov.vn`, STT 32)**, Di tích khảo cổ và kiến trúc nghệ thuật Gò Tháp được xếp hạng theo **Quyết định số `1419/QĐ-TTg` ngày `27/09/2012`** (cùng đợt với Óc Eo – Ba Thê, Cổ Loa, Lam Kinh). Còn **`QĐ 2383/QĐ-TTg` ban hành ngày `09/12/2013`** là đợt xếp hạng cho Đường Trường Sơn, Đền Hai Bà Trưng, Chùa Dâu..., hoàn toàn không phải của Gò Tháp. Về diện tích, Cục DSVH ghi quy hoạch bảo tồn khoảng **290 ha** nên nhóm đã hiệu đính từ `> 300 ha` thành `~290–300 ha` để khớp chuẩn cơ quan quản lý nhà nước."

#### `ID 03` — Khu di tích Xẻo Quýt (`Huyện Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Công nhận Di tích lịch sử – văn hóa cấp Quốc gia ngày **`09/04/1992`** (hệ thống ghi `QĐ 413/QĐ-BVHTT` — lưu ý số hiệu văn bản gốc 1992 chưa có bản số hóa công khai trực tuyến).
  - Diện tích: **~50 ha** (gồm **20 ha rừng tràm nguyên sinh**; quy hoạch mở rộng tổng thể 63 ha theo `vietnam.vn`).
  - **URL đối chứng:**
    - Cục Bảo tồn Thiên nhiên & Đa dạng sinh học: https://nbca.gov.vn/khu-bao-ve-canh-quan-xeo-quyt-dong-thap/
    - Cục Thông tin Đối ngoại: https://www.vietnam.vn/dong-thap-khu-di-tich-xeo-quyt
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Xẻo Quýt rộng 50 ha hay 63 ha, và có trùng số Quyết định với Nguyễn Sinh Sắc không?"
  - *Luận cứ phản biện:* "Cả hai khu di tích Nguyễn Sinh Sắc và Xẻo Quýt đều được Bộ Văn hóa – Thông tin công nhận Di tích Quốc gia cùng ngày **`09/04/1992`** theo đợt xếp hạng năm 1992. Về diện tích, `50 ha` (trong đó có `20 ha` rừng tràm nguyên sinh) là diện tích khu di tích lịch sử – cảnh quan cốt lõi theo hồ sơ Cục Bảo tồn Thiên nhiên (`nbca.gov.vn`), còn `63 ha` là diện tích quy hoạch vùng đệm mở rộng."

#### `ID 04` — Nhà cổ Huỳnh Thủy Lê (`TP. Sa Đéc`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Khởi dựng năm **1895**, trùng tu lớn mặt tiền Pháp cổ năm **1917**, diện tích **258 m²** (gần 260 m²); xếp hạng Di tích kiến trúc – nghệ thuật cấp Quốc gia năm **2009** (sau khi xếp hạng cấp tỉnh năm 2008).
  - *[Cảnh báo đính chính]*: Một số nguồn thứ cấp nhắc số hiệu `15/2009/QĐ-BVHTTDL`, tuy nhiên qua tra cứu văn bản công khai chưa xác minh được bản gốc số hiệu này nên hệ thống ghi chuẩn theo năm **2009** của Bộ VHTTDL.
  - **URL đối chứng:**
    - Báo Nhân Dân: https://nhandan.vn/ve-dep-kien-truc-nha-co-huynh-thuy-le-post812367.html
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Nhà cổ xây năm 1895 hay 1917? Tại sao mặt tiền kiểu Pháp mà lại xếp vào kiến trúc nhà cổ Nam Bộ?"
  - *Luận cứ phản biện:* "Ngôi nhà được thương gia Huỳnh Cẩm Thuận xây dựng lần đầu năm **1895** bằng gỗ quý theo kết cấu truyền thống Nam Bộ ba gian hai chái rộng **258 m²**; đến năm **1917** mới ốp tường gạch và thiết kế lại mặt tiền theo kiến trúc Phục Hưng Pháp kết hợp nội thất phong thủy Á Đông. Cả hai mốc `1895` và `1917` đều được Báo Nhân Dân xác nhận."

#### `ID 05` — Chùa Kiến An Cung (`TP. Sa Đéc`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Xây dựng từ năm Giáp Tý **1924** đến Đinh Mão **1927** bởi cộng đồng người Hoa bang Phúc Kiến; kết cấu chữ "Công" (`工`), không dùng đinh sắt (liên kết mộng gỗ).
  - Công nhận Di tích lịch sử – văn hóa cấp Quốc gia ngày **`27/04/1990`** (`baotang.dongthap.gov.vn`).
  - *[Cảnh báo đính chính]*: Văn bản `92-VH/QĐ` thực tế là quyết định năm **1980** xếp hạng 17 di tích ở miền Bắc (`luatgpt.vn`), không phải quyết định ngày `27/04/1990` của Kiến An Cung.
  - **URL đối chứng:**
    - Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/di-san-van-hoa/kien-an-cung-140.html
    - Cục Di sản Văn hóa (danh mục tu bổ di tích QG): https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tên gọi chính thức là Chùa Ông Quách hay Kiến An Cung, và được công nhận năm nào?"
  - *Luận cứ phản biện:* "Tên chữ là **Kiến An Cung** (hội quán Phúc Kiến), dân gian quen gọi **Chùa Ông Quách** (thờ Quảng Trạch Tôn Vương). Hồ sơ Bảo tàng Đồng Tháp xác nhận khởi công 1924, hoàn thành 1927, được công nhận Di tích Quốc gia ngày **27/04/1990** và nằm trong danh mục Di tích Quốc gia được tu bổ của Cục Di sản Văn hóa."

#### `ID 06` — Vườn Quốc gia Tràm Chim (`Huyện Tam Nông`)
- **Phân cấp trên hệ thống:** `Quốc gia` (Kiêm **Khu Ramsar thế giới #2000**)
- **Văn bản pháp lý & Nguồn gốc:**
  - Chuyển hạng từ Khu bảo tồn thiên nhiên (QĐ `47/TTg` ngày `02/02/1994`) thành **Vườn Quốc gia Tràm Chim** theo **QĐ số `253/1998/QĐ-TTg` ngày `29/12/1998`** của Thủ tướng Chính phủ.
  - Được Ban Thư ký Công ước Ramsar công nhận là **Khu Ramsar thứ 2.000 của thế giới** và **thứ 4 của Việt Nam** (ngày hiệu lực hồ sơ **`02/02/2012`**; tỉnh Đồng Tháp long trọng tổ chức lễ đón Bằng chứng nhận vào ngày **`22/05/2012`** — Ngày Quốc tế Đa dạng sinh học).
  - Diện tích chuẩn hiện hành: **`7.313 ha`**.
  - **URL đối chứng:**
    - Ban Thư ký Công ước Ramsar (Site #2000): https://rsis.ramsar.org/ris/2000
    - Luật Minh Khuê (`QĐ 253/1998/QĐ-TTg`): https://luatminhkhue.vn/van-ban/quyet-dinh-253-1998-qd-ttg.aspx
    - Báo Điện tử Chính phủ (lễ đón Bằng ngày `22/05/2012`): https://baochinhphu.vn/khu-ramsar-thu-4-cua-viet-nam-don-bang-chung-nhan-102125251.htm
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tài liệu Sourcebook bảo tồn cũ ghi Tràm Chim rộng `7.588 ha`, và báo chí ghi ngày công nhận Ramsar là `22/05/2012`, tại sao hệ thống ghi `7.313 ha` và `02/02/2012`?"
  - *Luận cứ phản biện:* "Thưa Hội đồng, `7.588 ha` là số liệu ranh giới ban đầu trong tài liệu Sourcebook xuất bản giai đoạn 2004 trước khi đo đạc chuẩn hóa lại ranh giới rừng đặc dụng. Cả **hồ sơ quốc tế Ramsar (`rsis.ramsar.org/ris/2000`)** lẫn **Báo Điện tử Chính phủ (`baochinhphu.vn`)** đều thống nhất diện tích tự nhiên chính thức của VQG Tràm Chim là **`7.313 ha`**. Còn về ngày tháng: **`02/02/2012`** (Ngày Đất ngập nước Thế giới) là ngày Ban Thư ký Ramsar xác lập công nhận trên hồ sơ RIS quốc tế, còn **`22/05/2012`** là ngày tỉnh Đồng Tháp tổ chức lễ đón Bằng chứng nhận tại thực địa."

#### `ID 07` — Khu du lịch sinh thái Gáo Giồng (`Huyện Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Điểm du lịch/Làng nghề`
- **Văn bản pháp lý & Nguồn gốc:**
  - Rừng tràm cải tạo đất phèn sau năm `1985`, mở cửa du lịch sinh thái tháng **`03/2003`**, được Hiệp hội Du lịch ĐBSCL công nhận **Điểm du lịch tiêu biểu ĐBSCL**.
  - Tổng diện tích hệ thống ghi **~1.700 ha** (số liệu thống kê kiểm kê rừng mới 2024 là `1.657 ha`), **sân chim tự nhiên 36 ha** (đồng bộ cả bản VI & EN).
  - **URL đối chứng:**
    - TTXVN (21/11/2024): https://baotintuc.vn/bao-ve-he-sinh-thai-rung-gan-voi-phat-trien-du-lich-ben-vung-post545943.html
    - Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/11406
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tại sao Gáo Giồng không xếp hạng Di tích cấp Tỉnh hay Quốc gia? Và sân chim là 36 ha hay 40 ha?"
  - *Luận cứ phản biện:* "Gáo Giồng là rừng tràm sản xuất – phòng hộ kết hợp du lịch sinh thái hình thành từ công cuộc cải tạo đất phèn sau 1985, thuộc nhóm **Điểm du lịch tiêu biểu ĐBSCL** chứ không thuộc đối tượng xếp hạng di tích lịch sử – văn hóa theo Luật Di sản văn hóa. Trước đây bản tiếng Anh trong code ghi lệch `40-hectare` so với bản tiếng Việt `36 ha`, chúng em đã đồng bộ toàn bộ hệ thống về `36 ha` (sân chim lõi) trong tổng thể `~1.700 ha` rừng tràm."

#### `ID 08` — Làng hoa Sa Đéc (`TP. Sa Đéc`)
- **Phân cấp trên hệ thống:** `Điểm du lịch/Làng nghề` (kèm ghi nhận **Di sản văn hóa phi vật thể Quốc gia**)
- **Văn bản pháp lý & Nguồn gốc:**
  - Làng nghề hơn 100 năm tuổi (hơn 950 ha, ~4.000 hộ, >2.000 giống hoa), trồng hoa trên giàn cao mặt nước.
  - **Quyết định số `4896/QĐ-BVHTTDL` ngày `26/12/2025`** của Bộ VHTTDL đưa **"Nghề trồng hoa kiểng Sa Đéc"** vào Danh mục Quốc gia về Di sản văn hóa phi vật thể.
  - **URL đối chứng:**
    - Luật Việt Nam (`QĐ 4896/QĐ-BVHTTDL`): https://luatvietnam.vn/van-hoa/quyet-dinh-4896-qd-bvhttdl-2025-dua-vao-danh-muc-quoc-gia-di-san-van-hoa-phi-vat-the-sa-dec-422712-d1.html
    - Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/66194
    - Báo Thanh Niên (28/12/2025): https://thanhnien.vn/nghe-trong-hoa-kieng-o-sa-dec-la-di-san-van-hoa-phi-vat-the-quoc-gia-18525122814212274.htm
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Làng hoa Sa Đéc vừa được công nhận cấp Quốc gia cuối năm 2025, sao vẫn để nhóm `Điểm du lịch/Làng nghề`?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, theo Luật Di sản văn hóa, **Quyết định `4896/QĐ-BVHTTDL` ngày `26/12/2025`** công nhận *Tri thức dân gian & Nghề thủ công truyền thống "Nghề trồng hoa kiểng Sa Đéc"* là **Di sản văn hóa phi vật thể Quốc gia** (tính chất phi vật thể), chứ không phải xếp hạng một công trình kiến trúc đơn lẻ làm di tích vật thể. Do đó trên lớp bản đồ không gian GIS, xếp Làng hoa Sa Đéc vào nhóm `Điểm du lịch/Làng nghề` và ghi rõ danh hiệu Di sản phi vật thể Quốc gia 2025 ở phần pháp lý là chuẩn xác nhất về mặt phân loại học."

#### `ID 09` — Làng nghề dệt chiếu Định Yên (`Huyện Lấp Vò`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - **Nghề dệt chiếu (xã Định Yên, xã Định An):** Công nhận Di sản văn hóa phi vật thể Quốc gia ngày **`09/09/2013`** theo **Quyết định số `3084/QĐ-BVHTTDL`** (`dsvh.gov.vn` STT 40).
  - **Đình Định Yên (cùng cụm di tích):** Xếp hạng Di tích Kiến trúc nghệ thuật Quốc gia năm `2012` (`dsvh.gov.vn` 2018).
  - *[Cảnh báo đính chính]*: Tuyệt đối **KHÔNG** dùng số `2684/QĐ-BVHTTDL` (số `2684/QĐ-BVHTTDL` là quyết định ban hành ngày `25/08/2014` cho Hát Bội Bình Định, Dù Kê Sóc Trăng, v.v. — xem `dsvh.gov.vn` STT 51–68). Trong quá trình kiểm toán dữ liệu, nhóm đã sửa lỗi `2684` (`05/08/2013`) thành **`3084/QĐ-BVHTTDL` (`09/09/2013`)** trên toàn bộ hệ thống.
  - **URL đối chứng:**
    - Cục DSVH (Nghề dệt chiếu Định Yên): https://dsvh.gov.vn/nghe-det-chieu-o-dong-thap-22265
    - Cục DSVH (Danh mục Di sản phi vật thể QG, STT 40): https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Trên mạng nhiều trang blog ghi nghề dệt chiếu Định Yên công nhận theo `QĐ 2684/QĐ-BVHTTDL`, sao hệ thống lại ghi `3084/QĐ-BVHTTDL`?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, đó chính là một phát hiện sai sót phổ biến trên mạng mà nhóm đã đối chứng trực tiếp tại **Cổng Cục Di sản Văn hóa (`dsvh.gov.vn`, STT 40)**: Quyết định công nhận Nghề dệt chiếu Định Yên là **`3084/QĐ-BVHTTDL` ngày `09/09/2013`**. Còn `2684/QĐ-BVHTTDL` là quyết định ngày `25/08/2014` cho các di sản tỉnh khác (Hát Bội Bình Định, Bài Chòi...)."

#### `ID 10` — Đền thờ Thượng tướng Trần Văn Năng (`Huyện Thanh Bình`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Thượng tướng Quận công Trần Văn Năng (`1763–1835`, mất năm Ất Mùi 1835 trên sông Tiền khi chỉ huy quân — xác nhận bởi Châu bản triều Nguyễn, Cục Văn thư & Lưu trữ NN).
  - Xếp hạng Di tích lịch sử – văn hóa cấp Quốc gia ngày **`19/01/2004`** (ảnh Bằng xếp hạng thực tế trên `cauchuyenlichsu.vn` ghi ngày `19/01/2004`; hệ thống ghi `04/2004/QĐ-BVHTT`).
  - *[Cảnh báo đính chính]*: Hệ thống cũ từng ghi nhầm `65/2004/QĐ-BVHTT` ngày `19/08/2004` (thực tế `65/2004/QĐ-BVHTT` là xếp hạng Đền thờ Trần Khát Chân ở Thanh Hóa!) và ghi mâu thuẫn năm mất `1838`. Một số nguồn thứ cấp nhắc `985/QĐ-BVHTT` nhưng chưa tìm thấy văn bản công khai kiểm chứng.
  - **URL đối chứng:**
    - Cục Văn thư Lưu trữ Nhà nước: https://archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/chau-ban-trieu-nguyen-tai-lieu-quy-gia-ve-vi-anh-hung-dan-toc-tran-van-nang.htm
    - Cổng Câu chuyện lịch sử (có ảnh Bằng xếp hạng): https://cauchuyenlichsu.vn/ky-uc-song-mai/anh-hung-dan-toc-thuong-tuong-quan-cong-tran-van-nang
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Một số bài viết ghi ông mất năm 1838 và xếp hạng tháng 8/2004?"
  - *Luận cứ phản biện:* "Nhóm đã đối chiếu Châu bản triều Nguyễn do Cục Văn thư Lưu trữ Nhà nước công bố xác nhận Thượng tướng Trần Văn Năng mất năm **1835**, và ảnh chụp Bằng xếp hạng Di tích Quốc gia treo tại đền ghi rõ ngày cấp là **`19/01/2004`**."

#### `ID 11` — Căn cứ Tỉnh ủy Kiến Phong / Đình Ngã ba Thông Bình (`Huyện Tân Hồng`)
- **Phân cấp trên hệ thống:** `Cấp tỉnh`
- **Văn bản pháp lý & Nguồn gốc:**
  - Xếp hạng Di tích lịch sử cấp tỉnh ngày **`18/01/2016`** của UBND tỉnh Đồng Tháp (gắn với đồn Bảo Thông Bình thời Nguyễn / Thoại Ngọc Hầu và căn cứ Tỉnh ủy Kiến Phong vùng biên giới).
  - **URL đối chứng:**
    - Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/37839
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tỉnh ủy Kiến Phong là ở Xẻo Quýt (ID 3), sao ở Thông Bình cũng có Căn cứ Tỉnh ủy Kiến Phong?"
  - *Luận cứ phản biện:* "Trong kháng chiến, Tỉnh ủy Kiến Phong có nhiều cụm căn cứ và hành lang chuyển quân liên hoàn: Xẻo Quýt (Cao Lãnh) là cơ quan đầu não giai đoạn 1960–1975, còn khu vực ngã ba sông Sở Hạ – Thông Bình (Tân Hồng) là căn cứ địa – hành lang biên giới chiến lược phía Bắc tỉnh Kiến Phong cũ, được UBND tỉnh xếp hạng cấp tỉnh ngày `18/01/2016`."

#### `ID 12` — Bảo tàng Tỉnh Đồng Tháp (`TP. Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Cấp tỉnh`
- **Văn bản pháp lý & Nguồn gốc:**
  - Thành lập ngày `15/05/1978`; cụm di tích kiến trúc Dinh Cò Tây – nhà giam – phòng tra tấn được UBND tỉnh Đồng Tháp xếp hạng **Di tích cấp tỉnh** theo **QĐ số `938/QĐ-UBND` ngày `05/09/2008`** (`dsvh.gov.vn` 2018).
  - Lưu giữ hơn `30.000` tài liệu/hiện vật, nổi bật là **5 Bảo vật Quốc gia** (hệ thống đã cập nhật từ `3` lên `5` theo công bố mới nhất).
  - **URL đối chứng:**
    - Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/nha-trung-bay/bao-tang-tinh-dong-thap-134.html
    - VietnamPlus (TTXVN — 5 Bảo vật Quốc gia Đồng Tháp): https://www.vietnamplus.vn/kham-pha-cac-gia-tri-dac-biet-cua-5-bao-vat-quoc-gia-o-tinh-dong-thap-post1071944.vnp
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Bảo tàng Đồng Tháp là công trình văn hóa đương đại, sao lại được xếp hạng Di tích cấp Tỉnh? Và hiện có 3 hay 5 Bảo vật Quốc gia?"
  - *Luận cứ phản biện:* "Khuôn viên Bảo tàng lưu giữ cụm kiến trúc Dinh Cò Tây và phòng giam thời Pháp thuộc từ thập niên 1920 nên được xếp hạng Di tích cấp tỉnh theo QĐ `938/QĐ-UBND` (2008) — được Cục DSVH xác nhận trong danh sách tu bổ di tích cấp tỉnh năm 2018. Về Bảo vật Quốc gia, trước đây bảo tàng trưng bày 3 bảo vật tiêu biểu, đến nay tỉnh Đồng Tháp có **5 Bảo vật Quốc gia** nên hệ thống đã cập nhật đầy đủ thành 5."

#### `ID 13` — Tượng đài & Địa điểm Tập kết ra Bắc năm 1954 (`TP. Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Công trình tượng đài cao 11m trên khuôn viên 12.000 m² được nghiệm thu / khánh thành ngày **`29/10/2019`**.
  - Xếp hạng **Di tích lịch sử Quốc gia** theo **Quyết định số `392/QĐ-BVHTTDL` ngày `24/02/2023`** của Bộ trưởng Bộ VHTTDL (tỉnh tổ chức lễ đón nhận Bằng vào tối `29/10/2023`).
  - *[Cảnh báo đính chính]*: Một số ý kiến nhầm rằng công trình này xếp hạng *cấp Tỉnh ngày 20/03/2023*. Văn bản gốc **QĐ `392/QĐ-BVHTTDL` (`24/02/2023`)** trên `luatvietnam.vn` và thông tin TTXVN (`baogialai.com.vn`) khẳng định 100% đây là **Di tích lịch sử CẤP QUỐC GIA**.
  - **URL đối chứng:**
    - Luật Việt Nam (toàn văn `QĐ 392/QĐ-BVHTTDL`): https://luatvietnam.vn/van-hoa/quyet-dinh-392-qd-bvhttdl-2023-xep-hang-di-tich-quoc-gia-dia-diem-tap-ket-ra-bac-1954-tai-cao-lanh-412620-d1.html
    - TTXVN / Báo Gia Lai: https://baogialai.com.vn/dia-diem-tap-ket-ra-bac-nam-1954-tai-cao-lanh-la-di-tich-quoc-gia-post254116.html
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Công trình Tượng đài mới khánh thành năm 2019, sao lại được xếp hạng Di tích Quốc gia (hoặc có phải cấp Tỉnh tháng 3/2023)?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, đối tượng được Bộ VHTTDL xếp hạng **Di tích lịch sử Quốc gia** theo **QĐ số `392/QĐ-BVHTTDL` ngày `24/02/2023`** là **Địa điểm Tập kết ra Bắc năm 1954 tại Cao Lãnh** — nơi tiễn 13.508 cán bộ, chiến sĩ miền Nam trong 100 ngày lịch sử sau Hiệp định Genève 1954, chứ không chỉ riêng khối tượng đài dựng năm 2019."

#### `ID 14` — Chùa Phước Kiển / Chùa Lá Sen (`Huyện Châu Thành`)
- **Phân cấp trên hệ thống:** `Điểm du lịch/Làng nghề`
- **Văn bản pháp lý & Nguồn gốc:**
  - Khởi dựng trước năm `1847` (triều vua Thiệu Trị), bị bom đạn phá hủy năm `1966`, trùng tu sau `1975`; từ năm `1992` xuất hiện loài sen vua *Victoria amazonica* trong các ao hố bom quanh chùa.
  - Sức chịu tải thực tế của lá sen trưởng thành: khoảng **40–80 kg** (khi đặt mâm gỗ/nhựa cứng phân tán lực đều trên bề mặt lá, không đứng trực tiếp bằng gót chân; tránh các tin đồn thổi phồng `100–140 kg` dễ gây hư hỏng lá hoặc mất an toàn).
  - *[Lưu ý về thông tin sự cố cháy 02/2024]*: Rà soát các báo điện tử chính thống chưa ghi nhận tư liệu xác thực về vụ cháy tại Chùa Phước Kiển vào tháng `02/2024` (tránh nhầm với các vụ cháy cơ sở thờ tự khác ở Bắc Giang/các tỉnh năm 2024–2025). Nếu Hội đồng hỏi, cần trả lời khách quan đây là chi tiết chưa có văn bản kiểm chứng.
  - **URL đối chứng:**
    - Cục Du lịch QGVN: https://vietnamtourism.gov.vn/post/43917
    - Vietnam Airlines Travel Guide: https://www.vietnamairlines.com/fr/vi/plan-book/travel/travel-guide/phuoc-kien-tu-chua-la-sen
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Mạng xã hội nói lá sen Chùa Phước Kiển đỡ được người nặng 100–140 kg, sao hệ thống chỉ ghi 70–80 kg?"
  - *Luận cứ phản biện:* "Theo tài liệu giới thiệu chính thức của Cục Du lịch QGVN và khuyến cáo tại chùa, lá sen trưởng thành có đường kính 2–3m kết hợp mâm phân tán lực chịu tải an toàn phổ biến ở mức **40–80 kg** (tùy độ tuổi lá và mùa nước nổi); các trường hợp >100 kg là cá biệt hoặc cường điệu trên mạng xã hội."

#### `ID 15` — Khu căn cứ kháng chiến Bình Thành (`Huyện Thanh Bình`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Địa điểm Vụ thảm sát Bình Thành (`11–12/11/1954`, sát hại 34 đồng bào yêu nước).
  - Xếp hạng Di tích Quốc gia ngày **`19/01/2004`** theo **QĐ số `02/2004/QĐ-BVHTT`** của Bộ Văn hóa – Thông tin.
  - **URL đối chứng:**
    - CSDL Văn bản Pháp luật Quốc gia (`vbpl.vn`): https://vbpl.vn/van-ban/chi-tiet/quyet-dinh-so-02-2004-qd-bvhtt-ve-viec-xep-hang-di-tich-quoc-gia--80459
    - Cục Di sản Văn hóa: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tại sao bản dịch tiếng Anh cũ từng ghi 50 người hy sinh, trong khi bản tiếng Việt ghi 34 đồng bào?"
  - *Luận cứ phản biện:* "Hồ sơ pháp lý gốc tiếng Việt của Bộ Văn hóa – Thông tin và bia tưởng niệm tại Bình Thành ghi nhận chính xác **34 đồng bào yêu nước** bị sát hại trong đợt khủng bố tháng 11/1954."

#### `ID 16` — Đình Tân Phú Trung (`Huyện Châu Thành`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Khởi dựng khoảng `1853`, vua Tự Đức ban sắc phong năm **`1854`**, trùng tu lớn năm `1914`; xếp hạng **Di tích Kiến trúc nghệ thuật cấp Quốc gia** năm **`2012`** (sau khi xếp hạng cấp tỉnh `2006`).
  - *[Cảnh báo đính chính]*: Một số nguồn không chính thức ghi số `88/2005/QĐ-BVHTT` hoặc sắc phong `1852`. Tuy nhiên Báo Đồng Tháp và Cục DSVH xác nhận ngôi đình được công nhận Di tích Quốc gia năm **2012** và sắc phong Tự Đức năm **1854** (nhóm đã sửa con dấu `SEAL-CT-16` từ `1852` → `1854`).
  - **URL đối chứng:**
    - Báo Đồng Tháp: https://baodongthap.vn/giu-hon-di-san-giua-nhip-song-hien-dai-a242059.html
    - Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Ngôi đình được sắc phong Tự Đức năm 1852 hay 1854?"
  - *Luận cứ phản biện:* "Theo bài viết chuyên khảo của Báo Đồng Tháp (cơ quan ngôn luận tỉnh), Đình Tân Phú Trung được xây dựng giữa thế kỷ XIX và đón nhận sắc phong vua Tự Đức năm **1854**, được Bộ VHTTDL xếp hạng Di tích Quốc gia năm **2012**."

#### `ID 17` — Chùa Hưng Thiền (`Huyện Cao Lãnh`)
- **Phân cấp trên hệ thống:** `Điểm du lịch/Làng nghề`
- **Văn bản pháp lý & Nguồn gốc:**
  - Cổ tự hơn 250 năm (xã Mỹ Hội cũ / Mỹ Thọ), là trường hạ An cư Kiết hạ Ni giới quy mô hàng trăm chư Ni tu học Tịnh Độ, chánh điện tôn trí **tượng Đức Phật A Di Đà đúc bằng đồng nguyên khối**.
  - **URL đối chứng:**
    - Deep Culture VN: https://deepculture.vn/van-hoa/dong-thap/chua-hung-thien
    - Phật Sự Online: https://www.phatsuonline.vn/dong-thap-be-mac-khoa-tu-xuat-gia-gieo-duyen-lan-thu-18-tai-chua-hung-thien-xa-my-tho-16
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Chùa Hưng Thiền có tượng Bồ tát Quán Thế Âm lộ thiên cao 33m như nhiều bài du lịch mạng viết không?"
  - *Luận cứ phản biện:* "Thưa Hội đồng, đó là sự nhầm lẫn phổ biến trên mạng giữa Chùa Hưng Thiền (Cao Lãnh, Đồng Tháp) với Chùa Hưng Long (Tiền Giang) hoặc Chùa Hưng Thiện (Bạc Liêu — nơi có tượng Mẹ Nam Hải/Quán Thế Âm cao 33m). Nhờ quá trình kiểm toán dữ liệu, nhóm đã gỡ bỏ hoàn toàn chi tiết sai `tượng 33m` khỏi tuyến du lịch, con dấu và sơ đồ nội khu của Chùa Hưng Thiền."

#### `ID 18` — Đình Long Thuận (`Huyện Hồng Ngự`)
- **Phân cấp trên hệ thống:** `Cấp tỉnh`
- **Văn bản pháp lý & Nguồn gốc:**
  - Khởi dựng năm **`1876`**, đại trùng tu năm `1930`, vua Bảo Đại ban sắc phong năm **`1936`**.
  - **Phân hạng chính thức:** **Di tích lịch sử – văn hóa CẤP TỈNH** (đã sửa từ `"Quốc gia"` → `"Cấp tỉnh"` theo văn bản tu bổ di tích của Cục Di sản Văn hóa `dsvh.gov.vn` năm 2018; hệ thống ghi QĐ `1354/QĐ-UBND-HC`).
  - *[Cảnh báo đính chính]*: Tuyệt đối **KHÔNG** trích dẫn số `1458/QĐ-BVHTTDL` cho Đình Long Thuận — tra cứu `thuvienphapluat.vn` cho thấy `1458/QĐ-BVHTTDL` là quyết định năm 2021 về triển khai Luật Xử lý vi phạm hành chính sửa đổi! Tại huyện Hồng Ngự, ngôi đình được xếp hạng cấp **Quốc gia** năm 2009 là **Đình Long Khánh** (xã Long Khánh A), còn **Đình Long Thuận** (xã Long Thuận) là **Di tích cấp Tỉnh**.
  - **URL đối chứng:**
    - Cục Di sản Văn hóa (liệt kê rõ Đình Long Thuận trong nhóm *di tích cấp tỉnh*): https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018
    - Cục Du lịch QGVN (Đình Long Khánh — di tích Quốc gia tại Hồng Ngự): https://vietnamtourism.gov.vn/post/57733
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Tại sao Đình Long Thuận ở cù lao Hồng Ngự lại xếp Cấp tỉnh mà không phải Quốc gia?"
  - *Luận cứ phản biện:* "Dạ thưa Hội đồng, trên cổng **Cục Di sản Văn hóa (`dsvh.gov.vn`)**, văn bản về Kế hoạch tu bổ di tích năm 2018 phân định rạch ròi: Đình Long Thuận (xã Long Thuận, huyện Hồng Ngự) nằm trong danh mục **di tích cấp tỉnh** (cùng Cụm Dinh Cò Tây), tránh nhầm với Đình Long Khánh (cùng huyện Hồng Ngự, cấp Quốc gia). Nhóm đã chủ động hạ từ `Quốc gia` về đúng `Cấp tỉnh` trên cả JS, SQL và CSV."

#### `ID 19` — Đình Phú Mỹ (`Huyện Thanh Bình`)
- **Phân cấp trên hệ thống:** `Cấp tỉnh`
- **Văn bản pháp lý & Nguồn gốc:**
  - Đình làng cổ hình thành thế kỷ XIX thời nhà Nguyễn gắn với không gian văn hóa Phú Lợi – Phú Mỹ, huyện Thanh Bình.
  - *[Minh bạch kiểm chứng]*: Hiện chưa tìm thấy văn bản số hóa công bố số quyết định cụ thể (cả mốc `2012` lẫn số `95/2004/QĐ-BVHTT` chưa có văn bản đối chứng công khai; tại Thanh Bình danh mục công khai trên `baodongthap.vn` còn có Di tích Bến đò Phú Mỹ và Đình Tân Phú). Vì vậy hệ thống đã điều chỉnh `decisionYear` sang diễn đạt khách quan, không gán số QĐ chưa kiểm chứng.
  - **URL đối chứng:**
    - Báo Đồng Tháp (Di tích vùng Phú Mỹ, Thanh Bình): https://baodongthap.vn/dia-chi-do-giao-duc-truyen-thong-cach-mang-a29675.html
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Số quyết định xếp hạng của Đình Phú Mỹ là gì?"
  - *Luận cứ phản biện:* "Nhóm tuân thủ nguyên tắc trung thực học thuật: với các di tích cấp tỉnh chưa được số hóa toàn văn số hiệu quyết định trên cổng công báo/Cục DSVH, hệ thống ghi nhận trung thực niên đại khởi dựng thế kỷ XIX và phân hạng cấp tỉnh theo khảo sát địa phương, tuyệt đối không tự điền số quyết định giả định."

#### `ID 20` — Khu di tích Chiến thắng Giồng Thị Đam – Gò Quản Cung (`Huyện Tân Hồng`)
- **Phân cấp trên hệ thống:** `Quốc gia`
- **Văn bản pháp lý & Nguồn gốc:**
  - Trận đánh lịch sử diễn ra ngày **`26/09/1959`** (24/08 năm Kỷ Hợi) do 42 cán bộ, chiến sĩ **Đại đội 274** (tiền thân của Tiểu đoàn 502 anh hùng) thực hiện — trận mở màn đấu tranh vũ trang vùng Đồng Tháp Mười.
  - Xếp hạng **Di tích lịch sử Quốc gia** ngày **`19/01/2004`** theo **QĐ số `02/2004/QĐ-BVHTT`** của Bộ Văn hóa – Thông tin.
  - **URL đối chứng:**
    - Bảo tàng Đồng Tháp: https://baotang.dongthap.gov.vn/he-thong-trung-bay/di-tich-lich-su-chien-thang-giong-thi-dam-go-quan-cung-120.html
    - Cục DSVH: https://dsvh.gov.vn/tinh-dong-thap-thuc-hien-tu-bo-cac-di-tich-lich-su-van-hoa-nam-2018
    - Báo Nhân Dân: https://nhandan.vn/tin-tuc-su-kien/phong-trao-dong-khoi-nam-1960-592757
- **Kịch bản phản biện:**
  - *Nghi vấn thường gặp:* "Nếu Tiểu đoàn 502 thành lập chính thức về sau (giai đoạn 1960), tại sao trận đánh ngày `26/09/1959` lại gắn tên Tiểu đoàn 502?"
  - *Luận cứ phản biện:* "Theo hồ sơ Bảo tàng Đồng Tháp và Báo Nhân Dân, lực lượng trực tiếp đánh trận ngày **`26/09/1959`** là **Đại đội 274** — đơn vị tiền thân nòng cốt để nâng cấp, thành lập **Tiểu đoàn 502** anh hùng của tỉnh Kiến Phong (thuộc Khu 8). Do đó di tích lưu giữ truyền thống chung của Đại đội 274 / Tiểu đoàn 502 là hoàn toàn chính xác về lịch sử quân sự."

---

## PHẦN 3 — HỒ SƠ ĐỐI CHỨNG DI SẢN VĂN HÓA PHI VẬT THỂ & ẨM THỰC

| Di sản / Đặc sản | Danh hiệu pháp lý chuẩn | Số hiệu Quyết định & Ngày ban hành ĐÃ XÁC THỰC | Cảnh báo số hiệu hay bị nhầm & Nguồn đối chứng |
| :--- | :--- | :--- | :--- |
| **Nghệ thuật Đờn ca tài tử Nam Bộ** | Di sản văn hóa phi vật thể đại diện của nhân loại (UNESCO) & Quốc gia | • UNESCO: Kỳ họp thứ 8, Quyết định **`8.COM 8.31`** ngày **`05/12/2013`** (Baku, Azerbaijan)<br>• Quốc gia: **QĐ `5079/QĐ-BVHTTDL`** ngày **`27/12/2012`** (`dsvh.gov.vn` STT 6) | Di sản chung của 21 tỉnh/thành Nam Bộ (bao gồm Đồng Tháp).<br>URL: https://ich.unesco.org/en/Decisions/8.COM/8.31 ; https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789 |
| **Hò Đồng Tháp** | Di sản văn hóa phi vật thể Quốc gia (Nghệ thuật trình diễn dân gian) | • **QĐ số `4069/QĐ-BVHTTDL` ngày `30/10/2018`** (`dsvh.gov.vn` STT 265) | *[Cảnh báo đính chính]*: **KHÔNG** dùng số `3465/QĐ-BVHTTDL` (`3465/QĐ-BVHTTDL` ban hành ngày `13/10/2015` là của Kéo co Lai Châu, Bánh tráng Trảng Bàng, Then Bắc Giang...).<br>URL: https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789 |
| **Nghề làm nem Lai Vung** | Di sản văn hóa phi vật thể Quốc gia (Nghề thủ công truyền thống) | • **QĐ số `3409/QĐ-BVHTTDL` ngày `10/11/2023`** (`luatvietnam.vn`) | *[Cảnh báo đính chính]*: **KHÔNG** dùng số `3964/QĐ-BVHTTDL`.<br>URL: https://luatvietnam.vn/van-hoa/quyet-dinh-3409-qd-bvhttdl-408683-d1.html ; https://vov.vn/van-hoa/nghe-lam-nem-lai-vung-don-nhan-di-san-van-hoa-phi-vat-the-quoc-gia-post1073914.vov |
| **Hủ tiếu Sa Đéc & Nghề làm bột gạo Sa Đéc** | Di sản văn hóa phi vật thể Quốc gia (cho *Nghề làm bột gạo Sa Đéc*) + Nhãn hiệu tập thể *"Hủ tiếu Sa Đéc"* | • Công bố công nhận *Nghề làm bột gạo Sa Đéc* đầu năm **2024** (Lễ đón nhận tại Sa Đéc ngày `26/04/2024`) | *[Cảnh báo đính chính]*: Di sản phi vật thể cấp Quốc gia năm 2024 vinh danh **"Nghề làm bột gạo Sa Đéc"** (tạo nên sợi hủ tiếu Sa Đéc); số hiệu `3957/QĐ-BVHTTDL` chưa có bản đối chứng trực tuyến nên không gán cứng.<br>URL: https://chinhsachcuocsong.vnanet.vn/nghe-lam-bot-gao-sa-dec-tro-thanh-di-san-van-hoa-phi-vat-the-quoc-gia/37787.html |
| **Nghề trồng hoa kiểng Sa Đéc** | Di sản văn hóa phi vật thể Quốc gia (Tri thức dân gian, Nghề thủ công truyền thống) | • **QĐ số `4896/QĐ-BVHTTDL` ngày `26/12/2025`** (`luatvietnam.vn`) | URL: https://luatvietnam.vn/van-hoa/quyet-dinh-4896-qd-bvhttdl-2025-dua-vao-danh-muc-quoc-gia-di-san-van-hoa-phi-vat-the-sa-dec-422712-d1.html |
| **Xoài cát Chu Cao Lãnh & Quýt hồng Lai Vung** | Chỉ dẫn địa lý & Nhãn hiệu độc quyền | • Chỉ dẫn địa lý *"Cao Lãnh"* (cho Xoài cát Chu & Xoài cát) và Nhãn hiệu *"Quýt hồng Lai Vung"* | Chứng nhận sở hữu trí tuệ cấp Quốc gia (Cục SHTT). |

---

## PHẦN 4 — HỒ SƠ MINH BẠCH BẢN QUYỀN HÌNH ẢNH & KỊCH BẢN TRẢ LỜI HỘI ĐỒNG

### 4.1. Thống kê Minh bạch Nguồn & Giấy phép Hình ảnh Hiện có trên Hệ thống
1. **Kho 12 ảnh Ẩm thực (`frontend/public/images/culinary/*.jpg`):**
   - Đã loại bỏ 100% ảnh Unsplash sai món ăn phương Tây và lưu cục bộ 12 ảnh món Việt Nam thật từ **Wikimedia Commons**, kèm trường `image_credit` rõ ràng trong `culturalHeritageData.js` và `05_*.json`:
     - **03 ảnh `CC0` (Public Domain, miễn ghi công bắt buộc):** `banh-phong-tom-sa-giang.jpg`, `xoai-cat-chu-cao-lanh.jpg`, `hat-sen-say-go-thap.jpg`.
     - **01 ảnh `Public Domain`:** `lau-ca-linh-bong-dien-dien.jpg` (`Canh chua cá lóc...`, Phương Huy).
     - **08 ảnh `CC BY 2.0` / `CC BY-SA 2.0/3.0/4.0`:** Đều là ảnh món ăn Việt/Đồng Tháp thật (bao gồm `Nem chua Lai Vung.jpg`, `Quýt hồng Lai Vung`, `Cá lóc nướng trui.JPG`, `Grilled vole.jpg`, `Hủ tiếu Nam Vang.jpg`, `Lotus Leaf Rice.jpg`, `Khô cá sặc rằn.jpg`, `Bánh xèo with nước mắm.jpg`), đã lưu đầy đủ tên tác giả và giấy phép.
2. **Kho 20 ảnh Di tích (`frontend/public/images/monuments/monument_{1..20}.jpg`):**
   - Toàn bộ là ảnh tư liệu **Wikimedia Commons** (chủ yếu `CC BY-SA 3.0/4.0`, `CC BY 2.0/2.5/3.0`, riêng `monument_9.jpg` là `CC0`).
   - Sau đợt lọc 3 mức độ ưu tiên (`abb0951`), 3 ảnh sai bản chất / lộ mặt mức CAO (`14, 17, 20`) đã được thay thế bằng ảnh sạch 0 mặt người từ Wikimedia Commons (`Victoria amazonica` ngoài trời tại VN, Chùa Bửu Hưng Cao Lãnh, Cánh đồng xã An Phước – Tân Hồng).
3. **Kho Biểu tượng & Đồ họa Văn hóa (`frontend/public/images/cultural_motifs/`):**
   - Sếu đầu đỏ, Hoa sen, Trống đồng Đông Sơn là đồ họa tự trích xuất / Public Domain, 100% không vi phạm bản quyền và không có hình người.

### 4.2. Kịch bản Trả lời Khi Hội đồng Hỏi về Hình ảnh Minh họa
- **Câu hỏi 1:** *"Tại sao một số ảnh di tích (như Chùa Hưng Thiền `#17`, Chùa Phước Kiển `#14` hay các đình làng `#10, 16, 18, 19`) lại là ảnh minh họa cùng loại hình/khu vực chứ chưa phải ảnh chụp chính diện bảng tên di tích đó?"*
  - **Trả lời chuẩn:** *"Dạ thưa Hội đồng, trong giới hạn nguồn ảnh mở hợp pháp phục vụ nghiên cứu học thuật, em ưu tiên tuyệt đối nguyên tắc **không sử dụng ảnh có bản quyền thương mại trôi nổi trên Google** và **không vi phạm quyền riêng tư khuôn mặt người dân**. Trong đợt kiểm toán ảnh 3 mức độ, em đã loại bỏ ngay các ảnh sai bản chất mức CAO (như ảnh nhà kính ở Đức cho Chùa Lá Sen, ảnh mặt đường Quốc lộ 30 cho Chùa Hưng Thiền, ảnh lộ mặt người ở Giồng Thị Đam và 10/12 ảnh món Âu gán nhầm cho ẩm thực Đồng Tháp) để thay bằng ảnh Wikimedia Commons hợp lệ (`CC0`/`CC BY-SA`). Với một số di tích cấp huyện/cù lao mà kho mở Wikimedia chưa có ảnh chụp chính diện, hệ thống sử dụng ảnh minh họa cùng loại hình/địa bàn có ghi chú nguồn gốc rõ ràng và đã đưa vào lộ trình bổ sung ảnh thực địa từ nhóm tác giả."*
- **Câu hỏi 2:** *"Dự án xử lý thế nào về nghĩa vụ ghi công (Attribution) của giấy phép Creative Commons `CC BY-SA`?"*
  - **Trả lời chuẩn:** *"Dạ thưa Hội đồng, hệ thống đã lưu trữ đầy đủ đường dẫn gốc `wikimediaUrl` cho 20 di tích trong `monumentsData.js` và bổ sung trường `image_credit` ghi rõ tên tệp, tác giả, và loại giấy phép (`CC0`, `Public Domain`, `CC BY`, `CC BY-SA`) cho toàn bộ 12 đặc sản ẩm thực trong `culturalHeritageData.js` để đảm bảo tính minh bạch và liêm chính học thuật theo đúng chuẩn Creative Commons."*
