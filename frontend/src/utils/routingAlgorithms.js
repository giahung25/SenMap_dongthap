/**
 * =========================================================================================
 * BỘ THUẬT TOÁN ĐỊNH TUYẾN GIAO THÔNG VÀ TỐI ƯU HÓA HÀNH TRÌNH DU LỊCH ĐỒNG THÁP
 * =========================================================================================
 * 
 * 1. CƠ SỞ TOÁN HỌC & THUẬT TOÁN TÌM ĐƯỜNG A* (A-STAR SEARCH ALGORITHM):
 *    - Hàm đánh giá chi phí tổng: f(n) = g(n) + h(n)
 *      + g(n): Chi phí thực tế đã đi từ điểm xuất phát (origin) đến nút hiện tại n (km).
 *      + h(n): Hàm đánh giá heuristic ước lượng chi phí từ n đến đích (destination).
 *    - Hàm heuristic h(n) sử dụng công thức Haversine (Khoảng cách trắc địa mặt cầu Trái Đất):
 *        a = sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)
 *        c = 2 * atan2(√a, √(1-a))
 *        d = R * c  (với R ≈ 6371 km)
 *    - Tính chất: Vì đường chim bay Haversine luôn ngắn hơn hoặc bằng đường bộ thực tế (h(n) <= h*(n)),
 *      h(n) là hàm heuristic chấp nhận được (Admissible) và đơn điệu (Consistent).
 *      Do đó, thuật toán A* bảo đảm tìm ra lời giải đường đi ngắn nhất tối ưu toàn cục.
 * 
 * 2. CƠ SỞ TOÁN HỌC TỐI ƯU HÓA HÀNH TRÌNH NHIỀU ĐIỂM (TRAVELING SALESPERSON PROBLEM - TSP):
 *    - Bài toán TSP là bài toán NP-Hard. Với quy mô du lịch thực tế (2 - 8 di tích):
 *      + Giai đoạn 1 (Khởi tạo): Thuật toán Tham lam Láng giềng Gần nhất (Nearest Neighbor).
 *        Từ vị trí xuất phát, lần lượt chọn di tích chưa thăm có khoảng cách nhỏ nhất.
 *      + Giai đoạn 2 (Cải tiến): Tìm kiếm Cục bộ 2-Opt (2-Opt Local Search Heuristic).
 *        Xét mọi cặp cạnh không kề nhau (i, i+1) và (k, k+1). Nếu hoán đổi 2 cạnh này bằng
 *        (i, k) và (i+1, k+1) - tương đương đảo ngược đoạn đường con từ i+1 đến k - làm giảm
 *        tổng chiều dài hành trình (Δd < 0), ta thực hiện đảo ngược. Thuật toán lặp lại cho
 *        đến khi đạt trạng thái cân bằng cục bộ (2-optimal).
 * =========================================================================================
 */

import { calculateDistanceKm, getGoogleMapsDirUrl } from './geoUtils';

// =========================================================================================
// MẠNG LƯỚI ĐỒ THỊ GIAO THÔNG BỘ TỈNH ĐỒNG THÁP (DONG_THAP_ROAD_GRAPH)
// Bao gồm ~45 nút giao thông trọng yếu, cầu vượt sông Tiền, sông Hậu và các quốc lộ, tỉnh lộ
// =========================================================================================

export const DONG_THAP_ROAD_NODES = {
  // --- KHU VỰC TRUNG TÂM TP. CAO LÃNH & CẦU CAO LÃNH ---
  CL_CENTER: { id: 'CL_CENTER', name: 'Trung tâm TP. Cao Lãnh (Công viên Văn Miếu)', coords: [10.4534, 105.6341] },
  CL_PHOBANG: { id: 'CL_PHOBANG', name: 'Khu Di tích Cụ Phó bảng Nguyễn Sinh Sắc', coords: [10.4494, 105.6295] },
  CL_MYTHO: { id: 'CL_MYTHO', name: 'Ngã 3 Mỹ Thọ (QL30 - ĐT846)', coords: [10.4312, 105.7154] },
  CL_TINHTHOI: { id: 'CL_TINHTHOI', name: 'Nút giao Bờ Bắc Cầu Cao Lãnh (Xã Tịnh Thới)', coords: [10.4225, 105.6521] },
  BRIDGE_CAOLANH: { id: 'BRIDGE_CAOLANH', name: 'Cầu Cao Lãnh (Vượt Sông Tiền)', coords: [10.4132, 105.6582] },
  CL_PHONGBAC: { id: 'CL_PHONGBAC', name: 'Vòng xoay Phong Bắc (QL30 tránh TP. Cao Lãnh)', coords: [10.4721, 105.6124] },
  CL_MYTRA: { id: 'CL_MYTRA', name: 'Cầu Mỹ Trà (Cửa ngõ Bắc Cao Lãnh)', coords: [10.4682, 105.6421] },

  // --- TRỤC QUỐC LỘ 30 HƯỚNG BẮC (THANH BÌNH - HỒNG NGỰ - BIÊN GIỚI) ---
  TB_PHONGMY: { id: 'TB_PHONGMY', name: 'Ngã 3 Phong Mỹ (QL30 - ĐT848)', coords: [10.4952, 105.5684] },
  TB_CENTER: { id: 'TB_CENTER', name: 'Thị trấn Thanh Bình (Huyện Thanh Bình)', coords: [10.5824, 105.4752] },
  TB_ANLONG: { id: 'TB_ANLONG', name: 'Ngã 3 An Long (QL30 - ĐT844 đi Tràm Chim)', coords: [10.6651, 105.3785] },
  HN_BINHTHANH: { id: 'HN_BINHTHANH', name: 'Cầu Bình Thành (QL30)', coords: [10.7421, 105.3214] },
  HN_CENTER: { id: 'HN_CENTER', name: 'Trung tâm TP. Hồng Ngự (Quảng trường Võ Nguyên Giáp)', coords: [10.8038, 105.2974] },
  HN_GAOTHAP: { id: 'HN_GAOTHAP', name: 'Ngã tư Hồng Ngự - Tân Châu (ĐT841)', coords: [10.8125, 105.2852] },
  HN_THUONGPHUOC: { id: 'HN_THUONGPHUOC', name: 'Cửa khẩu Quốc tế Thường Phước', coords: [10.8852, 105.1854] },

  // --- TRỤC TÂN HỒNG & BIÊN GIỚI TÂY NAM (ĐT842 - ĐT843) ---
  TH_SARAI: { id: 'TH_SARAI', name: 'Thị trấn Sa Rài (Huyện Tân Hồng)', coords: [10.8854, 105.3852] },
  TH_DINHBA: { id: 'TH_DINHBA', name: 'Cửa khẩu Quốc tế Dinh Bà', coords: [10.9254, 105.3951] },
  TH_THONGBINH: { id: 'TH_THONGBINH', name: 'Di tích Căn cứ Thông Bình', coords: [10.9012, 105.4235] },
  TH_GIONGTHIDAM: { id: 'TH_GIONGTHIDAM', name: 'Di tích Giồng Thị Đam - Gò Quản Cung', coords: [10.8356, 105.4892] },

  // --- VÙNG TAM NÔNG & VƯỜN QUỐC GIA TRÀM CHIM (ĐT844 - ĐT843) ---
  TN_TRAMCHIM: { id: 'TN_TRAMCHIM', name: 'Trung tâm Vườn Quốc gia Tràm Chim (Tam Nông)', coords: [10.6885, 105.5254] },
  TN_PHUTHO: { id: 'TN_PHUTHO', name: 'Ngã 3 Phú Thọ (ĐT844 - ĐT843)', coords: [10.7052, 105.4651] },
  TN_ANHOA: { id: 'TN_ANHOA', name: 'Cầu An Hòa (ĐT844)', coords: [10.6721, 105.4251] },

  // --- KHU VỰC THÁP MƯỜI & DI TÍCH GÒ THÁP (TUYẾN N2 - ĐT845 - ĐT846) ---
  TM_MYAN: { id: 'TM_MYAN', name: 'Thị trấn Mỹ An (Trung tâm Tháp Mười)', coords: [10.5524, 105.8052] },
  TM_GOTHAP: { id: 'TM_GOTHAP', name: 'Khu Di tích Quốc gia Đặc biệt Gò Tháp', coords: [10.6052, 105.8254] },
  TM_DOCBINHKIEU: { id: 'TM_DOCBINHKIEU', name: 'Ngã 3 Đốc Binh Kiều (N2 - ĐT846)', coords: [10.5251, 105.7485] },
  TM_MYQUI: { id: 'TM_MYQUI', name: 'Ngã 3 Mỹ Quý (Huyện Tháp Mười)', coords: [10.5385, 105.7124] },
  TM_N2_BORDER: { id: 'TM_N2_BORDER', name: 'Tuyến N2 (Ranh giới Đồng Tháp - Long An)', coords: [10.5824, 105.8852] },
  CL_GAOGIONG: { id: 'CL_GAOGIONG', name: 'Lối vào Khu Sinh thái Gáo Giồng (ĐT846)', coords: [10.5521, 105.5985] },

  // --- TRỤC HUYỆN CAO LÃNH & DI TÍCH XẺO QUÝT (QL30 - ĐT850) ---
  CL_XEOQUYT: { id: 'CL_XEOQUYT', name: 'Khu Di tích Lịch sử Xẻo Quýt', coords: [10.4285, 105.7352] },
  CL_MYHIEP: { id: 'CL_MYHIEP', name: 'Chợ Đầu mối Trái cây Mỹ Hiệp (QL30)', coords: [10.4052, 105.7821] },
  CL_BASAO: { id: 'CL_BASAO', name: 'Ngã 3 Ba Sao (QL30)', coords: [10.3854, 105.8214] },
  DT_ANTHAI_TRUNG: { id: 'DT_ANTHAI_TRUNG', name: 'Nút giao QL30 - QL1A (An Thái Trung)', coords: [10.3621, 105.8854] },

  // --- KHU VỰC LẮP VÒ & CẦU VÀM CỐNG (NAM SÔNG TIỀN) ---
  LV_BONAM_CAOLANH: { id: 'LV_BONAM_CAOLANH', name: 'Nút giao bờ Nam Cầu Cao Lãnh (Huyện Lấp Vò)', coords: [10.4051, 105.6624] },
  LV_TUYENNOI: { id: 'LV_TUYENNOI', name: 'Tuyến nối Cao Lãnh - Vàm Cống (Km 12 Lấp Vò)', coords: [10.3652, 105.5852] },
  LV_LAPVO_CENTER: { id: 'LV_LAPVO_CENTER', name: 'Thị trấn Lấp Vò (Ngã tư QL80 & ĐT848)', coords: [10.2952, 105.5351] },
  BRIDGE_VAMCONG: { id: 'BRIDGE_VAMCONG', name: 'Cầu Vàm Cống (Bờ Đồng Tháp vượt sông Hậu)', coords: [10.3185, 105.4852] },
  LV_DINHAN: { id: 'LV_DINHAN', name: 'Khu Công nghiệp Định An (QL54)', coords: [10.2451, 105.5254] },

  // --- KHU VỰC TP. SA ĐÉC, LAI VUNG & CHÂU THÀNH (QL80 - ĐT848 - ĐT852) ---
  SD_CENTER: { id: 'SD_CENTER', name: 'Trung tâm TP. Sa Đéc (Chợ Sa Đéc / Huỳnh Thủy Lê)', coords: [10.2974, 105.7588] },
  SD_LANGHOA: { id: 'SD_LANGHOA', name: 'Làng hoa Sa Đéc (Tân Quy Đông)', coords: [10.3152, 105.7485] },
  SD_CONGCHAO: { id: 'SD_CONGCHAO', name: 'Cổng chào TP. Sa Đéc (QL80)', coords: [10.2921, 105.7725] },
  SD_TANDUONG: { id: 'SD_TANDUONG', name: 'Ngã 3 Tân Dương (QL80 - ĐT852)', coords: [10.2885, 105.7152] },
  LV_LAIVUNG_CENTER: { id: 'LV_LAIVUNG_CENTER', name: 'Thị trấn Lai Vung (Nem Lai Vung - QL80)', coords: [10.2721, 105.6651] },
  CT_CAITAUHA: { id: 'CT_CAITAUHA', name: 'Thị trấn Cái Tàu Hạ (Huyện Châu Thành - QL80)', coords: [10.2852, 105.8452] },
  CT_MYTHUAN: { id: 'CT_MYTHUAN', name: 'Nút giao Bờ Bắc Cầu Mỹ Thuận (Đồng Tháp)', coords: [10.2785, 105.9085] },
  LV_PHONGHOA: { id: 'LV_PHONGHOA', name: 'Thị trấn Phong Hòa (Lai Vung - QL54 bờ Sông Hậu)', coords: [10.1852, 105.6254] },
};

// =========================================================================================
// DANH SÁCH CÁC CẠNH (TỰA TUYẾN ĐƯỜNG THỰC TẾ) NỐI CÁC ĐỈNH ĐỒ THỊ GIAO THÔNG
// =========================================================================================

export const DONG_THAP_ROAD_EDGES = [
  // --- TUYẾN QUỐC LỘ 30 TRỤC DỌC ---
  { from: 'DT_ANTHAI_TRUNG', to: 'CL_BASAO', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'CL_BASAO', to: 'CL_MYHIEP', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'CL_MYHIEP', to: 'CL_MYTHO', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'CL_MYTHO', to: 'CL_MYTRA', road: 'Quốc lộ 30 (Vào cửa ngõ Cao Lãnh)', speedKmH: 50 },
  { from: 'CL_MYTRA', to: 'CL_CENTER', road: 'Đường Nguyễn Huệ / QL30', speedKmH: 40 },
  { from: 'CL_CENTER', to: 'CL_PHOBANG', road: 'Đường Phạm Hữu Lầu', speedKmH: 40 },
  { from: 'CL_CENTER', to: 'CL_PHONGBAC', road: 'Quốc lộ 30 nội ô', speedKmH: 45 },
  { from: 'CL_PHONGBAC', to: 'TB_PHONGMY', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'TB_PHONGMY', to: 'TB_CENTER', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'TB_CENTER', to: 'TB_ANLONG', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'TB_ANLONG', to: 'HN_BINHTHANH', road: 'Quốc lộ 30', speedKmH: 60 },
  { from: 'HN_BINHTHANH', to: 'HN_CENTER', road: 'Quốc lộ 30 (Vào TP. Hồng Ngự)', speedKmH: 50 },
  { from: 'HN_CENTER', to: 'HN_GAOTHAP', road: 'ĐT841', speedKmH: 50 },
  { from: 'HN_GAOTHAP', to: 'HN_THUONGPHUOC', road: 'ĐT841 (Tới Cửa khẩu Thường Phước)', speedKmH: 50 },

  // --- TRỤC CẦU CAO LÃNH & NỐI CAO LÃNH - VÀM CỐNG ---
  { from: 'CL_CENTER', to: 'CL_TINHTHOI', road: 'Đường dẫn Cầu Cao Lãnh (Bờ Bắc)', speedKmH: 50 },
  { from: 'CL_TINHTHOI', to: 'BRIDGE_CAOLANH', road: 'Cầu Cao Lãnh (Vượt Sông Tiền)', speedKmH: 70 },
  { from: 'BRIDGE_CAOLANH', to: 'LV_BONAM_CAOLANH', road: 'Cầu Cao Lãnh (Bờ Nam Lấp Vò)', speedKmH: 70 },
  { from: 'LV_BONAM_CAOLANH', to: 'LV_TUYENNOI', road: 'Tuyến nối Cao Lãnh - Vàm Cống', speedKmH: 80 },
  { from: 'LV_TUYENNOI', to: 'LV_LAPVO_CENTER', road: 'Đường nối Lấp Vò', speedKmH: 60 },
  { from: 'LV_LAPVO_CENTER', to: 'BRIDGE_VAMCONG', road: 'Tuyến Vàm Cống (Vượt Sông Hậu)', speedKmH: 70 },

  // --- TRỤC QUỐC LỘ 80 & NAM SÔNG TIỀN (SA ĐÉC - LAI VUNG - LẤP VÒ) ---
  { from: 'CT_MYTHUAN', to: 'CT_CAITAUHA', road: 'Quốc lộ 80', speedKmH: 60 },
  { from: 'CT_CAITAUHA', to: 'SD_CONGCHAO', road: 'Quốc lộ 80', speedKmH: 60 },
  { from: 'SD_CONGCHAO', to: 'SD_CENTER', road: 'Đường Hùng Vương / QL80', speedKmH: 45 },
  { from: 'SD_CENTER', to: 'SD_LANGHOA', road: 'Đường hoa Sa Nhiên - Cai Dao', speedKmH: 35 },
  { from: 'SD_CENTER', to: 'SD_TANDUONG', road: 'Quốc lộ 80', speedKmH: 50 },
  { from: 'SD_TANDUONG', to: 'LV_LAIVUNG_CENTER', road: 'Quốc lộ 80', speedKmH: 60 },
  { from: 'LV_LAIVUNG_CENTER', to: 'LV_LAPVO_CENTER', road: 'Quốc lộ 80', speedKmH: 60 },

  // --- KẾT NỐI SA ĐÉC - CAO LÃNH QUA ĐT848 & PHÀ / CẦU ---
  { from: 'SD_LANGHOA', to: 'LV_BONAM_CAOLANH', road: 'ĐT848 liên huyện', speedKmH: 50 },
  { from: 'LV_LAIVUNG_CENTER', to: 'LV_PHONGHOA', road: 'ĐT851 nối QL54', speedKmH: 45 },
  { from: 'LV_LAPVO_CENTER', to: 'LV_DINHAN', road: 'QL54 bờ Sông Hậu', speedKmH: 50 },

  // --- VÙNG THÁP MƯỜI & ĐƯỜNG HỒ CHÍ MINH (N2) & DI TÍCH GÒ THÁP ---
  { from: 'CL_MYTHO', to: 'CL_XEOQUYT', road: 'ĐT850 vào Khu Di tích Xẻo Quýt', speedKmH: 45 },
  { from: 'CL_XEOQUYT', to: 'TM_DOCBINHKIEU', road: 'ĐT850 nối ĐT846', speedKmH: 50 },
  { from: 'TM_DOCBINHKIEU', to: 'TM_MYAN', road: 'Tuyến N2', speedKmH: 65 },
  { from: 'TM_MYAN', to: 'TM_GOTHAP', road: 'ĐT845 vào Khu Khảo cổ Gò Tháp', speedKmH: 50 },
  { from: 'TM_MYAN', to: 'TM_N2_BORDER', road: 'Tuyến N2 đi Long An / TP.HCM', speedKmH: 70 },
  { from: 'CL_MYTRA', to: 'CL_GAOGIONG', road: 'ĐT846 đi Rừng tràm Gáo Giồng', speedKmH: 45 },
  { from: 'CL_GAOGIONG', to: 'TM_MYQUI', road: 'Đường liên huyện Tháp Mười', speedKmH: 45 },
  { from: 'TM_MYQUI', to: 'TM_MYAN', road: 'ĐT846', speedKmH: 50 },

  // --- VÙNG TAM NÔNG & TÂN HỒNG (TRÀM CHIM - SA RÀI) ---
  { from: 'TB_ANLONG', to: 'TN_ANHOA', road: 'ĐT844', speedKmH: 50 },
  { from: 'TN_ANHOA', to: 'TN_PHUTHO', road: 'ĐT844', speedKmH: 50 },
  { from: 'TN_PHUTHO', to: 'TN_TRAMCHIM', road: 'ĐT844 vào Vườn QG Tràm Chim', speedKmH: 45 },
  { from: 'TN_PHUTHO', to: 'TH_GIONGTHIDAM', road: 'ĐT843', speedKmH: 50 },
  { from: 'TH_GIONGTHIDAM', to: 'TH_SARAI', road: 'ĐT843 đi Sa Rài', speedKmH: 50 },
  { from: 'TH_SARAI', to: 'TH_DINHBA', road: 'Cửa khẩu Quốc tế Dinh Bà', speedKmH: 50 },
  { from: 'TH_SARAI', to: 'TH_THONGBINH', road: 'ĐT842 đi Thông Bình', speedKmH: 50 },
  { from: 'HN_CENTER', to: 'TH_SARAI', road: 'ĐT842 kết nối Hồng Ngự - Tân Hồng', speedKmH: 55 },
];

// Tạo danh sách kề (Adjacency List) hai chiều từ danh sách cạnh
function buildAdjacencyList() {
  const adj = {};
  for (const nodeId of Object.keys(DONG_THAP_ROAD_NODES)) {
    adj[nodeId] = [];
  }

  for (const edge of DONG_THAP_ROAD_EDGES) {
    const nodeA = DONG_THAP_ROAD_NODES[edge.from];
    const nodeB = DONG_THAP_ROAD_NODES[edge.to];
    if (!nodeA || !nodeB) continue;

    const dist = calculateDistanceKm(nodeA.coords, nodeB.coords);
    const timeMinutes = Math.round((dist / edge.speedKmH) * 60);

    adj[edge.from].push({
      neighbor: edge.to,
      distanceKm: dist,
      timeMinutes,
      road: edge.road,
    });

    adj[edge.to].push({
      neighbor: edge.from,
      distanceKm: dist,
      timeMinutes,
      road: edge.road,
    });
  }
  return adj;
}

const ADJ_LIST = buildAdjacencyList();

/**
 * Snap một tọa độ GPS bất kỳ vào nút giao thông gần nhất trên mạng lưới
 * @param {[number, number]} coord [lat, lon]
 * @returns {string} ID nút gần nhất
 */
export function findNearestRoadNode(coord) {
  let nearestId = 'CL_CENTER';
  let minDistance = Infinity;

  for (const [nodeId, node] of Object.entries(DONG_THAP_ROAD_NODES)) {
    const d = calculateDistanceKm(coord, node.coords);
    if (d < minDistance) {
      minDistance = d;
      nearestId = nodeId;
    }
  }
  return nearestId;
}

/**
 * =========================================================================================
 * THUẬT TOÁN TÌM ĐƯỜNG A* (A-STAR SHORTEST PATH)
 * =========================================================================================
 * @param {[number, number]} origin [lat, lon]
 * @param {[number, number]} destination [lat, lon]
 * @returns {{ coords: Array<[number, number]>, distanceKm: number, durationMin: number, steps: Array<object> }}
 */
export function aStarPath(origin, destination) {
  const startNodeId = findNearestRoadNode(origin);
  const endNodeId = findNearestRoadNode(destination);

  // Nếu điểm xuất phát và đích cùng map vào 1 nút giao thông
  if (startNodeId === endNodeId) {
    const dist = calculateDistanceKm(origin, destination);
    const dur = Math.max(3, Math.round((dist / 35) * 60));
    return {
      coords: [origin, DONG_THAP_ROAD_NODES[startNodeId].coords, destination],
      distanceKm: dist,
      durationMin: dur,
      steps: [
        { instruction: `Khởi hành từ vị trí của bạn`, distanceKm: Math.round(dist * 0.5 * 10) / 10 },
        { instruction: `Di chuyển vào ${DONG_THAP_ROAD_NODES[startNodeId].name}`, distanceKm: Math.round(dist * 0.5 * 10) / 10 },
        { instruction: `Đến điểm di tích đích`, distanceKm: 0 }
      ],
      algorithmUsed: 'A* Heuristic Search (Nội bộ Đồng Tháp)',
    };
  }

  // Priority Queue giả lập bằng mảng sắp xếp đơn giản
  const openSet = [startNodeId];
  const cameFrom = {};
  const cameViaRoad = {};

  // gScore[n]: Chi phí thực tế từ Start đến n
  const gScore = {};
  // fScore[n] = gScore[n] + h(n): Ước lượng chi phí tổng
  const fScore = {};

  for (const nodeId of Object.keys(DONG_THAP_ROAD_NODES)) {
    gScore[nodeId] = Infinity;
    fScore[nodeId] = Infinity;
  }

  gScore[startNodeId] = 0;
  fScore[startNodeId] = calculateDistanceKm(
    DONG_THAP_ROAD_NODES[startNodeId].coords,
    DONG_THAP_ROAD_NODES[endNodeId].coords
  );

  while (openSet.length > 0) {
    // Lấy nút có fScore nhỏ nhất trong openSet
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    const current = openSet.shift();

    if (current === endNodeId) {
      // Tái dựng lại đường đi từ end về start
      const pathNodeIds = [current];
      let curr = current;
      while (cameFrom[curr]) {
        curr = cameFrom[curr];
        pathNodeIds.unshift(curr);
      }

      // Tạo chuỗi tọa độ liên tục bám sát mạng lưới đường bộ
      const fullCoords = [origin];
      let totalDist = calculateDistanceKm(origin, DONG_THAP_ROAD_NODES[pathNodeIds[0]].coords);
      let totalTime = (totalDist / 40) * 60;
      const steps = [];

      steps.push({
        instruction: `Khởi hành từ vị trí của bạn, nhập vào ${DONG_THAP_ROAD_NODES[pathNodeIds[0]].name}`,
        distanceKm: Math.round(totalDist * 10) / 10,
        road: 'Đường tiếp cận',
      });

      for (let i = 0; i < pathNodeIds.length - 1; i++) {
        const u = pathNodeIds[i];
        const v = pathNodeIds[i + 1];
        const nodeU = DONG_THAP_ROAD_NODES[u];
        const nodeV = DONG_THAP_ROAD_NODES[v];

        fullCoords.push(nodeU.coords);

        const edgeInfo = ADJ_LIST[u].find((e) => e.neighbor === v);
        const legDist = edgeInfo ? edgeInfo.distanceKm : calculateDistanceKm(nodeU.coords, nodeV.coords);
        const legTime = edgeInfo ? edgeInfo.timeMinutes : Math.round((legDist / 55) * 60);

        totalDist += legDist;
        totalTime += legTime;

        steps.push({
          instruction: `Đi theo ${edgeInfo?.road || 'Tuyến tỉnh lộ'} về hướng ${nodeV.name}`,
          distanceKm: Math.round(legDist * 10) / 10,
          road: edgeInfo?.road || 'Đường bộ',
        });
      }

      const lastNode = DONG_THAP_ROAD_NODES[pathNodeIds[pathNodeIds.length - 1]];
      fullCoords.push(lastNode.coords);

      const finalLeg = calculateDistanceKm(lastNode.coords, destination);
      totalDist += finalLeg;
      totalTime += (finalLeg / 35) * 60;
      fullCoords.push(destination);

      steps.push({
        instruction: `Rẽ vào lối vào di tích và đến đích`,
        distanceKm: Math.round(finalLeg * 10) / 10,
        road: 'Điểm đến',
      });

      return {
        coords: fullCoords,
        distanceKm: Math.round(totalDist * 10) / 10,
        durationMin: Math.max(5, Math.round(totalTime)),
        steps,
        algorithmUsed: 'A* Shortest Path (Đồ thị Giao thông Đồng Tháp)',
      };
    }

    // Duyệt các đỉnh kề
    const neighbors = ADJ_LIST[current] || [];
    for (const edge of neighbors) {
      const neighbor = edge.neighbor;
      const tentativeGScore = gScore[current] + edge.distanceKm;

      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        cameViaRoad[neighbor] = edge.road;
        gScore[neighbor] = tentativeGScore;
        // h(n): khoảng cách chim bay đến đích
        const h = calculateDistanceKm(
          DONG_THAP_ROAD_NODES[neighbor].coords,
          DONG_THAP_ROAD_NODES[endNodeId].coords
        );
        fScore[neighbor] = tentativeGScore + h;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // Fallback an toàn (nếu đồ thị bị ngắt đoạn)
  return aStarPath(origin, destination);
}

/**
 * =========================================================================================
 * HYBRID ROUTING ENGINE (findOptimalRoute)
 * Ưu tiên gọi OSRM Contraction Hierarchies API -> Tự động fallback A* nếu offline/timeout
 * =========================================================================================
 * @param {[number, number]} origin [lat, lon]
 * @param {[number, number]} destination [lat, lon]
 * @returns {Promise<object>}
 */
export async function findOptimalRoute(origin, destination) {
  const [userLat, userLon] = origin;
  const [destLat, destLon] = destination;

  // 1. Thử gọi OSRM Contraction Hierarchies Engine (Độ trễ < 3000ms)
  try {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${destLon},${destLat}?overview=full&geometries=geojson&steps=true`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(osrmUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.routes && json.routes.length > 0) {
        const route = json.routes[0];
        // Chuyển tọa độ GeoJSON [lon, lat] sang Leaflet [lat, lon]
        const latLngs = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        const distKm = Math.round((route.distance / 1000) * 10) / 10;
        const durMin = Math.round(route.duration / 60);

        // Biên dịch Turn-by-Turn Steps tiếng Việt từ OSRM maneuvers
        const steps = [];
        if (route.legs && route.legs[0]?.steps) {
          for (const s of route.legs[0].steps) {
            let inst = s.maneuver?.type || 'Di chuyển';
            const modifier = s.maneuver?.modifier || '';
            const roadName = s.name || 'Tuyến giao thông';
            const stepDist = Math.round((s.distance / 1000) * 10) / 10;

            if (inst === 'depart') {
              inst = `Khởi hành từ vị trí của bạn`;
            } else if (inst === 'arrive') {
              inst = `Đến điểm di tích đích đến`;
            } else if (inst === 'turn') {
              if (modifier.includes('right')) inst = `Rẽ phải vào ${roadName}`;
              else if (modifier.includes('left')) inst = `Rẽ trái vào ${roadName}`;
              else inst = `Rẽ vào ${roadName}`;
            } else if (inst === 'new name' || inst === 'continue') {
              inst = `Tiếp tục đi thẳng trên ${roadName}`;
            } else if (inst === 'roundabout' || inst === 'rotary') {
              inst = `Đi vào vòng xoay và rẽ lối ra vào ${roadName}`;
            } else {
              inst = `Đi theo ${roadName}`;
            }

            if (stepDist > 0 || inst.includes('Đến') || inst.includes('Khởi hành')) {
              steps.push({
                instruction: inst,
                distanceKm: stepDist,
                road: roadName,
              });
            }
          }
        }

        return {
          coords: latLngs,
          distanceKm: distKm,
          durationMin: durMin,
          steps: steps.length > 0 ? steps : [{ instruction: 'Đi theo lộ trình đường bộ hiển thị trên bản đồ', distanceKm: distKm }],
          algorithmUsed: 'OSRM Contraction Hierarchies (Giao thông Thực tế)',
        };
      }
    }
  } catch (err) {
    console.warn('OSRM Engine không phản hồi hoặc timeout, tự động kích hoạt A* Search trên Đồ thị Đồng Tháp:', err.message);
  }

  // 2. Fallback hoàn toàn tự động sang thuật toán A* trên Đồ thị Giao thông bộ Đồng Tháp
  return aStarPath(origin, destination);
}

/**
 * =========================================================================================
 * THUẬT TOÁN TỐI ƯU HÓA HÀNH TRÌNH NHIỀU ĐIỂM (MULTI-STOP TOUR PLANNER - TSP)
 * Kết hợp Heuristic Láng giềng gần nhất (Nearest Neighbor) + 2-Opt Local Search
 * =========================================================================================
 * @param {[number, number]} origin Tọa độ điểm bắt đầu [lat, lon]
 * @param {Array<object>} monuments Danh sách các di tích du khách chọn (N điểm)
 * @returns {Promise<object>} Thứ tự thăm tối ưu, quãng đường, thời gian, % tiết kiệm, đường đi
 */
export async function solveTourTSP2Opt(origin, monuments) {
  if (!monuments || monuments.length === 0) {
    return null;
  }

  if (monuments.length === 1) {
    const singleRoute = await findOptimalRoute(origin, monuments[0].coordinates);
    return {
      orderedMonuments: monuments,
      legs: [singleRoute],
      totalDistanceKm: singleRoute.distanceKm,
      totalDurationMin: singleRoute.durationMin,
      savingPercent: 0,
      combinedPolyline: singleRoute.coords,
    };
  }

  // Tính ma trận khoảng cách trắc địa thực tế giữa các điểm
  const points = [
    { id: 'START', name: 'Điểm khởi hành', coordinates: origin },
    ...monuments.map((m) => ({ id: m.id, name: m.name, coordinates: m.coordinates, raw: m }))
  ];
  const n = points.length;

  const distMatrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        distMatrix[i][j] = calculateDistanceKm(points[i].coordinates, points[j].coordinates);
      }
    }
  }

  // 1. Tính tổng khoảng cách theo thứ tự gốc (Initial Naive Tour)
  let initialTotalDist = 0;
  for (let i = 0; i < n - 1; i++) {
    initialTotalDist += distMatrix[i][i + 1];
  }

  // 2. KHỞI TẠO BẰNG THUẬT TOÁN NEAREST NEIGHBOR (Láng giềng gần nhất)
  const visited = new Set([0]); // 0 là điểm START
  const tour = [0];
  let currentIdx = 0;

  while (tour.length < n) {
    let nearestIdx = -1;
    let minD = Infinity;

    for (let j = 1; j < n; j++) {
      if (!visited.has(j)) {
        if (distMatrix[currentIdx][j] < minD) {
          minD = distMatrix[currentIdx][j];
          nearestIdx = j;
        }
      }
    }

    if (nearestIdx !== -1) {
      tour.push(nearestIdx);
      visited.add(nearestIdx);
      currentIdx = nearestIdx;
    } else {
      break;
    }
  }

  // 3. TINH CHỈNH BẰNG THUẬT TOÁN 2-OPT LOCAL SEARCH
  // Cố định điểm đầu tour[0] (Điểm xuất phát), tối ưu hoán vị tour[1..n-1]
  let improved = true;
  let iterations = 0;
  const maxIterations = 50;

  function calculateTourLength(routeIndices) {
    let d = 0;
    for (let i = 0; i < routeIndices.length - 1; i++) {
      d += distMatrix[routeIndices[i]][routeIndices[i + 1]];
    }
    return d;
  }

  let bestTour = [...tour];
  let bestDist = calculateTourLength(bestTour);

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < n - 1; i++) {
      for (let k = i + 1; k < n; k++) {
        // Tạo tour mới bằng cách đảo ngược đoạn con từ i đến k
        const newTour = [
          ...bestTour.slice(0, i),
          ...bestTour.slice(i, k + 1).reverse(),
          ...bestTour.slice(k + 1)
        ];

        const newDist = calculateTourLength(newTour);
        if (newDist < bestDist - 0.05) { // cải thiện ít nhất 50 mét
          bestTour = newTour;
          bestDist = newDist;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  // 4. Lấy danh sách di tích theo thứ tự tối ưu
  const orderedMonuments = bestTour.slice(1).map((idx) => points[idx].raw);

  // Tính % tiết kiệm được so với lộ trình ban đầu
  const savingPercent = initialTotalDist > 0
    ? Math.max(0, Math.round(((initialTotalDist - bestDist) / initialTotalDist) * 100))
    : 0;

  // 5. Nối Polyline đường bộ thực tế qua từng chặng (Leg by Leg)
  const legs = [];
  const combinedPolyline = [];
  let totalRoadKm = 0;
  let totalRoadMin = 0;

  let currentCoord = origin;
  for (let i = 0; i < orderedMonuments.length; i++) {
    const nextMonument = orderedMonuments[i];
    const legRoute = await findOptimalRoute(currentCoord, nextMonument.coordinates);
    legs.push({
      fromName: i === 0 ? 'Điểm xuất phát' : orderedMonuments[i - 1].name,
      toName: nextMonument.name,
      toMonument: nextMonument,
      distanceKm: legRoute.distanceKm,
      durationMin: legRoute.durationMin,
      steps: legRoute.steps,
      coords: legRoute.coords,
    });

    totalRoadKm += legRoute.distanceKm;
    totalRoadMin += legRoute.durationMin;

    if (combinedPolyline.length === 0) {
      combinedPolyline.push(...legRoute.coords);
    } else {
      // Bỏ điểm đầu tiên để tránh trùng lặp
      combinedPolyline.push(...legRoute.coords.slice(1));
    }

    currentCoord = nextMonument.coordinates;
  }

  return {
    orderedMonuments,
    legs,
    totalDistanceKm: Math.round(totalRoadKm * 10) / 10,
    totalDurationMin: totalRoadMin,
    savingPercent,
    combinedPolyline,
    algorithmUsed: `Nearest Neighbor + 2-Opt Local Search (Tiết kiệm ${savingPercent}%)`,
  };
}
