import React, { useState, useEffect, useRef } from 'react';
import { monumentApi } from '../services/api';
import { validateDongThapBounds, formatCurrency } from '../utils/geoUtils';
import { DISTRICTS, RANKINGS, CATEGORIES, DONG_THAP_BOUNDS } from '../data/monumentsData';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import QRCode from 'qrcode';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  QrCode as QrIcon,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Eye,
  ScanLine,
  ArrowRight,
  Save,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

// Subcomponent to fix container size & resize issues (eliminating blank/grey tiles)
function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

function MapRecenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position && position[0] && position[1]) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

// Subcomponent to capture map click and update pin coordinates
function LocationPicker({ position, onSelectPosition }) {
  useMapEvents({
    click(e) {
      onSelectPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const pinIcon = L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute -inset-2 rounded-full bg-lotus-500/40 animate-ping"></span>
        <div class="w-9 h-9 rounded-full bg-lotus-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
          <span class="material-symbols-outlined" style="font-size: 20px;">pin_drop</span>
        </div>
      </div>
    `,
    className: 'lotus-marker-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  return position ? <Marker position={position} icon={pinIcon} /> : null;
}

export default function AdminDashboard() {
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'form'
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    otherName: '',
    ranking: 'Quốc gia',
    category: 'Lịch sử - Cách mạng',
    district: 'TP Cao Lãnh',
    address: '',
    history: '',
    openingHours: '07:00 - 17:00 hàng ngày',
    ticketPrice: 0,
    note: '',
    thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    lat: 10.45,
    lon: 105.63,
  });

  const [formQrUrl, setFormQrUrl] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Load monuments
  const loadData = () => {
    monumentApi.getAll().then((data) => {
      setMonuments(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update QR Code preview whenever ID or form changes
  useEffect(() => {
    const previewUrl = `https://senmap.dongthap.gov.vn/di-tich/${editingId || 'new'}`;
    QRCode.toDataURL(previewUrl, { width: 220, margin: 2, color: { dark: '#131B2E', light: '#FFFFFF' } })
      .then(setFormQrUrl)
      .catch(console.error);
  }, [editingId, formData.name]);

  // Handle Edit button
  const handleStartEdit = (m) => {
    setEditingId(m.id);
    setFormData({
      name: m.name,
      otherName: m.otherName || '',
      ranking: m.ranking,
      category: m.category,
      district: m.district,
      address: m.address,
      history: m.history,
      openingHours: m.openingHours,
      ticketPrice: m.ticketPrice,
      note: m.note || '',
      thumbnail: m.thumbnail,
      lat: m.lat,
      lon: m.lon,
    });
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle New button
  const handleStartNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      otherName: '',
      ranking: 'Quốc gia',
      category: 'Lịch sử - Cách mạng',
      district: 'TP Cao Lãnh',
      address: '',
      history: '',
      openingHours: '07:00 - 17:00 hàng ngày',
      ticketPrice: 0,
      note: '',
      thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      lat: 10.4494,
      lon: 105.6295,
    });
    setActiveTab('form');
  };

  // Handle Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ di tích "${name}"?`)) {
      await monumentApi.delete(id);
      loadData();
    }
  };

  // Handle Map Pin Click
  const handleMapPinSelected = (coords) => {
    setFormData((prev) => ({
      ...prev,
      lat: Number(coords[0].toFixed(5)),
      lon: Number(coords[1].toFixed(5)),
    }));
  };

  // Validation
  const boundsCheck = validateDongThapBounds(formData.lat, formData.lon);

  // Submit Form
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên di tích!');
      return;
    }

    if (!boundsCheck.isValid) {
      alert(boundsCheck.message);
      return;
    }

    if (editingId) {
      await monumentApi.update(editingId, formData);
      setSaveSuccessMsg(`Đã cập nhật thành công di tích "${formData.name}"!`);
    } else {
      await monumentApi.create(formData);
      setSaveSuccessMsg(`Đã thêm mới thành công di tích "${formData.name}"!`);
    }

    loadData();
    setTimeout(() => {
      setSaveSuccessMsg('');
      setActiveTab('list');
    }, 1500);
  };

  // Dashboard Metrics
  const totalMonuments = monuments.length;
  const specialCount = monuments.filter((m) => m.ranking === 'Quốc gia đặc biệt').length;
  const nationalCount = monuments.filter((m) => m.ranking === 'Quốc gia').length;
  const totalScans = monuments.reduce((sum, m) => sum + (m.qrScans || 0), 0);

  // Filtered List
  const filteredList = monuments.filter((m) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.district?.toLowerCase().includes(q) ||
      m.ranking?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-800 pb-16">
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-lotus-600 text-white text-[10px] font-bold uppercase tracking-wider">
                SenMap CMS
              </span>
              <span className="text-xs text-slate-400">SenMap Đồng Tháp — Đất Sen Hồng</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              SenMap CMS — Quản trị Hồ sơ Di tích & Ghim Tọa độ Bản đồ GIS
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Danh sách Di tích ({totalMonuments})
            </button>
            <button
              onClick={handleStartNew}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'form' && !editingId
                  ? 'bg-lotus-600 text-white shadow-md shadow-lotus-600/30'
                  : 'bg-lotus-600/90 text-white hover:bg-lotus-600'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Di tích mới</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* ============================================================ */}
        {/* STATS METRICS ROW (Matching Stitch 31ce6ce20c0e4ef68a42f9f1) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-lotus-100 text-lotus-700 flex items-center justify-center font-bold text-lg">
              20
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">Tổng số di tích</p>
              <p className="text-lg font-black text-slate-900">{totalMonuments} Địa điểm</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              ★
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">Quốc gia đặc biệt</p>
              <p className="text-lg font-black text-slate-900">{specialCount} Di tích</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-tram-100 text-tram-700 flex items-center justify-center font-bold text-lg">
              🏛️
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">Cấp Quốc gia</p>
              <p className="text-lg font-black text-slate-900">{nationalCount} Di tích</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">Lượt quét QR</p>
              <p className="text-lg font-black text-slate-900">{totalScans.toLocaleString()} Lượt</p>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="p-4 rounded-2xl bg-tram-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-5 h-5" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 1: DANH SÁCH DI TÍCH (TABLE & SEARCH)                    */}
        {/* ============================================================ */}
        {activeTab === 'list' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Lọc tên di tích, huyện/thị xã..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-lotus-500"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Hiển thị <strong>{filteredList.length}</strong> / {totalMonuments} hồ sơ
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-3">Mã</th>
                    <th className="py-3 px-3">Ảnh</th>
                    <th className="py-3 px-3">Tên di tích</th>
                    <th className="py-3 px-3">Cấp hạng</th>
                    <th className="py-3 px-3">Khu vực</th>
                    <th className="py-3 px-3">Tọa độ GIS</th>
                    <th className="py-3 px-3">Lượt quét</th>
                    <th className="py-3 px-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-400">#{m.id}</td>
                      <td className="py-3 px-3">
                        <img
                          src={m.thumbnail}
                          alt={m.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-200"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-800">{m.name}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[220px]">{m.address}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.ranking === 'Quốc gia đặc biệt'
                              ? 'bg-lotus-100 text-lotus-700'
                              : m.ranking === 'Quốc gia'
                              ? 'bg-tram-100 text-tram-700'
                              : 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {m.ranking}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-600">{m.district}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                        {m.lat?.toFixed(3)}°, {m.lon?.toFixed(3)}°
                      </td>
                      <td className="py-3 px-3 font-semibold text-tram-700">{m.qrScans || 0}</td>
                      <td className="py-3 px-3 text-right space-x-1">
                        <button
                          onClick={() => handleStartEdit(m)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-lotus-50 hover:text-lotus-600 text-slate-600 transition-colors"
                          title="Sửa hồ sơ & ghim tọa độ"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id, m.name)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors"
                          title="Xóa di tích"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: FORM THÊM / SỬA DI TÍCH VÀ GHIM TỌA ĐỘ BẢN ĐỒ LEAFLET  */}
        {/* ============================================================ */}
        {activeTab === 'form' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CỘT TRÁI (2/3): CÁC TRƯỜNG THÔNG TIN HỒ SƠ */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Định danh */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-lotus-600 text-[20px]">badge</span>
                    <span>1. Thông tin Định danh & Phân cấp Di tích</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Tên di tích (*)</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: Khu Di tích Khảo cổ Gò Tháp"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tên gọi khác / Dân gian</label>
                      <input
                        type="text"
                        value={formData.otherName}
                        onChange={(e) => setFormData({ ...formData, otherName: e.target.value })}
                        placeholder="Ví dụ: Lăng Ông Tiền quân..."
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Cấp xếp hạng</label>
                      <select
                        value={formData.ranking}
                        onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none bg-white"
                      >
                        {RANKINGS.filter((r) => r !== 'Tất cả cấp hạng').map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Loại hình di sản</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none bg-white"
                      >
                        {CATEGORIES.filter((c) => c !== 'Tất cả loại hình').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Địa bàn Huyện / Thành phố</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none bg-white"
                      >
                        {DISTRICTS.filter((d) => d !== 'Tất cả Huyện/TP').map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Địa chỉ cụ thể</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, đường, ấp/xã, huyện, tỉnh Đồng Tháp"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Thuyết minh & Lưu ý */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-tram-600 text-[20px]">description</span>
                    <span>2. Thuyết minh Lịch sử & Hướng dẫn Tham quan</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tóm tắt Lịch sử & Giá trị Di sản (*)</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.history}
                        onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                        placeholder="Nhập nội dung lịch sử di tích để phát trong Audio Tour..."
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Thời gian mở cửa</label>
                        <input
                          type="text"
                          value={formData.openingHours}
                          onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Giá vé (VND - 0 nếu miễn phí)</label>
                        <input
                          type="number"
                          value={formData.ticketPrice}
                          onChange={(e) => setFormData({ ...formData, ticketPrice: Number(e.target.value) })}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Lưu ý tham quan</label>
                      <input
                        type="text"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder="Quy định trang phục, thắp hương, giữ trật tự..."
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">URL Hình ảnh Thumbnail</label>
                      <input
                        type="url"
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI (1/3): GHIM TỌA ĐỘ BẢN ĐỒ & KIỂM TRA BOUNDING BOX ĐỒNG THÁP */}
              <div className="space-y-6">
                {/* Bản đồ Ghim Tọa độ */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-lotus-600" />
                      <span>Ghim Tọa độ Không gian GIS</span>
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">Click vào bản đồ</span>
                  </div>

                  {/* Leaflet Click-to-Pin Canvas */}
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                    <MapContainer
                      center={[formData.lat, formData.lon]}
                      zoom={11}
                      className="w-full h-full"
                    >
                      <TileLayer
                        url="https://mt1.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}"
                        attribution="&copy; Google Maps"
                        maxZoom={20}
                      />
                      <MapResizeFix />
                      <MapRecenter position={[formData.lat, formData.lon]} />
                      <LocationPicker
                        position={[formData.lat, formData.lon]}
                        onSelectPosition={handleMapPinSelected}
                      />
                    </MapContainer>
                  </div>

                  {/* Coordinate Inputs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Vĩ độ (Latitude)</label>
                      <input
                        type="number"
                        step="0.00001"
                        value={formData.lat}
                        onChange={(e) =>
                          setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full h-9 px-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Kinh độ (Longitude)</label>
                      <input
                        type="number"
                        step="0.00001"
                        value={formData.lon}
                        onChange={(e) =>
                          setFormData({ ...formData, lon: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full h-9 px-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-1 focus:ring-lotus-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* BOUNDING BOX GUARD STATUS BANNER (CRITICAL) */}
                  <div
                    className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2 ${
                      boundsCheck.isValid
                        ? 'bg-tram-50 border-tram-200 text-tram-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    {boundsCheck.isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-tram-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">
                        {boundsCheck.isValid ? 'Ranh giới hợp lệ' : 'Vi phạm ranh giới tỉnh'}
                      </p>
                      <p className="text-[11px] mt-0.5">{boundsCheck.message}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Preview Box */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <QrIcon className="w-4 h-4 text-tram-600" />
                    <span>Preview Tem In QR A5 SenMap</span>
                  </h4>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl inline-block shadow-inner">
                    {formQrUrl && <img src={formQrUrl} alt="QR" className="w-32 h-32 mx-auto rounded-lg" />}
                  </div>

                  <p className="text-[10px] text-slate-400">
                    Mã QR sẽ dẫn thẳng tới trang chi tiết di tích sau khi lưu
                  </p>
                </div>

                {/* Submit Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-2xl bg-lotus-600 hover:bg-lotus-700 text-white font-bold text-xs shadow-lg shadow-lotus-600/25 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? 'Cập nhật' : 'Lưu hồ sơ'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
