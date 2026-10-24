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
import { useNavigate } from 'react-router-dom';
import { createMonumentIcon, createUserGpsIcon } from './leafletIcons';
import { DONG_THAP_BOUNDS } from '../../data/monumentsData';
import { calculateDistanceKm, formatCurrency } from '../../utils/geoUtils';
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
} from 'lucide-react';

// Subcomponent to handle programmatic map camera movement
function MapController({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
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
  const [routePolyline, setRoutePolyline] = useState(null);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const mapRef = useRef(null);

  // When selected monument changes, update routing line if user location is available
  useEffect(() => {
    if (selectedMonument && userLocation) {
      setRoutePolyline([userLocation, selectedMonument.coordinates]);
    } else {
      setRoutePolyline(null);
    }
  }, [selectedMonument, userLocation]);

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

  const resetDongThapView = () => {
    if (mapRef.current) {
      mapRef.current.setView(DONG_THAP_BOUNDS.center, DONG_THAP_BOUNDS.defaultZoom, {
        animate: true,
      });
    }
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

          {/* Map Controller for smoothly moving camera */}
          {selectedMonument && (
            <MapController center={selectedMonument.coordinates} zoom={13} />
          )}

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

          {/* Route Line from User to Monument */}
          {routePolyline && (
            <Polyline
              positions={routePolyline}
              pathOptions={{
                color: '#E11D48',
                weight: 4.5,
                opacity: 0.9,
                dashArray: '8, 8',
              }}
            />
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

                      {/* Action buttons matching Stitch */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/di-tich/${m.id}`)}
                          className="flex-1 py-2 px-3 rounded-xl bg-lotus-600 hover:bg-lotus-700 active:bg-lotus-800 text-white font-semibold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-lotus-600/20 transition-all"
                        >
                          <span>Chi tiết & Audio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (userLocation) {
                              setRoutePolyline([userLocation, m.coordinates]);
                            } else {
                              onLocateUser();
                            }
                          }}
                          title="Vẽ tuyến đường đi"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-tram-50 hover:text-tram-700 text-slate-600 transition-colors"
                        >
                          <Navigation className="w-4 h-4" />
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

      {/* FLOATING MAP CONTROLS (Right Top / Side) */}
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
