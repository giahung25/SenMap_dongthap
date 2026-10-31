import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

const STORAGE_KEY = 'senmap_lang';

/**
 * Intelligent Language Detection:
 * 1. URL Query Parameter (?lang=en or ?lang=vi) - high priority for international QR scans on-site.
 * 2. User's previously saved preference in localStorage.
 * 3. Browser & System auto-detection: checks navigator.languages, navigator.language, and Intl timezone.
 *    Non-Vietnamese primary locales (en, fr, zh, ja, ko, de...) default to English ('en') seamlessly!
 */
function detectInitialLanguage() {
  // (a) URL query parameter (?lang=en | ?lang=vi)
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang === 'en' || urlLang === 'vi') {
        localStorage.setItem(STORAGE_KEY, urlLang);
        return { lang: urlLang, isAutoDetected: false };
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }

  // (b) User's saved preference
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') {
      return { lang: saved, isAutoDetected: false };
    }
  } catch (e) {
    // Ignore storage errors
  }

  // (c) Browser & Operating System Auto-detection
  if (typeof navigator !== 'undefined') {
    const preferredLangs = navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || ''];

    const firstLang = (preferredLangs[0] || '').toLowerCase();
    const hasVietnamese = preferredLangs.some((l) => (l || '').toLowerCase().startsWith('vi'));

    let isVietnamTimezone = false;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === 'Asia/Ho_Chi_Minh' || tz === 'Asia/Saigon') {
        isVietnamTimezone = true;
      }
    } catch (e) {
      // Ignore timezone error
    }

    if (firstLang.startsWith('vi') || (isVietnamTimezone && hasVietnamese)) {
      return { lang: 'vi', isAutoDetected: true };
    }

    // Default international visitors to natural English
    return { lang: 'en', isAutoDetected: true };
  }

  return { lang: 'vi', isAutoDetected: true };
}

/**
 * Comprehensive UI Translations Dictionary for SenMap Đồng Tháp
 */
export const UI_TRANSLATIONS = {
  vi: {
    // Brand & Header
    brandName: 'SenMap',
    brandBadge: 'Đồng Tháp GIS',
    brandTagline: 'Bản đồ số Di tích & Di sản Văn hóa Đồng Tháp',
    navHome: 'Trang chủ Văn hóa',
    navMap: 'Bản đồ số GIS',
    homeWebgisSectionBadge: 'BẢN ĐỒ KHÔNG GIAN • INTERACTIVE WEBGIS',
    homeWebgisSectionTitle: 'Không Gian Bản Đồ Số Di Sản & Lộ Trình Tuyến Chủ Đề',
    homeWebgisSectionDesc: 'Khám phá trực tiếp 20 di tích văn hóa lịch sử và mạng lưới tuyến đường giao thông bám sát địa bàn tỉnh Đồng Tháp',
    btnOpenFullMap: 'Mở Bản Đồ Toàn Màn Hình',
    navQr: 'Quét mã QR',
    navAdmin: 'Quản trị CMS',
    langToggleTooltip: 'Chuyển đổi ngôn ngữ / Switch language',
    autoDetectedBadge: 'Tự động',
    autoDetectedTooltip: 'Ngôn ngữ được tự động nhận diện từ thiết bị của bạn',

    // Map View - Modes
    modeExplore: 'Tra cứu di tích',
    modeTour: 'Lập Tour TSP 2-Opt',

    // GPS 3-Mode Bar
    gpsHeaderReal: 'GPS Thiết Bị Thực Tế',
    gpsHeaderPreset: 'Điểm Xuất Phát GPS',
    gpsEnableBtn: 'Bật GPS',
    gpsActiveBtn: 'GPS Bật',
    gpsCustomOption: 'Ghim kéo thả tự do trên bản đồ',
    gpsOutOfBoundsWarn: 'Ghim nằm ngoài tỉnh Đồng Tháp. Vui lòng kéo lại vào địa phận tỉnh!',
    gpsPresetCaoLanh: 'Trung tâm TP. Cao Lãnh',
    gpsPresetSaDec: 'Trung tâm TP. Sa Đéc',
    gpsPresetHongNgu: 'Trung tâm TP. Hồng Ngự',
    gpsPresetBridge: 'Bến / Cầu Cao Lãnh (Bờ Nam)',
    gpsPresetTramChim: 'Thị trấn Tràm Chim (Tam Nông)',

    // Explore / Filter Bar
    searchPlaceholder: 'Tìm tên di tích, anh hùng, địa danh...',
    rankingAll: 'Tất cả Cấp',
    rankingSpecial: 'Đặc biệt',
    rankingNational: 'Quốc gia',
    rankingProvincial: 'Cấp tỉnh',
    rankingEcoCraft: 'Du lịch/Làng nghề',
    allDistricts: 'Tất cả Huyện/TP',
    allCategories: 'Tất cả Thể loại',
    radiusAll: 'Bán kính (Tất cả)',
    radius5km: 'Lân cận 5 km',
    radius10km: 'Lân cận 10 km',
    radius20km: 'Lân cận 20 km',
    foundCount: 'Tìm thấy',
    monumentsUnit: 'di tích',
    readyCount: '20/20 Di tích sẵn sàng',
    resetFilters: 'Đặt lại bộ lọc',
    noMonumentsFound: 'Không tìm thấy di tích phù hợp bộ lọc.',
    topBadge: '★ TOP',
    distanceKmAway: 'Cách',
    distanceFromYou: 'Cách bạn',

    // Monument Card & Actions
    cardDetailsAndAudio: 'Chi tiết & Audio',
    cardDirections: 'Chỉ đường',
    openProfileAndAudioTour: 'Mở Hồ sơ Di tích & Nghe Audio Tour',
    drawDrivingRoute: 'Vẽ Lộ trình Chỉ đường',
    googleMapsBtn: 'Google Maps',
    historySummaryTitle: 'Tóm tắt lịch sử & di sản:',
    openingHoursLabel: 'Giờ mở cửa',
    ticketPriceLabel: 'Giá vé',
    freeAdmission: 'Miễn phí',
    visitNoteLabel: 'Lưu ý:',
    selectToPreview: 'Chọn di tích để xem nhanh',
    closePreview: 'Đóng cửa sổ xem nhanh',

    // Tour Planner (TSP 2-Opt)
    tourPlannerTitle: 'Chọn 2 - 6 Di tích Tham quan',
    selectedTourCount: 'Đã chọn',
    tourPlannerDesc: 'Thuật toán Nearest Neighbor + 2-Opt TSP sắp xếp thứ tự các điểm dừng tối ưu để tiết kiệm tối đa thời gian và quãng đường di chuyển.',
    optimizingTourBtn: 'Đang tối ưu hóa hành trình 2-Opt...',
    optimizeTourBtn: 'Tối Ưu Hành Trình (2-Opt TSP)',
    tourResultTitle: 'Kết quả Lộ trình Tối ưu:',
    clearTourBtn: 'Xóa tour',
    totalDistance: 'Tổng quãng đường',
    travelDuration: 'Thời gian di chuyển',
    tourSavingsMessage: 'Tiết kiệm {percent}% quãng đường so với thứ tự ngẫu nhiên!',
    optimalSequenceTitle: 'Thứ tự tham quan tối ưu:',
    stopIndexBadge: 'Điểm',

    // Floating Panels on WebGIS Map
    routeBannerTitle: 'Lộ trình',
    routeDestination: 'Đến',
    approxDuration: '~{min} phút',
    openGoogleMaps: 'Mở Google Maps',
    directionsSteps: 'Chỉ dẫn ({count})',
    hideDirections: 'Thu gọn',
    stepAfterKm: 'Sau {km} km',
    tourBannerTitle: 'Hành trình Tour',
    monumentStopsCount: '{count} Điểm Di Tích Đồng Tháp',
    closeBanner: 'Tắt chỉ đường',
    stopDetailBtn: 'Xem chi tiết',
    stopNumberBadge: 'Điểm dừng số {num}',
    userGpsTitle: 'Vị trí của bạn (Kéo thả để dời)',
    userGpsHint: 'Kéo ghim trên bản đồ để đổi điểm xuất phát',

    // Map Controls
    streetMapLabel: 'Đường phố',
    streetMapDesc: 'Bản đồ đường phố tiêu chuẩn Google Maps (Đồng Tháp)',
    cartoOsmLabel: 'CARTO/OSM',
    cartoOsmDesc: 'Bản đồ CARTO Voyager / OpenStreetMap',
    satelliteLabel: 'Vệ tinh',
    satelliteDesc: 'Bản đồ ảnh vệ tinh Google Hybrid có nhãn đường',
    locateMeTooltip: 'Định vị vị trí GPS của bạn',
    dongThapOverviewTooltip: 'Toàn cảnh tỉnh Đồng Tháp',
    mapWatermarkValid: 'SenMap GIS Đồng Tháp • Tọa độ hợp lệ ({layer})',
    mapWatermarkInvalid: 'SenMap Cảnh báo: Vị trí ngoài tỉnh Đồng Tháp (Kéo ghim để dời)',

    // Monument Detail View
    backToMap: 'SenMap WebGIS',
    saveFavorite: 'Lưu vào danh sách yêu thích',
    shareMonument: 'Chia sẻ hồ sơ di tích',
    shareCopied: 'Đã sao chép liên kết vào bộ nhớ tạm!',
    loadingHeritage: 'Đang tải hồ sơ di tích văn hóa...',
    viewsCount: '{count} lượt xem',
    qrScansCount: '{count} lượt quét QR',
    heritageRankCol: 'Xếp hạng di sản',
    openingHoursCol: 'Giờ mở cửa',
    admissionFeeCol: 'Giá vé tham quan',
    districtCol: 'Địa bàn hành chính',
    audioTourTitle: 'SenMap Audio Tour — Thuyết minh Tự động',
    audioTourSubtitle: 'Lắng nghe câu chuyện lịch sử và giá trị di sản văn hóa qua giọng đọc truyền cảm',
    aiVoiceBadge: 'AI Voice',
    voiceLabel: 'Giọng đọc:',
    voiceSouthernFemale: 'Nữ Nam Bộ (Đồng Tháp)',
    voiceSouthernMale: 'Nam Nam Bộ (Ấm áp)',
    voiceNorthernFemale: 'Nữ Bắc Bộ (Truyền cảm)',
    voiceEnglishFemale: 'English (US Native Female)',
    voiceEnglishMale: 'English (UK Historic Male)',
    audioQuality: 'Chất lượng: 320kbps HD',
    narratorQuoteLabel: '[Lời thuyết minh]:',
    historyValueTitle: 'Lịch sử & Giá trị Văn hóa Di sản',
    historyParagraph2: 'Trải qua bao thăng trầm lịch sử vùng đất Đồng Tháp Mười, nơi đây không chỉ lưu giữ các chứng tích vật thể quý giá mà còn là biểu tượng tinh thần kiên cường, bản sắc tâm linh và lòng tự hào sâu sắc của nhân dân tỉnh Đồng Tháp.',
    visitorNoticeTitle: 'Lưu ý dành cho du khách tham quan:',
    photoGalleryTitle: 'Tư liệu Hình ảnh Thực địa',
    spatialGisTitle: 'Vị trí Không gian GIS',
    openWebGisBtn: 'Mở SenMap WebGIS',
    identityQrTitle: 'Mã QR Định danh SenMap',
    scanOnSiteHint: 'Quét mã tại thực địa để mở trực tiếp hồ sơ thuyết minh này',
    downloadQrBtn: 'Tải ảnh QR',
    printA5Btn: 'In tem A5',
    generatingQr: 'Đang tạo QR...',
    nearbyMonumentsTitle: 'Di tích lân cận trong tỉnh',

    // QR Scanner View
    qrScannerTitle: 'SenMap — Quét Mã QR Di Tích',
    qrScannerSubtitle: 'SenMap Đồng Tháp • Smart Heritage QR',
    cameraReady: 'Ống kính thực địa sẵn sàng',
    cameraHint: 'Bạn có thể quét camera hoặc chọn nhanh 1 trong 20 di tích bên dưới để mô phỏng.',
    qrAimGuidance: 'Hướng camera về phía tem QR SenMap in trên bia giới thiệu hoặc bảng chỉ dẫn tại di tích Đồng Tháp',
    scanSuccess: 'Quét mã thành công!',
    openingDetailMsg: 'Đang mở hồ sơ thuyết minh...',
    quickTestTitle: 'Chọn nhanh mã QR để kiểm thử (SenMap 20 Di tích)',
    fieldMode: 'Chế độ thực địa',
    scanBtn: 'Quét QR',

    // Admin CMS View
    cmsHeaderBadge: 'SenMap CMS',
    cmsHeaderSub: 'SenMap Đồng Tháp — Đất Sen Hồng',
    cmsHeaderTitle: 'SenMap CMS — Quản trị Hồ sơ Di tích & Ghim Tọa độ Bản đồ GIS',
    tabMonumentList: 'Danh sách Di tích ({count})',
    tabAddNew: 'Thêm Di tích mới',
    statTotalMonuments: 'Tổng số di tích',
    statPlacesUnit: 'Địa điểm',
    statSpecialNational: 'Quốc gia đặc biệt',
    statMonumentsCount: '{count} Di tích',
    statNationalRank: 'Cấp Quốc gia',
    statTotalQrScans: 'Lượt quét QR',
    statScansUnit: '{count} Lượt',
    searchAdminPlaceholder: 'Lọc tên di tích, huyện/thị xã...',
    showingCount: 'Hiển thị {filtered} / {total} hồ sơ',
    colCode: 'Mã',
    colPhoto: 'Ảnh',
    colName: 'Tên di tích',
    colRank: 'Cấp hạng',
    colDistrict: 'Khu vực',
    colGisCoords: 'Tọa độ GIS',
    colScans: 'Lượt quét',
    colActions: 'Thao tác',
    editTooltip: 'Sửa hồ sơ & ghim tọa độ',
    deleteTooltip: 'Xóa di tích',
    confirmDelete: 'Bạn có chắc chắn muốn xóa hồ sơ di tích "{name}"?',
    section1Title: '1. Thông tin Định danh & Phân cấp Di tích',
    labelMonumentName: 'Tên di tích (*)',
    labelOtherName: 'Tên gọi khác / Dân gian',
    labelRank: 'Cấp xếp hạng',
    labelCategory: 'Loại hình di sản',
    labelDistrict: 'Địa bàn Huyện / Thành phố',
    labelAddress: 'Địa chỉ cụ thể',
    section2Title: '2. Thuyết minh Lịch sử & Hướng dẫn Tham quan',
    labelHistorySummary: 'Tóm tắt Lịch sử & Giá trị Di sản (*)',
    labelOpeningHours: 'Thời gian mở cửa',
    labelTicketPrice: 'Giá vé (VND - 0 nếu miễn phí)',
    labelVisitNote: 'Lưu ý tham quan',
    labelThumbnailUrl: 'URL Hình ảnh Thumbnail',
    sectionPinTitle: 'Ghim Tọa độ Không gian GIS',
    clickMapHint: 'Click vào bản đồ',
    labelLat: 'Vĩ độ (Latitude)',
    labelLon: 'Kinh độ (Longitude)',
    boundsValidTitle: 'Ranh giới hợp lệ',
    boundsInvalidTitle: 'Vi phạm ranh giới tỉnh',
    qrPreviewHeader: 'Preview Tem In QR A5 SenMap',
    qrPreviewDesc: 'Mã QR sẽ dẫn thẳng tới trang chi tiết di tích sau khi lưu',
    cancelFormBtn: 'Hủy bỏ',
    saveFormBtn: 'Lưu hồ sơ',
    updateFormBtn: 'Cập nhật',
    alertNameRequired: 'Vui lòng nhập tên di tích!',
    successUpdated: 'Đã cập nhật thành công di tích "{name}"!',
    successCreated: 'Đã thêm mới thành công di tích "{name}"!',
  },

  en: {
    // Brand & Header
    brandName: 'SenMap',
    brandBadge: 'Đồng Tháp GIS',
    brandTagline: 'Digital Cultural Heritage Map of Đồng Tháp Province',
    navHome: 'Cultural Portal',
    navMap: 'Digital GIS Map',
    homeWebgisSectionBadge: 'SPATIAL MAP • INTERACTIVE WEBGIS',
    homeWebgisSectionTitle: 'Interactive Heritage WebGIS & Cultural Trail Map',
    homeWebgisSectionDesc: 'Directly explore 20 cultural heritage sites and the real-world road network across Đồng Tháp Province',
    btnOpenFullMap: 'Open Fullscreen WebGIS',
    navQr: 'QR Scanner',
    navAdmin: 'CMS Admin',
    langToggleTooltip: 'Switch language / Chuyển đổi ngôn ngữ',
    autoDetectedBadge: 'Auto',
    autoDetectedTooltip: 'Language automatically detected based on your device settings',

    // Map View - Modes
    modeExplore: 'Heritage Sites',
    modeTour: '2-Opt Tour Planner',

    // GPS 3-Mode Bar
    gpsHeaderReal: 'Device GPS Location',
    gpsHeaderPreset: 'GPS Departure Point',
    gpsEnableBtn: 'Enable GPS',
    gpsActiveBtn: 'GPS On',
    gpsCustomOption: 'Freely Drag & Drop Pin on Map',
    gpsOutOfBoundsWarn: 'Pin placed outside Đồng Tháp Province. Please reposition within province boundaries!',
    gpsPresetCaoLanh: 'Cao Lãnh City Center',
    gpsPresetSaDec: 'Sa Đéc Flower City Center',
    gpsPresetHongNgu: 'Hồng Ngự Border City Center',
    gpsPresetBridge: 'Cao Lãnh Bridge (South Bank)',
    gpsPresetTramChim: 'Tràm Chim Town (Tam Nông)',

    // Explore / Filter Bar
    searchPlaceholder: 'Search by heritage name, hero, locality...',
    rankingAll: 'All Ranks',
    rankingSpecial: 'Special National',
    rankingNational: 'National',
    rankingProvincial: 'Provincial',
    rankingEcoCraft: 'Eco & Craft',
    allDistricts: 'All Districts/Cities',
    allCategories: 'All Categories',
    radiusAll: 'Radius (All)',
    radius5km: 'Within 5 km',
    radius10km: 'Within 10 km',
    radius20km: 'Within 20 km',
    foundCount: 'Found',
    monumentsUnit: 'heritage sites',
    readyCount: '20/20 Heritage sites live',
    resetFilters: 'Reset Filters',
    noMonumentsFound: 'No heritage sites match the selected criteria.',
    topBadge: '★ TOP',
    distanceKmAway: 'Away',
    distanceFromYou: 'Away from you',

    // Monument Card & Actions
    cardDetailsAndAudio: 'Details & Audio',
    cardDirections: 'Directions',
    openProfileAndAudioTour: 'Open Heritage Profile & Audio Tour',
    drawDrivingRoute: 'Calculate Driving Route',
    googleMapsBtn: 'Google Maps',
    historySummaryTitle: 'Historical & Heritage Summary:',
    openingHoursLabel: 'Opening hours',
    ticketPriceLabel: 'Admission',
    freeAdmission: 'Free Entry',
    visitNoteLabel: 'Visitor Guide:',
    selectToPreview: 'Select a site for instant preview',
    closePreview: 'Close Quick Preview',

    // Tour Planner (TSP 2-Opt)
    tourPlannerTitle: 'Select 2 - 6 Heritage Sites',
    selectedTourCount: 'Selected',
    tourPlannerDesc: 'The Nearest Neighbor + 2-Opt TSP heuristic computes the mathematically optimal sequence to minimize travel time and driving distance.',
    optimizingTourBtn: 'Optimizing 2-Opt Tour Route...',
    optimizeTourBtn: 'Optimize Itinerary (2-Opt TSP)',
    tourResultTitle: 'Optimal Itinerary Result:',
    clearTourBtn: 'Clear tour',
    totalDistance: 'Total Distance',
    travelDuration: 'Travel Duration',
    tourSavingsMessage: 'Saves {percent}% travel distance compared to unoptimized sequence!',
    optimalSequenceTitle: 'Optimal Visit Sequence:',
    stopIndexBadge: 'Stop',

    // Floating Panels on WebGIS Map
    routeBannerTitle: 'Navigation Route',
    routeDestination: 'To',
    approxDuration: '~{min} mins',
    openGoogleMaps: 'Open Google Maps',
    directionsSteps: 'Steps ({count})',
    hideDirections: 'Collapse',
    stepAfterKm: 'In {km} km',
    tourBannerTitle: 'Multi-Stop Tour',
    monumentStopsCount: '{count} Heritage Stops in Đồng Tháp',
    closeBanner: 'Close Directions',
    stopDetailBtn: 'View Details',
    stopNumberBadge: 'Tour Stop #{num}',
    userGpsTitle: 'Your Location (Drag to relocate)',
    userGpsHint: 'Drag the marker on the map to change departure point',

    // Map Controls
    streetMapLabel: 'Street Map',
    streetMapDesc: 'Google Maps standard street network (Đồng Tháp)',
    cartoOsmLabel: 'CARTO/OSM',
    cartoOsmDesc: 'CARTO Voyager / OpenStreetMap basemap',
    satelliteLabel: 'Satellite',
    satelliteDesc: 'Google Hybrid high-resolution satellite imagery',
    locateMeTooltip: 'Locate your current GPS position',
    dongThapOverviewTooltip: 'Full Đồng Tháp Province view',
    mapWatermarkValid: 'SenMap GIS Đồng Tháp • Coordinates Valid ({layer})',
    mapWatermarkInvalid: 'SenMap Notice: Position outside Đồng Tháp (Drag to move)',

    // Monument Detail View
    backToMap: 'SenMap WebGIS',
    saveFavorite: 'Save to Favorites',
    shareMonument: 'Share Heritage Profile',
    shareCopied: 'Link copied to clipboard!',
    loadingHeritage: 'Loading cultural heritage record...',
    viewsCount: '{count} views',
    qrScansCount: '{count} QR scans',
    heritageRankCol: 'Heritage Classification',
    openingHoursCol: 'Opening Hours',
    admissionFeeCol: 'Admission Fee',
    districtCol: 'Administrative Jurisdiction',
    audioTourTitle: 'SenMap Audio Tour — Automated Narration',
    audioTourSubtitle: 'Listen to the timeless history and architectural significance narrated in natural voice',
    aiVoiceBadge: 'AI Voice',
    voiceLabel: 'Narrator:',
    voiceSouthernFemale: 'Southern Vietnamese (Đồng Tháp)',
    voiceSouthernMale: 'Southern Vietnamese (Warm)',
    voiceNorthernFemale: 'Northern Vietnamese (Lyrical)',
    voiceEnglishFemale: 'English (US Native Female)',
    voiceEnglishMale: 'English (UK Historic Male)',
    audioQuality: 'Audio Quality: 320kbps HD',
    narratorQuoteLabel: '[Audio Narration Transcript]:',
    historyValueTitle: 'Historical & Architectural Significance',
    historyParagraph2: 'Through centuries of resilient history in the Plain of Reeds (Đồng Tháp Mười), this site preserves priceless tangible artifacts and embodies the unyielding spirit, cultural depth, and heartfelt pride of the people of Đồng Tháp Province.',
    visitorNoticeTitle: 'Visitor Information & Etiquette:',
    photoGalleryTitle: 'Authentic Field Photography',
    spatialGisTitle: 'Spatial GIS Location',
    openWebGisBtn: 'Open SenMap WebGIS',
    identityQrTitle: 'SenMap Heritage QR Identifier',
    scanOnSiteHint: 'Scan this QR code on-site to directly access this verified multimedia guide',
    downloadQrBtn: 'Download QR PNG',
    printA5Btn: 'Print A5 Badge',
    generatingQr: 'Generating QR code...',
    nearbyMonumentsTitle: 'Nearby Heritage Sites in Đồng Tháp',

    // QR Scanner View
    qrScannerTitle: 'SenMap — Heritage QR Scanner',
    qrScannerSubtitle: 'SenMap Đồng Tháp • Smart Heritage QR',
    cameraReady: 'Field Camera Viewfinder Ready',
    cameraHint: 'You may scan using your live camera or choose any of the 20 sites below to test.',
    qrAimGuidance: 'Aim your camera at the SenMap QR plaque or heritage guidebook in Đồng Tháp',
    scanSuccess: 'QR Code Scanned Successfully!',
    openingDetailMsg: 'Opening verified heritage guide...',
    quickTestTitle: 'Quick Simulated QR Testing (SenMap 20 Sites)',
    fieldMode: 'Field Mode',
    scanBtn: 'Scan QR',

    // Admin CMS View
    cmsHeaderBadge: 'SenMap CMS',
    cmsHeaderSub: 'SenMap Đồng Tháp — Land of Pink Lotuses',
    cmsHeaderTitle: 'SenMap CMS — Heritage Management & GIS Map Coordinate Pinning',
    tabMonumentList: 'Heritage Directory ({count})',
    tabAddNew: 'Register New Site',
    statTotalMonuments: 'Total Heritage Sites',
    statPlacesUnit: 'Sites',
    statSpecialNational: 'Special National',
    statMonumentsCount: '{count} Sites',
    statNationalRank: 'National Heritage',
    statTotalQrScans: 'Total QR Scans',
    statScansUnit: '{count} Scans',
    searchAdminPlaceholder: 'Filter by heritage name, district, keyword...',
    showingCount: 'Displaying {filtered} / {total} records',
    colCode: 'ID',
    colPhoto: 'Photo',
    colName: 'Heritage Name',
    colRank: 'Rank',
    colDistrict: 'District',
    colGisCoords: 'GIS Coordinates',
    colScans: 'Scans',
    colActions: 'Actions',
    editTooltip: 'Edit profile & pin GIS coordinates',
    deleteTooltip: 'Delete record',
    confirmDelete: 'Are you sure you want to delete heritage record "{name}"?',
    section1Title: '1. Identification & Classification Information',
    labelMonumentName: 'Heritage Name (*)',
    labelOtherName: 'Alternative / Folk Name',
    labelRank: 'Classification Rank',
    labelCategory: 'Heritage Category',
    labelDistrict: 'District / Municipality',
    labelAddress: 'Detailed Physical Address',
    section2Title: '2. Historical Narration & Visitor Guidelines',
    labelHistorySummary: 'Historical Summary & Heritage Value (*)',
    labelOpeningHours: 'Opening Hours',
    labelTicketPrice: 'Admission Fee (VND - 0 for Free)',
    labelVisitNote: 'Visitor Etiquette & Notes',
    labelThumbnailUrl: 'Thumbnail Photo URL',
    sectionPinTitle: 'Spatial GIS Coordinate Pinning',
    clickMapHint: 'Click anywhere on map to pin',
    labelLat: 'Latitude (WGS84)',
    labelLon: 'Longitude (WGS84)',
    boundsValidTitle: 'Within Provincial Boundaries',
    boundsInvalidTitle: 'Outside Đồng Tháp Boundaries',
    qrPreviewHeader: 'SenMap A5 Print QR Preview',
    qrPreviewDesc: 'This QR code directs visitors straight to this verified profile once saved',
    cancelFormBtn: 'Cancel',
    saveFormBtn: 'Save Record',
    updateFormBtn: 'Update',
    alertNameRequired: 'Please enter the heritage site name!',
    successUpdated: 'Successfully updated heritage site "{name}"!',
    successCreated: 'Successfully added new heritage site "{name}"!',
  },
};

export function LanguageProvider({ children }) {
  const [initial] = useState(() => detectInitialLanguage());
  const [lang, setLangState] = useState(initial.lang);
  const [isAutoDetected, setIsAutoDetected] = useState(initial.isAutoDetected);

  const setLang = (newLang) => {
    if (newLang === 'en' || newLang === 'vi') {
      setLangState(newLang);
      setIsAutoDetected(false);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (e) {
        // Ignore
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  const t = (key, interpolations = {}) => {
    const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.vi;
    let text = dict[key] || UI_TRANSLATIONS.vi[key] || key;

    if (interpolations && typeof interpolations === 'object') {
      for (const [k, v] of Object.entries(interpolations)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return text;
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      isAutoDetected,
      t,
    }),
    [lang, isAutoDetected]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
