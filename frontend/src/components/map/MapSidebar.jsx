import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  ArrowRight,
  Route,
  CheckSquare,
  Square,
  AlertTriangle,
  Loader2,
  CalendarCheck,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { DISTRICTS } from '../../data/monumentsData';
import { DISTRICT_TRANSLATIONS } from '../../data/monumentsTranslationsEn';

/**
 * SenMap Dong Thap - MapSidebar
 * Follows 100% Vietnam & Kyoto Heritage Warm Design System
 * Surfaces: Giấy Dó sáng ấm (#FAF7F2, #F4ECE7), Card Trắng (#FFFFFF), Viền (#E6DEC8)
 * Accents: Hồng Sen (#9E1B32), Tràm Chim (#1E5631), Vàng Tatami (#D5C390)
 * Typography: Noto Serif / font-serif for monument titles, Be Vietnam Pro for body
 */
export default function MapSidebar({
  sidebarMode = 'explore',
  setSidebarMode,
  searchQuery = '',
  setSearchQuery,
  selectedRanking = 'ALL',
  setSelectedRanking,
  selectedDistrict = 'ALL',
  setSelectedDistrict,
  activeRadius = null,
  setActiveRadius,
  monuments = [],
  filteredMonuments = [],
  selectedMonument = null,
  setSelectedMonument,
  activeSelected = null,
  userLocation,
  selectedGpsPreset = 'caolanh',
  handlePresetChange,
  gpsActive = false,
  geofence = { isValid: true },
  handleLocateUser,
  selectedTourIds = [],
  toggleTourMonument,
  activeTour = null,
  handleSolveTour,
  handleClearTour,
  isTspSolving = false,
  handleTriggerRoute,
  localizedMonuments = [],
  t,
  lang = 'vi',
  isEmbedded = false,
}) {
  const navigate = useNavigate();

  return (
    <aside
      data-testid="map-sidebar"
      className={`${
        isEmbedded ? 'hidden' : 'hidden md:flex'
      } w-[390px] shrink-0 h-full bg-[#FAF7F2] flex-col z-20 shadow-[4px_0_24px_rgba(30,27,24,0.06)] relative border-r border-[#E6DEC8] select-none`}
    >
      {/* ============================================================== */}
      {/* TOP TAB MODE SWITCHER: Tra cứu di tích vs Lập Tour TSP 2-Opt    */}
      {/* ============================================================== */}
      <div className="p-3 pb-2 bg-[#F4ECE7] border-b border-[#E6DEC8]">
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#E6DEC8]/60 text-xs font-bold">
          <button
            type="button"
            data-testid="sidebar-mode-explore"
            onClick={() => setSidebarMode('explore')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sidebarMode === 'explore'
                ? 'bg-[#FFFFFF] text-[#9E1B32] shadow-xs border border-[#E6DEC8]'
                : 'text-[#4A453E] hover:text-[#1E1B18]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t('modeExplore')}</span>
          </button>

          <button
            type="button"
            data-testid="sidebar-mode-tour"
            onClick={() => setSidebarMode('tour')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sidebarMode === 'tour'
                ? 'bg-[#9E1B32] text-white shadow-md shadow-[#9E1B32]/25'
                : 'text-[#4A453E] hover:text-[#1E1B18]'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>{t('modeTour')}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SMART GPS 3-MODE HEADER BAR                                    */}
      {/* ============================================================== */}
      <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#E6DEC8] flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex w-2.5 h-2.5 rounded-full ${
                geofence.isValid
                  ? 'bg-emerald-600 shadow-sm shadow-emerald-600/50'
                  : 'bg-amber-500 animate-ping'
              }`}
            />
            <span className="text-[11px] font-bold text-[#1E1B18] uppercase tracking-wider">
              {selectedGpsPreset === 'device' ? t('gpsHeaderReal') : t('gpsHeaderPreset')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLocateUser}
            className="text-[11px] font-bold text-[#1E5631] hover:text-[#164024] flex items-center gap-1 transition-colors cursor-pointer"
            title={t('locateMeTooltip')}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>
              {gpsActive && selectedGpsPreset === 'device' ? t('gpsActiveBtn') : t('gpsEnableBtn')}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedGpsPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full h-8 px-2.5 rounded-xl bg-[#FFFFFF] text-[#1E1B18] text-[11px] font-semibold outline-none border border-[#E6DEC8] focus:border-[#D5C390] focus:ring-1 focus:ring-[#D5C390] transition-all cursor-pointer truncate shadow-2xs"
          >
            <option value="caolanh">{t('gpsPresetCaoLanh')}</option>
            <option value="sadec">{t('gpsPresetSaDec')}</option>
            <option value="hongngu">{t('gpsPresetHongNgu')}</option>
            <option value="bridge">{t('gpsPresetBridge')}</option>
            <option value="tramchim">{t('gpsPresetTramChim')}</option>
            {selectedGpsPreset === 'device' && (
              <option value="device">📍 {t('gpsHeaderReal')}</option>
            )}
            {selectedGpsPreset === 'custom' && (
              <option value="custom">📌 {t('gpsCustomOption')}</option>
            )}
          </select>
        </div>

        {!geofence.isValid && (
          <div className="flex items-center gap-1.5 text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>{t('gpsOutOfBoundsWarn')}</span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* CHẾ ĐỘ 1: TRA CỨU DI TÍCH (EXPLORE MONUMENTS)                  */}
      {/* ============================================================== */}
      {sidebarMode === 'explore' && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAF7F2]">
          {/* Search Box & Filters Header */}
          <div className="p-3 bg-[#FAF7F2] border-b border-[#E6DEC8] space-y-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#766E65]" />
              <input
                type="text"
                data-testid="sidebar-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full h-10 pl-10 pr-9 rounded-full bg-[#FFFFFF] text-[#1E1B18] text-[13px] placeholder:text-[#766E65] outline-none border border-[#E6DEC8] transition-all focus:border-[#D5C390] focus:ring-2 focus:ring-[#D5C390]/30 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[#766E65] hover:text-[#9E1B32] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Chips: Ranking */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <button
                type="button"
                onClick={() => setSelectedRanking('ALL')}
                className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedRanking === 'ALL'
                    ? 'bg-[#9E1B32] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#4A453E] border border-[#E6DEC8] hover:border-[#D5C390] hover:text-[#1E1B18]'
                }`}
              >
                {t('rankingAll')} ({monuments.length})
              </button>

              <button
                type="button"
                onClick={() => setSelectedRanking('Quốc gia đặc biệt')}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedRanking === 'Quốc gia đặc biệt'
                    ? 'bg-[#9E1B32] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#9E1B32] border border-[#E6DEC8] hover:border-[#D5C390]'
                }`}
              >
                <span>★</span> {t('rankingSpecial')} (2)
              </button>

              <button
                type="button"
                onClick={() => setSelectedRanking('Quốc gia')}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedRanking === 'Quốc gia'
                    ? 'bg-[#1E5631] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#1E5631] border border-[#E6DEC8] hover:border-[#D5C390]'
                }`}
              >
                <span>🏛️</span> {t('rankingNational')}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRanking('Cấp tỉnh')}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedRanking === 'Cấp tỉnh'
                    ? 'bg-[#0369A1] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0369A1] border border-[#E6DEC8] hover:border-[#D5C390]'
                }`}
              >
                <span>📍</span> {t('rankingProvincial')}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRanking('Điểm du lịch/Làng nghề')}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedRanking === 'Điểm du lịch/Làng nghề'
                    ? 'bg-[#1E5631] text-white shadow-xs'
                    : 'bg-[#FFFFFF] text-[#1E5631] border border-[#E6DEC8] hover:border-[#D5C390]'
                }`}
              >
                <span>🌿</span> {t('rankingEcoCraft')}
              </button>
            </div>

            {/* District & Radius Dropdowns */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="h-8 px-2 rounded-xl bg-[#FFFFFF] text-[#1E1B18] text-[11px] font-medium outline-none border border-[#E6DEC8] focus:border-[#D5C390] focus:ring-1 focus:ring-[#D5C390] truncate cursor-pointer shadow-2xs"
              >
                <option value="ALL">{t('allDistricts')}</option>
                {DISTRICTS.slice(1).map((d) => (
                  <option key={d} value={d}>
                    {DISTRICT_TRANSLATIONS[lang]?.[d] || d}
                  </option>
                ))}
              </select>

              <select
                value={activeRadius || ''}
                onChange={(e) => setActiveRadius(e.target.value ? Number(e.target.value) : null)}
                className="h-8 px-2 rounded-xl bg-[#FFFFFF] text-[#1E1B18] text-[11px] font-medium outline-none border border-[#E6DEC8] focus:border-[#D5C390] focus:ring-1 focus:ring-[#D5C390] cursor-pointer shadow-2xs"
              >
                <option value="">{t('radiusAll')}</option>
                <option value="5">{t('radius5km')}</option>
                <option value="10">{t('radius10km')}</option>
                <option value="20">{t('radius20km')}</option>
              </select>
            </div>
          </div>

          {/* Result Count Bar */}
          <div className="px-4 py-2 bg-[#F4ECE7] flex items-center justify-between border-b border-[#E6DEC8] text-[11px]">
            <span className="text-[#4A453E]">
              {t('foundCount')}{' '}
              <strong className="text-[#9E1B32] font-bold">{filteredMonuments.length}</strong>{' '}
              {t('monumentsUnit')}
            </span>
            <button
              type="button"
              onClick={handleLocateUser}
              className="inline-flex items-center gap-1 text-[#1E5631] hover:text-[#164024] font-bold transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>
                {gpsActive && selectedGpsPreset === 'device' ? t('gpsActiveBtn') : t('gpsEnableBtn')}
              </span>
            </button>
          </div>

          {/* Scrollable Monument Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#FAF7F2]">
            {filteredMonuments.length === 0 ? (
              <div className="py-12 text-center text-[#766E65] space-y-2">
                <Compass className="w-8 h-8 mx-auto opacity-50 text-[#D5C390]" />
                <p className="text-xs">{t('noMonumentsFound')}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRanking('ALL');
                    setSelectedDistrict('ALL');
                    setActiveRadius(null);
                  }}
                  className="text-[11px] text-[#9E1B32] font-semibold hover:underline cursor-pointer"
                >
                  {t('resetFilters')}
                </button>
              </div>
            ) : (
              filteredMonuments.map((m) => {
                const isSelected = selectedMonument?.id === m.id;
                const isSpecial =
                  m.ranking === 'Quốc gia đặc biệt' || m.cap_xep_hang === 'Quốc gia đặc biệt';

                return (
                  <article
                    key={m.id}
                    data-testid={`monument-card-${m.id}`}
                    onClick={() => setSelectedMonument(m)}
                    className={`p-3 rounded-2xl transition-all cursor-pointer flex flex-col gap-2.5 group relative overflow-hidden border ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#D5C390] shadow-md ring-2 ring-[#D5C390]/50'
                        : 'bg-[#FFFFFF] hover:bg-[#F4ECE7]/40 border-[#E6DEC8] hover:border-[#D5C390] shadow-xs'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9E1B32] rounded-l" />
                    )}

                    {/* Card Header: Thumbnail + Title + Metadata */}
                    <div className="flex gap-3 items-start">
                      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-2xs bg-[#F4ECE7] border border-[#E6DEC8] flex items-center justify-center">
                        <img
                          src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                          alt=""
                          aria-label={m.displayName || m.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                          }}
                        />
                        {isSpecial && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#9E1B32] text-white text-[8px] font-extrabold tracking-tight z-10 shadow-xs">
                            {t('topBadge')}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold leading-tight truncate ${
                              isSpecial
                                ? 'bg-[#9E1B32]/10 text-[#9E1B32] border border-[#9E1B32]/25'
                                : m.ranking === 'Quốc gia' || m.cap_xep_hang === 'Quốc gia'
                                ? 'bg-[#1E5631]/10 text-[#1E5631] border border-[#1E5631]/25'
                                : 'bg-[#0369A1]/10 text-[#0369A1] border border-[#0369A1]/25'
                            }`}
                          >
                            {m.displayRanking}
                          </span>
                          {m.distance !== null && (
                            <span
                              className="text-[#766E65] text-[10px] font-mono shrink-0"
                              title={
                                gpsActive && selectedGpsPreset === 'device'
                                  ? t('distanceFromYou')
                                  : t('distanceKmAway')
                              }
                            >
                              {t('distanceKmAway')} {m.distance} km
                            </span>
                          )}
                        </div>

                        <h3
                          className={`font-serif text-[14px] font-bold leading-snug ${
                            isSelected
                              ? 'text-[#9E1B32]'
                              : 'text-[#1E1B18] group-hover:text-[#9E1B32] transition-colors'
                          }`}
                        >
                          {m.displayName}
                        </h3>

                        <p className="text-[11px] text-[#766E65] truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0" />
                          <span>{m.displayDistrict || m.district}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Buttons on Every Card */}
                    <div className="pt-2 border-t border-[#E6DEC8] flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/di-tich/${m.id}`);
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        title={t('openProfileAndAudioTour')}
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
                        className="py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#1E5631] text-[#1E5631] hover:text-white border border-[#E6DEC8] hover:border-[#1E5631] font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                        title={t('drawDrivingRoute')}
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t('cardDirections')}</span>
                      </button>
                    </div>
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
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAF7F2]">
          {/* Tour Planner Guidance & Action Card */}
          <div className="p-4 bg-[#F4ECE7] border-b border-[#E6DEC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-[#9E1B32]" />
                <span>{t('tourPlannerTitle')}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#9E1B32] text-white font-extrabold text-[10px]">
                {t('selectedTourCount')}: {selectedTourIds.length}/6
              </span>
            </div>

            <p className="text-[11px] text-[#4A453E] leading-relaxed">
              {t('tourPlannerDesc')}
            </p>

            {/* Action Solve Button */}
            <button
              type="button"
              data-testid="solve-tour-btn"
              onClick={handleSolveTour}
              disabled={selectedTourIds.length < 2 || isTspSolving}
              className="w-full py-2.5 px-4 rounded-xl bg-[#9E1B32] hover:bg-[#831427] active:bg-[#721021] text-white font-extrabold text-xs shadow-md shadow-[#9E1B32]/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isTspSolving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('optimizingTourBtn')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D5C390]" />
                  <span>{t('optimizeTourBtn')}</span>
                </>
              )}
            </button>

            {/* Active Tour Results Summary */}
            {activeTour && (
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D5C390] shadow-sm space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-[#1E1B18]">
                    {t('tourResultTitle')}
                  </span>
                  <button
                    type="button"
                    onClick={handleClearTour}
                    className="text-[10px] text-rose-700 font-bold hover:underline cursor-pointer"
                  >
                    {t('clearTourBtn')}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E6DEC8]">
                    <span className="text-[#766E65] block text-[9px]">{t('totalDistance')}</span>
                    <strong className="text-[#9E1B32] text-xs">{activeTour.totalDistanceKm} km</strong>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E6DEC8]">
                    <span className="text-[#766E65] block text-[9px]">{t('travelDuration')}</span>
                    <strong className="text-[#1E1B18] text-xs">
                      ~{activeTour.totalDurationMin} {lang === 'en' ? 'mins' : 'phút'}
                    </strong>
                  </div>
                </div>
                {activeTour.savingPercent > 0 && (
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[10px] flex items-center gap-1 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('tourSavingsMessage', { percent: activeTour.savingPercent })}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Checklist of Monuments */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#FAF7F2]">
            {localizedMonuments.map((m) => {
              const isChecked = selectedTourIds.includes(m.id);
              const tourIndex = activeTour?.orderedMonuments?.findIndex((item) => item.id === m.id);

              return (
                <div
                  key={`tour-check-${m.id}`}
                  onClick={() => toggleTourMonument(m.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-[#FFFFFF] border-[#D5C390] shadow-xs ring-1 ring-[#D5C390]/50'
                      : 'bg-[#FFFFFF] border-[#E6DEC8] hover:border-[#D5C390]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="text-[#9E1B32] shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 fill-[#9E1B32] text-white" />
                      ) : (
                        <Square className="w-4 h-4 text-[#E6DEC8]" />
                      )}
                    </div>
                    <img
                      src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-[#F4ECE7] shrink-0 border border-[#E6DEC8]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                      }}
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-xs font-bold text-[#1E1B18] truncate">
                        {m.displayName}
                      </h4>
                      <p className="text-[10px] text-[#766E65] truncate">{m.displayDistrict}</p>
                    </div>
                  </div>

                  {tourIndex !== undefined && tourIndex !== -1 && (
                    <span className="w-6 h-6 rounded-full bg-[#9E1B32] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {tourIndex + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FOOTER: Thanh CTA tóm tắt khi đang chọn 1 di tích              */}
      {/* ============================================================== */}
      {activeSelected ? (
        <div className="p-3 bg-[#FAF7F2] border-t border-[#E6DEC8] shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="min-w-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9E1B32] shrink-0 animate-pulse" />
              <span className="font-serif font-extrabold text-[#1E1B18] truncate max-w-[210px]">
                {activeSelected.displayName}
              </span>
            </div>
            <span className="text-[10px] text-[#766E65] font-medium">
              {activeSelected.displayDistrict}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => navigate(`/di-tich/${activeSelected.id}`)}
              className="flex-1 py-2 px-3 rounded-xl bg-[#9E1B32] hover:bg-[#831427] active:bg-[#721021] text-white font-extrabold text-xs shadow-md shadow-[#9E1B32]/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('cardDetailsAndAudio')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleTriggerRoute(activeSelected)}
              className="py-2 px-3 rounded-xl bg-[#1E5631] hover:bg-[#164024] text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title={t('drawDrivingRoute')}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('cardDirections')}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#FAF7F2] border-t border-[#E6DEC8] flex items-center justify-between text-[11px] text-[#766E65]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1E5631] inline-block" />
            <span>{t('readyCount')}</span>
          </span>
          <span className="text-[#766E65] italic">{t('selectToPreview')}</span>
        </div>
      )}
    </aside>
  );
}
