import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import {
  createMonumentIcon,
  createUserGpsIcon,
  createTourStopIcon,
} from './leafletIcons';
import { DONG_THAP_BOUNDS } from '../../data/monumentsData';
import {
  DONG_THAP_MIN_ZOOM,
  DONG_THAP_MAX_ZOOM,
  DONG_THAP_PROVINCE_POLYGON,
} from '../../data/dongThapBoundary';
import {
  calculateDistanceKm,
  formatCurrency,
  getGoogleMapsDirUrl,
  validateDongThapBounds,
} from '../../utils/geoUtils';
import { findOptimalRoute } from '../../utils/routingAlgorithms';
import {
  Layers,
  Crosshair,
  Compass,
  ArrowRight,
  Navigation,
  Clock,
  Ticket,
  MapPin,
  Sparkles,
  Map as MapIcon,
  ExternalLink,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  CornerUpRight,
  CornerUpLeft,
  ArrowUp,
  Flag,
  Milestone,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Subcomponent to handle programmatic map camera movement
function MapController({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [60, 60], animate: true });
    } else if (center) {
      map.setView(center, zoom || map.getZoom(), { animate: true });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

// Subcomponent to fix container size & resize issues (eliminating blank/grey tiles)
function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
}

export default function WebGisMap({
  monuments = [],
  selectedMonument = null,
  onSelectMonument = () => {},
  userLocation = null,
  onUserLocationChange = () => {},
  activeRadius = null, // in km
  onLocateUser = () => {},
  activeTour = null, // Multi-stop TSP tour from Tour Planner
  onClearTour = () => {},
  routeTargetMonument = null,
  hideTourBanner = false,
}) {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  // Default to Google Maps Standard Street Map with full Vietnamese road network
  const [baseMap, setBaseMap] = useState('street');
  const [showProvinceMask, setShowProvinceMask] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);
  const [showStepsList, setShowStepsList] = useState(false);
  const mapRef = useRef(null);

  // 3 high-speed, reliable basemap layer options
  const tileLayers = {
    street: {
      id: 'street',
      name: lang === 'en' ? 'Google Street Map' : 'Bản đồ Đường phố (Google)',
      shortName: t('streetMapLabel'),
      icon: 'map',
      url: `https://mt1.google.com/vt/lyrs=m&hl=${lang === 'en' ? 'en' : 'vi'}&x={x}&y={y}&z={z}`,
      attribution: '&copy; Google Maps',
      maxZoom: 20,
    },
    osm: {
      id: 'osm',
      name: lang === 'en' ? 'CARTO Voyager / OSM' : 'Bản đồ CARTO Voyager / OSM',
      shortName: t('cartoOsmLabel'),
      icon: 'public',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap contributors',
      maxZoom: 19,
      subdomains: 'abcd',
    },
    satellite: {
      id: 'satellite',
      name: lang === 'en' ? 'Google Satellite Hybrid' : 'Ảnh Vệ tinh (Google Hybrid)',
      shortName: t('satelliteLabel'),
      icon: 'satellite_alt',
      url: `https://mt1.google.com/vt/lyrs=y&hl=${lang === 'en' ? 'en' : 'vi'}&x={x}&y={y}&z={z}`,
      attribution: '&copy; Google Earth / Satellite Hybrid',
      maxZoom: 20,
    },
  };

  // Reset Dong Thap full view
  const resetDongThapView = () => {
    setActiveRoute(null);
    onClearTour();
    if (mapRef.current) {
      if (DONG_THAP_PROVINCE_POLYGON && DONG_THAP_PROVINCE_POLYGON.length > 0) {
        mapRef.current.fitBounds(DONG_THAP_PROVINCE_POLYGON, {
          padding: [24, 24],
          animate: true,
        });
      } else if (typeof mapRef.current.flyTo === 'function') {
        mapRef.current.flyTo(DONG_THAP_BOUNDS.center, DONG_THAP_BOUNDS.defaultZoom || 9.5, {
          duration: 1.2,
        });
      } else {
        mapRef.current.setView(DONG_THAP_BOUNDS.center, DONG_THAP_BOUNDS.defaultZoom || 9.5, {
          animate: true,
        });
      }
    }
  };

  // On-demand route calculation via Hybrid Engine (OSRM + A* Fallback)
  const handleRequestRoute = async (destMonument) => {
    if (!destMonument) return;

    let origin = userLocation;
    if (!origin) {
      onLocateUser();
      origin = [10.4534, 105.6341]; // Default: TP. Cao Lãnh
    }

    setIsRoutingLoading(true);
    onClearTour(); // Clear multi-tour if single route requested

    try {
      const routeResult = await findOptimalRoute(origin, destMonument.coordinates, lang);
      const bounds = L.latLngBounds(routeResult.coords);

      setActiveRoute({
        ...routeResult,
        destination: destMonument,
        origin,
        bounds,
      });
      setShowStepsList(false); // Collapsed by default so mobile screen stays clean and map is fully visible!
    } catch (err) {
      console.error('Lỗi khi tính toán lộ trình:', err);
    } finally {
      setIsRoutingLoading(false);
    }
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
    setShowStepsList(false);
  };

  // When activeTour is passed, clear single activeRoute
  useEffect(() => {
    if (activeTour) {
      setActiveRoute(null);
    }
  }, [activeTour]);

  // When routeTargetMonument is triggered from MapView sidebar/bottomsheet, build route immediately!
  useEffect(() => {
    if (routeTargetMonument) {
      const target = routeTargetMonument.monument || routeTargetMonument;
      handleRequestRoute(target);
    }
  }, [routeTargetMonument]);

  // Handle GPS Marker Drag End
  const handleGpsDragEnd = (e) => {
    const marker = e.target;
    const { lat, lng } = marker.getLatLng();
    const newCoords = [Number(lat.toFixed(5)), Number(lng.toFixed(5))];
    onUserLocationChange(newCoords);

    // If a single route is currently active, recalculate from new origin!
    if (activeRoute?.destination) {
      handleRequestRoute(activeRoute.destination);
    }
  };

  // Geofencing check for current user location
  const geofenceCheck = userLocation
    ? validateDongThapBounds(userLocation[0], userLocation[1])
    : { isValid: true };

  // Calculate tour bounds for camera framing
  const tourBounds = activeTour?.combinedPolyline?.length > 0
    ? L.latLngBounds(activeTour.combinedPolyline)
    : null;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#FAF7F2]">
      {/* Absolute container ensuring 100% dimensions for Leaflet */}
      <div className="absolute inset-0 w-full h-full">
        <MapContainer
          center={DONG_THAP_BOUNDS.center}
          zoom={DONG_THAP_BOUNDS.defaultZoom}
          minZoom={DONG_THAP_MIN_ZOOM}
          maxZoom={DONG_THAP_MAX_ZOOM}
          className="w-full h-full z-0"
          zoomControl={false}
          ref={mapRef}
        >
          {/* Key ensures TileLayer dynamically updates URL when baseMap state changes */}
          <TileLayer
            key={`${baseMap}-${lang}`}
            url={tileLayers[baseMap].url}
            attribution={tileLayers[baseMap].attribution}
            maxZoom={tileLayers[baseMap].maxZoom || 19}
            subdomains={tileLayers[baseMap].subdomains || 'abc'}
          />

          {/* Fix layout shifts and container invalidation */}
          <MapResizeFix />

          {/* PROVINCIAL BOUNDARY OF DONG THAP (Crisp and elegant border) */}
          {showProvinceMask && (
            <>
              {/* Lower soft ambient glow stroke */}
              <Polyline
                positions={DONG_THAP_PROVINCE_POLYGON}
                pathOptions={{
                  color: '#f43f5e',
                  weight: 5,
                  opacity: 0.25,
                  interactive: false,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />

              {/* Upper elegant dashed border line */}
              <Polyline
                positions={DONG_THAP_PROVINCE_POLYGON}
                pathOptions={{
                  color: '#e11d48',
                  weight: 2.5,
                  opacity: 0.85,
                  dashArray: '8, 6',
                  interactive: false,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </>
          )}

          {/* Map Camera Controller */}
          {tourBounds ? (
            <MapController bounds={tourBounds} />
          ) : activeRoute?.bounds ? (
            <MapController bounds={activeRoute.bounds} />
          ) : selectedMonument ? (
            <MapController center={selectedMonument.coordinates} zoom={13} />
          ) : null}

          {/* User GPS Location Marker (DRAGGABLE) */}
          {userLocation && (
            <>
              {/* Accuracy circle */}
              <Circle
                center={userLocation}
                radius={45}
                pathOptions={{
                  color: '#1E5631',
                  fillColor: '#1E5631',
                  fillOpacity: 0.15,
                  weight: 1.5,
                }}
              />

              <Marker
                position={userLocation}
                icon={createUserGpsIcon()}
                draggable={true}
                eventHandlers={{
                  dragend: handleGpsDragEnd,
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-3 text-center bg-white min-w-[200px] rounded-2xl border border-[#E6DEC8] shadow-md">
                    <div className="inline-flex p-1.5 rounded-full bg-[#1E5631]/10 text-[#1E5631] mb-1">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif font-bold text-xs text-[#1E1B18]">{t('userGpsTitle')}</h4>
                    <p className="text-[11px] font-mono text-[#766E65] mt-0.5">
                      {userLocation[0].toFixed(4)}° N, {userLocation[1].toFixed(4)}° E
                    </p>
                    <p className="text-[10px] text-[#1E5631] font-semibold mt-1">
                      {t('userGpsHint')}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Radius Search Circle */}
          {userLocation && activeRadius && (
            <Circle
              center={userLocation}
              radius={activeRadius * 1000}
              pathOptions={{
                color: '#1E5631',
                fillColor: '#1E5631',
                fillOpacity: 0.08,
                weight: 2,
                dashArray: '6, 6',
              }}
            />
          )}

          {/* SINGLE ROUTE POLYLINE (From Hybrid OSRM + A* engine) */}
          {activeRoute && (
            <>
              {/* Casing line */}
              <Polyline
                positions={activeRoute.coords}
                pathOptions={{
                  color: '#ffffff',
                  weight: 8,
                  opacity: 0.95,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
              {/* Main solid route line */}
              <Polyline
                positions={activeRoute.coords}
                pathOptions={{
                  color: '#1E5631',
                  weight: 5,
                  opacity: 1,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </>
          )}

          {/* MULTI-STOP TOUR TSP POLYLINE */}
          {activeTour && activeTour.combinedPolyline && (
            <>
              {/* White casing outline */}
              <Polyline
                positions={activeTour.combinedPolyline}
                pathOptions={{
                  color: '#ffffff',
                  weight: 9,
                  opacity: 0.95,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
              {/* Main tour line */}
              <Polyline
                positions={activeTour.combinedPolyline}
                pathOptions={{
                  color: '#9E1B32',
                  weight: 5.5,
                  opacity: 1,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </>
          )}

          {/* MULTI-STOP TOUR NUMBERED BADGES (Stop 1, Stop 2, Stop 3...) */}
          {activeTour?.orderedMonuments?.map((m, idx) => (
            <Marker
              key={`tour-stop-${m.id}`}
              position={m.coordinates}
              icon={createTourStopIcon(idx + 1)}
              zIndexOffset={1000 + idx}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-3 text-center bg-white min-w-[200px] rounded-2xl border border-[#E6DEC8] shadow-md">
                  <span className="px-2 py-0.5 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] border border-[#9E1B32]/20 font-extrabold text-[10px]">
                    {t('stopNumberBadge', { num: idx + 1 })}
                  </span>
                  <h4 className="font-serif font-bold text-xs text-[#1E1B18] mt-1">{m.displayName || m.name}</h4>
                  <p className="text-[11px] text-[#766E65] mt-0.5">{m.displayDistrict || m.district}</p>
                  <button
                    onClick={() => navigate(`/di-tich/${m.id}`)}
                    className="mt-2 w-full py-1.5 rounded-xl bg-[#9E1B32] hover:bg-[#831427] text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                  >
                    {t('stopDetailBtn')}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* 20 Monuments Markers */}
          {monuments.map((m) => {
            const isSelected = selectedMonument?.id === m.id;
            const dist = userLocation
              ? calculateDistanceKm(userLocation, m.coordinates)
              : null;

            return (
              <Marker
                key={m.id}
                position={m.coordinates}
                icon={createMonumentIcon(m, isSelected)}
                eventHandlers={{
                  click: () => onSelectMonument(m),
                }}
              >
                <Popup className="custom-leaflet-popup" maxWidth={320}>
                  <div className="w-[290px] sm:w-[310px] bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-2xl border border-[#E6DEC8]">
                    {/* Hero Thumbnail */}
                    <div className="relative w-full h-36 bg-[#1E1B18] overflow-hidden flex items-center justify-center">
                      <img
                        src={m.thumbnail || `/images/monuments/monument_${m.id}.jpg`}
                        alt=""
                        aria-label={m.displayName || m.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/images/monuments/monument_${m.id}.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                      {/* Ranking Tag Badge */}
                      <div
                        className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] shadow-md ${
                          m.ranking === 'Quốc gia đặc biệt' || m.cap_xep_hang === 'Quốc gia đặc biệt'
                            ? 'bg-[#D5C390] text-[#1E1B18] font-black border border-[#D5C390]'
                            : 'bg-[#9E1B32]/95 backdrop-blur-md text-white font-bold'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          stars
                        </span>
                        <span>{m.displayRanking || m.ranking}</span>
                      </div>

                      {/* Title over dark overlay */}
                      <div className="absolute bottom-2 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-semibold text-[#D5C390] tracking-wider">
                          {m.displayCategory || m.category}
                        </span>
                        <h3 className="font-serif font-bold text-[15px] sm:text-[16px] leading-snug truncate drop-shadow-sm text-white">
                          {m.displayName || m.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-3.5 space-y-2.5 bg-[#FFFFFF]">
                      <div className="flex items-start gap-1.5 text-[#4A453E] text-[12px] leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{m.displayAddress || m.address}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#E6DEC8] text-[11px] text-[#766E65]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#1E5631]" />
                          <span>{m.displayOpeningHours || m.openingHours}</span>
                        </span>
                        {dist !== null && (
                          <span className="px-2 py-0.5 rounded-full bg-[#1E5631]/10 text-[#1E5631] border border-[#1E5631]/20 font-bold font-mono">
                            {t('distanceKmAway')} {dist} km
                          </span>
                        )}
                      </div>

                      {/* Action buttons with OSRM and Google Maps navigation */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          {/* Button 1: Chỉ đường WebGIS OSRM/A* */}
                          <button
                            type="button"
                            onClick={() => handleRequestRoute(m)}
                            disabled={isRoutingLoading}
                            className="flex-1 py-2 px-2.5 rounded-xl bg-[#1E5631] hover:bg-[#164024] active:bg-[#0f2d19] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-all disabled:opacity-60 cursor-pointer"
                            title={t('drawDrivingRoute')}
                          >
                            {isRoutingLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Navigation className="w-3.5 h-3.5" />
                            )}
                            <span>{isRoutingLoading ? '...' : t('cardDirections')}</span>
                          </button>

                          {/* Button 2: Mở Google Maps chỉ đường */}
                          <a
                            href={getGoogleMapsDirUrl(userLocation, m.coordinates)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4ECE7] text-[#1E1B18] border border-[#E6DEC8] hover:border-[#D5C390] font-bold text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                            title={t('openGoogleMaps')}
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
                            <span>{t('googleMapsBtn')}</span>
                          </a>
                        </div>

                        {/* Button 3: Xem chi tiết & Audio */}
                        <button
                          type="button"
                          onClick={() => navigate(`/di-tich/${m.id}`)}
                          className="w-full py-2 px-3 rounded-xl bg-[#9E1B32] hover:bg-[#831427] active:bg-[#721021] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-[#9E1B32]/25 transition-all cursor-pointer"
                        >
                          <span>{t('cardDetailsAndAudio')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* ============================================================== */}
      {/* FLOATING ROUTE PANEL (Compact on Mobile & Desktop)             */}
      {/* ============================================================== */}
      {activeRoute && (
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-96 z-20 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-[#E6DEC8] animate-in fade-in slide-in-from-top-2 space-y-2 max-h-[75vh] flex flex-col">
          {/* Compact Top Header Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E5631] text-white flex items-center justify-center shadow-sm shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E5631]/10 text-[#1E5631] border border-[#1E5631]/20 uppercase tracking-wider">
                    {t('routeBannerTitle')}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1E1B18]">
                    {t('approxDuration', { min: activeRoute.durationMin })}
                  </span>
                  <span className="text-xs font-extrabold text-[#1E5631] font-mono">
                    ({activeRoute.distanceKm} km)
                  </span>
                </div>
                <h4 className="font-serif text-xs font-bold text-[#1E1B18] truncate max-w-[190px] sm:max-w-[220px] mt-0.5">
                  {t('routeDestination')}: {activeRoute.destination.displayName || activeRoute.destination.name}
                </h4>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClearRoute}
              className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-rose-50 hover:text-rose-600 text-[#766E65] border border-[#E6DEC8] transition-colors shrink-0 cursor-pointer"
              title={t('closeBanner')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <a
              href={getGoogleMapsDirUrl(userLocation, activeRoute.destination.coordinates)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] text-[#1E1B18] hover:bg-[#F4ECE7] font-bold text-[11px] sm:text-xs transition-colors border border-[#E6DEC8] hover:border-[#D5C390] text-center shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
              <span>{t('openGoogleMaps')}</span>
            </a>

            <button
              onClick={() => setShowStepsList(!showStepsList)}
              className="py-1.5 px-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE7] text-[#1E1B18] border border-[#E6DEC8] font-bold text-[11px] sm:text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{showStepsList ? t('hideDirections') : t('directionsSteps', { count: activeRoute.steps?.length || 0 })}</span>
              {showStepsList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Turn-by-Turn Steps List (Only shown when user expands it) */}
          {showStepsList && activeRoute.steps && (
            <div className="overflow-y-auto max-h-40 sm:max-h-52 pr-1 space-y-1.5 pt-1.5 border-t border-[#E6DEC8] text-xs">
              {activeRoute.steps.map((st, i) => {
                const isTurnRight = st.instruction?.includes('phải') || st.instruction?.includes('right');
                const isTurnLeft = st.instruction?.includes('trái') || st.instruction?.includes('left');
                const isArrive = st.instruction?.includes('Đến') || st.instruction?.includes('Arrive');

                return (
                  <div
                    key={i}
                    className="p-1.5 sm:p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE7]/40 border border-[#E6DEC8] flex items-start gap-2 transition-all shadow-2xs"
                  >
                    <div className="mt-0.5 text-[#1E5631] shrink-0">
                      {isArrive ? (
                        <Flag className="w-3.5 h-3.5 text-[#9E1B32]" />
                      ) : isTurnRight ? (
                        <CornerUpRight className="w-3.5 h-3.5 text-sky-700" />
                      ) : isTurnLeft ? (
                        <CornerUpLeft className="w-3.5 h-3.5 text-sky-700" />
                      ) : (
                        <ArrowUp className="w-3.5 h-3.5 text-[#766E65]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-[#1E1B18] leading-tight">
                        {st.instruction}
                      </p>
                      {st.distanceKm > 0 && (
                        <span className="text-[10px] text-[#766E65] font-mono">
                          {t('stepAfterKm', { km: st.distanceKm })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING MULTI-STOP TOUR TSP BANNER (Compact on Mobile)        */}
      {/* ============================================================== */}
      {!hideTourBanner && activeTour && (
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-96 z-20 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#D5C390] animate-in fade-in slide-in-from-top-2 space-y-2 max-h-[70vh] flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#9E1B32] text-white flex items-center justify-center shadow-sm shrink-0 font-black text-xs">
                TSP
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] border border-[#9E1B32]/20 uppercase tracking-wider">
                    {t('tourBannerTitle')}
                  </span>
                  {activeTour.savingPercent > 0 && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {t('tourSavingsMessage', { percent: activeTour.savingPercent })}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-xs font-bold text-[#1E1B18] mt-0.5 truncate">
                  {t('monumentStopsCount', { count: activeTour.orderedMonuments?.length })}
                </h4>
              </div>
            </div>

            <button
              onClick={onClearTour}
              className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-rose-50 hover:text-rose-600 text-[#766E65] border border-[#E6DEC8] transition-colors shrink-0 cursor-pointer"
              title={t('clearTourBtn')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-1.5 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-2xs">
              <span className="text-[9px] text-[#766E65] block font-semibold">{t('totalDistance')}</span>
              <span className="font-extrabold text-[#9E1B32] text-xs sm:text-sm font-mono">{activeTour.totalDistanceKm} km</span>
            </div>
            <div className="p-1.5 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-2xs">
              <span className="text-[9px] text-[#766E65] block font-semibold">{t('travelDuration')}</span>
              <span className="font-extrabold text-[#1E1B18] text-xs sm:text-sm">{t('approxDuration', { min: activeTour.totalDurationMin })}</span>
            </div>
          </div>

          {/* Numbered Itinerary Sequence */}
          <div className="overflow-y-auto max-h-48 pr-1 space-y-1.5 border-t border-[#E6DEC8] pt-2 text-xs">
            <p className="text-[11px] font-bold text-[#1E1B18] uppercase tracking-wider">
              {t('optimalSequenceTitle')}
            </p>
            {activeTour.orderedMonuments?.map((m, idx) => (
              <div
                key={m.id}
                onClick={() => navigate(`/di-tich/${m.id}`)}
                className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE7]/50 border border-[#E6DEC8] hover:border-[#D5C390] cursor-pointer flex items-center justify-between gap-2 transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#9E1B32] text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-2xs">
                    {idx + 1}
                  </span>
                  <span className="font-serif font-bold text-[#1E1B18] text-xs truncate group-hover:text-[#9E1B32] transition-colors">
                    {m.displayName || m.name}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#766E65] group-hover:text-[#9E1B32] shrink-0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING MAP CONTROLS (Bottom Right)                           */}
      {/* ============================================================== */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2">
        {/* Basemap Switcher Capsule with Full Name and Icon options */}
        <div className="bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-md border border-[#E6DEC8] flex flex-col gap-1">
          <button
            onClick={() => setBaseMap('street')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold cursor-pointer ${
              baseMap === 'street'
                ? 'bg-[#9E1B32] text-white shadow-xs'
                : 'text-[#4A453E] hover:bg-[#FAF7F2] hover:text-[#1E1B18]'
            }`}
            title={t('streetMapDesc')}
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span className="hidden sm:inline">{t('streetMapLabel')}</span>
          </button>

          <button
            onClick={() => setBaseMap('osm')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold cursor-pointer ${
              baseMap === 'osm'
                ? 'bg-[#9E1B32] text-white shadow-xs'
                : 'text-[#4A453E] hover:bg-[#FAF7F2] hover:text-[#1E1B18]'
            }`}
            title={t('cartoOsmDesc')}
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span className="hidden sm:inline">{t('cartoOsmLabel')}</span>
          </button>

          <button
            onClick={() => setBaseMap('satellite')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold cursor-pointer ${
              baseMap === 'satellite'
                ? 'bg-[#9E1B32] text-white shadow-xs'
                : 'text-[#4A453E] hover:bg-[#FAF7F2] hover:text-[#1E1B18]'
            }`}
            title={t('satelliteDesc')}
          >
            <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
            <span className="hidden sm:inline">{t('satelliteLabel')}</span>
          </button>
        </div>

        {/* Toggle Province Border */}
        <button
          data-testid="toggle-province-mask"
          onClick={() => setShowProvinceMask((prev) => !prev)}
          className={`bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#E6DEC8] transition-all flex items-center justify-center group cursor-pointer active:scale-95 ${
            showProvinceMask
              ? 'text-[#9E1B32] bg-[#FAF7F2] ring-1 ring-[#D5C390] shadow-sm'
              : 'text-[#766E65] hover:text-[#1E1B18] hover:bg-[#FAF7F2]'
          }`}
          title={
            showProvinceMask
              ? lang === 'en'
                ? 'Đồng Tháp Province Border: ON (Click to toggle)'
                : 'Đường biên giới Tỉnh Đồng Tháp: Đang BẬT (Bấm để tắt)'
              : lang === 'en'
                ? 'Đồng Tháp Province Border: OFF (Click to toggle)'
                : 'Đường biên giới Tỉnh Đồng Tháp: Đang TẮT (Bấm để bật)'
          }
        >
          {showProvinceMask ? (
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform text-[#9E1B32]" />
          ) : (
            <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform text-[#766E65]" />
          )}
        </button>

        {/* GPS Locate Me Button */}
        <button
          data-testid="gps-locate-me"
          onClick={onLocateUser}
          className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#E6DEC8] text-[#1E5631] hover:bg-[#FAF7F2] transition-all flex items-center justify-center group cursor-pointer active:scale-95"
          title={t('locateMeTooltip')}
        >
          <Crosshair className="w-5 h-5 group-hover:scale-110 transition-transform text-[#1E5631]" />
        </button>

        {/* Reset View Button */}
        <button
          data-testid="reset-dongthap-view"
          onClick={resetDongThapView}
          className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#E6DEC8] text-[#9E1B32] hover:bg-[#FAF7F2] transition-all flex items-center justify-center group cursor-pointer active:scale-95"
          title={lang === 'en' ? 'Reset to full Đồng Tháp Province view' : 'Về toàn cảnh Tỉnh Đồng Tháp'}
        >
          <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform text-[#9E1B32]" />
        </button>
      </div>

      {/* MAP WATERMARK / GEOFENCING STATUS CHIP (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E6DEC8] shadow-sm text-[11px] font-mono text-[#4A453E]">
        <span className={`w-2 h-2 rounded-full ${geofenceCheck.isValid ? 'bg-emerald-600 animate-pulse' : 'bg-rose-500'}`} />
        <span>
          {geofenceCheck.isValid
            ? t('mapWatermarkValid', { layer: tileLayers[baseMap].shortName })
            : t('mapWatermarkInvalid')}
        </span>
      </div>
    </div>
  );
}
