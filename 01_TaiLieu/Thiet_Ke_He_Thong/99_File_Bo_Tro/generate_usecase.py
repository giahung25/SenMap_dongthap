import json

data = {
  "schema_version": 1,
  "diagram_type": "architecture",
  "meta": {
    "title": "Hệ thống Bản đồ Số Di tích",
    "subtitle": "Use Case Diagram",
    "output": "sodo-usecase.html"
  },
  "components": [
    {
      "id": "tourist",
      "type": "external",
      "label": "Khách du lịch",
      "sublabel": "Web / Mobile",
      "pos": [40, 200],
      "size": [140, 60]
    },
    {
      "id": "admin",
      "type": "external",
      "label": "Quản trị viên",
      "sublabel": "CMS / Dashboard",
      "pos": [40, 650],
      "size": [140, 60]
    },
    {
      "id": "uc01",
      "type": "frontend",
      "label": "UC01 Khám phá map",
      "sublabel": "Cluster, popup",
      "pos": [250, 100],
      "size": [150, 60]
    },
    {
      "id": "uc02",
      "type": "frontend",
      "label": "UC02 Tra cứu",
      "sublabel": "Search, lọc hạng/KV",
      "pos": [250, 200],
      "size": [150, 60]
    },
    {
      "id": "uc03",
      "type": "frontend",
      "label": "UC03 Tìm lân cận",
      "sublabel": "Bán kính 5/10/20km",
      "pos": [250, 300],
      "size": [150, 60]
    },
    {
      "id": "uc04",
      "type": "frontend",
      "label": "UC04 Chi tiết di tích",
      "sublabel": "Lịch sử, ảnh, vé",
      "pos": [460, 200],
      "size": [150, 60]
    },
    {
      "id": "uc05",
      "type": "frontend",
      "label": "UC05 Chỉ đường",
      "sublabel": "GPS, lộ trình",
      "pos": [670, 200],
      "size": [150, 60]
    },
    {
      "id": "uc06",
      "type": "frontend",
      "label": "UC06 Quét QR",
      "sublabel": "Mở nhanh UC04",
      "pos": [460, 300],
      "size": [150, 60]
    },
    {
      "id": "uc07",
      "type": "security",
      "label": "UC07 Đăng nhập",
      "sublabel": "Xác thực, phân quyền",
      "pos": [250, 650],
      "size": [150, 60]
    },
    {
      "id": "uc08",
      "type": "backend",
      "label": "UC08 QL Danh mục",
      "sublabel": "Huyện/TP, Loại hình",
      "pos": [460, 500],
      "size": [150, 60]
    },
    {
      "id": "uc09",
      "type": "backend",
      "label": "UC09 QL Di tích",
      "sublabel": "CRUD, ghim map",
      "pos": [460, 600],
      "size": [150, 60]
    },
    {
      "id": "uc10",
      "type": "backend",
      "label": "UC10 QL Hình ảnh",
      "sublabel": "Tải, crop, tag",
      "pos": [460, 700],
      "size": [150, 60]
    },
    {
      "id": "uc11",
      "type": "backend",
      "label": "UC11 QL QR Code",
      "sublabel": "Sinh, chèn logo, tải",
      "pos": [460, 800],
      "size": [150, 60]
    },
    {
      "id": "uc12",
      "type": "backend",
      "label": "UC12 Báo cáo",
      "sublabel": "Biểu đồ, lượt truy cập",
      "pos": [670, 550],
      "size": [150, 60]
    },
    {
      "id": "uc13",
      "type": "backend",
      "label": "UC13 Xuất Dữ liệu",
      "sublabel": "PDF, Excel, GeoJSON",
      "pos": [670, 750],
      "size": [150, 60]
    }
  ],
  "boundaries": [
    {
      "kind": "region",
      "label": "Giao diện Công cộng (Web/Mobile)",
      "wraps": ["uc01", "uc02", "uc03", "uc04", "uc05", "uc06"]
    },
    {
      "kind": "region",
      "label": "Hệ thống Quản trị CMS",
      "wraps": ["uc07", "uc08", "uc09", "uc10", "uc11", "uc12", "uc13"]
    }
  ],
  "connections": [
    { "from": "tourist", "to": "uc01" },
    { "from": "tourist", "to": "uc02" },
    { "from": "tourist", "to": "uc03" },
    { "from": "tourist", "to": "uc06", "fromSide": "bottom", "toSide": "left" },
    { "from": "uc01", "to": "uc04" },
    { "from": "uc02", "to": "uc04" },
    { "from": "uc03", "to": "uc04", "fromSide": "right", "toSide": "bottom" },
    { "from": "uc06", "to": "uc04" },
    { "from": "uc04", "to": "uc05" },
    
    { "from": "admin", "to": "uc07", "variant": "security" },
    { "from": "uc07", "to": "uc08", "fromSide": "top", "toSide": "left" },
    { "from": "uc07", "to": "uc09", "fromSide": "top", "toSide": "left" },
    { "from": "uc07", "to": "uc10", "fromSide": "bottom", "toSide": "left" },
    { "from": "uc07", "to": "uc11", "fromSide": "bottom", "toSide": "left" },
    { "from": "uc07", "to": "uc12", "fromSide": "top", "toSide": "left" },
    { "from": "uc07", "to": "uc13", "fromSide": "bottom", "toSide": "left" },
    { "from": "uc09", "to": "uc10", "variant": "dashed" },
    { "from": "uc09", "to": "uc11", "variant": "dashed", "fromSide": "right", "toSide": "right" }
  ],
  "cards": [
    {
      "dot": "cyan",
      "title": "Người dùng vãng lai",
      "items": [
        "Không yêu cầu đăng nhập",
        "Truy cập thông tin qua web hoặc quét mã trực tiếp",
        "Tích hợp bản đồ và định vị GPS"
      ]
    },
    {
      "dot": "emerald",
      "title": "Quản trị viên hệ thống",
      "items": [
        "Đăng nhập qua CMS",
        "Sử dụng công cụ trực quan để quản lý nội dung và hình ảnh",
        "Quản lý mã QR động với nhận diện thương hiệu",
        "Báo cáo và xuất khẩu dữ liệu đa định dạng"
      ]
    }
  ]
}

with open("usecase-diagram.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
