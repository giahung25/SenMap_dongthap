-- ==============================================================================
-- DỰ ÁN: HỆ THỐNG BẢN ĐỒ SỐ DI TÍCH VĂN HÓA TỈNH ĐỒNG THÁP (WEB GIS)
-- TẬP LỆNH: NẠP DỮ LIỆU MẪU (SEED DATA 20 DI TÍCH ĐỒNG THÁP - SRID 4326)
-- LƯU Ý: Tọa độ sử dụng ST_SetSRID(ST_MakePoint(kinh_do, vi_do), 4326)
--        trong khung Bounding Box Đồng Tháp: Lon [105.15..105.95], Lat [10.10..10.95]
-- ==============================================================================

-- 1. DANH MỤC LOẠI HÌNH DI TÍCH
INSERT INTO danh_muc (ten_danh_muc, mo_ta) VALUES
('Lịch sử - Cách mạng', 'Các khu di tích lịch sử, căn cứ kháng chiến, đền thờ danh nhân và địa điểm sự kiện lịch sử tiêu biểu tại Đồng Tháp'),
('Khảo cổ - Văn hóa Óc Eo', 'Các di chỉ khảo cổ học thuộc nền văn hóa Óc Eo và vương quốc Phù Nam cổ đại'),
('Kiến trúc - Nghệ thuật', 'Các công trình nhà cổ, đình làng, chùa cổ có giá trị kiến trúc và điêu khắc đặc sắc'),
('Sinh thái - Danh thắng', 'Các vườn quốc gia, khu bảo tồn sinh thái rừng tràm và cảnh quan thiên nhiên đặc trưng Đồng Tháp Mười'),
('Làng nghề - Văn hóa truyền thống', 'Các làng nghề truyền thống trăm tuổi, di sản văn hóa phi vật thể và điểm du lịch văn hóa cộng đồng');

-- 2. ĐƠN VỊ HÀNH CHÍNH CẤP HUYỆN / THÀNH PHỐ (12 ĐƠN VỊ TỈNH ĐỒNG THÁP)
INSERT INTO huyen_tp (ten_huyen_tp, loai) VALUES
('TP Cao Lãnh', 'thanh_pho'),
('TP Sa Đéc', 'thanh_pho'),
('TP Hồng Ngự', 'thanh_pho'),
('Huyện Cao Lãnh', 'huyen'),
('Huyện Tháp Mười', 'huyen'),
('Huyện Tam Nông', 'huyen'),
('Huyện Lấp Vò', 'huyen'),
('Huyện Thanh Bình', 'huyen'),
('Huyện Tân Hồng', 'huyen'),
('Huyện Châu Thành', 'huyen'),
('Huyện Hồng Ngự', 'huyen'),
('Huyện Lai Vung', 'huyen');

-- 3. TÀI KHOẢN QUẢN TRỊ VIÊN MẶC ĐỊNH (Password mẫu: Admin@123 - bcrypt hash)
INSERT INTO quan_tri_vien (username, password_hash, ho_ten, role, is_active) VALUES
('admin', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Phan Trần Gia Hưng (Quản trị viên)', 'admin', TRUE),
('editor_dt', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Biên tập viên Di sản Đồng Tháp', 'editor', TRUE);

-- 4. DỮ LIỆU 20 DI TÍCH & ĐỊA ĐIỂM VĂN HÓA TIÊU BIỂU TỈNH ĐỒNG THÁP
-- Quy ước ST_MakePoint(kinh_do_longitude, vi_do_latitude)
INSERT INTO di_tich (
    id_danh_muc, id_huyen_tp, ten_di_tich, ten_khac, cap_xep_hang, dia_chi,
    geom, lich_su, thoi_gian_mo_cua, gia_ve, luu_y_tham_quan, trang_thai, luot_xem, luot_quet_qr
) VALUES
(
    1, 1,
    'Khu di tích Nguyễn Sinh Sắc',
    'Lăng Cụ Phó bảng Nguyễn Sinh Sắc',
    'Quốc gia',
    '123/1 Phạm Hữu Lầu, Phường 4, TP Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.6295, 10.4494), 4326),
    'Khu di tích tưởng niệm Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), thân sinh Chủ tịch Hồ Chí Minh. Công trình có kiến trúc mái vòm cánh sen trắng cách điệu độc đáo, khu nhà sàn Bác Hồ và không gian làng Hòa An xưa tái hiện đời sống văn hóa cư dân Cao Lãnh đầu thế kỷ XX.',
    '07:00 - 17:00 hàng ngày', 0,
    'Trang phục lịch sự, giữ trật tự khi dâng hương tại khu mộ Cụ Phó bảng.',
    'published', 4850, 1420
),
(
    2, 5,
    'Khu di tích khảo cổ Gò Tháp',
    'Di tích Quốc gia đặc biệt Gò Tháp',
    'Quốc gia đặc biệt',
    'Xã Tân Kiều và Mỹ Hòa, Huyện Tháp Mười, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.8153, 10.5936), 4326),
    'Quần thể di tích Quốc gia đặc biệt kết hợp giá trị khảo cổ văn hóa Óc Eo (thế kỷ I - VII) với căn cứ kháng chiến của Thiên hộ Võ Duy Dương, Đốc binh Nguyễn Tấn Kiều và Xứ ủy Nam Bộ trong kháng chiến chống Pháp.',
    '07:00 - 17:00 hàng ngày', 0,
    'Khuyến khích nghe thuyết minh Audio Tour tại khu trưng bày hiện vật Óc Eo và Đền thờ Thiên Hộ Dương.',
    'published', 6120, 1980
),
(
    1, 4,
    'Khu di tích Xẻo Quýt',
    'Căn cứ Tỉnh ủy Kiến Phong (1960 - 1975)',
    'Quốc gia',
    'Xã Mỹ Long và Mỹ Hiệp, Huyện Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7528, 10.4222), 4326),
    'Căn cứ cách mạng của Tỉnh ủy Kiến Phong từ năm 1960 đến 1975 nằm ẩn mình dưới tán rừng tràm nguyên sinh rộng hơn 50ha với hệ thống công sự chữ Z, hầm bí mật và xuồng ba lá len lỏi qua kênh rạch.',
    '07:30 - 17:00 hàng ngày', 20000,
    'Trải nghiệm đi xuồng ba lá xuyên rừng tràm cùng cô du kích dẫn đường.',
    'published', 5340, 1650
),
(
    3, 2,
    'Nhà cổ Huỳnh Thủy Lê',
    'Nhà cổ Người Tình (L''Amant)',
    'Quốc gia',
    '255A Nguyễn Huệ, Phường 2, TP Sa Đéc, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7618, 10.2925), 4326),
    'Ngôi nhà cổ xây dựng năm 1895 kết hợp hài hòa kiến trúc Đông - Tây (mái ngói âm dương truyền thống Nam Bộ và mặt tiền vòm Phục Hưng Pháp), gắn liền với tiểu thuyết nổi tiếng Người Tình của nữ văn sĩ Marguerite Duras.',
    '07:00 - 17:30 hàng ngày', 30000,
    'Có thuyết minh viên tiếng Việt, Anh, Pháp tại điểm.',
    'published', 5890, 2110
),
(
    3, 2,
    'Chùa Kiến An Cung',
    'Chùa Ông Quách',
    'Quốc gia',
    'Khóm 1, Phường 2, TP Sa Đéc, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7592, 10.2932), 4326),
    'Công trình kiến trúc cổ của cộng đồng người Hoa tỉnh Phúc Kiến xây dựng từ năm 1924 đến 1927 tại trung tâm Sa Đéc, nổi bật với nghệ thuật chạm khắc gỗ, ghép mảnh sành sứ tinh xảo theo bố cục chữ Công.',
    '06:30 - 18:00 hàng ngày', 0,
    'Nằm đối diện rạch Cái Sơn và gần Nhà cổ Huỳnh Thủy Lê, thuận tiện kết hợp tham quan đi bộ.',
    'published', 3210, 940
),
(
    4, 6,
    'Vườn quốc gia Tràm Chim',
    'Khu Ramsar thứ 2000 của thế giới',
    'Quốc gia',
    'Khóm 4, Thị trấn Tràm Chim, Huyện Tam Nông, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.5167, 10.7167), 4326),
    'Mô hình thu nhỏ của vùng đất ngập nước Đồng Tháp Mười rộng hơn 7.313ha, nơi bảo tồn hệ sinh thái rừng tràm, đồng cỏ năng kim và hơn 230 loài chim nước quý hiếm, đặc biệt là Sếu đầu đỏ (Grus antigone).',
    '06:00 - 18:00 hàng ngày', 60000,
    'Thời điểm đẹp nhất ngắm chim và mùa nước nổi từ tháng 8 đến tháng 12 âm lịch.',
    'published', 4980, 1520
),
(
    4, 4,
    'Khu du lịch sinh thái Gáo Giồng',
    'Ốc đảo xanh Gáo Giồng',
    'Điểm du lịch/Làng nghề',
    'Ấp 6, Xã Gáo Giồng, Huyện Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.6833, 10.5333), 4326),
    'Rừng tràm nguyên sinh rộng khoảng 1.700ha với sân chim tự nhiên lớn nhất vùng Đồng Tháp Mười, nơi hàng chục ngàn cá thể cò trắng, trích mồng đỏ, điên điển sinh sống quanh năm.',
    '07:00 - 17:00 hàng ngày', 30000,
    'Lên đài quan sát cao 18m để ngắm toàn cảnh rừng tràm và đàn cò trắng bay về tổ.',
    'published', 3850, 1180
),
(
    5, 2,
    'Làng hoa Sa Đéc',
    'Làng hoa kiểng Tân Quy Đông',
    'Điểm du lịch/Làng nghề',
    'Đường Hoa Sa Đéc, Phường Tân Quy Đông, TP Sa Đéc, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7486, 10.3111), 4326),
    'Thủ phủ hoa kiểng hơn 100 năm tuổi bên bờ sông Tiền với hơn 2.000 chủng loại hoa kiểng độc đáo được trồng trên giàn cao trên mặt nước, tạo nên cảnh quan nông nghiệp du lịch đặc sắc của miền Tây.',
    '06:00 - 18:00 hàng ngày', 0,
    'Nhộn nhịp nhất vào dịp cận Tết Nguyên Đán và Lễ hội Hoa Xuân Sa Đéc.',
    'published', 6450, 2340
),
(
    5, 7,
    'Làng nghề dệt chiếu Định Yên',
    'Chợ chiếu ma Định Yên',
    'Quốc gia',
    'Xã Định Yên và Định An, Huyện Lấp Vò, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.5264, 10.3347), 4326),
    'Di sản văn hóa phi vật thể quốc gia nổi tiếng với nghề dệt chiếu truyền thống hàng trăm năm tuổi bên bờ sông Hậu và nét văn hóa chợ chiếu họp về đêm dưới ánh đèn dầu độc đáo.',
    '07:00 - 17:00 hàng ngày', 0,
    'Điểm tham quan kết hợp trải nghiệm quy trình nhuộm lát, dệt chiếu thủ công và bối cảnh phim Lật Mặt 6.',
    'published', 3120, 890
),
(
    1, 8,
    'Đền thờ Thượng tướng Trần Văn Năng',
    'Lăng Ông Tiền quân Nguyễn Huỳnh Đức / Trần Văn Năng',
    'Quốc gia',
    'Ấp Nam, Xã Tân Thạnh, Huyện Thanh Bình, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.4542, 10.5986), 4326),
    'Di tích lịch sử văn hóa cấp Quốc gia thờ Thượng tướng Quận công Trần Văn Năng — danh tướng có công lớn trong việc bảo vệ biên cương Tây Nam và đào kênh Vĩnh Tế đầu thế kỷ XIX.',
    '07:00 - 17:00 hàng ngày', 0,
    'Lễ giỗ Thượng tướng tổ chức trang trọng hàng năm vào tháng 2 âm lịch.',
    'published', 2150, 610
),
(
    1, 9,
    'Căn cứ Tỉnh ủy Kiến Phong (Thông Bình)',
    'Khu di tích lịch sử Thông Bình',
    'Cấp tỉnh',
    'Xã Thông Bình, Huyện Tân Hồng, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.4235, 10.9012), 4326),
    'Địa điểm lịch sử ghi dấu hoạt động cách mạng tại vùng biên giới Tân Hồng trong giai đoạn kháng chiến bảo vệ biên giới Tây Nam và giải phóng dân tộc.',
    '07:00 - 17:00 hàng ngày', 0,
    'Tự do tham quan và tìm hiểu tư liệu lịch sử vùng biên giới Đồng Tháp.',
    'published', 1420, 380
),
(
    1, 1,
    'Bảo tàng Tỉnh Đồng Tháp',
    'Nhà trưng bày Văn hóa Óc Eo & Lịch sử Đồng Tháp',
    'Cấp tỉnh',
    '226 Nguyễn Thái Học, Phường 4, TP Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.6319, 10.4561), 4326),
    'Nơi lưu giữ hơn 30.000 hiện vật lịch sử, văn hóa, đặc biệt là bộ sưu tập vàng lá và tượng Phật gỗ thuộc nền văn hóa Óc Eo cùng ngôi nhà cổ kiến trúc Pháp xây dựng đầu thế kỷ XX.',
    '07:30 - 17:00 (Thứ 3 - Chủ Nhật)', 0,
    'Miễn phí vé vào cổng, hỗ trợ đoàn học sinh - sinh viên nghiên cứu lịch sử địa phương.',
    'published', 2940, 870
),
(
    1, 1,
    'Tượng đài Tập kết ra Bắc năm 1954',
    'Di tích Địa điểm Tập kết 1954 Cao Lãnh',
    'Cấp tỉnh',
    'Bến Bắc Cao Lãnh, Phường 6, TP Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.6422, 10.4358), 4326),
    'Công trình lịch sử bên bờ sông Tiền ghi dấu sự kiện 100 ngày tập kết chuyển quân ra miền Bắc năm 1954 của cán bộ, chiến sĩ và con em miền Nam theo Hiệp định Genève.',
    'Tự do tham quan 24/7', 0,
    'Không gian quảng trường thoáng mát ven sông Tiền, thích hợp tham quan buổi chiều tối.',
    'published', 2680, 790
),
(
    5, 10,
    'Chùa Phước Kiển (Chùa Lá Sen)',
    'Chùa Sen Vua Châu Thành',
    'Điểm du lịch/Làng nghề',
    'Xã Hòa Tân, Huyện Châu Thành, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.8475, 10.2189), 4326),
    'Ngôi chùa cổ thành lập trước năm 1847, từng là cơ sở nuôi giấu cách mạng và nổi tiếng khắp cả nước với hồ sen vua (Victoria regia) có đường kính lá lên tới 2m – 3m, có thể nâng đỡ người đứng trên mặt nước.',
    '06:30 - 17:30 hàng ngày', 0,
    'Lá sen vua phát triển to và đẹp nhất vào mùa mưa và mùa nước nổi.',
    'published', 4120, 1340
),
(
    1, 8,
    'Khu căn cứ kháng chiến Bình Thành',
    'Di tích Lịch sử Bình Thành',
    'Cấp tỉnh',
    'Xã Bình Thành, Huyện Thanh Bình, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.5122, 10.5625), 4326),
    'Chiến khu cách mạng quan trọng bên bờ sông Tiền của huyện Thanh Bình và tỉnh Kiến Phong trong hai cuộc kháng chiến cứu nước.',
    '07:30 - 17:00 hàng ngày', 0,
    'Phù hợp cho các chuyến về nguồn giáo dục truyền thống cách mạng.',
    'published', 1530, 410
),
(
    3, 10,
    'Đình Tân Phú Trung',
    'Đình thần Tân Phú Trung',
    'Cấp tỉnh',
    'Quốc lộ 80, Xã Tân Phú Trung, Huyện Châu Thành, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.8147, 10.2614), 4326),
    'Ngôi đình cổ tiêu biểu của vùng đất Nam Bộ lưu giữ sắc thần triều Nguyễn và nghệ thuật kiến trúc đình làng truyền thống gắn liền với quá trình khai hoang lập ấp vùng Sa Đéc - Châu Thành.',
    '07:00 - 17:00 hàng ngày', 0,
    'Lễ Kỳ Yên tổ chức định kỳ hàng năm với nghi thức hát bội truyền thống.',
    'published', 1840, 520
),
(
    5, 4,
    'Chùa Hưng Thiền',
    'Trung tâm Phật giáo tịnh độ cư sĩ Mỹ Hội',
    'Điểm du lịch/Làng nghề',
    'Xã Mỹ Hội, Huyện Cao Lãnh, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.7125, 10.4842), 4326),
    'Một trong những ngôi chùa có khuôn viên rộng lớn và thanh tịnh giữa vùng quê Cao Lãnh, kết hợp hoạt động khám chữa bệnh từ thiện bằng thuốc Nam truyền thống.',
    '06:30 - 17:30 hàng ngày', 0,
    'Giữ yên tĩnh tại khu vực khám thuốc Nam và chánh điện.',
    'published', 1960, 560
),
(
    3, 11,
    'Đình Long Thuận',
    'Đình thần Cù lao Long Thuận',
    'Cấp tỉnh',
    'Xã cù lao Long Thuận, Huyện Hồng Ngự, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.3342, 10.7689), 4326),
    'Ngôi đình cổ nằm trên cù lao Long Thuận giữa dòng sông Tiền thuộc huyện biên giới Hồng Ngự, bảo tồn nguyên vẹn kiến trúc gỗ quý và các hoành phi câu đối cổ.',
    '07:00 - 17:00 hàng ngày', 0,
    'Kết hợp tham quan làng nghề dệt choàng Long Khánh trên cùng tuyến du lịch cù lao.',
    'published', 1620, 440
),
(
    3, 8,
    'Đình Phú Mỹ',
    'Đình thần Phú Mỹ Thanh Bình',
    'Cấp tỉnh',
    'Xã Phú Lợi, Huyện Thanh Bình, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.4289, 10.6311), 4326),
    'Di tích kiến trúc nghệ thuật cấp tỉnh mang đậm dấu ấn văn hóa tín ngưỡng thờ Thành Hoàng Bổn Cảnh của cư dân vùng thượng nguồn sông Tiền.',
    '07:00 - 17:00 hàng ngày', 0,
    'Tự do tham quan.',
    'published', 1390, 360
),
(
    1, 9,
    'Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung',
    'Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung',
    'Quốc gia',
    'Xã An Phước, Huyện Tân Hồng, Đồng Tháp',
    ST_SetSRID(ST_MakePoint(105.4892, 10.8356), 4326),
    'Di tích lịch sử cấp Quốc gia ghi dấu trận đánh lịch sử cuối tháng 9/1959 trên cánh đồng lầy Gò Quản Cung - Giồng Thị Đam, mở đầu cao trào Đồng Khởi vũ trang tại vùng Đồng Tháp Mười.',
    '07:00 - 17:00 hàng ngày', 0,
    'Có nhà trưng bày sa bàn trận đánh và bia tưởng niệm liệt sĩ.',
    'published', 2380, 690
);

-- 5. DỮ LIỆU HÌNH ẢNH ĐẠI DIỆN (THUMBNAIL) CHO 20 DI TÍCH
INSERT INTO hinh_anh (id_di_tich, url, chu_thich, is_thumbnail, thu_tu) VALUES
(1, 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80', 'Toàn cảnh Khu di tích Nguyễn Sinh Sắc - TP Cao Lãnh', TRUE, 1),
(2, 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80', 'Khu di tích Quốc gia đặc biệt Gò Tháp - Tháp Mười', TRUE, 1),
(3, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80', 'Rừng tràm Khu căn cứ Xẻo Quýt - Cao Lãnh', TRUE, 1),
(4, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', 'Mặt tiền kiến trúc Đông Tây Nhà cổ Huỳnh Thủy Lê - Sa Đéc', TRUE, 1),
(5, 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80', 'Kiến trúc cổ Chùa Kiến An Cung - Sa Đéc', TRUE, 1),
(6, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80', 'Hệ sinh thái đất ngập nước Vườn quốc gia Tràm Chim', TRUE, 1),
(7, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80', 'Rừng tràm và sân chim Khu du lịch sinh thái Gáo Giồng', TRUE, 1),
(8, 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80', 'Không gian sắc hoa trên giàn tại Làng hoa Sa Đéc', TRUE, 1),
(9, 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80', 'Làng nghề dệt chiếu truyền thống Định Yên - Lấp Vò', TRUE, 1),
(10, 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80', 'Đền thờ Thượng tướng Quận công Trần Văn Năng', TRUE, 1),
(11, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80', 'Khu di tích lịch sử Thông Bình - Tân Hồng', TRUE, 1),
(12, 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80', 'Bảo tàng Tỉnh Đồng Tháp - TP Cao Lãnh', TRUE, 1),
(13, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80', 'Tượng đài Tập kết ra Bắc năm 1954 bên bờ sông Tiền', TRUE, 1),
(14, 'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?auto=format&fit=crop&w=900&q=80', 'Hồ sen vua khổng lồ tại Chùa Phước Kiển (Chùa Lá Sen)', TRUE, 1),
(15, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80', 'Khu căn cứ kháng chiến Bình Thành - Thanh Bình', TRUE, 1),
(16, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80', 'Kiến trúc Đình cổ Tân Phú Trung - Châu Thành', TRUE, 1),
(17, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80', 'Không gian Chùa Hưng Thiền - Cao Lãnh', TRUE, 1),
(18, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', 'Đình thần Long Thuận trên cù lao sông Tiền', TRUE, 1),
(19, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', 'Đình Phú Mỹ - Huyện Thanh Bình', TRUE, 1),
(20, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80', 'Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung', TRUE, 1);

-- 6. MÃ QR ĐỊNH DANH CHO 20 DI TÍCH (QUAN HỆ 1:1)
INSERT INTO qr_code (id_di_tich, qr_url, file_path)
SELECT
    id,
    'https://senmap.dongthap.gov.vn/di-tich/' || id,
    '/static/qrcodes/di_tich_' || id || '.png'
FROM di_tich;
