// Dữ liệu 20 Di tích Văn hóa - Lịch sử tỉnh Đồng Tháp (Đất Sen Hồng)
// Trích xuất từ Hệ thống GIS Đồng Tháp: D:\KLTN24\gis_data\Toa_Do\02_DiTich_DongThap.geojson
// Lưu ý tọa độ: Leaflet sử dụng [lat, lon], trong khi GeoJSON sử dụng [lon, lat]

export const DONG_THAP_BOUNDS = {
  minLat: 10.10,
  maxLat: 10.95,
  minLon: 105.15,
  maxLon: 105.95,
  center: [10.455, 105.635], // [lat, lon] trung tâm tỉnh Đồng Tháp
  defaultZoom: 10,
};

export const DISTRICTS = [
  "Tất cả Huyện/TP",
  "TP. Cao Lãnh",
  "TP. Sa Đéc",
  "TP. Hồng Ngự",
  "Huyện Cao Lãnh",
  "Huyện Tháp Mười",
  "Huyện Châu Thành",
  "Huyện Lai Vung",
  "Huyện Lấp Vò",
  "Huyện Tam Nông",
  "Huyện Tân Hồng",
  "Huyện Thanh Bình",
];

export const RANKINGS = [
  "Tất cả cấp hạng",
  "Quốc gia đặc biệt",
  "Quốc gia",
  "Cấp tỉnh",
];

export const CATEGORIES = [
  "Tất cả loại hình",
  "Lịch sử - Cách mạng",
  "Khảo cổ - Kiến trúc",
  "Tôn giáo - Tín ngưỡng",
  "Danh lam thắng cảnh",
];

export const INITIAL_MONUMENTS = [
  {
    "id": 1,
    "name": "Khu di tích Nguyễn Sinh Sắc",
    "otherName": "Lăng Cụ Phó bảng Nguyễn Sinh Sắc",
    "ranking": "Quốc gia",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "123/1 Phạm Hữu Lầu, Phường 4, TP Cao Lãnh, Đồng Tháp",
    "history": "Khu di tích tưởng niệm Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), thân sinh Chủ tịch Hồ Chí Minh. Công trình có kiến trúc mái vòm cánh sen trắng cách điệu độc đáo, khu nhà sàn Bác Hồ và không gian làng Hòa An xưa tái hiện đời sống văn hóa cư dân Cao Lãnh đầu thế kỷ XX.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Trang phục lịch sự, giữ trật tự khi dâng hương tại khu mộ Cụ Phó bảng.",
    "thumbnail": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/1",
    "views": 4850,
    "qrScans": 1420,
    "coordinates": [
      10.4494,
      105.6295
    ],
    "lon": 105.6295,
    "lat": 10.4494,
    "gallery": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Khu di tích tưởng niệm Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), thân sinh Chủ tịch Hồ Chí Minh. Công trình có kiến trúc mái vòm cánh sen trắng cách điệu độc đáo, khu nhà sàn Bác Hồ và không gian làng Hòa An xưa tái hiện đời sống văn hóa cư dân Cao Lãnh đầu thế kỷ XX."
  },
  {
    "id": 2,
    "name": "Khu di tích khảo cổ Gò Tháp",
    "otherName": "Di tích Quốc gia đặc biệt Gò Tháp",
    "ranking": "Quốc gia đặc biệt",
    "category": "Khảo cổ - Văn hóa Óc Eo",
    "district": "Huyện Tháp Mười",
    "address": "Xã Tân Kiều và Mỹ Hòa, Huyện Tháp Mười, Đồng Tháp",
    "history": "Quần thể di tích Quốc gia đặc biệt kết hợp giá trị khảo cổ văn hóa Óc Eo (thế kỷ I - VII) với căn cứ kháng chiến của Thiên hộ Võ Duy Dương, Đốc binh Nguyễn Tấn Kiều và Xứ ủy Nam Bộ trong kháng chiến chống Pháp.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Khuyến khích nghe thuyết minh Audio Tour tại khu trưng bày hiện vật Óc Eo và Đền thờ Thiên Hộ Dương.",
    "thumbnail": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/2",
    "views": 6120,
    "qrScans": 1980,
    "coordinates": [
      10.5936,
      105.8153
    ],
    "lon": 105.8153,
    "lat": 10.5936,
    "gallery": [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Quần thể di tích Quốc gia đặc biệt kết hợp giá trị khảo cổ văn hóa Óc Eo (thế kỷ I - VII) với căn cứ kháng chiến của Thiên hộ Võ Duy Dương, Đốc binh Nguyễn Tấn Kiều và Xứ ủy Nam Bộ trong kháng chiến chống Pháp."
  },
  {
    "id": 3,
    "name": "Khu di tích Xẻo Quýt",
    "otherName": "Căn cứ Tỉnh ủy Kiến Phong (1960 - 1975)",
    "ranking": "Quốc gia",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Cao Lãnh",
    "address": "Xã Mỹ Long và Mỹ Hiệp, Huyện Cao Lãnh, Đồng Tháp",
    "history": "Căn cứ cách mạng của Tỉnh ủy Kiến Phong từ năm 1960 đến 1975 nằm ẩn mình dưới tán rừng tràm nguyên sinh rộng hơn 50ha với hệ thống công sự chữ Z, hầm bí mật và xuồng ba lá len lỏi qua kênh rạch.",
    "openingHours": "07:30 - 17:00 hàng ngày",
    "ticketPrice": 20000,
    "note": "Trải nghiệm đi xuồng ba lá xuyên rừng tràm cùng cô du kích dẫn đường.",
    "thumbnail": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/3",
    "views": 5340,
    "qrScans": 1650,
    "coordinates": [
      10.4222,
      105.7528
    ],
    "lon": 105.7528,
    "lat": 10.4222,
    "gallery": [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Căn cứ cách mạng của Tỉnh ủy Kiến Phong từ năm 1960 đến 1975 nằm ẩn mình dưới tán rừng tràm nguyên sinh rộng hơn 50ha với hệ thống công sự chữ Z, hầm bí mật và xuồng ba lá len lỏi qua kênh rạch."
  },
  {
    "id": 4,
    "name": "Nhà cổ Huỳnh Thủy Lê",
    "otherName": "Nhà cổ Người Tình (L'Amant)",
    "ranking": "Quốc gia",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "TP Sa Đéc",
    "address": "255A Nguyễn Huệ, Phường 2, TP Sa Đéc, Đồng Tháp",
    "history": "Ngôi nhà cổ xây dựng năm 1895 kết hợp hài hòa kiến trúc Đông - Tây (mái ngói âm dương truyền thống Nam Bộ và mặt tiền vòm Phục Hưng Pháp), gắn liền với tiểu thuyết nổi tiếng Người Tình của nữ văn sĩ Marguerite Duras.",
    "openingHours": "07:00 - 17:30 hàng ngày",
    "ticketPrice": 30000,
    "note": "Có thuyết minh viên tiếng Việt, Anh, Pháp tại điểm.",
    "thumbnail": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/4",
    "views": 5890,
    "qrScans": 2110,
    "coordinates": [
      10.2925,
      105.7618
    ],
    "lon": 105.7618,
    "lat": 10.2925,
    "gallery": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Ngôi nhà cổ xây dựng năm 1895 kết hợp hài hòa kiến trúc Đông - Tây (mái ngói âm dương truyền thống Nam Bộ và mặt tiền vòm Phục Hưng Pháp), gắn liền với tiểu thuyết nổi tiếng Người Tình của nữ văn sĩ Marguerite Duras."
  },
  {
    "id": 5,
    "name": "Chùa Kiến An Cung",
    "otherName": "Chùa Ông Quách",
    "ranking": "Quốc gia",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "TP Sa Đéc",
    "address": "Khóm 1, Phường 2, TP Sa Đéc, Đồng Tháp",
    "history": "Công trình kiến trúc cổ của cộng đồng người Hoa tỉnh Phúc Kiến xây dựng từ năm 1924 đến 1927 tại trung tâm Sa Đéc, nổi bật với nghệ thuật chạm khắc gỗ, ghép mảnh sành sứ tinh xảo theo bố cục chữ Công.",
    "openingHours": "06:30 - 18:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Nằm đối diện rạch Cái Sơn và gần Nhà cổ Huỳnh Thủy Lê, thuận tiện kết hợp tham quan đi bộ.",
    "thumbnail": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/5",
    "views": 3210,
    "qrScans": 940,
    "coordinates": [
      10.2932,
      105.7592
    ],
    "lon": 105.7592,
    "lat": 10.2932,
    "gallery": [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Công trình kiến trúc cổ của cộng đồng người Hoa tỉnh Phúc Kiến xây dựng từ năm 1924 đến 1927 tại trung tâm Sa Đéc, nổi bật với nghệ thuật chạm khắc gỗ, ghép mảnh sành sứ tinh xảo theo bố cục chữ Công."
  },
  {
    "id": 6,
    "name": "Vườn quốc gia Tràm Chim",
    "otherName": "Khu Ramsar thứ 2000 của thế giới",
    "ranking": "Quốc gia",
    "category": "Sinh thái - Danh thắng",
    "district": "Huyện Tam Nông",
    "address": "Khóm 4, Thị trấn Tràm Chim, Huyện Tam Nông, Đồng Tháp",
    "history": "Mô hình thu nhỏ của vùng đất ngập nước Đồng Tháp Mười rộng hơn 7.313ha, nơi bảo tồn hệ sinh thái rừng tràm, đồng cỏ năng kim và hơn 230 loài chim nước quý hiếm, đặc biệt là Sếu đầu đỏ (Grus antigone).",
    "openingHours": "06:00 - 18:00 hàng ngày",
    "ticketPrice": 60000,
    "note": "Thời điểm đẹp nhất ngắm chim và mùa nước nổi từ tháng 8 đến tháng 12 âm lịch.",
    "thumbnail": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/6",
    "views": 4980,
    "qrScans": 1520,
    "coordinates": [
      10.7167,
      105.5167
    ],
    "lon": 105.5167,
    "lat": 10.7167,
    "gallery": [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Mô hình thu nhỏ của vùng đất ngập nước Đồng Tháp Mười rộng hơn 7.313ha, nơi bảo tồn hệ sinh thái rừng tràm, đồng cỏ năng kim và hơn 230 loài chim nước quý hiếm, đặc biệt là Sếu đầu đỏ (Grus antigone)."
  },
  {
    "id": 7,
    "name": "Khu du lịch sinh thái Gáo Giồng",
    "otherName": "Ốc đảo xanh Gáo Giồng",
    "ranking": "Điểm du lịch/Làng nghề",
    "category": "Sinh thái - Danh thắng",
    "district": "Huyện Cao Lãnh",
    "address": "Ấp 6, Xã Gáo Giồng, Huyện Cao Lãnh, Đồng Tháp",
    "history": "Rừng tràm nguyên sinh rộng khoảng 1.700ha với sân chim tự nhiên lớn nhất vùng Đồng Tháp Mười, nơi hàng chục ngàn cá thể cò trắng, trích mồng đỏ, điên điển sinh sống quanh năm.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 30000,
    "note": "Lên đài quan sát cao 18m để ngắm toàn cảnh rừng tràm và đàn cò trắng bay về tổ.",
    "thumbnail": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/7",
    "views": 3850,
    "qrScans": 1180,
    "coordinates": [
      10.5333,
      105.6833
    ],
    "lon": 105.6833,
    "lat": 10.5333,
    "gallery": [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Rừng tràm nguyên sinh rộng khoảng 1.700ha với sân chim tự nhiên lớn nhất vùng Đồng Tháp Mười, nơi hàng chục ngàn cá thể cò trắng, trích mồng đỏ, điên điển sinh sống quanh năm."
  },
  {
    "id": 8,
    "name": "Làng hoa Sa Đéc",
    "otherName": "Làng hoa kiểng Tân Quy Đông",
    "ranking": "Điểm du lịch/Làng nghề",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "TP Sa Đéc",
    "address": "Đường Hoa Sa Đéc, Phường Tân Quy Đông, TP Sa Đéc, Đồng Tháp",
    "history": "Thủ phủ hoa kiểng hơn 100 năm tuổi bên bờ sông Tiền với hơn 2.000 chủng loại hoa kiểng độc đáo được trồng trên giàn cao trên mặt nước, tạo nên cảnh quan nông nghiệp du lịch đặc sắc của miền Tây.",
    "openingHours": "06:00 - 18:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Nhộn nhịp nhất vào dịp cận Tết Nguyên Đán và Lễ hội Hoa Xuân Sa Đéc.",
    "thumbnail": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/8",
    "views": 6450,
    "qrScans": 2340,
    "coordinates": [
      10.3111,
      105.7486
    ],
    "lon": 105.7486,
    "lat": 10.3111,
    "gallery": [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Thủ phủ hoa kiểng hơn 100 năm tuổi bên bờ sông Tiền với hơn 2.000 chủng loại hoa kiểng độc đáo được trồng trên giàn cao trên mặt nước, tạo nên cảnh quan nông nghiệp du lịch đặc sắc của miền Tây."
  },
  {
    "id": 9,
    "name": "Làng nghề dệt chiếu Định Yên",
    "otherName": "Chợ chiếu ma Định Yên",
    "ranking": "Quốc gia",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Lấp Vò",
    "address": "Xã Định Yên và Định An, Huyện Lấp Vò, Đồng Tháp",
    "history": "Di sản văn hóa phi vật thể quốc gia nổi tiếng với nghề dệt chiếu truyền thống hàng trăm năm tuổi bên bờ sông Hậu và nét văn hóa chợ chiếu họp về đêm dưới ánh đèn dầu độc đáo.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Điểm tham quan kết hợp trải nghiệm quy trình nhuộm lát, dệt chiếu thủ công và bối cảnh phim Lật Mặt 6.",
    "thumbnail": "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/9",
    "views": 3120,
    "qrScans": 890,
    "coordinates": [
      10.3347,
      105.5264
    ],
    "lon": 105.5264,
    "lat": 10.3347,
    "gallery": [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Di sản văn hóa phi vật thể quốc gia nổi tiếng với nghề dệt chiếu truyền thống hàng trăm năm tuổi bên bờ sông Hậu và nét văn hóa chợ chiếu họp về đêm dưới ánh đèn dầu độc đáo."
  },
  {
    "id": 10,
    "name": "Đền thờ Thượng tướng Trần Văn Năng",
    "otherName": "Lăng Ông Tiền quân Nguyễn Huỳnh Đức / Trần Văn Năng",
    "ranking": "Quốc gia",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Thanh Bình",
    "address": "Ấp Nam, Xã Tân Thạnh, Huyện Thanh Bình, Đồng Tháp",
    "history": "Di tích lịch sử văn hóa cấp Quốc gia thờ Thượng tướng Quận công Trần Văn Năng — danh tướng có công lớn trong việc bảo vệ biên cương Tây Nam và đào kênh Vĩnh Tế đầu thế kỷ XIX.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Lễ giỗ Thượng tướng tổ chức trang trọng hàng năm vào tháng 2 âm lịch.",
    "thumbnail": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/10",
    "views": 2150,
    "qrScans": 610,
    "coordinates": [
      10.5986,
      105.4542
    ],
    "lon": 105.4542,
    "lat": 10.5986,
    "gallery": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Di tích lịch sử văn hóa cấp Quốc gia thờ Thượng tướng Quận công Trần Văn Năng — danh tướng có công lớn trong việc bảo vệ biên cương Tây Nam và đào kênh Vĩnh Tế đầu thế kỷ XIX."
  },
  {
    "id": 11,
    "name": "Căn cứ Tỉnh ủy Kiến Phong (Thông Bình)",
    "otherName": "Khu di tích lịch sử Thông Bình",
    "ranking": "Cấp tỉnh",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Tân Hồng",
    "address": "Xã Thông Bình, Huyện Tân Hồng, Đồng Tháp",
    "history": "Địa điểm lịch sử ghi dấu hoạt động cách mạng tại vùng biên giới Tân Hồng trong giai đoạn kháng chiến bảo vệ biên giới Tây Nam và giải phóng dân tộc.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Tự do tham quan và tìm hiểu tư liệu lịch sử vùng biên giới Đồng Tháp.",
    "thumbnail": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/11",
    "views": 1420,
    "qrScans": 380,
    "coordinates": [
      10.9012,
      105.4235
    ],
    "lon": 105.4235,
    "lat": 10.9012,
    "gallery": [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Địa điểm lịch sử ghi dấu hoạt động cách mạng tại vùng biên giới Tân Hồng trong giai đoạn kháng chiến bảo vệ biên giới Tây Nam và giải phóng dân tộc."
  },
  {
    "id": 12,
    "name": "Bảo tàng Tỉnh Đồng Tháp",
    "otherName": "Nhà trưng bày Văn hóa Óc Eo & Lịch sử Đồng Tháp",
    "ranking": "Cấp tỉnh",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "226 Nguyễn Thái Học, Phường 4, TP Cao Lãnh, Đồng Tháp",
    "history": "Nơi lưu giữ hơn 30.000 hiện vật lịch sử, văn hóa, đặc biệt là bộ sưu tập vàng lá và tượng Phật gỗ thuộc nền văn hóa Óc Eo cùng ngôi nhà cổ kiến trúc Pháp xây dựng đầu thế kỷ XX.",
    "openingHours": "07:30 - 17:00 (Thứ 3 - Chủ Nhật)",
    "ticketPrice": 0,
    "note": "Miễn phí vé vào cổng, hỗ trợ đoàn học sinh - sinh viên nghiên cứu lịch sử địa phương.",
    "thumbnail": "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/12",
    "views": 2940,
    "qrScans": 870,
    "coordinates": [
      10.4561,
      105.6319
    ],
    "lon": 105.6319,
    "lat": 10.4561,
    "gallery": [
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Nơi lưu giữ hơn 30.000 hiện vật lịch sử, văn hóa, đặc biệt là bộ sưu tập vàng lá và tượng Phật gỗ thuộc nền văn hóa Óc Eo cùng ngôi nhà cổ kiến trúc Pháp xây dựng đầu thế kỷ XX."
  },
  {
    "id": 13,
    "name": "Tượng đài Tập kết ra Bắc năm 1954",
    "otherName": "Di tích Địa điểm Tập kết 1954 Cao Lãnh",
    "ranking": "Cấp tỉnh",
    "category": "Lịch sử - Cách mạng",
    "district": "TP Cao Lãnh",
    "address": "Bến Bắc Cao Lãnh, Phường 6, TP Cao Lãnh, Đồng Tháp",
    "history": "Công trình lịch sử bên bờ sông Tiền ghi dấu sự kiện 100 ngày tập kết chuyển quân ra miền Bắc năm 1954 của cán bộ, chiến sĩ và con em miền Nam theo Hiệp định Genève.",
    "openingHours": "Tự do tham quan 24/7",
    "ticketPrice": 0,
    "note": "Không gian quảng trường thoáng mát ven sông Tiền, thích hợp tham quan buổi chiều tối.",
    "thumbnail": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/13",
    "views": 2680,
    "qrScans": 790,
    "coordinates": [
      10.4358,
      105.6422
    ],
    "lon": 105.6422,
    "lat": 10.4358,
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Công trình lịch sử bên bờ sông Tiền ghi dấu sự kiện 100 ngày tập kết chuyển quân ra miền Bắc năm 1954 của cán bộ, chiến sĩ và con em miền Nam theo Hiệp định Genève."
  },
  {
    "id": 14,
    "name": "Chùa Phước Kiển (Chùa Lá Sen)",
    "otherName": "Chùa Sen Vua Châu Thành",
    "ranking": "Điểm du lịch/Làng nghề",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Châu Thành",
    "address": "Xã Hòa Tân, Huyện Châu Thành, Đồng Tháp",
    "history": "Ngôi chùa cổ thành lập trước năm 1847, từng là cơ sở nuôi giấu cách mạng và nổi tiếng khắp cả nước với hồ sen vua (Victoria regia) có đường kính lá lên tới 2m – 3m, có thể nâng đỡ người đứng trên mặt nước.",
    "openingHours": "06:30 - 17:30 hàng ngày",
    "ticketPrice": 0,
    "note": "Lá sen vua phát triển to và đẹp nhất vào mùa mưa và mùa nước nổi.",
    "thumbnail": "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/14",
    "views": 4120,
    "qrScans": 1340,
    "coordinates": [
      10.2189,
      105.8475
    ],
    "lon": 105.8475,
    "lat": 10.2189,
    "gallery": [
      "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Ngôi chùa cổ thành lập trước năm 1847, từng là cơ sở nuôi giấu cách mạng và nổi tiếng khắp cả nước với hồ sen vua (Victoria regia) có đường kính lá lên tới 2m – 3m, có thể nâng đỡ người đứng trên mặt nước."
  },
  {
    "id": 15,
    "name": "Khu căn cứ kháng chiến Bình Thành",
    "otherName": "Di tích Lịch sử Bình Thành",
    "ranking": "Cấp tỉnh",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Thanh Bình",
    "address": "Xã Bình Thành, Huyện Thanh Bình, Đồng Tháp",
    "history": "Chiến khu cách mạng quan trọng bên bờ sông Tiền của huyện Thanh Bình và tỉnh Kiến Phong trong hai cuộc kháng chiến cứu nước.",
    "openingHours": "07:30 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Phù hợp cho các chuyến về nguồn giáo dục truyền thống cách mạng.",
    "thumbnail": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/15",
    "views": 1530,
    "qrScans": 410,
    "coordinates": [
      10.5625,
      105.5122
    ],
    "lon": 105.5122,
    "lat": 10.5625,
    "gallery": [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Chiến khu cách mạng quan trọng bên bờ sông Tiền của huyện Thanh Bình và tỉnh Kiến Phong trong hai cuộc kháng chiến cứu nước."
  },
  {
    "id": 16,
    "name": "Đình Tân Phú Trung",
    "otherName": "Đình thần Tân Phú Trung",
    "ranking": "Cấp tỉnh",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Châu Thành",
    "address": "Quốc lộ 80, Xã Tân Phú Trung, Huyện Châu Thành, Đồng Tháp",
    "history": "Ngôi đình cổ tiêu biểu của vùng đất Nam Bộ lưu giữ sắc thần triều Nguyễn và nghệ thuật kiến trúc đình làng truyền thống gắn liền với quá trình khai hoang lập ấp vùng Sa Đéc - Châu Thành.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Lễ Kỳ Yên tổ chức định kỳ hàng năm với nghi thức hát bội truyền thống.",
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/16",
    "views": 1840,
    "qrScans": 520,
    "coordinates": [
      10.2614,
      105.8147
    ],
    "lon": 105.8147,
    "lat": 10.2614,
    "gallery": [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Ngôi đình cổ tiêu biểu của vùng đất Nam Bộ lưu giữ sắc thần triều Nguyễn và nghệ thuật kiến trúc đình làng truyền thống gắn liền với quá trình khai hoang lập ấp vùng Sa Đéc - Châu Thành."
  },
  {
    "id": 17,
    "name": "Chùa Hưng Thiền",
    "otherName": "Trung tâm Phật giáo tịnh độ cư sĩ Mỹ Hội",
    "ranking": "Điểm du lịch/Làng nghề",
    "category": "Làng nghề - Văn hóa truyền thống",
    "district": "Huyện Cao Lãnh",
    "address": "Xã Mỹ Hội, Huyện Cao Lãnh, Đồng Tháp",
    "history": "Một trong những ngôi chùa có khuôn viên rộng lớn và thanh tịnh giữa vùng quê Cao Lãnh, kết hợp hoạt động khám chữa bệnh từ thiện bằng thuốc Nam truyền thống.",
    "openingHours": "06:30 - 17:30 hàng ngày",
    "ticketPrice": 0,
    "note": "Giữ yên tĩnh tại khu vực khám thuốc Nam và chánh điện.",
    "thumbnail": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/17",
    "views": 1960,
    "qrScans": 560,
    "coordinates": [
      10.4842,
      105.7125
    ],
    "lon": 105.7125,
    "lat": 10.4842,
    "gallery": [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Một trong những ngôi chùa có khuôn viên rộng lớn và thanh tịnh giữa vùng quê Cao Lãnh, kết hợp hoạt động khám chữa bệnh từ thiện bằng thuốc Nam truyền thống."
  },
  {
    "id": 18,
    "name": "Đình Long Thuận",
    "otherName": "Đình thần Cù lao Long Thuận",
    "ranking": "Cấp tỉnh",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Hồng Ngự",
    "address": "Xã cù lao Long Thuận, Huyện Hồng Ngự, Đồng Tháp",
    "history": "Ngôi đình cổ nằm trên cù lao Long Thuận giữa dòng sông Tiền thuộc huyện biên giới Hồng Ngự, bảo tồn nguyên vẹn kiến trúc gỗ quý và các hoành phi câu đối cổ.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Kết hợp tham quan làng nghề dệt choàng Long Khánh trên cùng tuyến du lịch cù lao.",
    "thumbnail": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/18",
    "views": 1620,
    "qrScans": 440,
    "coordinates": [
      10.7689,
      105.3342
    ],
    "lon": 105.3342,
    "lat": 10.7689,
    "gallery": [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Ngôi đình cổ nằm trên cù lao Long Thuận giữa dòng sông Tiền thuộc huyện biên giới Hồng Ngự, bảo tồn nguyên vẹn kiến trúc gỗ quý và các hoành phi câu đối cổ."
  },
  {
    "id": 19,
    "name": "Đình Phú Mỹ",
    "otherName": "Đình thần Phú Mỹ Thanh Bình",
    "ranking": "Cấp tỉnh",
    "category": "Kiến trúc - Nghệ thuật",
    "district": "Huyện Thanh Bình",
    "address": "Xã Phú Lợi, Huyện Thanh Bình, Đồng Tháp",
    "history": "Di tích kiến trúc nghệ thuật cấp tỉnh mang đậm dấu ấn văn hóa tín ngưỡng thờ Thành Hoàng Bổn Cảnh của cư dân vùng thượng nguồn sông Tiền.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Tự do tham quan.",
    "thumbnail": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/19",
    "views": 1390,
    "qrScans": 360,
    "coordinates": [
      10.6311,
      105.4289
    ],
    "lon": 105.4289,
    "lat": 10.6311,
    "gallery": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Di tích kiến trúc nghệ thuật cấp tỉnh mang đậm dấu ấn văn hóa tín ngưỡng thờ Thành Hoàng Bổn Cảnh của cư dân vùng thượng nguồn sông Tiền."
  },
  {
    "id": 20,
    "name": "Khu di tích Chiến thắng Giồng Thị Đam - Gò Quản Cung",
    "otherName": "Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung",
    "ranking": "Quốc gia",
    "category": "Lịch sử - Cách mạng",
    "district": "Huyện Tân Hồng",
    "address": "Xã An Phước, Huyện Tân Hồng, Đồng Tháp",
    "history": "Di tích lịch sử cấp Quốc gia ghi dấu trận đánh lịch sử cuối tháng 9/1959 trên cánh đồng lầy Gò Quản Cung - Giồng Thị Đam, mở đầu cao trào Đồng Khởi vũ trang tại vùng Đồng Tháp Mười.",
    "openingHours": "07:00 - 17:00 hàng ngày",
    "ticketPrice": 0,
    "note": "Có nhà trưng bày sa bàn trận đánh và bia tưởng niệm liệt sĩ.",
    "thumbnail": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80",
    "qrUrl": "https://senmap.dongthap.gov.vn/di-tich/20",
    "views": 2380,
    "qrScans": 690,
    "coordinates": [
      10.8356,
      105.4892
    ],
    "lon": 105.4892,
    "lat": 10.8356,
    "gallery": [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
    ],
    "audioDuration": "04:25",
    "audioDescription": "Di tích lịch sử cấp Quốc gia ghi dấu trận đánh lịch sử cuối tháng 9/1959 trên cánh đồng lầy Gò Quản Cung - Giồng Thị Đam, mở đầu cao trào Đồng Khởi vũ trang tại vùng Đồng Tháp Mười."
  }
];
