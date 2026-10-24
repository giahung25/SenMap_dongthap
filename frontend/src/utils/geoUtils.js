import { DONG_THAP_BOUNDS } from '../data/monumentsData';

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 * @param {[number, number]} coord1 [lat, lon]
 * @param {[number, number]} coord2 [lat, lon]
 * @returns {number} distance in km
 */
export function calculateDistanceKm(coord1, coord2) {
  if (!coord1 || !coord2) return null;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Check if coordinate is within Dong Thap bounding box
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @returns {{isValid: boolean, message: string}}
 */
export function validateDongThapBounds(lat, lon) {
  const { minLat, maxLat, minLon, maxLon } = DONG_THAP_BOUNDS;
  const isLatValid = lat >= minLat && lat <= maxLat;
  const isLonValid = lon >= minLon && lon <= maxLon;

  if (isLatValid && isLonValid) {
    return {
      isValid: true,
      message: 'Tọa độ hợp lệ trong ranh giới tỉnh Đồng Tháp.',
    };
  }

  return {
    isValid: false,
    message: `Tọa độ nằm ngoài phạm vi tỉnh Đồng Tháp (Kinh độ: ${minLon} - ${maxLon}, Vĩ độ: ${minLat} - ${maxLat}). Vui lòng ghim lại trong địa phận Đồng Tháp!`,
  };
}

/**
 * Format currency VND
 */
export function formatCurrency(amount) {
  if (amount === 0 || !amount) return 'Miễn phí vé vào cổng';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Create Google Maps directions URL
 * @param {[number, number]} origin [lat, lon]
 * @param {[number, number]} destination [lat, lon]
 * @returns {string} URL
 */
export function getGoogleMapsDirUrl(origin, destination) {
  const userLat = origin && origin[0] ? origin[0] : 10.4494;
  const userLon = origin && origin[1] ? origin[1] : 105.6295;
  const destLat = destination[0];
  const destLon = destination[1];
  return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${destLat},${destLon}&travelmode=driving`;
}
