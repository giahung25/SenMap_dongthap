import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WebGisMap from '../components/map/WebGisMap';
import { monumentApi } from '../services/api';
import {
  calculateDistanceKm,
  validateDongThapBounds,
  formatCurrency,
  getGoogleMapsDirUrl,
  GPS_PRESETS,
} from '../utils/geoUtils';
import { DISTRICTS, RANKINGS, CATEGORIES } from '../data/monumentsData';
import { solveTourTSP2Opt } from '../utils/routingAlgorithms';
import {
  Search,
  X,
  MapPin,
  Compass,
  Navigation,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Route,
  CheckSquare,
  Square,
  AlertTriangle,
  Loader2,
  CalendarCheck,
  CheckCircle2,
  BookOpen,
  Clock,
  Ticket,
  ExternalLink,
} from 'lucide-react';

export default function MapView() {
  const navigate = useNavigate();
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sidebar Mode: 'explore' (Tra cứu di tích) | 'tour' (Lập Tour TSP 2-Opt)
  const [sidebarMode, setSidebarMode] = useState('explore');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('Tất cả cấp hạng');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả Huyện/TP');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả loại hình');
  const [selectedMonument, setSelectedMonument] = useState(null);

  // GPS User location & Presets (3-Mode Smart GPS)
  const [userLocation, setUserLocation] = useState([10.4534, 105.6341]); // Default: TP. Cao Lãnh
  const [selectedGpsPreset, setSelectedGpsPreset] = useState('caolanh');
  const [activeRadius, setActiveRadius] = useState(null); // null | 5 | 10 | 20 (km)
  const [gpsActive, setGpsActive] = useState(false);

  // Multi-Stop Tour Planner (TSP 2-Opt)
  const [selectedTourIds, setSelectedTourIds] = useState([1, 6, 2]); // Pre-check 3 famous monuments: Nguyễn Sinh Sắc, Gò Tháp, Xẻo Quýt
  const [activeTour, setActiveTour] = useState(null);
  const [isTspSolving, setIsTspSolving] = useState(false);

  // Mobile Bottom Sheet toggle
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // Requested route target to trigger immediate routing on WebGisMap
  const [requestedRouteTarget, setRequestedRouteTarget] = useState(null);

  const handleTriggerRoute = (m) => {
    setSelectedMonument(m);
    setRequestedRouteTarget({ monument: m, timestamp: Date.now() });
    setMobileDrawerOpen(false); // Collapse bottom sheet so mobile user sees map route immediately
  };

  // Fetch monuments
  useEffect(() => {
    let mounted = true;
    monumentApi.getAll().then((data) => {
      if (mounted) {
        setMonuments(data);
        // Do not auto select a single monument on load - show full Dong Thap overview
        setSelectedMonument(null);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Request real GPS location from device
  const handleLocateUser = () => {
    setSelectedGpsPreset('device');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setGpsActive(true);
        },
        () => {
          setUserLocation([10.4534, 105.6341]);
          setGpsActive(true);
        }
      );
    } else {
      setUserLocation([10.4534, 105.6341]);
      setGpsActive(true);
    }
  };

  // Switch GPS Preset
  const handlePresetChange = (presetId) => {
    setSelectedGpsPreset(presetId);
    if (presetId === 'device') {
      handleLocateUser();
    } else {
      const found = GPS_PRESETS.find((p) => p.id === presetId);
      if (found?.coords) {
        setUserLocation(found.coords);
        setGpsActive(true);
      }
    }
  };

  // Callback when user drags GPS pin on the Leaflet map
  const handleUserLocationDrag = (newCoords) => {
    setUserLocation(newCoords);
    setSelectedGpsPreset('custom');
    setGpsActive(true);
  };

  // Toggle selection for TSP Multi-Stop Tour
  const toggleTourMonument = (id) => {
    setSelectedTourIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 6) {
          alert('Bạn có thể chọn tối đa 6 di tích trong một hành trình tour để tối ưu tốt nhất.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Execute Nearest Neighbor + 2-Opt TSP Algorithm
  const handleSolveTour = async () => {
    if (selectedTourIds.length < 2) {
      alert('Vui lòng chọn ít nhất 2 di tích để lập hành trình tour tối ưu.');
      return;
    }

    setIsTspSolving(true);
    try {
      const selectedMonumentsList = monuments.filter((m) =>
        selectedTourIds.includes(m.id)
      );

      const result = await solveTourTSP2Opt(userLocation, selectedMonumentsList);
      setActiveTour(result);
    } catch (err) {
      console.error('Lỗi tối ưu TSP Tour:', err);
    } finally {
      setIsTspSolving(false);
    }
  };

  const handleClearTour = () => {
    setActiveTour(null);
  };

  // Geofencing verification
  const geofence = validateDongThapBounds(userLocation[0], userLocation[1]);

  // Filtered & Sorted Monuments
  const filteredMonuments = useMemo(() => {
    return monuments
      .filter((m) => {
        // 1. Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = m.name?.toLowerCase().includes(q);
          const matchOther = m.otherName?.toLowerCase().includes(q);
          const matchDistrict = m.district?.toLowerCase().includes(q);
          const matchHistory = m.history?.toLowerCase().includes(q);
          if (!matchName && !matchOther && !matchDistrict && !matchHistory) {
            return false;
          }
        }

        // 2. Ranking filter
        if (selectedRanking !== 'Tất cả cấp hạng' && m.ranking !== selectedRanking) {
          return false;
        }

        // 3. District filter
        if (
          selectedDistrict !== 'Tất cả Huyện/TP' &&
          !m.district?.toLowerCase().includes(selectedDistrict.toLowerCase().replace('tp. ', '').replace('huyện ', ''))
        ) {
          return false;
        }

        // 4. Category filter
        if (selectedCategory !== 'Tất cả loại hình' && m.category !== selectedCategory) {
          return false;
        }

        // 5. Radius filter
        if (activeRadius && userLocation) {
          const dist = calculateDistanceKm(userLocation, m.coordinates);
          if (dist > activeRadius) return false;
        }

        return true;
      })
      .map((m) => ({
        ...m,
        distance: userLocation ? calculateDistanceKm(userLocation, m.coordinates) : null,
      }))
      .sort((a, b) => {
        if (activeRadius && a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        }
        if (a.ranking === 'Quốc gia đặc biệt' && b.ranking !== 'Quốc gia đặc biệt') return -1;
        if (b.ranking === 'Quốc gia đặc biệt' && a.ranking !== 'Quốc gia đặc biệt') return 1;
        return 0;
      });
  }, [
    monuments,
    searchQuery,
    selectedRanking,
    selectedDistrict,
    selectedCategory,
    activeRadius,
    userLocation,
  ]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex overflow-hidden bg-canvas-bg">
      {/* ============================================================== */}
      {/* CỘT TRÁI: SIDEBAR ĐA NĂNG (TRA CỨU & LẬP TOUR TSP) (380px)      */}
      {/* ============================================================== */}
      <aside className="hidden md:flex w-[390px] shrink-0 h-full bg-white flex-col z-20 shadow-[4px_0_24px_rgba(19,27,46,0.06)] relative border-r border-slate-200/80">
        {/* Top Tab Mode Switcher: Tra cứu vs Lập Tour TSP */}
        <div className="p-3 pb-2 bg-slate-50 border-b border-slate-200/80">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80 text-xs font-bold">
            <button
              onClick={() => setSidebarMode('explore')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                sidebarMode === 'explore'
                  ? 'bg-white text-lotus-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tra cứu di tích</span>
            </button>

            <button
              onClick={() => setSidebarMode('tour')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                sidebarMode === 'tour'
                  ? 'bg-lotus-600 text-white shadow-md shadow-lotus-600/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Route className="w-4 h-4" />
              <span>Lập Tour TSP 2-Opt</span>
            </button>
          </div>
        </div>

        {/* SMART GPS 3-MODE HEADER BAR */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex w-2.5 h-2.5 rounded-full ${geofence.isValid ? 'bg-tram-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-[11px] text-slate-700 uppercase tracking-wider font-extrabold">
                Điểm xuất phát GPS
              </span>
            </div>

            {/* Coordinates Badge */}
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full" title="Kéo thả ghim trên bản đồ để đổi vị trí">
              {userLocation[0].toFixed(3)}°N, {userLocation[1].toFixed(3)}°E
            </span>
          </div>

          {/* Quick Preset Selector */}
          <select
            value={selectedGpsPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full h-8 px-2.5 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold outline-none focus:ring-1 focus:ring-lotus-500"
          >
            {GPS_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
            {selectedGpsPreset === 'custom' && (
              <option value="custom">Ghim kéo thả tự do trên bản đồ</option>
            )}
          </select>

          {/* Geofence warning if user dragged pin out of Dong Thap */}
          {!geofence.isValid && (
            <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-[10px] text-rose-700 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
              <span className="truncate">Ghim nằm ngoài tỉnh Đồng Tháp. Vui lòng kéo lại vào địa phận tỉnh!</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* CHẾ ĐỘ 1: TRA CỨU & DANH SÁCH DI TÍCH (EXPLORE MODE)           */}
        {/* ============================================================== */}
        {sidebarMode === 'explore' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search Capsule & Filters */}
            <div className="p-4 pb-3 bg-white border-b border-slate-100 space-y-2.5">
              {/* Floating Search Capsule */}
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên di tích, anh hùng, địa danh..."
                  className="w-full h-10 pl-10 pr-9 rounded-full bg-slate-100 text-slate-800 text-[13px] placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-lotus-500 shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-lotus-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Chips: Ranking */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <button
                  onClick={() => setSelectedRanking('Tất cả cấp hạng')}
                  className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-semibold transition-all ${
                    selectedRanking === 'Tất cả cấp hạng'
                      ? 'bg-lotus-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({monuments.length})
                </button>

                <button
                  onClick={() => setSelectedRanking('Quốc gia đặc biệt')}
                  className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
                    selectedRanking === 'Quốc gia đặc biệt'
                      ? 'bg-lotus-600 text-white shadow-xs'
                      : 'bg-lotus-50 text-lotus-700 hover:bg-lotus-100'
                  }`}
                >
                  <span>★</span> Đặc biệt (2)
                </button>

                <button
                  onClick={() => setSelectedRanking('Quốc gia')}
                  className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
                    selectedRanking === 'Quốc gia'
                      ? 'bg-tram-700 text-white shadow-xs'
                      : 'bg-tram-50 text-tram-700 hover:bg-tram-100'
                  }`}
                >
                  <span>🏛️</span> Quốc gia (14)
                </button>

                <button
                  onClick={() => setSelectedRanking('Cấp tỉnh')}
                  className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
                    selectedRanking === 'Cấp tỉnh'
                      ? 'bg-sky-700 text-white shadow-xs'
                      : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  <span>📍</span> Cấp tỉnh (4)
                </button>
              </div>

              {/* District & Radius Dropdowns */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="h-8 px-2 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-medium outline-none border border-transparent focus:border-lotus-300 focus:bg-white"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  value={activeRadius || ''}
                  onChange={(e) => setActiveRadius(e.target.value ? Number(e.target.value) : null)}
                  className="h-8 px-2 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-medium outline-none border border-transparent focus:border-lotus-300 focus:bg-white"
                >
                  <option value="">Bán kính (Tất cả)</option>
                  <option value="5">Lân cận 5 km</option>
                  <option value="10">Lân cận 10 km</option>
                  <option value="20">Lân cận 20 km</option>
                </select>
              </div>
            </div>

            {/* Result count */}
            <div className="px-4 py-2 bg-slate-50 flex items-center justify-between border-b border-slate-100 text-[11px]">
              <span className="text-slate-600">
                Tìm thấy <strong className="text-lotus-600 font-bold">{filteredMonuments.length}</strong> di tích
              </span>
              <button
                onClick={handleLocateUser}
                className="inline-flex items-center gap-1 text-tram-700 hover:text-tram-800 font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GPS thiết bị</span>
              </button>
            </div>

            {/* Danh sách cuộn */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredMonuments.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Compass className="w-8 h-8 mx-auto opacity-50" />
                  <p className="text-xs">Không tìm thấy di tích phù hợp bộ lọc.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRanking('Tất cả cấp hạng');
                      setSelectedDistrict('Tất cả Huyện/TP');
                      setActiveRadius(null);
                    }}
                    className="text-[11px] text-lotus-600 font-semibold hover:underline"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                filteredMonuments.map((m) => {
                  const isSelected = selectedMonument?.id === m.id;
                  const isSpecial = m.ranking === 'Quốc gia đặc biệt';

                  return (
                    <article
                      key={m.id}
                      onClick={() => setSelectedMonument(m)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer flex flex-col gap-2.5 group relative overflow-hidden border ${
                        isSelected
                          ? 'bg-lotus-50/90 border-lotus-300 shadow-md shadow-lotus-600/10 ring-1 ring-lotus-300'
                          : 'bg-white hover:bg-slate-50/80 border-slate-100 hover:border-slate-200 shadow-xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-lotus-600 rounded-l" />
                      )}

                      {/* Card Header: Thumbnail + Title + Metadata */}
                      <div className="flex gap-3 items-start">
                        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-xs bg-slate-100">
                          <img
                            src={m.thumbnail}
                            alt={m.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          {isSpecial && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-lotus-600 text-white text-[8px] font-extrabold tracking-tight">
                              ★ TOP
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold leading-tight truncate ${
                                isSpecial
                                  ? 'bg-lotus-100 text-lotus-700'
                                  : m.ranking === 'Quốc gia'
                                  ? 'bg-tram-100 text-tram-700'
                                  : 'bg-sky-100 text-sky-700'
                              }`}
                            >
                              {m.ranking}
                            </span>
                            {m.distance !== null && (
                              <span className="text-slate-400 text-[10px] font-mono shrink-0">
                                {m.distance} km
                              </span>
                            )}
                          </div>

                          <h3
                            className={`text-[13px] font-bold leading-snug ${
                              isSelected
                                ? 'text-lotus-700'
                                : 'text-slate-800 group-hover:text-lotus-600 transition-colors'
                            }`}
                          >
                            {m.name}
                          </h3>

                          <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{m.district || m.address}</span>
                          </p>
                        </div>
                      </div>

                      {/* INLINE EXPANDABLE PREVIEW (When isSelected === true) */}
                      {isSelected && (
                        <div className="pt-2 border-t border-lotus-200/80 space-y-2 animate-in fade-in slide-in-from-top-1 text-xs">
                          {/* Tóm tắt lịch sử */}
                          <div className="bg-white/95 p-2.5 rounded-xl border border-lotus-100 text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                            {m.history}
                          </div>

                          {/* 2 Quick Info Chips */}
                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                            <div className="px-2 py-1 rounded-lg bg-white/90 border border-slate-200/80 flex items-center gap-1 text-slate-600 truncate">
                              <Clock className="w-3 h-3 text-tram-600 shrink-0" />
                              <span className="truncate">{m.openingHours}</span>
                            </div>
                            <div className="px-2 py-1 rounded-lg bg-white/90 border border-slate-200/80 flex items-center gap-1 text-slate-600 truncate">
                              <Ticket className="w-3 h-3 text-amber-600 shrink-0" />
                              <span className="truncate">
                                {m.ticketPrice > 0 ? formatCurrency(m.ticketPrice) : 'Miễn phí'}
                              </span>
                            </div>
                          </div>

                          {/* Prominent Full Action Buttons when expanded */}
                          <div className="flex flex-col gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/di-tich/${m.id}`);
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-lotus-600 hover:bg-lotus-700 active:bg-lotus-800 text-white font-extrabold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-lotus-600/20 transition-all"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Mở Hồ sơ Di tích & Nghe Audio Tour</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTriggerRoute(m);
                                }}
                                className="flex-1 py-1.5 px-2.5 rounded-xl bg-tram-600 hover:bg-tram-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm transition-all"
                                title="Vẽ tuyến đường di chuyển thực tế"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                                <span>Vẽ Lộ trình Chỉ đường</span>
                              </button>

                              <a
                                href={getGoogleMapsDirUrl(userLocation, m.coordinates)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="py-1.5 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-[11px] flex items-center gap-1 transition-all"
                                title="Mở trên ứng dụng Google Maps"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Google Maps</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ALWAYS VISIBLE QUICK ACTION BUTTONS CLUSTER (When not expanded) */}
                      {!isSelected && (
                        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/di-tich/${m.id}`);
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded-xl bg-lotus-600 hover:bg-lotus-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Xem Chi tiết & Audio</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTriggerRoute(m);
                            }}
                            className="py-1.5 px-2.5 rounded-xl bg-tram-50 hover:bg-tram-600 text-tram-700 hover:text-white border border-tram-200 font-bold text-[11px] flex items-center gap-1 transition-all"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>Chỉ đường</span>
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CHẾ ĐỘ 2: LẬP TOUR NHIỀU ĐIỂM (MULTI-STOP TSP TOUR PLANNER)    */}
        {/* ============================================================== */}
        {sidebarMode === 'tour' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tour Planner Guidance & Action Card */}
            <div className="p-4 bg-gradient-to-br from-lotus-50/70 via-white to-tram-50/50 border-b border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarCheck className="w-4 h-4 text-lotus-600" />
                  <span>Chọn 2 - 6 Di tích Tham quan</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-lotus-600 text-white font-extrabold text-[10px]">
                  Đã chọn: {selectedTourIds.length}/6
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                Thuật toán <strong>Nearest Neighbor + 2-Opt TSP</strong> sẽ sắp xếp thứ tự các điểm dừng tối ưu để tiết kiệm tối đa thời gian và quãng đường di chuyển.
              </p>

              {/* Action Solve Button */}
              <button
                type="button"
                onClick={handleSolveTour}
                disabled={selectedTourIds.length < 2 || isTspSolving}
                className="w-full py-2.5 px-4 rounded-xl bg-lotus-600 hover:bg-lotus-700 active:bg-lotus-800 text-white font-extrabold text-xs shadow-md shadow-lotus-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTspSolving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang tối ưu hóa hành trình 2-Opt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tối Ưu Hành Trình (2-Opt TSP)</span>
                  </>
                )}
              </button>

              {/* Active Tour Results Summary */}
              {activeTour && (
                <div className="p-3 rounded-xl bg-white border border-lotus-300 shadow-sm space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      Kết quả Lộ trình Tối ưu:
                    </span>
                    <button
                      onClick={handleClearTour}
                      className="text-[10px] text-rose-600 font-bold hover:underline"
                    >
                      Xóa tour
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-slate-50 border">
                      <span className="text-slate-400 block text-[9px]">Tổng quãng đường</span>
                      <strong className="text-lotus-700 text-xs">{activeTour.totalDistanceKm} km</strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-50 border">
                      <span className="text-slate-400 block text-[9px]">Thời gian di chuyển</span>
                      <strong className="text-slate-800 text-xs">~{activeTour.totalDurationMin} phút</strong>
                    </div>
                  </div>
                  {activeTour.savingPercent > 0 && (
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tiết kiệm {activeTour.savingPercent}% quãng đường so với thứ tự ngẫu nhiên!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Checklist of Monuments */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {monuments.map((m) => {
                const isChecked = selectedTourIds.includes(m.id);
                const tourIndex = activeTour?.orderedMonuments?.findIndex((item) => item.id === m.id);

                return (
                  <div
                    key={`tour-check-${m.id}`}
                    onClick={() => toggleTourMonument(m.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-lotus-50/80 border-lotus-300 shadow-xs'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="text-lotus-600 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 fill-lotus-600 text-white" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <img
                        src={m.thumbnail}
                        alt={m.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{m.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate">{m.district}</p>
                      </div>
                    </div>

                    {tourIndex !== undefined && tourIndex !== -1 && (
                      <span className="w-6 h-6 rounded-full bg-lotus-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {tourIndex + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer: Prominent bottom CTA bar when a monument is selected */}
        {selectedMonument ? (
          <div className="p-3 bg-gradient-to-r from-lotus-50 to-white border-t border-lotus-200/90 shadow-md space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="min-w-0 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lotus-600 shrink-0 animate-pulse" />
                <span className="font-extrabold text-slate-900 truncate max-w-[210px]">
                  {selectedMonument.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                {selectedMonument.district}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate(`/di-tich/${selectedMonument.id}`)}
                className="flex-1 py-2 px-3 rounded-xl bg-lotus-600 hover:bg-lotus-700 active:bg-lotus-800 text-white font-extrabold text-xs shadow-md shadow-lotus-600/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem Chi tiết & Audio Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleTriggerRoute(selectedMonument)}
                className="py-2 px-3 rounded-xl bg-tram-600 hover:bg-tram-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                title="Vẽ lộ trình đường đi tới di tích này"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ đường</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tram-500 inline-block" />
              <span>20/20 Di tích sẵn sàng</span>
            </span>
            <span className="text-slate-400 italic">Chọn di tích để xem nhanh</span>
          </div>
        )}
      </aside>

      {/* ============================================================== */}
      {/* CỘT PHẢI: BẢN ĐỒ SỐ TƯƠNG TÁC WEB GIS (Desktop & Mobile)        */}
      {/* ============================================================== */}
      <main className="flex-1 h-full relative overflow-hidden">
        <WebGisMap
          monuments={filteredMonuments}
          selectedMonument={selectedMonument}
          onSelectMonument={(m) => setSelectedMonument(m)}
          userLocation={userLocation}
          onUserLocationChange={handleUserLocationDrag}
          activeRadius={activeRadius}
          onLocateUser={handleLocateUser}
          activeTour={activeTour}
          onClearTour={handleClearTour}
          routeTargetMonument={requestedRouteTarget}
        />

        {/* ============================================================ */}
        {/* MOBILE BOTTOM SHEET                                         */}
        {/* ============================================================ */}
        <div
          className={`md:hidden absolute left-0 right-0 bottom-0 z-30 bg-white rounded-t-3xl shadow-2xl border-t border-slate-200/80 transition-transform duration-300 ${
            mobileDrawerOpen ? 'translate-y-0 h-[68vh]' : 'translate-y-[calc(100%-80px)] h-[68vh]'
          } flex flex-col`}
        >
          {/* Pull Handle Header */}
          <div
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-3 pb-2 flex flex-col items-center cursor-pointer select-none bg-white rounded-t-3xl border-b border-slate-100"
          >
            <div className="w-10 h-1.5 bg-slate-300 rounded-full mb-2" />
            <div className="w-full flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-800">
                {selectedMonument ? selectedMonument.name : 'Danh sách 20 di tích'}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-lotus-600">
                <span>{mobileDrawerOpen ? 'Thu gọn' : `Xem thêm (${filteredMonuments.length})`}</span>
                {mobileDrawerOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {/* Quick search input */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh di tích..."
                className="w-full h-9 pl-9 pr-3 rounded-full bg-slate-100 text-xs outline-none focus:ring-1 focus:ring-lotus-500"
              />
            </div>

            {/* List */}
            {/* List with prominent action buttons */}
            {filteredMonuments.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMonument(m);
                }}
                className={`p-2.5 rounded-2xl flex flex-col gap-2 border transition-all ${
                  selectedMonument?.id === m.id
                    ? 'bg-lotus-50/90 border-lotus-300 shadow-sm'
                    : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={m.thumbnail}
                    alt={m.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-lotus-100 text-lotus-700 truncate">
                        {m.ranking}
                      </span>
                      {m.distance !== null && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {m.distance} km
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 truncate">{m.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{m.district}</p>
                  </div>
                </div>

                {/* Action Buttons in Mobile Sheet */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/di-tich/${m.id}`);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-lotus-600 hover:bg-lotus-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Xem Chi tiết & Audio</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTriggerRoute(m);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-tram-600 hover:bg-tram-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Chỉ đường</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
