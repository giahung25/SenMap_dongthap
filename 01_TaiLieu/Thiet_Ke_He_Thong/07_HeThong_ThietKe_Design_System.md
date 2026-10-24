# HỆ THỐNG THIẾT KẾ ĐỒNG BỘ (DESIGN SYSTEM SPECIFICATION)
**Dự án:** Xây dựng hệ thống bản đồ số giới thiệu và tra cứu các di tích, địa điểm văn hóa trên địa bàn tỉnh Đồng Tháp.  
**Bản sắc thương hiệu:** **Đất Sen Hồng Đồng Tháp (Thuần khiết - Sinh thái - Thân thiện - Hiện đại)**.  
**Nền tảng triển khai:** React.js + Tailwind CSS 3.x + Leaflet.js.

---

## 1. HỆ THỐNG MÀU SẮC (COLOR SYSTEM)

Hệ thống màu được thiết kế gắn liền với nét đặc trưng văn hóa của tỉnh Đồng Tháp (Hoa sen và Rừng tràm sinh thái), đồng thời đảm bảo độ tương phản tiếp cận (WCAG 2.1 AA) cho người đọc ngoài trời nắng.

```text
+-----------------------------------------------------------------------------------------+
| [ #E11D48 ] Primary: Hồng Sen     | [ #059669 ] Secondary: Xanh Tràm | [ #0F172A ] Slate-900 |
| [ #10B981 ] Success: Xanh Lá      | [ #F59E0B ] Warning: Hổ Phách     | [ #EF4444 ] Error: Đỏ |
+-----------------------------------------------------------------------------------------+
```

### 🌸 1.1. Màu chủ đạo (Primary Color) - Hồng Sen Đồng Tháp
Đại diện cho hình ảnh biểu trưng của tỉnh, được sử dụng cho các thành phần nhận diện quan trọng nhất: Marker di tích đặc biệt, nút hành động chính (Primary CTA), đường viền focus và tab kích hoạt.

| Token | Mã HEX | Tailwind Class | Ứng dụng thực tế |
| :--- | :--- | :--- | :--- |
| `primary-50` | `#FFF1F2` | `bg-rose-50` | Nền chip tag được chọn, nền thông báo nhẹ |
| `primary-100`| `#FFE4E6` | `bg-rose-100` | Nền hover của các menu item |
| `primary-500`| `#F43F5E` | `bg-rose-500` | Trạng thái hover của nút bấm chính |
| **`primary-600`**| **`#E11D48`** | **`bg-rose-600`** | **Màu thương hiệu chính (Base Primary)** |
| `primary-700`| `#BE123C` | `bg-rose-700` | Trạng thái active/nhấn của nút chính |

### 🌿 1.2. Màu phụ (Secondary Color) - Xanh Tràm Sinh Thái
Đại diện cho thiên nhiên, sinh thái Đồng Tháp (Tràm Chim, Gáo Giồng). Được sử dụng chuyên biệt cho **Tính năng Bản đồ, Định vị GPS và Chỉ đường**.

| Token | Mã HEX | Tailwind Class | Ứng dụng thực tế |
| :--- | :--- | :--- | :--- |
| `secondary-50`| `#ECFDF5` | `bg-emerald-50` | Nền nhãn "Miễn phí vé", nền card chỉ đường |
| **`secondary-600`**| **`#059669`** | **`bg-emerald-600`** | **Nút "Chỉ đường đến đây", Tuyến đường Polyline** |
| `secondary-700`| `#047857` | `bg-emerald-700` | Trạng thái hover của nút chỉ đường |

### 🚨 1.3. Màu Ngữ nghĩa & Trạng thái (Semantic Colors)
- **Thành công (Success):** `#10B981` (Emerald-500) - Báo lưu dữ liệu thành công, trạng thái di tích "Đang mở cửa".
- **Cảnh báo (Warning):** `#F59E0B` (Amber-500) - Di tích đang trùng tu, nhắc nhở giờ sắp đóng cửa.
- **Lỗi / Xóa (Error/Destructive):** `#EF4444` (Red-500) - Báo lỗi form, nút "Xóa di tích" trong CMS.
- **Thông tin (Info):** `#0284C7` (Sky-600) - Thông báo hướng dẫn quét mã QR, popup gợi ý.

### 🏢 1.4. Màu Nền & Trung tính (Neutral & Surface Colors)
- **Nền chính trang web:** `#F8FAFC` (Slate-50) - Tránh chói mắt khi dùng ngoài trời.
- **Nền thẻ / Hộp thoại (Surface):** `#FFFFFF` (White) - Nền cho Popup marker, Card danh sách, Modal.
- **Văn bản chính (Text High-Contrast):** `#0F172A` (Slate-900) - Dùng cho toàn bộ tiêu đề H1, H2, H3.
- **Văn bản phụ (Text Muted):** `#64748B` (Slate-500) - Dùng cho địa chỉ, ngày giờ, số km khoảng cách.
- **Đường kẻ viền (Border / Divider):** `#E2E8F0` (Slate-200) - Viền phân cách các khối nội dung.

---

## 2. HỆ THỐNG KIỂU CHỮ (TYPOGRAPHY SCALE)

### 🔤 2.1. Phông chữ quy chuẩn (Font Family)
*   **Phông chữ chính:** **`Be Vietnam Pro`** (Google Fonts).
    *   *Lý do lựa chọn:* Là bộ phông chữ mã nguồn mở được thiết kế riêng tối ưu cho tiếng Việt, hiển thị các dấu thanh (huyền, sắc, hỏi, ngã, nặng) cực kỳ thanh thoát, chuẩn xác, không bị lỗi gãy chữ hay lệch dòng trên cả Windows, iOS và Android.
    *   *Phông chữ dự phòng (Fallback):* `Inter`, `system-ui`, `-apple-system`, `sans-serif`.

### 📏 2.2. Thang phân cấp chữ (Type Scale)

| Cấp bậc | Kích thước | Chiều cao dòng (Line-height) | Độ đậm (Font Weight) | Ứng dụng cụ thể trong hệ thống |
| :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | `32px` (2rem) | `40px` (1.25) | **Bold (700)** | Tiêu đề tên di tích trên Màn hình Chi tiết |
| **Heading 2 (H2)**| `24px` (1.5rem)| `32px` (1.33) | **Semibold (600)** | Tiêu đề các phân đoạn lớn (Lịch sử, Hình ảnh) |
| **Heading 3 (H3)**| `18px` (1.125rem)|`26px` (1.44) | **Semibold (600)** | Tên di tích trong Popup bản đồ, Tiêu đề Card |
| **Subhead** | `16px` (1rem) | `24px` (1.5) | **Medium (500)** | Tên huyện, nhãn thông số tóm tắt |
| **Body Large** | `16px` (1rem) | **`28px` (1.75)** | **Regular (400)** | **Nội dung bài viết lịch sử thuyết minh** (dễ đọc) |
| **Body Base** | `14px` (0.875rem)|`20px` (1.43) | **Regular (400)** | Địa chỉ, giờ mở cửa, mô tả ngắn trong danh sách |
| **Caption / Badge**| `12px` (0.75rem)| `16px` (1.33) | **Medium (500)** | Tag cấp xếp hạng, khoảng cách km, chú thích ảnh |

---

## 3. QUY CÁCH THÀNH PHẦN GIAO DIỆN (UI COMPONENTS SPECIFICATION)

### 🔘 3.1. Nút Bấm (Button Components)

```text
+---------------------------+   +---------------------------+   +------------------+
|   [🚗 Bắt đầu chỉ đường]   |   |     [ Khám phá bản đồ ]   |   |   [ Tải Tem A5 ] |
|   Primary Emerald (52px)  |   |     Primary Rose (44px)   |   |   Outline (40px) |
+---------------------------+   +---------------------------+   +------------------+
```

#### A. Nút Chỉ đường (Routing CTA Button - Quan trọng nhất):
- **Màu nền:** `#059669` (Emerald-600), chữ trắng `font-bold`.
- **Kích thước:** Chiều cao `48px` - `52px` (chuẩn kích thước ngón tay bấm trên màn hình cảm ứng).
- **Bo góc:** `12px` (`rounded-xl`).
- **Trạng thái:**
  - *Default:* `bg-emerald-600 text-white shadow-md shadow-emerald-600/20`
  - *Hover:* `bg-emerald-700`
  - *Active:* `bg-emerald-800 scale-[0.98]`
  - *Loading:* Nền mờ, hiện Spinner xoay vòng, vô hiệu hóa click.

#### B. Nút Hành động Chính (Primary Button):
- **Màu nền:** `#E11D48` (Rose-600), chữ trắng. Dùng cho: "Lưu di tích", "Đăng nhập", "Xem chi tiết".
- **Kích thước:** Chiều cao `44px`, padding ngang `20px`. Bo góc `12px`.

#### C. Nút Phụ / Viền (Secondary / Outline Button):
- **Đặc điểm:** Nền trong suốt hoặc trắng, viền `1.5px` màu Slate-200, chữ màu Slate-700. Dùng cho: "Hủy", "Quay lại", "Bộ lọc nâng cao".

#### D. Nút Điều khiển Nổi (Floating Action Button - FAB):
- **Kích thước:** Tròn hoàn hảo `48px x 48px`, nền trắng `bg-white/95`, đổ bóng `shadow-lg`, bo tròn `rounded-full`.
- **Ứng dụng:** Nút định vị GPS của tôi (ở góc dưới bên phải bản đồ), nút Phóng to/Thu nhỏ.

---

### 🔍 3.2. Thanh Điều Hướng & Tìm Kiếm (Navigation & Bars)

#### A. Thanh Tìm kiếm Nổi (Floating Search Capsule):
- **Bố cục:** Nổi tự do trên nền bản đồ (Floating Top Bar).
- **Kích thước:** Chiều cao chuẩn `48px`, bo góc tròn con nhộng `rounded-full` (`border-radius: 9999px`).
- **Nền & Viền:** Nền kính mờ `backdrop-blur-md bg-white/90`, viền `1px solid rgba(226, 232, 240, 0.8)`. Đổ bóng nhẹ `shadow-lg`.
- **Thành phần bên trong:**
  - Icon kính lúp màu Slate-400 bên trái (`w-5 h-5`).
  - Ô nhập text không viền `bg-transparent outline-none text-slate-800`.
  - Nút "X" (Clear text) tự động xuất hiện khi có chữ.
  - Avatar / Nút Admin thu nhỏ ở góc phải.

#### B. Ngăn kéo vuốt từ dưới lên (Mobile Bottom Sheet Drawer):
- **Đặc tính:** Thành phần giao diện cốt lõi trên điện thoại khi xem bản đồ.
- **Kích thước:**
  - Trạng thái thu gọn (Collapsed): Chiều cao `120px` (chỉ lộ tên di tích đang chọn và nút Chỉ đường).
  - Trạng thái mở rộng (Expanded): Vuốt lên chiếm `85%` chiều cao màn hình để đọc bài viết tóm tắt.
- **Thanh nắm vuốt (Grabber Handle):** Một thanh xám bo tròn ở đỉnh drawer rộng `40px`, cao `4px`, màu Slate-300.

---

### 📝 3.3. Ô Nhập Liệu (Input Fields Component)

#### A. Ô Nhập liệu Tiêu chuẩn (Standard Text Input):
- **Kích thước:** Chiều cao `44px`, padding ngang `14px`, bo góc `10px`.
- **Màu sắc:** Nền trắng, viền `border border-slate-200`.
- **Trạng thái:**
  - *Default:* `border-slate-200 text-slate-900`
  - *Focus:* `border-rose-500 ring-4 ring-rose-500/10` (Hiệu ứng viền phát sáng hồng sen tinh tế).
  - *Error:* `border-red-500 ring-4 ring-red-500/10` kèm thông báo lỗi màu đỏ bên dưới.
  - *Disabled:* `bg-slate-100 text-slate-400 cursor-not-allowed`.

#### B. Ô Hiển thị Tọa độ GPS (Coordinate Read-Only Input):
- **Đặc thù Web GIS:** Nằm trong trang Admin khi ghim bản đồ.
- **Giao diện:** Nền màu `bg-slate-50`, phông chữ số dạng Monospace (`font-mono text-slate-700`) để các con số tọa độ thẳng hàng, có biểu tượng chiếc ghim định vị ở đầu ô.

---

### 🗂️ 3.4. Các Loại Thẻ Hiển Thị (Cards Specification)

#### A. Thẻ Popup trên Marker Bản đồ (Map Marker Card):
- **Kích thước:** Rộng `280px`, tối đa `320px`.
- **Bo góc & Đổ bóng:** `rounded-2xl`, `shadow-xl`.
- **Cấu trúc bên trong:**
  - **Ảnh bìa:** Tỷ lệ 16:9 (`height: 120px`), bo tròn góc trên.
  - **Badge xếp hạng:** Nằm đè lên góc ảnh (Floating Badge: Hồng cho Quốc gia, Xanh cho Cấp tỉnh).
  - **Khối thông tin:** Tên di tích (H3 Semibold), Địa chỉ kèm icon vị trí (Text 13px Muted).
  - **Nút bấm kép:** Nút "Chi tiết" (Nền Slate-100) và Nút "Chỉ đường" (Nền Emerald-600).

#### B. Thẻ Danh sách Di tích bên Sidebar (Sidebar List Item Card):
- **Bố cục:** Dạng thẻ ngang (Horizontal Card).
- **Kích thước:** Chiều cao `92px`, padding `10px`.
- **Cấu trúc:** Ảnh vuông `72px x 72px` bo góc `10px` bên trái; Bên phải là Tên di tích (cắt tối đa 2 dòng) và Khoảng cách (VD: *"Cách bạn 3.5 km"*).
- **Hiệu ứng Hover:** `hover:bg-rose-50/50 hover:border-rose-200 transition-all`.

---

## 4. TÍCH HỢP KỸ THUẬT (TAILWIND CSS CONFIGURATION)

Để lập trình viên tái sử dụng ngay khi code Frontend, cấu hình `tailwind.config.js` được chuẩn hóa như sau:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu thương hiệu Đất Sen Hồng
        primary: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#F43F5E',
          600: '#E11D48', // Base Primary
          700: '#BE123C',
        },
        // Màu Sinh thái & Bản đồ GPS
        secondary: {
          50: '#ECFDF5',
          600: '#059669', // Base Secondary (Routing)
          700: '#047857',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'map-float': '0 6px 20px -4px rgba(0, 0, 0, 0.15)',
        'bottom-sheet': '0 -8px 24px -4px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
```
