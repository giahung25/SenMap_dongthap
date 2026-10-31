/**
 * =========================================================================================
 * BỘ DỮ LIỆU VĂN HÓA - DU LỊCH - TUYẾN CHỦ ĐỀ - HỘ CHIẾU DI SẢN ĐỒNG THÁP
 * =========================================================================================
 * Chuẩn ngữ học: UNESCO / Lonely Planet / Vietnam National Administration of Tourism (VNAT)
 * Song ngữ tự nhiên Việt - Anh (VI / EN) phục vụ:
 *   - Đề xuất 1: Tuyến Du Lịch Chủ Đề Đất Sen Hồng (Curated Cultural Trails)
 *   - Đề xuất 3: Hộ Chiếu Di Sản & Con Dấu Mộc Đỏ 20 Di Tích (Heritage Passport)
 *   - Đề xuất 5: Lịch 4 Mùa Du Lịch & Bản Đồ Ẩm Thực 12 Đặc Sản Quanh Di Tích
 * =========================================================================================
 */

export const CULTURAL_HERITAGE_METADATA = {
  "project": "SenMap Đồng Tháp — Di Sản & Du Lịch Văn Hóa",
  "version": "1.0.0",
  "created_at": "2026-10-31",
  "author": "Phan Trần Gia Hưng (MSSV: 0024417689)",
  "language_support": [
    "vi",
    "en"
  ],
  "standard": "UNESCO / Lonely Planet / Vietnam National Administration of Tourism (VNAT)",
  "total_monuments": 20,
  "total_trails": 4,
  "total_passport_tiers": 4,
  "total_seals": 20,
  "total_seasons": 4,
  "total_specialties": 12
};

export const HOMEPAGE_STORYTELLING = {
  "tagline_vi": "Đồng Tháp — Đất Sen Hồng: Thuần khiết như hồn sen, ngàn năm trầm tích lịch sử",
  "tagline_en": "Đồng Tháp — The Land of Pink Lotuses: As pure as the lotus soul, steeped in millennia of cultural heritage",
  "intro_story_vi": "Chào mừng bạn đến với Đồng Tháp — miền châu thổ Cửu Long nơi hương sen ngát bay khắp các cánh đồng Tháp Mười huyền thoại. Từ những đền đài cổ xưa của Vương quốc Phù Nam ngàn năm trước, đến những căn cứ kháng chiến chìm sâu trong rừng tràm bạt ngàn, và những làng nghề trăm năm ven hai dòng Tiền Giang, Hậu Giang. SenMap mở ra cánh cửa số hóa giúp bạn bước vào dòng chảy di sản sống động của vùng đất địa linh nhân kiệt.",
  "intro_story_en": "Welcome to Đồng Tháp — the heart of the Mekong Delta where the fragrant pink lotus blooms across the legendary Plain of Reeds. From the millennial brick sanctuaries of the maritime Fu-nan Kingdom to submerged guerrilla bases sheltered by vast melaleuca forests, and centuries-old artisan craft villages along the Tiền and Hậu rivers, SenMap opens a digital gateway for you to explore the living heritage of this storied land.",
  "folk_verse": {
    "original_vi": "Tháp Mười đẹp nhất bông sen\nViệt Nam đẹp nhất có tên Bác Hồ",
    "translation_en": "In the Plain of Reeds, fairest blooms the lotus flower;\nIn all of Vietnam, dearest shines the name of Uncle Hồ.",
    "author": "Bảo Định Giang (1946)",
    "meaning_vi": "Câu ca dao bất hủ kết tinh vẻ đẹp thanh cao của thiên nhiên Đất Sen Hồng hòa quyện cùng tấm lòng son sắt của nhân dân miền Nam đối với vị Cha già kính yêu của dân tộc.",
    "meaning_en": "An immortal verse that intertwines the pristine purity of the Pink Lotus Land with the profound devotion of Southern Vietnamese people toward the beloved father of the nation."
  },
  "pride_metrics": [
    {
      "id": "special-national",
      "metric": "02",
      "title_vi": "Di tích Quốc gia Đặc biệt",
      "title_en": "Special National Monuments",
      "desc_vi": "Khu di tích Nguyễn Sinh Sắc & Khu di tích Khảo cổ Gò Tháp",
      "desc_en": "Nguyễn Sinh Sắc Sanctuary & Gò Tháp Archaeological Sanctuary",
      "icon": "stars",
      "color": "#E11D48"
    },
    {
      "id": "world-ramsar",
      "metric": "#2000",
      "title_vi": "Khu Ramsar Thế giới thứ 2.000",
      "title_en": "World Ramsar Wetland Site #2000",
      "desc_vi": "Vườn Quốc gia Tràm Chim — ngôi nhà của loài Sếu đầu đỏ quý hiếm",
      "desc_en": "Tràm Chim National Park — natural sanctuary of the endangered Sarus Crane",
      "icon": "flutter_dash",
      "color": "#059669"
    },
    {
      "id": "flower-village",
      "metric": "100+",
      "title_vi": "Năm Làng Hoa Sa Đéc",
      "title_en": "Years of Sa Đéc Floral Heritage",
      "desc_vi": "Thủ phủ hoa kiểng miền Tây với kỹ thuật canh tác giàn treo độc nhất vô nhị",
      "desc_en": "Floral capital of southern Vietnam renowned for elevated trellis farming above waterways",
      "icon": "local_florist",
      "color": "#D97706"
    },
    {
      "id": "oceo-treasures",
      "metric": "1000+",
      "title_vi": "Cổ vật Óc Eo & Bảo vật Quốc gia",
      "title_en": "Óc Eo Relics & National Treasures",
      "desc_vi": "Trầm tích 1.700 năm của nền văn minh sông nước Phù Nam tại Tháp Mười",
      "desc_en": "1,700-year maritime legacy of the Fu-nan civilization in the Plain of Reeds",
      "icon": "history_edu",
      "color": "#0284C7"
    }
  ]
};

export const CULTURAL_TRAILS = [
  {
    "id": "trail-oceo",
    "code": "TRAIL-OCEO",
    "name_vi": "Dấu ấn Văn hóa Óc Eo & Tiền nhân Mở cõi",
    "name_en": "Footprints of the Óc Eo Civilization & Delta Pioneers",
    "subtitle_vi": "Hành trình ngược dòng thời gian khám phá vương quốc cổ Phù Nam và những bậc tiền nhân khai hoang mở đất",
    "subtitle_en": "A journey back through time exploring the ancient Fu-nan Kingdom and early Mekong pioneers",
    "theme_color": "#B45309",
    "badge_icon": "temple_hindu",
    "duration_vi": "1 - 2 Ngày",
    "duration_en": "1 - 2 Days",
    "best_transport_vi": "Ô tô / Xe máy kết hợp phà qua cù lao sông Tiền",
    "best_transport_en": "Car / Motorbike combined with local river ferries",
    "monument_ids": [
      2,
      10,
      19,
      18
    ],
    "story_vi": "Tuyến du lịch đưa bạn ngược dòng lịch sử hơn mười bảy thế kỷ về thời kỳ hưng thịnh của nền văn hóa Óc Eo và Vương quốc Phù Nam cổ đại. Khởi hành từ Gò Tháp — trung tâm tôn giáo và đô thị cổ giữa đầm lầy Tháp Mười, nơi lưu giữ những đền tháp gạch nung, tượng thần Vishnu bằng sa thạch nguyên khối và bia ký chữ Phạn cổ nhất miền Nam. Men theo dòng Tiền Giang xuôi về phía tây, hành trình dẫn đến Đền thờ Thượng tướng Trần Văn Năng bên vàm Đốc Vàng — vị danh tướng triều Nguyễn đã hiến dâng trọn đời mình bảo vệ biên cương Tây Nam. Tiếp nối là Đình làng cổ Phú Mỹ và Đình Long Thuận ngự trên dải cù lao xanh ngắt giữa sông Tiền, nơi lưu giữ trọn vẹn những bản sắc phong của vua Tự Đức năm 1852 và nghệ thuật chạm khắc gỗ lim trùng thềm điệp ốc tinh xảo của các bậc tiền nhân đi mở đất.",
    "story_en": "This curated trail carries travelers back over seventeen centuries into the golden era of the maritime Fu-nan Kingdom and early Mekong pioneers. Beginning at the monumental Gò Tháp Archaeological Sanctuary in the Plain of Reeds, visitors encounter ancient brick sanctums, monolithic sandstone icons of Vishnu, and 6th-century Sanskrit stelae. Downstream along the Tiền River, the trail pays homage to Grand General Trần Văn Năng at Đốc Vàng canal, a patriotic defender of the southwestern frontier during the early Nguyễn Dynasty. The expedition continues to the venerable Phú Mỹ and Long Thuận communal houses situated upon fertile Mekong silt islands, preserving authentic 1852 royal decrees bestowed by King Tự Đức and quintessential Southern Vietnamese ironwood timber craftsmanship.",
    "highlights_vi": [
      "Chiêm ngưỡng nền móng đền đài gạch Phù Nam thế kỷ I - VII tại Gò Tháp",
      "Tượng thần Vishnu bằng đá sa thạch và bia ký chữ Phạn cổ nhất miền Nam",
      "Chiêm bái Dinh Ông Đốc Vàng thờ Thượng tướng Trần Văn Năng bên ngã ba sông",
      "Khám phá không gian đình làng cổ Nam Bộ với kiến trúc gỗ lim và sắc phong triều Nguyễn tại Phú Mỹ & cù lao Long Thuận"
    ],
    "highlights_en": [
      "Marvel at 1st–7th century CE Fu-nan brick temple sanctums at Gò Tháp",
      "Inspect monolithic sandstone Vishnu statues and southern Vietnam's earliest Sanskrit stelae",
      "Pay homage to Grand General Trần Văn Năng at the scenic river confluence of Đốc Vàng",
      "Explore authentic Mekong communal houses featuring ironwood architecture and imperial royal edicts at Phú Mỹ & Long Thuận Island"
    ]
  },
  {
    "id": "trail-red",
    "code": "TRAIL-RED",
    "name_vi": "Hành trình Đỏ — Ký ức Đồng Tháp Mười",
    "name_en": "The Red Trail — Heroic Memories of the Plain of Reeds",
    "subtitle_vi": "Theo dấu chân cụ Phó bảng Nguyễn Sinh Sắc và những địa danh kháng chiến lẫy lừng giữa đầm lầy",
    "subtitle_en": "Tracing the footsteps of Scholar Nguyễn Sinh Sắc and legendary resistance redoubts in the wetlands",
    "theme_color": "#E11D48",
    "badge_icon": "flag",
    "duration_vi": "2 Ngày 1 Đêm",
    "duration_en": "2 Days 1 Night",
    "best_transport_vi": "Ô tô du lịch / Xe khách liên huyện",
    "best_transport_en": "Touring car / Inter-district coach",
    "monument_ids": [
      1,
      12,
      13,
      3,
      15,
      20,
      11
    ],
    "story_vi": "Hành trình Đỏ là bản hùng ca lịch sử sống động về lòng yêu nước kiên trung của quân dân Đồng Tháp qua hai cuộc kháng chiến vĩ đại. Bắt đầu từ Khu di tích Nguyễn Sinh Sắc tại trung tâm TP. Cao Lãnh — nơi yên nghỉ của thân sinh Bác Hồ với vòm mộ cánh sen trắng vươn mình ra chín đầu rồng uy nghiêm, du khách ghé thăm Bảo tàng Tỉnh trong khuôn viên Dinh Quận trưởng Pháp cổ và Tượng đài Tập kết 1954 bên bờ sông Tiền lịch sử. Tuyến đường tiếp tục đưa du khách đi xuồng ba lá xuyên qua căn cứ ngập nước bí mật Xẻo Quýt, viếng Di tích tưởng niệm vụ thảm sát Bình Thành, tượng đài Chiến thắng Giồng Thị Đam — Gò Quản Cung lừng lẫy mùa lũ 1959, và chốt chặn chiến lược Căn cứ Tỉnh ủy Kiến Phong tại Thông Bình nơi biên cương Tổ quốc.",
    "story_en": "The Red Trail is an evocative historical odyssey celebrating the unyielding courage of the people of Đồng Tháp across two monumental resistance wars. Starting at the sacred Nguyễn Sinh Sắc Memorial Complex in central Cao Lãnh City — where the father of President Hồ Chí Minh rests beneath an iconic lotus-petal dome crowned with nine dragons, the trail proceeds to the French colonial mansion of the Đồng Tháp Museum and the historic 1954 Regrouping to the North Monument. The journey penetrates deep into the heart of the Plain of Reeds via wooden sampans through the hidden wetland bunkers of Xẻo Quýt, honors peace martyrs at the Bình Thành memorial, stands on the flooded battlefield of Giồng Thị Đam, and reaches the remote borderland command post of Thông Bình.",
    "highlights_vi": [
      "Viếng vòm mộ cánh sen trắng Cụ Phó bảng Nguyễn Sinh Sắc và Làng Hòa An xưa",
      "Tìm hiểu 30.000 hiện vật lịch sử tại Dinh Tỉnh trưởng cũ — Bảo tàng Đồng Tháp",
      "Ghé bến phà Cao Lãnh lắng nghe bản hùng ca 100 ngày Tập kết ra Bắc 1954",
      "Đi xuồng ba lá len lỏi dưới tán tràm ngập nước khám phá căn cứ bí mật Xẻo Quýt",
      "Thắp hương tưởng niệm tại Di tích vụ thảm sát Bình Thành bên bờ sông Tiền",
      "Thăm tượng đài Giồng Thị Đam — Gò Quản Cung và căn cứ biên giới Thông Bình"
    ],
    "highlights_en": [
      "Visit the white lotus mausoleum of Deputy Scholar Nguyễn Sinh Sắc and historic Hòa An village",
      "Discover 30,000 artifacts in the former French colonial Governor's Mansion at Đồng Tháp Museum",
      "Reflect at Cao Lãnh Wharf on the emotional 100-day 1954 Regrouping to the North",
      "Glide on a wooden sampan beneath wild melaleuca canopies through the subterranean shelters of Xẻo Quýt",
      "Pay solemn tribute at the historic Bình Thành riverside memorial",
      "Stand on the legendary battlefield of Giồng Thị Đam and the borderland base of Thông Bình"
    ]
  },
  {
    "id": "trail-sadec",
    "code": "TRAIL-SADEC",
    "name_vi": "Trăm năm Phố cổ, Cổ tự & Làng nghề Ven sông Tiền",
    "name_en": "Centuries of Old Town, Sacred Temples & River Crafts",
    "subtitle_vi": "Giao thoa văn hóa Đông - Tây tại Sa Đéc, khám phá nghệ thuật kiến trúc cổ và tinh hoa làng nghề truyền thống",
    "subtitle_en": "Where East meets West in romantic Sa Đéc, celebrating historic architecture and living artisan crafts",
    "theme_color": "#059669",
    "badge_icon": "palette",
    "duration_vi": "1 - 2 Ngày",
    "duration_en": "1 - 2 Days",
    "best_transport_vi": "Ô tô / Xe máy / Xe đạp dạo phố hoa",
    "best_transport_en": "Car / Motorbike / Bicycle through flower alleys",
    "monument_ids": [
      4,
      5,
      8,
      16,
      14,
      9,
      17
    ],
    "story_vi": "Dọc theo bờ nam dòng Tiền Giang hiền hòa, tuyến du lịch Sa Đéc là bản hòa tấu lãng mạn giữa kiến trúc Pháp cổ, mỹ thuật truyền thống Phúc Kiến và bàn tay khéo léo của các nghệ nhân làng nghề miền sông nước. Điểm nhấn mở đầu là Nhà cổ Huỳnh Thủy Lê — chứng nhân của mối tình bất hủ trong tiểu thuyết 'Người Tình' của Marguerite Duras, tiếp nối bằng Chùa Kiến An Cung với mái ngói gợn sóng rồng bay gốm sứ độc nhất vô nhị. Du khách đắm mình giữa bạt ngàn hương sắc tại Làng hoa Sa Đéc với kỹ thuật giàn hoa trên mặt nước, ghé Đình Tân Phú Trung, trải nghiệm đứng trên lá sen vua khổng lồ tại Chùa Phước Kiển, khám phá huyền thoại 'chợ chiếu ma' Định Yên và chiêm ngưỡng tượng Bồ tát Quán Thế Âm cao 33 mét tại Chùa Hưng Thiền.",
    "story_en": "Meandering along the southern banks of the Tiền River, the Sa Đéc cultural trail is a romantic symphony bridging French colonial elegance, Southern Min Chinese artistry, and thriving riverine craft heritage. The trail begins at the Huỳnh Thủy Lê Ancient House, celebrated worldwide through Marguerite Duras's Prix Goncourt-winning novel 'The Lover', followed by Kiến An Cung Pagoda with its undulating ceramic wave-tile roofs. Travelers immerse themselves in Sa Đéc Flower Village where blossoms float above canal trellises, visit Tân Phú Trung Communal House, experience standing upon the giant Victoria water lily pads at Phước Kiển Pagoda, unravel the midnight lore of the Định Yên Sedge Mat Market, and admire the majestic 33-meter Avalokiteshvara statue at Hưng Thiền Monastery.",
    "highlights_vi": [
      "Sống lại mối tình tiểu thuyết 'Người Tình' (L'Amant) tại Nhà cổ Huỳnh Thủy Lê",
      "Chiêm ngưỡng mái ngói gợn sóng và điêu khắc gốm sứ độc nhất vô nhị tại Kiến An Cung",
      "Check-in thủ phủ hoa kiểng Sa Đéc với giàn hoa trên mặt nước bốn mùa khoe sắc",
      "Đứng trên lá sen vua khổng lồ chịu tải 70-80kg tại Chùa Phước Kiển",
      "Khám phá huyền thoại 'chợ chiếu ma' và xem nghệ nhân dệt chiếu thủ công Định Yên",
      "Hành hương chiêm bái tượng Bồ tát Quán Thế Âm cao 33m tại Chùa Hưng Thiền"
    ],
    "highlights_en": [
      "Relive Marguerite Duras's award-winning romance 'The Lover' in Huỳnh Thủy Lê Ancient House",
      "Admire undulating ceramic wave-tile roofs and Southern Min artistry at Kiến An Cung Pagoda",
      "Stroll through Sa Đéc Flower Village where vibrant blossoms sit on elevated canal trellises",
      "Stand atop the extraordinary giant King Lotus leaves capable of holding adult weight at Phước Kiển Pagoda",
      "Explore the legendary midnight 'Ghost Mat Market' and traditional weaving looms at Định Yên",
      "Gaze upon the magnificent 33-meter statue of Avalokiteshvara at Hưng Thiền Zen Monastery"
    ]
  },
  {
    "id": "trail-eco",
    "code": "TRAIL-ECO",
    "name_vi": "Mùa Nước Nổi & Rừng Tràm Xanh Bất Tận",
    "name_en": "Floating Water Season & The Endless Melaleuca Canopy",
    "subtitle_vi": "Khám phá vùng lõi ngập nước nội địa, ngắm đàn sếu đầu đỏ và hòa mình vào thiên nhiên hoang sơ Đồng Tháp Mười",
    "subtitle_en": "Journey into pristine delta wetlands, watch migrating Sarus cranes, and immerse in untouched nature",
    "theme_color": "#0284C7",
    "badge_icon": "water",
    "duration_vi": "2 Ngày 1 Đêm",
    "duration_en": "2 Days 1 Night",
    "best_transport_vi": "Ô tô kết hợp tắc ráng / xuồng máy sinh thái",
    "best_transport_en": "Vehicle combined with eco-motorboats & sampans",
    "monument_ids": [
      6,
      7,
      3
    ],
    "story_vi": "Tuyến du lịch sinh thái đặc sắc đưa bạn vào sâu trong lòng vùng trũng Đồng Tháp Mười, nơi con nước nổi hàng năm mang theo phù sa và nguồn lợi thủy sản trù phú nuôi dưỡng hệ sinh quyển độc đáo. Trọng tâm của tuyến là Vườn Quốc gia Tràm Chim — Khu Ramsar thứ 2.000 của thế giới với hơn 7.300 ha tràm, sen và đồng lúa ma, nơi cư trú của loài Sếu đầu đỏ quý hiếm nằm trong Sách đỏ thế giới. Du khách tiếp tục di chuyển về Khu du lịch sinh thái Gáo Giồng để ngắm toàn cảnh rừng tràm bạt ngàn từ đài quan sát cao 18 mét, thưởng thức đặc sản cá lóc nướng trui cuốn lá sen non giữa lung sen ngát hương, và kết thúc bằng chuyến thám hiểm rừng tràm nguyên sinh Xẻo Quýt trầm mặc rêu phong.",
    "story_en": "This ecological trail penetrates deep into the heart of the Plain of Reeds, where annual Mekong floodwaters bestow nutrient-rich alluvial silt and extraordinary biodiversity. The centerpiece is Tràm Chim National Park — the world's 2,000th Ramsar Site encompassing 7,313 hectares of wild lotus marshes, floating rice fields, and melaleuca woodlands sheltering the iconic Sarus Crane. Travelers venture onward to Gáo Giồng Ecotourism Oasis to take in panoramic views of emerald forest canopies from an 18-meter observation tower, relish authentic roasted snakehead fish wrapped in young lotus leaves, and finish with a peaceful sampan boat voyage beneath prehistoric vine canopies in Xẻo Quýt.",
    "highlights_vi": [
      "Đi tắc ráng lướt sóng qua cánh đồng sen hoang và tràm ngập nước tại Ramsar Tràm Chim",
      "Ngắm hoàng hôn trên đài quan sát chim trời với hàng vạn cánh cò bay về tổ",
      "Thưởng thức cá lóc nướng trui cuốn lá sen non và chuột đồng quay lu giữa rừng tràm Gáo Giồng",
      "Len lỏi xuồng chèo tay tĩnh lặng dưới tán rừng dây leo nguyên sinh Xẻo Quýt"
    ],
    "highlights_en": [
      "Cruise through wild lotus wetlands and melaleuca forests at World Ramsar Site Tràm Chim",
      "Climb bird-watching towers at twilight to see thousands of waterbirds returning to their nests",
      "Savor grilled snakehead fish wrapped in tender young lotus leaves in the heart of Gáo Giồng",
      "Experience quiet sampan rowing beneath dense prehistoric vine-covered canopies at Xẻo Quýt"
    ]
  }
];

export const PASSPORT_TIERS = [
  {
    "tier": 1,
    "min_stamps": 1,
    "max_stamps": 3,
    "title_vi": "Khách Bộ Hành Đất Sen",
    "title_en": "Lotus Wanderer",
    "badge_icon": "hiking",
    "color": "#64748B",
    "bg_light": "#F1F5F9",
    "desc_vi": "Bước đầu đặt chân khám phá vẻ đẹp thuần khiết Đồng Tháp",
    "desc_en": "Taking the first inspiring steps into the pure beauty of Đồng Tháp"
  },
  {
    "tier": 2,
    "min_stamps": 4,
    "max_stamps": 9,
    "title_vi": "Người Bạn Đồng Tháp Mười",
    "title_en": "Companion of Dong Thap Muoi",
    "badge_icon": "diversity_3",
    "color": "#059669",
    "bg_light": "#ECFDF5",
    "desc_vi": "Thân quen với hương sen, sông nước và những cung đường miền Tây",
    "desc_en": "Intimately familiar with lotus blossoms, waterways, and delta roads"
  },
  {
    "tier": 3,
    "min_stamps": 10,
    "max_stamps": 15,
    "title_vi": "Nhà Thám Hiểm Di Sản",
    "title_en": "Heritage Explorer",
    "badge_icon": "explore",
    "color": "#0284C7",
    "bg_light": "#F0F9FF",
    "desc_vi": "Chinh phục hơn nửa kho tàng khảo cổ, văn hóa và căn cứ lịch sử",
    "desc_en": "Conquering more than half of the archaeological, cultural, and historic treasures"
  },
  {
    "tier": 4,
    "min_stamps": 16,
    "max_stamps": 20,
    "title_vi": "Đại Sứ Văn Hóa Đất Sen Hồng",
    "title_en": "Ambassador of the Pink Lotus Land",
    "badge_icon": "military_tech",
    "color": "#E11D48",
    "bg_light": "#FFF1F2",
    "desc_vi": "Hoàn thành trọn vẹn 20/20 di tích, vinh danh bảo tồn di sản Đồng Tháp",
    "desc_en": "Completed all 20 heritage seals, officially honored as a guardian of Đồng Tháp heritage"
  }
];

export const MONUMENT_SEAL_SPECS = {
  "1": {
    "monument_id": 1,
    "seal_code": "SEAL-CL-01",
    "seal_shape": "octagon-lotus",
    "ink_color": "#B91C1C",
    "motif_icon": "local_florist",
    "center_title_vi": "LĂNG CỤ NGUYỄN SINH SẮC",
    "center_title_en": "NGUYEN SINH SAC SANCTUARY",
    "motto_vi": "THÂN SINH CHỦ TỊCH HỒ CHÍ MINH • ĐỒNG THÁP NGHĨA TÌNH",
    "motto_en": "DEVOTED SCHOLAR OF THE MEKONG • CAO LANH HERITAGE"
  },
  "2": {
    "monument_id": 2,
    "seal_code": "SEAL-TM-02",
    "seal_shape": "square-ancient",
    "ink_color": "#991B1B",
    "motif_icon": "temple_hindu",
    "center_title_vi": "KHẢO CỔ GÒ THÁP",
    "center_title_en": "GO THAP ARCHAEOLOGY",
    "motto_vi": "VƯƠNG QUỐC PHÙ NAM THẾ KỶ I - VII • THIÊN HỘ DƯƠNG",
    "motto_en": "ANCIENT FU-NAN CIVILIZATION • PLAIN OF REEDS"
  },
  "3": {
    "monument_id": 3,
    "seal_code": "SEAL-CL-03",
    "seal_shape": "circle-serrated",
    "ink_color": "#047857",
    "motif_icon": "forest",
    "center_title_vi": "CĂN CỨ XẺO QUÝT",
    "center_title_en": "XEO QUYT JUNGLE BASE",
    "motto_vi": "CHIẾN KHU LÒNG DÂN • RỪNG TRÀM KHÁNG CHIẾN 1960 - 1975",
    "motto_en": "HEROIC WETLAND REDOUBT • SUBMERGED REVOLUTIONARY BASE"
  },
  "4": {
    "monument_id": 4,
    "seal_code": "SEAL-SD-04",
    "seal_shape": "oval-imperial",
    "ink_color": "#B91C1C",
    "motif_icon": "villa",
    "center_title_vi": "NHÀ CỔ HUỲNH THỦY LÊ",
    "center_title_en": "HUYNH THUY LE ANCIENT HOUSE",
    "motto_vi": "KIỆT TÁC ĐÔNG TÂY 1895 • TIỂU THUYẾT NGƯỜI TÌNH",
    "motto_en": "THE LOVER'S HISTORIC RESIDENCE • SA DEC HERITAGE"
  },
  "5": {
    "monument_id": 5,
    "seal_code": "SEAL-SD-05",
    "seal_shape": "square-ancient",
    "ink_color": "#DC2626",
    "motif_icon": "temple_buddhist",
    "center_title_vi": "CHÙA ÔNG QUÁCH",
    "center_title_en": "KIEN AN CUNG TEMPLE",
    "motto_vi": "KIẾN TẠO AN BÌNH • DI TÍCH NGHỆ THUẬT PHÚC KIẾN 1927",
    "motto_en": "SACRED FUJIAN ARTISTRY • TIMELESS SA DEC CANAL"
  },
  "6": {
    "monument_id": 6,
    "seal_code": "SEAL-TN-06",
    "seal_shape": "circle-serrated",
    "ink_color": "#047857",
    "motif_icon": "flutter_dash",
    "center_title_vi": "RAMSAR TRÀM CHIM",
    "center_title_en": "TRAM CHIM RAMSAR #2000",
    "motto_vi": "VƯƠNG QUỐC SẾU ĐẦU ĐỎ • ĐẤT NGẬP NƯỚC QUỐC TẾ 7313 HA",
    "motto_en": "WORLD RAMSAR WETLAND SANCTUARY • SARUS CRANE BIOSPHERE"
  },
  "7": {
    "monument_id": 7,
    "seal_code": "SEAL-CL-07",
    "seal_shape": "octagon-lotus",
    "ink_color": "#047857",
    "motif_icon": "nature",
    "center_title_vi": "RỪNG TRÀM GÁO GIỒNG",
    "center_title_en": "GAO GIONG ECO OASIS",
    "motto_vi": "LÁ PHỔI XANH ĐỒNG THÁP MƯỜI • SANH CẢNH 1700 HA",
    "motto_en": "GREEN LUNG OF THE REEDS • TRANQUIL BIRD SANCTUARY"
  },
  "8": {
    "monument_id": 8,
    "seal_code": "SEAL-SD-08",
    "seal_shape": "octagon-lotus",
    "ink_color": "#DC2626",
    "motif_icon": "yard",
    "center_title_vi": "LÀNG HOA SA ĐÉC",
    "center_title_en": "SA DEC FLOWER CAPITAL",
    "motto_vi": "THỦ PHỦ HOA KIỂNG MIỀN TÂY • TRĂM NĂM SẮC HƯƠNG TÂN QUY ĐÔNG",
    "motto_en": "CENTURY-OLD FLORAL HERITAGE • MEKONG BLOSSOM CANALS"
  },
  "9": {
    "monument_id": 9,
    "seal_code": "SEAL-LV-09",
    "seal_shape": "square-ancient",
    "ink_color": "#B91C1C",
    "motif_icon": "texture",
    "center_title_vi": "CHIẾU LÁT ĐỊNH YÊN",
    "center_title_en": "DINH YEN WEAVING VILLAGE",
    "motto_vi": "DI SẢN PHI VẬT THỂ QUỐC GIA • CHỢ CHIẾU MA VEN SÔNG HẬU",
    "motto_en": "NATIONAL INTANGIBLE HERITAGE • MIDNIGHT MAT MARKET"
  },
  "10": {
    "monument_id": 10,
    "seal_code": "SEAL-TB-10",
    "seal_shape": "oval-imperial",
    "ink_color": "#991B1B",
    "motif_icon": "shield",
    "center_title_vi": "DINH ÔNG ĐỐC VÀNG",
    "center_title_en": "GENERAL TRAN VAN NANG",
    "motto_vi": "THƯỢNG TƯỚNG QUẬN CÔNG 1835 • BẢO QUỐC AN DÂN",
    "motto_en": "HEROIC FRONTIER GENERAL • DOC VANG THUONG SANCTUARY"
  },
  "11": {
    "monument_id": 11,
    "seal_code": "SEAL-TH-11",
    "seal_shape": "circle-serrated",
    "ink_color": "#B91C1C",
    "motif_icon": "military_tech",
    "center_title_vi": "CĂN CỨ THÔNG BÌNH",
    "center_title_en": "THONG BINH BORDER BASE",
    "motto_vi": "CHIẾN KHU BIÊN GIỚI KIẾN PHONG • VÀNH ĐAI TÂN HỒNG",
    "motto_en": "BORDERLAND LIBERATION BASTION • TAN HONG RESISTANCE"
  },
  "12": {
    "monument_id": 12,
    "seal_code": "SEAL-CL-12",
    "seal_shape": "oval-imperial",
    "ink_color": "#B91C1C",
    "motif_icon": "museum",
    "center_title_vi": "BẢO TÀNG ĐỒNG THÁP",
    "center_title_en": "DONG THAP MUSEUM",
    "motto_vi": "30.000 HIỆN VẬT LỊCH SỬ • DINH QUẬN TRƯỞNG PHÁP 1917",
    "motto_en": "PROVINCIAL HERITAGE VAULT • FRENCH COLONIAL RESIDENCE"
  },
  "13": {
    "monument_id": 13,
    "seal_code": "SEAL-CL-13",
    "seal_shape": "circle-serrated",
    "ink_color": "#DC2626",
    "motif_icon": "directions_boat",
    "center_title_vi": "TẬP KẾT RA BẮC 1954",
    "center_title_en": "1954 REGROUPING MEMORIAL",
    "motto_vi": "BẾN PHÀ CAO LÃNH LỊCH SỬ • 100 NGÀY BẮC NAM NGHĨA TÌNH",
    "motto_en": "HISTORIC 100-DAY EMBARKATION • CAO LANH MEKONG WHARF"
  },
  "14": {
    "monument_id": 14,
    "seal_code": "SEAL-CT-14",
    "seal_shape": "octagon-lotus",
    "ink_color": "#047857",
    "motif_icon": "spa",
    "center_title_vi": "CHÙA SEN VUA",
    "center_title_en": "KING LOTUS TEMPLE",
    "motto_vi": "PHƯỚC KIỂN CỔ TỰ 1847 • KỲ DIỆU SEN VUA KHỔNG LỒ",
    "motto_en": "SACRED VICTORIA LILY SANCTUARY • CENTURY-OLD TORTOISES"
  },
  "15": {
    "monument_id": 15,
    "seal_code": "SEAL-TB-15",
    "seal_shape": "circle-serrated",
    "ink_color": "#B91C1C",
    "motif_icon": "candle",
    "center_title_vi": "DI TÍCH BÌNH THÀNH",
    "center_title_en": "BINH THANH MEMORIAL",
    "motto_vi": "KHẮC GHI SỰ KIỆN 12/11/1954 • TRUNG KIÊN VEN SÔNG TIỀN",
    "motto_en": "SACRED PEACE COMMEMORATION • THANH BINH RESISTANCE"
  },
  "16": {
    "monument_id": 16,
    "seal_code": "SEAL-CT-16",
    "seal_shape": "square-ancient",
    "ink_color": "#991B1B",
    "motif_icon": "account_balance",
    "center_title_vi": "ĐÌNH TÂN PHÚ TRUNG",
    "center_title_en": "TAN PHU TRUNG HOUSE",
    "motto_vi": "SẮC PHONG TỰ ĐỨC NĂM 1852 • KIẾN TRÚC TRÙNG THỀM ĐIỆP ỐC",
    "motto_en": "ROYAL DECREE 1852 • TIMELESS IRONWOOD ARCHITECTURE"
  },
  "17": {
    "monument_id": 17,
    "seal_code": "SEAL-CL-17",
    "seal_shape": "octagon-lotus",
    "ink_color": "#047857",
    "motif_icon": "self_improvement",
    "center_title_vi": "CHÙA HƯNG THIỀN",
    "center_title_en": "HUNG THIEN MONASTERY",
    "motto_vi": "CỔ TỰ 250 NĂM • BỒ TÁT QUÁN THẾ ÂM 33M LỘ THIÊN",
    "motto_en": "250 YEARS OF ZEN PEACE • 33-METER AVALOKITESHVARA"
  },
  "18": {
    "monument_id": 18,
    "seal_code": "SEAL-HN-18",
    "seal_shape": "square-ancient",
    "ink_color": "#991B1B",
    "motif_icon": "holiday_village",
    "center_title_vi": "ĐÌNH CÙ LAO LONG THUẬN",
    "center_title_en": "LONG THUAN ISLAND HOUSE",
    "motto_vi": "SẮC PHONG VUA TỰ ĐỨC 1852 • ĐẢO NGỌC PHÙ SA GIỮA DÒNG SÔNG TIỀN",
    "motto_en": "ROYAL DECREE 1852 • SILT ISLAND MEKONG HERITAGE"
  },
  "19": {
    "monument_id": 19,
    "seal_code": "SEAL-TB-19",
    "seal_shape": "oval-imperial",
    "ink_color": "#B91C1C",
    "motif_icon": "cottage",
    "center_title_vi": "ĐÌNH PHÚ MỸ",
    "center_title_en": "PHU MY ANCIENT TEMPLE",
    "motto_vi": "ĐÌNH LÀNG CỔ PHÚ LỢI • NÉT ĐẸP LỄ HỘI KỲ YÊN TRUYỀN THỐNG",
    "motto_en": "ANCIENT RURAL VILLAGE HOUSE • TIME-HONORED KY YEN RITES"
  },
  "20": {
    "monument_id": 20,
    "seal_code": "SEAL-TH-20",
    "seal_shape": "circle-serrated",
    "ink_color": "#B91C1C",
    "motif_icon": "emoji_events",
    "center_title_vi": "GIỒNG THỊ ĐAM 1959",
    "center_title_en": "GIONG THI DAM VICTORY",
    "motto_vi": "MỞ MÀN ĐỒNG KHỞI VŨ TRANG 1959 • TIỂU ĐOÀN 502 ANH HÙNG",
    "motto_en": "HISTORIC 1959 UPRISING VICTORY • 502ND HEROIC BATTALION"
  }
};

export const SEASONAL_CALENDAR = [
  {
    "id": "season-lotus",
    "code": "LOTUS-SEASON",
    "name_vi": "Mùa Sen Nở Rộ",
    "name_en": "Lotus Blossom Season",
    "months_vi": "Tháng 5 - Tháng 8",
    "months_en": "May to August",
    "time_range": "05 - 08",
    "color": "#E11D48",
    "icon": "local_florist",
    "description_vi": "Mùa hè là thời điểm tuyệt diệu nhất khi hàng ngàn héc-ta đồng sen tại Tháp Mười, Tam Nông và Cao Lãnh đồng loạt nở rộ. Không khí thơm ngát hương sen, cánh đồng phủ kín sắc hồng và trắng tinh khôi, tạo nên khung cảnh nên thơ bậc nhất Đồng bằng sông Cửu Long.",
    "description_en": "Summer brings the most breathtaking spectacle to the Plain of Reeds, as thousands of hectares of lotus fields burst into bloom across Tháp Mười, Tam Nông, and Cao Lãnh. The sweet aroma of lotus blossoms fills the air, painting the delta landscape in vibrant shades of pink and pure white.",
    "experiences_vi": [
      "Chèo xuồng giữa cánh đồng sen mênh mông tại Đồng Sen Tháp Mười",
      "Thưởng thức tiệc trà sen và các món ăn chế biến từ sen",
      "Chụp ảnh áo dài, áo bà ba bên đầm sen ban mai",
      "Tham quan Lăng cụ Phó bảng Nguyễn Sinh Sắc mùa sen tỏa ngát"
    ],
    "experiences_en": [
      "Paddle wooden canoes through expansive blooming lotus wetlands in Tháp Mười",
      "Savor authentic lotus tea ceremonies and lotus-seed gourmet specialties",
      "Capture idyllic photos in traditional Áo Dài and Áo Bà Ba amidst morning blossoms",
      "Visit Deputy Scholar Nguyễn Sinh Sắc Mausoleum when surrounding ponds are in full bloom"
    ],
    "recommended_monument_ids": [
      2,
      1,
      6,
      7
    ]
  },
  {
    "id": "season-floating",
    "code": "FLOATING-WATER",
    "name_vi": "Mùa Nước Nổi Đồng Tháp Mười",
    "name_en": "Floating Water Season (Mekong High Waters)",
    "months_vi": "Tháng 9 - Tháng 11",
    "months_en": "September to November",
    "time_range": "09 - 11",
    "color": "#0284C7",
    "icon": "water",
    "description_vi": "Mùa nước nổi là 'món quà của đất trời' mang nguồn phù sa trù phú và hàng ngàn tấn tôm cá tràn vào đồng ruộng. Bông điên điển vàng rực bờ kênh, bông súng ma vươn dài theo con nước, chim muông tụ hội về các cánh rừng tràm nguyên sinh.",
    "description_en": "The annual flooding season is nature's greatest blessing to the Mekong Delta, washing nutrient-rich silt and abundant freshwater fish over the plains. Yellow sesbania blossoms illuminate the canal banks, wild water lilies rise with the tides, and migratory birds assemble in dense melaleuca woodlands.",
    "experiences_vi": [
      "Lướt tắc ráng xuyên rừng tràm ngập nước Vườn quốc gia Tràm Chim",
      "Thưởng thức lẩu cá linh non nấu bông điên điển và cá lóc nướng trui lá sen non",
      "Trải nghiệm dỡ chà, giăng lưới, câu cá đồng cùng nông dân địa phương",
      "Ngắm đàn chim trời hàng vạn con bay về tổ tại Gáo Giồng lúc hoàng hôn"
    ],
    "experiences_en": [
      "Speed along flooded forest canals aboard eco-boats at Tràm Chim National Park",
      "Feast on seasonal young linh fish hotpot with yellow sesbania flowers and roasted snakehead fish",
      "Experience traditional artisanal net fishing alongside local delta farmers",
      "Marvel at tens of thousands of egrets and herons returning to roost at Gáo Giồng at dusk"
    ],
    "recommended_monument_ids": [
      6,
      7,
      3,
      20
    ]
  },
  {
    "id": "season-flower",
    "code": "TET-FLOWERS",
    "name_vi": "Mùa Hoa Tết Sa Đéc",
    "name_en": "Sa Đéc Lunar New Year Flower Season",
    "months_vi": "Tháng 12 - Tháng 2",
    "months_en": "December to February",
    "time_range": "12 - 02",
    "color": "#F59E0B",
    "icon": "yard",
    "description_vi": "Vào những tháng giáp Tết Nguyên Đán, toàn bộ thành phố Sa Đéc bừng sáng trong muôn sắc hoa rực rỡ. Hàng triệu chậu cúc mâm xôi, vạn thọ, hoa hồng và kiểng lá được nông dân chăm sóc trên các giàn treo trên mặt nước, tạo nên khung cảnh nhộn nhịp tàu thuyền chở hoa xuôi ngược.",
    "description_en": "In the weeks leading up to the Lunar New Year (Tết), Sa Đéc becomes a kaleidoscopic wonderland of blossoms. Millions of pots of golden chrysanthemums, marigolds, and heirloom roses thrive on bamboo trellises above shimmering canals, surrounded by bustling boats transporting flowers across Vietnam.",
    "experiences_vi": [
      "Check-in đại lộ hoa Sa Đéc và ngắm giàn hoa trên mặt nước độc nhất vô nhị",
      "Tham quan các ngôi nhà cổ, biệt thự Pháp và chùa cổ người Hoa tại Sa Đéc",
      "Thưởng thức hủ tiếu Sa Đéc trứ danh bên bờ sông lộng gió",
      "Hòa mình vào không khí nhộn nhịp của Festival Hoa - Kiểng Sa Đéc"
    ],
    "experiences_en": [
      "Wander through flower-lined boulevards and marvel at unique floating flower trellises",
      "Tour French colonial villas, ancient merchant homes, and Chinese assembly halls",
      "Savor famous Sa Đéc noodle soup along breezy riverfront promenades",
      "Join in the vibrant festivities of the annual Sa Đéc Flower and Ornamental Festival"
    ],
    "recommended_monument_ids": [
      8,
      4,
      5,
      14,
      16
    ]
  },
  {
    "id": "season-festival",
    "code": "GOTHAP-FESTIVAL",
    "name_vi": "Mùa Lễ Hội Gò Tháp & Vía Bà Chúa Xứ",
    "name_en": "Gò Tháp Pilgrimage & Spiritual Festivals",
    "months_vi": "Tháng 3 & Tháng 11 Âm lịch",
    "months_en": "3rd & 11th Lunar Months",
    "time_range": "Lunar 03 & 11",
    "color": "#7C3AED",
    "icon": "celebration",
    "description_vi": "Đồng Tháp sở hữu hai kỳ lễ hội văn hóa - tâm linh quy mô bậc nhất Nam Bộ diễn ra tại Khu di tích Quốc gia đặc biệt Gò Tháp. Lễ hội vía Bà Chúa Xứ (tháng 3 Âm lịch) và Lễ tưởng niệm hai vị anh hùng dân tộc Thiên Hộ Dương, Đốc Binh Kiều (tháng 11 Âm lịch) thu hút hàng trăm ngàn lượt khách hành hương thập phương.",
    "description_en": "Đồng Tháp hosts two of southern Vietnam's most momentous cultural and spiritual pilgrimage festivals at the Gò Tháp Special National Monument. The Lady of the Realm (Bà Chúa Xứ) Festival in the 3rd lunar month and the Heroes Commemoration Festival in the 11th lunar month draw hundreds of thousands of pilgrims.",
    "experiences_vi": [
      "Hòa mình vào dòng người trẩy hội Gò Tháp linh thiêng",
      "Thưởng thức các nghi lễ truyền thống, nhạc lễ Nam Bộ và hát bội cổ truyền",
      "Nhận lộc cầu an, chiêm bái các ngôi đền cổ và di chỉ khảo cổ",
      "Trải nghiệm nét văn hóa đãi cơm chay miễn phí ấm áp nghĩa tình phương Nam"
    ],
    "experiences_en": [
      "Join hundreds of thousands of pilgrims in the sacred atmosphere of Gò Tháp",
      "Witness traditional court rituals, Southern ritual music, and classical folk opera",
      "Receive spiritual blessings of peace, pray at ancient shrines and archaeological mounds",
      "Experience the heartfelt southern tradition of complimentary communal vegetarian feasts"
    ],
    "recommended_monument_ids": [
      2,
      1,
      10,
      18,
      19
    ]
  }
];

export const CULINARY_SPECIALTIES = [
  {
    "id": "hu-tieu-sa-dec",
    "name_vi": "Hủ tiếu Sa Đéc",
    "name_en": "Sa Đéc Noodle Soup (Hủ tiếu Sa Đéc)",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Món ăn quốc hồn quốc túy của đất Sa Đéc với sợi bánh hủ tiếu làm từ bột gạo Sa Đéc truyền thống dẻo dai, trong veo, không chua. Nước lèo hầm từ xương tủy ngọt thanh đậm đà, ăn kèm tôm tươi sông Tiền, thịt nạc xá xíu, gan heo, tóp mỡ giòn rụm và rau cần tàu thơm nức.",
    "description_en": "The culinary pride of Sa Đéc, featuring artisan rice noodles produced from centuries-old Sa Đéc flour craft. The noodles are translucent and delightfully chewy, paired with a slow-simmered bone broth, fresh river shrimp, char siu pork, pork liver, crispy cracklings, and aromatic Chinese celery.",
    "price_range_vnd": "35.000 - 55.000 VNĐ / tô",
    "price_range_en": "1.50 - 2.50 USD / bowl",
    "nearby_monument_ids": [
      4,
      5,
      8
    ],
    "recommended_addresses": [
      {
        "name": "Hủ tiếu Bà Sẩm (Quán gia truyền 50 năm)",
        "address": "06 Phan Bội Châu, Phường 1, TP. Sa Đéc",
        "note_vi": "Cách Nhà cổ Huỳnh Thủy Lê chỉ 200m, giá bình dân, nước dùng thanh ngọt",
        "note_en": "Just 200m from Huỳnh Thủy Lê Ancient House, legendary broth, budget-friendly"
      },
      {
        "name": "Hủ tiếu Phú Thành",
        "address": "484 Nguyễn Huệ, Phường 1, TP. Sa Đéc",
        "note_vi": "Nổi tiếng với hủ tiếu khô sốt gia truyền và tôm sú tươi ngon",
        "note_en": "Famous for dry noodles with secret house sauce and fresh tiger prawns"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "ca-loc-nuong-trui-la-sen",
    "name_vi": "Cá lóc nướng trui cuốn lá sen non",
    "name_en": "Straw-Roasted Snakehead Fish in Tender Lotus Leaves",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Món ăn biểu tượng của ẩm thực đồng bưng Đồng Tháp. Cá lóc đồng béo tròn được nướng trui nguyên con trong rơm vàng giòn ngọt thịt, rưới mỡ hành đậu phộng, cuốn cùng đọt sen non mới nhú, chấm nước mắm me chua ngọt dầm ớt hiểm cay nồng.",
    "description_en": "The iconic rustic delicacy of the Plain of Reeds. Wild freshwater snakehead fish is impaled on bamboo skewers and roasted in burning rice straw until the flesh is sweet and smoky. It is served wrapped in tender young lotus leaves and dipped in spicy tamarind sauce.",
    "price_range_vnd": "140.000 - 190.000 VNĐ / con",
    "price_range_en": "6.00 - 8.00 USD / fish",
    "nearby_monument_ids": [
      1,
      2,
      7
    ],
    "recommended_addresses": [
      {
        "name": "Khu du lịch sinh thái Gáo Giồng",
        "address": "Ấp 6, Xã Gáo Giồng, Huyện Cao Lãnh",
        "note_vi": "Thưởng thức cá nướng trui giữa chòi lá ngập nước sen nở thơm lừng",
        "note_en": "Enjoy freshly roasted fish in thatched huts surrounded by fragrant lotus marshes"
      },
      {
        "name": "Nhà hàng Bông Sen Cao Lãnh",
        "address": "07-09 Lê Duẩn, Phường Mỹ Phú, TP. Cao Lãnh",
        "note_vi": "Chế biến cá lóc đồng chuẩn vị truyền thống Đất Sen Hồng",
        "note_en": "Serves authentic delta preparations in the heart of Cao Lãnh City"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "nem-lai-vung",
    "name_vi": "Nem Lai Vung",
    "name_en": "Lai Vung Fermented Pork Sausage (Nem Lai Vung)",
    "specialty_type": "qua-tang",
    "description_vi": "Đặc sản nức tiếng với câu ca 'Lai Vung là xứ lạ lùng / Nem chua mà ngọt, thơm lừng men say'. Nem được làm từ thịt nạc heo tươi quết nhuyễn phối trộn bì heo thái chỉ, tiêu sọ, tỏi ớt, ủ lên men tự nhiên bằng lá vông nem hoặc lá chuối xanh.",
    "description_en": "A legendary fermented delicacy celebrated throughout southern Vietnam. Fresh lean pork is hand-pounded until smooth, blended with finely shredded pork rind, black peppercorns, garlic, and birds-eye chili, then wrapped tightly in banana leaves to ferment naturally into a sweet, sour, and savory snack.",
    "price_range_vnd": "35.000 - 50.000 VNĐ / chục (10 chiếc)",
    "price_range_en": "1.50 - 2.20 USD / pack of 10",
    "nearby_monument_ids": [
      9,
      14,
      16
    ],
    "recommended_addresses": [
      {
        "name": "Nem Lai Vung Giáo Thơ (Gia truyền OCOP 4 sao)",
        "address": "Tuyến ĐT 851, Thị trấn Lai Vung, Huyện Lai Vung",
        "note_vi": "Cơ sở sản xuất lâu năm, bao bì chuẩn sạch, vị chua ngọt hài hòa",
        "note_en": "Prestigious generational maker, 4-star certified OCOP delta specialty"
      },
      {
        "name": "Nem Út Thẳng",
        "address": "Quốc lộ 80, Xã Tân Thành, Huyện Lai Vung",
        "note_vi": "Điểm dừng chân mua quà biếu uy tín bên trục Quốc lộ 80",
        "note_en": "Popular rest stop for authentic souvenirs along National Highway 80"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "banh-phong-tom-sa-giang",
    "name_vi": "Bánh phồng tôm Sa Giang",
    "name_en": "Sa Giang Traditional Shrimp Chips",
    "specialty_type": "qua-tang",
    "description_vi": "Thương hiệu bánh phồng tôm danh tiếng ra đời từ năm 1960 tại Sa Đéc, xuất khẩu khắp hơn 40 quốc gia. Bánh làm từ tôm nước ngọt tươi ngon xay nhuyễn cùng tinh bột khoai mì Sa Đéc, khi chiên phồng xốp giòn tan, thơm lừng vị ngọt tự nhiên của tôm đồng.",
    "description_en": "World-renowned prawn crackers established in Sa Đéc in 1960 and exported to over 40 countries. Made from fresh freshwater river shrimp mashed with fine Sa Đéc tapioca flour. When fried, the chips puff up crispy, airy, and bursting with natural sweet prawn flavor.",
    "price_range_vnd": "25.000 - 45.000 VNĐ / hộp 200g",
    "price_range_en": "1.00 - 2.00 USD / box",
    "nearby_monument_ids": [
      4,
      5,
      8
    ],
    "recommended_addresses": [
      {
        "name": "Showroom Công ty Sa Giang",
        "address": "Lô CII-3, KCN C Cảng Sa Đéc (và các đại lý đường Trần Hưng Đạo), TP. Sa Đéc",
        "note_vi": "Đầy đủ các dòng bánh phồng tôm truyền thống, cua, mực, hạt sen",
        "note_en": "Full range of traditional shrimp, crab, squid, and lotus seed crackers"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "com-goi-la-sen",
    "name_vi": "Cơm gói lá sen & Trà tâm sen",
    "name_en": "Lotus Leaf-Wrapped Fragrant Rice & Lotus Heart Tea",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Món ăn thanh tao mang trọn vẹn hồn cốt Đất Sen Hồng. Cơm gạo huyết rồng hoặc gạo thơm dẻo nấu chín, trộn cùng hạt sen tươi bùi ngậy, nấm đông cô, cà rốt, lạp xưởng thái hạt lựu, gói chặt trong lá sen tươi hấp cách thủy. Dùng kèm tách trà tâm sen thanh nhiệt an thần.",
    "description_en": "The culinary soul of the Pink Lotus Land. Fragrant rice is gently tossed with fresh boiled lotus seeds, shiitake mushrooms, carrots, and diced sausage, then wrapped tightly inside a fresh lotus leaf and steamed. Served with soothing lotus heart herbal tea.",
    "price_range_vnd": "65.000 - 95.000 VNĐ / phần",
    "price_range_en": "2.80 - 4.00 USD / serving",
    "nearby_monument_ids": [
      1,
      2,
      12
    ],
    "recommended_addresses": [
      {
        "name": "Làng Du lịch Mỹ Phước Thành",
        "address": "264 Tôn Đức Thắng, Xã Mỹ Trà, TP. Cao Lãnh",
        "note_vi": "Phục vụ cơm gói lá sen giữa hồ sen thơ mộng, không gian Nam Bộ xưa",
        "note_en": "Served on floating wooden pavilions over expansive lotus lakes"
      },
      {
        "name": "Nhà hàng Sen Hồng Tháp Mười",
        "address": "Thị trấn Mỹ An, Huyện Tháp Mười",
        "note_vi": "Chuyên các món ăn sáng tạo 100% từ củ sen, ngó sen và hạt sen",
        "note_en": "Specializes in creative gourmet banquets crafted entirely from lotus"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "chuot-dong-quay-lu",
    "name_vi": "Chuột đồng quay lu Cao Lãnh",
    "name_en": "Cao Lãnh Jar-Roasted Ricefield Delicacy",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Đặc sản độc đáo chỉ có vào mùa lúa chín Đồng Tháp Mười. Chuột đồng ăn lúa béo tròn được làm sạch, ướp ngũ vị hương, sả ớt, mật ong rồi treo vào lòng lu đất nung quay bằng than hồng. Thịt chín vàng ruộm, da giòn tan, thịt ngọt thơm đậm đà không thua sơn hào hải vị.",
    "description_en": "A legendary seasonal delicacy harvested during golden paddy seasons. Ricefield mice that feed solely on ripe rice grains are marinated with five-spice, lemongrass, and wild honey, then hung inside large terracotta earthen jars and roasted over glowing coals until skin turns crackling crisp and meat is succulent.",
    "price_range_vnd": "100.000 - 150.000 VNĐ / đĩa",
    "price_range_en": "4.20 - 6.50 USD / plate",
    "nearby_monument_ids": [
      1,
      12,
      13
    ],
    "recommended_addresses": [
      {
        "name": "Khu Ẩm thực Bờ Kè Sông Cao Lãnh",
        "address": "Đường Nguyễn Huệ / Phạm Hữu Lầu, Phường 4, TP. Cao Lãnh",
        "note_vi": "Nhiều quán ăn đồng quê phục vụ chuột quay lu nóng giòn bên bờ sông",
        "note_en": "Atmospheric riverside dining strip serving freshly roasted jars"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "lau-ca-linh-bong-dien-dien",
    "name_vi": "Lẩu cá linh bông điên điển",
    "name_en": "Seasonal Linh Fish & Yellow Sesbania Hotpot",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Món lẩu đặc trưng số một của mùa nước nổi miền Tây. Cá linh non đầu mùa xương mềm rụm thịt ngọt béo, nấu cùng nước dùng dừa tươi, me dốt chua thanh. Nhúng vào nồi lẩu là rổ bông điên điển vàng ươm, bông súng giòn ngọt, chấm nước mắm nhĩ ớt cay nồng.",
    "description_en": "The quintessential hotpot of the Mekong flood season. Juvenile linh fish with soft bones and sweet buttery meat are gently poached in a tamarind and fresh coconut broth, served with vivid yellow sesbania blossoms and crunchy purple water lilies.",
    "price_range_vnd": "160.000 - 220.000 VNĐ / nồi lẩu",
    "price_range_en": "7.00 - 9.50 USD / hotpot",
    "nearby_monument_ids": [
      6,
      11,
      20
    ],
    "recommended_addresses": [
      {
        "name": "Nhà hàng Sinh thái Hoàng Hạc Tràm Chim",
        "address": "Thị trấn Tràm Chim, Huyện Tam Nông",
        "note_vi": "Phục vụ cá linh non tươi sống vừa đánh bắt từ vùng ngập lũ",
        "note_en": "Serves live, wild-caught river fish directly from the Ramsar floodwaters"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "xoai-cat-chu-cao-lanh",
    "name_vi": "Xoài cát Chu Cao Lãnh",
    "name_en": "Cao Lãnh Cát Chu Sweet Mango",
    "specialty_type": "trai-cay",
    "description_vi": "Giống xoài quý truyền thống được cấp chứng nhận Chỉ dẫn địa lý quốc gia. Trái xoài thon dài, khi chín vỏ chuyển màu vàng ươm óng ả, thịt dày, hột nhỏ, không xơ, vị ngọt lịm đậm đà và hương thơm quyến rũ nức mũi.",
    "description_en": "A prestigious native mango variety protected by a National Geographical Indication. Slender in shape, turning golden yellow when ripe, featuring firm fiberless flesh, small seeds, and an intensely sweet, aromatic tropical perfume.",
    "price_range_vnd": "35.000 - 60.000 VNĐ / kg",
    "price_range_en": "1.50 - 2.60 USD / kg",
    "nearby_monument_ids": [
      1,
      3,
      12
    ],
    "recommended_addresses": [
      {
        "name": "Hợp tác xã Xoài Mỹ Xương",
        "address": "Xã Mỹ Xương, Huyện Cao Lãnh",
        "note_vi": "Thủ phủ vùng trồng xoài cát Chu xuất khẩu, có dịch vụ tham quan vườn",
        "note_en": "Epicenter of export-grade mango groves with orchard tasting tours"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "quyt-hong-lai-vung",
    "name_vi": "Quýt hồng Lai Vung",
    "name_en": "Lai Vung Honey Mandarin Orange",
    "specialty_type": "trai-cay",
    "description_vi": "Đặc sản nức tiếng cả nước chỉ trồng được trên dải đất phù sa màu mỡ ven sông Hậu thuộc huyện Lai Vung. Trái quýt hình cầu dẹt, khi chín có màu đỏ cam óng ánh tuyệt đẹp, mọng nước, vị ngọt thanh mát, là món quà biếu Tết cao quý.",
    "description_en": "A celebrated citrus variety unique to the fertile alluvial soils along the Hậu River in Lai Vung. Squat and spherical with lustrous deep-orange rinds, succulent sweet pulp, and refreshing juice, cherished across Vietnam as an auspicious Lunar New Year gift.",
    "price_range_vnd": "50.000 - 90.000 VNĐ / kg (tùy vụ Tết)",
    "price_range_en": "2.20 - 4.00 USD / kg",
    "nearby_monument_ids": [
      9,
      14,
      16
    ],
    "recommended_addresses": [
      {
        "name": "Điểm tham quan Vườn Quýt hồng Ba Liên",
        "address": "Xã Long Hậu, Huyện Lai Vung",
        "note_vi": "Vườn quýt trĩu quả đón khách tham quan trải nghiệm hái quýt từ tháng 11 đến Tết",
        "note_en": "Scenic orchard open for pick-your-own agritourism from November through Tết"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "kho-ca-loc-tam-nong",
    "name_vi": "Khô cá lóc Tam Nông (Tràm Chim)",
    "name_en": "Tam Nông Sun-Dried Snakehead Fish",
    "specialty_type": "qua-tang",
    "description_vi": "Đặc sản trứ danh của vùng trũng Tam Nông. Cá lóc tươi sống được xẻ thịt, ướp muối hột, ớt xiêm, tiêu sọ rồi đem phơi qua 3-4 con nắng giòn rực rỡ của đất phương Nam. Thịt khô thơm dẻo, nướng lên xé nhỏ trộn gỏi xoài hay gỏi sầu đâu đều ngon tuyệt đỉnh.",
    "description_en": "A signature dried delta delicacy from Tam Nông. Fresh snakehead fish is butterflied, lightly cured with sea salt, crushed peppercorns, and delta chili, then sun-dried under intense Mekong sun for 3–4 days. When grilled, it turns fragrant and tender, paired with green mango salad.",
    "price_range_vnd": "220.000 - 320.000 VNĐ / kg",
    "price_range_en": "9.50 - 13.50 USD / kg",
    "nearby_monument_ids": [
      6,
      11
    ],
    "recommended_addresses": [
      {
        "name": "Làng nghề làm Khô Cá lóc Phú Thọ",
        "address": "Xã Phú Thọ, Huyện Tam Nông",
        "note_vi": "Làng nghề truyền thống uy tín, không phẩm màu, phơi nắng tự nhiên",
        "note_en": "Generational sun-drying craft village, chemical-free, natural cure"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "banh-xeo-cao-lanh",
    "name_vi": "Bánh xèo Cao Lãnh",
    "name_en": "Cao Lãnh Crispy Sizzling Pancake",
    "specialty_type": "mon-an-chinh",
    "description_vi": "Món bánh xèo bột gạo giòn tan trứ danh miền Tây. Bánh được đổ mỏng dính trong chảo gang lớn với nhân thịt vịt xiêm băm nhuyễn xào củ hủ dừa non ngọt lịm hoặc tôm tươi thịt ba chỉ. Cuốn cùng hơn 20 loại rau rừng Nam Bộ như đọt xoài, lá cách, cải bẹ xanh chấm nước mắm chua ngọt.",
    "description_en": "A famed delta crispy pancake made from stone-ground rice flour mixed with rich coconut milk and turmeric. Cooked ultra-thin in blazing cast-iron skillets, stuffed with minced Muscovy duck meat and sweet tender coconut heart shoots. Wrapped in 20 wild delta herbs.",
    "price_range_vnd": "25.000 - 45.000 VNĐ / cái",
    "price_range_en": "1.10 - 2.00 USD / pancake",
    "nearby_monument_ids": [
      1,
      12,
      13
    ],
    "recommended_addresses": [
      {
        "name": "Bánh xèo Út Nàng",
        "address": "226 Lê Duẩn, Phường Mỹ Phú, TP. Cao Lãnh",
        "note_vi": "Quán gia truyền nổi tiếng với bánh xèo nhân thịt vịt củ hủ dừa giòn rụm",
        "note_en": "Legendary for crispy duck meat and coconut heart stuffing"
      },
      {
        "name": "Bánh xèo Tư Cổ",
        "address": "Tuyến ẩm thực Bánh xèo Cao Lãnh, Phường Mỹ Phú, TP. Cao Lãnh",
        "note_vi": "Phục vụ rổ rau rừng đồng nội phong phú hơn 20 loại",
        "note_en": "Served with an overflowing basket of over 20 wild delta herbs"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "hat-sen-say-go-thap",
    "name_vi": "Hạt sen sấy giòn Gò Tháp",
    "name_en": "Gò Tháp Crispy Vacuum-Fried Lotus Seeds",
    "specialty_type": "qua-tang",
    "description_vi": "Sản phẩm OCOP tiêu biểu được chế biến từ những gương sen Tháp Mười tuyển chọn. Bằng công nghệ sấy chân không hiện đại, hạt sen giữ nguyên hình dáng tròn đều, màu vàng ngà tự nhiên, cắn vào giòn tan, vị ngọt bùi thanh tao, là món quà sức khỏe quý giá.",
    "description_en": "A premier certified OCOP gift produced from harvested Tháp Mười lotus seeds. Using advanced vacuum-frying technology, each seed retains its round shape, natural ivory hue, and delicate sweet nutty crunch without excess oil. A beloved health-promoting delicacy.",
    "price_range_vnd": "70.000 - 120.000 VNĐ / hũ 250g",
    "price_range_en": "3.00 - 5.00 USD / jar",
    "nearby_monument_ids": [
      2,
      10
    ],
    "recommended_addresses": [
      {
        "name": "Hợp tác xã Sen Tháp Mười",
        "address": "Khu vực Di tích Gò Tháp, Xã Tân Kiều, Huyện Tháp Mười",
        "note_vi": "Điểm phân phối hạt sen sấy OCOP chính gốc ngay cổng di tích",
        "note_en": "Official OCOP cooperative outlet directly by the Gò Tháp gates"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80"
  }
];

/**
 * Lấy thông tin tuyến du lịch theo ID với bản địa hóa ngôn ngữ VI/EN
 */
export function getTrailById(trailId, lang = 'vi') {
  const trail = CULTURAL_TRAILS.find((t) => t.id === trailId || t.code === trailId);
  if (!trail) return null;
  const isEn = lang === 'en';
  return {
    ...trail,
    displayName: isEn ? trail.name_en : trail.name_vi,
    displaySubtitle: isEn ? trail.subtitle_en : trail.subtitle_vi,
    displayDuration: isEn ? trail.duration_en : trail.duration_vi,
    displayTransport: isEn ? trail.best_transport_en : trail.best_transport_vi,
    displayStory: isEn ? trail.story_en : trail.story_vi,
    displayHighlights: isEn ? trail.highlights_en : trail.highlights_vi,
  };
}

/**
 * Lấy tất cả các tuyến du lịch chủ đề với bản địa hóa ngôn ngữ VI/EN
 */
export function getAllTrails(lang = 'vi') {
  return CULTURAL_TRAILS.map((t) => getTrailById(t.id, lang));
}

/**
 * Lấy cấp bậc Hộ chiếu Di sản dựa trên số lượng tem đã thu thập
 */
export function getPassportTier(stampCount = 0, lang = 'vi') {
  const count = Number(stampCount) || 0;
  const isEn = lang === 'en';
  const tierObj =
    PASSPORT_TIERS.find((t) => count >= t.min_stamps && count <= t.max_stamps) ||
    (count > 20 ? PASSPORT_TIERS[PASSPORT_TIERS.length - 1] : PASSPORT_TIERS[0]);

  return {
    ...tierObj,
    displayTitle: isEn ? tierObj.title_en : tierObj.title_vi,
    displayDesc: isEn ? tierObj.desc_en : tierObj.desc_vi,
  };
}

/**
 * Lấy thông số con dấu mộc đỏ riêng biệt của di tích
 */
export function getMonumentSeal(monumentId, lang = 'vi') {
  const numericId = Number(monumentId);
  const seal = MONUMENT_SEAL_SPECS[numericId];
  if (!seal) return null;
  const isEn = lang === 'en';

  return {
    ...seal,
    displayCenterTitle: isEn ? seal.center_title_en : seal.center_title_vi,
    displayMotto: isEn ? seal.motto_en : seal.motto_vi,
  };
}

/**
 * Lấy toàn bộ 20 con dấu di tích được bản địa hóa
 */
export function getAllSeals(lang = 'vi') {
  return Object.values(MONUMENT_SEAL_SPECS).map((s) => getMonumentSeal(s.monument_id, lang));
}

/**
 * Lấy danh sách ẩm thực đặc sản gắn liền với di tích cụ thể
 */
export function getSpecialtiesByMonumentId(monumentId, lang = 'vi') {
  const numericId = Number(monumentId);
  const isEn = lang === 'en';

  return CULINARY_SPECIALTIES.filter((s) => s.nearby_monument_ids.includes(numericId)).map((s) => ({
    ...s,
    displayName: isEn ? s.name_en : s.name_vi,
    displayDescription: isEn ? s.description_en : s.description_vi,
    displayPrice: isEn ? s.price_range_en : s.price_range_vnd,
    recommended_addresses: s.recommended_addresses.map((a) => ({
      ...a,
      displayNote: isEn ? a.note_en : a.note_vi,
    })),
  }));
}

/**
 * Lấy thông tin mùa du lịch được bản địa hóa
 */
export function getSeasonalInfo(seasonId, lang = 'vi') {
  const season = SEASONAL_CALENDAR.find((s) => s.id === seasonId || s.code === seasonId);
  if (!season) return null;
  const isEn = lang === 'en';

  return {
    ...season,
    displayName: isEn ? season.name_en : season.name_vi,
    displayMonths: isEn ? season.months_en : season.months_vi,
    displayDescription: isEn ? season.description_en : season.description_vi,
    displayExperiences: isEn ? season.experiences_en : season.experiences_vi,
  };
}
