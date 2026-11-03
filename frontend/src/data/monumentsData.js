// Dữ liệu 20 Di tích Văn hóa - Lịch sử tỉnh Đồng Tháp (Đất Sen Hồng)
// Dữ liệu chuẩn hóa thực địa từ OpenStreetMap, Wikipedia/Wikidata và Cổng TTĐT Đồng Tháp
// Tọa độ chuẩn WGS84: Leaflet sử dụng [lat, lon], GeoJSON sử dụng [lon, lat]

export const DONG_THAP_BOUNDS = {
  minLat: 10.05,
  maxLat: 11.00,
  minLon: 105.10,
  maxLon: 106.85,
  center: [10.48, 105.85], // [lat, lon] trung tâm tỉnh Đồng Tháp Mới (sau sáp nhập)
  defaultZoom: 9.5,
};

export const DISTRICTS = [
  "Tất cả Huyện/TP",
  "TP Cao Lãnh",
  "TP Sa Đéc",
  "TP Hồng Ngự",
  "Huyện Cao Lãnh",
  "Huyện Tháp Mười",
  "Huyện Tam Nông",
  "Huyện Lấp Vò",
  "Huyện Lai Vung",
  "Huyện Châu Thành",
  "Huyện Thanh Bình",
  "Huyện Tân Hồng",
  "Huyện Hồng Ngự"
];

export const RANKINGS = [
  "Tất cả Cấp",
  "Quốc gia đặc biệt",
  "Quốc gia",
  "Cấp tỉnh",
  "Điểm du lịch/Làng nghề"
];

export const CATEGORIES = [
  "Tất cả Thể loại",
  "Lịch sử - Cách mạng",
  "Khảo cổ - Văn hóa Óc Eo",
  "Kiến trúc - Nghệ thuật",
  "Sinh thái - Danh thắng",
  "Làng nghề - Văn hóa truyền thống"
];

export const INITIAL_MONUMENTS = [
  {
    "id": 1,
    "name": "Khu di tích Nguyễn Sinh Sắc",
    "otherName": "Khu di tích Mộ Cụ Phó bảng Nguyễn Sinh Sắc",
    "ranking": "Quốc gia đặc biệt",
    "decisionYear": "Xếp hạng Di tích Quốc gia ngày 09/04/1992 (QĐ số 413/QĐ-BVHTT); Nâng cấp Di tích Quốc gia đặc biệt ngày 11/09/2025 (Quyết định số 1959/QĐ-TTg của Thủ tướng Chính phủ)",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "Số 137 (123/1 cũ) đường Phạm Hữu Lầu, Phường 4, Thành phố Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Khu di tích Nguyễn Sinh Sắc tại Phường 4, thành phố Cao Lãnh là quần thể kiến trúc lịch sử - văn hóa tưởng niệm Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), nhà nho yêu nước thương dân và là thân sinh của Chủ tịch Hồ Chí Minh. Trong những năm cuối đời (1927–1929), Cụ dừng chân tại làng Hòa An (Cao Lãnh) hành nghề bốc thuốc Nam trị bệnh cứu người và gieo mầm tư tưởng yêu nước cho thanh niên địa phương. Khi Cụ qua đời vào đêm 26 rạng sáng 27 tháng 10 năm Kỷ Tỵ (1929), nhân dân Hòa An đã quyên góp xây mộ và bảo vệ phần mộ suốt hai cuộc kháng chiến. Công trình trùng tu khởi công ngày 22/08/1975 và khánh thành ngày 13/02/1977 trên tổng diện tích hơn 9 ha, chia thành 4 phân khu: Khu lăng mộ với mái vòm cánh sen trắng cách điệu hình bàn tay xòe úp xuống cao 14,95m nâng đỡ 9 đầu rồng tượng trưng cho nhân dân vùng Đồng bằng sông Cửu Long che chở người chí sĩ; Đền thờ và Nhà trưng bày cuộc đời Cụ Phó bảng; Mô hình Nhà sàn và Ao sen Bác Hồ tỷ lệ 1:1; cùng Không gian văn hóa Làng Hòa An xưa tái hiện sinh động nhà truyền thống, rạch Cái Tôm và đời sống cư dân đầu thế kỷ XX. Ngày 11/09/2025, Thủ tướng Chính phủ đã ký Quyết định số 1959/QĐ-TTg xếp hạng Khu di tích là Di tích Quốc gia đặc biệt.",
    "audioScript": "Chào mừng quý du khách đến với Khu di tích Quốc gia đặc biệt Nguyễn Sinh Sắc tại trung tâm thành phố Cao Lãnh, tỉnh Đồng Tháp. Trước mắt quý vị là vòm mộ Cụ Phó bảng Nguyễn Sinh Sắc — thân sinh Chủ tịch Hồ Chí Minh — với thiết kế cánh sen trắng khổng lồ vươn ra chín đầu rồng uy nghiêm, biểu trưng cho tấm lòng người dân chín nhánh sông Cửu Long đời đời ôm ấp, bảo vệ người chí sĩ yêu nước đã hóa thân vào đất Sen Hồng. Mời quý vị dạo bước qua hồ sen пяти cánh, thăm mô hình Nhà sàn Bác Hồ và khám phá không gian Làng Hòa An xưa để cảm nhận trọn vẹn nghĩa tình sâu nặng của nhân dân Đồng Tháp.",
    "openingHours": "07:00 - 17:00 hàng ngày (Mở cửa xuyên suốt các ngày Lễ, Tết)",
    "ticketPrice": 0,
    "note": "Miễn phí vé vào cổng. Du khách vui lòng mặc trang phục lịch sự, giữ trật tự và thành kính khi dâng hương tại khu lăng mộ Cụ Phó bảng. Lễ giỗ Cụ Phó bảng Nguyễn Sinh Sắc được tổ chức trang trọng hàng năm từ ngày 25 đến 27 tháng 10 Âm lịch.",
    "thumbnail": "/images/monuments/monument_1.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/M%E1%BB%99_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc_%281862%E2%80%931929%29.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/1",
    "views": 4620,
    "qrScans": 1245,
    "coordinates": [
      10.447502,
      105.631812
    ],
    "lat": 10.447502,
    "lon": 105.631812,
    "gallery": [
      "/images/monuments/monument_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/M%E1%BB%99_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc_%281862%E2%80%931929%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/%C4%90%E1%BB%81n_th%E1%BB%9D_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Nh%C3%A0_s%C3%A0n_B%C3%A1c_H%E1%BB%93_%E1%BB%9F_Cao_L%C3%A3nh.jpg"
    ]
  },
  {
    "id": 2,
    "name": "Khu di tích khảo cổ Gò Tháp",
    "otherName": "Khu di tích Quốc gia đặc biệt Gò Tháp (Gò Tháp Mười)",
    "ranking": "Quốc gia đặc biệt",
    "decisionYear": "Xếp hạng Di tích Quốc gia năm 1998 (QĐ số 1456/QĐ-BVHTT); Nâng cấp Di tích Quốc gia đặc biệt ngày 27/09/2012 (Quyết định số 1419/QĐ-TTg của Thủ tướng Chính phủ)",
    "category": "Khảo cổ - Văn hóa Óc Eo",
    "district": "Huyện Tháp Mười",
    "address": "Ấp 1 và Ấp 4, Xã Tân Kiều và Xã Mỹ Hòa, Huyện Tháp Mười, Tỉnh Đồng Tháp",
    "history": "Khu di tích Gò Tháp nằm trên địa bàn hai xã Tân Kiều và Mỹ Hòa, huyện Tháp Mười, có diện tích quy hoạch bảo tồn hơn 300 ha trên một giồng cát cổ cao hơn mặt ruộng xung quanh từ 3,8m đến 5m giữa vùng rốn lũ Đồng Tháp Mười. Đây là quần thể di sản kép hiếm có hội tụ cả ba tầng giá trị: Khảo cổ học văn hóa Óc Eo, Lịch sử kháng chiến và Tín ngưỡng dân gian. Các cuộc khai quật khảo cổ từ cuối thế kỷ XIX đến nay đã phát lộ nền kiến trúc gạch đền Ấn Độ giáo tại Gò Tháp Mười, Gò Minh Sư, Gò Bà Chúa Xứ, Gò Tháp Linh Miếu cùng hàng trăm lá vàng chạm khắc hình thần Vishnu, bánh xe Pháp luân và bộ sưu tập tượng Phật gỗ Bình Hòa có niên đại thế kỷ I – VII sau Công nguyên (được công nhận Bảo vật Quốc gia). Giữa thế kỷ XIX (1864–1866), Thiên hộ Võ Duy Dương và Đốc binh Nguyễn Tấn Kiều đã chọn địa thế hiểm yếu của Gò Tháp làm đại bản doanh nghĩa quân chống thực dân Pháp. Trong kháng chiến 9 năm, nơi đây tiếp tục là căn cứ của Xứ ủy Nam Bộ và Ủy ban Kháng chiến Hành chính Nam Bộ, nơi ngôi tháp cổ Mười Tầng từng sừng sững như biểu tượng bất khuất của vùng Đồng Tháp Mười.",
    "audioScript": "Quý du khách đang đứng tại Khu di tích Quốc gia đặc biệt Gò Tháp — trái tim văn hóa ngàn năm của vùng Đồng Tháp Mười. Cách đây hơn một thiên niên kỷ rưỡi, gò cát cổ này từng là trung tâm tôn giáo rực rỡ của nền văn hóa Óc Eo thuộc Vương quốc Phù Nam với những đền tháp gạch, lá vàng dâng cúng và tượng Phật gỗ quý hiếm. Đến thế kỷ XIX, Gò Tháp trở thành đại đồn trung tâm của nghĩa quân Thiên hộ Võ Duy Dương và Đốc binh Nguyễn Tấn Kiều, rồi tiếp nối là căn cứ địa cách mạng kiên cường trong hai cuộc kháng chiến.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Miễn phí vé tham quan. Hàng năm tại Gò Tháp diễn ra hai kỳ lễ hội cấp tỉnh lớn nhất Đồng Tháp: Lễ hội Vía Bà Chúa Xứ Gò Tháp (14–16/3 Âm lịch) và Lễ giỗ Thiên hộ Võ Duy Dương - Đốc binh Nguyễn Tấn Kiều (14–16/11 Âm lịch).",
    "thumbnail": "/images/monuments/monument_2.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/4/44/%C4%90%E1%BB%81n_th%E1%BB%9D_V%C3%B5_Duy_D%C6%B0%C6%A1ng_v%C3%A0_%C4%90%E1%BB%91c_Binh_Ki%E1%BB%81u.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/2",
    "views": 4740,
    "qrScans": 1290,
    "coordinates": [
      10.603984,
      105.828127
    ],
    "lat": 10.603984,
    "lon": 105.828127,
    "gallery": [
      "/images/monuments/monument_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/44/%C4%90%E1%BB%81n_th%E1%BB%9D_V%C3%B5_Duy_D%C6%B0%C6%A1ng_v%C3%A0_%C4%90%E1%BB%91c_Binh_Ki%E1%BB%81u.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Khu_di_tich_khao_co_Go_thap%2CTh%C3%A1p_M%C6%B0%E1%BB%9Di%2C_%C4%90%E1%BB%93ng_Th%C3%A1p%2C_Vi%E1%BB%87t_Nam_-_panoramio.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cong_vao_khu_di_tich_go_thap.xa_My_hoa%2C_huyen_Th%C3%A1p_M%C6%B0%E1%BB%9Di%2C_%C4%90%E1%BB%93ng_Th%C3%A1p%2C_Vi%E1%BB%87t_Nam_-_panoramio.jpg"
    ]
  },
  {
    "id": 3,
    "name": "Khu di tích Xẻo Quýt",
    "otherName": "Căn cứ Tỉnh ủy Kiến Phong (Khu căn cứ cách mạng Xẻo Quýt)",
    "ranking": "Quốc gia",
    "decisionYear": "Công nhận Di tích lịch sử - văn hóa cấp Quốc gia năm 1992 (Quyết định số 413/QĐ-BVHTT ngày 09/04/1992 của Bộ Văn hóa - Thông tin)",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Cao Lãnh",
    "address": "Ấp 4, Xã Mỹ Hiệp và Xã Mỹ Long (Tuyến ĐT 850), Huyện Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Khu di tích lịch sử cách mạng Xẻo Quýt tọa lạc tại hai xã Mỹ Hiệp và Mỹ Long, huyện Cao Lãnh, có tổng diện tích khoảng 50 ha, trong đó có 20 ha rừng tràm nguyên sinh hàng chục năm tuổi. Từ năm 1960 đến năm 1975, trước sự đánh phá ác liệt của máy bay trực thăng, xe lội nước M113 và pháo binh địch, Tỉnh ủy Kiến Phong (tiền thân của tỉnh Đồng Tháp ngày nay) đã chọn vùng đầm lầy hoang vu đầy lau sậy và kênh rạch chằng chịt tại Xẻo Quýt để xây dựng cơ quan đầu não lãnh đạo nhân dân kháng chiến chống Mỹ cứu nước. Ngay dưới tán rừng tràm ngập nước, các cán bộ chiến sĩ đã đào đắp và ngụy trang khéo léo hệ thống công sự chiến đấu hình chữ L, chữ Z, hầm tránh bom chữ A, hầm bí mật cá nhân, lán trại hội họp, nhà in truyền đơn và đài thông tin vô tuyến. Ngày nay, toàn bộ di tích gốc được phục chế nguyên trạng kết hợp với hệ sinh thái đất ngập nước hơn 170 loài thực vật và 200 loài động vật hoang dã, mang đến cho du khách trải nghiệm ngồi xuồng ba lá cùng các cô du kích áo bà ba khăn rằn len lỏi dưới vòm tràm xanh mát.",
    "audioScript": "Chào mừng quý vị đến với Khu căn cứ cách mạng Xẻo Quýt, huyện Cao Lãnh. Giữa không gian tĩnh lặng của 20 héc-ta rừng tràm cổ thụ và những thân dây bòng bong vươn dài trên mặt nước, suốt 15 năm từ 1960 đến 1975, nơi đây chính là cơ quan đầu não của Tỉnh ủy Kiến Phong. Mời quý vị bước xuống chiếc xuồng ba lá để tận mắt thăm những căn hầm chữ A, công sự chữ Z và lắng nghe câu chuyện hào hùng về trí tuệ chiến tranh nhân dân giữa vùng đầm lầy Đồng Tháp.",
    "openingHours": "07:30 - 17:00 hàng ngày",
    "ticketPrice": 20000,
    "note": "Vé vào cổng: 20.000 VNĐ/người lớn (10.000 VNĐ/trẻ em); dịch vụ bơi xuồng ba lá xuyên rừng tràm mùa nước nổi khoảng 20.000 - 30.000 VNĐ/khách. Khuyến khích mang giày đế bệt và kem chống muỗi khi đi bộ dưới tán rừng tràm.",
    "thumbnail": "/images/monuments/monument_3.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ea/X%E1%BA%BBo_qu%C3%BDt.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/3",
    "views": 4860,
    "qrScans": 1335,
    "coordinates": [
      10.398944,
      105.80354
    ],
    "lat": 10.398944,
    "lon": 105.80354,
    "gallery": [
      "/images/monuments/monument_3.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/X%E1%BA%BBo_qu%C3%BDt.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Xeo_quyt.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Khu_Di_Tich_Xeo_Quyt_%2C_Vietnam.webm/1280px--Khu_Di_Tich_Xeo_Quyt_%2C_Vietnam.webm.jpg"
    ]
  },
  {
    "id": 4,
    "name": "Nhà cổ Huỳnh Thủy Lê",
    "otherName": "Nhà cổ Người Tình (La Maison de Huỳnh Thủy Lê / L'Amant)",
    "ranking": "Quốc gia",
    "decisionYear": "Công nhận Di tích kiến trúc - nghệ thuật cấp Quốc gia năm 2009 (Quyết định của Bộ Văn hóa, Thể thao và Du lịch; trước đó xếp hạng cấp tỉnh năm 2008)",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "TP Sa Đéc",
    "address": "Số 255A đường Nguyễn Huệ, Phường 2, Thành phố Sa Đéc, Tỉnh Đồng Tháp",
    "history": "Nhà cổ Huỳnh Thủy Lê tọa lạc tại số 255A đường Nguyễn Huệ, ven bờ sông Sa Đéc, là kiệt tác giao thoa kiến trúc Đông – Tây tiêu biểu bậc nhất vùng Nam Bộ. Ngôi nhà ban đầu do ông Huỳnh Cẩm Thuận — một thương gia người Hoa giàu có chuyên buôn bán lúa gạo từ Phúc Kiến sang lập nghiệp tại Sa Đéc — xây dựng vào năm 1895 bằng gỗ quý theo kiểu nhà truyền thống ba gian hai chái rộng 258 m² với mái ngói âm dương. Đến năm 1917, gia chủ cho trùng tu lớn, ốp gạch đặc bao quanh khung gỗ và thiết kế toàn bộ mặt tiền theo phong cách biệt thự Phục Hưng Pháp thế kỷ XVII với vòm cửa cong La Mã, phù điêu hoa văn đắp nổi và gạch bông nhập khẩu từ Pháp. Bên trong nội thất lại mang đậm triết lý phong thủy Á Đông: nền nhà lát hơi trũng ở tâm điểm tạo thế 'tụ tài', gian giữa đặt bàn thờ Quan Công trang nghiêm cùng hệ thống bao lam, hoành phi, liễn đối chạm lộng tứ linh – tứ quý thếp vàng lộng lẫy. Ngôi nhà gắn liền với mối tình vượt biên giới năm 1929 giữa công tử Huỳnh Thủy Lê (con trai út ông Huỳnh Cẩm Thuận) và nữ văn sĩ Pháp Marguerite Duras — nguyên mẫu tạo nên tiểu thuyết đoạt giải Goncourt 'L'Amant' (Người Tình, 1984) và bộ phim điện ảnh cùng tên của đạo diễn Jean-Jacques Annaud.",
    "audioScript": "Xin chào mừng quý du khách đến với Nhà cổ Huỳnh Thủy Lê bên dòng sông Sa Đéc thơ mộng. Được xây dựng từ năm 1895 và trùng tu năm 1917, ngôi nhà cuốn hút ngay từ cái nhìn đầu tiên bởi mặt tiền kiến trúc Phục Hưng Pháp sang trọng nhưng ẩn chứa bên trong không gian gỗ quý sơn son thếp vàng đậm chất truyền thống Á Đông. Đây chính là nơi lưu giữ câu chuyện tình nổi tiếng thế kỷ XX giữa công tử Huỳnh Thủy Lê và nữ nhà văn Pháp Marguerite Duras trong tác phẩm kinh điển Người Tình.",
    "openingHours": "07:00 - 17:30 hàng ngày",
    "ticketPrice": 30000,
    "note": "Giá vé tham quan: 30.000 VNĐ/khách (đã bao gồm thuyết minh viên tiếng Việt, tiếng Anh hoặc tiếng Pháp và trà sen/bánh phồng tôm Sa Đéc). Không chạm tay vào các bao lam gỗ sơn son thếp vàng cổ.",
    "thumbnail": "/images/monuments/monument_4.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Nh%C3%A0_c%E1%BB%95_Hu%E1%BB%B3nh_Th%E1%BB%A7y_L%C3%AA.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/4",
    "views": 4980,
    "qrScans": 1380,
    "coordinates": [
      10.293918,
      105.768298
    ],
    "lat": 10.293918,
    "lon": 105.768298,
    "gallery": [
      "/images/monuments/monument_4.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Nh%C3%A0_c%E1%BB%95_Hu%E1%BB%B3nh_Th%E1%BB%A7y_L%C3%AA.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/93/La_maison_de_Huynh_Thuy_Le_%28Sa_Dec%2C_Vietnam%29_%286662996139%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/75/V%E1%BA%ADt_d%E1%BB%A5ng_trong_Nh%C3%A0_C%E1%BB%95_Hu%E1%BB%B3nh_Th%E1%BB%A7y_L%C3%AA.jpg"
    ]
  },
  {
    "id": 5,
    "name": "Chùa Kiến An Cung",
    "otherName": "Chùa Ông Quách (Kiến An Cung Hội quán Phúc Kiến)",
    "ranking": "Quốc gia",
    "decisionYear": "Công nhận Di tích lịch sử - văn hóa cấp Quốc gia ngày 27/04/1990 (Quyết định của Bộ Văn hóa - Thông tin)",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "TP Sa Đéc",
    "address": "Số 39 đường Phan Bội Châu, Khóm 1, Phường 1 (khu trung tâm Phường 2), Thành phố Sa Đéc, Tỉnh Đồng Tháp",
    "history": "Chùa Kiến An Cung (dân gian thường gọi là Chùa Ông Quách) tọa lạc tại trung tâm thành phố Sa Đéc, nhìn thẳng ra con rạch Cái Sơn cổ kính. Công trình do cộng đồng người Hoa bang Phúc Kiến định cư tại Sa Đéc góp công sức và mời những nghệ nhân bậc thầy từ quê hương Phúc Kiến sang khởi công xây dựng vào năm Giáp Tý (1924), hoàn thành vào mùa thu năm Đinh Mão (1927) để thờ Uy Linh Công Quách Vương (Bảo Sanh Đại Đế / Quảng Trạch Tôn Vương) cùng Thanh Thủy Tổ Sư và Bảo Sanh Đại Đế. Toàn bộ khuôn viên chùa rộng gần 1.000 m², thiết kế chuẩn mực theo mặt bằng chữ 'Công' (工) gồm ba gian: Đông lang, Tây lang và khu chánh điện đồ sộ ở giữa với giếng trời (thiên tỉnh) đón ánh sáng tự nhiên. Điểm độc đáo nhất trong kiến trúc Kiến An Cung là mái ngói lợp ba lớp uốn lượn như sóng nước, các đầu đao vút cong hình rồng phượng được tạo tác hoàn toàn bằng nghệ thuật cắt ghép mảnh sành sứ nhiều màu tinh xảo, và hệ thống kèo cột hoàn toàn liên kết bằng mộng gỗ không dùng một chiếc đinh sắt nào. Ngày 27/04/1990, Chùa Kiến An Cung vinh dự được Bộ Văn hóa - Thông tin công nhận là Di tích lịch sử - văn hóa cấp Quốc gia.",
    "audioScript": "Chào mừng quý vị đến với Chùa Kiến An Cung, hay còn gọi là Chùa Ông Quách, viên ngọc kiến trúc gần một thế kỷ tuổi ngay giữa lòng phố cổ Sa Đéc. Được xây dựng từ năm 1924 đến 1927 bởi những nghệ nhân tài hoa từ tỉnh Phúc Kiến, ngôi chùa có kết cấu mặt bằng chữ Công độc đáo và hoàn toàn không dùng đinh sắt. Hãy ngước nhìn những bức phù điêu ghép gốm sứ lấp lánh trên mái vòm và những tấm hoành phi chạm khắc nhũ vàng tinh xảo đã giúp Kiến An Cung được xếp hạng Di tích Quốc gia từ năm 1990.",
    "openingHours": "06:30 - 18:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Miễn phí vé vào cửa. Chùa nằm đối diện rạch Cái Sơn và chỉ cách Nhà cổ Huỳnh Thủy Lê khoảng 200m đi bộ. Hai kỳ lễ tế lớn nhất trong năm diễn ra vào ngày 22/2 và 22/8 Âm lịch.",
    "thumbnail": "/images/monuments/monument_5.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Ki%E1%BA%BFn_An_Cung_1.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/5",
    "views": 5100,
    "qrScans": 1425,
    "coordinates": [
      10.294591,
      105.767124
    ],
    "lat": 10.294591,
    "lon": 105.767124,
    "gallery": [
      "/images/monuments/monument_5.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/Ki%E1%BA%BFn_An_Cung_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Ki%E1%BA%BFn_An_Cung_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Ki%E1%BA%BFn_An_Cung_3.jpg"
    ]
  },
  {
    "id": 6,
    "name": "Vườn quốc gia Tràm Chim",
    "otherName": "Khu Ramsar thứ 2.000 của thế giới và thứ 4 của Việt Nam",
    "ranking": "Quốc gia",
    "decisionYear": "Thành lập Vườn quốc gia ngày 29/12/1998 (Quyết định số 253/1998/QĐ-TTg của Thủ tướng Chính phủ); Công nhận Khu Ramsar thứ 2.000 của thế giới ngày 02/02/2012",
    "category": "Sinh thái - Danh thắng",
    "district": "Huyện Tam Nông",
    "address": "Khóm 4, Thị trấn Tràm Chim (và 5 xã Phú Đức, Phú Hiệp, Phú Thành B, Phú Thọ, Tân Công Sính), Huyện Tam Nông, Tỉnh Đồng Tháp",
    "history": "Vườn quốc gia Tràm Chim tọa lạc tại huyện Tam Nông, tỉnh Đồng Tháp, có tổng diện tích tự nhiên 7.313 ha nằm trọn trong vùng trũng ngập nước nội địa Đồng Tháp Mười. Tiền thân là Công trường Nông – Lâm – Ngư Tràm Chim (1985) và Khu bảo tồn thiên nhiên cấp tỉnh (1994), đến ngày 29/12/1998, Thủ tướng Chính phủ ký Quyết định số 253/1998/QĐ-TTg nâng cấp nơi đây thành Vườn quốc gia Tràm Chim. Đặc biệt, ngày 02/02/2012, Ban Thư ký Công ước Ramsar (Thụy Sĩ) đã chính thức công nhận Tràm Chim là Khu Ramsar tầm quan trọng quốc tế thứ 2.000 của thế giới và thứ 4 của Việt Nam. Tràm Chim được ví như 'Đồng Tháp Mười thu nhỏ' bởi lưu giữ nguyên vẹn hệ sinh thái đất ngập nước đặc hữu với rừng tràm thuần loại, đồng cỏ năng kim, lúa ma (lúa trời), sen súng và thảm hoa Hoàng đầu ấn. Đây là ngôi nhà chung của hơn 130 loài thực vật bậc cao, 130 loài cá nước ngọt và hơn 231 loài chim nước (chiếm 1/4 tổng số loài chim toàn Việt Nam), trong đó nổi tiếng nhất là Sếu đầu đỏ (Grus antigone sharpii) — loài chim quý hiếm nằm trong Sách Đỏ thế giới IUCN.",
    "audioScript": "Chào mừng quý du khách đến với Vườn quốc gia Tràm Chim, huyện Tam Nông — Khu Ramsar thứ 2.000 của thế giới. Trải rộng trên hơn 7.300 héc-ta rừng tràm, đồng cỏ năng kim và lung bàu tự nhiên, Tràm Chim là bảo tàng sinh thái sống động của vùng Đồng Tháp Mười xưa và là nơi trú ngụ của hơn 230 loài chim nước, đặc biệt là loài Sếu đầu đỏ quý hiếm. Hãy hít thở bầu không khí trong lành và lướt xuồng qua những cánh đồng sen, lúa trời bát ngát.",
    "openingHours": "06:00 - 17:00 hàng ngày",
    "ticketPrice": 60000,
    "note": "Vé tham quan cơ bản khoảng 20.000 - 60.000 VNĐ/khách; dịch vụ tàu kéo/vỏ lãi tham quan tuyến C4 hoặc A3 tính theo chuyến (500.000 - 800.000 VNĐ/đoàn). Thời điểm vàng ngắm chim mùa nước nổi là tháng 9–12 dương lịch và mùa hoa Hoàng đầu ấn nở vàng rực vào tháng 1–3 dương lịch.",
    "thumbnail": "/images/monuments/monument_6.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fa/%C4%90%E1%BB%93ng_c%E1%BB%8F_v%C3%A0_chim_n%C6%B0%E1%BB%9Bc.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/6",
    "views": 5220,
    "qrScans": 1470,
    "coordinates": [
      10.727185,
      105.536173
    ],
    "lat": 10.727185,
    "lon": 105.536173,
    "gallery": [
      "/images/monuments/monument_6.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/%C4%90%E1%BB%93ng_c%E1%BB%8F_v%C3%A0_chim_n%C6%B0%E1%BB%9Bc.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Sen_v%C3%A0_ngh%E1%BB%85_trong_v%C3%B9ng_%C4%91%E1%BA%A7m_l%E1%BA%A7y_%E1%BB%9F_VQG_Tr%C3%A0m_Chim.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Anastomus_oscitans_Tr%C3%A0m_Chim_2.JPG"
    ]
  },
  {
    "id": 7,
    "name": "Khu du lịch sinh thái Gáo Giồng",
    "otherName": "Ốc đảo xanh Gáo Giồng (Sân chim Gáo Giồng)",
    "ranking": "Điểm du lịch/Làng nghề",
    "decisionYear": "Thành lập Khu du lịch sinh thái tháng 03/2003; Công nhận Điểm du lịch tiêu biểu Đồng bằng sông Cửu Long",
    "category": "Sinh thái - Danh thắng",
    "district": "Huyện Cao Lãnh",
    "address": "Ấp 6, Xã Gáo Giồng, Huyện Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Khu du lịch sinh thái Gáo Giồng tọa lạc tại Ấp 6, xã Gáo Giồng, huyện Cao Lãnh, cách trung tâm thành phố Cao Lãnh khoảng 17 km về hướng Đông Bắc. Được hình thành từ công trình khai hoang trồng tràm chắn sóng, cải tạo đất phèn sau năm 1985 và chính thức mở cửa đón khách du lịch sinh thái từ tháng 03/2003, rừng tràm Gáo Giồng có tổng diện tích khoảng 1.700 ha (gồm 4 phân khu chức năng với hơn 70 km kênh đê bao khép kín). Tên gọi 'Gáo Giồng' bắt nguồn từ cây gáo cổ thụ mọc trên giồng đất cao từng là điểm dừng chân và trạm giao liên cách mạng thời kháng chiến. Giữa lòng rừng tràm là khu bảo tồn Sân chim tự nhiên rộng 36 ha — nơi cư trú và sinh sản quanh năm của hàng chục ngàn cá thể thuộc hơn 15 loài chim nước như cò trắng, trích mồng đỏ (biểu tượng của Gáo Giồng), điên điển, cồng cộc, diệc xám và vạc. Từ đỉnh đài quan sát cao 18m hoặc trên chiếc xuồng ba lá lướt nhẹ qua những con rạch phủ đầy bèo tai tượng, du khách có thể chiêm ngưỡng trọn vẹn bức tranh thiên nhiên hoang sơ của 'ốc đảo xanh' vùng Đồng Tháp Mười.",
    "audioScript": "Chào mừng quý du khách đến với Khu du lịch sinh thái Gáo Giồng — ốc đảo xanh rộng 1.700 héc-ta giữa lòng huyện Cao Lãnh. Nơi đây sở hữu sân chim tự nhiên rộng 36 héc-ta với hàng vạn cánh cò trắng, trích mồng đỏ và điên điển rợp trời mỗi buổi bình minh và hoàng hôn. Mời quý vị chinh phục đài quan sát cao 18 mét để phóng tầm mắt bao quát đại ngàn rừng tràm bạt ngàn và trải nghiệm xuồng ba lá xuyên qua thảm bèo xanh.",
    "openingHours": "07:30 - 17:00 hàng ngày",
    "ticketPrice": 20000,
    "note": "Vé vào cổng: 20.000 VNĐ/người; dịch vụ bơi xuồng ba lá vào sân chim 15.000 - 20.000 VNĐ/khách. Đừng bỏ lỡ trải nghiệm leo lên Đài quan sát cao 18m ngắm toàn cảnh rừng tràm và thưởng thức cá lóc nướng trui cuốn lá sen non.",
    "thumbnail": "/images/monuments/monument_7.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Gao_Giong_Bird_Sanctuary_Chinese_Pond_Heron_01.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/7",
    "views": 5340,
    "qrScans": 1515,
    "coordinates": [
      10.588263,
      105.611757
    ],
    "lat": 10.588263,
    "lon": 105.611757,
    "gallery": [
      "/images/monuments/monument_7.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Gao_Giong_Bird_Sanctuary_Chinese_Pond_Heron_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Gao_Giap_Bird_Sanctuary_Purple_Heron.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/DTM.jpg"
    ]
  },
  {
    "id": 8,
    "name": "Làng hoa Sa Đéc",
    "otherName": "Làng hoa kiểng Tân Quy Đông (Thủ phủ Hoa kiểng Sa Đéc)",
    "ranking": "Điểm du lịch/Làng nghề",
    "decisionYear": "Làng nghề truyền thống hơn 100 năm tuổi; Nghề trồng hoa kiểng Sa Đéc được công nhận Di sản văn hóa phi vật thể Quốc gia (Bộ VHTTDL)",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "TP Sa Đéc",
    "address": "Đường Hoa Sa Đéc, Khóm Tân Hiệp, Phường Tân Quy Đông (và Xã Tân Khánh Đông), Thành phố Sa Đéc, Tỉnh Đồng Tháp",
    "history": "Làng hoa Sa Đéc tọa lạc bên bờ nam sông Tiền thuộc phường Tân Quy Đông và xã Tân Khánh Đông, thành phố Sa Đéc, được mệnh danh là thủ phủ hoa kiểng lớn nhất vùng Đồng bằng sông Cửu Long. Khởi nguồn từ đầu thế kỷ XX khi một số hộ nông dân làng Tân Quy Đông bắt đầu trồng hoa trang trí dịp Tết, nhờ thổ nhưỡng phù sa màu mỡ kết hợp nguồn nước ngọt dồi dào từ sông Tiền và sông Sa Đéc, làng nghề đã phát triển vượt bậc lên quy mô hơn 950 ha với trên 4.000 hộ sản xuất và hơn 2.000 chủng loại hoa, cây cảnh, bonsai cổ thụ (nổi tiếng với cúc mâm xôi, hồng Sa Đéc, vạn thọ, dạ yến thảo, mai vàng, tùng vạn niên). Nét độc đáo có một không hai của Làng hoa Sa Đéc là kỹ thuật trồng hoa trên giàn tre cao phía trên mặt ruộng ngập nước, tạo nên cảnh tượng người nông dân chèo xuồng hoặc lội nước chăm sóc những luống hoa rực rỡ sắc màu. Nghề trồng hoa kiểng Sa Đéc đã được Bộ Văn hóa, Thể thao và Du lịch ghi danh vào Danh mục Di sản văn hóa phi vật thể quốc gia, khẳng định giá trị tri thức dân gian trăm năm của xứ sở Hoa Hồng.",
    "audioScript": "Chào mừng quý du khách đến với Làng hoa Sa Đéc — vương quốc bốn mùa khoe sắc bên bờ sông Tiền. Với lịch sử hơn một trăm năm hình thành và diện tích gần một ngàn héc-ta, nơi đây quy tụ hơn hai ngàn loài hoa kiểng và bonsai độc đáo. Hình ảnh những giàn hoa cúc mâm xôi, hoa hồng khoe sắc trên mặt nước cùng người nông dân chèo xuồng chăm hoa đã trở thành biểu tượng văn hóa nông nghiệp đặc sắc của tỉnh Đồng Tháp.",
    "openingHours": "06:00 - 18:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Đường làng hoa mở cửa tự do miễn phí; một số điểm tham quan tư nhân (Đài ngắm hoa, Cánh đồng hoa hồng, Happy Land Hùng Thy) thu vé 20.000 - 50.000 VNĐ/khách. Đẹp và rực rỡ nhất từ tháng 11 đến tháng Chạp Âm lịch (dịp Festival Hoa - Kiểng Sa Đéc).",
    "thumbnail": "/images/monuments/monument_8.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Langhoa3.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/8",
    "views": 5460,
    "qrScans": 1560,
    "coordinates": [
      10.315397,
      105.749722
    ],
    "lat": 10.315397,
    "lon": 105.749722,
    "gallery": [
      "/images/monuments/monument_8.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Langhoa3.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Hoa_%E1%BB%9F_T%C3%A2n_Quy_T%C3%A2y.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/M%E1%BB%99t_v%C6%B0%E1%BB%9Dn_hoa_lan_%E1%BB%9F_Sa_%C4%90%C3%A9c.jpg"
    ]
  },
  {
    "id": 9,
    "name": "Làng nghề dệt chiếu Định Yên",
    "otherName": "Làng chiếu Định Yên (Chợ chiếu đêm / Chợ ma Định Yên)",
    "ranking": "Quốc gia",
    "decisionYear": "Công nhận Di sản văn hóa phi vật thể Quốc gia ngày 05/08/2013 (Quyết định số 2684/QĐ-BVHTTDL của Bộ Văn hóa, Thể thao và Du lịch); Đình Định Yên xếp hạng Di tích Quốc gia năm 2012",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Lấp Vò",
    "address": "Ấp An Bình và Ấp An Lợi, Xã Định Yên và Xã Định An, Huyện Lấp Vò, Tỉnh Đồng Tháp",
    "history": "Làng nghề dệt chiếu Định Yên nằm ven bờ sông Hậu thuộc hai xã Định Yên và Định An, huyện Lấp Vò, tỉnh Đồng Tháp, là cái nôi của nghề dệt chiếu lát truyền thống hơn 100 năm tuổi ở miền Tây Nam Bộ. Nghề dệt chiếu tại đây do những lưu dân từ vùng ven biển Bắc Bộ (Thái Bình, Nam Định) di cư vào khai khẩn đất phù sa sông Hậu mang theo từ cuối thế kỷ XIX, tận dụng nguồn cây lác (cói) dồi dào tại địa phương để tạo ra các sản phẩm chiếu bông, chiếu trắng, chiếu vảy ốc, chiếu cưới hỏi bền đẹp nổi tiếng khắp lục tỉnh. Nét văn hóa độc đáo nhất làm nên huyền thoại Định Yên là phiên 'Chợ chiếu đêm' (còn gọi là Chợ chiếu ma) họp trước sân Đình thần Định Yên từ khoảng 2 giờ đến 4 giờ sáng dưới ánh đèn dầu leo lét: người mua kẻ bán tấp nập giao thương để kịp con nước ghe thương hồ tỏa đi khắp đồng bằng mà vẫn giữ trọn thời gian ban ngày cho việc phơi lát, dệt chiếu. Ngày 05/08/2013, Nghề dệt chiếu Định Yên đã được Bộ Văn hóa, Thể thao và Du lịch công nhận là Di sản văn hóa phi vật thể Quốc gia.",
    "audioScript": "Chào mừng quý du khách về thăm Làng nghề dệt chiếu Định Yên bên dòng sông Hậu hiền hòa thuộc huyện Lấp Vò. Suốt hơn một thế kỷ qua, những con đường làng rực rỡ sắc màu của sợi lác nhuộm đỏ, vàng, xanh phơi dưới nắng cùng tiếng khung dệt lách cách rộn ràng đã tạo nên một Di sản văn hóa phi vật thể Quốc gia độc đáo. Đặc biệt, ngay tại sân Đình thần Định Yên cổ kính này từng diễn ra phiên chợ chiếu đêm dưới ánh đèn dầu trứ danh khắp miền lục tỉnh.",
    "openingHours": "07:00 - 17:00 hàng ngày (Trình diễn tái hiện Chợ chiếu đêm vào cuối tuần và dịp lễ hội)",
    "ticketPrice": 0,
    "note": "Tham quan hoàn toàn miễn phí. Du khách có thể ghé thăm Đình thần Định Yên (Di tích kiến trúc nghệ thuật cấp Quốc gia), xem nghệ nhân nhuộm lát phơi dọc đường làng và trực tiếp dệt chiếu thủ công.",
    "thumbnail": "/images/monuments/monument_9.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9c/L%C3%A0ng_chi%E1%BA%BFu_%C4%90%E1%BB%8Bnh_Y%C3%AAn.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/9",
    "views": 5580,
    "qrScans": 1605,
    "coordinates": [
      10.309325,
      105.542441
    ],
    "lat": 10.309325,
    "lon": 105.542441,
    "gallery": [
      "/images/monuments/monument_9.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/L%C3%A0ng_chi%E1%BA%BFu_%C4%90%E1%BB%8Bnh_Y%C3%AAn.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/%C4%90%E1%BB%8Bnh_Y%C3%AAn_temple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/L%C3%A0ng_chi%E1%BA%BFu_%C4%90%E1%BB%8Bnh_Y%C3%AAn.jpg"
    ]
  },
  {
    "id": 10,
    "name": "Đền thờ Thượng tướng Trần Văn Năng",
    "otherName": "Dinh Ông Đốc Vàng (Đền thờ Thượng tướng Quận công Trần Văn Năng)",
    "ranking": "Quốc gia",
    "decisionYear": "Công nhận Di tích lịch sử - văn hóa cấp Quốc gia ngày 19/08/2004 (Quyết định số 65/2004/QĐ-BVHTT của Bộ Văn hóa - Thông tin)",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Thanh Bình",
    "address": "Ấp Nam, Xã Tân Thạnh (Vàm rạch Đốc Vàng Thượng - Quốc lộ 30), Huyện Thanh Bình, Tỉnh Đồng Tháp",
    "history": "Đền thờ Thượng tướng Quận công Trần Văn Năng (nhân dân địa phương tôn kính gọi là Dinh Ông Đốc Vàng) tọa lạc bên vàm rạch Đốc Vàng Thượng giao với dòng sông Tiền tại Ấp Nam, xã Tân Thạnh, huyện Thanh Bình. Thượng tướng Trần Văn Năng (1763–1838) quê ở huyện Vĩnh Xương, tỉnh Khánh Hòa, là vị danh tướng kiệt xuất đầu triều Nguyễn dưới thời vua Gia Long và Minh Mạng. Ông từng giữ trọng trách Phó Tổng trấn Gia Định Thành, trực tiếp chỉ huy hộ dân đào kênh Vĩnh Tế – kênh Thoại Hà, mở mang giao thương vùng biên cương Tây Nam và lập chiến công hiển hách đánh tan quân Xiêm xâm lược trên sông Tiền (chiến thắng Vàm Nao - Cổ Hỗ năm 1833–1834). Khi hành quân ngang qua ngã ba rạch Đốc Vàng Thượng (Thanh Bình) vào năm 1835, ông lâm trọng bệnh và qua đời; cảm kích công đức bảo quốc an dân của vị danh tướng, cư dân địa phương đã lập đền thờ phụng từ giữa thế kỷ XIX. Ngôi đền mang kiến trúc đình miếu cổ Nam Bộ uy nghiêm rộng hơn 12.000 m² và được xếp hạng Di tích lịch sử - văn hóa cấp Quốc gia ngày 19/08/2004.",
    "audioScript": "Kính chào quý du khách đến thăm Đền thờ Thượng tướng Quận công Trần Văn Năng tại xã Tân Thạnh, huyện Thanh Bình, tỉnh Đồng Tháp. Nằm uy nghiêm nơi ngã ba rạch Đốc Vàng Thượng hòa vào dòng sông Tiền, ngôi đền thờ vị danh tướng triều Nguyễn đã có công lớn trong việc đào kênh Vĩnh Tế và chỉ huy đại quân đánh tan quân xâm lược bảo vệ biên giới Tây Nam đầu thế kỷ XIX. Trải qua gần hai trăm năm khói hương, nơi đây là biểu tượng cho truyền thống uống nước nhớ nguồn của nhân dân vùng thượng nguồn Đồng Tháp.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Miễn phí vé tham quan. Lễ hội kỳ yên và Lễ giỗ Thượng tướng Quận công Trần Văn Năng được tổ chức trang trọng hàng năm từ ngày 14 đến 17 tháng 2 Âm lịch với nghi thức tế cổ truyền và lễ hội bánh tét dân gian.",
    "thumbnail": "/images/monuments/monument_10.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%E1%BB%81n_th%E1%BB%9D_%C4%90%E1%BB%97_C%C3%B4ng_T%C6%B0%E1%BB%9Dng.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/10",
    "views": 5700,
    "qrScans": 1650,
    "coordinates": [
      10.57062,
      105.452392
    ],
    "lat": 10.57062,
    "lon": 105.452392,
    "gallery": [
      "/images/monuments/monument_10.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%E1%BB%81n_th%E1%BB%9D_%C4%90%E1%BB%97_C%C3%B4ng_T%C6%B0%E1%BB%9Dng.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/%C4%90%C3%ACnh_V%C4%A9nh_Ph%C6%B0%E1%BB%9Bc_%E1%BB%9F_Sa_%C4%90%C3%A9c.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Dinh_vinh_phuoc.jpg"
    ]
  },
  {
    "id": 11,
    "name": "Căn cứ Tỉnh ủy Kiến Phong (Khu di tích lịch sử Thông Bình)",
    "otherName": "Di tích lịch sử lưu niệm Đình Ngã ba Thông Bình",
    "ranking": "Cấp tỉnh",
    "decisionYear": "2016 (Quyết định xếp hạng Di tích lịch sử cấp tỉnh ngày 18/01/2016)",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Tân Hồng",
    "address": "Ấp Phước Tiên, Xã Thông Bình, Huyện Tân Hồng, Tỉnh Đồng Tháp",
    "history": "Khu di tích lịch sử Thông Bình (gắn liền với Di tích lịch sử lưu niệm Đình Ngã ba Thông Bình và địa bàn căn cứ cách mạng vùng biên giới Tỉnh ủy Kiến Phong) tọa lạc tại ấp Phước Tiên, xã biên giới Thông Bình, huyện Tân Hồng, tỉnh Đồng Tháp. Dưới triều Nguyễn, khu vực ngã ba sông Sở Hạ – Thông Bình là vị trí chiến lược hiểm yếu nên triều đình đã cho thiết lập Bảo Thông Bình làm đồn thủ sở trấn giữ biên cương Tây Nam, gắn liền với công lao khai hoang mở cõi và bảo vệ bờ cõi của danh tướng Thoại Ngọc Hầu (Nguyễn Văn Thoại). Ngôi đình được cư dân địa phương dựng lên để thờ Thần Thành Hoàng Bổn Cảnh và các bậc tiền hiền, danh tướng có công giữ đất. Trong hai cuộc kháng chiến chống thực dân Pháp, đế quốc Mỹ và chiến tranh bảo vệ biên giới Tây Nam, khu vực ngã ba Thông Bình trở thành hành lang giao liên, bàn đạp hậu cần và căn cứ bám trụ kiên cường của quân dân tỉnh Kiến Phong (nay là Đồng Tháp). Dù trải qua bom đạn chiến tranh tàn phá ác liệt, công trình vẫn được phục dựng khang trang theo kiến trúc đình làng truyền thống Nam Bộ dưới bóng cây cổ thụ ven sông, được UBND tỉnh Đồng Tháp xếp hạng Di tích lịch sử cấp tỉnh năm 2016.",
    "audioScript": "Chào mừng quý du khách đến với Khu di tích lịch sử Thông Bình và Đình Ngã ba Thông Bình tại vùng đất biên cương huyện Tân Hồng, tỉnh Đồng Tháp. Đứng bên dòng sông Sở Hạ hiền hòa nơi ngã ba sông lịch sử, quý vị đang đặt chân lên địa điểm từng là Bảo Thông Bình – đồn lũy biên phòng trọng yếu từ đầu thế kỷ XIX gắn liền với bước chân trấn giữ biên thùy của danh tướng Thoại Ngọc Hầu. Trong suốt những năm tháng kháng chiến cứu nước và bảo vệ biên giới Tây Nam, nơi đây còn là điểm tựa hậu cần, căn cứ hoạt động cách mạng bất khuất của quân và dân Kiến Phong – Đồng Tháp. Hãy cùng thắp nén tâm hương tri ân các bậc tiền nhân mở cõi và các anh hùng liệt sĩ đã giữ trọn từng tấc đất thiêng liêng nơi biên giới Đất Sen Hồng.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Di tích nằm tại khu vực ngã ba sông Sở Hạ vùng biên giới Việt Nam - Campuchia; du khách lưu ý mang theo giấy tờ tùy thân và giữ trang phục lịch sự khi dâng hương.",
    "thumbnail": "/images/monuments/monument_11.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9a/%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di_nh%C3%ACn_tr%C3%AAn_cao.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/11",
    "views": 5820,
    "qrScans": 1695,
    "coordinates": [
      10.923587,
      105.422561
    ],
    "lat": 10.923587,
    "lon": 105.422561,
    "gallery": [
      "/images/monuments/monument_11.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di_nh%C3%ACn_tr%C3%AAn_cao.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/%C4%90%E1%BB%93ng_C%E1%BB%8F_%E1%BB%9F_%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/27/%C4%90%C3%ACnh_th%E1%BA%A7n_Giao_Kh%E1%BA%A9u.jpg"
    ]
  },
  {
    "id": 12,
    "name": "Bảo tàng Tỉnh Đồng Tháp",
    "otherName": "Cụm di tích Dinh Cò Tây & Nhà trưng bày Văn hóa Óc Eo Đồng Tháp",
    "ranking": "Cấp tỉnh",
    "decisionYear": "2008 (Quyết định số 938/QĐ-UBND ngày 05/09/2008; thành lập ngày 15/05/1978)",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "226 Nguyễn Thái Học, Phường 4, TP. Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Bảo tàng Tỉnh Đồng Tháp tọa lạc tại số 226 đường Nguyễn Thái Học, Phường 4, thành phố Cao Lãnh, nằm bên bờ sông Cao Lãnh thơ mộng với tổng diện tích khuôn viên khoảng 11.000 m². Khu đất này nguyên là cụm kiến trúc dinh thự cổ thời Pháp thuộc xây dựng từ thập niên 1920 (gồm Quận đường Cao Lãnh, Dinh Cò Tây, nhà giam và phòng tra tấn dưới thời chính quyền tỉnh Kiến Phong cũ) — nơi ghi dấu nhiều cuộc đấu tranh kiên cường của các chiến sĩ cách mạng. Ngày 15/05/1978, Bảo tàng tỉnh Đồng Tháp chính thức được thành lập; khối nhà trưng bày trung tâm hiện đại kết hợp hài hòa kiến trúc truyền thống được khánh thành ngày 29/12/2000 và khuôn viên được xếp hạng Di tích lịch sử - văn hóa cấp tỉnh ngày 05/09/2008. Hiện nay, Bảo tàng lưu giữ hơn 30.000 tài liệu, hiện vật quý giá, nổi bật hàng đầu khu vực Đồng bằng sông Cửu Long với 3 Bảo vật Quốc gia thuộc nền Văn hóa Óc Eo (tượng thần Vishnu, tượng nữ thần Lakshmi), bộ sưu tập vàng lá Gò Tháp lớn nhất Việt Nam, cùng không gian trưng bày chuyên đề Nhạc sư Nguyễn Vĩnh Bảo và lịch sử kháng chiến Đồng Tháp.",
    "audioScript": "Xin chào quý khách đang dừng chân tại Bảo tàng Tỉnh Đồng Tháp, số 226 Nguyễn Thái Học, thành phố Cao Lãnh. Không gian xanh mát rộng 11.000 mét vuông bên dòng sông Cao Lãnh này là nơi giao thoa giữa ký ức lịch sử và di sản ngàn năm. Ngay trong khuôn viên bảo tàng, quý khách sẽ bắt gặp ngôi biệt thự cổ Dinh Cò Tây mang kiến trúc Pháp đầu thế kỷ XX. Bước vào tòa nhà trưng bày chính, quý khách sẽ được chiêm ngưỡng hơn 2.000 hiện vật gốc tiêu biểu trong tổng số hơn 30.000 hiện vật đang lưu giữ, đặc biệt là các Bảo vật Quốc gia tượng thần Vishnu, nữ thần Lakshmi và bộ sưu tập vàng lá Văn hóa Óc Eo rực rỡ bậc nhất Đông Nam Á.",
    "openingHours": "07:30 - 17:00 (Thứ Ba đến Chủ Nhật hàng tuần)",
    "ticketPrice": 0,
    "note": "Miễn phí vé tham quan; có hỗ trợ thuyết minh đoàn và hệ thống quét mã QR thông minh 'AI Sen Hồng' tra cứu Bảo vật Quốc gia.",
    "thumbnail": "/images/monuments/monument_12.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a0/B%E1%BA%A3o_t%C3%A0ng_%C4%90%E1%BB%93ng_Th%C3%A1p.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/12",
    "views": 5940,
    "qrScans": 1740,
    "coordinates": [
      10.453,
      105.632563
    ],
    "lat": 10.453,
    "lon": 105.632563,
    "gallery": [
      "/images/monuments/monument_12.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/B%E1%BA%A3o_t%C3%A0ng_%C4%90%E1%BB%93ng_Th%C3%A1p.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/92/Bia_Th%C3%A1p_M%C6%B0%E1%BB%9Di.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/%C4%90%C6%B0%E1%BB%9Dng_ph%E1%BB%91_%E1%BB%9F_Cao_L%C3%A3nh%2C_%C4%90%E1%BB%93ng_Th%C3%A1p..JPG"
    ]
  },
  {
    "id": 13,
    "name": "Tượng đài Tập kết ra Bắc năm 1954",
    "otherName": "Di tích lịch sử Quốc gia Địa điểm Tập kết ra Bắc năm 1954 tại Cao Lãnh",
    "ranking": "Quốc gia",
    "decisionYear": "2023 (Quyết định xếp hạng Di tích Quốc gia ngày 24/02/2023; khánh thành tượng đài ngày 29/10/2019)",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "Bến Bắc Cao Lãnh (Đường Phạm Hữu Lầu), Khóm 6, Phường 6, TP. Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Di tích lịch sử Quốc gia Địa điểm Tập kết ra Bắc năm 1954 và Tượng đài Tập kết tọa lạc bên bờ sông Tiền, cách bến phà Cao Lãnh cũ khoảng 100m về phía thượng lưu, thuộc Khóm 6, Phường 6, thành phố Cao Lãnh. Theo Hiệp định Genève năm 1954, Cao Lãnh được chọn là một trong ba điểm tập kết chuyển quân lớn của Nam Bộ trong thời hạn 100 ngày (từ tháng 8 đến ngày 29/10/1954). Tại bến sông lịch sử này, Đảng bộ và nhân dân Đồng Tháp đã đón tiếp, chăm lo và tiễn đưa 13.508 cán bộ, chiến sĩ, học sinh, con em miền Nam từ 9 tỉnh Trung Nam Bộ lên những chuyến tàu của Ba Lan và Liên Xô ra miền Bắc học tập, rèn luyện, trở thành những 'hạt giống đỏ' cho sự nghiệp thống nhất đất nước. Để khắc ghi sự kiện trọng đại ấy, tỉnh Đồng Tháp đã xây dựng Khu lưu niệm và Tượng đài Tập kết trên diện tích 12.000 m² và khánh thành vào ngày 29/10/2019. Tượng đài cao 11m do điêu khắc gia Ngô Liêm sáng tác, khắc họa hình ảnh người mẹ miền Nam hiền từ tiễn con lên đường trên đài sen cách điệu cùng bức phù điêu con tàu rẽ sóng. Ngày 24/02/2023, Bộ Văn hóa, Thể thao và Du lịch chính thức xếp hạng nơi đây là Di tích lịch sử Quốc gia.",
    "audioScript": "Quý vị đang đứng trước Tượng đài Tập kết ra Bắc năm 1954 bên bờ sông Tiền lộng gió, thuộc Phường 6, thành phố Cao Lãnh. Hơn bảy thập kỷ trước, vào mùa thu năm 1954, chính tại bến Bắc Cao Lãnh này đã diễn ra cuộc chia tay lịch sử kéo dài 100 ngày đầy xúc động. Hơn 13.500 cán bộ, chiến sĩ và con em miền Nam đã mang theo nắm đất quê hương, cây vú sữa miền Nam lên tàu ra Bắc với lời thề ngày thống nhất trở về. Cụm tượng đài cao 11 mét vươn lên từ đài sen hồng cùng bức phù điêu cánh buồm vươn sóng là biểu tượng bất diệt của tình quân dân cá nước và khát vọng hòa bình, thống nhất non sông.",
    "openingHours": "Tự do tham quan 24/7",
    "ticketPrice": 0,
    "note": "Khuôn viên quảng trường công viên ven sông Tiền thoáng mát, rất đẹp khi tham quan vào buổi sáng sớm hoặc chiều hoàng hôn.",
    "thumbnail": "/images/monuments/monument_13.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0e/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen_v%C3%A0_th%C3%A1p%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%286%29.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/13",
    "views": 6060,
    "qrScans": 1785,
    "coordinates": [
      10.416532,
      105.642291
    ],
    "lat": 10.416532,
    "lon": 105.642291,
    "gallery": [
      "/images/monuments/monument_13.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen_v%C3%A0_th%C3%A1p%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%286%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/34/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen_v%C3%A0_th%C3%A1p%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%287%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen_v%C3%A0_th%C3%A1p%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%288%29.jpg"
    ]
  },
  {
    "id": 14,
    "name": "Chùa Phước Kiển (Chùa Lá Sen)",
    "otherName": "Phước Kiển Tự / Chùa Sen Vua Châu Thành",
    "ranking": "Điểm du lịch/Làng nghề",
    "decisionYear": "1847 (Khởi dựng trước thời vua Thiệu Trị; điểm du lịch văn hóa - sinh thái tiêu biểu của tỉnh)",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Châu Thành",
    "address": "Ấp Tân Hòa, Xã Hòa Tân (nay thuộc Xã Tân Nhuận Đông), Huyện Châu Thành, Tỉnh Đồng Tháp",
    "history": "Chùa Phước Kiển (dân gian quen gọi là Chùa Lá Sen hay Chùa Sen Vua) tọa lạc tại xã Hòa Tân, huyện Châu Thành, tỉnh Đồng Tháp. Ngôi cổ tự được Tổ sư Minh Hải khởi dựng từ trước năm 1847 dưới triều vua Thiệu Trị. Trong hai cuộc kháng chiến chống Pháp và chống Mỹ, chùa Phước Kiển là cơ sở cách mạng mật che chở cán bộ hoạt động tại vùng Châu Thành – Sa Đéc. Năm 1966, bom đạn chiến tranh đã đánh sập hoàn toàn ngôi chùa cổ cùng nhiều hố bom sâu quanh khuôn viên; sau năm 1975, chùa được trùng tu lại giản dị, trang nghiêm. Điều làm nên sự kỳ thú độc nhất vô nhị của chùa Phước Kiển là từ năm 1992, trong các hố bom cũ cải tạo thành ao vuông quanh chùa bỗng xuất hiện loài sen khổng lồ (Victoria amazonica / Victoria regia). Vào mùa nước nổi, lá sen vua vươn rộng từ 2m đến hơn 3m, vành lá uốn cao như chiếc nia lớn với hệ gân dày đặc ở mặt dưới, có thể nâng đỡ người nặng từ 50–80kg đứng trên mặt nước. Hoa sen vua nở về đêm và đổi màu kỳ diệu từ trắng tinh khôi sang hồng tím trong suốt 3 ngày.",
    "audioScript": "Chào mừng quý du khách đến với Chùa Phước Kiển – ngôi cổ tự hơn 175 năm tuổi được mệnh danh là Chùa Lá Sen độc đáo bậc nhất miền Tây Nam Bộ. Từng bị bom đạn chiến tranh tàn phá năm 1966 vì là cơ sở nuôi giấu chiến sĩ cách mạng, những hố bom năm xưa quanh chùa nay đã hóa thành những hồ sen vuông phẳng lặng tượng trưng cho đất trời hòa hợp. Hãy nhìn xuống mặt hồ: những chiếc lá sen vua khổng lồ có đường kính lên tới hơn hai mét rưỡi, trổ hoa thơm ngát đổi màu theo từng khung giờ và đủ sức nâng đỡ một người trưởng thành đứng giữa mặt nước mênh mông.",
    "openingHours": "06:30 - 17:30 hàng ngày",
    "ticketPrice": 0,
    "note": "Vào cổng miễn phí; nếu du khách muốn trải nghiệm đứng trên lá sen vua chụp ảnh (khoảng 20.000 - 30.000 VNĐ/lượt hỗ trợ đặt mâm gỗ) nên đi vào mùa mưa hoặc mùa nước nổi từ tháng 7 đến tháng 11 âm lịch khi lá sen đạt đường kính lớn nhất.",
    "thumbnail": "/images/monuments/monument_14.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/7/70/Victoria_amazonica_001.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/14",
    "views": 6180,
    "qrScans": 1830,
    "coordinates": [
      10.195653,
      105.816906
    ],
    "lat": 10.195653,
    "lon": 105.816906,
    "gallery": [
      "/images/monuments/monument_14.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Victoria_amazonica_001.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Victoria_amazonica_002.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Victoria_amazonica_flower_head.jpg"
    ]
  },
  {
    "id": 15,
    "name": "Khu căn cứ kháng chiến Bình Thành",
    "otherName": "Di tích lịch sử Quốc gia Địa điểm Vụ thảm sát Bình Thành",
    "ranking": "Quốc gia",
    "decisionYear": "2004 (Quyết định số 02/2004/QĐ-BVHTT ngày 19/01/2004 của Bộ Văn hóa - Thông tin)",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Thanh Bình",
    "address": "Ấp Bình Hòa, Xã Bình Thành (giáp Thị trấn Thanh Bình), Huyện Thanh Bình, Tỉnh Đồng Tháp",
    "history": "Khu căn cứ kháng chiến Bình Thành và Di tích lịch sử Quốc gia Địa điểm Vụ thảm sát Bình Thành tọa lạc bên bờ sông Tiền thuộc địa bàn xã Bình Thành – thị trấn Thanh Bình, huyện Thanh Bình, tỉnh Đồng Tháp. Trong hai cuộc kháng chiến cứu nước, Bình Thành là vùng căn cứ cách mạng kiên trung, nơi nhân dân một lòng nuôi giấu cán bộ và xây dựng lực lượng vũ trang ven sông Tiền. Ngay sau khi Hiệp định Genève được ký kết và lực lượng kháng chiến tập kết ra Bắc, vào tháng 11 năm 1954 (đỉnh điểm là các ngày 11 và 12/11/1954), tiểu đoàn bảo an của đối phương đã mở cuộc càn quét, bắt bớ hàng trăm đồng bào kháng chiến và người dân vô tội tại Bình Thành, tra khảo dã man và sát hại 34 người, vùi lấp tại các hố chôn tập thể ven sông. Sự kiện gây chấn động dư luận, buộc Ủy hội Quốc tế giám sát đình chiến phải trực tiếp điều tra và kết luận hành vi vi phạm Hiệp định Genève. Để tưởng nhớ đồng bào đã ngã xuống và giáo dục truyền thống bất khuất, Khu đài tưởng niệm và nhà bia Bình Thành đã được xây dựng trang nghiêm và được Bộ Văn hóa - Thông tin xếp hạng Di tích lịch sử cấp Quốc gia ngày 19/01/2004.",
    "audioScript": "Quý vị đang có mặt tại Khu di tích lịch sử Bình Thành thuộc huyện Thanh Bình, tỉnh Đồng Tháp – một địa chỉ đỏ khắc ghi ý chí kiên cường và sự hy sinh bất khuất của nhân dân vùng ven sông Tiền. Mùa đông tháng 11 năm 1954, chỉ ít ngày sau khi những chuyến tàu tập kết rời bến, mảnh đất Bình Thành đã chứng kiến cuộc đấu tranh giữ gìn hòa bình thấm đẫm máu đào của 34 đồng bào yêu nước. Ngày nay, tượng đài và nhà bia tưởng niệm Bình Thành uy nghiêm giữa rặng cây xanh là nơi nhắc nhở các thế hệ hôm nay về giá trị thiêng liêng của độc lập, tự do.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Điểm di tích lịch sử tưởng niệm trang nghiêm; các đoàn học sinh, sinh viên và tổ chức về nguồn có thể liên hệ trước để tổ chức lễ dâng hương.",
    "thumbnail": "/images/monuments/monument_15.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/%C4%90%E1%BB%93ng_Th%C3%A1p_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%283%29.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/15",
    "views": 6300,
    "qrScans": 1875,
    "coordinates": [
      10.53784,
      105.53971
    ],
    "lat": 10.53784,
    "lon": 105.53971,
    "gallery": [
      "/images/monuments/monument_15.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/%C4%90%E1%BB%93ng_Th%C3%A1p_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%283%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/%C4%90%E1%BB%93ng_Th%C3%A1p_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%284%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/71/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%285%29.jpg"
    ]
  },
  {
    "id": 16,
    "name": "Đình Tân Phú Trung",
    "otherName": "Đình thần Tân Phú Trung",
    "ranking": "Quốc gia",
    "decisionYear": "2012 (Quyết định xếp hạng Di tích kiến trúc nghệ thuật cấp Quốc gia ngày 06/06/2012; cấp tỉnh năm 2006)",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Châu Thành",
    "address": "Quốc lộ 80, Ấp Tân Phú, Xã Tân Phú Trung, Huyện Châu Thành, Tỉnh Đồng Tháp",
    "history": "Đình Tân Phú Trung tọa lạc ven Quốc lộ 80 bên dòng sông Ngã Cái, thuộc ấp Tân Phú, xã Tân Phú Trung, huyện Châu Thành, tỉnh Đồng Tháp. Ngôi đình được khởi dựng vào khoảng năm 1853 gắn liền với công cuộc khai hoang lập ấp của cư dân vùng Sa Đéc – Châu Thành xưa, và vinh dự được vua Tự Đức ban sắc phong Thần Thành Hoàng Bổn Cảnh vào năm 1854. Trải qua đợt trùng tu lớn đầu thế kỷ XX, Đình Tân Phú Trung trở thành một kiệt tác kiến trúc đình làng Nam Bộ trên khuôn viên rộng khoảng 3.000 m². Tổng thể công trình mang bố cục 'trùng thiềm điệp ốc' và 'thượng lầu hạ hiên' gồm ba gian nhà nối tiếp kiểu sắp đọi. Mái đình lợp ngói âm dương cổ kính, trên bờ nóc trang trí quần thể tiểu tượng gốm sứ men màu tinh xảo như Lưỡng long tranh châu, Cá hóa long, Bát tiên và Lân mẫu tử. Bên trong chánh điện, hệ thống cột gỗ lim, gỗ căm xe cùng hàng chục bức hoành phi, câu đối, bao lam chạm lộng đề tài Tứ linh, Tứ quý được sơn son thếp vàng rực rỡ. Ngày 06/06/2012, Bộ Văn hóa, Thể thao và Du lịch đã xếp hạng Đình Tân Phú Trung là Di tích kiến trúc nghệ thuật cấp Quốc gia.",
    "audioScript": "Chào mừng quý khách đến thăm Đình Tân Phú Trung – Di tích Kiến trúc Nghệ thuật cấp Quốc gia nằm bên dòng sông Ngã Cái hiền hòa thuộc huyện Châu Thành, tỉnh Đồng Tháp. Được tạo lập từ năm 1853 và đón nhận sắc phong của vua Tự Đức năm 1854, ngôi đình là một bảo tàng sống động về nghệ thuật điêu khắc gỗ và kiến trúc đình làng Nam Bộ. Xin mời quý khách ngước nhìn mái ngói âm dương cổ kính với cụm tượng gốm Lưỡng long tranh châu trên đỉnh nóc, và bước vào không gian nội điện uy nghiêm ngập tràn sắc vàng son của những bức bao lam, hoành phi chạm trổ tinh xảo có tuổi đời hơn một thế kỷ.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Lễ hội Kỳ Yên truyền thống diễn ra vào trung tuần tháng 4 hoặc tháng 5 âm lịch hàng năm với nghi thức tế thần và hát bội cổ truyền đặc sắc.",
    "thumbnail": "/images/monuments/monument_16.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2f/%C4%90%C3%ACnh_th%E1%BA%A7n_Phan_Thanh_Gi%E1%BA%A3n.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/16",
    "views": 6420,
    "qrScans": 1920,
    "coordinates": [
      10.254852,
      105.748443
    ],
    "lat": 10.254852,
    "lon": 105.748443,
    "gallery": [
      "/images/monuments/monument_16.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/%C4%90%C3%ACnh_th%E1%BA%A7n_Phan_Thanh_Gi%E1%BA%A3n.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/B%C3%A0n_th%E1%BB%9D_Th%E1%BA%A7n_ho%C3%A0ng_trong_%C4%91%C3%ACnh_Ch%C3%AD_H%C3%B2a.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/%C4%90%C3%ACnh_th%E1%BA%A7n_Ph%C6%B0%E1%BB%9Bc_H%C6%B0ng.jpg"
    ]
  },
  {
    "id": 17,
    "name": "Chùa Hưng Thiền",
    "otherName": "Hưng Thiền Cổ Tự / Đạo tràng Tịnh Độ Mỹ Hội",
    "ranking": "Điểm du lịch/Làng nghề",
    "decisionYear": "Thế kỷ XVIII (Cổ tự hơn 250 năm tuổi; trung tâm văn hóa tâm linh và từ thiện tiêu biểu huyện Cao Lãnh)",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Cao Lãnh",
    "address": "Quốc lộ 30 (gần Cầu Long Ẩn), Ấp Mỹ Thới, Xã Mỹ Hội, Huyện Cao Lãnh, Tỉnh Đồng Tháp",
    "history": "Chùa Hưng Thiền tọa lạc bên trục Quốc lộ 30 thuộc xã Mỹ Hội, huyện Cao Lãnh, tỉnh Đồng Tháp. Với lịch sử hình thành từ thế kỷ XVIII (khoảng hơn 250 năm tuổi), Hưng Thiền Cổ Tự là một trong những ngôi chùa lâu đời và có quy mô tu học lớn nhất tại vùng đất Sen Hồng. Trải qua nhiều biến cố lịch sử và các đợt đại trùng tu dưới thời Thượng tọa Thích Phước Đức và Ni sư Thích Nữ Như Lan, ngôi chùa ngày nay sở hữu khuôn viên rộng lớn, thanh tịnh giữa vùng quê trù phú. Kiến trúc Chánh điện uy nghiêm mang đậm phong cách Phật giáo truyền thống Nam Bộ với hệ mái đao uốn cong chạm khắc hoa văn rồng phượng. Điểm nhấn tâm linh đặc biệt bên trong Chánh điện là tôn tượng Đức Phật A Di Đà khổng lồ được đúc bằng đồng nguyên khối với thần thái từ bi, uy nghi, xung quanh tường là hệ thống phù điêu chạm nổi tái hiện sinh động cuộc đời Đức Phật Thích Ca Mâu Ni. Hiện nay, chùa Hưng Thiền là đạo tràng tu học thường xuyên của hơn 300 chư Ni và hàng ngàn Phật tử, đồng thời nổi tiếng với phòng thuốc Nam từ thiện và các hoạt động an sinh xã hội khắp miền Tây.",
    "audioScript": "Xin kính chào quý Phật tử và du khách thập phương đang viếng thăm Chùa Hưng Thiền tại xã Mỹ Hội, huyện Cao Lãnh. Trải qua hơn hai thế kỷ rưỡi hiện diện cùng lịch sử khai mở vùng đất Cao Lãnh, Chùa Hưng Thiền hiện lên như một chốn thiền môn thanh tịnh giữa sắc xanh của ruộng đồng và vườn cây ăn trái. Bước qua cổng tam quan vào ngôi chánh điện uy nghiêm, quý vị sẽ được chiêm bái tôn tượng Đức Phật A Di Đà đúc bằng đồng nguyên khối trầm mặc và lắng nghe tiếng chuông chùa ngân vang, tìm lại sự an nhiên, tĩnh tại trong tâm hồn.",
    "openingHours": "06:00 - 18:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Chùa là nơi tu học tịnh độ của hàng trăm chư Ni, du khách cần ăn mặc kín đáo, đi nhẹ nói khẽ; đại lễ lớn nhất trong năm là Lễ vía Đức Phật A Di Đà (17/11 âm lịch).",
    "thumbnail": "/images/monuments/monument_17.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Qu%E1%BB%91c_l%E1%BB%99_30%2C_%C4%91o%E1%BA%A1n_qua_huy%E1%BB%87n_Cao_L%C3%A3nh%2C_%C4%90%E1%BB%93ng_Th%C3%A1p.JPG",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/17",
    "views": 6540,
    "qrScans": 1965,
    "coordinates": [
      10.4102,
      105.7205
    ],
    "lat": 10.4102,
    "lon": 105.7205,
    "gallery": [
      "/images/monuments/monument_17.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Qu%E1%BB%91c_l%E1%BB%99_30%2C_%C4%91o%E1%BA%A1n_qua_huy%E1%BB%87n_Cao_L%C3%A3nh%2C_%C4%90%E1%BB%93ng_Th%C3%A1p.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/5/52/H%E1%BB%93_sen_ch%C3%B9a_La_H%C3%A1n_-_S%C3%B3c_Tr%C4%83ng.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/71/%C4%90%E1%BB%93ng_Th%C3%A1p_%28h%E1%BB%93_sen%29_ng%C3%A0y_31_th%C3%A1ng_3_n%C4%83m_2014_%285%29.jpg"
    ]
  },
  {
    "id": 18,
    "name": "Đình Long Thuận",
    "otherName": "Đình thần Cù lao Long Thuận",
    "ranking": "Quốc gia",
    "decisionYear": "2009 (Xếp hạng Di tích kiến trúc nghệ thuật năm 2009; khởi dựng năm 1876, vua Bảo Đại ban sắc thần năm 1936)",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Hồng Ngự",
    "address": "Ấp Long Thới B, Xã cù lao Long Thuận (nay là Xã Long Phú Thuận), Huyện Hồng Ngự, Tỉnh Đồng Tháp",
    "history": "Đình Long Thuận tọa lạc trên dải đất cù lao Long Thuận trù phú nằm giữa dòng sông Tiền, thuộc huyện Hồng Ngự, tỉnh Đồng Tháp. Ngôi đình được các bậc tiền hiền khai hoang cù lao khởi dựng lần đầu vào năm 1876 và được đại trùng tu kiên cố bằng gỗ quý vào năm 1930. Năm 1936, đình vinh dự được vua Bảo Đại ban sắc phong Thần Thành Hoàng Bổn Cảnh. Trong thời kỳ kháng chiến chống thực dân Pháp, Đình Long Thuận từng là trụ sở làm việc của Ủy ban kháng chiến hành chính và là điểm hội họp của lực lượng Việt Minh trên vùng cù lao biên giới. Công trình mang đậm phong cách kiến trúc nghệ thuật đình làng Nam Bộ với kết cấu bộ khung gỗ lim vững chãi, mái ngói cổ kính gồm khu võ ca, võ quy và chánh điện trang nghiêm lưu giữ nhiều hoành phi, câu đối và lộ bộ chạm khắc tinh xảo. Khuôn viên đình còn nổi tiếng với những cổ thụ hàng trăm năm tuổi gắn liền với lịch sử mở đất cù lao. Cùng với cụm đình cổ vùng cù lao Hồng Ngự được xếp hạng di tích năm 2009, Đình Long Thuận là điểm nhấn văn hóa tâm linh đặc sắc với Lễ hội Kỳ Yên và nghệ thuật hát bội truyền thống hàng năm.",
    "audioScript": "Chào mừng quý du khách đặt chân lên Cù lao Long Thuận giữa dòng sông Tiền mênh mông để viếng thăm ngôi cổ đình gần 150 năm tuổi – Đình thần Long Thuận, huyện Hồng Ngự. Được khởi dựng từ năm 1876 và trùng tu kiên cố năm 1930, ngôi đình không chỉ lưu giữ bản sắc phong của vua Bảo Đại năm 1936 cùng hệ thống kèo cột gỗ quý chạm khắc tinh xảo, mà còn là chứng nhân lịch sử từng làm trụ sở chính quyền cách mạng thời kháng chiến chống Pháp. Giữa tiếng sóng vỗ hiền hòa của vùng cù lao đầu nguồn, mái đình cổ vẫn sừng sững che chở cho cuộc sống bình yên của cư dân miền biên viễn.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Thuận tiện kết hợp tham quan tuyến du lịch sinh thái Cù lao Long Thuận - Làng nghề dệt choàng Long Khánh trên dòng sông Tiền.",
    "thumbnail": "/images/monuments/monument_18.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a1/%C4%90%C3%ACnh_th%E1%BA%A7n_Ph%C6%B0%E1%BB%9Bc_H%C6%B0ng.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/18",
    "views": 6660,
    "qrScans": 2010,
    "coordinates": [
      10.755962,
      105.309619
    ],
    "lat": 10.755962,
    "lon": 105.309619,
    "gallery": [
      "/images/monuments/monument_18.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/%C4%90%C3%ACnh_th%E1%BA%A7n_Ph%C6%B0%E1%BB%9Bc_H%C6%B0ng.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/27/%C4%90%C3%ACnh_th%E1%BA%A7n_Giao_Kh%E1%BA%A9u.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/B%C3%A0n_th%E1%BB%9D_Th%E1%BA%A7n_ho%C3%A0ng_trong_%C4%91%C3%ACnh_Ch%C3%AD_H%C3%B2a.jpg"
    ]
  },
  {
    "id": 19,
    "name": "Đình Phú Mỹ",
    "otherName": "Đình thần Phú Mỹ - Phú Lợi (Cụm đình cổ Thanh Bình)",
    "ranking": "Cấp tỉnh",
    "decisionYear": "2012 (Di tích lịch sử - văn hóa cấp tỉnh; khởi dựng từ thế kỷ XIX thời nhà Nguyễn)",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Thanh Bình",
    "address": "Tuyến Tân Thạnh - Phú Lợi, Xã Phú Lợi, Huyện Thanh Bình, Tỉnh Đồng Tháp",
    "history": "Đình Phú Mỹ (gắn liền với không gian văn hóa đình làng cổ xã Phú Lợi và vùng phụ cận Phú Mỹ – Tân Phú thuộc huyện Thanh Bình, tỉnh Đồng Tháp) là một công trình tín ngưỡng dân gian lâu đời của cư dân vùng thượng nguồn sông Tiền và rìa phía Tây vùng Đồng Tháp Mười. Ngôi đình được các bậc tiền hiền dựng lên từ thế kỷ XIX dưới triều Nguyễn trong quá trình khai phá vùng đất ven sông Tiền để thờ phụng Thần Thành Hoàng Bổn Cảnh, Tiền hiền khai khẩn, Hậu hiền khai cơ có công lập ấp, đắp đê ngăn lũ. Kiến trúc đình mang phong cách truyền thống của đình làng Nam Bộ với mái ngói đỏ vảy cá, bờ nóc đắp nổi hình tượng lưỡng long chầu nguyệt, bên trong chính điện quy tụ hệ thống cột gỗ tròn vững chắc cùng các ban thờ Hội đồng, ban thờ Thần Nông, Tiên Sư và các bức hoành phi sơn son thếp vàng cổ kính. Trải qua thời gian, ngôi đình vẫn giữ trọn vai trò là trung tâm sinh hoạt văn hóa tâm linh của nhân dân huyện Thanh Bình với lễ hội Kỳ Yên, lễ Thượng điền, Hạ điền và nghi thức Nghinh Thần tuần du cầu cho mưa thuận gió hòa, mùa màng bội thu.",
    "audioScript": "Chào mừng quý du khách đến với Đình Phú Mỹ tại xã Phú Lợi, huyện Thanh Bình, tỉnh Đồng Tháp. Nằm giữa vùng đất trù phú ven sông Tiền và cánh đồng Thanh Bình mênh mông, ngôi đình là biểu tượng cho tinh thần đoàn kết và lòng biết ơn tổ tiên của những lưu dân đi mở đất từ thế kỷ XIX. Mỗi độ vào mùa lễ hội Kỳ Yên, tiếng trống chầu, tiếng nhạc lễ và nghi thức rước sắc Thần Thành Hoàng tuần du qua các xóm ấp lại vang lên rộn rã, tái hiện sống động mạch nguồn văn hóa đình làng Nam Bộ suốt bao thế hệ.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Tự do tham quan; dịp lễ Kỳ Yên hàng năm có nghi thức Nghinh Thần tuần du và lễ tế Tiền hiền khai khẩn rất trang trọng.",
    "thumbnail": "/images/monuments/monument_19.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/2/27/%C4%90%C3%ACnh_th%E1%BA%A7n_Giao_Kh%E1%BA%A9u.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/19",
    "views": 6780,
    "qrScans": 2055,
    "coordinates": [
      10.614661,
      105.473081
    ],
    "lat": 10.614661,
    "lon": 105.473081,
    "gallery": [
      "/images/monuments/monument_19.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/27/%C4%90%C3%ACnh_th%E1%BA%A7n_Giao_Kh%E1%BA%A9u.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ch%C3%ADnh_%C4%91i%E1%BB%87n_Dinh_B%C3%A0_Th%E1%BB%A7y_Long_Th%C3%A1nh_M%E1%BA%ABu.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/%C4%90%C3%ACnh_th%E1%BA%A7n_Phan_Thanh_Gi%E1%BA%A3n.jpg"
    ]
  },
  {
    "id": 20,
    "name": "Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung",
    "otherName": "Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung",
    "ranking": "Quốc gia",
    "decisionYear": "2004 (Quyết định số 02/2004/QĐ-BVHTT ngày 19/01/2004 của Bộ Văn hóa - Thông tin)",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Tân Hồng",
    "address": "Ấp Gò Quản Cung, Xã An Phước, Huyện Tân Hồng, Tỉnh Đồng Tháp",
    "history": "Khu di tích lịch sử Chiến thắng Giồng Thị Đam – Gò Quản Cung tọa lạc tại xã An Phước, huyện Tân Hồng, tỉnh Đồng Tháp. Nơi đây ghi dấu trận đánh lịch sử vang dội diễn ra vào ngày 26/09/1959 (nhằm ngày 24/08 năm Kỷ Hợi) giữa mùa nước nổi trên cánh đồng lầy vùng biên giới Đồng Tháp Mười. Trong trận ra quân đầu tiên ngay sau khi thành lập, chỉ với 42 cán bộ, chiến sĩ của Đại đội 274 (tiền thân của Tiểu đoàn 502 anh hùng thuộc tỉnh Kiến Phong) cùng lực lượng du kích địa phương và vũ khí thô sơ, quân ta đã vận dụng chiến thuật phục kích vận động trên đồng nước đầy mưu trí, tiêu diệt và đánh thiệt hại nặng một cánh quân chủ lực cấp trung đoàn của địch, thu hàng trăm súng đạn. Chiến thắng Giồng Thị Đam – Gò Quản Cung được lịch sử ví như 'tiếng sấm đầu mùa' làm nức lòng nhân dân miền Nam, mở màn cho cao trào Đồng Khởi vũ trang rộng khắp vùng Đồng Tháp Mười (1959–1960). Ngày 19/01/2004, Bộ Văn hóa - Thông tin đã xếp hạng địa điểm này là Di tích lịch sử cấp Quốc gia với quần thể tượng đài chiến thắng uy nghiêm và nhà trưng bày truyền thống.",
    "audioScript": "Chào mừng quý khách đến với Khu di tích lịch sử Quốc gia Chiến thắng Giồng Thị Đam – Gò Quản Cung tại xã An Phước, huyện Tân Hồng, tỉnh Đồng Tháp. Giữa cánh đồng nước mênh mông của vùng Đồng Tháp Mười ngày 26 tháng 9 năm 1959, 42 cán bộ chiến sĩ Tiểu đoàn 502 tỉnh Kiến Phong trong trận đầu ra quân đã lập nên kỳ tích lẫy lừng, đánh bại cuộc càn quét của cả một trung đoàn địch. Chiến công ấy đã vang vọng như tiếng sấm đầu mùa báo hiệu bão táp Đồng Khởi trên toàn miền Nam. Xin mời quý khách tham quan Tượng đài Chiến thắng và nhà trưng bày sa bàn để cảm nhận trọn vẹn hào khí bất diệt của cha ông.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Khu di tích có nhà trưng bày sa bàn trận đánh, hiện vật vũ khí của Tiểu đoàn 502 và tượng đài tưởng niệm ngoài trời rộng rãi, miễn phí tham quan.",
    "thumbnail": "/images/monuments/monument_20.jpg",
    "wikimediaUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/%C4%90%E1%BB%93ng_C%E1%BB%8F_%E1%BB%9F_%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di.jpg",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/20",
    "views": 6900,
    "qrScans": 2100,
    "coordinates": [
      10.816775,
      105.505171
    ],
    "lat": 10.816775,
    "lon": 105.505171,
    "gallery": [
      "/images/monuments/monument_20.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/%C4%90%E1%BB%93ng_C%E1%BB%8F_%E1%BB%9F_%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/%C4%90%E1%BB%93ng_Th%C3%A1p_M%C6%B0%E1%BB%9Di_nh%C3%ACn_tr%C3%AAn_cao.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/A_field_in_Dong_Thap_province%2C_near_Highway_1A.jpg"
    ]
  }
];
