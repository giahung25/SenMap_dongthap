import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WebGisMap from '../components/map/WebGisMap';
import { monumentApi } from '../services/api';
import { calculateDistanceKm } from '../utils/geoUtils';
import { DISTRICTS, RANKINGS, CATEGORIES } from '../data/monumentsData';
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
} from 'lucide-react';

export default function MapView() {
  const navigate = useNavigate();
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('Tất cả cấp hạng');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả Huyện/TP');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả loại hình');
  const [selectedMonument, setSelectedMonument] = useState(null);

  // GPS User location & Radius search
  const [userLocation, setUserLocation] = useState([10.4494, 105.6295]); // Default: TP Cao Lãnh
  const [activeRadius, setActiveRadius] = useState(null); // null | 5 | 10 | 20 (km)
  const [gpsActive, setGpsActive] = useState(false);

  // Mobile Bottom Sheet toggle
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

  // Request real GPS location
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setGpsActive(true);
        },
        () => {
          // If user denies or error, use default Cao Lãnh
          setUserLocation([10.4494, 105.6295]);
          setGpsActive(true);
        }
      );
    } else {
      setUserLocation([10.4494, 105.6295]);
      setGpsActive(true);
    }
  };

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
        // If radius active, sort by distance
        if (activeRadius && a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        }
        // Otherwise special first
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
      {/* CỘT TRÁI: SIDEBAR TRA CỨU & DANH SÁCH (Desktop 380px)           */}
      {/* ============================================================== */}
      <aside className="hidden md:flex w-[380px] shrink-0 h-full bg-white flex-col z-20 shadow-[4px_0_24px_rgba(19,27,46,0.06)] relative border-r border-slate-200/80">
        {/* Header tra cứu & Input Capsule */}
        <div className="p-4 pb-3 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-tram-600 animate-pulse" />
              <span className="text-[11px] text-tram-700 uppercase tracking-wider font-bold">
                Web GIS Di Tích Trực Tuyến
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded-full bg-slate-100">
              {userLocation ? `${userLocation[0].toFixed(3)}° N, ${userLocation[1].toFixed(3)}° E` : 'Đồng Tháp'}
            </span>
          </div>

          {/* Floating Search Capsule */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên di tích, anh hùng, địa danh..."
              className="w-full h-11 pl-10 pr-9 rounded-full bg-slate-100 text-slate-800 text-[13px] placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-lotus-500 shadow-inner"
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
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 pb-1">
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

          {/* District & Radius Dropdown Row */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="h-8 px-2.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-medium outline-none border border-transparent focus:border-lotus-300 focus:bg-white"
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
              className="h-8 px-2.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-medium outline-none border border-transparent focus:border-lotus-300 focus:bg-white"
            >
              <option value="">Quét bán kính (Tất cả)</option>
              <option value="5">Lân cận 5 km</option>
              <option value="10">Lân cận 10 km</option>
              <option value="20">Lân cận 20 km</option>
            </select>
          </div>
        </div>

        {/* Count & Near Me Toggle Bar */}
        <div className="px-4 py-2 bg-slate-50 flex items-center justify-between border-b border-slate-100 text-[11px]">
          <span className="text-slate-600">
            Tìm thấy <strong className="text-lotus-600 font-bold">{filteredMonuments.length}</strong> di tích
          </span>
          <button
            onClick={handleLocateUser}
            className="inline-flex items-center gap-1 text-tram-700 hover:text-tram-800 font-bold transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{gpsActive ? 'GPS bật' : 'Bật định vị GPS'}</span>
          </button>
        </div>

        {/* Danh sách cuộn độc lập */}
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
                  setSelectedCategory('Tất cả loại hình');
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
                  className={`p-2.5 rounded-2xl transition-all cursor-pointer flex gap-3 group relative overflow-hidden border ${
                    isSelected
                      ? 'bg-lotus-50/80 border-lotus-300 shadow-md shadow-lotus-600/10'
                      : 'bg-white hover:bg-slate-50/80 border-slate-100 hover:border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-lotus-600 rounded-l" />
                  )}

                  {/* Thumbnail */}
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

                  {/* Text Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
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
                        className={`text-[13px] font-bold truncate leading-snug ${
                          isSelected
                            ? 'text-lotus-700'
                            : 'text-slate-800 group-hover:text-lotus-600 transition-colors'
                        }`}
                      >
                        {m.name}
                      </h3>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{m.district || m.address}</span>
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tram-500 inline-block" />
            <span>20/20 Di tích sẵn sàng</span>
          </span>
          {selectedMonument && (
            <button
              onClick={() => navigate(`/di-tich/${selectedMonument.id}`)}
              className="text-lotus-600 hover:text-lotus-700 font-bold flex items-center gap-0.5"
            >
              <span>Xem chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
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
          activeRadius={activeRadius}
          onLocateUser={handleLocateUser}
        />

        {/* ============================================================ */}
        {/* MOBILE BOTTOM SHEET (chuan Stitch 577991b91e65462692f9d41fc0) */}
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
            {filteredMonuments.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMonument(m);
                  setMobileDrawerOpen(false);
                }}
                className={`p-2 rounded-xl flex items-center gap-2.5 border ${
                  selectedMonument?.id === m.id
                    ? 'bg-lotus-50 border-lotus-300'
                    : 'bg-white border-slate-100'
                }`}
              >
                <img
                  src={m.thumbnail}
                  alt={m.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{m.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{m.address}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/di-tich/${m.id}`);
                  }}
                  className="px-2 py-1 rounded-lg bg-lotus-600 text-white text-[10px] font-bold"
                >
                  Xem
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
