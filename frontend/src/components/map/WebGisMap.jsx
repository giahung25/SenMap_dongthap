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
import { createMonumentIcon, createUserGpsIcon } from './leafletIcons';
import { DONG_THAP_BOUNDS } from '../../data/monumentsData';
import {
  calculateDistanceKm,
  formatCurrency,
  getGoogleMapsDirUrl,
} from '../../utils/geoUtils';
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
  Map,
  ExternalLink,
  X,
  Loader2,
} from 'lucide-react';

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
  activeRadius = null, // in km
  onLocateUser = () => {},
}) {
  const navigate = useNavigate();
  // Default to Google Maps Standard Street Map with full Vietnamese road network
  const [baseMap, setBaseMap] = useState('street'); 
  const [activeRoute, setActiveRoute] = useState(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);
  const mapRef = useRef(null);

  // 3 high-speed, reliable basemap layer options
  const tileLayers = {
    street: {
      id: 'street',
      name: 'Bản đồ Đường phố (Google)',
      shortName: 'Đường phố',
      icon: 'map',
      url: 'https://mt1.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps (Đồng Tháp, Việt Nam)',
      maxZoom: 20,
    },
    osm: {
      id: 'osm',
      name: 'Bản đồ CARTO Voyager / OSM',
      shortName: 'CARTO/OSM',
      icon: 'public',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap contributors',
      maxZoom: 19,
      subdomains: 'abcd',
    },
    satellite: {
      id: 'satellite',
      name: 'Ảnh Vệ tinh (Google Hybrid)',
      shortName: 'Vệ tinh',
      icon: 'satellite_alt',
      url: 'https://mt1.google.com/vt/lyrs=y&hl=vi&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Earth / Satellite Hybrid',
      maxZoom: 20,
    },
  };

  // Reset Dong Thap full view
  const resetDongThapView = () => {
    setActiveRoute(null);
    if (mapRef.current) {
      mapRef.current.setView(DONG_THAP_BOUNDS.center, DONG_THAP_BOUNDS.defaultZoom, {
        animate: true,
      });
    }
  };

  // On-demand route calculation via OSRM API (only when user clicks 'Lộ trình WebGIS')
  const handleRequestRoute = async (destMonument) => {
    if (!destMonument) return;

    let origin = userLocation;
    if (!origin) {
      onLocateUser();
      origin = [10.4494, 105.6295]; // Default: TP. Cao Lãnh
    }

    const [userLat, userLon] = origin;
    const [destLat, destLon] = destMonument.coordinates;

    setIsRoutingLoading(true);

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${destLon},${destLat}?overview=full&geometries=geojson`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // OSRM coordinates are [lon, lat], convert to Leaflet [lat, lon]
          const latLngs = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
          const distKm = Math.round((route.distance / 1000) * 10) / 10;
          const durMin = Math.round(route.duration / 60);

          const routeBounds = L.latLngBounds(latLngs);
          setActiveRoute({
            coords: latLngs,
            distanceKm: distKm,
            durationMin: durMin,
            destination: destMonument,
            bounds: routeBounds,
          });
          setIsRoutingLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('OSRM routing request failed or timed out, using direct route fallback:', err);
    }

    // Fallback direct line if OSRM is unreachable
    const directDist = calculateDistanceKm(origin, destMonument.coordinates);
    const estMinutes = Math.round((directDist / 40) * 60);
    const fallbackCoords = [origin, destMonument.coordinates];
    const fallbackBounds = L.latLngBounds(fallbackCoords);

    setActiveRoute({
      coords: fallbackCoords,
      distanceKm: directDist,
      durationMin: estMinutes,
      destination: destMonument,
      bounds: fallbackBounds,
    });
    setIsRoutingLoading(false);
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-200">
      {/* Absolute container ensuring 100% dimensions for Leaflet */}
      <div className="absolute inset-0 w-full h-full">
        <MapContainer
          center={DONG_THAP_BOUNDS.center}
          zoom={DONG_THAP_BOUNDS.defaultZoom}
          className="w-full h-full z-0"
          zoomControl={false}
          ref={mapRef}
        >
          {/* Key ensures TileLayer dynamically updates URL when baseMap state changes */}
          <TileLayer
            key={baseMap}
            url={tileLayers[baseMap].url}
            attribution={tileLayers[baseMap].attribution}
            maxZoom={tileLayers[baseMap].maxZoom || 19}
            subdomains={tileLayers[baseMap].subdomains || 'abc'}
          />

          {/* Fix layout shifts and container invalidation */}
          <MapResizeFix />

          {/* Map Controller: fitBounds when route is active, or view when monument is selected */}
          {activeRoute ? (
            <MapController bounds={activeRoute.bounds} />
          ) : selectedMonument ? (
            <MapController center={selectedMonument.coordinates} zoom={13} />
          ) : null}

          {/* User GPS Location Marker */}
          {userLocation && (
            <Marker position={userLocation} icon={createUserGpsIcon()}>
              <Popup className="custom-leaflet-popup">
                <div className="p-3 text-center bg-white min-w-[180px]">
                  <div className="inline-flex p-1.5 rounded-full bg-tram-100 text-tram-700 mb-1">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">Vị trí của bạn</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {userLocation[0].toFixed(4)}° N, {userLocation[1].toFixed(4)}° E
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Radius Search Circle */}
          {userLocation && activeRadius && (
            <Circle
              center={userLocation}
              radius={activeRadius * 1000}
              pathOptions={{
                color: '#059669',
                fillColor: '#10B981',
                fillOpacity: 0.12,
                weight: 2,
                dashArray: '6, 6',
              }}
            />
          )}

          {/* REAL DRIVING ROUTE POLYLINE (Only rendered on-demand when user clicks Lộ trình) */}
          {activeRoute && (
            <>
              {/* White casing outline for road line */}
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
                  color: '#059669',
                  weight: 5,
                  opacity: 1,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </>
          )}

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
                  <div className="w-[290px] sm:w-[310px] bg-white rounded-2xl overflow-hidden shadow-2xl">
                    {/* Hero Thumbnail */}
                    <div className="relative w-full h-36 bg-slate-900 overflow-hidden">
                      <img
                        src={m.thumbnail}
                        alt={m.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                      {/* Ranking Tag Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-lotus-600/95 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                        <span className="material-symbols-outlined text-[13px]">
                          stars
                        </span>
                        <span>{m.ranking}</span>
                      </div>

                      {/* Title over dark overlay */}
                      <div className="absolute bottom-2 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-semibold text-lotus-200 tracking-wider">
                          {m.category}
                        </span>
                        <h3 className="font-bold text-[15px] leading-snug truncate drop-shadow-sm text-white">
                          {m.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-3.5 space-y-2.5 bg-white">
                      <div className="flex items-start gap-1.5 text-slate-600 text-[12px] leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-lotus-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{m.address}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-tram-600" />
                          <span>{m.openingHours}</span>
                        </span>
                        {dist !== null && (
                          <span className="px-2 py-0.5 rounded-full bg-tram-50 text-tram-700 font-bold font-mono">
                            Cách {dist} km
                          </span>
                        )}
                      </div>

                      {/* Action buttons with OSRM and Google Maps navigation */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          {/* Button 1: Chỉ đường WebGIS OSRM */}
                          <button
                            type="button"
                            onClick={() => handleRequestRoute(m)}
                            disabled={isRoutingLoading}
                            className="flex-1 py-2 px-2.5 rounded-xl bg-tram-600 hover:bg-tram-700 active:bg-tram-800 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm transition-all disabled:opacity-60"
                            title="Vẽ lộ trình đường giao thông thực tế"
                          >
                            {isRoutingLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Navigation className="w-3.5 h-3.5" />
                            )}
                            <span>{isRoutingLoading ? 'Đang vẽ...' : 'Lộ trình WebGIS'}</span>
                          </button>

                          {/* Button 2: Mở Google Maps chỉ đường */}
                          <a
                            href={getGoogleMapsDirUrl(userLocation, m.coordinates)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
                            title="Mở Google Maps chỉ đường trong tab mới"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                            <span>Google Maps</span>
                          </a>
                        </div>

                        {/* Button 3: Xem chi tiết & Audio */}
                        <button
                          type="button"
                          onClick={() => navigate(`/di-tich/${m.id}`)}
                          className="w-full py-2 px-3 rounded-xl bg-lotus-600 hover:bg-lotus-700 active:bg-lotus-800 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-lotus-600/20 transition-all"
                        >
                          <span>Xem Chi tiết & Thuyết minh Audio</span>
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
      {/* FLOATING ROUTE INFORMATION BANNER (Shown when route is active)  */}
      {/* ============================================================== */}
      {activeRoute && (
        <div className="absolute top-4 left-4 z-20 max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-glass-lg border border-tram-200 animate-in fade-in slide-in-from-top-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-tram-600 text-white flex items-center justify-center shadow-md shadow-tram-600/25 shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-tram-100 text-tram-800 uppercase tracking-wider">
                    Lộ trình giao thông
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    ~{activeRoute.durationMin} phút lái xe
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[250px] mt-0.5">
                  Đến: {activeRoute.destination.name}
                </h4>
              </div>
            </div>

            {/* Close / Clear Route Button */}
            <button
              onClick={handleClearRoute}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-colors"
              title="Tắt chỉ đường"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">
              Quãng đường: <strong className="text-tram-700 font-bold">{activeRoute.distanceKm} km</strong>
            </span>

            <a
              href={getGoogleMapsDirUrl(userLocation, activeRoute.destination.coordinates)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-[11px] transition-colors border border-sky-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở Google Maps</span>
            </a>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING MAP CONTROLS (Right Top / Side)                       */}
      {/* ============================================================== */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Basemap Switcher Capsule with Full Name and Icon options */}
        <div className="glass-panel p-1 rounded-2xl shadow-glass flex flex-col gap-1">
          <button
            onClick={() => setBaseMap('street')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${
              baseMap === 'street'
                ? 'bg-lotus-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80'
            }`}
            title="Bản đồ đường phố tiêu chuẩn Google Maps (Đồng Tháp có tên đường, sông Tiền, sông Hậu tiếng Việt)"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span className="hidden sm:inline">Đường phố</span>
          </button>

          <button
            onClick={() => setBaseMap('osm')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${
              baseMap === 'osm'
                ? 'bg-lotus-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80'
            }`}
            title="Bản đồ CARTO Voyager / OpenStreetMap"
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span className="hidden sm:inline">CARTO/OSM</span>
          </button>

          <button
            onClick={() => setBaseMap('satellite')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold ${
              baseMap === 'satellite'
                ? 'bg-lotus-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100/80'
            }`}
            title="Bản đồ ảnh vệ tinh Google Hybrid có nhãn đường"
          >
            <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
            <span className="hidden sm:inline">Vệ tinh</span>
          </button>
        </div>

        {/* GPS Locate Me Button */}
        <button
          onClick={onLocateUser}
          className="glass-panel p-3 rounded-2xl shadow-glass text-slate-700 hover:text-tram-700 hover:bg-tram-50 transition-all flex items-center justify-center group"
          title="Định vị vị trí GPS của bạn"
        >
          <Crosshair className="w-5 h-5 group-hover:scale-110 transition-transform text-tram-600" />
        </button>

        {/* Reset View Button */}
        <button
          onClick={resetDongThapView}
          className="glass-panel p-3 rounded-2xl shadow-glass text-slate-700 hover:text-lotus-600 hover:bg-lotus-50 transition-all flex items-center justify-center group"
          title="Toàn cảnh tỉnh Đồng Tháp"
        >
          <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform text-lotus-600" />
        </button>
      </div>

      {/* MAP WATERMARK / COORDINATES STATUS CHIP (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel shadow-sm text-[11px] font-mono text-slate-600">
        <span className="w-2 h-2 rounded-full bg-tram-500 animate-pulse" />
        <span>Hệ tọa độ VN-2000 / WGS-84 (Đồng Tháp) &bull; Lớp: {tileLayers[baseMap].name}</span>
      </div>
    </div>
  );
}
