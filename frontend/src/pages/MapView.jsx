import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WebGisMap from '../components/map/WebGisMap';
import MapSidebar from '../components/map/MapSidebar';
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
  getLocalizedMonument,
  DISTRICT_TRANSLATIONS,
  RANKING_TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
} from '../data/monumentsTranslationsEn';
import { getAllTrails, getTrailById } from '../data/culturalHeritageData';
import { useLanguage } from '../context/LanguageContext';
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
  Landmark,
  Flag,
  Palette,
  Milestone,
} from 'lucide-react';

/**
 * SenMap Dong Thap - WebGIS Interactive Heritage Map View
 * Supports standalone mode (full screen /ban-do) and embedded mode (Homepage Section Tang 4)
 * Supports URL Query Params (?trail=<id>, ?monument=<id>, ?q=<keyword>)
 * Features Thematic Cultural Trails Quick Selector Bar (Oc Eo, Hanh trinh Do, Pho co Sa Dec, Mua nuoc noi)
 */
export default function MapView({
  isEmbedded = false,
  compactPreview = false,
  externalTrailId = null,
  onOpenFullMap = null,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang, t } = useLanguage();

  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sidebar Mode: 'explore' (Tra cứu di tích) | 'tour' (Lập Tour TSP 2-Opt)
  const [sidebarMode, setSidebarMode] = useState('explore');

  // Filters & Search (Canonical filter keys)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMonument, setSelectedMonument] = useState(null);

  // GPS User location & Presets (3-Mode Smart GPS)
  const [userLocation, setUserLocation] = useState([10.4534, 105.6341]); // Default: TP. Cao Lãnh
  const [selectedGpsPreset, setSelectedGpsPreset] = useState('caolanh');
  const [activeRadius, setActiveRadius] = useState(null); // null | 5 | 10 | 20 (km)
  const [gpsActive, setGpsActive] = useState(false);

  // Multi-Stop Tour Planner (TSP 2-Opt)
  const [selectedTourIds, setSelectedTourIds] = useState([1, 6, 2]); // Default 3 famous monuments
  const [activeTour, setActiveTour] = useState(null);
  const [isTspSolving, setIsTspSolving] = useState(false);

  // Cultural Thematic Trails state
  const [activeCulturalTrail, setActiveCulturalTrail] = useState(null);
  // In embedded mode, start collapsed/compact so map is spacious; in full screen, start expanded
  const [trailSummaryExpanded, setTrailSummaryExpanded] = useState(!isEmbedded);

  // Mobile Bottom Sheet toggle (standalone mode only)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // Requested route target to trigger immediate routing on WebGisMap
  const [requestedRouteTarget, setRequestedRouteTarget] = useState(null);

  // Refs to prevent duplicate runs and ensure smooth param sync
  const prevTrailIdRef = useRef(null);
  const prevMonumentParamRef = useRef(null);
  const prevQueryParamRef = useRef(null);

  const handleTriggerRoute = (m) => {
    setSelectedMonument(m);
    setRequestedRouteTarget({ monument: m, timestamp: Date.now() });
    setMobileDrawerOpen(false); // Collapse bottom sheet so mobile user sees map route immediately
  };

  // Fetch monuments & auto-request real device GPS
  useEffect(() => {
    let mounted = true;
    monumentApi.getAll().then((data) => {
      if (mounted) {
        setMonuments(data);
        setSelectedMonument(null);
        setLoading(false);
      }
    });

    // Auto-detect real device GPS if permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (mounted) {
            const coords = [
              Number(pos.coords.latitude.toFixed(5)),
              Number(pos.coords.longitude.toFixed(5)),
            ];
            setUserLocation(coords);
            setSelectedGpsPreset('device');
            setGpsActive(true);
          }
        },
        (err) => {
          console.info('GPS thiết bị chưa cấp quyền, sử dụng mốc TP. Cao Lãnh:', err.message);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Localize all monuments dynamically based on current language
  const localizedMonuments = useMemo(() => {
    return monuments.map((m) => getLocalizedMonument(m, lang));
  }, [monuments, lang]);

  // Localized currently selected monument
  const activeSelected = useMemo(() => {
    return selectedMonument ? getLocalizedMonument(selectedMonument, lang) : null;
  }, [selectedMonument, lang]);

  // All 4 Curated Cultural Trails with localized metadata
  const allTrails = useMemo(() => getAllTrails(lang), [lang]);

  // Synchronize with URL Query Params (?trail=<id>, ?monument=<id>, ?q=<keyword>) & externalTrailId
  useEffect(() => {
    if (!monuments || monuments.length === 0) return;

    // 1. Check ?monument=<id>
    const monumentParam = searchParams.get('monument');
    if (monumentParam && monumentParam !== prevMonumentParamRef.current) {
      prevMonumentParamRef.current = monumentParam;
      const targetId = Number(monumentParam);
      const found = monuments.find((m) => m.id === targetId);
      if (found) {
        setSelectedMonument(found);
      }
    }

    // 2. Check ?q=<keyword>
    const queryParam = searchParams.get('q');
    if (queryParam !== null && queryParam !== prevQueryParamRef.current) {
      prevQueryParamRef.current = queryParam;
      setSearchQuery(queryParam);
    }

    // 3. Check ?trail=<trailId> or externalTrailId prop
    const trailId = externalTrailId || searchParams.get('trail');
    if (trailId && (trailId !== prevTrailIdRef.current || !activeCulturalTrail)) {
      prevTrailIdRef.current = trailId;
      const trail = getTrailById(trailId, lang);
      if (trail) {
        setActiveCulturalTrail(trail);
        // In embedded mode, start collapsed/compact so route is prominently visible
        setTrailSummaryExpanded(!isEmbedded);
        setSelectedTourIds(trail.monument_ids);

        const trailMonuments = localizedMonuments.filter((m) =>
          trail.monument_ids.includes(m.id)
        );
        if (trailMonuments.length >= 2) {
          setIsTspSolving(true);
          solveTourTSP2Opt(userLocation, trailMonuments, lang)
            .then((res) => {
              setActiveTour(res);
            })
            .catch((err) => console.error('Lỗi tính lộ trình tuyến văn hóa:', err))
            .finally(() => setIsTspSolving(false));
        }
      }
    } else if (!trailId && activeCulturalTrail && !externalTrailId) {
      prevTrailIdRef.current = null;
      setActiveCulturalTrail(null);
      setActiveTour(null);
    }
  }, [monuments, localizedMonuments, searchParams, externalTrailId, lang, isEmbedded]);

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

  // Select a Cultural Trail from Quick Selector Bar
  const handleSelectCulturalTrail = async (trail) => {
    if (!trail) return;
    prevTrailIdRef.current = trail.id;
    setActiveCulturalTrail(trail);
    setTrailSummaryExpanded(true);
    setSelectedTourIds(trail.monument_ids);
    setSelectedMonument(null); // Clear single preview so full trail route is prominent

    // Update URL query param if not embedded
    if (!isEmbedded) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('trail', trail.id);
          return next;
        },
        { replace: true }
      );
    }

    const trailMonuments = localizedMonuments.filter((m) =>
      trail.monument_ids.includes(m.id)
    );
    if (trailMonuments.length >= 2) {
      setIsTspSolving(true);
      try {
        const result = await solveTourTSP2Opt(userLocation, trailMonuments, lang);
        setActiveTour(result);
      } catch (err) {
        console.error('Lỗi tính lộ trình tuyến chủ đề:', err);
      } finally {
        setIsTspSolving(false);
      }
    }
  };

  // Clear active Cultural Trail and restore all 20 monuments view
  const handleClearCulturalTrail = () => {
    prevTrailIdRef.current = null;
    setActiveCulturalTrail(null);
    setActiveTour(null);
    setSelectedTourIds([1, 6, 2]);
    setSelectedMonument(null);

    if (!isEmbedded) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('trail');
          return next;
        },
        { replace: true }
      );
    }
  };

  // Toggle selection for TSP Multi-Stop Tour
  const toggleTourMonument = (id) => {
    setSelectedTourIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 6) {
          alert(
            lang === 'en'
              ? 'You can select up to 6 heritage sites per itinerary for optimal travel time.'
              : 'Bạn có thể chọn tối đa 6 di tích trong một hành trình tour để tối ưu tốt nhất.'
          );
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Execute Nearest Neighbor + 2-Opt TSP Algorithm
  const handleSolveTour = async () => {
    if (selectedTourIds.length < 2) {
      alert(
        lang === 'en'
          ? 'Please select at least 2 heritage sites to calculate the optimal tour route.'
          : 'Vui lòng chọn ít nhất 2 di tích để lập hành trình tour tối ưu.'
      );
      return;
    }

    setIsTspSolving(true);
    try {
      const selectedMonumentsList = localizedMonuments.filter((m) =>
        selectedTourIds.includes(m.id)
      );

      const result = await solveTourTSP2Opt(userLocation, selectedMonumentsList, lang);
      setActiveTour(result);
    } catch (err) {
      console.error('Lỗi tối ưu TSP Tour:', err);
    } finally {
      setIsTspSolving(false);
    }
  };

  const handleClearTour = () => {
    setActiveTour(null);
    setActiveCulturalTrail(null);
  };

  // Geofencing verification
  const geofence = validateDongThapBounds(userLocation[0], userLocation[1]);

  // Filtered & Sorted Monuments
  const filteredMonuments = useMemo(() => {
    return localizedMonuments
      .filter((m) => {
        // 1. Text search (bilingual)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName =
            m.displayName?.toLowerCase().includes(q) || m.name?.toLowerCase().includes(q);
          const matchOther =
            m.displayOtherName?.toLowerCase().includes(q) || m.otherName?.toLowerCase().includes(q);
          const matchDistrict =
            m.displayDistrict?.toLowerCase().includes(q) || m.district?.toLowerCase().includes(q);
          const matchHistory =
            m.displayHistory?.toLowerCase().includes(q) || m.history?.toLowerCase().includes(q);
          if (!matchName && !matchOther && !matchDistrict && !matchHistory) {
            return false;
          }
        }

        // 2. Ranking filter
        if (selectedRanking !== 'ALL') {
          if (m.ranking !== selectedRanking && m.cap_xep_hang !== selectedRanking) {
            return false;
          }
        }

        // 3. District filter
        if (selectedDistrict !== 'ALL') {
          const rawDist = (m.district || '').toLowerCase();
          const targetDist = selectedDistrict.toLowerCase();
          if (
            !rawDist.includes(targetDist.replace('tp ', '').replace('huyện ', '')) &&
            !(m.displayDistrict || '').toLowerCase().includes(targetDist)
          ) {
            return false;
          }
        }

        // 4. Category filter
        if (selectedCategory !== 'ALL') {
          if (m.category !== selectedCategory && m.danh_muc !== selectedCategory) {
            return false;
          }
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
        if (
          (a.ranking === 'Quốc gia đặc biệt' || a.cap_xep_hang === 'Quốc gia đặc biệt') &&
          b.ranking !== 'Quốc gia đặc biệt' &&
          b.cap_xep_hang !== 'Quốc gia đặc biệt'
        )
          return -1;
        if (
          (b.ranking === 'Quốc gia đặc biệt' || b.cap_xep_hang === 'Quốc gia đặc biệt') &&
          a.ranking !== 'Quốc gia đặc biệt' &&
          a.cap_xep_hang !== 'Quốc gia đặc biệt'
        )
          return 1;
        return 0;
      });
  }, [
    localizedMonuments,
    searchQuery,
    selectedRanking,
    selectedDistrict,
    selectedCategory,
    activeRadius,
    userLocation,
  ]);

  // Trail icon helper
  const renderTrailIcon = (trailId) => {
    switch (trailId) {
      case 'trail-oceo':
        return <Landmark className="w-3.5 h-3.5 shrink-0" />;
      case 'trail-red':
        return <Flag className="w-3.5 h-3.5 shrink-0" />;
      case 'trail-sadec':
        return <Palette className="w-3.5 h-3.5 shrink-0" />;
      case 'trail-eco':
        return <Compass className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <Route className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  // Concise short label helper for trail buttons
  const getTrailShortName = (trail) => {
    const isEn = lang === 'en';
    switch (trail.id) {
      case 'trail-oceo':
        return isEn ? 'Óc Eo Civilization' : 'Dấu ấn Óc Eo';
      case 'trail-red':
        return isEn ? 'The Red Trail' : 'Hành trình Đỏ';
      case 'trail-sadec':
        return isEn ? 'Sa Đéc Old Town' : 'Phố cổ Sa Đéc';
      case 'trail-eco':
        return isEn ? 'Floating Waters & Wetlands' : 'Mùa nước nổi & Rừng tràm';
      default:
        return trail.displayName;
    }
  };

  return (
    <div
      className={`relative w-full ${
        compactPreview
          ? 'h-full w-full'
          : isEmbedded
          ? 'h-[680px] rounded-3xl shadow-2xl border border-[#E6DEC8]'
          : 'h-[calc(100vh-4rem)]'
      } flex flex-col overflow-hidden bg-[#FAF7F2]`}
    >
      {/* ============================================================== */}
      {/* THANH CHỌN NHANH 4 TUYẾN DU LỊCH CHỦ ĐỀ (QUICK SELECTOR BAR)    */}
      {/* Single-row horizontal scroll design on all devices             */}
      {/* ============================================================== */}
      {!compactPreview && (
        <header className="shrink-0 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC8] px-3 py-2 z-20 flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
          {/* Brand/Label Pill */}
          <div className="flex items-center gap-1.5 shrink-0 pr-1">
            <span className="p-1 rounded-lg bg-[#F4ECE7] text-[#9E1B32] border border-[#E6DEC8] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D5C390]" />
            </span>
            <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider text-[#1E1B18]">
              {lang === 'en' ? 'Cultural Trails' : 'Tuyến Du Lịch'}:
            </span>
          </div>

          {/* 4 Cultural Trails Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {allTrails.map((trail) => {
              const isActive = activeCulturalTrail?.id === trail.id;
              return (
                <button
                  key={trail.id}
                  type="button"
                  onClick={() => handleSelectCulturalTrail(trail)}
                  title={trail.displayName}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md scale-[1.02]'
                      : 'bg-[#FFFFFF] hover:bg-[#F4ECE7]/50 text-[#4A453E] hover:text-[#1E1B18] border-[#E6DEC8] hover:border-[#D5C390]'
                  }`}
                  style={{
                    backgroundColor: isActive ? trail.theme_color || '#9E1B32' : undefined,
                    borderColor: isActive ? trail.theme_color || '#9E1B32' : undefined,
                  }}
                >
                  {renderTrailIcon(trail.id)}
                  <span className="whitespace-nowrap">{getTrailShortName(trail)}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/25 text-white' : 'bg-[#FAF7F2] text-[#766E65] border border-[#E6DEC8]'
                    }`}
                  >
                    {trail.monument_ids?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls on Quick Selector Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {activeCulturalTrail && (
            <button
              type="button"
              onClick={handleClearCulturalTrail}
              className="px-2.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-rose-50 text-rose-700 border border-[#E6DEC8] hover:border-rose-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title={lang === 'en' ? 'Clear trail & view all 20 monuments' : 'Xóa tuyến & xem tất cả 20 di tích'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {lang === 'en' ? 'Clear Trail / All 20 Sites' : 'Xóa tuyến / Tất cả 20 di tích'}
              </span>
              <span className="md:hidden">{lang === 'en' ? 'Clear' : 'Xóa'}</span>
            </button>
          )}

          {isEmbedded && (
            <button
              type="button"
              onClick={() => {
                if (typeof onOpenFullMap === 'function') {
                  onOpenFullMap();
                } else {
                  navigate(`/ban-do${activeCulturalTrail ? `?trail=${activeCulturalTrail.id}` : ''}`);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#9E1B32]/25 transition-all cursor-pointer"
              title={lang === 'en' ? 'Open Fullscreen WebGIS Map' : 'Mở Bản Đồ Số Toàn Màn Hình'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === 'en' ? 'Open Full Map' : 'Bản Đồ Toàn Màn Hình'}
              </span>
              <span className="sm:hidden">{lang === 'en' ? 'Full Map' : 'Toàn màn hình'}</span>
            </button>
          )}
        </div>
        </header>
      )}

      {/* ============================================================== */}
      {/* KHU VỰC CHÍNH: SIDEBAR + BẢN ĐỒ SỐ WEB GIS                    */}
      {/* ============================================================== */}
      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* ============================================================== */}
        {/* CỘT TRÁI: SIDEBAR ĐA NĂNG (MapSidebar Component)               */}
        {/* ============================================================== */}
        {!compactPreview && (
          <MapSidebar
          sidebarMode={sidebarMode}
          setSidebarMode={setSidebarMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRanking={selectedRanking}
          setSelectedRanking={setSelectedRanking}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          activeRadius={activeRadius}
          setActiveRadius={setActiveRadius}
          monuments={monuments}
          filteredMonuments={filteredMonuments}
          selectedMonument={selectedMonument}
          setSelectedMonument={setSelectedMonument}
          activeSelected={activeSelected}
          userLocation={userLocation}
          selectedGpsPreset={selectedGpsPreset}
          handlePresetChange={handlePresetChange}
          gpsActive={gpsActive}
          geofence={geofence}
          handleLocateUser={handleLocateUser}
          selectedTourIds={selectedTourIds}
          toggleTourMonument={toggleTourMonument}
          activeTour={activeTour}
          handleSolveTour={handleSolveTour}
          handleClearTour={handleClearTour}
          isTspSolving={isTspSolving}
          handleTriggerRoute={handleTriggerRoute}
          localizedMonuments={localizedMonuments}
          t={t}
          lang={lang}
          isEmbedded={isEmbedded}
          />
        )}

        {/* ============================================================== */}
        {/* CỘT PHẢI: BẢN ĐỒ SỐ TƯƠNG TÁC WEB GIS (Desktop & Mobile)        */}
        {/* ============================================================== */}
        <main className="flex-1 h-full relative overflow-hidden">
          <WebGisMap
            monuments={filteredMonuments}
            selectedMonument={activeSelected}
            onSelectMonument={(m) => setSelectedMonument(m)}
            userLocation={userLocation}
            onUserLocationChange={handleUserLocationDrag}
            activeRadius={activeRadius}
            onLocateUser={handleLocateUser}
            activeTour={activeTour}
            onClearTour={handleClearTour}
            routeTargetMonument={requestedRouteTarget}
            hideTourBanner={Boolean(activeCulturalTrail)}
          />

          {/* ============================================================== */}
          {/* HỘP THÔNG TIN TÓM TẮT TUYẾN ĐANG CHỌN (TRAIL SUMMARY CARD)      */}
          {/* Responsive, compact pill on collapse, capped max-height        */}
          {/* ============================================================== */}
          {!compactPreview && activeCulturalTrail && (
            <aside className="absolute top-3 left-2 right-2 sm:right-auto sm:left-3 md:left-4 z-30 w-full sm:w-[360px] md:w-[380px] max-w-[calc(100%-1rem)] sm:max-w-[380px] bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E6DEC8] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-3 duration-200">
              {/* Card Header with Theme Color Accent */}
              <div
                className="p-3 text-white relative overflow-hidden flex items-center justify-between gap-2 shadow-sm"
                style={{ backgroundColor: activeCulturalTrail.theme_color || '#9E1B32' }}
              >
                <div
                  className="min-w-0 flex-1 cursor-pointer select-none"
                  onClick={() => setTrailSummaryExpanded(!trailSummaryExpanded)}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white/90 mb-0.5">
                    {renderTrailIcon(activeCulturalTrail.id)}
                    <span>{lang === 'en' ? 'Cultural Trail' : 'Tuyến Chủ Đề'}</span>
                    <span>•</span>
                    <span>
                      {activeCulturalTrail.monument_ids?.length || 0}{' '}
                      {lang === 'en' ? 'Sites' : 'Di tích'}
                    </span>
                    {activeTour?.totalDistanceKm && (
                      <>
                        <span>•</span>
                        <span>{activeTour.totalDistanceKm} km</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif font-extrabold text-xs sm:text-[14px] leading-snug drop-shadow-xs truncate">
                    {activeCulturalTrail.displayName}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setTrailSummaryExpanded(!trailSummaryExpanded)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={
                      trailSummaryExpanded
                        ? lang === 'en'
                          ? 'Minimize'
                          : 'Thu gọn'
                        : lang === 'en'
                        ? 'Expand'
                        : 'Mở rộng'
                    }
                  >
                    {trailSummaryExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClearCulturalTrail}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={lang === 'en' ? 'Clear trail & view all' : 'Xóa tuyến & xem tất cả'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expandable Body */}
              {trailSummaryExpanded && (
                <div
                  className={`p-3 space-y-2.5 overflow-y-auto overscroll-contain bg-[#FAF7F2] ${
                    isEmbedded ? 'max-h-[350px]' : 'max-h-[500px]'
                  }`}
                >
                  {/* Quick Info Chips: Duration, Transport */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#9E1B32] shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#766E65] block">
                          {lang === 'en' ? 'Duration' : 'Thời lượng'}
                        </span>
                        <span className="font-bold text-[#1E1B18] truncate block">
                          {activeCulturalTrail.displayDuration}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-[#1E5631] shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#766E65] block">
                          {lang === 'en' ? 'Transport' : 'Phương tiện'}
                        </span>
                        <span className="font-bold text-[#1E1B18] truncate block">
                          {activeCulturalTrail.displayTransport}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TSP Stats Banner if calculated */}
                  {activeTour && (
                    <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[#D5C390] flex items-center justify-between text-xs shadow-2xs">
                      <div className="flex items-center gap-2">
                        <Route className="w-4 h-4 text-[#9E1B32] shrink-0" />
                        <div>
                          <span className="font-bold text-[#1E1B18]">{activeTour.totalDistanceKm} km</span>
                          <span className="text-[#766E65] text-[10px] ml-1.5">
                            (~{activeTour.totalDurationMin} {lang === 'en' ? 'mins' : 'phút'})
                          </span>
                        </div>
                      </div>
                      {activeTour.savingPercent > 0 && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          -{activeTour.savingPercent}% km
                        </span>
                      )}
                    </div>
                  )}

                  {/* Short Story */}
                  <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] text-[11px] text-[#4A453E] leading-relaxed shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#1E1B18] mb-1 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-[#9E1B32]" />
                      <span>{lang === 'en' ? 'Story & Cultural Legacy' : 'Câu chuyện & Trầm tích'}</span>
                    </div>
                    <p className="line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                      {activeCulturalTrail.displayStory}
                    </p>
                  </div>

                  {/* Ordered Stops Sequence (Chuỗi điểm dừng 1 -> 2 -> 3...) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#1E1B18]">
                      <span className="flex items-center gap-1">
                        <Milestone className="w-3.5 h-3.5 text-[#9E1B32]" />
                        <span>{lang === 'en' ? 'Itinerary Sequence' : 'Chuỗi Điểm Dừng Tham Quan'}:</span>
                      </span>
                      <span className="text-[10px] text-[#766E65] font-normal">
                        {lang === 'en' ? 'Click to inspect' : 'Bấm để xem'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {(
                        activeTour?.orderedMonuments ||
                        localizedMonuments.filter((m) =>
                          activeCulturalTrail.monument_ids.includes(m.id)
                        )
                      ).map((m, idx) => {
                        const isSelected = selectedMonument?.id === m.id;
                        return (
                          <div
                            key={`trail-stop-${m.id}`}
                            onClick={() => setSelectedMonument(m)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-[#FFFFFF] border-[#D5C390] ring-1 ring-[#D5C390]/50 shadow-xs'
                                : 'bg-[#FFFFFF] hover:bg-[#F4ECE7]/40 border-[#E6DEC8] hover:border-[#D5C390]'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-5 h-5 rounded-full text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs"
                                style={{
                                  backgroundColor: activeCulturalTrail.theme_color || '#9E1B32',
                                }}
                              >
                                {idx + 1}
                              </span>
                              <img
                                src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                                alt=""
                                className="w-8 h-8 rounded-lg object-cover bg-[#F4ECE7] shrink-0 border border-[#E6DEC8]"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                                }}
                              />
                              <div className="min-w-0">
                                <h4 className="font-serif text-[11px] font-bold text-[#1E1B18] truncate leading-snug">
                                  {m.displayName}
                                </h4>
                                <p className="text-[9px] text-[#766E65] truncate">{m.displayDistrict}</p>
                              </div>
                            </div>

                            <ArrowRight className="w-3.5 h-3.5 text-[#766E65] shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clear Trail CTA */}
                  <div className="pt-1.5 border-t border-[#E6DEC8]">
                    <button
                      type="button"
                      onClick={handleClearCulturalTrail}
                      className="w-full py-2 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE7] text-[#1E1B18] border border-[#E6DEC8] hover:border-[#D5C390] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en'
                          ? 'Clear Trail / View All 20 Sites'
                          : 'Xóa tuyến / Xem tất cả 20 di tích'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </aside>
          )}

          {/* ============================================================== */}
          {/* CỬA SỔ TÓM TẮT DI TÍCH NẰM BÊN PHẢI (FLOATING RIGHT PREVIEW)    */}
          {/* ============================================================== */}
          {activeSelected && (
            <aside className="hidden md:flex absolute top-4 right-4 z-30 w-[350px] sm:w-[380px] max-h-[calc(100vh-5rem)] bg-[#FAF7F2]/95 backdrop-blur-md rounded-3xl shadow-2xl border border-[#E6DEC8] overflow-hidden flex-col animate-in fade-in slide-in-from-right-4 duration-200">
              {/* 1. Fixed Header: Image Cover with Gradient & Close Button */}
              <div className="relative w-full h-36 shrink-0 bg-[#1E1B18] overflow-hidden flex items-center justify-center">
                <img
                  src={activeSelected.thumbnail || `/images/monuments/monument_${activeSelected.id}.jpg`}
                  alt=""
                  aria-label={activeSelected.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/images/monuments/monument_${activeSelected.id}.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                {/* Close button X */}
                <button
                  type="button"
                  onClick={() => setSelectedMonument(null)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10 cursor-pointer"
                  title={t('closePreview')}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Ranking Badge Top-Left */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9E1B32]/95 backdrop-blur-md text-white text-[10px] font-extrabold shadow-md z-10">
                  <span className="material-symbols-outlined text-[13px]">stars</span>
                  <span>{activeSelected.displayRanking}</span>
                </div>

                {/* Title & Category over image */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-[#D5C390] tracking-wider">
                    {activeSelected.displayCategory}
                  </span>
                  <h3 className="font-serif font-extrabold text-[15px] leading-snug drop-shadow-sm text-white line-clamp-1">
                    {activeSelected.displayName}
                  </h3>
                </div>
              </div>

              {/* 2. Scrollable Middle Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 overscroll-contain bg-[#FAF7F2]">
                {/* Address & Distance */}
                <div className="flex items-start justify-between gap-2 text-xs">
                  <div className="flex items-start gap-1 text-[#4A453E] min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0 mt-0.5" />
                    <span className="truncate font-medium">{activeSelected.displayAddress}</span>
                  </div>
                  {activeSelected.distance !== null && activeSelected.distance !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1E5631]/10 text-[#1E5631] border border-[#1E5631]/20 font-bold font-mono text-[10px] shrink-0">
                      {t('distanceKmAway')} {activeSelected.distance} km
                    </span>
                  )}
                </div>

                {/* History Summary Text */}
                <div className="text-[11px] text-[#4A453E] leading-relaxed bg-[#FFFFFF] p-3 rounded-2xl border border-[#E6DEC8] shadow-2xs">
                  <p className="font-semibold text-[#1E1B18] mb-1 text-[11px] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#9E1B32]" />
                    <span>{t('historySummaryTitle')}</span>
                  </p>
                  <p className="text-[#4A453E]">{activeSelected.displayHistory}</p>
                </div>

                {/* 2 Quick Info Chips */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] flex items-center gap-1.5 text-[#1E1B18]">
                    <Clock className="w-3.5 h-3.5 text-[#1E5631] shrink-0" />
                    <span className="truncate">{activeSelected.displayOpeningHours}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] flex items-center gap-1.5 text-[#1E1B18]">
                    <Ticket className="w-3.5 h-3.5 text-[#9E1B32] shrink-0" />
                    <span className="truncate font-semibold">
                      {activeSelected.ticketPrice > 0
                        ? formatCurrency(activeSelected.ticketPrice)
                        : t('freeAdmission')}
                    </span>
                  </div>
                </div>

                {/* Gợi ý lưu ý tham quan nếu có */}
                {activeSelected.displayNote && (
                  <div className="p-2.5 rounded-xl bg-[#D5C390]/15 border border-[#D5C390]/40 text-[10px] text-[#5C4D26] leading-relaxed">
                    <span className="font-bold">{t('visitNoteLabel')} </span>
                    <span>{activeSelected.displayNote}</span>
                  </div>
                )}
              </div>

              {/* 3. Fixed Bottom Action Buttons */}
              <div className="shrink-0 p-3 pt-2 bg-[#FAF7F2]/95 border-t border-[#E6DEC8] backdrop-blur-md flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate(`/di-tich/${activeSelected.id}`)}
                  className="w-full py-2 px-3 rounded-xl bg-[#9E1B32] hover:bg-[#831427] active:bg-[#721021] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#9E1B32]/25 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('openProfileAndAudioTour')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTriggerRoute(activeSelected)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#1E5631] hover:bg-[#164024] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('drawDrivingRoute')}</span>
                  </button>

                  <a
                    href={getGoogleMapsDirUrl(userLocation, activeSelected.coordinates)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE7] text-[#1E1B18] border border-[#E6DEC8] hover:border-[#D5C390] font-bold text-xs flex items-center gap-1 transition-all shadow-2xs"
                    title={t('openGoogleMaps')}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('googleMapsBtn')}</span>
                  </a>
                </div>
              </div>
            </aside>
          )}

          {/* ============================================================== */}
          {/* NÚT NỔI [MỞ BẢN ĐỒ SỐ TOÀN MÀN HÌNH] (KHI EMBEDDED Ở TRANG CHỦ) */}
          {/* Đặt ở chính giữa đáy (Bottom-Center), không overlap Map Controls */}
          {/* ============================================================== */}
          {!compactPreview && isEmbedded && (
            <button
              type="button"
              onClick={() => {
                if (typeof onOpenFullMap === 'function') {
                  onOpenFullMap();
                } else {
                  navigate(`/ban-do${activeCulturalTrail ? `?trail=${activeCulturalTrail.id}` : ''}`);
                }
              }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 sm:px-5 py-2.5 rounded-full bg-[#1E1B18]/90 hover:bg-[#1E1B18] text-white font-extrabold text-xs sm:text-sm shadow-xl border border-[#E6DEC8]/40 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap group"
              title={lang === 'en' ? 'Open Fullscreen WebGIS Map' : 'Mở Bản Đồ Số Toàn Màn Hình'}
            >
              <span className="w-2 h-2 rounded-full bg-[#9E1B32] animate-pulse" />
              <span>{lang === 'en' ? 'Open Fullscreen WebGIS' : 'Mở Bản Đồ Số Toàn Màn Hình'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D5C390] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}

          {/* ============================================================ */}
          {/* MOBILE BOTTOM SHEET (Chỉ hiển thị ở chế độ bản đồ độc lập)   */}
          {/* ============================================================ */}
          {!compactPreview && !isEmbedded && (
            <div
              className={`md:hidden absolute left-0 right-0 bottom-0 z-30 bg-[#FAF7F2] rounded-t-3xl shadow-2xl border-t border-[#E6DEC8] transition-transform duration-300 ${
                mobileDrawerOpen
                  ? 'translate-y-0 h-[68vh]'
                  : 'translate-y-[calc(100%-80px)] h-[68vh]'
              } flex flex-col`}
            >
              {/* Pull Handle Header */}
              <div
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                className="p-3 pb-2 flex flex-col items-center cursor-pointer select-none bg-[#FAF7F2] rounded-t-3xl border-b border-[#E6DEC8]"
              >
                <div className="w-10 h-1.5 bg-[#E6DEC8] rounded-full mb-2" />
                <div className="w-full flex items-center justify-between px-2">
                  <span className="font-serif text-xs font-bold text-[#1E1B18]">
                    {activeSelected
                      ? activeSelected.displayName
                      : `SenMap — ${monuments.length} ${t('monumentsUnit')}`}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#9E1B32]">
                    <span>
                      {mobileDrawerOpen
                        ? t('hideDirections')
                        : `${t('foundCount')} (${filteredMonuments.length})`}
                    </span>
                    {mobileDrawerOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#FAF7F2]">
                {/* Quick search input */}
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#766E65]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full h-9 pl-9 pr-3 rounded-full bg-[#FFFFFF] text-[#1E1B18] placeholder:text-[#766E65] border border-[#E6DEC8] text-xs outline-none focus:border-[#D5C390] focus:ring-1 focus:ring-[#D5C390]"
                  />
                </div>

                {/* List with prominent action buttons */}
                {filteredMonuments.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMonument(m);
                    }}
                    className={`p-2.5 rounded-2xl flex flex-col gap-2 border transition-all cursor-pointer ${
                      selectedMonument?.id === m.id
                        ? 'bg-[#FFFFFF] border-[#D5C390] ring-1 ring-[#D5C390]/50 shadow-sm'
                        : 'bg-[#FFFFFF] border-[#E6DEC8] hover:border-[#D5C390]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F4ECE7] border border-[#E6DEC8] shrink-0 flex items-center justify-center">
                        <img
                          src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                          alt=""
                          aria-label={m.displayName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#9E1B32]/10 text-[#9E1B32] border border-[#9E1B32]/20 truncate">
                            {m.displayRanking}
                          </span>
                          {m.distance !== null && (
                            <span className="text-[10px] text-[#766E65] font-mono">
                              {m.distance} km
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-xs font-bold text-[#1E1B18] truncate">{m.displayName}</h4>
                        <p className="text-[10px] text-[#766E65] truncate">{m.displayDistrict}</p>
                      </div>
                    </div>

                    {/* Action Buttons in Mobile Sheet */}
                    <div className="flex items-center gap-1.5 pt-1 border-t border-[#E6DEC8]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/di-tich/${m.id}`);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{t('cardDetailsAndAudio')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriggerRoute(m);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-[#1E5631] hover:bg-[#164024] text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t('cardDirections')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
