# SƠ ĐỒ QUY TRÌNH NGHIỆP VỤ (BPMN 2.0)
**Nhóm sơ đồ:** Dữ liệu & Quy trình
**Quy trình:** Nghiệp vụ Khảo sát, Số hóa và Phát hành Tem mã QR tại Di tích.
**Đơn vị chủ quản (Pool):** Sở Văn hóa, Thể thao và Du lịch tỉnh Đồng Tháp.

```mermaid
flowchart LR
    %% Định nghĩa Style giả lập chuẩn BPMN
    classDef startEvent fill:#d5e8d4,stroke:#82b366,stroke-width:2px,shape:circle;
    classDef endEvent fill:#f8cecc,stroke:#b85450,stroke-width:4px,shape:circle;
    classDef task fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,rx:5px,ry:5px;
    classDef gateway fill:#fff2cc,stroke:#d6b656,stroke-width:2px,shape:diamond;

    %% Pool: SỞ VHTTDL
    subgraph POOL [SỞ VHTTDL TỈNH ĐỒNG THÁP]
        direction TB

        %% Lane 1: Cán bộ Khảo sát
        subgraph L1 [1. Cán bộ Khảo sát thực địa]
            direction LR
            Start((Bắt đầu)):::startEvent --> T1(Khảo sát & Lấy tọa độ GPS):::task
            T1 --> T2(Bàn giao hồ sơ số liệu):::task
        end

        %% Lane 2: Quản trị viên CMS
        subgraph L2 [2. Quản trị viên CMS]
            direction LR
            T3(Tạo bài viết Di tích):::task
            T4(Ghim bản đồ & Upload ảnh):::task
            T7(Tải file Tem QR gốc):::task
            T8(Giao file cho Đơn vị in):::task
        end

        %% Lane 3: Hệ thống Web GIS
        subgraph L3 [3. Hệ thống Web GIS]
            direction LR
            GW1{Dữ liệu<br>hợp lệ?}:::gateway
            T5(Lưu CSDL Không gian PostGIS):::task
            T6(Tự động Sinh QR Code):::task
        end

        %% Lane 4: Đơn vị Thi công
        subgraph L4 [4. Đơn vị Thi công / Ban quản lý]
            direction LR
            T9(In ấn Tem QR khổ A5):::task
            T10(Lắp đặt biển báo tại Di tích):::task
            End((Hoàn tất)):::endEvent
        end
    end

    %% KẾT NỐI CÁC BƯỚC (MESSAGE & SEQUENCE FLOWS)
    T2 -->|Gửi File/Giấy| T3
    T3 --> T4
    T4 -->|Bấm Lưu| GW1

    GW1 -- Sai/Thiếu --> T3
    GW1 -- Hợp lệ --> T5
    
    T5 --> T6
    T6 -->|File PNG/SVG| T7
    
    T7 --> T8
    T8 -->|Gửi File In| T9
    T9 --> T10
    T10 --> End
```

## Diễn giải Quy trình nghiệp vụ:
Sơ đồ BPMN chia quy trình thành 4 luồng bơi (Swimlanes) tương ứng với 4 đối tượng tham gia vào quy trình số hóa:
1. **Cán bộ Khảo sát:** Là người đi thực địa (Fieldwork), tới tận các di tích (VD: Gò Tháp, Xẻo Quýt) để ghi nhận hiện trạng, lấy tọa độ Vĩ độ/Kinh độ chính xác và chụp ảnh tư liệu.
2. **Quản trị viên:** Chịu trách nhiệm vận hành hệ thống phần mềm CMS. Họ tiếp nhận hồ sơ từ cán bộ khảo sát, nhập liệu vào hệ thống và duyệt bài.
3. **Hệ thống Web GIS:** Đóng vai trò tự động hóa nghiệp vụ (Automated Task). Khi Admin bấm lưu, hệ thống có rẽ nhánh (Gateway) để Validate dữ liệu. Nếu thành công, hệ thống tự động làm 2 việc: Lưu CSDL không gian và Sinh mã QR động.
4. **Đơn vị Thi công:** Nhận file thiết kế Tem QR từ Admin để mang đi in ấn gia công (mica/nhựa/kim loại) và đóng biển báo tại thực địa, giúp du khách quét mã.
