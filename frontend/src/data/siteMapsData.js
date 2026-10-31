// Dữ liệu Bản đồ Nội khu (Micro-GIS Site Map & Precinct Map) cho 20 Di tích Đồng Tháp
// Tích hợp Song ngữ Việt - Anh (VI/EN), Ranh giới Đa giác, Lối đi bộ, Tuyến xuồng ba lá và Sub-POIs

export const SITE_MAPS_DATA = [
  {
    "monument_id": 1,
    "site_type": "complex",
    "recommended_zoom": 18,
    "center": [
      10.447502,
      105.631812
    ],
    "boundary_polygon": [
      [
        10.44615,
        105.63045
      ],
      [
        10.44915,
        105.63045
      ],
      [
        10.44915,
        105.63315
      ],
      [
        10.44615,
        105.63315
      ],
      [
        10.44615,
        105.63045
      ]
    ],
    "walking_trail": [
      [
        10.44662,
        105.63095
      ],
      [
        10.44705,
        105.63135
      ],
      [
        10.447502,
        105.631812
      ],
      [
        10.44795,
        105.6313
      ],
      [
        10.4483,
        105.6324
      ],
      [
        10.44875,
        105.6317
      ],
      [
        10.4471,
        105.63115
      ],
      [
        10.44662,
        105.63095
      ]
    ],
    "sub_pois": [
      {
        "code": "NSS-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng chính đường Phạm Hữu Lầu",
        "name_en": "Main Entrance Gate (Phạm Hữu Lầu St.)",
        "lat": 10.44662,
        "lon": 105.63095,
        "duration_min": 5,
        "desc_vi": "Cổng chính khu di tích tọa lạc trên đường Phạm Hữu Lầu, mở ra không gian rợp mát của vườn cây cổ thụ và hoa kiểng Đồng Tháp. Đây là điểm đón tiếp khách thăm viếng, cung cấp bản đồ và thuyết minh viên hướng dẫn trước khi vào viếng lăng mộ.",
        "desc_en": "The grand main gateway situated on Phạm Hữu Lầu Street opens into a tranquil, shaded botanical sanctuary of century-old trees and manicured native gardens. It serves as the primary welcoming portal for pilgrims and international travelers, offering visitor orientation and guided tour services before accessing the inner memorial precincts.",
        "audio_30s_vi": "Chào mừng quý khách đến với Khu di tích Quốc gia đặc biệt Nguyễn Sinh Sắc. Ngay từ cổng chính đường Phạm Hữu Lầu, không gian thanh tịnh của vườn hoa và rặng cây cổ thụ sẽ đưa quý khách bước vào hành trình tri ân sâu sắc người chí sĩ yêu nước lỗi lạc.",
        "audio_30s_en": "Welcome to the Nguyễn Sinh Sắc Special National Monument. Stepping through this grand gateway on Phạm Hữu Lầu Street, you enter a peaceful sanctuary surrounded by shaded gardens, beginning a meaningful cultural journey honoring the esteemed patriotic scholar and father of President Hồ Chí Minh."
      },
      {
        "code": "NSS-02",
        "order": 2,
        "category": "tomb",
        "icon": "🪷",
        "name_vi": "Khu Lăng mộ Cụ Phó bảng (Vòm sen trắng)",
        "name_en": "Mausoleum of Deputy Laureate Nguyễn Sinh Sắc",
        "lat": 10.447502,
        "lon": 105.631812,
        "duration_min": 15,
        "desc_vi": "Trọng tâm của khu di tích là phần mộ Cụ Phó bảng được che chắn bởi vòm hoa sen trắng cách điệu cao 14,95 mét, tựa như bàn tay xòe úp xuống chở che. Trên đỉnh vòm đắp nổi 9 đầu rồng uy nghiêm vươn ra bốn phương, tượng trưng cho tình cảm của người dân chín nhánh sông Cửu Long.",
        "desc_en": "The focal point of the sanctuary is the sacred tomb protected by an iconic 14.95-meter stylized white lotus canopy resembling a sheltering open hand. Nine sculpted dragon heads crown the dome facing outward, artistically symbolizing the everlasting love and protection offered by the people across the nine tributaries of the Mekong River.",
        "audio_30s_vi": "Trước mắt quý khách là vòm mộ sen trắng thiêng liêng cao gần 15 mét che chở cho phần mộ Cụ Phó bảng Nguyễn Sinh Sắc. Chín đầu rồng vươn cao tượng trưng cho tấm lòng thảo thơm của người dân đồng bằng Cửu Long đời đời ôm ấp, chở che người thầy thuốc, nhà nho yêu nước.",
        "audio_30s_en": "Standing before you is the sacred white lotus dome soaring nearly 15 meters above the tomb of Deputy Laureate Nguyễn Sinh Sắc. Nine stylized dragon heads reach outward, symbolizing the heartfelt devotion of the Mekong Delta people toward the revered patriot who rests peacefully in this Land of Pink Lotuses."
      },
      {
        "code": "NSS-03",
        "order": 3,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Đền thờ & Nhà trưng bày thân thế sự nghiệp",
        "name_en": "Memorial Temple & Life Exhibition Hall",
        "lat": 10.44795,
        "lon": 105.6313,
        "duration_min": 15,
        "desc_vi": "Đền thờ được khánh thành trang nghiêm theo lối kiến trúc truyền thống Nam Bộ với cột gỗ và mái ngói cổ kính. Bên cạnh là nhà trưng bày lưu giữ nhiều hiện vật quý, bút tích, tranh ảnh và tài liệu lịch sử về cuộc đời thanh bạch, hành nghề bốc thuốc cứu dân nghèo của Cụ Phó bảng tại Hòa An.",
        "desc_en": "Constructed in traditional Southern Vietnamese sacred architecture with hardwood pillars and layered tiled roofs, this temple honors Cụ Phó bảng. The adjacent museum showcases authentic personal artifacts, historical photographs, medical implements, and rare documents reflecting his modest lifestyle and dedicated herbal healing practice among local villagers.",
        "audio_30s_vi": "Đền thờ và Nhà trưng bày là nơi lưu giữ những kỷ vật thiêng liêng về cuộc đời thanh bạch của Cụ Phó bảng. Tại đây, quý khách sẽ cảm nhận được y đức cao thượng của một nhà nho đỗ đạt nhưng chọn cuộc sống bình dị, tận tụy bốc thuốc trị bệnh cứu giúp nhân dân.",
        "audio_30s_en": "The Memorial Temple and Exhibition Hall preserve poignant artifacts from the selfless life of Deputy Laureate Nguyễn Sinh Sắc. Here, visitors can explore his medical instruments and writings, honoring a brilliant Confucian scholar who dedicated his final years to healing impoverished villagers with traditional Southern herbal medicine."
      },
      {
        "code": "NSS-04",
        "order": 4,
        "category": "architecture",
        "icon": "🏠",
        "name_vi": "Nhà sàn Bác Hồ & Ao cá (Tỷ lệ 1:1)",
        "name_en": "Replica of President Hồ Chí Minh's Stilt House & Pond",
        "lat": 10.4483,
        "lon": 105.6324,
        "duration_min": 15,
        "desc_vi": "Công trình tái hiện nguyên bản ngôi Nhà sàn Bác Hồ tại Phủ Chủ tịch Hà Nội với tỷ lệ 1:1, soi bóng bên hồ sen và ao cá thanh bình. Đây là tấm lòng tri ân sâu nặng của đồng bào miền Nam nói chung và nhân dân Đất Sen Hồng nói riêng gửi trọn về vị Cha già kính yêu của dân tộc.",
        "desc_en": "This full-scale 1:1 authentic replica faithfully recreates President Hồ Chí Minh's famous stilt house from Hanoi, mirrored over a serene lotus pond and fish reserve. Built with profound reverence, it symbolizes the deep spiritual affection and enduring gratitude of the Southern Vietnamese people toward their beloved national leader.",
        "audio_30s_vi": "Bước qua cây cầu nhỏ, quý khách đang đứng trước ngôi Nhà sàn Bác Hồ tỷ lệ một-một soi bóng bên ao cá rợp mát. Không gian mộc mạc đơn sơ này là biểu tượng sinh động gắn kết tình cảm máu thịt giữa Bác Hồ kính yêu với đồng bào miền Nam anh dũng.",
        "audio_30s_en": "Crossing the arched bridge, you arrive before the full-scale replica of Uncle Hồ's wooden stilt house beside a tranquil fish pond. This unpretentious, elegant setting embodies the deep, sacred affection connecting President Hồ Chí Minh with the people of Southern Vietnam throughout the historic resistance years."
      },
      {
        "code": "NSS-05",
        "order": 5,
        "category": "nature",
        "icon": "🪷",
        "name_vi": "Không gian Làng Hòa An xưa",
        "name_en": "Old Hòa An Heritage Village",
        "lat": 10.44875,
        "lon": 105.6317,
        "duration_min": 15,
        "desc_vi": "Khu bảo tồn tái hiện sinh động cảnh làng quê Nam Bộ đầu thế kỷ XX với rạch Cái Tôm, vườn cây trái, bờ tre, rặng dừa và những nếp nhà gỗ truyền thống. Nơi đây từng đùm bọc, chở che Cụ Phó bảng trong những năm tháng hoạt động yêu nước và hành nghề chữa bệnh cứu người.",
        "desc_en": "This open-air cultural precinct vividly preserves an authentic early 20th-century Southern delta village landscape, featuring the historic Cái Tôm canal, fruit orchards, swaying bamboo clusters, and traditional timber farmhouses. It captures the loving communal sanctuary where grateful villagers protected Cụ Phó bảng during his final years.",
        "audio_30s_vi": "Không gian Làng Hòa An xưa tái hiện trọn vẹn nét thanh bình của thôn quê Nam Bộ đầu thế kỷ hai mươi. Dưới những rặng dừa và mái nhà gỗ thân thương, nhân dân Hòa An đã chở che, cưu mang Cụ Phó bảng suốt những năm tháng cuối đời đầy nghĩa tình.",
        "audio_30s_en": "The Old Hòa An Village enclave recreates the serene rhythms of rural Mekong Delta life in the early 1900s. Amidst waterways and thatched timber homesteads, humble local farmers warmly shielded and assisted Deputy Laureate Nguyễn Sinh Sắc with unshakeable community solidarity and heartfelt hospitality."
      }
    ]
  },
  {
    "monument_id": 2,
    "site_type": "complex",
    "recommended_zoom": 17,
    "center": [
      10.603984,
      105.828127
    ],
    "boundary_polygon": [
      [
        10.6005,
        105.8245
      ],
      [
        10.6075,
        105.8245
      ],
      [
        10.6075,
        105.8315
      ],
      [
        10.6005,
        105.8315
      ],
      [
        10.6005,
        105.8245
      ]
    ],
    "walking_trail": [
      [
        10.6019,
        105.8263
      ],
      [
        10.6028,
        105.8272
      ],
      [
        10.603984,
        105.828127
      ],
      [
        10.6047,
        105.8272
      ],
      [
        10.6062,
        105.8296
      ],
      [
        10.6033,
        105.829
      ],
      [
        10.6019,
        105.8263
      ]
    ],
    "sub_pois": [
      {
        "code": "GT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng đón tiếp & Nhà điều hành di tích",
        "name_en": "Welcome Gate & Visitor Center",
        "lat": 10.6019,
        "lon": 105.8263,
        "duration_min": 5,
        "desc_vi": "Cổng vào Khu di tích Quốc gia đặc biệt Gò Tháp nằm giữa cánh đồng sen bạt ngàn của huyện Tháp Mười. Nhà đón tiếp cung cấp sơ đồ khảo cổ học, thông tin văn hóa Óc Eo và giới thiệu các tuyến tham quan trên đồi cát cổ rộng hơn 300 ha.",
        "desc_en": "The entrance gate to the Gò Tháp Special National Monument is nestled amidst the sweeping lotus fields of Tháp Mười District. The visitor center offers archaeological site maps, historical introductions to the ancient Funan Kingdom, and recommended walking and tram itineraries across the 300-hectare sand ridge sanctuary.",
        "audio_30s_vi": "Chào mừng quý khách đến với Khu di tích Quốc gia đặc biệt Gò Tháp. Từ cổng đón tiếp này, quý vị sẽ bước vào vùng đất thiêng hội tụ cả ba tầng giá trị độc nhất vô nhị: khảo cổ Óc Eo ngàn năm, lịch sử kháng chiến hào hùng và tín ngưỡng dân gian Nam Bộ.",
        "audio_30s_en": "Welcome to Gò Tháp Special National Monument. From this gateway, you step onto a sacred archaeological landscape where three remarkable historical layers converge: the 1,500-year-old Funan civilization, 19th-century anti-colonial resistance, and enduring Southern folklore spirituality."
      },
      {
        "code": "GT-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Gò Tháp Mười & Đài quan sát",
        "name_en": "Tháp Mười Stupa Mound & Observation Tower",
        "lat": 10.603984,
        "lon": 105.828127,
        "duration_min": 15,
        "desc_vi": "Gò Tháp Mười là gò cát cổ cao hơn 3,8 mét so với vùng đồng lầy, nơi từng sừng sững ngôi tháp mười tầng thời cổ xưa. Đây là biểu tượng lịch sử kiên cường của vùng Đồng Tháp Mười, nơi du khách có thể phóng tầm mắt bao quát toàn cảnh đầm sen và rừng tràm ngút ngàn.",
        "desc_en": "Rising 3.8 meters above surrounding marshes, this historic mound once supported an ancient ten-story stupa that gave Đồng Tháp Mười its legendary name. Today, it stands as an unyielding symbol of delta resilience, offering panoramic vistas across tranquil wild lotus lagoons and cajeput woodlands.",
        "audio_30s_vi": "Quý khách đang đứng tại đỉnh Gò Tháp Mười, nơi từng có bảo tháp mười tầng cổ kính làm nên tên gọi linh thiêng của cả vùng châu thổ. Từ độ cao này, hãy ngắm nhìn những đầm sen bát ngát và lắng nghe tiếng vọng ngàn năm của lịch sử miền đồng bằng.",
        "audio_30s_en": "Standing upon the summit of Tháp Mười Mound, you overlook the historic landmark whose ancient ten-tier stupa bestowed the name upon this entire Plain of Reeds. Gaze across blooming lotus marshes and feel the profound historical depth echoing across seventeen centuries."
      },
      {
        "code": "GT-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Đền thờ Thiên hộ Võ Duy Dương & Đốc binh Kiều",
        "name_en": "Temple of Commander Võ Duy Dương & Đốc Binh Kiều",
        "lat": 10.6047,
        "lon": 105.8272,
        "duration_min": 15,
        "desc_vi": "Ngôi đền tôn nghiêm phụng thờ hai vị anh hùng dân tộc Thiên hộ Võ Duy Dương và Đốc binh Nguyễn Tấn Kiều, những người đã chọn vùng đầm lầy hiểm trở Gò Tháp làm đại bản doanh khởi nghĩa chống thực dân Pháp giai đoạn 1862–1866. Hàng năm lễ hội tưởng niệm thu hút hàng trăm ngàn lượt khách.",
        "desc_en": "This reverent temple honors national heroes Commander Võ Duy Dương and Senior Officer Nguyễn Tấn Kiều, who established their anti-colonial military headquarters in these impassable wetlands from 1862 to 1866. The annual memorial festival attracts hundreds of thousands of pilgrims paying solemn tribute to their courage.",
        "audio_30s_vi": "Đền thờ Thiên hộ Võ Duy Dương và Đốc binh Nguyễn Tấn Kiều khắc ghi hào khí bất khuất của nghĩa quân Đồng Tháp Mười thời kỳ đầu kháng Pháp. Giữa đầm lầy hiểm trở, các vị anh hùng đã dựng nên căn cứ địa lẫy lừng, bảo vệ non sông đến hơi thở cuối cùng.",
        "audio_30s_en": "This temple commemorates Commander Võ Duy Dương and Đốc Binh Kiều, legendary leaders of the 1860s anti-colonial uprising. Utilizing the impassable swamp terrain, their brave insurgent forces mounted fierce resistance, leaving a legacy of indomitable patriotism venerated by generations."
      },
      {
        "code": "GT-04",
        "order": 4,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Gò Minh Sư (Di chỉ đền gạch Ấn Độ giáo Óc Eo)",
        "name_en": "Minh Sư Mound (Funan Hindu Brick Sanctorum)",
        "lat": 10.6062,
        "lon": 105.8296,
        "duration_min": 20,
        "desc_vi": "Gò Minh Sư là một trong những di chỉ khảo cổ học Óc Eo quan trọng bậc nhất Đông Nam Á, phát lộ nền móng đền gạch Ấn Độ giáo thế kỷ I–VI cùng hàng trăm lá vàng dâng cúng, hiện vật đá sa thạch và tượng thần Vishnu. Đây là chứng tích rực rỡ của nền văn minh Phù Nam hàng hải cổ đại.",
        "desc_en": "Minh Sư Mound is one of Southeast Asia's most significant Óc Eo archaeological sites, revealing sacred Hindu brick temple foundations from the 1st to 6th centuries CE. Excavations uncovered hundreds of inscribed gold foil offerings, sandstone deities, and statues of Vishnu, attesting to the flourishing maritime Funan Kingdom.",
        "audio_30s_vi": "Trước mắt quý vị là nền gạch đền thờ cổ đại Gò Minh Sư, có niên đại trên một thiên niên kỷ rưỡi. Nơi đây từng là thánh địa Ấn Độ giáo rực rỡ của Vương quốc Phù Nam, nơi các nhà khảo cổ đã phát lộ những lá vàng chạm khắc và tượng thần Vishnu vô giá.",
        "audio_30s_en": "You are viewing the ancient Hindu brick sanctorum of Minh Sư Mound, dating back fifteen centuries. Once a major religious epicenter of the maritime Funan Kingdom, this consecrated site yielded sacred gold plates, pottery, and invaluable stone iconography of Vishnu."
      },
      {
        "code": "GT-05",
        "order": 5,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Miếu Bà Chúa Xứ Gò Tháp",
        "name_en": "Shrine of Lady of the Realm (Bà Chúa Xứ)",
        "lat": 10.6033,
        "lon": 105.829,
        "duration_min": 15,
        "desc_vi": "Miếu Bà Chúa Xứ Gò Tháp là trung tâm tín ngưỡng dân gian lớn nhất tỉnh Đồng Tháp. Lễ hội Vía Bà diễn ra vào rằm tháng 3 âm lịch hàng năm, quy tụ đông đảo đồng bào khắp vùng Nam Bộ về chiêm bái, cầu quốc thái dân an, mùa màng bội thu và cuộc sống thanh bình hạnh phúc.",
        "desc_en": "The Bà Chúa Xứ Shrine at Gò Tháp represents the foremost folk religious center in Đồng Tháp Province. The annual festival held on the full moon of the 3rd lunar month gathers vast throngs of pilgrims across southern Vietnam to pray for agricultural prosperity, communal peace, and personal blessings.",
        "audio_30s_vi": "Miếu Bà Chúa Xứ Gò Tháp là chốn hành hương linh thiêng bậc nhất vùng Đất Sen Hồng. Mỗi dịp rằm tháng Ba âm lịch, hàng vạn khách thập phương lại hội tụ về đây dâng nén tâm hương, cầu cho mưa thuận gió hòa và gia đạo bình an thịnh vượng.",
        "audio_30s_en": "The Shrine of Bà Chúa Xứ is the spiritual heart of Gò Tháp's sacred geography. Each spring during the third lunar month, thousands of pilgrims congregate here beneath fragrant incense smoke to seek health, harmonious family life, and abundant harvests."
      }
    ]
  },
  {
    "monument_id": 3,
    "site_type": "complex",
    "recommended_zoom": 18,
    "center": [
      10.398944,
      105.80354
    ],
    "boundary_polygon": [
      [
        10.3965,
        105.8005
      ],
      [
        10.401,
        105.8005
      ],
      [
        10.401,
        105.806
      ],
      [
        10.3965,
        105.806
      ],
      [
        10.3965,
        105.8005
      ]
    ],
    "walking_trail": [
      [
        10.3976,
        105.8021
      ],
      [
        10.3979,
        105.8025
      ],
      [
        10.3983,
        105.8029
      ],
      [
        10.3985,
        105.8031
      ],
      [
        10.398944,
        105.80354
      ],
      [
        10.3996,
        105.8041
      ],
      [
        10.3976,
        105.8021
      ]
    ],
    "boat_trail": [
      [
        10.3979,
        105.8025
      ],
      [
        10.3982,
        105.8033
      ],
      [
        10.3987,
        105.8039
      ],
      [
        10.3993,
        105.8045
      ],
      [
        10.3998,
        105.804
      ],
      [
        10.398944,
        105.80354
      ],
      [
        10.3979,
        105.8025
      ]
    ],
    "sub_pois": [
      {
        "code": "XQ-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng đón tiếp & Nhà truyền thống Xẻo Quýt",
        "name_en": "Main Gate & Welcome Center",
        "lat": 10.3976,
        "lon": 105.8021,
        "duration_min": 10,
        "desc_vi": "Nằm ven tuyến ĐT 850, cổng khu di tích Xẻo Quýt mở lối vào 50 ha căn cứ kháng chiến ngập nước. Nhà truyền thống tại cổng trưng bày sơ đồ hệ thống công sự hầm hào và hiện vật sinh hoạt của cán bộ Tỉnh ủy Kiến Phong giai đoạn 1960–1975.",
        "desc_en": "Located along Provincial Road 850, the entrance opens into 50 hectares of inundated revolutionary forest base. The welcome gallery displays historical maps of underground trench networks and personal artifacts used by provincial revolutionary leaders from 1960 to 1975.",
        "audio_30s_vi": "Chào mừng quý khách đến với Căn cứ cách mạng Xẻo Quýt. Tại nhà đón tiếp này, quý khách sẽ được giới thiệu về kỳ tích của Tỉnh ủy Kiến Phong, nơi cơ quan đầu não kháng chiến đã bám trụ kiên cường ngay sát đồn bốt địch suốt mười lăm năm lửa đạn.",
        "audio_30s_en": "Welcome to Xẻo Quýt Revolutionary Base. Here at the welcome pavilion, discover the remarkable fortitude of provincial resistance leaders who maintained their subterranean command post deep inside the cajeput swamp, just two kilometers from enemy garrisons."
      },
      {
        "code": "XQ-02",
        "order": 2,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Bến xuồng ba lá xuyên rừng tràm",
        "name_en": "Traditional Sampan Boat Pier",
        "lat": 10.3979,
        "lon": 105.8025,
        "duration_min": 20,
        "desc_vi": "Bến xuồng ba lá là khởi đầu cho hải trình khám phá Xẻo Quýt độc đáo nhất. Du khách ngồi xuồng chèo tay lướt êm qua những con rạch phủ đầy bèo tấm, dưới sự hướng dẫn của các hướng dẫn viên trong trang phục áo bà ba và chiếc khăn rằn mộc mạc Nam Bộ.",
        "desc_en": "This wooden wharf serves as the departure point for an unforgettable wetland tour. Aboard traditional three-plank sampans steered by local women in authentic bà ba attire and checkered scarves, visitors glide silently through duckweed-carpeted waterways beneath cool canopies.",
        "audio_30s_vi": "Mời quý khách bước lên chiếc xuồng ba lá để bắt đầu hải trình len lỏi qua những con rạch rợp bóng tràm mát rượi. Tiếng mái chèo khua nước êm đềm sẽ đưa quý vị ngược dòng thời gian về với năm tháng kháng chiến oai hùng của đất và người Đồng Tháp.",
        "audio_30s_en": "Step aboard a traditional wooden sampan to drift along tranquil wetland canals beneath aromatic cajeput trees. Listen to the gentle dip of the paddle as local guides transport you back in time to the clandestine wartime operations of the Mekong resistance."
      },
      {
        "code": "XQ-03",
        "order": 3,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Hầm bí mật chữ Z & Công sự ngụy trang",
        "name_en": "Zig-Zag Secret Bunker & Camouflaged Parapet",
        "lat": 10.3985,
        "lon": 105.8031,
        "duration_min": 10,
        "desc_vi": "Hầm bí mật chữ Z được đào đắp khéo léo trong bùn lầy và rễ cây tràm cổ thụ, tạo thế phòng thủ khúc khuỷu chống sức ép bom đạn pháo kích. Nắp hầm được ngụy trang bằng thảm dây bòng bong tự nhiên, biến công sự thành một phần bất khả xâm phạm của rừng tràm.",
        "desc_en": "Crafted with remarkable ingenuity directly within swamp mud and cajeput root matrices, this zig-zag bunker deflected artillery blast waves. Its concealed entrance was masterfully disguised under living climbing ferns, blending completely into the swamp environment.",
        "audio_30s_vi": "Trước mắt quý khách là hầm bí mật chữ Z được ngụy trang tuyệt hảo dưới tán rừng tràm. Kết cấu uốn lượn đặc biệt này giúp triệt tiêu mảnh bom pháo, bảo vệ an toàn tuyệt đối cho các cán bộ lãnh đạo cách mạng giữa vùng rốn lũ ngập nước.",
        "audio_30s_en": "This zig-zag subterranean bunker was engineered inside dense cajeput root clusters to withstand heavy bomb concussions. Covered naturally by wild climbing ferns, it exemplifies the ingenuity of swamp guerrilla camouflage that eluded aerial reconnaissance for years."
      },
      {
        "code": "XQ-04",
        "order": 4,
        "category": "museum",
        "icon": "🏠",
        "name_vi": "Lán họp Tỉnh ủy Kiến Phong dưới tán tràm",
        "name_en": "Kiến Phong Provincial Committee Meeting Hut",
        "lat": 10.398944,
        "lon": 105.80354,
        "duration_min": 15,
        "desc_vi": "Cụm lán trại họp bàn chỉ đạo kháng chiến được dựng mộc mạc bằng thân cây tràm và lá dừa nước. Tại căn lán này, nhiều chỉ thị, nghị quyết quan trọng của Tỉnh ủy Kiến Phong đã ra đời, chỉ đạo phong trào đấu tranh chính trị và vũ trang trên toàn địa bàn tỉnh Đồng Tháp.",
        "desc_en": "Constructed simply from rustic cajeput logs and nipa palm thatch, this headquarters hut hosted critical strategic conferences. Within these modest swamp quarters, provincial leaders drafted vital resolutions directing military campaigns across the Mekong Delta.",
        "audio_30s_vi": "Căn lán đơn sơ này từng là nơi Tỉnh ủy Kiến Phong hội họp, đưa ra những quyết sách lịch sử chỉ đạo quân và dân Đồng Tháp đánh giặc giữ nước. Mộc mạc nhưng kiên cường, nơi đây lưu dấu tinh thần thép của những người chiến sĩ cách mạng kiên trung.",
        "audio_30s_en": "This modest timber-and-thatch hut served as the operational command post where provincial leadership convened to chart military strategies. Amidst primitive wetland conditions, unyielding dedication and strategic brilliance guided the delta toward national liberation."
      },
      {
        "code": "XQ-05",
        "order": 5,
        "category": "nature",
        "icon": "🦢",
        "name_vi": "Rừng tràm cổ thụ & Dây bòng bong thủy sinh",
        "name_en": "Ancient Inundated Cajeput Forest & Climbing Ferns",
        "lat": 10.3996,
        "lon": 105.8041,
        "duration_min": 15,
        "desc_vi": "Khu bảo tồn sinh thái Xẻo Quýt lưu giữ hơn 20 ha rừng tràm nguyên sinh hàng chục năm tuổi với hệ thống dây bòng bong chằng chịt rủ bóng xuống mặt nước. Đây là nơi cư ngụ của hơn 170 loài thực vật và 200 loài động vật hoang dã đặc trưng vùng đất ngập nước Đồng Tháp Mười.",
        "desc_en": "Xẻo Quýt preserves over 20 hectares of pristine mature cajeput forest entwined with lush climbing ferns cascading toward mirror-like canals. This wetland biome harbors over 170 plant species and 200 wildlife varieties, offering a living ecological sanctuary of the Plain of Reeds.",
        "audio_30s_vi": "Hít thở bầu không khí tinh khiết của hai mươi héc-ta rừng tràm cổ thụ Xẻo Quýt, quý khách đang hòa mình vào thiên nhiên hoang sơ của Đồng Tháp Mười. Những thảm dây leo xanh mướt buông rủ xuống mặt kênh tạo nên khung cảnh nên thơ và huyền ảo.",
        "audio_30s_en": "Breathe in the pure, restorative air of Xẻo Quýt's ancient cajeput reserve. Shaded beneath towering trees draped in wild emerald ferns, you are immersed in the pristine wetland sanctuary that sheltered heroes and preserves nature in timeless harmony."
      }
    ]
  },
  {
    "monument_id": 4,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.293918,
      105.768298
    ],
    "boundary_polygon": [
      [
        10.29365,
        105.76805
      ],
      [
        10.29425,
        105.76805
      ],
      [
        10.29425,
        105.7686
      ],
      [
        10.29365,
        105.7686
      ],
      [
        10.29365,
        105.76805
      ]
    ],
    "walking_trail": [
      [
        10.29382,
        105.7682
      ],
      [
        10.293918,
        105.768298
      ],
      [
        10.29402,
        105.76838
      ],
      [
        10.2941,
        105.76846
      ],
      [
        10.29382,
        105.7682
      ]
    ],
    "sub_pois": [
      {
        "code": "HTL-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng hoa viên & Mặt tiền Phục Hưng Pháp",
        "name_en": "French Renaissance Façade & Entrance",
        "lat": 10.29382,
        "lon": 105.7682,
        "duration_min": 10,
        "desc_vi": "Mặt tiền ngôi nhà cổ nổi bật bên bờ sông Sa Đéc với vòm cửa cong La Mã, phù điêu đắp nổi kiểu Phục Hưng Pháp thế kỷ XVII. Lớp vỏ kiến trúc phương Tây sang trọng này bao bọc lấy kết cấu nhà rường ba gian truyền thống của người Hoa Phúc Kiến bên trong.",
        "desc_en": "Fronting the romantic Sa Đéc River, the mansion's exterior displays grand 17th-century French Renaissance archways, classical pilasters, and intricate stucco reliefs. This elegant European façade ingeniously envelops a traditional Chinese Southern Min timber structure within.",
        "audio_30s_vi": "Chào mừng quý khách đến với Nhà cổ Huỳnh Thủy Lê bên dòng sông Sa Đéc thơ mộng. Ngay từ cái nhìn đầu tiên, mặt tiền kiến trúc Phục Hưng Pháp quý phái đã tạo nên nét quyến rũ vượt thời gian, đón chào quý khách khám phá kiệt tác giao thoa Đông Tây.",
        "audio_30s_en": "Welcome to the Huỳnh Thủy Lê Ancient House. Admire the elegant 17th-century French Renaissance façade overlooking the Sa Đéc River, introducing an extraordinary architectural synthesis of European baroque grace and Southern Chinese timber craftsmanship."
      },
      {
        "code": "HTL-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Tiền sảnh & Nền sàn tụ tài phong thủy",
        "name_en": "Grand Vestibule & Wealth-Gathering Floor",
        "lat": 10.293918,
        "lon": 105.768298,
        "duration_min": 10,
        "desc_vi": "Bước vào tiền sảnh, du khách bắt gặp nền gạch hoa Marseille nhập khẩu từ Pháp có độ trũng nhẹ ở tâm điểm theo thuật phong thủy Á Đông để 'tụ tài'. Khung nhà bằng gỗ lim quý và trần nhà cao tạo nên cảm giác thoáng đãng, sang trọng và vương giả.",
        "desc_en": "The grand vestibule features authentic patterned Marseille ceramic floor tiles imported from France, uniquely designed with a subtle central depression under Chinese geomancy to accumulate wealth. Lofty ceilings and polished ironwood pillars lend an aura of opulence and nobility.",
        "audio_30s_vi": "Hãy chú ý nền gạch bông nhập từ Pháp với độ trũng nhẹ ngay giữa sảnh. Đây là nét kiến trúc phong thủy tụ tài độc đáo của thương nhân Phúc Kiến, kết hợp hài hòa với bộ khung gỗ lim vững chãi trường tồn hơn một thế kỷ.",
        "audio_30s_en": "Notice the French Marseille floor tiles gently sloping toward the room's center, a geomantic design intended to gather celestial fortune. Polished tropical hardwoods and soaring ceilings reflect the prestige of affluent Sa Đéc merchants in the early 20th century."
      },
      {
        "code": "HTL-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Gian thờ Quan Công & Bao lam sơn son thếp vàng",
        "name_en": "Altar to Lord Guan & Gilded Woodcarvings",
        "lat": 10.29402,
        "lon": 105.76838,
        "duration_min": 15,
        "desc_vi": "Gian giữa ngôi nhà đặt trang trọng bàn thờ Quan Thánh Đế Quân biểu trưng cho chữ Tín và lòng trung nghĩa của giới thương nhân. Hệ thống bao lam, hoành phi, liễn đối được chạm lộng tinh xảo hình chim muông hoa lá và thếp vàng rực rỡ, nguyên vẹn sau hơn một trăm năm.",
        "desc_en": "The central hall houses a venerated altar to Guan Yu, symbolizing business integrity and righteousness. Surrounding the shrine are openwork wooden lintels and lacquered couplets gilded in pure gold leaf, meticulously chiseled with auspicious floral and mythological motifs.",
        "audio_30s_vi": "Gian giữa trang nghiêm tôn thờ Quan Công, biểu tượng cho lòng trung nghĩa và chữ Tín trong giao thương. Những bức hoành phi, bao lam sơn son thếp vàng lộng lẫy quanh bàn thờ là tuyệt tác điêu khắc gỗ thủ công của các nghệ nhân bậc thầy xưa.",
        "audio_30s_en": "The central sanctum is dedicated to Lord Guan, exemplifying loyalty and commercial trust. Admire the exquisite gilded openwork woodcarvings and lacquered calligraphy panels, masterfully crafted by ancestral Fujian woodcarvers over a century ago."
      },
      {
        "code": "HTL-04",
        "order": 4,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Phòng lưu niệm chuyện tình Marguerite Duras",
        "name_en": "Marguerite Duras Romance Exhibition Room",
        "lat": 10.2941,
        "lon": 105.76846,
        "duration_min": 15,
        "desc_vi": "Căn phòng lưu niệm trưng bày nhiều hình ảnh tư liệu, các ấn bản tiểu thuyết 'Người Tình' (L'Amant) đoạt giải Goncourt và những thước phim điện ảnh của đạo diễn Jean-Jacques Annaud. Nơi đây tái hiện mối tình lãng mạn nhưng đầy trắc trở giữa chàng công tử Huỳnh Thủy Lê và cô thiếu nữ Pháp.",
        "desc_en": "This exhibition room preserves rare photographs, international editions of the Prix Goncourt-winning novel 'L'Amant' (The Lover), and film archives from Jean-Jacques Annaud's cinematic masterpiece, chronicling the bittersweet romance between Huỳnh Thủy Lê and young Marguerite Duras.",
        "audio_30s_vi": "Đây là không gian tái hiện mối tình vượt biên giới nổi tiếng giữa công tử Huỳnh Thủy Lê và nữ văn sĩ Pháp Marguerite Duras. Những trang sách Người Tình và các bức ảnh tư liệu quý sẽ đưa quý khách đắm chìm vào câu chuyện tình lãng mạn đã làm say đắm hàng triệu trái tim.",
        "audio_30s_en": "Step into the intimate space that inspired one of world literature's most passionate romances. Historic photographs and film memorabilia bring to life the poignant love story between Chinese heir Huỳnh Thủy Lê and Marguerite Duras along the Sa Đéc River."
      }
    ]
  },
  {
    "monument_id": 5,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.294591,
      105.767124
    ],
    "boundary_polygon": [
      [
        10.2943,
        105.76685
      ],
      [
        10.29485,
        105.76685
      ],
      [
        10.29485,
        105.7674
      ],
      [
        10.2943,
        105.7674
      ],
      [
        10.2943,
        105.76685
      ]
    ],
    "walking_trail": [
      [
        10.29445,
        105.76702
      ],
      [
        10.29453,
        105.76708
      ],
      [
        10.294591,
        105.767124
      ],
      [
        10.29466,
        105.76719
      ],
      [
        10.29445,
        105.76702
      ]
    ],
    "sub_pois": [
      {
        "code": "KAC-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng tam quan rạch Cái Sơn & Sân gạch",
        "name_en": "Tri-Arch Entrance Gate & Forecourt",
        "lat": 10.29445,
        "lon": 105.76702,
        "duration_min": 10,
        "desc_vi": "Cổng chùa Kiến An Cung hướng mặt ra con rạch Cái Sơn êm đềm ở trung tâm Sa Đéc. Sân trước lát gạch tàu cổ kính, có hàng rào sắt đúc và hai lư hương đồng lớn nghi ngút khói thơm đón bước khách hành hương bước vào chốn trang nghiêm thanh tịnh.",
        "desc_en": "The entrance gate of Kiến An Cung faces the picturesque Cái Sơn canal in central Sa Đéc. The brick-paved courtyard features ornamental wrought iron fences and large bronze censers wafting sandalwood incense, ushering worshippers into this peaceful sanctuary.",
        "audio_30s_vi": "Chào mừng quý khách đến với Chùa Kiến An Cung, viên ngọc kiến trúc Phúc Kiến gần một trăm năm tuổi bên dòng rạch Cái Sơn. Bước qua cổng tam quan cổ kính, làn hương trầm thơm ngát sẽ dẫn lối quý vị vào không gian tâm linh linh thiêng.",
        "audio_30s_en": "Welcome to Kiến An Cung Temple, a century-old masterpiece of Fujian architecture by the Cái Sơn canal. Crossing the ceremonial forecourt amidst fragrant incense, prepare to admire extraordinary Southern Chinese artistry preserved in pristine integrity."
      },
      {
        "code": "KAC-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Mái ngói lượn sóng & Nghệ thuật khảm gốm",
        "name_en": "Undulating Wave Roof & Porcelain Mosaic Sculptures",
        "lat": 10.29453,
        "lon": 105.76708,
        "duration_min": 10,
        "desc_vi": "Đỉnh mái chùa là tuyệt tác tạo hình với ba lớp ngói âm dương uốn lượn mềm mại như sóng nước biển khơi. Trên bờ nóc trang trí quần thể tiểu tượng rồng phượng, thần tiên được ghép công phu từ hàng vạn mảnh gốm sành sứ nhiều màu sắc mang từ Phúc Kiến sang.",
        "desc_en": "The temple's soaring roofline forms an undulating wave silhouette symbolizing the sea voyages of pioneering merchants. Its ridgelines are crowned with ceramic dragons and folklore figurines meticulously assembled from colorful porcelain shards imported directly from ancient Fujian.",
        "audio_30s_vi": "Hãy ngước nhìn mái ngói uốn lượn ba lớp như những con sóng mềm mại. Từng bức tượng rồng phượng và điển tích thần thoại trên bờ nóc đều được nghệ nhân cắt ghép tỉ mỉ từ những mảnh gốm sứ tinh xảo, rực rỡ dưới ánh nắng vàng.",
        "audio_30s_en": "Look up at the multi-layered undulating roofs resembling gentle ocean waves. Master artisans chiseled and assembled vibrant shards of antique porcelain to create dynamic dragons and legendary folklore figures crowning the temple crests."
      },
      {
        "code": "KAC-03",
        "order": 3,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Giếng trời (Thiên tỉnh) & Cột đá Quảng Đông",
        "name_en": "Celestial Courtyard (Skywell) & Granite Pillars",
        "lat": 10.294591,
        "lon": 105.767124,
        "duration_min": 10,
        "desc_vi": "Thiên tỉnh là khoảng sân lộ thiên ở trung tâm chùa, giúp thu nạp ánh sáng tự nhiên và gió trời thông thoáng theo nguyên lý âm dương. Xung quanh là hệ thống cột đá nguyên khối chiseled từ Trung Hoa cùng vì kèo liên kết bằng mộng gỗ hoàn toàn không dùng đinh sắt.",
        "desc_en": "The central skywell (thiên tỉnh) captures natural sunlight and breezes while channeling rainwater in harmony with yin-yang philosophy. It is framed by monumental granite pillars and timber rafters assembled entirely with mortise-and-tenon joints without a single iron nail.",
        "audio_30s_vi": "Khoảng giếng trời thiên tỉnh này giúp không gian chùa luôn chan hòa ánh sáng và thoáng đãng. Hãy chiêm ngưỡng những hàng cột đá nguyên khối và hệ thống mộng gỗ tài tình, hoàn toàn không sử dụng một chiếc đinh sắt nào.",
        "audio_30s_en": "This central open-air skywell floods the temple interior with natural luminescence and ventilation. Marvel at the solid granite columns and sophisticated interlocking mortise-and-tenon woodwork constructed entirely without iron nails."
      },
      {
        "code": "KAC-04",
        "order": 4,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Chánh điện Uy Linh Công Quách Vương",
        "name_en": "Main Sanctuary of Saint King Guo (Quách Thánh Vương)",
        "lat": 10.29466,
        "lon": 105.76719,
        "duration_min": 15,
        "desc_vi": "Chánh điện uy nghiêm tôn thờ tượng Uy Linh Công Quách Vương (Quách Thánh Vương) và Bảo Sanh Đại Đế. Không gian nội điện ngập tràn sắc vàng son lộng lẫy của hoành phi, bao lam chạm trổ tích xưa, cùng tiếng chuông đồng thanh tịnh xua tan mọi âu lo trần thế.",
        "desc_en": "The sacred main hall enshrines Saint King Guo (Quách Thánh Vương) alongside the Great Emperor of Life Protection. Resplendent with gilded horizontal placards, intricate dragon lintels, and antique bronze bells, the sanctuary radiates deep spiritual solemnity.",
        "audio_30s_vi": "Chánh điện Chùa Kiến An Cung là nơi tôn thờ Đức Uy Linh Công Quách Vương hộ quốc an dân. Trong làn hương trầm nghi ngút và sắc vàng son rực rỡ, quý khách sẽ cảm nhận được lòng thành kính và sự gắn kết bền chặt của cộng đồng người Hoa tại Sa Đéc.",
        "audio_30s_en": "The main sanctum honors Saint King Guo, guardian of benevolence and communal unity. Surrounded by antique gilded woodcarvings and sandalwood incense, experience the profound spiritual heritage cherished by the Chinese community of Sa Đéc."
      }
    ]
  },
  {
    "monument_id": 6,
    "site_type": "complex",
    "recommended_zoom": 17,
    "center": [
      10.727185,
      105.536173
    ],
    "boundary_polygon": [
      [
        10.7245,
        105.5335
      ],
      [
        10.7335,
        105.5335
      ],
      [
        10.7335,
        105.5435
      ],
      [
        10.7245,
        105.5435
      ],
      [
        10.7245,
        105.5335
      ]
    ],
    "walking_trail": [
      [
        10.7265,
        105.5355
      ],
      [
        10.7269,
        105.5359
      ],
      [
        10.727185,
        105.536173
      ],
      [
        10.7265,
        105.5355
      ]
    ],
    "boat_trail": [
      [
        10.727185,
        105.536173
      ],
      [
        10.7282,
        105.5372
      ],
      [
        10.7292,
        105.5385
      ],
      [
        10.7305,
        105.5398
      ],
      [
        10.7315,
        105.541
      ],
      [
        10.7292,
        105.5385
      ],
      [
        10.727185,
        105.536173
      ]
    ],
    "sub_pois": [
      {
        "code": "TC-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Trung tâm đón tiếp du khách & Bến thuyền Ramsar",
        "name_en": "Ramsar Visitor Center & Marina",
        "lat": 10.7265,
        "lon": 105.5355,
        "duration_min": 10,
        "desc_vi": "Trung tâm đón tiếp là điểm xuất phát chính thức của Vườn quốc gia Tràm Chim tại thị trấn Tràm Chim. Nơi đây cung cấp vé tham quan, thông tin bảo tồn sinh thái đất ngập nước và đăng ký các tuyến xuồng máy, tắc ráng khám phá vùng lõi Ramsar thứ 2.000 của thế giới.",
        "desc_en": "The main reception complex in Tràm Chim Town serves as the official portal to the national park. Visitors can book guided eco-boat tours, receive environmental briefings on wetland conservation, and purchase permits to explore World Ramsar Site #2000.",
        "audio_30s_vi": "Chào mừng quý khách đến với Vườn quốc gia Tràm Chim, Khu Ramsar tầm quan trọng quốc tế thứ hai ngàn của thế giới. Tại trung tâm đón tiếp này, quý vị sẽ bắt đầu chuyến hành trình kỳ thú khám phá bảo tàng sinh thái sống động của vùng Đồng Tháp Mười.",
        "audio_30s_en": "Welcome to Tràm Chim National Park, the world's 2,000th Ramsar Wetland Site of International Importance. Here at the visitor marina, embark on an inspiring eco-cruise into the heart of the pristine Plain of Reeds biosphere."
      },
      {
        "code": "TC-02",
        "order": 2,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Nhà trưng bày mẫu vật sinh học & Sếu đầu đỏ",
        "name_en": "Wetland Biodiversity & Sarus Crane Museum",
        "lat": 10.7269,
        "lon": 105.5359,
        "duration_min": 15,
        "desc_vi": "Khu bảo tàng sinh thái trưng bày sinh động các tiêu bản động thực vật quý hiếm, hình ảnh vòng đời loài Sếu đầu đỏ (Grus antigone sharpii) cùng mẫu các loài cá nước ngọt, lúa ma và hoa hoàng đầu ấn đặc hữu của vùng châu thổ Mê Kông.",
        "desc_en": "This educational museum houses vivid natural history displays, biological specimens, and lifelike exhibits illustrating the migratory lifecycle of the rare Eastern Sarus Crane (Grus antigone sharpii), alongside native freshwater fish species and endemic wetland flora.",
        "audio_30s_vi": "Nhà trưng bày mẫu vật sẽ giúp quý khách hiểu sâu hơn về sự kỳ diệu của hệ sinh thái đất ngập nước Tràm Chim. Đặc biệt, câu chuyện về loài Sếu đầu đỏ thanh cao, biểu tượng của sự thủy chung và trường thọ, sẽ để lại trong lòng quý vị ấn tượng khó phai.",
        "audio_30s_en": "This museum provides fascinating insights into Tràm Chim's rich freshwater biodiversity. Discover the story of the magnificent Eastern Sarus Crane, a globally threatened species revered across Southeast Asia as a living symbol of fidelity and ecological harmony."
      },
      {
        "code": "TC-03",
        "order": 3,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Bến tàu xuất phát tuyến sinh thái C4",
        "name_en": "Eco-Tour Boat Departure Pier (C4 Route)",
        "lat": 10.727185,
        "lon": 105.536173,
        "duration_min": 15,
        "desc_vi": "Bến tàu du lịch là nơi neo đậu của đội vỏ lãi và thuyền máy phục vụ du khách. Tuyến du lịch sinh thái C4 đưa khách rẽ sóng lướt qua những thảm sen hồng, đồng lúa trời và rừng tràm bạt ngàn, mang đến trải nghiệm ngắm chim hoang dã cất cánh rợp trời.",
        "desc_en": "The departure pier accommodates eco-tour motorized longtails and electric boats. Navigating along canal route C4, visitors glide through expanses of blossoming pink lotuses, floating wild rice, and ancient cajeput forests, witnessing flocks of waterbirds taking flight against delta skies.",
        "audio_30s_vi": "Mời quý khách lên tàu để bắt đầu hành trình khám phá tuyến du lịch C4. Con thuyền rẽ sóng lướt qua những cánh đồng sen bát ngát và rừng tràm ngút ngàn, đưa quý khách vào thế giới hoang sơ tuyệt mỹ của hàng vạn cánh chim trời rợp bóng hoàng hôn.",
        "audio_30s_en": "Board your eco-boat to explore the celebrated C4 canal circuit. As your vessel glides past blooming lotus lagoons and dense cajeput woods, immerse yourself in an untamed avian paradise echoing with the calls of herons and cormorants."
      },
      {
        "code": "TC-04",
        "order": 4,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Đài quan sát chim hoang dã tràm ngập nước",
        "name_en": "Elevated Bird Observation Tower",
        "lat": 10.7292,
        "lon": 105.5385,
        "duration_min": 20,
        "desc_vi": "Đài quan sát bằng gỗ cao vút được bố trí giữa vùng lõi phân khu A1, trang bị ống nhòm chuyên dụng. Từ đỉnh đài, du khách có thể phóng tầm mắt 360 độ chiêm ngưỡng vũ điệu chao liệng của các loài cò, diệc, le le và cồng cộc trở về tổ ấm lúc hoàng hôn.",
        "desc_en": "Positioned strategically in core zone A1, this elevated wooden observation tower is equipped with optical spotting scopes. The 360-degree viewing platform offers breathtaking panoramas of thousands of waterbirds wheeling gracefully above the emerald forest canopy.",
        "audio_30s_vi": "Từ đỉnh đài quan sát chim, một biển rừng tràm xanh ngắt và những cánh đồng ngập nước sẽ trải rộng dưới chân quý vị. Vào buổi bình minh và hoàng hôn, hàng vạn cánh cò trắng cất cánh chao liệng tạo nên một bức tranh thiên nhiên kỳ vĩ không đâu có được.",
        "audio_30s_en": "From the observation deck, a verdant ocean of cajeput trees and flooded savannah unfolds beneath your gaze. At dawn and twilight, thousands of white egrets and storks fill the sky in breathtaking murmuration, creating an unforgettable spectacle of pure nature."
      },
      {
        "code": "TC-05",
        "order": 5,
        "category": "nature",
        "icon": "🪷",
        "name_vi": "Đầm sen hoang dã & Đồng cỏ năng sinh thái",
        "name_en": "Wild Lotus Lagoon & Eleocharis Grasslands",
        "lat": 10.7315,
        "lon": 105.541,
        "duration_min": 15,
        "desc_vi": "Đầm sen tự nhiên và bãi cỏ năng kim bạt ngàn là nguồn thức ăn chủ yếu của Sếu đầu đỏ trong mùa khô. Vào mùa nước nổi, mặt nước phủ kín hoa sen hồng thơm ngát, kết hợp thảm hoa hoàng đầu ấn vàng rực, tạo nên cảnh sắc đặc trưng của Đất Sen Hồng.",
        "desc_en": "Expansive natural lotus lagoons and Eleocharis sedge grasslands provide the primary foraging habitat for Sarus Cranes during the dry season. In seasonal flood cycles, fragrant pink lotuses and yellow bladderwort blossoms paint the floodplain in vibrant delta hues.",
        "audio_30s_vi": "Đầm sen tự nhiên và đồng cỏ năng kim trước mắt quý vị là cội nguồn nuôi dưỡng sự sống của Vườn quốc gia Tràm Chim. Vẻ đẹp thuần khiết của ngàn đóa sen hồng bung nở giữa thiên nhiên hoang dã chính là linh hồn của vùng đất sen ngát hương Đồng Tháp.",
        "audio_30s_en": "These wild lotus marshes and native sedge grasslands are the vital lifeblood of Tràm Chim's ecosystem. The pure, unblemished beauty of thousands of blooming pink lotuses across open waters embodies the timeless spirit of Đồng Tháp Province."
      }
    ]
  },
  {
    "monument_id": 7,
    "site_type": "complex",
    "recommended_zoom": 17,
    "center": [
      10.588263,
      105.611757
    ],
    "boundary_polygon": [
      [
        10.5855,
        105.609
      ],
      [
        10.5925,
        105.609
      ],
      [
        10.5925,
        105.6155
      ],
      [
        10.5855,
        105.6155
      ],
      [
        10.5855,
        105.609
      ]
    ],
    "walking_trail": [
      [
        10.5872,
        105.6108
      ],
      [
        10.5879,
        105.6112
      ],
      [
        10.588263,
        105.611757
      ],
      [
        10.5886,
        105.6121
      ],
      [
        10.5872,
        105.6108
      ]
    ],
    "boat_trail": [
      [
        10.5886,
        105.6121
      ],
      [
        10.5892,
        105.6128
      ],
      [
        10.5902,
        105.6138
      ],
      [
        10.591,
        105.6132
      ],
      [
        10.5898,
        105.6122
      ],
      [
        10.5886,
        105.6121
      ]
    ],
    "sub_pois": [
      {
        "code": "GG-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng vào & Khu đón tiếp ốc đảo xanh",
        "name_en": "Oasis Welcome Gateway & Ticket Hub",
        "lat": 10.5872,
        "lon": 105.6108,
        "duration_min": 10,
        "desc_vi": "Cổng khu du lịch sinh thái Gáo Giồng nằm cách TP. Cao Lãnh 17 km về hướng Đông Bắc, mở ra không gian ốc đảo xanh rộng 1.700 ha. Khu đón tiếp giới thiệu lịch sử trồng tràm cải tạo đất phèn sau năm 1985 và hướng dẫn du khách trải nghiệm các dịch vụ sinh thái.",
        "desc_en": "Located 17 kilometers northeast of Cao Lãnh City, Gáo Giồng's welcome gateway introduces a 1,700-hectare wetland oasis. The reception center highlights heroic post-1985 reforestation campaigns that transformed acid-sulfate floodplains into a thriving ecological sanctuary.",
        "audio_30s_vi": "Chào mừng quý khách đến với Khu du lịch sinh thái Gáo Giồng, ốc đảo xanh kỳ diệu của vùng Đồng Tháp Mười. Bước qua cổng đón tiếp, quý khách sẽ cảm nhận ngay làn gió mát rượi và hương thơm thanh khiết của đại ngàn rừng tràm nguyên sinh.",
        "audio_30s_en": "Welcome to Gáo Giồng Ecotourism Oasis, the green lung of the Plain of Reeds. Crossing the entrance portal, breathe in the fragrant cajeput-scented air and prepare to explore one of southern Vietnam's most inspiring reforestation triumphs."
      },
      {
        "code": "GG-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Đài quan sát toàn cảnh 18m",
        "name_en": "18-Meter Wooden Canopy Observation Tower",
        "lat": 10.588263,
        "lon": 105.611757,
        "duration_min": 15,
        "desc_vi": "Đài quan sát bằng gỗ cao 18 mét sừng sững giữa trung tâm rừng tràm. Chinh phục các bậc thang lên đỉnh đài, du khách được tưởng thưởng bằng tầm nhìn toàn cảnh 360 độ ôm trọn thảm rừng xanh mướt ngút ngàn và các đàn chim chao lượn rợp trời.",
        "desc_en": "Soaring 18 meters above the forest floor, this rustic wooden watchtower is the centerpiece of Gáo Giồng. Ascending to the summit rewards visitors with an unbroken 360-degree panorama across a shimmering sea of emerald cajeput foliage and soaring waterbirds.",
        "audio_30s_vi": "Đứng trên đỉnh đài quan sát cao mười tám mét, quý khách sẽ được phóng tầm mắt ngắm nhìn một màu xanh bạt ngàn của rừng tràm Gáo Giồng. Cảnh tượng hàng ngàn cánh chim bay lượn trên nền trời bao la sẽ mang lại cảm giác khoáng đạt vô ngần.",
        "audio_30s_en": "Standing atop the 18-meter observation deck, marvel at the boundless emerald canopy stretching to the horizon. Feel the fresh breeze and watch thousands of birds gliding over endless wetlands, feeling truly connected to nature's grandeur."
      },
      {
        "code": "GG-03",
        "order": 3,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Bến xuồng chèo xuyên thảm bèo hoa dâu",
        "name_en": "Traditional Sampan Pier over Green Duckweed",
        "lat": 10.5886,
        "lon": 105.6121,
        "duration_min": 20,
        "desc_vi": "Bến xuồng ba lá đưa du khách tiến sâu vào vùng lõi sân chim. Những chiếc xuồng gỗ mộc mạc do các cô gái Đồng Tháp trong tà áo bà ba chèo nhẹ nhàng, rẽ lối đi xuyên qua thảm bèo tai tượng và bèo hoa dâu xanh mướt bồng bềnh trên mặt nước.",
        "desc_en": "This wooden jetty offers access to the core bird sanctuary aboard hand-rowed wooden sampans. Steered gracefully by local female boaters in traditional áo bà ba, the boats gently part vibrant green carpets of water lettuce and duckweed along silent waterways.",
        "audio_30s_vi": "Mời quý khách bước xuống chiếc xuồng ba lá xinh xắn. Mái chèo khua nhẹ đưa con thuyền lướt êm trên thảm bèo xanh biếc, đưa quý khách len lỏi qua từng vòm cây rợp mát để lắng nghe bản hòa âm trong trẻo của các loài chim rừng.",
        "audio_30s_en": "Step into a wooden sampan as your guide gently rows through emerald mats of floating duckweed. Gliding beneath overhanging cajeput branches, listen to the melodious chorus of bird calls echoing through this secluded wetland paradise."
      },
      {
        "code": "GG-04",
        "order": 4,
        "category": "nature",
        "icon": "🦢",
        "name_vi": "Khu bảo tồn Sân chim 36 ha (Trích mồng đỏ)",
        "name_en": "36-Hectare Bird Sanctuary (Swamphen Colony)",
        "lat": 10.5902,
        "lon": 105.6138,
        "duration_min": 20,
        "desc_vi": "Sân chim rộng 36 ha là nơi cư ngụ và sinh sản quanh năm của hàng chục ngàn cá thể chim nước, tiêu biểu là loài trích mồng đỏ với bộ lông xanh tím và mỏ đỏ rực rỡ. Nơi đây còn có cò trắng, cồng cộc, diệc xám và vạc làm tổ dày đặc trên các cành tràm.",
        "desc_en": "This protected 36-hectare bird reserve is home to tens of thousands of nesting waterbirds, famously featuring the charismatic Grey-headed Swamphen (trích mồng đỏ) with its vivid crimson beak. Herons, cormorants, and egrets nest profusely across the branches.",
        "audio_30s_vi": "Quý khách đang ở rất gần Sân chim tự nhiên ba mươi sáu héc-ta của Gáo Giồng. Hãy chú ý ngắm nhìn loài trích mồng đỏ xinh đẹp với bộ lông xanh biếc và chiếc mỏ đỏ tươi – loài chim biểu tượng đầy kiêu hãnh của vùng đồng nước trù phú nơi đây.",
        "audio_30s_en": "You are approaching Gáo Giồng's 36-hectare natural bird sanctuary. Keep watch for the vibrant Grey-headed Swamphen, whose iridescent indigo plumage and bright red frontal shield make it the proud living emblem of this fertile marshland."
      },
      {
        "code": "GG-05",
        "order": 5,
        "category": "service",
        "icon": "🍵",
        "name_vi": "Nhà nổi ẩm thực đồng quê lá sen",
        "name_en": "Floating Bamboo Culinary Pavilions",
        "lat": 10.5879,
        "lon": 105.6112,
        "duration_min": 20,
        "desc_vi": "Cụm nhà sàn nổi bằng tre nứa mộc mạc bên hồ sen là nơi du khách thưởng thức phong vị ẩm thực trứ danh của Đất Sen Hồng: cá lóc nướng trui cuốn lá sen non, lẩu chua cá linh bông điên điển, chuột đồng quay lu và nhấp ngụm rượu sen thơm nồng.",
        "desc_en": "These rustic floating bamboo pavilions along the lotus canal serve celebrated culinary delicacies of the Mekong Delta: charcoal-grilled snakehead fish wrapped in tender young lotus leaves, linh fish sour soup with sesbania blossoms, and aromatic lotus seed tea.",
        "audio_30s_vi": "Sau chuyến du ngoạn rừng tràm, mời quý khách dừng chân tại nhà nổi ẩm thực để thưởng thức món cá lóc nướng trui cuốn lá sen non thơm bùi. Hương vị đồng quê mộc mạc hòa cùng chén rượu sen nồng ấm sẽ lưu luyến bước chân quý vị.",
        "audio_30s_en": "After exploring the wetland trails, relax at the floating culinary pavilions to savor grilled snakehead fish wrapped in crisp lotus leaves. Authentic delta gastronomy paired with fragrant lotus tea offers a delightful conclusion to your visit."
      }
    ]
  },
  {
    "monument_id": 8,
    "site_type": "complex",
    "recommended_zoom": 17,
    "center": [
      10.315397,
      105.749722
    ],
    "boundary_polygon": [
      [
        10.3125,
        105.7465
      ],
      [
        10.3185,
        105.7465
      ],
      [
        10.3185,
        105.7535
      ],
      [
        10.3125,
        105.7535
      ],
      [
        10.3125,
        105.7465
      ]
    ],
    "walking_trail": [
      [
        10.3138,
        105.7482
      ],
      [
        10.3148,
        105.7511
      ],
      [
        10.315397,
        105.749722
      ],
      [
        10.3162,
        105.7505
      ],
      [
        10.3171,
        105.7514
      ],
      [
        10.3138,
        105.7482
      ]
    ],
    "sub_pois": [
      {
        "code": "LH-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng chào Làng hoa Sa Đéc đường Tân Quy Đông",
        "name_en": "Grand Floral Gateway (Tân Quy Đông)",
        "lat": 10.3138,
        "lon": 105.7482,
        "duration_min": 10,
        "desc_vi": "Cổng chào bề thế dẫn vào thủ phủ hoa kiểng lớn nhất miền Tây Nam Bộ với hơn 950 ha và 4.000 hộ canh tác. Tuyến đường hoa rực rỡ sắc màu cúc mâm xôi, hoa hồng, dạ yến thảo và mai vàng mở ra không gian tham quan ngập tràn hương sắc.",
        "desc_en": "This grand arched gateway welcomes visitors into the floral capital of the Mekong Delta, spanning over 950 hectares with 4,000 cultivating households. The flower-lined boulevard showcases vibrant displays of chrysanthemums, roses, petunias, and ornamental bonsai.",
        "audio_30s_vi": "Chào mừng quý khách đến với Làng hoa Sa Đéc, thủ phủ hoa kiểng trăm năm tuổi bên dòng sông Tiền. Ngay từ cổng chào đường Tân Quy Đông, quý khách sẽ choáng ngợp trước muôn sắc hoa rực rỡ và nhịp sống rộn ràng của làng nghề truyền thống.",
        "audio_30s_en": "Welcome to Sa Đéc Flower Village, the century-old floral kingdom of the Mekong Delta. From this welcoming gateway along Tân Quy Đông Boulevard, immerse yourself in dazzling floral tapestries and the lively artisanal spirit of delta horticulturists."
      },
      {
        "code": "LH-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Giàn hoa trên mặt nước sông Sa Đéc",
        "name_en": "Elevated Canal-Top Flower Trellises",
        "lat": 10.315397,
        "lon": 105.749722,
        "duration_min": 15,
        "desc_vi": "Nét độc nhất vô nhị của Làng hoa Sa Đéc là hoa được trồng trên các giàn tre cao cách mặt rạch ngập nước khoảng một mét. Người nông dân chèo xuồng lướt nhẹ giữa các luống hoa để tưới nước, bón phân và thu hoạch, tạo nên cảnh sắc thơ mộng độc đáo.",
        "desc_en": "The iconic signature of Sa Đéc is its unique horticultural method: flowers are cultivated on elevated bamboo trellises erected above flooded canal beds. Farmers row canoes between rows of blooming pots to tend and harvest their blossoms in poetic delta rhythm.",
        "audio_30s_vi": "Trước mắt quý khách là những giàn hoa nổi trên mặt nước độc nhất vô nhị. Người nông dân Sa Đéc đã sáng tạo nên kỹ thuật canh tác tuyệt vời này để thích ứng với mùa nước nổi, tạo nên hình ảnh người chèo xuồng chăm hoa đẹp tựa bức tranh thủy mặc.",
        "audio_30s_en": "Behold the extraordinary sight of flower pots flourishing atop bamboo trellises over shimmering canal waters. Adapted ingeniously to delta floodwaters, this floating farming method creates a world-famous living landscape found nowhere else on earth."
      },
      {
        "code": "LH-03",
        "order": 3,
        "category": "nature",
        "icon": "🪷",
        "name_vi": "Vườn hoa hồng cổ Sa Đéc & Cúc mâm xôi",
        "name_en": "Sa Đéc Heritage Rose & Chrysanthemum Gardens",
        "lat": 10.3162,
        "lon": 105.7505,
        "duration_min": 15,
        "desc_vi": "Khu vườn quy tụ hơn 50 giống hoa hồng bản địa và ngoại nhập, nổi bật là giống hồng Sa Đéc thơm ngát, kết hợp cùng hàng vạn chậu cúc mâm xôi vàng óng ả chuẩn bị phục vụ thị trường Tết. Đây là điểm check-in yêu thích bậc nhất của du khách thập phương.",
        "desc_en": "This specialized garden showcases over 50 varieties of heritage and imported roses, notably the fragrant indigenous Sa Đéc rose, alongside vast golden fields of raspberry chrysanthemums (cúc mâm xôi) cultivated for the Lunar New Year celebrations.",
        "audio_30s_vi": "Quý khách đang đứng giữa thiên đường hoa hồng cổ và cúc mâm xôi ngát hương. Từng cánh hoa hồng nhung kiêu sa và những luống cúc vàng ươm dưới nắng phương Nam chính là kết tinh của một thế kỷ tình yêu hoa và bàn tay khéo léo của người nghệ nhân Sa Đéc.",
        "audio_30s_en": "You are surrounded by fragrant heritage roses and radiant golden chrysanthemums. These flourishing blossoms reflect over a century of horticultural devotion and ancestral craftsmanship passed down through generations of Sa Đéc gardening families."
      },
      {
        "code": "LH-04",
        "order": 4,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Không gian Tri thức dân gian Nghề hoa kiểng",
        "name_en": "Sa Đéc Floriculture Intangible Heritage House",
        "lat": 10.3171,
        "lon": 105.7514,
        "duration_min": 15,
        "desc_vi": "Nhà trưng bày tôn vinh Nghề trồng hoa kiểng Sa Đéc – Di sản văn hóa phi vật thể Quốc gia. Không gian lưu giữ các dụng cụ làm vườn cổ truyền, hình ảnh các bậc tiền nhân lập nghiệp và trình diễn kỹ thuật tạo thế bonsai, ghép cành hoa kiểng điêu luyện.",
        "desc_en": "This heritage center honors the folk knowledge of Sa Đéc ornamental floriculture, officially designated as a National Intangible Cultural Heritage. It features historic agricultural implements, archives of founding horticulturists, and live bonsai-shaping workshops.",
        "audio_30s_vi": "Không gian di sản này tôn vinh nghề trồng hoa kiểng Sa Đéc – Di sản văn hóa phi vật thể Quốc gia. Tại đây, quý khách sẽ hiểu rõ hơn về tri thức dân gian trăm năm, nơi tình yêu cây cỏ đã hóa thân thành nghệ thuật làm đẹp cho đời.",
        "audio_30s_en": "This cultural hall celebrates Sa Đéc's floricultural heritage, inscribed in the National Inventory of Intangible Cultural Heritage. Explore generations of folk wisdom where humble gardening blossomed into an internationally renowned living art form."
      },
      {
        "code": "LH-05",
        "order": 5,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Đài ngắm hoa trên cao 360 độ",
        "name_en": "Skyview 360 Floral Observation Deck",
        "lat": 10.3148,
        "lon": 105.7511,
        "duration_min": 15,
        "desc_vi": "Đài ngắm hoa cao hơn 15 mét cho phép du khách chiêm ngưỡng toàn cảnh bức thảm hoa khổng lồ muôn màu muôn sắc trải dài ngút tầm mắt. Từ trên cao, mạng lưới kênh rạch uốn lượn và những giàn hoa nổi hiện lên sinh động như một bức tranh thủy mặc rực rỡ.",
        "desc_en": "Rising 15 meters above the flower fields, this observation deck offers a panoramic 360-degree viewpoint over kaleidoscopic floral carpets. From this elevated vantage, winding canals and floating flower trellises form a magnificent visual spectacle.",
        "audio_30s_vi": "Lên đến đỉnh đài quan sát, cả làng hoa Sa Đéc bỗng chốc thu trọn vào tầm mắt quý vị như một bức tranh thổ cẩm khổng lồ rực rỡ sắc màu. Những luống hoa thẳng tắp soi bóng bên dòng kênh uốn lượn sẽ là kỷ niệm thị giác không thể nào quên.",
        "audio_30s_en": "Ascending the skyview observation deck, the entire Sa Đéc floral expanse unfolds like a vibrant embroidered delta tapestry. Gaze across orderly rows of blossoms mirrored over shimmering waterways for an unforgettable visual memory."
      }
    ]
  },
  {
    "monument_id": 9,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.309325,
      105.542441
    ],
    "boundary_polygon": [
      [
        10.3088,
        105.5419
      ],
      [
        10.30985,
        105.5419
      ],
      [
        10.30985,
        105.5431
      ],
      [
        10.3088,
        105.5431
      ],
      [
        10.3088,
        105.5419
      ]
    ],
    "walking_trail": [
      [
        10.30905,
        105.54215
      ],
      [
        10.30915,
        105.54228
      ],
      [
        10.309325,
        105.542441
      ],
      [
        10.3095,
        105.5426
      ],
      [
        10.3097,
        105.5428
      ],
      [
        10.30905,
        105.54215
      ]
    ],
    "sub_pois": [
      {
        "code": "DY-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng vào Đình thần Định Yên & Làng chiếu cổ",
        "name_en": "Gateway to Định Yên Temple & Ancient Mat Village",
        "lat": 10.30905,
        "lon": 105.54215,
        "duration_min": 5,
        "desc_vi": "Cổng dẫn vào quần thể Di tích quốc gia Đình thần Định Yên và làng nghề dệt chiếu hơn 100 năm tuổi ven bờ sông Hậu. Nơi đây mở ra không gian rộn ràng của tiếng thoi đưa, khung dệt lách cách và những bó sợi lác phơi dài dọc theo đường làng.",
        "desc_en": "This entrance opens into the historic grounds of Định Yên Communal Temple and its century-old sedge mat craft village along the Hậu River. Visitors are greeted by the rhythmic clatter of wooden weaving looms and vivid bundles of colorful dyed sedge reeds drying under the sun.",
        "audio_30s_vi": "Chào mừng quý khách đến với Làng nghề dệt chiếu Định Yên bên dòng sông Hậu hiền hòa. Tiếng khung cửi lách cách và sắc màu rực rỡ của những bó lác nhuộm đỏ vàng sẽ dẫn lối quý khách khám phá Di sản văn hóa phi vật thể Quốc gia độc đáo này.",
        "audio_30s_en": "Welcome to Định Yên Sedge Mat Craft Village along the serene Hậu River. The harmonious clacking of wooden looms and radiant rows of scarlet and saffron sedge fibers welcome you into this vibrant National Intangible Cultural Heritage sanctuary."
      },
      {
        "code": "DY-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Sân đình họp Chợ chiếu ma lúc nửa đêm",
        "name_en": "Historic Midnight Ghost Mat Market Courtyard",
        "lat": 10.30915,
        "lon": 105.54228,
        "duration_min": 15,
        "desc_vi": "Khoảng sân rộng trước Đình thần Định Yên từng là nơi diễn ra phiên 'Chợ chiếu ma' huyền thoại từ 2 giờ đến 4 giờ sáng dưới ánh đèn dầu leo lét. Kẻ bán người mua tấp nập giao thương trong đêm để kịp con nước ghe thương hồ tỏa đi khắp vùng đồng bằng sông Cửu Long.",
        "desc_en": "This spacious temple courtyard historically staged the legendary midnight 'Ghost Mat Market' (Chợ Chiếu Ma) between 2:00 AM and 4:00 AM under flickering oil lamps. Traders and weavers bartered in torch-lit darkness to synchronize with tidal flows navigating throughout the delta.",
        "audio_30s_vi": "Quý khách đang đứng tại sân đình Định Yên, nơi từng diễn ra phiên chợ chiếu đêm kỳ lạ có một không hai trong ký ức lục tỉnh Nam Kỳ. Dưới ánh đèn dầu bập bùng lúc canh khuya, hàng ngàn đôi chiếu hoa đã theo chân ghe thương hồ xuôi ngược khắp mọi nẻo sông.",
        "audio_30s_en": "Standing upon Định Yên temple courtyard, imagine the magical scene of the historic midnight mat market. Under the warm glow of oil lanterns, weavers and merchants traded thousands of intricate mats to catch the pre-dawn tides traveling across southern waterways."
      },
      {
        "code": "DY-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Đình thần Định Yên (Di tích kiến trúc cấp Quốc gia)",
        "name_en": "Định Yên Ancient Communal Temple (National Monument)",
        "lat": 10.309325,
        "lon": 105.542441,
        "duration_min": 15,
        "desc_vi": "Đình thần Định Yên được khởi dựng từ đầu thế kỷ XIX để thờ Thần Thành Hoàng và các bậc tiền hiền di dân từ miền duyên hải Bắc Bộ vào khai khẩn. Ngôi đình mang kiến trúc cổ kính với cột gỗ căm xe, mái ngói âm dương và những bức bao lam chạm rồng phượng thếp vàng uy nghiêm.",
        "desc_en": "Consecrated in the early 19th century, Định Yên Communal Temple venerates the Guardian City Deity and pioneering northern settlers who reclaimed alluvial delta soils. The sanctuary features solid ironwood columns, yin-yang tiled roofs, and masterfully gilded dragon lintels.",
        "audio_30s_vi": "Đình thần Định Yên là trái tim tâm linh bảo bọc làng nghề dệt chiếu suốt hơn hai trăm năm qua. Vẻ uy nghiêm của ngôi cổ đình và các sắc phong vua ban là minh chứng cho truyền thống uống nước nhớ nguồn, gắn kết bền chặt của cộng đồng cư dân xứ lác.",
        "audio_30s_en": "Định Yên Temple has served as the spiritual anchor of the weaving community for two centuries. Preserving imperial decrees and magnificent timber woodwork, it embodies filial gratitude and solidarity among delta artisans who shaped this enduring craft."
      },
      {
        "code": "DY-04",
        "order": 4,
        "category": "museum",
        "icon": "🏠",
        "name_vi": "Không gian trình diễn khung dệt thủ công & Bãi phơi lác",
        "name_en": "Traditional Loom Workshop & Sedge Dyeing Yards",
        "lat": 10.3095,
        "lon": 105.5426,
        "duration_min": 15,
        "desc_vi": "Nhà trình diễn làng nghề là nơi du khách trực tiếp trải nghiệm dệt chiếu lác trên khung dệt gỗ truyền thống cùng các nghệ nhân bậc thầy. Phía ngoài là bãi phơi rực rỡ với hàng trăm bó lác nhuộm đủ màu đỏ, xanh, vàng, tím phơi mình dưới ánh nắng vàng Nam Bộ.",
        "desc_en": "This living workshop invites visitors to operate traditional wooden looms alongside master weavers. Adjoining open-air drying yards display hundreds of freshly dyed sedge bundles in scarlet, emerald, and saffron hues gleaming brilliantly under tropical sunlight.",
        "audio_30s_vi": "Mời quý khách ghé thăm không gian dệt thủ công để tự tay thử sức cùng con thoi và khung dệt gỗ. Bàn tay tài hoa của nghệ nhân Định Yên đã dệt nên những tấm chiếu hoa bền đẹp, mang hơi thở ấm áp của hạnh phúc và sum vầy đến mọi gia đình.",
        "audio_30s_en": "Try your hand at traditional weaving at the artisan workshop alongside master craftswomen. The dexterity and artistry of Định Yên weavers create durable, vibrant floor mats that carry warmth, celebratory blessings, and family harmony into homes across Vietnam."
      }
    ]
  },
  {
    "monument_id": 10,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.57062,
      105.452392
    ],
    "boundary_polygon": [
      [
        10.5699,
        105.4515
      ],
      [
        10.5712,
        105.4515
      ],
      [
        10.5712,
        105.4531
      ],
      [
        10.5699,
        105.4531
      ],
      [
        10.5699,
        105.4515
      ]
    ],
    "walking_trail": [
      [
        10.57025,
        105.45205
      ],
      [
        10.57062,
        105.452392
      ],
      [
        10.5709,
        105.45265
      ],
      [
        10.5701,
        105.4518
      ],
      [
        10.57025,
        105.45205
      ]
    ],
    "sub_pois": [
      {
        "code": "TVN-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng Tam quan Vàm Đốc Vàng Thượng",
        "name_en": "Trifold Sanctuary Gate at Đốc Vàng Thượng Canal",
        "lat": 10.57025,
        "lon": 105.45205,
        "duration_min": 5,
        "desc_vi": "Cổng tam quan đền thờ tọa lạc bên vàm rạch Đốc Vàng Thượng giao nhau với dòng sông Tiền mênh mông thuộc huyện Thanh Bình. Kiến trúc tam quan uy nghiêm mang dáng dấp đền miếu triều Nguyễn với đôi câu đối ca ngợi công đức bảo quốc an dân của danh tướng.",
        "desc_en": "This ceremonial trifold gate stands proudly at the confluence of the Đốc Vàng Thượng canal and the expansive Tiền River in Thanh Bình District. Designed in regal early Nguyễn Dynasty style, inscribed couplets praise the general's valor in safeguarding national frontiers.",
        "audio_30s_vi": "Chào mừng quý khách đến với Đền thờ Thượng tướng Quận công Trần Văn Năng, hay còn gọi là Dinh Ông Đốc Vàng. Ngay từ cổng tam quan nơi ngã ba sông lộng gió, quý vị sẽ bước vào không gian tôn kính một vị danh tướng kiệt xuất đầu triều Nguyễn.",
        "audio_30s_en": "Welcome to the Memorial Temple of Grand General Duke Trần Văn Năng, affectionately venerated as Dinh Ông Đốc Vàng. Passing through this waterfront tri-arch gate, enter a revered sanctuary honoring a legendary early Nguyễn Dynasty commander."
      },
      {
        "code": "TVN-02",
        "order": 2,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Chánh điện Dinh Ông Đốc Vàng",
        "name_en": "Main Sanctuary of Grand General Trần Văn Năng",
        "lat": 10.57062,
        "lon": 105.452392,
        "duration_min": 15,
        "desc_vi": "Chánh điện đền thờ rộng lớn với bộ khung gỗ quý, cột tròn uy nghi và hệ mái đao uốn cong lợp ngói lưu ly cổ kính. Bàn thờ trung tâm tôn nghiêm phụng thờ linh vị và pho tượng đồng Thượng tướng Quận công Trần Văn Năng trong trang phục võ tướng triều đình oai vệ.",
        "desc_en": "The grand main sanctuary features majestic timber columns, soaring curved gables, and antique glazed terracotta roof tiles. The central altar reverently enshrines the tablet and bronze likeness of Grand General Trần Văn Năng attired in imperial military regalia.",
        "audio_30s_vi": "Chánh điện Dinh Ông Đốc Vàng tôn nghiêm là nơi phụng thờ Thượng tướng Quận công Trần Văn Năng. Ông từng giữ chức Phó Tổng trấn Gia Định Thành, trực tiếp chỉ huy đào kênh Vĩnh Tế và lập chiến công đánh tan giặc ngoại xâm trên dòng sông Tiền năm 1833.",
        "audio_30s_en": "The dignified central hall honors Grand General Trần Văn Năng, former Deputy Governor of Gia Định Citadel. He personally supervised the monumental excavation of the Vĩnh Tế border canal and routed invading naval forces along the Tiền River in 1833."
      },
      {
        "code": "TVN-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Nhà bia sắc phong & Sa bàn đào kênh Vĩnh Tế",
        "name_en": "Imperial Decree Stele & Vĩnh Tế Canal History Hall",
        "lat": 10.5709,
        "lon": 105.45265,
        "duration_min": 15,
        "desc_vi": "Nhà bia lưu giữ bản sao các sắc phong cao quý của vua Minh Mạng truy tặng tước hiệu Quận công cho danh tướng sau khi ông tạ thế năm 1835 tại Đốc Vàng. Sa bàn lịch sử tái hiện công trình đào kênh Vĩnh Tế mở mang giao thương bờ cõi Tây Nam kỳ vĩ.",
        "desc_en": "The stele pavilion preserves royal decrees bestowed by Emperor Minh Mạng granting posthumous ducal nobility upon the general following his death in 1835. An interactive historical diorama recreates the heroic construction of the strategic Vĩnh Tế border canal.",
        "audio_30s_vi": "Tại nhà bia truyền thống, quý khách được chiêm ngưỡng các sắc phong của vua Minh Mạng và sa bàn lịch sử đào kênh Vĩnh Tế. Công đức mở mang bờ cõi và giữ yên biên cương của vị Thượng tướng đã tạc ghi muôn đời vào trang sử vàng Nam Bộ.",
        "audio_30s_en": "Explore royal imperial decrees from Emperor Minh Mạng and historical displays detailing the Vĩnh Tế canal's excavation. General Năng's monumental contributions to national defense and frontier trade remain indelibly etched in Mekong Delta history."
      },
      {
        "code": "TVN-04",
        "order": 4,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Bến nước cổ ngã ba sông Tiền",
        "name_en": "Historic River Landing on the Tiền River",
        "lat": 10.5701,
        "lon": 105.4518,
        "duration_min": 10,
        "desc_vi": "Bến nước cổ là nơi đón gió sông Tiền lộng mát và nhìn ra ngã ba rạch Đốc Vàng Thượng. Tương truyền năm 1835, đoàn thuyền quân của Thượng tướng hành quân ngang qua đây đã dừng lại khi ông lâm trọng bệnh, từ đó nhân dân lập đền phụng thờ khói hương ngút ngàn.",
        "desc_en": "This historic riverside landing captures sweeping breezes where the canal meets the Tiền River. In 1835, General Năng's naval fleet moored here when he fell gravely ill; grateful local residents subsequently erected this sanctuary to preserve his legacy eternally.",
        "audio_30s_vi": "Đứng bên bến sông lộng gió, ngắm dòng nước Tiền Giang cuộn đỏ phù sa, quý khách đang lắng nghe câu chuyện về nghĩa tình của người dân Đốc Vàng. Gần hai trăm năm qua, ngọn khói hương bên bến sông lịch sử này chưa bao giờ dứt.",
        "audio_30s_en": "Standing beside the flowing waters of the Tiền River, contemplate the enduring devotion of Đốc Vàng villagers. For nearly two centuries, continuous incense offerings at this riverside sanctuary have honored the guardian hero of the southwestern frontier."
      }
    ]
  },
  {
    "monument_id": 11,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.923587,
      105.422561
    ],
    "boundary_polygon": [
      [
        10.9228,
        105.4217
      ],
      [
        10.9242,
        105.4217
      ],
      [
        10.9242,
        105.4233
      ],
      [
        10.9228,
        105.4233
      ],
      [
        10.9228,
        105.4217
      ]
    ],
    "walking_trail": [
      [
        10.9232,
        105.42215
      ],
      [
        10.923587,
        105.422561
      ],
      [
        10.9239,
        105.4229
      ],
      [
        10.92305,
        105.42195
      ],
      [
        10.9232,
        105.42215
      ]
    ],
    "sub_pois": [
      {
        "code": "TB-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng vào Di tích lịch sử ngã ba Thông Bình",
        "name_en": "Thông Bình Historic Confluence Entrance",
        "lat": 10.9232,
        "lon": 105.42215,
        "duration_min": 5,
        "desc_vi": "Cổng khu di tích tọa lạc tại xã biên giới Thông Bình, huyện Tân Hồng, cách Cửa khẩu Quốc tế Dinh Bà chỉ ít cây số. Cổng dẫn vào quần thể lịch sử gắn liền với ngã ba sông Sở Hạ hiểm yếu và địa bàn căn cứ Tỉnh ủy Kiến Phong kiên cường trong hai cuộc kháng chiến.",
        "desc_en": "Situated in borderland Thông Bình Commune near Dinh Bà International Gate, this entrance leads into a strategic historical complex. It commands the confluence of the Sở Hạ River, which sheltered the Kiến Phong Provincial Party Committee during decades of wartime resistance.",
        "audio_30s_vi": "Chào mừng quý khách đến với Di tích lịch sử Thông Bình, nơi địa đầu biên cương phía bắc tỉnh Đồng Tháp. Vùng đất thiêng bên dòng Sở Hạ này là chứng nhân oai hùng của tinh thần giữ đất quật cường từ triều Nguyễn đến hai cuộc kháng chiến giải phóng dân tộc.",
        "audio_30s_en": "Welcome to Thông Bình Historical Site on the northern frontier of Đồng Tháp Province. Located along the Sở Hạ River borderlands, this sacred outpost witnessed extraordinary resilience safeguarding territorial sovereignty across multiple centuries."
      },
      {
        "code": "TB-02",
        "order": 2,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Đình Ngã ba Thông Bình (Dấu ấn Thoại Ngọc Hầu)",
        "name_en": "Ngã Ba Thông Bình Communal House (Thoại Ngọc Hầu Era)",
        "lat": 10.923587,
        "lon": 105.422561,
        "duration_min": 15,
        "desc_vi": "Đình Ngã ba Thông Bình được khởi dựng từ thời Nguyễn sau khi danh tướng Thoại Ngọc Hầu thiết lập Bảo Thông Bình trấn giữ biên cương Tây Nam. Đình mang kiến trúc đình làng Nam Bộ cổ kính với mái ngói đỏ, cột gỗ quý và gian thờ Thần Thành Hoàng cùng các bậc tiền hiền mở đất.",
        "desc_en": "Established during the early 19th century after imperial envoy Thoại Ngọc Hầu fortified Thông Bình Outpost, this communal temple features classic Southern timber framing and red tiles, venerating the Tutelary Deity and pioneering settlers who developed this border realm.",
        "audio_30s_vi": "Đình Ngã ba Thông Bình gắn liền với dấu ấn mở cõi của danh tướng Thoại Ngọc Hầu đầu thế kỷ mười chín. Nơi đây không chỉ là điểm tựa tâm linh của cư dân miền biên viễn, mà còn là căn cứ mật che chở cán bộ cách mạng qua bao mùa mưa bom bão đạn.",
        "audio_30s_en": "Thông Bình Communal Temple traces its origins to General Thoại Ngọc Hầu's 19th-century frontier defense campaigns. Throughout the anti-colonial resistance, the temple provided spiritual sanctuary and clandestine logistical corridors for local guerrilla fighters."
      },
      {
        "code": "TB-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Bia chứng tích Căn cứ Tỉnh ủy Kiến Phong",
        "name_en": "Memorial Stele of Kiến Phong Border Base",
        "lat": 10.9239,
        "lon": 105.4229,
        "duration_min": 15,
        "desc_vi": "Nhà bia tưởng niệm bằng đá hoa cương trang trọng ghi khắc những chiến công hiển hách của quân dân Kiến Phong (Đồng Tháp) trong cuộc kháng chiến chống Mỹ và chiến tranh bảo vệ biên giới Tây Nam. Nơi đây từng là đầu mối giao liên chuyển vũ khí, lương thực huyết mạch.",
        "desc_en": "This granite memorial stele honors the heroic campaigns waged by the soldiers and people of Kiến Phong (Đồng Tháp) during anti-imperialist resistance and southwestern border defense conflicts, serving as a vital clandestine hub for arms and communications.",
        "audio_30s_vi": "Tấm bia chứng tích thiêng liêng này khắc ghi những chiến công kiên cường của Tỉnh ủy Kiến Phong tại vùng giáp ranh biên giới. Nhân dân Thông Bình một lòng bám đất giữ làng, nuôi giấu cán bộ và bảo vệ từng tấc đất biên cương thiêng liêng của Tổ quốc.",
        "audio_30s_en": "This memorial stele commemorates the steadfast fortitude of the Kiến Phong leadership on the borderlands. Despite relentless bombardments, local villagers loyally sheltered revolutionary cadres and preserved every inch of sacred national territory."
      },
      {
        "code": "TB-04",
        "order": 4,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Ngã ba sông Sở Hạ vùng biên giới Việt Nam - Campuchia",
        "name_en": "Historic Sở Hạ River Border Confluence Pier",
        "lat": 10.92305,
        "lon": 105.42195,
        "duration_min": 10,
        "desc_vi": "Vọng cảnh bến sông nhìn ra ngã ba sông Sở Hạ uốn lượn sát đường biên giới Việt Nam – Campuchia. Dòng sông lịch sử hiền hòa này từng là tuyến hành lang đường thủy bí mật vận chuyển cán bộ và vũ khí từ căn cứ biên thùy tiến sâu vào nội đồng Đồng Tháp Mười.",
        "desc_en": "This scenic river lookout commands the tranquil Sở Hạ River confluence winding along the international frontier. In wartime, these labyrinthine waterways functioned as clandestine water transport corridors ferrying troops and supplies deep into the Plain of Reeds.",
        "audio_30s_vi": "Đứng bên ngã ba sông Sở Hạ hiền hòa, quý khách đang nhìn về ngã ba sông biên giới lịch sử. Tiếng nước trôi êm đềm như nhắc nhở về tình đoàn kết keo sơn giữa nhân dân hai bờ biên thùy và lòng biết ơn những người đã hy sinh vì nền độc lập tự do.",
        "audio_30s_en": "Gazing across the calm waters of the Sở Hạ confluence along the Cambodian border, appreciate the tranquil beauty of this historic waterway. It symbolizes enduring international solidarity and the timeless vigilance of delta communities safeguarding peace."
      }
    ]
  },
  {
    "monument_id": 12,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.453,
      105.632563
    ],
    "boundary_polygon": [
      [
        10.4523,
        105.6318
      ],
      [
        10.4537,
        105.6318
      ],
      [
        10.4537,
        105.6333
      ],
      [
        10.4523,
        105.6333
      ],
      [
        10.4523,
        105.6318
      ]
    ],
    "walking_trail": [
      [
        10.45265,
        105.6322
      ],
      [
        10.45285,
        105.6324
      ],
      [
        10.453,
        105.632563
      ],
      [
        10.45325,
        105.6328
      ],
      [
        10.45265,
        105.6322
      ]
    ],
    "sub_pois": [
      {
        "code": "BTT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng hoa viên ven sông Cao Lãnh",
        "name_en": "Riverside Entrance Gate & Gardens",
        "lat": 10.45265,
        "lon": 105.6322,
        "duration_min": 5,
        "desc_vi": "Tọa lạc tại 226 Nguyễn Thái Học, cổng bảo tàng mở ra khuôn viên hoa viên sinh thái rộng hơn 11.000 m² rợp bóng cây cổ thụ bên dòng sông Cao Lãnh. Nơi đây đón tiếp hàng chục ngàn lượt khách tham quan, học sinh sinh viên tìm hiểu lịch sử và văn hóa bản địa.",
        "desc_en": "Located at 226 Nguyễn Thái Học Street, the museum entrance introduces an 11,000-square-meter park estate along the Cao Lãnh riverbank. Shaded by ancient trees, it welcomes thousands of researchers and international visitors seeking comprehensive cultural insights.",
        "audio_30s_vi": "Chào mừng quý khách đến với Bảo tàng Tỉnh Đồng Tháp. Khuôn viên rộng hơn một vạn mét vuông bên dòng sông Cao Lãnh thanh bình này là kho tàng lưu giữ lịch sử ngàn năm của nền văn hóa Óc Eo và truyền thống cách mạng quật cường Đất Sen Hồng.",
        "audio_30s_en": "Welcome to the Đồng Tháp Provincial Museum. Set within an 11,000-square-meter garden estate beside the river, this premier institution houses priceless treasures from the ancient Funan kingdom and chronicles centuries of delta history."
      },
      {
        "code": "BTT-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Biệt thự cổ Dinh Cò Tây đầu thế kỷ XX",
        "name_en": "Historic French Colonial Villa (Dinh Cò Tây)",
        "lat": 10.45285,
        "lon": 105.6324,
        "duration_min": 15,
        "desc_vi": "Tòa biệt thự cổ thời Pháp thuộc xây dựng từ thập niên 1920, dân gian quen gọi là Dinh Cò Tây. Công trình mang đậm phong cách kiến trúc thuộc địa Pháp với mái ngói đỏ, hành lang vòm cung thoáng mát và cầu thang gỗ cổ kính, từng là chứng tích ghi dấu các cuộc đấu tranh của tù chính trị.",
        "desc_en": "Constructed in the 1920s as the French police commissioner's residence (known locally as Dinh Cò Tây), this colonial villa features red-tiled roofs, arched colonnades, and polished hardwood staircases, standing as a poignant witness to colonial-era history.",
        "audio_30s_vi": "Trước mắt quý khách là ngôi biệt thự Dinh Cò Tây cổ kính mang dấu ấn kiến trúc Pháp thế kỷ hai mươi. Từng là cơ quan đàn áp của chính quyền thuộc địa cũ, ngày nay ngôi nhà cổ đã trở thành một phần di tích lịch sử văn hóa được bảo tồn trân trọng.",
        "audio_30s_en": "Before you stands the historic French colonial villa of Dinh Cò Tây, built in the 1920s. Once a colonial administrative headquarters, this beautifully restored residence now serves as a protected cultural monument within the museum grounds."
      },
      {
        "code": "BTT-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Nhà trưng bày Văn hóa Óc Eo & Bảo vật Quốc gia",
        "name_en": "Óc Eo Civilization & National Treasures Hall",
        "lat": 10.453,
        "lon": 105.632563,
        "duration_min": 20,
        "desc_vi": "Khối nhà trưng bày hiện đại lưu giữ hơn 30.000 hiện vật quý, nổi bật là 3 Bảo vật Quốc gia thuộc nền Văn hóa Óc Eo: tượng thần Vishnu, tượng nữ thần Lakshmi và bộ sưu tập vàng lá Gò Tháp lớn nhất Việt Nam, minh chứng cho sự phồn vinh của Vương quốc Phù Nam.",
        "desc_en": "This modern exhibition hall curates over 30,000 artifacts, highlighted by three designated National Treasures: 6th-century sandstone statues of Lord Vishnu and Goddess Lakshmi, alongside Vietnam's largest collection of sacred inscribed Funan gold foil sheets unearthed at Gò Tháp.",
        "audio_30s_vi": "Gian trưng bày Văn hóa Óc Eo tự hào lưu giữ các Bảo vật Quốc gia tượng thần Vishnu và nữ thần Lakshmi có niên đại thế kỷ thứ sáu. Từng lá vàng dâng cúng và mảnh gốm cổ khai quật từ Gò Tháp tái hiện sinh động một trung tâm giao thương hàng hải rực rỡ nghìn năm trước.",
        "audio_30s_en": "The Óc Eo Hall proudly exhibits designated National Treasures including 6th-century Vishnu and Lakshmi sculptures. These intricate gold leaves and terracotta relics unearthed at Gò Tháp illuminate a magnificent maritime trading civilization of ancient Southeast Asia."
      },
      {
        "code": "BTT-04",
        "order": 4,
        "category": "museum",
        "icon": "🎵",
        "name_vi": "Không gian tưởng niệm Nhạc sư Nguyễn Vĩnh Bảo",
        "name_en": "Maestro Nguyễn Vĩnh Bảo Đờn Ca Tài Tử Gallery",
        "lat": 10.45325,
        "lon": 105.6328,
        "duration_min": 15,
        "desc_vi": "Không gian chuyên đề tôn vinh Nhạc sư Nguyễn Vĩnh Bảo (1918–2021) – bậc đại thụ của nghệ thuật Đờn ca tài tử Nam Bộ được UNESCO vinh danh. Nơi đây trưng bày các cây đàn tranh, đàn kìm cải tiến do chính tay ông chế tác cùng các tư liệu ghi âm quý báu lưu truyền hậu thế.",
        "desc_en": "This dedicated gallery honors Maestro Nguyễn Vĩnh Bảo (1918–2021), a cultural icon of UNESCO-inscribed Southern Chamber Folk Music (Đờn Ca Tài Tử). The exhibition displays his modified musical instruments, manuscripts, and lifetime audio recordings.",
        "audio_30s_vi": "Không gian này là nơi tri ân Nhạc sư Nguyễn Vĩnh Bảo, người con ưu tú của đất Cao Lãnh đã dành trọn một thế kỷ cống hiến cho âm nhạc dân tộc. Tiếng đàn tranh réo rắt và tâm huyết cải tiến nhạc cụ của ông đã đưa Đờn ca tài tử Nam Bộ vang danh thế giới.",
        "audio_30s_en": "This gallery pays tribute to Maestro Nguyễn Vĩnh Bảo, who dedicated a century of his life to traditional chamber music. His craftsmanship in reforming traditional zithers helped elevate Southern Vietnamese Đờn Ca Tài Tử to UNESCO international recognition."
      }
    ]
  },
  {
    "monument_id": 13,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.416532,
      105.642291
    ],
    "boundary_polygon": [
      [
        10.4158,
        105.6415
      ],
      [
        10.4172,
        105.6415
      ],
      [
        10.4172,
        105.6431
      ],
      [
        10.4158,
        105.6431
      ],
      [
        10.4158,
        105.6415
      ]
    ],
    "walking_trail": [
      [
        10.41615,
        105.6419
      ],
      [
        10.416532,
        105.642291
      ],
      [
        10.4168,
        105.64255
      ],
      [
        10.41635,
        105.64265
      ],
      [
        10.41615,
        105.6419
      ]
    ],
    "sub_pois": [
      {
        "code": "TK-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Lối vào Quảng trường công viên bờ sông Tiền",
        "name_en": "Riverside Memorial Park Entrance Promenade",
        "lat": 10.41615,
        "lon": 105.6419,
        "duration_min": 5,
        "desc_vi": "Lối vào công viên quảng trường tọa lạc tại Bến Bắc Cao Lãnh (đường Phạm Hữu Lầu, Phường 6) trải rộng 12.000 m² bên bờ sông Tiền lộng gió. Không gian quảng trường khoáng đạt với thảm cỏ, đài phun nước và hàng dừa soi bóng là điểm về nguồn thiêng liêng của nhân dân.",
        "desc_en": "The entrance promenade opens into a 12,000-square-meter riverside memorial plaza at Bến Bắc Wharf along the Tiền River. Featuring manicured lawns, fountains, and swaying coconut palms, it serves as a reverent gathering space for civic ceremonies and remembrance.",
        "audio_30s_vi": "Chào mừng quý khách đến với Di tích lịch sử Quốc gia Địa điểm Tập kết ra Bắc năm 1954 tại Bến Bắc Cao Lãnh. Ngay bên bờ sông Tiền lộng gió, quảng trường công viên trang nghiêm này là nơi khắc ghi cuộc chia tay lịch sử đầy xúc động hơn bảy mươi năm trước.",
        "audio_30s_en": "Welcome to the National Historical Monument of the 1954 Northern Regrouping Site at Cao Lãnh Wharf. Beside the breezeway of the Tiền River, this landscaped plaza commemorates an emotional 100-day chapter in Vietnam's struggle for reunification."
      },
      {
        "code": "TK-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Cụm tượng đài 11m Người mẹ tiễn con trên đài sen",
        "name_en": "11-Meter Mother & Soldier Sculpture atop Lotus Pedestal",
        "lat": 10.416532,
        "lon": 105.642291,
        "duration_min": 15,
        "desc_vi": "Tác phẩm điêu khắc cao 11 mét của nhà điêu khắc Ngô Liêm tạc hình tượng người mẹ miền Nam hiền từ, bịn rịn tiễn đưa người chiến sĩ lên tàu tập kết ra Bắc. Tượng vươn cao trên đài sen hồng cách điệu, biểu trưng cho tình quân dân cá nước và lòng kiên trung của Đất Sen Hồng.",
        "desc_en": "This monumental 11-meter bronze-toned sculpture by artist Ngô Liêm portrays a devoted Southern mother saying farewell to her soldier son boarding the ship northward. Elevated on stylized pink lotus petals, it symbolizes deep family bonds and patriotism.",
        "audio_30s_vi": "Trước mắt quý khách là tượng đài cao mười một mét khắc họa hình ảnh xúc động của người mẹ miền Nam tiễn con lên tàu ra Bắc. Trên đài hoa sen vươn cao, ánh mắt kiên định của người mẹ và người lính là lời thề son sắt hẹn ngày non sông liền một dải.",
        "audio_30s_en": "Behold the 11-meter sculpture portraying a gentle Southern mother embracing her departing son. Rising from a stylized lotus pedestal, their resolute gazes capture an unyielding promise of duty, personal sacrifice, and national reunification."
      },
      {
        "code": "TK-03",
        "order": 3,
        "category": "architecture",
        "icon": "🚢",
        "name_vi": "Bức phù điêu Con tàu vượt sóng 100 ngày tập kết",
        "name_en": "Wave-Carving Ship Relief & Geneva Accords Timeline",
        "lat": 10.4168,
        "lon": 105.64255,
        "duration_min": 15,
        "desc_vi": "Bức phù điêu hoành tráng tái hiện hình tượng con tàu Kilinski của Ba Lan rẽ sóng chở hơn 13.500 cán bộ, chiến sĩ miền Nam ra Bắc theo Hiệp định Genève. Các mảng phù điêu chạm khắc chi tiết ngày chia tay đầy lưu luyến nhưng tràn đầy niềm tin vào ngày hòa bình thống nhất.",
        "desc_en": "This relief sculpture depicts maritime transport vessels such as the Polish ship Kilinski carrying over 13,500 Southern cadres and students north under the 1954 Geneva Accords, capturing farewell scenes filled with tears and unwavering patriotic dedication.",
        "audio_30s_vi": "Bức phù điêu cánh buồm rẽ sóng tái hiện không khí một trăm ngày tập kết chuyển quân lịch sử tại bến Cao Lãnh. Hơn mười ba ngàn năm trăm người con ưu tú của miền Nam đã mang theo nắm đất quê hương lên tàu, trở thành những hạt giống đỏ cho ngày toàn thắng.",
        "audio_30s_en": "This wave-carving ship relief memorializes the 100-day maritime transport operation from Cao Lãnh. Carrying packets of their native soil, over 13,500 southern patriots boarded vessels to become vital pillars for the nation's future development."
      },
      {
        "code": "TK-04",
        "order": 4,
        "category": "pier",
        "icon": "🛶",
        "name_vi": "Vọng cảnh Bến Bắc Cao Lãnh lịch sử",
        "name_en": "Historic Cao Lãnh Regrouping Wharf Lookout",
        "lat": 10.41635,
        "lon": 105.64265,
        "duration_min": 10,
        "desc_vi": "Điểm vọng cảnh bờ sông nhìn thẳng ra luồng nước Tiền Giang nơi những chuyến tàu Ba Lan và Liên Xô từng neo đậu vào mùa thu năm 1954. Gió sông Tiền lồng lộng và mặt nước mênh mông đưa du khách lắng lòng hồi tưởng về những giây phút tiễn biệt thiêng liêng của lịch sử dân tộc.",
        "desc_en": "This scenic riverside observation point overlooks the broad Tiền River channel where international transport ships anchored in the autumn of 1954. Sweeping delta breezes and panoramic river waters offer a peaceful setting for reflection on national unity.",
        "audio_30s_vi": "Đứng bên bờ sông Tiền tại chính bến Bắc Cao Lãnh xưa, quý khách hãy lắng nghe tiếng sóng vỗ rì rào. Chính nơi đây, những giọt nước mắt chia ly và những vòng tay siết chặt đã hòa vào dòng nước Mê Kông, biến thành sức mạnh quật cường cho ngày thống nhất non sông.",
        "audio_30s_en": "Standing upon the historic Cao Lãnh ferry bank, listen to the gentle lapping of river waves. At this very landing, tearful farewells and steadfast resolve merged into the Mekong currents, forging the collective strength that achieved peace."
      }
    ]
  },
  {
    "monument_id": 14,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.195653,
      105.816906
    ],
    "boundary_polygon": [
      [
        10.1951,
        105.8163
      ],
      [
        10.1962,
        105.8163
      ],
      [
        10.1962,
        105.8175
      ],
      [
        10.1951,
        105.8175
      ],
      [
        10.1951,
        105.8163
      ]
    ],
    "walking_trail": [
      [
        10.19535,
        105.8166
      ],
      [
        10.19555,
        105.8168
      ],
      [
        10.195653,
        105.816906
      ],
      [
        10.1958,
        105.8171
      ],
      [
        10.19535,
        105.8166
      ]
    ],
    "sub_pois": [
      {
        "code": "PK-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng tam quan cổ tự hơn 175 năm tuổi",
        "name_en": "Ancient Monastery Trifold Gateway",
        "lat": 10.19535,
        "lon": 105.8166,
        "duration_min": 5,
        "desc_vi": "Cổng tam quan rêu phong dẫn vào Chùa Phước Kiển tại xã Tân Nhuận Đông, huyện Châu Thành. Được khởi dựng từ trước năm 1847 dưới triều vua Thiệu Trị, ngôi cổ tự nép mình bình yên giữa miệt vườn cây trái thanh bình và các hồ sen phẳng lặng.",
        "desc_en": "This moss-covered trifold gateway introduces Phước Kiển Pagoda in Châu Thành District. Founded prior to 1847 during the reign of Emperor Thiệu Trị, the historic monastery sits peacefully secluded amidst lush fruit orchards and tranquil lotus ponds.",
        "audio_30s_vi": "Chào mừng quý khách đến với Chùa Phước Kiển, hay còn gọi là Chùa Lá Sen nổi tiếng của huyện Châu Thành. Bước qua cổng tam quan cổ kính hơn một trăm bảy mươi lăm năm tuổi, tiếng chuông chùa ngân vang sẽ gột rửa mọi ưu phiền của đời thường.",
        "audio_30s_en": "Welcome to Phước Kiển Pagoda, famously celebrated as the King Lotus Temple of Châu Thành. Stepping past this 175-year-old gate amidst ringing monastic bells, discover an oasis of spiritual calm and botanical wonder."
      },
      {
        "code": "PK-02",
        "order": 2,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Chánh điện Chùa Phước Kiển & Bàn thờ Phật",
        "name_en": "Main Sanctuary & Monastic Chanting Hall",
        "lat": 10.19555,
        "lon": 105.8168,
        "duration_min": 15,
        "desc_vi": "Ngôi chánh điện mộc mạc lưu giữ nhiều tượng Phật cổ trang nghiêm. Trong chiến tranh năm 1966, ngôi chùa cổ từng bị bom đạn đánh sập do là cơ sở nuôi giấu cách mạng mật, sau năm 1975 được tái thiết trang nghiêm, gìn giữ tinh thần từ bi phổ độ chúng sinh.",
        "desc_en": "The rustic main sanctuary enshrines revered Buddhist statues. In 1966, the temple was leveled by air strikes because it secretly sheltered resistance fighters; rebuilt after 1975, it preserves its solemn traditions of mindfulness and spiritual refuge.",
        "audio_30s_vi": "Chánh điện Chùa Phước Kiển tuy giản dị nhưng ngập tràn vẻ tôn nghiêm. Từng bị bom đạn tàn phá ác liệt trong chiến tranh vì nuôi giấu chiến sĩ cách mạng, ngôi chùa nay hồi sinh như biểu tượng sáng ngời của tinh thần bất bạo động và lòng từ bi Phật pháp.",
        "audio_30s_en": "Though structurally modest, the main hall radiates deep monastic reverence. Having survived wartime bombardment while sheltering delta patriots, the restored temple embodies spiritual perseverance, compassion, and the resilience of peace."
      },
      {
        "code": "PK-03",
        "order": 3,
        "category": "nature",
        "icon": "🪷",
        "name_vi": "Ao sen vua khổng lồ (Cải tạo từ hố bom 1966)",
        "name_en": "Giant King Lotus Pond (Repurposed 1966 Bomb Craters)",
        "lat": 10.195653,
        "lon": 105.816906,
        "duration_min": 20,
        "desc_vi": "Ao sen độc đáo xuất hiện loài sen vua khổng lồ (Victoria cruziana / amazonica) từ năm 1992. Lá sen có đường kính từ 2m đến 3m, vành lá uốn cong tựa chiếc nia lớn với hệ gân khí khổng lồ bên dưới, có thể nâng đỡ người trưởng thành từ 60–80kg mà không chìm.",
        "desc_en": "These ponds host the astonishing giant Amazonian water lily (Victoria cruziana), thriving here since 1992 inside repurposed 1966 bomb craters. Leaves span 2 to 3 meters across with upturned rims, capable of supporting an adult weighing 60 to 80 kilograms.",
        "audio_30s_vi": "Trước mắt quý khách là ao sen vua kỳ diệu, được cải tạo từ chính những hố bom năm 1966. Những chiếc lá sen khổng lồ rộng tới ba mét, có sức nâng một người trưởng thành đứng trên mặt nước, là thông điệp hòa bình tuyệt đẹp biến đau thương thành sự sống ngát hương.",
        "audio_30s_en": "Behold the extraordinary King Lotus pads flourishing inside repurposed 1966 wartime bomb craters. Reaching up to three meters wide and capable of supporting an adult atop water, they offer a moving testament to nature transforming scars of war into peace."
      },
      {
        "code": "PK-04",
        "order": 4,
        "category": "nature",
        "icon": "🌉",
        "name_vi": "Cầu gỗ trải nghiệm đứng chụp ảnh trên lá sen",
        "name_en": "Wooden Boardwalk for King Lotus Experience",
        "lat": 10.1958,
        "lon": 105.8171,
        "duration_min": 15,
        "desc_vi": "Cầu gỗ bắc ra giữa lòng ao sen, nơi du khách được hướng dẫn bước nhẹ lên tấm mâm gỗ hoặc mica đặt trên mặt lá sen vua để chụp những bức ảnh độc nhất vô nhị. Cạnh ao sen còn có chuồng nuôi cụ rùa trăm tuổi được nhà chùa chăm sóc cẩn thận.",
        "desc_en": "A wooden footbridge extends into the pond, where visitors step onto reinforced acrylic plates placed atop buoyant lotus leaves to capture once-in-a-lifetime photographs. Nearby, a sanctuary pond shelters centenary sacred tortoises cared for by the monastic community.",
        "audio_30s_vi": "Từ cây cầu gỗ này, quý khách có thể trải nghiệm cảm giác bước lên chiếc lá sen vua kỳ diệu để ghi lại những khoảnh khắc đáng nhớ. Đừng quên ghé thăm cụ rùa hơn một trăm tuổi hiền lành bên mé ao để cảm nhận sự hòa hợp giữa con người và thiên nhiên.",
        "audio_30s_en": "From this boardwalk, step gently onto the giant water lily pads for an iconic delta photograph. Visit the monastery's century-old sacred tortoises resting peacefully nearby, reflecting the harmonious sanctity shared between humanity and living creatures."
      }
    ]
  },
  {
    "monument_id": 15,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.53784,
      105.53971
    ],
    "boundary_polygon": [
      [
        10.5372,
        105.539
      ],
      [
        10.5385,
        105.539
      ],
      [
        10.5385,
        105.5405
      ],
      [
        10.5372,
        105.5405
      ],
      [
        10.5372,
        105.539
      ]
    ],
    "walking_trail": [
      [
        10.53745,
        105.5393
      ],
      [
        10.53784,
        105.53971
      ],
      [
        10.5381,
        105.54
      ],
      [
        10.53765,
        105.54015
      ],
      [
        10.53745,
        105.5393
      ]
    ],
    "sub_pois": [
      {
        "code": "BT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng vào Khu tưởng niệm di tích Quốc gia",
        "name_en": "National Memorial Entrance Portal",
        "lat": 10.53745,
        "lon": 105.5393,
        "duration_min": 5,
        "desc_vi": "Cổng khu di tích tọa lạc tại xã Bình Thành, huyện Thanh Bình, giáp ranh thị trấn Thanh Bình bên bờ sông Tiền. Nơi đây mở ra không gian tưởng niệm trang nghiêm rợp bóng mát, ghi dấu vùng căn cứ cách mạng kiên cường và vụ thảm sát lịch sử tháng 11 năm 1954.",
        "desc_en": "Located in Bình Thành Commune beside the Tiền River, this entrance welcomes visitors into a solemn historical park. It marks a heroic revolutionary stronghold and preserves solemn remembrance for the tragic Bình Thành incident of November 1954.",
        "audio_30s_vi": "Chào mừng quý khách đến với Di tích lịch sử Quốc gia Địa điểm Vụ thảm sát Bình Thành. Bước vào khuôn viên trang nghiêm rợp bóng cây xanh bên dòng sông Tiền, quý vị đang đặt chân lên mảnh đất thấm đượm máu đào của những người con yêu nước kiên trung.",
        "audio_30s_en": "Welcome to the Bình Thành National Historical Memorial. Walking into these shaded grounds beside the flowing Tiền River, pay solemn tribute to the unyielding courage of delta patriots who stood peacefully for liberty and national independence."
      },
      {
        "code": "BT-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Đài tưởng niệm 34 liệt sĩ Vụ thảm sát Bình Thành",
        "name_en": "Memorial Monument to the 34 Martyrs of Bình Thành",
        "lat": 10.53784,
        "lon": 105.53971,
        "duration_min": 15,
        "desc_vi": "Đài tưởng niệm bằng đá hoa cương sừng sững giữa trung tâm di tích, khắc họa hình ảnh ngọn lửa bất diệt tưởng nhớ 34 đồng bào và chiến sĩ kháng chiến bị quân đối phương sát hại dã man trong các ngày 11 và 12 tháng 11 năm 1954 vì đòi thi hành Hiệp định Genève.",
        "desc_en": "This striking marble monument stands in memory of 34 unarmed patriots and resistance fighters tragically massacred on November 11–12, 1954, for peacefully demanding free elections guaranteed under the Geneva Accords. An eternal sculpted flame symbolizes their immortal spirit.",
        "audio_30s_vi": "Trước đài tưởng niệm uy nghiêm, xin kính cẩn nghiêng mình tưởng nhớ ba mươi tư đồng bào liệt sĩ đã ngã xuống vào mùa đông năm 1954. Sự hy sinh của họ đã thổi bùng ngọn lửa căm thù, thôi thúc nhân dân miền Nam vùng lên đấu tranh thống nhất đất nước.",
        "audio_30s_en": "Standing before this solemn marble monument, remember the thirty-four martyrs who gave their lives in the winter of 1954. Their selfless sacrifice galvanized the conscience of the delta, fueling the unstoppable movement toward national reunification."
      },
      {
        "code": "BT-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Nhà bia lưu niệm & Không gian tư liệu hòa bình",
        "name_en": "Commemorative Stele House & Peace Archives",
        "lat": 10.5381,
        "lon": 105.54,
        "duration_min": 15,
        "desc_vi": "Nhà bia lưu giữ danh sách trích ngang các anh hùng liệt sĩ cùng các tài liệu điều tra lịch sử của Ủy hội Quốc tế giám sát đình chiến (ICSC) năm 1954 kết luận về hành vi vi phạm nghiêm trọng hiệp định hòa bình, khẳng định tính chính nghĩa của cuộc kháng chiến dân tộc.",
        "desc_en": "The stele house records the names of the fallen martyrs alongside international investigative records from the 1954 International Commission for Supervision and Control, officially documenting the grave truce breach and affirming the righteous cause of the Vietnamese people.",
        "audio_30s_vi": "Nhà bia lưu niệm lưu giữ những trang tư liệu lịch sử vô giá và kết luận điều tra của Ủy hội Quốc tế về vụ thảm sát. Đây là bản cáo trạng đanh thép về tội ác chiến tranh và là bài học thiêng liêng về giá trị của hòa bình, độc lập.",
        "audio_30s_en": "The commemorative pavilion preserves irreplaceable historical records and findings from the International Supervisory Commission. It stands as an enduring testament against wartime atrocities and a profound lesson on the preciousness of peace."
      },
      {
        "code": "BT-04",
        "order": 4,
        "category": "nature",
        "icon": "🌳",
        "name_vi": "Rặng cây xanh tưởng niệm ven sông Tiền",
        "name_en": "Memorial Shaded Grove along the Tiền River",
        "lat": 10.53765,
        "lon": 105.54015,
        "duration_min": 10,
        "desc_vi": "Khuôn viên công viên ven sông Tiền được phủ mát bởi những hàng cây dầu, sao và hoa sứ tỏa bóng êm đềm. Du khách có thể tản bộ trong không gian tĩnh lặng, lắng nghe tiếng sóng vỗ và chiêm nghiệm về truyền thống kiên trung bất khuất của vùng đất ven sông.",
        "desc_en": "The riverside park is shaded by native Dipterocarpus trees, frangipani blossoms, and lush manicured foliage. Visitors can stroll along peaceful paths listening to river breezes, reflecting upon the steadfast patriotism that rooted this riverside community.",
        "audio_30s_vi": "Dưới bóng mát của rặng cây ven sông Tiền, không gian thanh bình hôm nay được đánh đổi bằng máu xương của thế hệ cha anh. Hãy dành một phút mặc niệm lắng lòng cùng tiếng gió sông để tri ân sự hy sinh cao cả của các anh hùng liệt sĩ.",
        "audio_30s_en": "Beneath peaceful trees along the flowing Tiền River, today's tranquility is paid for by the sacrifices of earlier generations. Take a quiet moment in contemplation to honor the eternal memory of Bình Thành's fallen delta heroes."
      }
    ]
  },
  {
    "monument_id": 16,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.254852,
      105.748443
    ],
    "boundary_polygon": [
      [
        10.2542,
        105.7478
      ],
      [
        10.2553,
        105.7478
      ],
      [
        10.2553,
        105.749
      ],
      [
        10.2542,
        105.749
      ],
      [
        10.2542,
        105.7478
      ]
    ],
    "walking_trail": [
      [
        10.2545,
        105.7481
      ],
      [
        10.2547,
        105.7483
      ],
      [
        10.254852,
        105.748443
      ],
      [
        10.25498,
        105.74857
      ],
      [
        10.2545,
        105.7481
      ]
    ],
    "sub_pois": [
      {
        "code": "TPT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng tam quan đình ven Quốc lộ 80",
        "name_en": "Trifold Gate on National Highway 80",
        "lat": 10.2545,
        "lon": 105.7481,
        "duration_min": 5,
        "desc_vi": "Cổng tam quan cổ kính hướng ra Quốc lộ 80 và con rạch Ngã Cái thuộc huyện Châu Thành. Cổng được xây dựng theo lối cổ lầu ba tầng uy nghi, đắp nổi hình rồng mây và câu đối chữ Hán, dẫn vào khuôn viên rộng hơn 3.000 m² rợp bóng cây cổ thụ của ngôi đình làng Nam Bộ.",
        "desc_en": "Fronting National Highway 80 and the Ngã Cái waterway in Châu Thành District, this imposing three-tiered gate displays sculpted dragons and classical Sino-Vietnamese couplets, welcoming visitors into an expansive 3,000-square-meter historical courtyard.",
        "audio_30s_vi": "Chào mừng quý khách đến với Đình Tân Phú Trung – Di tích Kiến trúc Nghệ thuật cấp Quốc gia tại huyện Châu Thành. Bước qua cổng tam quan bề thế, quý khách sẽ cảm nhận ngay vẻ trang nghiêm của một công trình đình làng Nam Bộ tiêu biểu hơn một trăm bảy mươi năm tuổi.",
        "audio_30s_en": "Welcome to Tân Phú Trung Communal House, a National Architectural Monument in Châu Thành District. Passing through this classical trifold gateway, enter a sacred 170-year-old sanctuary exemplifying the finest rural woodwork in the delta."
      },
      {
        "code": "TPT-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Võ ca & Võ quy trùng thiềm điệp ốc",
        "name_en": "Multi-Tiered Performance Pavilion (Võ Ca & Võ Quy)",
        "lat": 10.2547,
        "lon": 105.7483,
        "duration_min": 10,
        "desc_vi": "Khu nhà Võ ca và Võ quy được xây dựng theo bố cục 'trùng thiềm điệp ốc' và 'thượng lầu hạ hiên' liên hoàn. Đây là nơi diễn ra các nghi thức tế lễ thần linh và trình diễn nghệ thuật hát bội cổ truyền trong dịp lễ hội Kỳ Yên hàng năm của dân làng.",
        "desc_en": "The Võ Ca performance pavilion and Võ Quy ceremonial hall are arranged in multi-tiered layered roof design (trùng thiềm điệp ốc). This expansive timber space hosts traditional ritual sacrifices and classical Southern folk opera performances during annual Kỳ Yên festivals.",
        "audio_30s_vi": "Khu Võ ca và Võ quy trước mắt quý khách mang kiến trúc trùng thiềm điệp ốc đặc trưng của đình Nam Bộ. Mỗi độ lễ hội Kỳ Yên về, tiếng trống chầu và những trích đoạn hát bội rộn ràng dưới mái đình này lại làm sống dậy nét đẹp văn hóa dân gian truyền thống.",
        "audio_30s_en": "This performance hall illustrates the classic Southern multi-tiered roof architecture. During annual spring Kỳ Yên festivals, ceremonial drumbeats and vibrant classical folk opera performances echo beneath these hardwood rafters in colorful delta pageantry."
      },
      {
        "code": "TPT-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Chánh điện thờ Thành Hoàng & Sắc phong vua Tự Đức",
        "name_en": "Main Sanctum & King Tự Đức Royal Decree (1854)",
        "lat": 10.254852,
        "lon": 105.748443,
        "duration_min": 15,
        "desc_vi": "Chánh điện là hạt nhân kiến trúc với 48 cột gỗ lim, gỗ căm xe to lớn được liên kết bằng mộng gỗ tinh xảo. Gian thờ chính tôn nghiêm phụng thờ Thần Thành Hoàng Bổn Cảnh, lưu giữ bản sắc thần do vua Tự Đức ban tặng năm 1854 cùng các bức hoành phi, bao lam chạm lộng thếp vàng lộng lẫy.",
        "desc_en": "The central sanctum features 48 soaring ironwood columns assembled with mortise-and-tenon joints. It reverently enshrines the Tutelary Deity and preserves an original royal decree issued by Emperor Tự Đức in 1854, surrounded by gilded woodcarvings of the four sacred beasts.",
        "audio_30s_vi": "Chánh điện Đình Tân Phú Trung là bảo tàng sống động về nghệ thuật điêu khắc gỗ cổ truyền. Hãy chiêm ngưỡng bốn mươi tám cột gỗ lim bề thế và bản sắc phong quý giá của vua Tự Đức năm 1854 minh chứng cho lịch sử khai cơ lập ấp của cha ông.",
        "audio_30s_en": "The main sanctum is a living gallery of traditional woodcarving craft. Admire 48 majestic ironwood pillars and the original 1854 imperial decree from Emperor Tự Đức honoring the village guardians who reclaimed these fertile delta lands."
      },
      {
        "code": "TPT-04",
        "order": 4,
        "category": "architecture",
        "icon": "🐉",
        "name_vi": "Mái ngói gốm Lưỡng long tranh châu & Bát tiên",
        "name_en": "Glazed Ceramic Dragons & Eight Immortals Roof Crest",
        "lat": 10.25498,
        "lon": 105.74857,
        "duration_min": 10,
        "desc_vi": "Đỉnh mái ngói âm dương của đình được tạo tác công phu với quần thể tiểu tượng gốm sứ men màu tinh xảo: Lưỡng long tranh châu, Cá hóa long, Bát tiên và Lân mẫu tử. Những bức tượng gốm cổ hơn một thế kỷ này vẫn giữ nguyên độ bóng bẩy và màu men men xanh lam, vàng hoàng thổ rực rỡ.",
        "desc_en": "The antique yin-yang tiled roof crests are embellished with vibrant polychrome ceramic sculptures: Dual Dragons Contending for the Pearl, Carp Transforming into Dragons, and the Eight Immortals, showcasing pristine century-old craftsmanship in cobalt blue and imperial amber glazes.",
        "audio_30s_vi": "Hãy ngước nhìn lên đỉnh nóc đình, nơi quần thể tượng gốm men màu Lưỡng long tranh châu và Bát tiên tỏa sáng dưới ánh mặt trời. Nghệ thuật đắp nổi gốm sành tinh xảo này là nét chấm phá độc đáo tạo nên danh tiếng di tích kiến trúc quốc gia của Đình Tân Phú Trung.",
        "audio_30s_en": "Look up at the ridgelines to admire polychrome glazed ceramic sculptures depicting celestial dragons and the Eight Immortals. This dazzling ceramic mosaic work highlights why Tân Phú Trung is celebrated among the finest architectural monuments in the region."
      }
    ]
  },
  {
    "monument_id": 17,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.4102,
      105.7205
    ],
    "boundary_polygon": [
      [
        10.4095,
        105.7198
      ],
      [
        10.4108,
        105.7198
      ],
      [
        10.4108,
        105.7212
      ],
      [
        10.4095,
        105.7212
      ],
      [
        10.4095,
        105.7198
      ]
    ],
    "walking_trail": [
      [
        10.40985,
        105.72015
      ],
      [
        10.41005,
        105.72035
      ],
      [
        10.4102,
        105.7205
      ],
      [
        10.4104,
        105.72075
      ],
      [
        10.40985,
        105.72015
      ]
    ],
    "sub_pois": [
      {
        "code": "HT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Tam quan Hưng Thiền Cổ Tự ven Quốc lộ 30",
        "name_en": "Grand Trifold Temple Gateway (Highway 30)",
        "lat": 10.40985,
        "lon": 105.72015,
        "duration_min": 5,
        "desc_vi": "Cổng tam quan nguy nga của Chùa Hưng Thiền tọa lạc ven Quốc lộ 30, gần cầu Long Ẩn thuộc huyện Cao Lãnh. Ngôi cổ tự hơn 250 năm tuổi đón chào Phật tử và du khách thập phương bằng không gian thanh tịnh rợp mát của vườn cây sala, hoa sen và hồ nước êm đềm.",
        "desc_en": "Located along National Highway 30 near Long Ẩn Bridge in Cao Lãnh District, this grand trifold portal introduces a 250-year-old Buddhist sanctuary. Visitors enter a tranquil realm of blooming sala trees, serene lotus waters, and fragrant frangipani blossoms.",
        "audio_30s_vi": "Kính chào quý khách đến với Chùa Hưng Thiền, ngôi cổ tự hơn hai thế kỷ rưỡi tuổi tại huyện Cao Lãnh. Bước qua cổng tam quan trang nghiêm, tiếng chuông chùa thanh thoát sẽ đưa quý vị rời xa sự ồn ào để tìm về sự an lạc trong tâm hồn.",
        "audio_30s_en": "Welcome to Hưng Thiền Monastery, a revered Buddhist sanctuary with over 250 years of heritage in Cao Lãnh District. Crossing the gateway amidst peaceful temple bells, leave behind worldly hustle to embrace deep inner mindfulness and spiritual calm."
      },
      {
        "code": "HT-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Đại tượng Bồ tát Quán Thế Âm cao 33m",
        "name_en": "33-Meter Bodhisattva Avalokiteshvara Statue",
        "lat": 10.41005,
        "lon": 105.72035,
        "duration_min": 15,
        "desc_vi": "Tôn tượng Bồ tát Quán Thế Âm lộ thiên bằng bê tông cốt thép sơn trắng cao 33 mét sừng sững giữa trời xanh. Bồ tát ngự trên đài sen hồng, tay cầm bình cam lộ ban rải an lành cho khắp cõi nhân gian, là điểm tựa tâm linh kiêm biểu tượng nổi bật của chùa Hưng Thiền.",
        "desc_en": "Rising 33 meters into the delta sky, this colossal white statue of Bodhisattva Avalokiteshvara (Quán Thế Âm) stands serenely upon an open lotus pedestal. Holding the vase of compassionate nectar, the monument is an iconic spiritual beacon across the province.",
        "audio_30s_vi": "Quý khách đang chiêm bái đại tượng Bồ tát Quán Thế Âm cao ba mươi ba mét uy nghi giữa nền trời Đất Sen Hồng. Ánh mắt từ bi của Đức Mẹ Quan Âm như che chở, chở che cho cuộc sống ấm no, thanh bình của nhân dân vùng đồng bằng sông nước.",
        "audio_30s_en": "Gaze upon the magnificent 33-meter statue of Avalokiteshvara rising gracefully above the lotus lagoon. Her compassionate countenance radiates blessings of peace, health, and protection over the communities of the Mekong Delta."
      },
      {
        "code": "HT-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Chánh điện & Tôn tượng Phật A Di Đà bằng đồng",
        "name_en": "Grand Hall & Solid Bronze Amitabha Buddha Statue",
        "lat": 10.4102,
        "lon": 105.7205,
        "duration_min": 15,
        "desc_vi": "Chánh điện được kiến thiết đồ sộ theo kiến trúc Phật giáo Nam Bộ với mái đao uốn cong. Bên trong tôn trí pho đại tượng Đức Phật A Di Đà đúc bằng đồng nguyên khối khổng lồ với nét mặt từ bi thanh thoát, xung quanh là hàng trăm bức phù điêu chạm khắc cuộc đời Đức Phật Thích Ca.",
        "desc_en": "The grand main sanctuary features sweeping curved eaves and soaring timber beams. It enshrines a colossal solid-bronze statue of Amitabha Buddha displaying serene spiritual grace, surrounded by detailed bas-relief murals depicting the life of Shakyamuni Buddha.",
        "audio_30s_vi": "Bên trong ngôi chánh điện uy nghiêm, quý khách được chiêm ngưỡng tôn tượng Đức Phật A Di Đà đúc bằng đồng nguyên khối tráng lệ. Không gian đạo tràng Tịnh Độ với hơn ba trăm chư Ni tu học tạo nên bầu không khí trang nghiêm, thoát tục hiếm có.",
        "audio_30s_en": "Inside the grand hall, admire the monumental solid-bronze statue of Amitabha Buddha radiating supreme tranquility. As a major Pure Land monastic training center for over 300 Buddhist nuns, the hall resonates with sacred devotion and peaceful chanting."
      },
      {
        "code": "HT-04",
        "order": 4,
        "category": "nature",
        "icon": "🪷",
        "name_vi": "Hoa viên Tịnh Độ & Vườn sen thanh tịnh",
        "name_en": "Pure Land Zen Gardens & Lotus Ponds",
        "lat": 10.4104,
        "lon": 105.72075,
        "duration_min": 15,
        "desc_vi": "Hoa viên Tịnh Độ được thiết kế công phu với những lối đi lát đá uốn lượn quanh các ao sen hồng, vườn cây cảnh bonsai, hồ cá koi và phòng thuốc Nam từ thiện của chùa. Nơi đây mang lại cảm giác an nhiên tự tại, giúp du khách hồi phục năng lượng tinh thần tích cực.",
        "desc_en": "The Pure Land Zen gardens feature stone pathways meandering around blooming lotus ponds, miniature bonsai gardens, koi fish sanctuaries, and a charitable herbal medicine clinic, offering pilgrims an oasis of mindfulness, rejuvenation, and serenity.",
        "audio_30s_vi": "Dạo bước giữa hoa viên Tịnh Độ ngát hương sen, quý khách sẽ cảm nhận được sự hòa hợp tuyệt đối giữa thiên nhiên và đạo pháp. Phòng thuốc Nam từ thiện nơi đây còn là minh chứng sống động cho tinh thần từ bi cứu khổ cứu nạn của chư Ni chùa Hưng Thiền.",
        "audio_30s_en": "Strolling through the Pure Land Zen gardens amidst fragrant pink lotuses, experience pure harmony between nature and Buddhist mindfulness. The monastery's charitable herbal clinic continues a noble tradition of healing and social welfare for local families."
      }
    ]
  },
  {
    "monument_id": 18,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.755962,
      105.309619
    ],
    "boundary_polygon": [
      [
        10.7553,
        105.3089
      ],
      [
        10.7565,
        105.3089
      ],
      [
        10.7565,
        105.3103
      ],
      [
        10.7553,
        105.3103
      ],
      [
        10.7553,
        105.3089
      ]
    ],
    "walking_trail": [
      [
        10.7556,
        105.30925
      ],
      [
        10.755962,
        105.309619
      ],
      [
        10.7562,
        105.30985
      ],
      [
        10.7558,
        105.3099
      ],
      [
        10.7556,
        105.30925
      ]
    ],
    "sub_pois": [
      {
        "code": "LT-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng đình cổ cù lao ven sông Tiền",
        "name_en": "Ancient Island Communal Gate by the River",
        "lat": 10.7556,
        "lon": 105.30925,
        "duration_min": 5,
        "desc_vi": "Cổng đình Long Thuận tọa lạc trên cù lao Long Phú Thuận giữa dòng sông Tiền thuộc huyện Hồng Ngự. Ngôi cổng cổ kính đón gió mát từ dòng sông Tiền, mở lối vào khuôn viên đình làng rợp bóng cây cổ thụ hơn trăm năm tuổi của những lưu dân khai hoang mở đất cù lao.",
        "desc_en": "The entrance gate of Long Thuận Communal House stands on the fertile Long Phú Thuận island surrounded by the Tiền River in Hồng Ngự District. It ushers visitors into a tranquil precinct shaded by centenary banyan trees planted by pioneering island homesteaders.",
        "audio_30s_vi": "Chào mừng quý khách đến với Đình thần Long Thuận trên dải cù lao trù phú của huyện Hồng Ngự. Đứng trước ngôi cổng cổ kính đón gió sông Tiền lồng lộng, quý vị sẽ bước vào không gian văn hóa tâm linh gần một trăm năm mươi năm gắn liền với lịch sử mở đất cù lao.",
        "audio_30s_en": "Welcome to Long Thuận Island Communal House in Hồng Ngự District. Standing before this antique portal caressed by Mekong breezes, prepare to explore a 150-year-old sacred sanctuary rooted in the pioneer settlement of the Tiền River islands."
      },
      {
        "code": "LT-02",
        "order": 2,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Chánh điện gỗ lim & Sắc phong vua Bảo Đại (1936)",
        "name_en": "Ironwood Sanctuary & King Bảo Đại Edict (1936)",
        "lat": 10.755962,
        "lon": 105.309619,
        "duration_min": 15,
        "desc_vi": "Chánh điện được xây dựng kiên cố năm 1930 bằng gỗ căm xe và gỗ lim quý hiếm. Nơi đây trang trọng lưu giữ bản sắc phong Thần Thành Hoàng Bổn Cảnh do hoàng đế Bảo Đại ban tặng vào năm 1936, cùng hệ thống hoành phi liễn đối chạm khắc chữ Hán nhũ vàng tinh xảo.",
        "desc_en": "Reconstructed in 1930 with ironwood pillars, this sanctuary preserves the authentic royal decree issued to the Tutelary City God by Emperor Bảo Đại in 1936. The hall is embellished with gilded horizontal placards, antique altars, and dragon-carved ceremonial weapons.",
        "audio_30s_vi": "Chánh điện Đình Long Thuận lưu giữ nguyên vẹn bản sắc phong của vua Bảo Đại ban tặng năm 1936. Bộ khung gỗ lim vững chãi và những bức hoành phi câu đối sơn son thếp vàng là minh chứng sống động cho tài hoa của những người thợ mộc tài ba vùng sông nước.",
        "audio_30s_en": "The central sanctum preserves an original imperial decree from Emperor Bảo Đại dated 1936. Sturdy ironwood timbers and gilded calligraphy panels attest to the remarkable craftsmanship of master carpenters on the western frontier."
      },
      {
        "code": "LT-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Không gian lưu niệm trụ sở kháng chiến chống Pháp",
        "name_en": "Anti-French Resistance Committee Memorial",
        "lat": 10.7562,
        "lon": 105.30985,
        "duration_min": 15,
        "desc_vi": "Khu gian nhà phụ lưu giữ kỷ vật và hình ảnh về thời kỳ Đình Long Thuận được sử dụng làm trụ sở làm việc của Ủy ban kháng chiến hành chính xã trong thời kỳ kháng chiến chống Pháp. Nhân dân cù lao đã dũng cảm bảo vệ cơ sở cách mạng, kết hợp đấu tranh giữ gìn di sản đình làng.",
        "desc_en": "This commemorative annex showcases historical relics and photographs from the period when Đình Long Thuận served as the clandestine headquarters of the local administrative resistance committee during the anti-colonial struggle against French forces.",
        "audio_30s_vi": "Không chỉ là chốn thờ tự linh thiêng, Đình Long Thuận từng là trụ sở kháng chiến kiên trung của lực lượng Việt Minh trên vùng cù lao biên giới. Sự đùm bọc của người dân đã giúp cơ sở cách mạng đứng vững suốt những năm tháng gian lao.",
        "audio_30s_en": "Beyond its spiritual reverence, Đình Long Thuận served as a courageous revolutionary headquarters during anti-colonial resistance. Loyal islanders shielded freedom fighters, making this communal temple a proud bastion of delta patriotism."
      },
      {
        "code": "LT-04",
        "order": 4,
        "category": "nature",
        "icon": "🌳",
        "name_vi": "Vườn cổ thụ trăm tuổi che bóng đình cù lao",
        "name_en": "Centenary Sacred Banyan Trees Grove",
        "lat": 10.7558,
        "lon": 105.3099,
        "duration_min": 10,
        "desc_vi": "Khuôn viên đình nổi tiếng với những gốc bồ đề, đa cổ thụ hàng trăm năm tuổi xòe tán rộng rợp bóng mát bên vườn cây ăn trái cù lao. Rễ cây bám chặt vào lòng đất phù sa màu mỡ tượng trưng cho sức sống mãnh liệt và bền bỉ của người dân miền đầu nguồn sông Tiền.",
        "desc_en": "The temple courtyard is shaded by magnificent centenary banyan and bodhi trees with sprawling aerial root networks. Anchored deep into the silt-rich alluvial soil, they symbolize the resilient, fertile life of island communities in the upper delta.",
        "audio_30s_vi": "Dưới bóng mát của những cây cổ thụ trăm năm tuổi trong sân đình, quý khách sẽ cảm nhận được sự thanh bình tuyệt đối của xứ cù lao sông Tiền. Rễ cây bám sâu vào lòng đất phù sa như tình người cù lao muôn đời gắn bó thủy chung với quê hương bản xứ.",
        "audio_30s_en": "Rest beneath the canopy of ancient banyan trees shading the temple courtyard. Their deep roots anchored in rich alluvial soil reflect the steadfast connection of delta families who have cultivated and defended these river islands across generations."
      }
    ]
  },
  {
    "monument_id": 19,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.614661,
      105.473081
    ],
    "boundary_polygon": [
      [
        10.614,
        105.4724
      ],
      [
        10.6152,
        105.4724
      ],
      [
        10.6152,
        105.4738
      ],
      [
        10.614,
        105.4738
      ],
      [
        10.614,
        105.4724
      ]
    ],
    "walking_trail": [
      [
        10.6143,
        105.4727
      ],
      [
        10.614661,
        105.473081
      ],
      [
        10.61485,
        105.4733
      ],
      [
        10.61498,
        105.47345
      ],
      [
        10.6143,
        105.4727
      ]
    ],
    "sub_pois": [
      {
        "code": "PM-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng đình làng Phú Lợi",
        "name_en": "Phú Lợi Village Communal Gate",
        "lat": 10.6143,
        "lon": 105.4727,
        "duration_min": 5,
        "desc_vi": "Cổng đình nằm trên tuyến đường Tân Thạnh – Phú Lợi thuộc huyện Thanh Bình, dẫn vào ngôi đình làng nông nghiệp cổ kính thế kỷ XIX. Hai trụ biểu uy nghiêm đắp câu đối Nôm ca ngợi cảnh sắc trù phú và đạo lý uống nước nhớ nguồn của người dân vùng thượng nguồn sông Tiền.",
        "desc_en": "Situated on the Tân Thạnh – Phú Lợi route in Thanh Bình District, this gate introduces a 19th-century agrarian village temple. Twin ceremonial pillars bear classical couplets praising rural bounty and communal gratitude toward pioneer forebears.",
        "audio_30s_vi": "Chào mừng quý khách đến với Đình Phú Mỹ tại xã Phú Lợi, huyện Thanh Bình. Ngôi đình làng cổ kính nép mình bên cánh đồng lúa mênh mông là biểu tượng cho tinh thần đoàn kết và đạo lý uống nước nhớ nguồn của cư dân vùng đất bãi bồi sông Tiền.",
        "audio_30s_en": "Welcome to Phú Mỹ Communal House in Thanh Bình District. Nestled beside vast rice paddies along the upper Tiền River, this antique village sanctuary stands as a living emblem of solidarity, agricultural heritage, and ancestral veneration."
      },
      {
        "code": "PM-02",
        "order": 2,
        "category": "shrine",
        "icon": "🏛️",
        "name_vi": "Chánh điện ngói vảy cá & Bàn thờ Thần Thành Hoàng",
        "name_en": "Fish-Scale Tiled Sanctum & City God Altar",
        "lat": 10.614661,
        "lon": 105.473081,
        "duration_min": 15,
        "desc_vi": "Chánh điện đình lợp mái ngói đỏ vảy cá đặc trưng của đình miếu Nam Bộ, bên trong là hệ thống cột gỗ tròn kiên cố nâng đỡ vì kèo chạm hoa sen. Bàn thờ Thần Thành Hoàng Bổn Cảnh trang nghiêm giữa khói hương trầm, nơi diễn ra nghi thức tế Thần long trọng mỗi mùa Kỳ Yên.",
        "desc_en": "The main hall features traditional fish-scale terracotta tiles and sturdy hardwood pillars supporting lotus-carved trusses. The central altar reverently enshrines the Tutelary Deity of the Realm, hosting dignified rituals during the annual Kỳ Yên harvest thanksgiving.",
        "audio_30s_vi": "Bên trong ngôi chánh điện ngói vảy cá cổ kính, quý khách sẽ cảm nhận được không gian linh thiêng trầm mặc của tín ngưỡng Thành hoàng làng. Nơi đây gửi gắm ước nguyện muôn đời của người nông dân về mưa thuận gió hòa, mùa màng tươi tốt ấm no.",
        "audio_30s_en": "Inside the fish-scale tiled hall, experience the solemn spiritual atmosphere of village guardian worship. For generations, farmers have gathered here to offer prayers for favorable rainfall, bountiful rice crops, and household prosperity."
      },
      {
        "code": "PM-03",
        "order": 3,
        "category": "shrine",
        "icon": "⛩️",
        "name_vi": "Ban thờ Tiền hiền khai khẩn & Hậu hiền khai cơ",
        "name_en": "Altar to Founding Pioneers & Land Reclamation Heroes",
        "lat": 10.61485,
        "lon": 105.4733,
        "duration_min": 10,
        "desc_vi": "Gian thờ Tiền hiền và Hậu hiền tri ân những bậc tiền nhân có công khai phá đầm lầy, đắp đê ngăn lũ, lập nên thôn ấp trù phú từ thời nhà Nguyễn. Hàng năm dân làng tổ chức lễ tế Tiền hiền với những mâm lễ vật nông sản địa phương đậm đà nghĩa tình.",
        "desc_en": "This altar pays tribute to the founding pioneers and homesteaders who reclaimed virgin floodplains, raised flood barriers, and cultivated prosperous agrarian settlements under the Nguyễn Dynasty, honored with traditional local harvest offerings.",
        "audio_30s_vi": "Ban thờ Tiền hiền khai khẩn khắc ghi công ơn to lớn của các bậc tiền nhân đã đổ mồ hôi và xương máu để biến vùng đồng lầy hoang vu thành những cánh đồng vàng trĩu hạt. Tấm lòng biết ơn tổ tiên đã trở thành truyền thống quý báu của người dân Phú Mỹ.",
        "audio_30s_en": "This altar honors the pioneering ancestors who endured immense hardships to transform wild floodplains into golden rice fields. Filial gratitude toward founding pioneers remains a cherished, unifying tradition among the people of Phú Mỹ."
      },
      {
        "code": "PM-04",
        "order": 4,
        "category": "architecture",
        "icon": "🐉",
        "name_vi": "Mái đình Lưỡng long chầu nguyệt",
        "name_en": "Dual Dragons Paying Homage to the Moon Roof",
        "lat": 10.61498,
        "lon": 105.47345,
        "duration_min": 10,
        "desc_vi": "Bờ nóc mái đình đắp nổi đồ án 'Lưỡng long chầu nguyệt' tinh xảo bằng vôi vữa và mảnh sành sứ cổ. Đôi rồng uốn lượn hướng về vầng trăng tròn mang ý nghĩa cầu mong vũ trụ giao hòa, âm dương cân bằng, mang lại phước lành và sự trường tồn cho làng quê.",
        "desc_en": "The roof ridgelines are sculpted with an intricate 'Dual Dragons Paying Homage to the Moon' motif crafted from mortar and antique porcelain fragments. The dragons symbolize cosmic balance, yin-yang harmony, and enduring blessings for the rural community.",
        "audio_30s_vi": "Hình tượng Lưỡng long chầu nguyệt uy nghi trên nóc đình cổ Phú Mỹ là biểu tượng của sự phồn vinh và trường tồn. Dưới ánh nắng vàng rực rỡ, mái ngói đình làng cổ vẫn sừng sững che chở cho cuộc sống thanh bình của bao thế hệ cư dân Đồng Tháp.",
        "audio_30s_en": "The sculpted motif of twin dragons flanking the sacred moon crowning the roof ridge represents harmony and vitality. Under the delta sun, this ancient communal roof has sheltered the peaceful agrarian rhythms of generations."
      }
    ]
  },
  {
    "monument_id": 20,
    "site_type": "precinct",
    "recommended_zoom": 18,
    "center": [
      10.816775,
      105.505171
    ],
    "boundary_polygon": [
      [
        10.816,
        105.5044
      ],
      [
        10.8175,
        105.5044
      ],
      [
        10.8175,
        105.506
      ],
      [
        10.816,
        105.506
      ],
      [
        10.816,
        105.5044
      ]
    ],
    "walking_trail": [
      [
        10.8164,
        105.5048
      ],
      [
        10.816775,
        105.505171
      ],
      [
        10.81705,
        105.50545
      ],
      [
        10.81725,
        105.5057
      ],
      [
        10.8164,
        105.5048
      ]
    ],
    "sub_pois": [
      {
        "code": "GTD-01",
        "order": 1,
        "category": "gate",
        "icon": "⛩️",
        "name_vi": "Cổng chào Khu di tích lịch sử Quốc gia",
        "name_en": "National Historical Monument Entrance",
        "lat": 10.8164,
        "lon": 105.5048,
        "duration_min": 5,
        "desc_vi": "Cổng khu di tích tọa lạc tại xã An Phước, huyện Tân Hồng, giữa cánh đồng lầy ngập nước của vùng biên giới Đồng Tháp Mười. Cổng dẫn vào công viên tượng đài rộng rãi, nơi ghi dấu trận đánh phục kích lịch sử vang dội diễn ra vào ngày 26 tháng 9 năm 1959.",
        "desc_en": "Located in An Phước Commune, Tân Hồng District amidst the border floodplains of the Plain of Reeds, this gateway opens into an expansive memorial park commemorating the watershed guerrilla victory achieved on September 26, 1959.",
        "audio_30s_vi": "Chào mừng quý khách đến với Khu di tích lịch sử Quốc gia Chiến thắng Giồng Thị Đam – Gò Quản Cung. Tại vùng đồng nước Tân Hồng này, trận đánh oanh liệt năm 1959 đã đi vào lịch sử như phát súng lệnh mở màn cho cao trào Đồng Khởi vũ trang khắp miền Nam.",
        "audio_30s_en": "Welcome to the National Historical Monument of the Giồng Thị Đam – Gò Quản Cung Victory. On this wetland battlefield, the legendary 1959 ambush resonated across the nation as the first thunderclap igniting the armed Đồng Khởi movement."
      },
      {
        "code": "GTD-02",
        "order": 2,
        "category": "architecture",
        "icon": "🏛️",
        "name_vi": "Tượng đài Chiến thắng Giồng Thị Đam - Gò Quản Cung",
        "name_en": "Giồng Thị Đam - Gò Quản Cung Victory Monument",
        "lat": 10.816775,
        "lon": 105.505171,
        "duration_min": 15,
        "desc_vi": "Tượng đài chiến thắng bằng đồng nguyên khối sừng sững giữa trời xanh, khắc họa hình ảnh các chiến sĩ Tiểu đoàn 502 trong tư thế hiên ngang giương súng xung phong giữa biển nước mênh mông, thể hiện khí phách anh dũng và ý chí quật cường của quân dân vùng đồng lũ.",
        "desc_en": "This imposing bronze monument depicts courageous fighters of the 502nd Battalion advancing boldly through flooded terrain with rifles raised, symbolizing the unyielding spirit and tactical brilliance of delta guerrilla forces.",
        "audio_30s_vi": "Trước mắt quý khách là Tượng đài Chiến thắng uy nghi ghi dấu trận ra quân đầu tiên thắng lợi giòn giã của Tiểu đoàn 502 anh hùng. Bằng mưu trí và lòng quả cảm phi thường, bốn mươi hai chiến sĩ đã làm nên kỳ tích đánh tan một trung đoàn địch được trang bị tối tân.",
        "audio_30s_en": "Standing before this victory monument, honor the heroic first engagement of the 502nd Battalion. With extraordinary tactical ingenuity, just forty-two guerrilla fighters decisively routed an entire elite enemy regiment in open wetland waters."
      },
      {
        "code": "GTD-03",
        "order": 3,
        "category": "museum",
        "icon": "🏺",
        "name_vi": "Nhà trưng bày sa bàn trận đánh & Vũ khí Tiểu đoàn 502",
        "name_en": "Battle Diorama & 502nd Battalion Artifacts Hall",
        "lat": 10.81705,
        "lon": 105.50545,
        "duration_min": 15,
        "desc_vi": "Nhà trưng bày lưu giữ sa bàn điện tử tái hiện chi tiết chiến thuật 'phục kích vận động' trên đồng nước nổi, cùng các hiện vật súng trường, lựu đạn, xuồng ba lá và tài liệu chiến tranh của cán bộ chiến sĩ Đại đội 274 (tiền thân Tiểu đoàn 502) trong trận đánh lẫy lừng.",
        "desc_en": "The museum showcases an electronic battle diorama recreating wetland ambush maneuvers, alongside authentic captured weaponry, sampans, and historical archives from Company 274 (the forerunner of the 502nd Battalion) during this watershed engagement.",
        "audio_30s_vi": "Nhà trưng bày sa bàn trận đánh sẽ giúp quý khách hiểu rõ nghệ thuật chiến tranh nhân dân độc đáo giữa mùa nước nổi. Lợi dụng lau sậy và sự cơ động của xuồng ba lá, quân ta đã tạo nên thế trận bất ngờ khiến quân địch khiếp vía đầu hàng.",
        "audio_30s_en": "The battle exhibition hall illustrates the ingenuity of delta wetland warfare. Harnessing swamp reeds and rapid sampan mobility during high flood season, guerrilla fighters achieved complete tactical surprise over superior enemy firepower."
      },
      {
        "code": "GTD-04",
        "order": 4,
        "category": "nature",
        "icon": "🌾",
        "name_vi": "Vọng cảnh cánh đồng nổi 'Tiếng sấm đầu mùa' 1959",
        "name_en": "1959 Floodplain Battlefield Memorial Lookout",
        "lat": 10.81725,
        "lon": 105.5057,
        "duration_min": 10,
        "desc_vi": "Điểm vọng cảnh nhìn ra cánh đồng lầy biên giới mênh mông ngút ngàn, nơi từng là bãi chiến trường lịch sử mùa nước nổi năm 1959. Ngày nay, cánh đồng đã chuyển mình thành vựa lúa phì nhiêu, mang lại cuộc sống ấm no cho đồng bào biên cương Đất Sen Hồng.",
        "desc_en": "This observation lookout gazes across the vast border floodplain where the historic September 1959 battle unfolded. Today, these once war-torn wetlands have transformed into lush, productive rice paddies nourishing thriving delta communities.",
        "audio_30s_vi": "Phóng tầm mắt nhìn ra cánh đồng lúa thanh bình hôm nay, tiếng sấm đầu mùa năm 1959 như vẫn còn vang vọng hào khí non sông. Chiến công Giồng Thị Đam – Gò Quản Cung mãi mãi là niềm tự hào sáng ngời của nhân dân Đồng Tháp anh hùng.",
        "audio_30s_en": "Looking across these peaceful golden rice fields today, echoes of the 1959 victory remind us of the enduring courage of delta patriots. Giồng Thị Đam – Gò Quản Cung remains an everlasting beacon of pride and resilience in Đồng Tháp history."
      }
    ]
  }
];

export function getSiteMapByMonumentId(monumentId) {
  const id = Number(monumentId);
  return SITE_MAPS_DATA.find((s) => Number(s.monument_id) === id) || null;
}
