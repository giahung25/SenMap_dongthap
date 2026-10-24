# BÁO CÁO XÁC ĐỊNH YÊU CẦU HỆ THỐNG
**Dự án:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.

---

## 1. Yêu Cầu Chức Năng (Functional Requirements - FR)
Yêu cầu chức năng mô tả những hành động (tính năng) cụ thể mà hệ thống phải thực hiện được, được phân chia theo 2 nhóm người dùng chính.

### 🧑‍💻 1.1. Nhóm yêu cầu dành cho Du khách (Public Frontend)
| Mã YC | Tên Yêu Cầu | Mô tả chi tiết |
| :--- | :--- | :--- |
| **FR01** | **Hiển thị Bản đồ số** | Hệ thống phải tải và hiển thị bản đồ nền (base map). Các điểm di tích được ghim (marker) trên bản đồ. Hỗ trợ gom cụm (Marker Clustering) tự động khi thu nhỏ bản đồ để tránh rối mắt. |
| **FR02** | **Tìm kiếm và Lọc** | Cho phép người dùng tìm kiếm di tích theo tên. Hỗ trợ lọc đa điều kiện: Lọc theo Cấp xếp hạng (Quốc gia, Cấp tỉnh...) và theo Địa bàn (Huyện/Thành phố). |
| **FR03** | **Tìm di tích lân cận** | Hệ thống nhận diện tọa độ hiện tại của thiết bị (nếu người dùng cho phép) và truy vấn ra các di tích trong bán kính định trước (VD: 5km, 10km, 20km). |
| **FR04** | **Xem chi tiết di tích** | Hiển thị đầy đủ thông tin: Tên, Lịch sử tóm tắt, Hình ảnh, Giờ hoạt động, Giá vé, Lưu ý tham quan và Nút "Chỉ đường đến đây". |
| **FR05** | **Định vị & Chỉ đường (Routing)** | Tính toán và vẽ tuyến đường đi ngắn nhất từ vị trí hiện tại của du khách đến di tích trên bản đồ. |
| **FR06** | **Quét mã QR Code** | Xử lý URL từ việc quét mã QR thực địa bằng điện thoại di động, tự động chuyển hướng (redirect) vào đúng trang thông tin chi tiết của di tích đó. |

### 👑 1.2. Nhóm yêu cầu dành cho Quản trị viên (Admin CMS)
| Mã YC | Tên Yêu Cầu | Mô tả chi tiết |
| :--- | :--- | :--- |
| **FR07** | **Đăng nhập & Phân quyền** | Quản trị viên phải đăng nhập an toàn để truy cập CMS. Phân quyền cơ bản (Admin/Editor). |
| **FR08** | **Quản lý Danh mục** | Quản lý danh sách các Huyện/Thành phố và Danh mục loại hình di tích (Lịch sử, Khảo cổ...). |
| **FR09** | **Quản lý Di tích (CRUD)** | Thêm, sửa, xóa thông tin di tích. **Đặc tả GIS:** Cung cấp bản đồ thu nhỏ trong trang nhập liệu để Admin click ghim vị trí lấy tọa độ chính xác, không cần gõ Vĩ độ/Kinh độ bằng tay. |
| **FR10** | **Quản lý Hình ảnh** | Cho phép tải ảnh lên (Upload), quản lý bộ sưu tập ảnh và gán ảnh làm ảnh đại diện (Thumbnail). |
| **FR11** | **Sinh mã QR Động** | Hệ thống tự động phát sinh mã QR code chứa URL của di tích. Hỗ trợ chèn Logo tỉnh Đồng Tháp vào trung tâm mã QR. |
| **FR12** | **Thống kê Báo cáo** | Cung cấp Dashboard thống kê trực quan số lượt xem (View) và số lượt quét mã (QR Scan) theo từng di tích. |
| **FR13** | **Xuất dữ liệu / Biểu mẫu** | Hỗ trợ xuất các file chuẩn: Tem in QR (PDF/PNG), Danh sách di tích (Excel), Hồ sơ số (PDF) và Dữ liệu GIS nền (GeoJSON). |

---

## 2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)
Yêu cầu phi chức năng quy định về các khía cạnh chất lượng, kiến trúc, bảo mật và trải nghiệm người dùng của hệ thống.

### 📱 2.1. Yêu cầu về Giao diện & Trải nghiệm (UI/UX)
*   **Thiết kế Mobile-First & Responsive:** Vì mục tiêu quan trọng của hệ thống là quét mã QR tại thực địa, giao diện phải hoạt động **cực kỳ mượt mà và tối ưu trên màn hình điện thoại di động** (Android, iOS). Giao diện tự động co giãn vừa với máy tính bảng và màn hình PC.
*   **Trực quan hóa:** Các điểm marker trên bản đồ phải dùng các icon khác màu nhau để phân biệt các loại hình di tích hoặc cấp xếp hạng.

### ⚡ 2.2. Yêu cầu về Hiệu năng (Performance)
*   **Tốc độ tải bản đồ:** Sử dụng thư viện bản đồ nhẹ (Leaflet.js dung lượng < 45KB) kết hợp Map tile từ OpenStreetMap để đảm bảo bản đồ tải nhanh dưới 3 giây ở mạng 4G tiêu chuẩn.
*   **Truy vấn không gian:** Cơ sở dữ liệu bắt buộc phải được đánh chỉ mục không gian (Spatial Index - `GiST` hoặc `R-Tree` trên PostGIS) để tính toán "khoảng cách lân cận" với độ trễ dưới 1 giây.

### 🔒 2.3. Yêu cầu về Bảo mật (Security)
*   Phân hệ Admin API (Backend) phải được bảo vệ bằng cơ chế xác thực Token (JWT - JSON Web Token).
*   Chống khai thác lỗi SQL Injection ở các bộ lọc tìm kiếm di tích.
*   Bảo vệ thư mục lưu trữ file ảnh (Uploads) không bị thực thi mã độc.

### 🌐 2.4. Yêu cầu về Chuẩn Dữ Liệu & Khả năng Mở Rộng
*   **Chuẩn GIS:** Hệ thống phải lưu tọa độ địa lý tuân theo Hệ quy chiếu quốc tế **WGS 84 (SRID 4326)**.
*   **Kiến trúc API:** Giao tiếp giữa Frontend và Backend phải thông qua kiến trúc RESTful API bằng định dạng chuẩn JSON và GeoJSON, giúp dự án sau này dễ dàng phát triển thêm App Mobile Native (Android/iOS) nếu cần.
*   Khả năng mở rộng: Kiến trúc phần mềm phải thiết kế linh hoạt để trong tương lai có thể gắn thêm tính năng AI Audio Guide (Thuyết minh tự động) hoặc hình ảnh VR 360 như Đề cương đã đề xuất.
