# 📜 NHẬT KÝ HOẠT ĐỘNG DỰ ÁN (PROJECT ACTIVITY LOG)
**Đề tài:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.  
**Cơ chế:** Audit Trail / Changelog tự động lưu trữ mọi thao tác.

---

> ### ⚠️ QUY TẮC BẮT BUỘC DÀNH CHO MỌI TÁC NHÂN (MANDATORY RULE)
> **Áp dụng cho:** Tất cả Người phát triển (Developers), Sinh viên, và các Trợ lý AI (Oh My Pi Agent, Claude, Copilot, GPT...) khi làm việc trên không gian dự án này:
> 
> 1. **Ghi nhật ký tức thì:** Bất kỳ thao tác nào làm thay đổi dự án (Tạo mới thư mục/tập tin, Chỉnh sửa nội dung, Xóa bỏ, Cài đặt thư viện, Sửa lỗi cú pháp) **PHẢI** được ghi lại một dòng vào bảng bên dưới ngay trong phiên làm việc đó.
> 2. **Định dạng thời gian chuẩn:** Ghi rõ chính xác Ngày - Tháng - Năm và Giờ - Phút - Giây (`YYYY-MM-DD HH:mm:ss`).
> 3. **Cập nhật Tiến độ song song:** Nếu thao tác hoàn thành một mốc công việc mới, phải cập nhật đồng thời file `TIEN_DO_DU_AN.md`.

---

## 🕒 LỊCH SỬ THAO TÁC CHI TIẾT (HISTORICAL LOG)

| Thời gian (YYYY-MM-DD HH:mm:ss) | Tác nhân (Actor) | Loại thao tác | Nội dung chi tiết & Kết quả thực hiện |
| :--- | :--- | :--- | :--- |
| **2026-10-04 12:20:00** | Gia Hưng & AI | Khảo sát | Đọc và rà soát Đề cương KLTN bản mới nhất (`bản nộp/27.9.25-De cuong thuc hien de tai_002.docx`). Xác định mục tiêu, phạm vi và công nghệ lõi. |
| **2026-10-04 12:43:00** | AI Assistant | Tái cấu trúc | Xóa bỏ các scaffold code thừa ban đầu theo yêu cầu đóng vai trò Chuyên viên Phân tích Hệ thống. Thiết lập cấu trúc thư mục quy chuẩn 4 phân khu: `01_TaiLieu`, `02_DuLieu_GIS`, `03_MaNguon`, `04_CoSoDuLieu`. |
| **2026-10-04 12:50:00** | AI Assistant | Di chuyển file | Gom các văn bản hành chính, đơn đăng ký, đề cương và chữ ký vào `01_TaiLieu/De_Cuong/`. Chuyển `test.yml` vào `03_MaNguon/`. |
| **2026-10-04 13:00:00** | AI Assistant | Tạo dữ liệu | Tạo bảng biểu mẫu khảo sát tọa độ và thông tin cho 20 di tích tiêu biểu tỉnh Đồng Tháp: `02_DuLieu_GIS/Toa_Do/01_DanhSach_KhaoSat_20DiTich.csv`. |
| **2026-10-04 13:10:00** | AI Assistant | Phân tích | Biên soạn tài liệu Tổng quan dự án: `README.md` tại thư mục gốc. |
| **2026-10-10 10:42:00** | Gia Hưng & AI | Cài đặt Tool | Cài đặt bộ kỹ năng công cụ vẽ sơ đồ chuyên sâu `archify` vào hệ thống thông qua `Skills CLI` (`.agents/skills/archify`). |
| **2026-10-10 11:02:00** | AI Assistant | Thiết kế | Phân tích và biên soạn danh mục 13 Use Case hệ thống kèm sơ đồ Mermaid: `01_TaiLieu/Thiet_Ke_He_Thong/01_DanhSach_UseCase.md`. |
| **2026-10-10 11:09:00** | AI Assistant | Thiết kế | Biên soạn Báo cáo Đặc tả Yêu cầu Hệ thống (Yêu cầu chức năng FR01-FR13 và Yêu cầu phi chức năng): `01_TaiLieu/Thiet_Ke_He_Thong/02_XacDinhYeuCau.md`. |
| **2026-10-10 11:35:00** | AI Assistant | Thiết kế | Dùng Archify render thành công **Sơ đồ Tuần tự (Sequence Diagram)** tương tác HTML: `01_Sequence_Diagram_QuetQR.html`. |
| **2026-10-10 11:41:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Hoạt động (Activity Diagram)**: `02_Activity_Diagram_CRUD_DiTich.md` và **Sơ đồ Trạng thái (State Machine)**: `03_StateMachine_DiTich.md`. Hoàn thành 100% Phase 1 (Luồng xử lý). |
| **2026-10-10 11:43:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Lớp (Class Diagram)** chuẩn Mermaid: `01_Class_Diagram.md`. |
| **2026-10-10 11:45:00** | AI Assistant | Thiết kế | Dùng Archify render thành công **Sơ đồ Kiến trúc (Architecture Diagram)** tương tác HTML: `02_Architecture_Diagram.html`. |
| **2026-10-10 11:48:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Triển khai (Deployment Diagram)** kiến trúc Docker/Nginx: `03_Deployment_Diagram.md`. Hoàn thành 100% Phase 2 (Cấu trúc hệ thống). |
| **2026-10-10 11:49:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ CSDL Không gian (Logical ERD)** bám sát PostGIS: `01_ERD_Database.md`. |
| **2026-10-10 11:51:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Luồng Dữ Liệu (DFD Mức 1)**: `02_DataFlow_Diagram.md`. |
| **2026-10-10 11:52:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Quy trình Nghiệp vụ (BPMN 2.0)** gồm 4 luồng bơi: `03_BPMN_Diagram.md`. |
| **2026-10-10 11:53:00** | AI Assistant | Thiết kế | Biên soạn **Sơ đồ Use Case Chi tiết** (có liên kết include/extend): `04_UseCase_ChiTiet.md`. Hoàn thành 100% toàn bộ 10 sơ đồ hệ thống. |
| **2026-10-11 11:30:00** | Gia Hưng & AI | Sửa lỗi | Phát hiện và khắc phục triệt để lỗi *Parse error on line 14* trong file DFD và Deployment do ký tự đặc biệt trong Mermaid. Tự động kiểm thử toàn bộ 9 file sơ đồ bằng Chromium đạt 100% pass. |
| **2026-10-11 11:43:00** | AI Assistant | Dọn dẹp | Bổ sung file `.md` cho Sequence & Architecture. Tạo thư mục `99_File_Bo_Tro/` và di chuyển toàn bộ file `.json`, receipt, script phụ để các thư mục sơ đồ hoàn toàn gọn gàng. |
| **2026-10-11 11:55:00** | AI Assistant | Phân tích | Phân tích chuyên sâu về Chiến lược 2 Giai đoạn (MVP FastAPI trước ➔ Tối ưu Rust Axum sau), xuất tài liệu `00_ThietKeKienTruc_Va_LoTrinh.md`. |
| **2026-10-11 12:05:00** | AI Assistant | Cấu trúc | Tạo thư mục lưu trữ tài liệu tham khảo: `01_TaiLieu/Tai_Lieu_Tham_Khao/` kèm file hướng dẫn `README.md`. |
| **2026-10-11 12:15:00** | AI Assistant | Quản trị | Khởi tạo file theo dõi tiến độ `TIEN_DO_DU_AN.md`, file nhật ký `NHAT_KY_HOAT_DONG.md`, và thiết lập quy tắc bắt buộc ghi log ngày giờ cho toàn bộ dự án. |
| **2026-10-11 12:45:00** | AI Assistant | Dọn dẹp | Di chuyển file khóa phụ trợ `skills-lock.json` từ thư mục gốc vào `01_TaiLieu/Thiet_Ke_He_Thong/99_File_Bo_Tro/` để giữ thư mục chính sạch sẽ theo yêu cầu. |
| **2026-10-11 13:10:00** | AI Assistant | Thiết kế CSDL | Hoàn thành Thiết kế CSDL vật lý: xuất tài liệu đặc tả `04_CoSoDuLieu/THIET_KE_CSDL_CHI_TIET.md` và script DDL `04_CoSoDuLieu/Scripts/01_init_schema.sql` (tối ưu hóa GiST spatial index, Trigram GIN index, B-tree FK, và trigger updated_at). |
| **2026-10-11 13:30:00** | AI Assistant | Thiết kế UI/UX | Hoàn thành Đặc tả Thiết kế UI/UX & Wireframes chi tiết: xuất tài liệu `01_TaiLieu/Thiet_Ke_He_Thong/06_ThietKe_UI_UX_Wireframes.md` (bao gồm phác thảo thô Low-fidelity ASCII, cấu trúc High-fidelity cho Public Web GIS, Trang Chi tiết Quét QR Mobile-First và CMS Admin ghim bản đồ). |
| **2026-10-11 13:50:00** | AI Assistant | Hệ thống Thiết kế | Hoàn thành Đặc tả Hệ thống Thiết kế (Design System): xuất tài liệu `01_TaiLieu/Thiet_Ke_He_Thong/07_HeThong_ThietKe_Design_System.md` (chuẩn hóa bảng màu Đất Sen Hồng Rose-600 & Xanh Tràm Emerald-600, Typography font Be Vietnam Pro, quy cách Button, Floating Search Capsule, Bottom Sheet Drawer, Card, và cấu hình mẫu tailwind.config.js). |
| **2026-10-11 14:15:00** | AI Assistant | Cấu hình MCP | Thiết lập kết nối máy chủ Figma MCP (Model Context Protocol qua giao thức SSE: `https://mcp.figma.com/mcp`) vào cấu hình toàn cục `C:/Users/ASUS/.claude.json` và file cấu hình dự án `.mcp.json` theo yêu cầu. |
| **2026-10-11 14:35:00** | AI Assistant | Cài đặt Kỹ năng | Clone repository `openai/skills` và cài đặt bộ kỹ năng thiết kế `figma-implement-design` (cùng các kỹ năng bổ trợ `figma-generate-design`, `figma-use`) vào các thư mục `.claude/skills/` và `.agents/skills/` để sẵn sàng làm việc với Figma MCP. |
| **2026-10-24 17:10:30** | Orchestrator (`w2:p1` - `pi`) | Quản trị & Cấu hình | Thiết lập Bộ Quy tắc Quản trị & Điều phối Đa Tác nhân trên Herdr trong `AGENTS.md`: định nghĩa rõ vai trò của Orchestrator (`w2:p1`), Coder (`w2:p5`), Tester (`w2:p4`), Runner Shell (`w2:p6`), quy trình 5 bước giao việc/nghiệm thu, cơ chế khóa file chống xung đột và quy chuẩn kỹ thuật PostGIS/FastAPI/React. |
| **2026-10-24 17:30:35** | Orchestrator (`w2:p1` - `pi`) | Cấu hình MCP | Thiết lập máy chủ Google Stitch MCP (`https://stitch.googleapis.com/mcp`) kèm API Key vào `.mcp.json` của dự án, `.claude.json` và cấu hình toàn cục `~/.gemini/config/mcp_config.json`. Kiểm thử kết nối `list_projects` thành công. |
| **2026-10-24 17:54:40** | Orchestrator (`w2:p1` - `pi`) | Quản trị & Đồng bộ | Tiếp thu chỉ thị từ PM Hermes: đồng bộ `01_TaiLieu/QUY_TAC_DAT_GACH_KLTN.md` và `01_TaiLieu/QUY_TAC_GIT_KLTN.md` vào `AGENTS.md` (4 nguyên tắc cốt lõi: Working Code, Bounding Box Đồng Tháp 105.15–105.95E / 10.10–10.95N, Conventional Commits, Zero-Deletion Policy) và lập kế hoạch triển khai Phase 5. |
| **2026-10-24 17:56:45** | Orchestrator (`w2:p1` - `pi`) | Quản trị Git | Loại bỏ `.mcp.json` khỏi lịch sử Git (bảo vệ Stitch API Key theo quy tắc Secrets Protection), bổ sung vào `.gitignore` và đẩy nhánh `main` lên GitHub (`https://github.com/giahung25/SenMap_dongthap.git`). |
