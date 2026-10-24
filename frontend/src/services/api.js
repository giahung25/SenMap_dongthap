import { INITIAL_MONUMENTS, DONG_THAP_BOUNDS } from '../data/monumentsData';

const API_BASE_URL = 'http://localhost:8000/api/v1/monuments';
const STORAGE_KEY = 'dongthap_webgis_monuments';

// Initialize localStorage with 20 monuments if not present
function getStoredMonuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Cannot read from localStorage, using INITIAL_MONUMENTS', err);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MONUMENTS));
  } catch (err) {
    // Ignore storage quota error
  }
  return INITIAL_MONUMENTS;
}

function saveStoredMonuments(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Cannot save to localStorage', err);
  }
}

function normalizeFeature(f) {
  if (!f) return null;
  if (f.type === 'Feature' && f.properties) {
    const p = f.properties || {};
    const [lon, lat] = f.geometry?.coordinates || [105.63, 10.45];
    const thumbFromImages = Array.isArray(p.hinh_anh) && p.hinh_anh.length > 0 ? p.hinh_anh[0].url : null;
    return {
      id: p.id || f.id,
      name: p.ten_di_tich || p.name,
      otherName: p.ten_khac || p.otherName || '',
      ranking: p.cap_xep_hang || p.ranking || 'Cấp tỉnh',
      category: p.danh_muc || p.category || 'Lịch sử - Cách mạng',
      district: p.huyen_tp || p.district || 'Đồng Tháp',
      address: p.dia_chi || p.address || '',
      history: p.lich_su || p.history || '',
      openingHours: p.thoi_gian_mo_cua || p.openingHours || '07:00 - 17:00',
      ticketPrice: p.gia_ve !== undefined ? Number(p.gia_ve) : 0,
      note: p.luu_y_tham_quan || p.note || '',
      thumbnail: p.thumbnail || thumbFromImages,
      qrUrl: p.qr_url || (p.qr_code && p.qr_code.qr_url) || `https://senmap.dongthap.gov.vn/di-tich/${p.id || f.id}`,
      views: p.luot_xem || p.views || 0,
      qrScans: p.luot_quet_qr || p.qrScans || 0,
      coordinates: [lat, lon],
      lat,
      lon,
    };
  }
  const lat = f.lat || (f.coordinates ? f.coordinates[0] : 10.45);
  const lon = f.lon || (f.coordinates ? f.coordinates[1] : 105.63);
  return {
    ...f,
    coordinates: [lat, lon],
    lat,
    lon,
  };
}

// Format API response (GeoJSON or flat array) into our standard format
function normalizeApiData(apiResult) {
  if (!apiResult) return null;
  
  // If backend returns GeoJSON FeatureCollection
  if (apiResult.type === 'FeatureCollection' && Array.isArray(apiResult.features)) {
    return apiResult.features.map(f => normalizeFeature(f));
  }

  // If backend returns array of objects
  if (Array.isArray(apiResult)) {
    return apiResult.map(item => normalizeFeature(item));
  }

  return null;
}

export const monumentApi = {
  // 1. Get all monuments
  async getAll() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(API_BASE_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const normalized = normalizeApiData(json);
        if (normalized && normalized.length > 0) {
          saveStoredMonuments(normalized);
          return normalized;
        }
      }
    } catch (err) {
      // Backend not running, gracefully fallback to local
      console.info('Backend API unavailable at http://localhost:8000, using local GeoJSON data.');
    }
    return getStoredMonuments();
  },

  // 2. Get single monument by ID
  async getById(id) {
    const numericId = Number(id);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE_URL}/${numericId}`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const item = await res.json();
        return normalizeFeature(item);
      }
    } catch (err) {
      // Fallback
    }
    const all = getStoredMonuments();
    return all.find(m => m.id === numericId) || null;
  },

  // 3. Create monument
  async create(payload) {
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        return created;
      }
    } catch (err) {
      console.info('Backend API offline, saving monument locally');
    }

    const all = getStoredMonuments();
    const newId = all.length > 0 ? Math.max(...all.map(m => m.id)) + 1 : 1;
    const newItem = {
      ...payload,
      id: newId,
      views: 0,
      qrScans: 0,
      qrUrl: payload.qrUrl || `https://senmap.dongthap.gov.vn/di-tich/${newId}`,
      coordinates: [payload.lat, payload.lon],
    };
    all.push(newItem);
    saveStoredMonuments(all);
    return newItem;
  },

  // 4. Update monument
  async update(id, payload) {
    const numericId = Number(id);
    try {
      const res = await fetch(`${API_BASE_URL}/${numericId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.info('Backend API offline, updating monument locally');
    }

    const all = getStoredMonuments();
    const index = all.findIndex(m => m.id === numericId);
    if (index !== -1) {
      all[index] = {
        ...all[index],
        ...payload,
        coordinates: [payload.lat || all[index].lat, payload.lon || all[index].lon],
      };
      saveStoredMonuments(all);
      return all[index];
    }
    return null;
  },

  // 5. Delete monument
  async delete(id) {
    const numericId = Number(id);
    try {
      await fetch(`${API_BASE_URL}/${numericId}`, { method: 'DELETE' });
    } catch (err) {
      // Fallback
    }
    const all = getStoredMonuments().filter(m => m.id !== numericId);
    saveStoredMonuments(all);
    return true;
  },

  // 6. Record QR Scan event
  async recordQrScan(id) {
    const numericId = Number(id);
    try {
      const res = await fetch(`${API_BASE_URL}/${numericId}/qr-scan`, {
        method: 'POST',
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      // Fallback
    }

    const all = getStoredMonuments();
    const item = all.find(m => m.id === numericId);
    if (item) {
      item.qrScans = (item.qrScans || 0) + 1;
      item.views = (item.views || 0) + 1;
      saveStoredMonuments(all);
      return item;
    }
    return null;
  },
};
