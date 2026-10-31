-- ==============================================================================
-- DỰ ÁN: HỆ THỐNG BẢN ĐỒ SỐ DI TÍCH VĂN HÓA TỈNH ĐỒNG THÁP (WEB GIS)
-- TẬP LỆNH: NẠP DỮ LIỆU MẪU (SEED DATA 20 DI TÍCH ĐỒNG THÁP - SRID 4326)
-- CẬP NHẬT: Tọa độ khảo sát thực tế OpenStreetMap & Quyết định xếp hạng chuẩn 2026
-- ==============================================================================

-- 1. DANH MỤC LOẠI HÌNH DI TÍCH
INSERT INTO danh_muc (ten_danh_muc, mo_ta) OVERRIDING SYSTEM VALUE VALUES
('Lịch sử - Cách mạng', 'Các khu di tích lịch sử, căn cứ kháng chiến, đền thờ danh nhân và địa điểm sự kiện lịch sử tiêu biểu tại Đồng Tháp'),
('Khảo cổ - Văn hóa Óc Eo', 'Các di chỉ khảo cổ học thuộc nền văn hóa Óc Eo và vương quốc Phù Nam cổ đại'),
('Kiến trúc - Nghệ thuật', 'Các công trình nhà cổ, đình làng, chùa cổ có giá trị kiến trúc và điêu khắc đặc sắc'),
('Sinh thái - Danh thắng', 'Các vườn quốc gia, khu bảo tồn sinh thái rừng tràm và cảnh quan thiên nhiên đặc trưng Đồng Tháp Mười'),
('Làng nghề - Văn hóa truyền thống', 'Các làng nghề truyền thống trăm tuổi, di sản văn hóa phi vật thể và điểm du lịch văn hóa cộng đồng')
ON CONFLICT DO NOTHING;

-- 2. ĐƠN VỊ HÀNH CHÍNH CẤP HUYỆN / THÀNH PHỐ (12 ĐƠN VỊ TỈNH ĐỒNG THÁP)
INSERT INTO huyen_tp (ten_huyen_tp, loai) OVERRIDING SYSTEM VALUE VALUES
('TP Cao Lãnh', 'thanh_pho'),
('TP Sa Đéc', 'thanh_pho'),
('TP Hồng Ngự', 'thanh_pho'),
('Huyện Cao Lãnh', 'huyen'),
('Huyện Tháp Mười', 'huyen'),
('Huyện Tam Nông', 'huyen'),
('Huyện Lấp Vò', 'huyen'),
('Huyện Lai Vung', 'huyen'),
('Huyện Châu Thành', 'huyen'),
('Huyện Thanh Bình', 'huyen'),
('Huyện Tân Hồng', 'huyen'),
('Huyện Hồng Ngự', 'huyen')
ON CONFLICT DO NOTHING;

-- 3. DỮ LIỆU 20 DI TÍCH ĐỒNG THÁP
INSERT INTO di_tich (
    id, id_danh_muc, id_huyen_tp, ten_di_tich, ten_khac, cap_xep_hang, dia_chi,
    geom, lich_su, thoi_gian_mo_cua, gia_ve, luu_y_tham_quan, trang_thai, luot_xem, luot_quet_qr
) OVERRIDING SYSTEM VALUE VALUES
(
    1, 1, 1,
    'Khu di tích Nguyễn Sinh Sắc',
    'Khu di tích Mộ Cụ Phó bảng Nguyễn Sinh Sắc',
    'Quốc gia đặc biệt',
    'Số 137 (123/1 cũ) đường Phạm Hữu Lầu, Phường 4, Thành phố Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.631812, 10.447502), 4326),
    'Khu di tích Nguyễn Sinh Sắc tại Phường 4, thành phố Cao Lãnh là quần thể kiến trúc lịch sử - văn hóa tưởng niệm Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), nhà nho yêu nước thương dân và là thân sinh của Chủ tịch Hồ Chí Minh. Trong những năm cuối đời (1927–1929), Cụ dừng chân tại làng Hòa An (Cao Lãnh) hành nghề bốc thuốc Nam trị bệnh cứu người và gieo mầm tư tưởng yêu nước cho thanh niên địa phương. Khi Cụ qua đời vào đêm 26 rạng sáng 27 tháng 10 năm Kỷ Tỵ (1929), nhân dân Hòa An đã quyên góp xây mộ và bảo vệ phần mộ suốt hai cuộc kháng chiến. Công trình trùng tu khởi công ngày 22/08/1975 và khánh thành ngày 13/02/1977 trên tổng diện tích hơn 9 ha, chia thành 4 phân khu: Khu lăng mộ với mái vòm cánh sen trắng cách điệu hình bàn tay xòe úp xuống cao 14,95m nâng đỡ 9 đầu rồng tượng trưng cho nhân dân vùng Đồng bằng sông Cửu Long che chở người chí sĩ; Đền thờ và Nhà trưng bày cuộc đời Cụ Phó bảng; Mô hình Nhà sàn và Ao sen Bác Hồ tỷ lệ 1:1; cùng Không gian văn hóa Làng Hòa An xưa tái hiện sinh động nhà truyền thống, rạch Cái Tôm và đời sống cư dân đầu thế kỷ XX. Ngày 11/09/2025, Thủ tướng Chính phủ đã ký Quyết định số 1959/QĐ-TTg xếp hạng Khu di tích là Di tích Quốc gia đặc biệt.',
    '07:00 - 17:00 hàng ngày (Mở cửa xuyên suốt các ngày Lễ, Tết)', 0,
    'Miễn phí vé vào cổng. Du khách vui lòng mặc trang phục lịch sự, giữ trật tự và thành kính khi dâng hương tại khu lăng mộ Cụ Phó bảng. Lễ giỗ Cụ Phó bảng Nguyễn Sinh Sắc được tổ chức trang trọng hàng năm từ ngày 25 đến 27 tháng 10 Âm lịch.',
    'published', 4620, 1245
),
(
    2, 2, 5,
    'Khu di tích khảo cổ Gò Tháp',
    'Khu di tích Quốc gia đặc biệt Gò Tháp (Gò Tháp Mười)',
    'Quốc gia đặc biệt',
    'Ấp 1 và Ấp 4, Xã Tân Kiều và Xã Mỹ Hòa, Huyện Tháp Mười, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.828127, 10.603984), 4326),
    'Khu di tích Gò Tháp nằm trên địa bàn hai xã Tân Kiều và Mỹ Hòa, huyện Tháp Mười, có diện tích quy hoạch bảo tồn hơn 300 ha trên một giồng cát cổ cao hơn mặt ruộng xung quanh từ 3,8m đến 5m giữa vùng rốn lũ Đồng Tháp Mười. Đây là quần thể di sản kép hiếm có hội tụ cả ba tầng giá trị: Khảo cổ học văn hóa Óc Eo, Lịch sử kháng chiến và Tín ngưỡng dân gian. Các cuộc khai quật khảo cổ từ cuối thế kỷ XIX đến nay đã phát lộ nền kiến trúc gạch đền Ấn Độ giáo tại Gò Tháp Mười, Gò Minh Sư, Gò Bà Chúa Xứ, Gò Tháp Linh Miếu cùng hàng trăm lá vàng chạm khắc hình thần Vishnu, bánh xe Pháp luân và bộ sưu tập tượng Phật gỗ Bình Hòa có niên đại thế kỷ I – VII sau Công nguyên (được công nhận Bảo vật Quốc gia). Giữa thế kỷ XIX (1864–1866), Thiên hộ Võ Duy Dương và Đốc binh Nguyễn Tấn Kiều đã chọn địa thế hiểm yếu của Gò Tháp làm đại bản doanh nghĩa quân chống thực dân Pháp. Trong kháng chiến 9 năm, nơi đây tiếp tục là căn cứ của Xứ ủy Nam Bộ và Ủy ban Kháng chiến Hành chính Nam Bộ, nơi ngôi tháp cổ Mười Tầng từng sừng sững như biểu tượng bất khuất của vùng Đồng Tháp Mười.',
    '07:00 - 17:00 hàng ngày', 0,
    'Miễn phí vé tham quan. Hàng năm tại Gò Tháp diễn ra hai kỳ lễ hội cấp tỉnh lớn nhất Đồng Tháp: Lễ hội Vía Bà Chúa Xứ Gò Tháp (14–16/3 Âm lịch) và Lễ giỗ Thiên hộ Võ Duy Dương - Đốc binh Nguyễn Tấn Kiều (14–16/11 Âm lịch).',
    'published', 4740, 1290
),
(
    3, 1, 4,
    'Khu di tích Xẻo Quýt',
    'Căn cứ Tỉnh ủy Kiến Phong (Khu căn cứ cách mạng Xẻo Quýt)',
    'Quốc gia',
    'Ấp 4, Xã Mỹ Hiệp và Xã Mỹ Long (Tuyến ĐT 850), Huyện Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.80354, 10.398944), 4326),
    'Khu di tích lịch sử cách mạng Xẻo Quýt tọa lạc tại hai xã Mỹ Hiệp và Mỹ Long, huyện Cao Lãnh, có tổng diện tích khoảng 50 ha, trong đó có 20 ha rừng tràm nguyên sinh hàng chục năm tuổi. Từ năm 1960 đến năm 1975, trước sự đánh phá ác liệt của máy bay trực thăng, xe lội nước M113 và pháo binh địch, Tỉnh ủy Kiến Phong (tiền thân của tỉnh Đồng Tháp ngày nay) đã chọn vùng đầm lầy hoang vu đầy lau sậy và kênh rạch chằng chịt tại Xẻo Quýt để xây dựng cơ quan đầu não lãnh đạo nhân dân kháng chiến chống Mỹ cứu nước. Ngay dưới tán rừng tràm ngập nước, các cán bộ chiến sĩ đã đào đắp và ngụy trang khéo léo hệ thống công sự chiến đấu hình chữ L, chữ Z, hầm tránh bom chữ A, hầm bí mật cá nhân, lán trại hội họp, nhà in truyền đơn và đài thông tin vô tuyến. Ngày nay, toàn bộ di tích gốc được phục chế nguyên trạng kết hợp với hệ sinh thái đất ngập nước hơn 170 loài thực vật và 200 loài động vật hoang dã, mang đến cho du khách trải nghiệm ngồi xuồng ba lá cùng các cô du kích áo bà ba khăn rằn len lỏi dưới vòm tràm xanh mát.',
    '07:30 - 17:00 hàng ngày', 20000,
    'Vé vào cổng: 20.000 VNĐ/người lớn (10.000 VNĐ/trẻ em); dịch vụ bơi xuồng ba lá xuyên rừng tràm mùa nước nổi khoảng 20.000 - 30.000 VNĐ/khách. Khuyến khích mang giày đế bệt và kem chống muỗi khi đi bộ dưới tán rừng tràm.',
    'published', 4860, 1335
),
(
    4, 3, 2,
    'Nhà cổ Huỳnh Thủy Lê',
    'Nhà cổ Người Tình (La Maison de Huỳnh Thủy Lê / L''Amant)',
    'Quốc gia',
    'Số 255A đường Nguyễn Huệ, Phường 2, Thành phố Sa Đéc, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.768298, 10.293918), 4326),
    'Nhà cổ Huỳnh Thủy Lê tọa lạc tại số 255A đường Nguyễn Huệ, ven bờ sông Sa Đéc, là kiệt tác giao thoa kiến trúc Đông – Tây tiêu biểu bậc nhất vùng Nam Bộ. Ngôi nhà ban đầu do ông Huỳnh Cẩm Thuận — một thương gia người Hoa giàu có chuyên buôn bán lúa gạo từ Phúc Kiến sang lập nghiệp tại Sa Đéc — xây dựng vào năm 1895 bằng gỗ quý theo kiểu nhà truyền thống ba gian hai chái rộng 258 m² với mái ngói âm dương. Đến năm 1917, gia chủ cho trùng tu lớn, ốp gạch đặc bao quanh khung gỗ và thiết kế toàn bộ mặt tiền theo phong cách biệt thự Phục Hưng Pháp thế kỷ XVII với vòm cửa cong La Mã, phù điêu hoa văn đắp nổi và gạch bông nhập khẩu từ Pháp. Bên trong nội thất lại mang đậm triết lý phong thủy Á Đông: nền nhà lát hơi trũng ở tâm điểm tạo thế ''tụ tài'', gian giữa đặt bàn thờ Quan Công trang nghiêm cùng hệ thống bao lam, hoành phi, liễn đối chạm lộng tứ linh – tứ quý thếp vàng lộng lẫy. Ngôi nhà gắn liền với mối tình vượt biên giới năm 1929 giữa công tử Huỳnh Thủy Lê (con trai út ông Huỳnh Cẩm Thuận) và nữ văn sĩ Pháp Marguerite Duras — nguyên mẫu tạo nên tiểu thuyết đoạt giải Goncourt ''L''Amant'' (Người Tình, 1984) và bộ phim điện ảnh cùng tên của đạo diễn Jean-Jacques Annaud.',
    '07:00 - 17:30 hàng ngày', 30000,
    'Giá vé tham quan: 30.000 VNĐ/khách (đã bao gồm thuyết minh viên tiếng Việt, tiếng Anh hoặc tiếng Pháp và trà sen/bánh phồng tôm Sa Đéc). Không chạm tay vào các bao lam gỗ sơn son thếp vàng cổ.',
    'published', 4980, 1380
),
(
    5, 3, 2,
    'Chùa Kiến An Cung',
    'Chùa Ông Quách (Kiến An Cung Hội quán Phúc Kiến)',
    'Quốc gia',
    'Số 39 đường Phan Bội Châu, Khóm 1, Phường 1 (khu trung tâm Phường 2), Thành phố Sa Đéc, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.767124, 10.294591), 4326),
    'Chùa Kiến An Cung (dân gian thường gọi là Chùa Ông Quách) tọa lạc tại trung tâm thành phố Sa Đéc, nhìn thẳng ra con rạch Cái Sơn cổ kính. Công trình do cộng đồng người Hoa bang Phúc Kiến định cư tại Sa Đéc góp công sức và mời những nghệ nhân bậc thầy từ quê hương Phúc Kiến sang khởi công xây dựng vào năm Giáp Tý (1924), hoàn thành vào mùa thu năm Đinh Mão (1927) để thờ Uy Linh Công Quách Vương (Bảo Sanh Đại Đế / Quảng Trạch Tôn Vương) cùng Thanh Thủy Tổ Sư và Bảo Sanh Đại Đế. Toàn bộ khuôn viên chùa rộng gần 1.000 m², thiết kế chuẩn mực theo mặt bằng chữ ''Công'' (工) gồm ba gian: Đông lang, Tây lang và khu chánh điện đồ sộ ở giữa với giếng trời (thiên tỉnh) đón ánh sáng tự nhiên. Điểm độc đáo nhất trong kiến trúc Kiến An Cung là mái ngói lợp ba lớp uốn lượn như sóng nước, các đầu đao vút cong hình rồng phượng được tạo tác hoàn toàn bằng nghệ thuật cắt ghép mảnh sành sứ nhiều màu tinh xảo, và hệ thống kèo cột hoàn toàn liên kết bằng mộng gỗ không dùng một chiếc đinh sắt nào. Ngày 27/04/1990, Chùa Kiến An Cung vinh dự được Bộ Văn hóa - Thông tin công nhận là Di tích lịch sử - văn hóa cấp Quốc gia.',
    '06:30 - 18:00 hàng ngày', 0,
    'Miễn phí vé vào cửa. Chùa nằm đối diện rạch Cái Sơn và chỉ cách Nhà cổ Huỳnh Thủy Lê khoảng 200m đi bộ. Hai kỳ lễ tế lớn nhất trong năm diễn ra vào ngày 22/2 và 22/8 Âm lịch.',
    'published', 5100, 1425
),
(
    6, 4, 6,
    'Vườn quốc gia Tràm Chim',
    'Khu Ramsar thứ 2.000 của thế giới và thứ 4 của Việt Nam',
    'Quốc gia',
    'Khóm 4, Thị trấn Tràm Chim (và 5 xã Phú Đức, Phú Hiệp, Phú Thành B, Phú Thọ, Tân Công Sính), Huyện Tam Nông, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.536173, 10.727185), 4326),
    'Vườn quốc gia Tràm Chim tọa lạc tại huyện Tam Nông, tỉnh Đồng Tháp, có tổng diện tích tự nhiên 7.313 ha nằm trọn trong vùng trũng ngập nước nội địa Đồng Tháp Mười. Tiền thân là Công trường Nông – Lâm – Ngư Tràm Chim (1985) và Khu bảo tồn thiên nhiên cấp tỉnh (1994), đến ngày 29/12/1998, Thủ tướng Chính phủ ký Quyết định số 253/1998/QĐ-TTg nâng cấp nơi đây thành Vườn quốc gia Tràm Chim. Đặc biệt, ngày 02/02/2012, Ban Thư ký Công ước Ramsar (Thụy Sĩ) đã chính thức công nhận Tràm Chim là Khu Ramsar tầm quan trọng quốc tế thứ 2.000 của thế giới và thứ 4 của Việt Nam. Tràm Chim được ví như ''Đồng Tháp Mười thu nhỏ'' bởi lưu giữ nguyên vẹn hệ sinh thái đất ngập nước đặc hữu với rừng tràm thuần loại, đồng cỏ năng kim, lúa ma (lúa trời), sen súng và thảm hoa Hoàng đầu ấn. Đây là ngôi nhà chung của hơn 130 loài thực vật bậc cao, 130 loài cá nước ngọt và hơn 231 loài chim nước (chiếm 1/4 tổng số loài chim toàn Việt Nam), trong đó nổi tiếng nhất là Sếu đầu đỏ (Grus antigone sharpii) — loài chim quý hiếm nằm trong Sách Đỏ thế giới IUCN.',
    '06:00 - 17:00 hàng ngày', 60000,
    'Vé tham quan cơ bản khoảng 20.000 - 60.000 VNĐ/khách; dịch vụ tàu kéo/vỏ lãi tham quan tuyến C4 hoặc A3 tính theo chuyến (500.000 - 800.000 VNĐ/đoàn). Thời điểm vàng ngắm chim mùa nước nổi là tháng 9–12 dương lịch và mùa hoa Hoàng đầu ấn nở vàng rực vào tháng 1–3 dương lịch.',
    'published', 5220, 1470
),
(
    7, 4, 4,
    'Khu du lịch sinh thái Gáo Giồng',
    'Ốc đảo xanh Gáo Giồng (Sân chim Gáo Giồng)',
    'Điểm du lịch/Làng nghề',
    'Ấp 6, Xã Gáo Giồng, Huyện Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.611757, 10.588263), 4326),
    'Khu du lịch sinh thái Gáo Giồng tọa lạc tại Ấp 6, xã Gáo Giồng, huyện Cao Lãnh, cách trung tâm thành phố Cao Lãnh khoảng 17 km về hướng Đông Bắc. Được hình thành từ công trình khai hoang trồng tràm chắn sóng, cải tạo đất phèn sau năm 1985 và chính thức mở cửa đón khách du lịch sinh thái từ tháng 03/2003, rừng tràm Gáo Giồng có tổng diện tích khoảng 1.700 ha (gồm 4 phân khu chức năng với hơn 70 km kênh đê bao khép kín). Tên gọi ''Gáo Giồng'' bắt nguồn từ cây gáo cổ thụ mọc trên giồng đất cao từng là điểm dừng chân và trạm giao liên cách mạng thời kháng chiến. Giữa lòng rừng tràm là khu bảo tồn Sân chim tự nhiên rộng 36 ha — nơi cư trú và sinh sản quanh năm của hàng chục ngàn cá thể thuộc hơn 15 loài chim nước như cò trắng, trích mồng đỏ (biểu tượng của Gáo Giồng), điên điển, cồng cộc, diệc xám và vạc. Từ đỉnh đài quan sát cao 18m hoặc trên chiếc xuồng ba lá lướt nhẹ qua những con rạch phủ đầy bèo tai tượng, du khách có thể chiêm ngưỡng trọn vẹn bức tranh thiên nhiên hoang sơ của ''ốc đảo xanh'' vùng Đồng Tháp Mười.',
    '07:30 - 17:00 hàng ngày', 20000,
    'Vé vào cổng: 20.000 VNĐ/người; dịch vụ bơi xuồng ba lá vào sân chim 15.000 - 20.000 VNĐ/khách. Đừng bỏ lỡ trải nghiệm leo lên Đài quan sát cao 18m ngắm toàn cảnh rừng tràm và thưởng thức cá lóc nướng trui cuốn lá sen non.',
    'published', 5340, 1515
),
(
    8, 5, 2,
    'Làng hoa Sa Đéc',
    'Làng hoa kiểng Tân Quy Đông (Thủ phủ Hoa kiểng Sa Đéc)',
    'Điểm du lịch/Làng nghề',
    'Đường Hoa Sa Đéc, Khóm Tân Hiệp, Phường Tân Quy Đông (và Xã Tân Khánh Đông), Thành phố Sa Đéc, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.749722, 10.315397), 4326),
    'Làng hoa Sa Đéc tọa lạc bên bờ nam sông Tiền thuộc phường Tân Quy Đông và xã Tân Khánh Đông, thành phố Sa Đéc, được mệnh danh là thủ phủ hoa kiểng lớn nhất vùng Đồng bằng sông Cửu Long. Khởi nguồn từ đầu thế kỷ XX khi một số hộ nông dân làng Tân Quy Đông bắt đầu trồng hoa trang trí dịp Tết, nhờ thổ nhưỡng phù sa màu mỡ kết hợp nguồn nước ngọt dồi dào từ sông Tiền và sông Sa Đéc, làng nghề đã phát triển vượt bậc lên quy mô hơn 950 ha với trên 4.000 hộ sản xuất và hơn 2.000 chủng loại hoa, cây cảnh, bonsai cổ thụ (nổi tiếng với cúc mâm xôi, hồng Sa Đéc, vạn thọ, dạ yến thảo, mai vàng, tùng vạn niên). Nét độc đáo có một không hai của Làng hoa Sa Đéc là kỹ thuật trồng hoa trên giàn tre cao phía trên mặt ruộng ngập nước, tạo nên cảnh tượng người nông dân chèo xuồng hoặc lội nước chăm sóc những luống hoa rực rỡ sắc màu. Nghề trồng hoa kiểng Sa Đéc đã được Bộ Văn hóa, Thể thao và Du lịch ghi danh vào Danh mục Di sản văn hóa phi vật thể quốc gia, khẳng định giá trị tri thức dân gian trăm năm của xứ sở Hoa Hồng.',
    '06:00 - 18:00 hàng ngày', 0,
    'Đường làng hoa mở cửa tự do miễn phí; một số điểm tham quan tư nhân (Đài ngắm hoa, Cánh đồng hoa hồng, Happy Land Hùng Thy) thu vé 20.000 - 50.000 VNĐ/khách. Đẹp và rực rỡ nhất từ tháng 11 đến tháng Chạp Âm lịch (dịp Festival Hoa - Kiểng Sa Đéc).',
    'published', 5460, 1560
),
(
    9, 5, 7,
    'Làng nghề dệt chiếu Định Yên',
    'Làng chiếu Định Yên (Chợ chiếu đêm / Chợ ma Định Yên)',
    'Quốc gia',
    'Ấp An Bình và Ấp An Lợi, Xã Định Yên và Xã Định An, Huyện Lấp Vò, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.542441, 10.309325), 4326),
    'Làng nghề dệt chiếu Định Yên nằm ven bờ sông Hậu thuộc hai xã Định Yên và Định An, huyện Lấp Vò, tỉnh Đồng Tháp, là cái nôi của nghề dệt chiếu lát truyền thống hơn 100 năm tuổi ở miền Tây Nam Bộ. Nghề dệt chiếu tại đây do những lưu dân từ vùng ven biển Bắc Bộ (Thái Bình, Nam Định) di cư vào khai khẩn đất phù sa sông Hậu mang theo từ cuối thế kỷ XIX, tận dụng nguồn cây lác (cói) dồi dào tại địa phương để tạo ra các sản phẩm chiếu bông, chiếu trắng, chiếu vảy ốc, chiếu cưới hỏi bền đẹp nổi tiếng khắp lục tỉnh. Nét văn hóa độc đáo nhất làm nên huyền thoại Định Yên là phiên ''Chợ chiếu đêm'' (còn gọi là Chợ chiếu ma) họp trước sân Đình thần Định Yên từ khoảng 2 giờ đến 4 giờ sáng dưới ánh đèn dầu leo lét: người mua kẻ bán tấp nập giao thương để kịp con nước ghe thương hồ tỏa đi khắp đồng bằng mà vẫn giữ trọn thời gian ban ngày cho việc phơi lát, dệt chiếu. Ngày 05/08/2013, Nghề dệt chiếu Định Yên đã được Bộ Văn hóa, Thể thao và Du lịch công nhận là Di sản văn hóa phi vật thể Quốc gia.',
    '07:00 - 17:00 hàng ngày (Trình diễn tái hiện Chợ chiếu đêm vào cuối tuần và dịp lễ hội)', 0,
    'Tham quan hoàn toàn miễn phí. Du khách có thể ghé thăm Đình thần Định Yên (Di tích kiến trúc nghệ thuật cấp Quốc gia), xem nghệ nhân nhuộm lát phơi dọc đường làng và trực tiếp dệt chiếu thủ công.',
    'published', 5580, 1605
),
(
    10, 1, 10,
    'Đền thờ Thượng tướng Trần Văn Năng',
    'Dinh Ông Đốc Vàng (Đền thờ Thượng tướng Quận công Trần Văn Năng)',
    'Quốc gia',
    'Ấp Nam, Xã Tân Thạnh (Vàm rạch Đốc Vàng Thượng - Quốc lộ 30), Huyện Thanh Bình, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.452392, 10.57062), 4326),
    'Đền thờ Thượng tướng Quận công Trần Văn Năng (nhân dân địa phương tôn kính gọi là Dinh Ông Đốc Vàng) tọa lạc bên vàm rạch Đốc Vàng Thượng giao với dòng sông Tiền tại Ấp Nam, xã Tân Thạnh, huyện Thanh Bình. Thượng tướng Trần Văn Năng (1763–1838) quê ở huyện Vĩnh Xương, tỉnh Khánh Hòa, là vị danh tướng kiệt xuất đầu triều Nguyễn dưới thời vua Gia Long và Minh Mạng. Ông từng giữ trọng trách Phó Tổng trấn Gia Định Thành, trực tiếp chỉ huy hộ dân đào kênh Vĩnh Tế – kênh Thoại Hà, mở mang giao thương vùng biên cương Tây Nam và lập chiến công hiển hách đánh tan quân Xiêm xâm lược trên sông Tiền (chiến thắng Vàm Nao - Cổ Hỗ năm 1833–1834). Khi hành quân ngang qua ngã ba rạch Đốc Vàng Thượng (Thanh Bình) vào năm 1835, ông lâm trọng bệnh và qua đời; cảm kích công đức bảo quốc an dân của vị danh tướng, cư dân địa phương đã lập đền thờ phụng từ giữa thế kỷ XIX. Ngôi đền mang kiến trúc đình miếu cổ Nam Bộ uy nghiêm rộng hơn 12.000 m² và được xếp hạng Di tích lịch sử - văn hóa cấp Quốc gia ngày 19/08/2004.',
    '07:00 - 17:00 hàng ngày', 0,
    'Miễn phí vé tham quan. Lễ hội kỳ yên và Lễ giỗ Thượng tướng Quận công Trần Văn Năng được tổ chức trang trọng hàng năm từ ngày 14 đến 17 tháng 2 Âm lịch với nghi thức tế cổ truyền và lễ hội bánh tét dân gian.',
    'published', 5700, 1650
),
(
    11, 1, 11,
    'Căn cứ Tỉnh ủy Kiến Phong (Khu di tích lịch sử Thông Bình)',
    'Di tích lịch sử lưu niệm Đình Ngã ba Thông Bình',
    'Cấp tỉnh',
    'Ấp Phước Tiên, Xã Thông Bình, Huyện Tân Hồng, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.422561, 10.923587), 4326),
    'Khu di tích lịch sử Thông Bình (gắn liền với Di tích lịch sử lưu niệm Đình Ngã ba Thông Bình và địa bàn căn cứ cách mạng vùng biên giới Tỉnh ủy Kiến Phong) tọa lạc tại ấp Phước Tiên, xã biên giới Thông Bình, huyện Tân Hồng, tỉnh Đồng Tháp. Dưới triều Nguyễn, khu vực ngã ba sông Sở Hạ – Thông Bình là vị trí chiến lược hiểm yếu nên triều đình đã cho thiết lập Bảo Thông Bình làm đồn thủ sở trấn giữ biên cương Tây Nam, gắn liền với công lao khai hoang mở cõi và bảo vệ bờ cõi của danh tướng Thoại Ngọc Hầu (Nguyễn Văn Thoại). Ngôi đình được cư dân địa phương dựng lên để thờ Thần Thành Hoàng Bổn Cảnh và các bậc tiền hiền, danh tướng có công giữ đất. Trong hai cuộc kháng chiến chống thực dân Pháp, đế quốc Mỹ và chiến tranh bảo vệ biên giới Tây Nam, khu vực ngã ba Thông Bình trở thành hành lang giao liên, bàn đạp hậu cần và căn cứ bám trụ kiên cường của quân dân tỉnh Kiến Phong (nay là Đồng Tháp). Dù trải qua bom đạn chiến tranh tàn phá ác liệt, công trình vẫn được phục dựng khang trang theo kiến trúc đình làng truyền thống Nam Bộ dưới bóng cây cổ thụ ven sông, được UBND tỉnh Đồng Tháp xếp hạng Di tích lịch sử cấp tỉnh năm 2016.',
    '07:00 - 17:00 hàng ngày', 0,
    'Di tích nằm tại khu vực ngã ba sông Sở Hạ vùng biên giới Việt Nam - Campuchia; du khách lưu ý mang theo giấy tờ tùy thân và giữ trang phục lịch sự khi dâng hương.',
    'published', 5820, 1695
),
(
    12, 1, 1,
    'Bảo tàng Tỉnh Đồng Tháp',
    'Cụm di tích Dinh Cò Tây & Nhà trưng bày Văn hóa Óc Eo Đồng Tháp',
    'Cấp tỉnh',
    '226 Nguyễn Thái Học, Phường 4, TP. Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.632563, 10.453), 4326),
    'Bảo tàng Tỉnh Đồng Tháp tọa lạc tại số 226 đường Nguyễn Thái Học, Phường 4, thành phố Cao Lãnh, nằm bên bờ sông Cao Lãnh thơ mộng với tổng diện tích khuôn viên khoảng 11.000 m². Khu đất này nguyên là cụm kiến trúc dinh thự cổ thời Pháp thuộc xây dựng từ thập niên 1920 (gồm Quận đường Cao Lãnh, Dinh Cò Tây, nhà giam và phòng tra tấn dưới thời chính quyền tỉnh Kiến Phong cũ) — nơi ghi dấu nhiều cuộc đấu tranh kiên cường của các chiến sĩ cách mạng. Ngày 15/05/1978, Bảo tàng tỉnh Đồng Tháp chính thức được thành lập; khối nhà trưng bày trung tâm hiện đại kết hợp hài hòa kiến trúc truyền thống được khánh thành ngày 29/12/2000 và khuôn viên được xếp hạng Di tích lịch sử - văn hóa cấp tỉnh ngày 05/09/2008. Hiện nay, Bảo tàng lưu giữ hơn 30.000 tài liệu, hiện vật quý giá, nổi bật hàng đầu khu vực Đồng bằng sông Cửu Long với 3 Bảo vật Quốc gia thuộc nền Văn hóa Óc Eo (tượng thần Vishnu, tượng nữ thần Lakshmi), bộ sưu tập vàng lá Gò Tháp lớn nhất Việt Nam, cùng không gian trưng bày chuyên đề Nhạc sư Nguyễn Vĩnh Bảo và lịch sử kháng chiến Đồng Tháp.',
    '07:30 - 17:00 (Thứ Ba đến Chủ Nhật hàng tuần)', 0,
    'Miễn phí vé tham quan; có hỗ trợ thuyết minh đoàn và hệ thống quét mã QR thông minh ''AI Sen Hồng'' tra cứu Bảo vật Quốc gia.',
    'published', 5940, 1740
),
(
    13, 1, 1,
    'Tượng đài Tập kết ra Bắc năm 1954',
    'Di tích lịch sử Quốc gia Địa điểm Tập kết ra Bắc năm 1954 tại Cao Lãnh',
    'Quốc gia',
    'Bến Bắc Cao Lãnh (Đường Phạm Hữu Lầu), Khóm 6, Phường 6, TP. Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.642291, 10.416532), 4326),
    'Di tích lịch sử Quốc gia Địa điểm Tập kết ra Bắc năm 1954 và Tượng đài Tập kết tọa lạc bên bờ sông Tiền, cách bến phà Cao Lãnh cũ khoảng 100m về phía thượng lưu, thuộc Khóm 6, Phường 6, thành phố Cao Lãnh. Theo Hiệp định Genève năm 1954, Cao Lãnh được chọn là một trong ba điểm tập kết chuyển quân lớn của Nam Bộ trong thời hạn 100 ngày (từ tháng 8 đến ngày 29/10/1954). Tại bến sông lịch sử này, Đảng bộ và nhân dân Đồng Tháp đã đón tiếp, chăm lo và tiễn đưa 13.508 cán bộ, chiến sĩ, học sinh, con em miền Nam từ 9 tỉnh Trung Nam Bộ lên những chuyến tàu của Ba Lan và Liên Xô ra miền Bắc học tập, rèn luyện, trở thành những ''hạt giống đỏ'' cho sự nghiệp thống nhất đất nước. Để khắc ghi sự kiện trọng đại ấy, tỉnh Đồng Tháp đã xây dựng Khu lưu niệm và Tượng đài Tập kết trên diện tích 12.000 m² và khánh thành vào ngày 29/10/2019. Tượng đài cao 11m do điêu khắc gia Ngô Liêm sáng tác, khắc họa hình ảnh người mẹ miền Nam hiền từ tiễn con lên đường trên đài sen cách điệu cùng bức phù điêu con tàu rẽ sóng. Ngày 24/02/2023, Bộ Văn hóa, Thể thao và Du lịch chính thức xếp hạng nơi đây là Di tích lịch sử Quốc gia.',
    'Tự do tham quan 24/7', 0,
    'Khuôn viên quảng trường công viên ven sông Tiền thoáng mát, rất đẹp khi tham quan vào buổi sáng sớm hoặc chiều hoàng hôn.',
    'published', 6060, 1785
),
(
    14, 5, 9,
    'Chùa Phước Kiển (Chùa Lá Sen)',
    'Phước Kiển Tự / Chùa Sen Vua Châu Thành',
    'Điểm du lịch/Làng nghề',
    'Ấp Tân Hòa, Xã Hòa Tân (nay thuộc Xã Tân Nhuận Đông), Huyện Châu Thành, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.816906, 10.195653), 4326),
    'Chùa Phước Kiển (dân gian quen gọi là Chùa Lá Sen hay Chùa Sen Vua) tọa lạc tại xã Hòa Tân, huyện Châu Thành, tỉnh Đồng Tháp. Ngôi cổ tự được Tổ sư Minh Hải khởi dựng từ trước năm 1847 dưới triều vua Thiệu Trị. Trong hai cuộc kháng chiến chống Pháp và chống Mỹ, chùa Phước Kiển là cơ sở cách mạng mật che chở cán bộ hoạt động tại vùng Châu Thành – Sa Đéc. Năm 1966, bom đạn chiến tranh đã đánh sập hoàn toàn ngôi chùa cổ cùng nhiều hố bom sâu quanh khuôn viên; sau năm 1975, chùa được trùng tu lại giản dị, trang nghiêm. Điều làm nên sự kỳ thú độc nhất vô nhị của chùa Phước Kiển là từ năm 1992, trong các hố bom cũ cải tạo thành ao vuông quanh chùa bỗng xuất hiện loài sen khổng lồ (Victoria amazonica / Victoria regia). Vào mùa nước nổi, lá sen vua vươn rộng từ 2m đến hơn 3m, vành lá uốn cao như chiếc nia lớn với hệ gân dày đặc ở mặt dưới, có thể nâng đỡ người nặng từ 50–80kg đứng trên mặt nước. Hoa sen vua nở về đêm và đổi màu kỳ diệu từ trắng tinh khôi sang hồng tím trong suốt 3 ngày.',
    '06:30 - 17:30 hàng ngày', 0,
    'Vào cổng miễn phí; nếu du khách muốn trải nghiệm đứng trên lá sen vua chụp ảnh (khoảng 20.000 - 30.000 VNĐ/lượt hỗ trợ đặt mâm gỗ) nên đi vào mùa mưa hoặc mùa nước nổi từ tháng 7 đến tháng 11 âm lịch khi lá sen đạt đường kính lớn nhất.',
    'published', 6180, 1830
),
(
    15, 1, 10,
    'Khu căn cứ kháng chiến Bình Thành',
    'Di tích lịch sử Quốc gia Địa điểm Vụ thảm sát Bình Thành',
    'Quốc gia',
    'Ấp Bình Hòa, Xã Bình Thành (giáp Thị trấn Thanh Bình), Huyện Thanh Bình, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.53971, 10.53784), 4326),
    'Khu căn cứ kháng chiến Bình Thành và Di tích lịch sử Quốc gia Địa điểm Vụ thảm sát Bình Thành tọa lạc bên bờ sông Tiền thuộc địa bàn xã Bình Thành – thị trấn Thanh Bình, huyện Thanh Bình, tỉnh Đồng Tháp. Trong hai cuộc kháng chiến cứu nước, Bình Thành là vùng căn cứ cách mạng kiên trung, nơi nhân dân một lòng nuôi giấu cán bộ và xây dựng lực lượng vũ trang ven sông Tiền. Ngay sau khi Hiệp định Genève được ký kết và lực lượng kháng chiến tập kết ra Bắc, vào tháng 11 năm 1954 (đỉnh điểm là các ngày 11 và 12/11/1954), tiểu đoàn bảo an của đối phương đã mở cuộc càn quét, bắt bớ hàng trăm đồng bào kháng chiến và người dân vô tội tại Bình Thành, tra khảo dã man và sát hại 34 người, vùi lấp tại các hố chôn tập thể ven sông. Sự kiện gây chấn động dư luận, buộc Ủy hội Quốc tế giám sát đình chiến phải trực tiếp điều tra và kết luận hành vi vi phạm Hiệp định Genève. Để tưởng nhớ đồng bào đã ngã xuống và giáo dục truyền thống bất khuất, Khu đài tưởng niệm và nhà bia Bình Thành đã được xây dựng trang nghiêm và được Bộ Văn hóa - Thông tin xếp hạng Di tích lịch sử cấp Quốc gia ngày 19/01/2004.',
    '07:00 - 17:00 hàng ngày', 0,
    'Điểm di tích lịch sử tưởng niệm trang nghiêm; các đoàn học sinh, sinh viên và tổ chức về nguồn có thể liên hệ trước để tổ chức lễ dâng hương.',
    'published', 6300, 1875
),
(
    16, 3, 9,
    'Đình Tân Phú Trung',
    'Đình thần Tân Phú Trung',
    'Quốc gia',
    'Quốc lộ 80, Ấp Tân Phú, Xã Tân Phú Trung, Huyện Châu Thành, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.748443, 10.254852), 4326),
    'Đình Tân Phú Trung tọa lạc ven Quốc lộ 80 bên dòng sông Ngã Cái, thuộc ấp Tân Phú, xã Tân Phú Trung, huyện Châu Thành, tỉnh Đồng Tháp. Ngôi đình được khởi dựng vào khoảng năm 1853 gắn liền với công cuộc khai hoang lập ấp của cư dân vùng Sa Đéc – Châu Thành xưa, và vinh dự được vua Tự Đức ban sắc phong Thần Thành Hoàng Bổn Cảnh vào năm 1854. Trải qua đợt trùng tu lớn đầu thế kỷ XX, Đình Tân Phú Trung trở thành một kiệt tác kiến trúc đình làng Nam Bộ trên khuôn viên rộng khoảng 3.000 m². Tổng thể công trình mang bố cục ''trùng thiềm điệp ốc'' và ''thượng lầu hạ hiên'' gồm ba gian nhà nối tiếp kiểu sắp đọi. Mái đình lợp ngói âm dương cổ kính, trên bờ nóc trang trí quần thể tiểu tượng gốm sứ men màu tinh xảo như Lưỡng long tranh châu, Cá hóa long, Bát tiên và Lân mẫu tử. Bên trong chánh điện, hệ thống cột gỗ lim, gỗ căm xe cùng hàng chục bức hoành phi, câu đối, bao lam chạm lộng đề tài Tứ linh, Tứ quý được sơn son thếp vàng rực rỡ. Ngày 06/06/2012, Bộ Văn hóa, Thể thao và Du lịch đã xếp hạng Đình Tân Phú Trung là Di tích kiến trúc nghệ thuật cấp Quốc gia.',
    '07:00 - 17:00 hàng ngày', 0,
    'Lễ hội Kỳ Yên truyền thống diễn ra vào trung tuần tháng 4 hoặc tháng 5 âm lịch hàng năm với nghi thức tế thần và hát bội cổ truyền đặc sắc.',
    'published', 6420, 1920
),
(
    17, 5, 4,
    'Chùa Hưng Thiền',
    'Hưng Thiền Cổ Tự / Đạo tràng Tịnh Độ Mỹ Hội',
    'Điểm du lịch/Làng nghề',
    'Quốc lộ 30 (gần Cầu Long Ẩn), Ấp Mỹ Thới, Xã Mỹ Hội, Huyện Cao Lãnh, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7205, 10.4102), 4326),
    'Chùa Hưng Thiền tọa lạc bên trục Quốc lộ 30 thuộc xã Mỹ Hội, huyện Cao Lãnh, tỉnh Đồng Tháp. Với lịch sử hình thành từ thế kỷ XVIII (khoảng hơn 250 năm tuổi), Hưng Thiền Cổ Tự là một trong những ngôi chùa lâu đời và có quy mô tu học lớn nhất tại vùng đất Sen Hồng. Trải qua nhiều biến cố lịch sử và các đợt đại trùng tu dưới thời Thượng tọa Thích Phước Đức và Ni sư Thích Nữ Như Lan, ngôi chùa ngày nay sở hữu khuôn viên rộng lớn, thanh tịnh giữa vùng quê trù phú. Kiến trúc Chánh điện uy nghiêm mang đậm phong cách Phật giáo truyền thống Nam Bộ với hệ mái đao uốn cong chạm khắc hoa văn rồng phượng. Điểm nhấn tâm linh đặc biệt bên trong Chánh điện là tôn tượng Đức Phật A Di Đà khổng lồ được đúc bằng đồng nguyên khối với thần thái từ bi, uy nghi, xung quanh tường là hệ thống phù điêu chạm nổi tái hiện sinh động cuộc đời Đức Phật Thích Ca Mâu Ni. Hiện nay, chùa Hưng Thiền là đạo tràng tu học thường xuyên của hơn 300 chư Ni và hàng ngàn Phật tử, đồng thời nổi tiếng với phòng thuốc Nam từ thiện và các hoạt động an sinh xã hội khắp miền Tây.',
    '06:00 - 18:00 hàng ngày', 0,
    'Chùa là nơi tu học tịnh độ của hàng trăm chư Ni, du khách cần ăn mặc kín đáo, đi nhẹ nói khẽ; đại lễ lớn nhất trong năm là Lễ vía Đức Phật A Di Đà (17/11 âm lịch).',
    'published', 6540, 1965
),
(
    18, 3, 12,
    'Đình Long Thuận',
    'Đình thần Cù lao Long Thuận',
    'Quốc gia',
    'Ấp Long Thới B, Xã cù lao Long Thuận (nay là Xã Long Phú Thuận), Huyện Hồng Ngự, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.309619, 10.755962), 4326),
    'Đình Long Thuận tọa lạc trên dải đất cù lao Long Thuận trù phú nằm giữa dòng sông Tiền, thuộc huyện Hồng Ngự, tỉnh Đồng Tháp. Ngôi đình được các bậc tiền hiền khai hoang cù lao khởi dựng lần đầu vào năm 1876 và được đại trùng tu kiên cố bằng gỗ quý vào năm 1930. Năm 1936, đình vinh dự được vua Bảo Đại ban sắc phong Thần Thành Hoàng Bổn Cảnh. Trong thời kỳ kháng chiến chống thực dân Pháp, Đình Long Thuận từng là trụ sở làm việc của Ủy ban kháng chiến hành chính và là điểm hội họp của lực lượng Việt Minh trên vùng cù lao biên giới. Công trình mang đậm phong cách kiến trúc nghệ thuật đình làng Nam Bộ với kết cấu bộ khung gỗ lim vững chãi, mái ngói cổ kính gồm khu võ ca, võ quy và chánh điện trang nghiêm lưu giữ nhiều hoành phi, câu đối và lộ bộ chạm khắc tinh xảo. Khuôn viên đình còn nổi tiếng với những cổ thụ hàng trăm năm tuổi gắn liền với lịch sử mở đất cù lao. Cùng với cụm đình cổ vùng cù lao Hồng Ngự được xếp hạng di tích năm 2009, Đình Long Thuận là điểm nhấn văn hóa tâm linh đặc sắc với Lễ hội Kỳ Yên và nghệ thuật hát bội truyền thống hàng năm.',
    '07:00 - 17:00 hàng ngày', 0,
    'Thuận tiện kết hợp tham quan tuyến du lịch sinh thái Cù lao Long Thuận - Làng nghề dệt choàng Long Khánh trên dòng sông Tiền.',
    'published', 6660, 2010
),
(
    19, 3, 10,
    'Đình Phú Mỹ',
    'Đình thần Phú Mỹ - Phú Lợi (Cụm đình cổ Thanh Bình)',
    'Cấp tỉnh',
    'Tuyến Tân Thạnh - Phú Lợi, Xã Phú Lợi, Huyện Thanh Bình, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.473081, 10.614661), 4326),
    'Đình Phú Mỹ (gắn liền với không gian văn hóa đình làng cổ xã Phú Lợi và vùng phụ cận Phú Mỹ – Tân Phú thuộc huyện Thanh Bình, tỉnh Đồng Tháp) là một công trình tín ngưỡng dân gian lâu đời của cư dân vùng thượng nguồn sông Tiền và rìa phía Tây vùng Đồng Tháp Mười. Ngôi đình được các bậc tiền hiền dựng lên từ thế kỷ XIX dưới triều Nguyễn trong quá trình khai phá vùng đất ven sông Tiền để thờ phụng Thần Thành Hoàng Bổn Cảnh, Tiền hiền khai khẩn, Hậu hiền khai cơ có công lập ấp, đắp đê ngăn lũ. Kiến trúc đình mang phong cách truyền thống của đình làng Nam Bộ với mái ngói đỏ vảy cá, bờ nóc đắp nổi hình tượng lưỡng long chầu nguyệt, bên trong chính điện quy tụ hệ thống cột gỗ tròn vững chắc cùng các ban thờ Hội đồng, ban thờ Thần Nông, Tiên Sư và các bức hoành phi sơn son thếp vàng cổ kính. Trải qua thời gian, ngôi đình vẫn giữ trọn vai trò là trung tâm sinh hoạt văn hóa tâm linh của nhân dân huyện Thanh Bình với lễ hội Kỳ Yên, lễ Thượng điền, Hạ điền và nghi thức Nghinh Thần tuần du cầu cho mưa thuận gió hòa, mùa màng bội thu.',
    '07:00 - 17:00 hàng ngày', 0,
    'Tự do tham quan; dịp lễ Kỳ Yên hàng năm có nghi thức Nghinh Thần tuần du và lễ tế Tiền hiền khai khẩn rất trang trọng.',
    'published', 6780, 2055
),
(
    20, 1, 11,
    'Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung',
    'Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung',
    'Quốc gia',
    'Ấp Gò Quản Cung, Xã An Phước, Huyện Tân Hồng, Tỉnh Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.505171, 10.816775), 4326),
    'Khu di tích lịch sử Chiến thắng Giồng Thị Đam – Gò Quản Cung tọa lạc tại xã An Phước, huyện Tân Hồng, tỉnh Đồng Tháp. Nơi đây ghi dấu trận đánh lịch sử vang dội diễn ra vào ngày 26/09/1959 (nhằm ngày 24/08 năm Kỷ Hợi) giữa mùa nước nổi trên cánh đồng lầy vùng biên giới Đồng Tháp Mười. Trong trận ra quân đầu tiên ngay sau khi thành lập, chỉ với 42 cán bộ, chiến sĩ của Đại đội 274 (tiền thân của Tiểu đoàn 502 anh hùng thuộc tỉnh Kiến Phong) cùng lực lượng du kích địa phương và vũ khí thô sơ, quân ta đã vận dụng chiến thuật phục kích vận động trên đồng nước đầy mưu trí, tiêu diệt và đánh thiệt hại nặng một cánh quân chủ lực cấp trung đoàn của địch, thu hàng trăm súng đạn. Chiến thắng Giồng Thị Đam – Gò Quản Cung được lịch sử ví như ''tiếng sấm đầu mùa'' làm nức lòng nhân dân miền Nam, mở màn cho cao trào Đồng Khởi vũ trang rộng khắp vùng Đồng Tháp Mười (1959–1960). Ngày 19/01/2004, Bộ Văn hóa - Thông tin đã xếp hạng địa điểm này là Di tích lịch sử cấp Quốc gia với quần thể tượng đài chiến thắng uy nghiêm và nhà trưng bày truyền thống.',
    '07:00 - 17:00 hàng ngày', 0,
    'Khu di tích có nhà trưng bày sa bàn trận đánh, hiện vật vũ khí của Tiểu đoàn 502 và tượng đài tưởng niệm ngoài trời rộng rãi, miễn phí tham quan.',
    'published', 6900, 2100
)
ON CONFLICT (id) DO UPDATE SET
    ten_di_tich = EXCLUDED.ten_di_tich,
    ten_khac = EXCLUDED.ten_khac,
    cap_xep_hang = EXCLUDED.cap_xep_hang,
    dia_chi = EXCLUDED.dia_chi,
    geom = EXCLUDED.geom,
    lich_su = EXCLUDED.lich_su,
    thoi_gian_mo_cua = EXCLUDED.thoi_gian_mo_cua,
    gia_ve = EXCLUDED.gia_ve,
    luu_y_tham_quan = EXCLUDED.luu_y_tham_quan;

-- 4. BẢNG HÌNH ẢNH DI TÍCH (LƯU ẢNH THỰC TẾ LOCAL VÀ TƯ LIỆU)
INSERT INTO hinh_anh (id_di_tich, url, chu_thich, is_thumbnail, thu_tu) OVERRIDING SYSTEM VALUE VALUES
(1, '/images/monuments/monument_1.jpg', 'Hình ảnh thực tế Khu di tích Nguyễn Sinh Sắc', TRUE, 1),
(2, '/images/monuments/monument_2.jpg', 'Hình ảnh thực tế Khu di tích khảo cổ Gò Tháp', TRUE, 1),
(3, '/images/monuments/monument_3.jpg', 'Hình ảnh thực tế Khu di tích Xẻo Quýt', TRUE, 1),
(4, '/images/monuments/monument_4.jpg', 'Hình ảnh thực tế Nhà cổ Huỳnh Thủy Lê', TRUE, 1),
(5, '/images/monuments/monument_5.jpg', 'Hình ảnh thực tế Chùa Kiến An Cung', TRUE, 1),
(6, '/images/monuments/monument_6.jpg', 'Hình ảnh thực tế Vườn quốc gia Tràm Chim', TRUE, 1),
(7, '/images/monuments/monument_7.jpg', 'Hình ảnh thực tế Khu du lịch sinh thái Gáo Giồng', TRUE, 1),
(8, '/images/monuments/monument_8.jpg', 'Hình ảnh thực tế Làng hoa Sa Đéc', TRUE, 1),
(9, '/images/monuments/monument_9.jpg', 'Hình ảnh thực tế Làng nghề dệt chiếu Định Yên', TRUE, 1),
(10, '/images/monuments/monument_10.jpg', 'Hình ảnh thực tế Đền thờ Thượng tướng Trần Văn Năng', TRUE, 1),
(11, '/images/monuments/monument_11.jpg', 'Hình ảnh thực tế Căn cứ Tỉnh ủy Kiến Phong (Khu di tích lịch sử Thông Bình)', TRUE, 1),
(12, '/images/monuments/monument_12.jpg', 'Hình ảnh thực tế Bảo tàng Tỉnh Đồng Tháp', TRUE, 1),
(13, '/images/monuments/monument_13.jpg', 'Hình ảnh thực tế Tượng đài Tập kết ra Bắc năm 1954', TRUE, 1),
(14, '/images/monuments/monument_14.jpg', 'Hình ảnh thực tế Chùa Phước Kiển (Chùa Lá Sen)', TRUE, 1),
(15, '/images/monuments/monument_15.jpg', 'Hình ảnh thực tế Khu căn cứ kháng chiến Bình Thành', TRUE, 1),
(16, '/images/monuments/monument_16.jpg', 'Hình ảnh thực tế Đình Tân Phú Trung', TRUE, 1),
(17, '/images/monuments/monument_17.jpg', 'Hình ảnh thực tế Chùa Hưng Thiền', TRUE, 1),
(18, '/images/monuments/monument_18.jpg', 'Hình ảnh thực tế Đình Long Thuận', TRUE, 1),
(19, '/images/monuments/monument_19.jpg', 'Hình ảnh thực tế Đình Phú Mỹ', TRUE, 1),
(20, '/images/monuments/monument_20.jpg', 'Hình ảnh thực tế Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung', TRUE, 1);