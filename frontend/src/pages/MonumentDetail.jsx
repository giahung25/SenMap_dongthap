import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { monumentApi } from '../services/api';
import { calculateDistanceKm, formatCurrency, getGoogleMapsDirUrl } from '../utils/geoUtils';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap } from 'react-leaflet';
import { createMonumentIcon } from '../components/map/leafletIcons';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMonument } from '../data/monumentsTranslationsEn';
import { SITE_MAPS_DATA } from '../data/siteMapsData';
import { getMonumentSeal } from '../data/culturalHeritageData';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Ticket,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  Sparkles,
  QrCode as QrIcon,
  Download,
  Printer,
  Eye,
  ScanLine,
  Compass,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
  Award,
  X,
  Maximize2,
  ChevronRight,
  Footprints,
} from 'lucide-react';

// Subcomponent to fix container size & resize issues (eliminating blank/grey tiles)
function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Subcomponent to animate view transitions when selecting sub-pois
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.flyTo(center, zoom || 18, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom DivIcon for Micro-GIS Sub-POIs
function createSubPoiIcon(poi, isSelected = false) {
  const size = isSelected ? 34 : 26;
  const bgColor = isSelected ? '#9E1B32' : '#1E5631';
  const ringColor = isSelected ? '#D5C390' : '#FFFFFF';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transition-transform transform ${
      isSelected ? 'scale-110' : 'hover:scale-110'
    }" style="width: ${size}px; height: ${size}px;">
      <div class="w-full h-full rounded-full text-white flex items-center justify-center shadow-md font-bold text-xs" style="background-color: ${bgColor}; box-shadow: 0 0 0 2px ${ringColor};">
        ${poi.order || '•'}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'sub-poi-marker-wrapper',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

export default function MonumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [monument, setMonument] = useState(null);
  const [nearbyList, setNearbyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Audio Tour Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // percentage
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [selectedVoice, setSelectedVoice] = useState(lang === 'en' ? 'en-us' : 'nu-nam-bo');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Micro-GIS and 360 VR State
  const [activeMapMode, setActiveMapMode] = useState('micro'); // 'micro' | 'macro'
  const [selectedSubPoi, setSelectedSubPoi] = useState(null);
  const [showVrModal, setShowVrModal] = useState(false);

  const durationSeconds = 265; // 04:25 standard tour length
  const [userLocation, setUserLocation] = useState([10.4494, 105.6295]);
  const speechUtteranceRef = useRef(null);

  // Update selected voice when language changes
  useEffect(() => {
    if (lang === 'en') {
      setSelectedVoice('en-us');
    } else {
      setSelectedVoice('nu-nam-bo');
    }
    // Cancel speaking if language switches while audio is playing
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentTime(0);
      setAudioProgress(0);
    }
  }, [lang]);

  // Clean up Web Speech API upon unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  // Get user GPS position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {}
      );
    }
  }, []);

  // Load Monument & Nearby
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    monumentApi.getAll().then((all) => {
      if (!mounted) return;
      const numericId = Number(id);
      const found = all.find((m) => m.id === numericId) || all[0];
      setMonument(found);
      setSelectedImage(found?.thumbnail || `/images/monuments/monument_${found?.id}.jpg`);

      // Generate QR Code with current language query param preserved
      const currentUrl = `${window.location.origin}/di-tich/${found?.id}?lang=${lang}`;
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: { dark: '#1E1B18', light: '#FFFFFF' },
      })
        .then((url) => {
          if (mounted) setQrDataUrl(url);
        })
        .catch(console.error);

      // Find nearby monuments
      if (found) {
        const sorted = all
          .filter((m) => m.id !== found.id)
          .map((m) => ({
            ...m,
            distance: calculateDistanceKm(found.coordinates, m.coordinates),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 4);
        setNearbyList(sorted);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [id, lang]);

  // Localize monument and nearby list
  const localizedMonument = useMemo(() => {
    return monument ? getLocalizedMonument(monument, lang) : null;
  }, [monument, lang]);

  const localizedNearby = useMemo(() => {
    return nearbyList.map((m) => getLocalizedMonument(m, lang));
  }, [nearbyList, lang]);

  // Look up Micro-GIS Site Map data for this monument
  const siteMap = useMemo(() => {
    if (!monument) return null;
    return SITE_MAPS_DATA.find((s) => s.monument_id === monument.id) || null;
  }, [monument]);

  // Authentic Red Seal stamp
  const monumentSeal = useMemo(() => {
    return monument ? getMonumentSeal(monument.id, lang) : null;
  }, [monument, lang]);

  // Audio Player timer simulation synced with speech
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1 * playbackSpeed;
          setAudioProgress(Math.min(100, (next / durationSeconds) * 100));
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const formatAudioTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Web Speech API Voice synthesis
  const handleToggleAudio = () => {
    if (typeof window === 'undefined') return;

    const synth = window.speechSynthesis;
    if (!synth) {
      // Fallback timer only
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        synth.cancel();
        const scriptText =
          localizedMonument?.displayAudioScript || localizedMonument?.displayHistory || '';
        const utterance = new SpeechSynthesisUtterance(scriptText);

        if (lang === 'en') {
          utterance.lang = selectedVoice === 'en-gb' ? 'en-GB' : 'en-US';
          const voices = synth.getVoices() || [];
          const targetVoice = voices.find((v) =>
            selectedVoice === 'en-gb'
              ? v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('British')
              : v.lang.includes('en-US') || v.name.includes('US') || v.name.includes('American')
          );
          if (targetVoice) utterance.voice = targetVoice;
        } else {
          utterance.lang = 'vi-VN';
          const voices = synth.getVoices() || [];
          const viVoice = voices.find((v) => v.lang.includes('vi'));
          if (viVoice) utterance.voice = viVoice;
        }

        utterance.rate = playbackSpeed;
        utterance.volume = isMuted ? 0 : 1;

        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(100);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        speechUtteranceRef.current = utterance;
        synth.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleRestartAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentTime(0);
    setAudioProgress(0);
    setIsPlaying(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: localizedMonument?.displayName,
          text: `${localizedMonument?.displayName} — ${t('brandTagline')}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('shareCopied'));
    }
  };

  if (loading || !localizedMonument) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-3 text-[#4A453E]">
          <div className="w-10 h-10 border-4 border-[#F4ECE7] border-t-[#9E1B32] rounded-full animate-spin" />
          <p className="text-xs font-semibold">{t('loadingHeritage')}</p>
        </div>
      </div>
    );
  }

  const isSpecial = localizedMonument.ranking === 'Quốc gia đặc biệt';
  const isNational = localizedMonument.ranking === 'Quốc gia';

  // Map center and zoom
  const currentMapCenter =
    activeMapMode === 'micro' && siteMap
      ? selectedSubPoi
        ? [selectedSubPoi.lat, selectedSubPoi.lon]
        : siteMap.center
      : localizedMonument.coordinates;

  const currentMapZoom =
    activeMapMode === 'micro' && siteMap
      ? selectedSubPoi
        ? 19
        : siteMap.recommended_zoom || 18
      : 14;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7F2] text-[#1E1B18] pb-16 font-sans">
      {/* ============================================================ */}
      {/* TOP BREADCRUMB HEADER (WARM IVORY PAPER + SUBTLE BORDER)       */}
      {/* ============================================================ */}
      <div className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC8] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#4A453E] truncate">
            <Link to="/" className="flex items-center gap-1 hover:text-[#9E1B32] font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToMap')}</span>
            </Link>
            <span className="text-[#E6DEC8]">/</span>
            <span className="text-[#4A453E] truncate hidden sm:inline">
              {localizedMonument.displayDistrict}
            </span>
            <span className="text-[#E6DEC8] hidden sm:inline">/</span>
            <span className="font-bold text-[#1E1B18] truncate">
              {localizedMonument.displayName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getGoogleMapsDirUrl(userLocation, localizedMonument.coordinates)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tram-emerald hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs"
              title={t('openGoogleMaps')}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('googleMapsBtn')}</span>
            </a>
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-[#F4ECE7] text-[#9E1B32] border-[#D5C390]'
                  : 'bg-white text-[#4A453E] border-[#E6DEC8] hover:bg-[#F4ECE7]'
              }`}
              title={t('saveFavorite')}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#9E1B32]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-white text-[#4A453E] border border-[#E6DEC8] hover:bg-[#F4ECE7] transition-colors"
              title={t('shareMonument')}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 space-y-8">
        {/* ============================================================ */}
        {/* 1. HERO BANNER & EDITORIAL HEADER (EDITORIAL HERITAGE)        */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E6DEC8]">
          <div className="relative w-full h-80 sm:h-[420px] bg-[#FAF7F2] overflow-hidden">
            <img
              src={
                selectedImage ||
                localizedMonument.thumbnail ||
                `/images/monuments/monument_${localizedMonument.id}.jpg`
              }
              alt=""
              aria-label={localizedMonument.displayName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/monuments/monument_${localizedMonument.id}.jpg`;
              }}
            />
            {/* Gradient Overlay protecting legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/95 via-[#1E1B18]/40 to-transparent" />

            {/* Ranking Badge Top-Left */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: isSpecial ? '#D5C390' : isNational ? '#9E1B32' : '#1E5631',
                color: isSpecial ? '#1E1B18' : '#FFFFFF',
              }}
            >
              <span className="material-symbols-outlined text-[15px]">
                {isSpecial ? 'stars' : 'account_balance'}
              </span>
              <span>{localizedMonument.displayRanking}</span>
            </div>

            {/* 360 VR Tour Trigger Top-Right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowVrModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#1E1B18] hover:bg-[#9E1B32] hover:text-white transition-all shadow-md text-xs font-bold border border-[#E6DEC8] backdrop-blur-sm"
                title={isEn ? 'Explore 360° VR View' : 'Khám phá không gian thực tế ảo 360°'}
              >
                <Eye className="w-3.5 h-3.5 text-[#9E1B32]" />
                <span>{isEn ? '360° Virtual Tour' : 'Trải Nghiệm 360° VR'}</span>
              </button>
            </div>

            {/* Title & Metadata Bottom */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-[#FAF7F2]">
                  {localizedMonument.displayCategory}
                </span>
                {localizedMonument.displayOtherName && (
                  <span className="font-serif italic text-xs sm:text-sm text-[#D5C390]">
                    "{localizedMonument.displayOtherName}"
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
                {localizedMonument.displayName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#FAF7F2]/90 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#D5C390] shrink-0" />
                  <span>{localizedMonument.displayAddress}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-[#FAF7F2]/70" />
                  <span>
                    {t('viewsCount', { count: (localizedMonument.views || 4850).toLocaleString() })}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <ScanLine className="w-4 h-4 text-[#34D399]" />
                  <span>
                    {t('qrScansCount', {
                      count: (localizedMonument.qrScans || 1420).toLocaleString(),
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Bar in Warm Ivory #F4ECE7 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DEC8] bg-[#F4ECE7]/60 border-t border-[#E6DEC8] text-xs">
            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#9E1B32] border border-[#E6DEC8] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#4A453E] text-[10px] uppercase font-bold tracking-wider">
                  {t('heritageRankCol')}
                </p>
                <p className="font-bold text-[#1E1B18]">{localizedMonument.displayRanking}</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#1E5631] border border-[#E6DEC8] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#4A453E] text-[10px] uppercase font-bold tracking-wider">
                  {t('openingHoursCol')}
                </p>
                <p className="font-bold text-[#1E1B18]">{localizedMonument.displayOpeningHours}</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#D5C390] border border-[#E6DEC8] flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#4A453E] text-[10px] uppercase font-bold tracking-wider">
                  {t('admissionFeeCol')}
                </p>
                <p className="font-bold text-[#1E1B18]">
                  {localizedMonument.ticketPrice > 0
                    ? formatCurrency(localizedMonument.ticketPrice)
                    : t('freeAdmission')}
                </p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#0284C7] border border-[#E6DEC8] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#4A453E] text-[10px] uppercase font-bold tracking-wider">
                  {t('districtCol')}
                </p>
                <p className="font-bold text-[#1E1B18]">{localizedMonument.displayDistrict}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. AUDIO TOUR PLAYER & NARRATOR (SENMAP EDITORIAL AUDIO)      */}
        {/* ============================================================ */}
        <section className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E6DEC8] shadow-md shadow-[#9E1B32]/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DEC8]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#9E1B32] text-white flex items-center justify-center shadow-lg shadow-[#9E1B32]/30 shrink-0">
                <span className="material-symbols-outlined text-[26px]">headphones</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#1E1B18]">{t('audioTourTitle')}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#F4ECE7] text-[#9E1B32] border border-[#E6DEC8] font-extrabold text-[10px] uppercase">
                    {t('aiVoiceBadge')}
                  </span>
                </div>
                <p className="text-xs text-[#4A453E]">{t('audioTourSubtitle')}</p>
              </div>
            </div>

            {/* Voice Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-[#4A453E] font-medium hidden sm:inline">
                {t('voiceLabel')}
              </span>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="h-8 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#E6DEC8] text-xs font-semibold text-[#1E1B18] outline-none focus:ring-1 focus:ring-[#9E1B32]"
              >
                {lang === 'en' ? (
                  <>
                    <option value="en-us">{t('voiceEnglishFemale')}</option>
                    <option value="en-gb">{t('voiceEnglishMale')}</option>
                  </>
                ) : (
                  <>
                    <option value="nu-nam-bo">{t('voiceSouthernFemale')}</option>
                    <option value="nam-nam-bo">{t('voiceSouthernMale')}</option>
                    <option value="nu-bac-bo">{t('voiceNorthernFemale')}</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Progress Bar & Timers with Tatami Gold Accent */}
          <div className="space-y-1.5 pt-1">
            <div className="relative w-full h-2.5 bg-[#EFE8DC] rounded-full overflow-hidden cursor-pointer group">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#9E1B32] via-rose-500 to-[#D5C390] rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#4A453E]">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{monument.audioDuration || '04:25'}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl text-[#4A453E] hover:bg-[#FAF7F2] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-[#9E1B32]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                  setPlaybackSpeed(nextSpeed);
                }}
                className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#E6DEC8] text-[11px] font-bold text-[#1E1B18] hover:bg-white"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Play / Pause Main CTA with Web Speech API */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRestartAudio}
                className="p-2 rounded-full text-[#4A453E] hover:text-[#1E1B18] transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleToggleAudio}
                className="w-13 h-13 rounded-full bg-[#9E1B32] hover:bg-[#831427] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#9E1B32]/30 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#1E5631] font-bold bg-[#F4ECE7] border border-[#E6DEC8] px-2.5 py-1 rounded-lg">
                {t('audioQuality')}
              </span>
            </div>
          </div>

          {/* Real-time Subtitle box with Tatami border accent */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC8] text-xs sm:text-sm text-[#4A453E] italic leading-relaxed">
            <span className="font-serif font-bold text-[#9E1B32] not-italic mr-1.5">
              {t('narratorQuoteLabel')}
            </span>
            "{localizedMonument.displayAudioScript || localizedMonument.displayHistory}"
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. NỘI DUNG LỊCH SỬ, THƯ VIỆN ẢNH & SƠ ĐỒ NỘI KHU MICRO-GIS   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái (2/3): Lịch sử & Thư viện ảnh */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lịch sử di tích với Editorial Drop Cap */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DEC8] shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9E1B32] text-[24px]">
                  history_edu
                </span>
                <span>{t('historyValueTitle')}</span>
              </h3>

              <div className="max-w-none text-sm sm:text-base text-[#4A453E] leading-[1.8] space-y-4">
                <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#9E1B32] first-letter:mr-2.5 first-letter:float-left">
                  {localizedMonument.displayHistory}
                </p>
                <p className="clear-both">{t('historyParagraph2')}</p>
              </div>

              {/* Pull quote highlight block with Tatami Gold border */}
              <div className="border-l-4 border-[#D5C390] pl-4 py-2 bg-[#FAF7F2] rounded-r-2xl my-3">
                <p className="font-serif italic text-xs sm:text-sm text-[#1E1B18] leading-relaxed">
                  {isEn
                    ? `“Preserving the ancient soul of Đồng Tháp: Where sacred history meets the resilient spirit of the Mekong Delta.”`
                    : `“Lưu giữ hồn thiêng sông núi Đất Sen Hồng: Nơi hào khí phương Nam giao hòa cùng mạch nguồn di sản trường tồn.”`}
                </p>
              </div>

              {/* Lưu ý tham quan */}
              {localizedMonument.displayNote && (
                <div className="p-4 rounded-2xl bg-[#F4ECE7] border border-[#E6DEC8] text-xs text-[#1E1B18] space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-[#9E1B32]">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>{t('visitorNoticeTitle')}</span>
                  </span>
                  <p className="leading-relaxed text-[#4A453E]">{localizedMonument.displayNote}</p>
                </div>
              )}
            </div>

            {/* Bộ sưu tập hình ảnh thực địa */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DEC8] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#1E1B18] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1E5631] text-[24px]">
                    photo_library
                  </span>
                  <span>{t('photoGalleryTitle')}</span>
                </h3>
                <span className="text-xs text-[#4A453E]">
                  {localizedMonument.gallery?.length || 0} {isEn ? 'photos' : 'hình ảnh'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {localizedMonument.gallery?.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`h-24 sm:h-28 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                      selectedImage === imgUrl
                        ? 'border-[#9E1B32] scale-95 shadow-md'
                        : 'border-transparent hover:border-[#D5C390]'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải (1/3): Sơ đồ Micro-GIS, Mã QR & Di tích lân cận */}
          <div className="space-y-6">
            {/* ============================================================ */}
            {/* 4. SƠ ĐỒ CHI TIẾT NỘI KHU (MICRO-GIS PRECINCT SITE MAP)       */}
            {/* ============================================================ */}
            <div className="bg-white p-5 rounded-3xl border border-[#E6DEC8] shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-[#1E1B18] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#9E1B32]" />
                  <span>
                    {activeMapMode === 'micro' && siteMap
                      ? isEn
                        ? 'Micro-GIS Precinct Map'
                        : 'Sơ Đồ Chi Tiết Nội Khu'
                      : t('spatialGisTitle')}
                  </span>
                </h4>

                {/* Map Mode Selector (Micro vs Macro) */}
                {siteMap && (
                  <div className="flex items-center rounded-xl bg-[#FAF7F2] p-0.5 border border-[#E6DEC8] text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMapMode('micro');
                        setSelectedSubPoi(null);
                      }}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activeMapMode === 'micro'
                          ? 'bg-[#9E1B32] text-white shadow-2xs'
                          : 'text-[#4A453E] hover:text-[#1E1B18]'
                      }`}
                    >
                      Micro-GIS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMapMode('macro');
                        setSelectedSubPoi(null);
                      }}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activeMapMode === 'macro'
                          ? 'bg-[#1E5631] text-white shadow-2xs'
                          : 'text-[#4A453E] hover:text-[#1E1B18]'
                      }`}
                    >
                      Macro
                    </button>
                  </div>
                )}
              </div>

              {/* Leaflet Dual-Scale Container */}
              <div className="relative h-60 rounded-2xl overflow-hidden border border-[#E6DEC8] bg-[#F4ECE7]">
                <MapContainer
                  center={currentMapCenter}
                  zoom={currentMapZoom}
                  className="w-full h-full"
                  zoomControl={false}
                >
                  <TileLayer
                    url={`https://mt1.google.com/vt/lyrs=m&hl=${lang === 'en' ? 'en' : 'vi'}&x={x}&y={y}&z={z}`}
                    attribution="&copy; Google Maps"
                    maxZoom={20}
                  />
                  <MapResizeFix />
                  <MapViewController center={currentMapCenter} zoom={currentMapZoom} />

                  {/* Micro-GIS Elements */}
                  {activeMapMode === 'micro' && siteMap ? (
                    <>
                      {/* Boundary Polygon */}
                      {siteMap.boundary_polygon && siteMap.boundary_polygon.length > 0 && (
                        <Polygon
                          positions={siteMap.boundary_polygon}
                          pathOptions={{
                            color: '#9E1B32',
                            weight: 2,
                            fillColor: '#D5C390',
                            fillOpacity: 0.18,
                            dashArray: '4, 4',
                          }}
                        />
                      )}

                      {/* Walking Tour Trail */}
                      {siteMap.walking_trail && siteMap.walking_trail.length > 0 && (
                        <Polyline
                          positions={siteMap.walking_trail}
                          pathOptions={{
                            color: '#1E5631',
                            weight: 3,
                            dashArray: '6, 8',
                          }}
                        />
                      )}

                      {/* Sub-POIs Markers */}
                      {siteMap.sub_pois?.map((poi) => (
                        <Marker
                          key={poi.code}
                          position={[poi.lat, poi.lon]}
                          icon={createSubPoiIcon(poi, selectedSubPoi?.code === poi.code)}
                          eventHandlers={{
                            click: () => setSelectedSubPoi(poi),
                          }}
                        >
                          <Popup className="custom-leaflet-popup">
                            <div className="p-1 space-y-1 text-xs">
                              <p className="font-bold text-[#9E1B32]">
                                {poi.order}. {isEn ? poi.name_en : poi.name_vi}
                              </p>
                              <p className="text-[#4A453E] text-[11px] leading-snug">
                                {isEn ? poi.desc_en : poi.desc_vi}
                              </p>
                              <p className="text-[10px] text-[#1E5631] font-semibold">
                                ⏱️ {poi.duration_min} {isEn ? 'mins' : 'phút tham quan'}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </>
                  ) : (
                    /* Macro-GIS View */
                    <Marker
                      position={localizedMonument.coordinates}
                      icon={createMonumentIcon(localizedMonument, true)}
                    />
                  )}
                </MapContainer>
              </div>

              {/* Sub-POIs Step-by-Step Walking Tour List */}
              {activeMapMode === 'micro' && siteMap?.sub_pois && siteMap.sub_pois.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#4A453E]">
                    <span className="flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5 text-[#1E5631]" />
                      <span>{isEn ? 'Precinct Walking Points:' : 'Lộ trình tham quan nội khu:'}</span>
                    </span>
                    <span className="text-[10px] text-[#9E1B32]">
                      {siteMap.sub_pois.length} {isEn ? 'stops' : 'điểm dừng'}
                    </span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {siteMap.sub_pois.map((poi) => {
                      const isSel = selectedSubPoi?.code === poi.code;
                      return (
                        <button
                          key={poi.code}
                          type="button"
                          onClick={() => setSelectedSubPoi(poi)}
                          className={`shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 ${
                            isSel
                              ? 'bg-[#9E1B32] text-white border-[#9E1B32] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#4A453E] border-[#E6DEC8] hover:bg-[#F4ECE7]'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[9px]">
                            {poi.order}
                          </span>
                          <span className="truncate max-w-[120px]">
                            {isEn ? poi.name_en : poi.name_vi}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn-washi-outline flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#9E1B32]" />
                  <span>{t('openWebGisBtn')}</span>
                </button>

                <a
                  href={getGoogleMapsDirUrl(userLocation, localizedMonument.coordinates)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tram-emerald flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs text-center"
                  title={t('openGoogleMaps')}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('googleMapsBtn')}</span>
                </a>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 5. MÃ QR THÔNG MINH & CON DẤU MỘC ĐỎ CHU SA                   */}
            {/* ============================================================ */}
            <div className="bg-white p-5 rounded-3xl border border-[#E6DEC8] shadow-xs text-center space-y-4">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1E1B18] uppercase tracking-wider font-serif">
                <QrIcon className="w-4 h-4 text-[#9E1B32]" />
                <span>{t('identityQrTitle')}</span>
              </div>

              {/* QR Container with Authentic Stamp Preview */}
              <div className="relative inline-block p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC8] shadow-inner">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Mã QR" className="w-36 h-36 mx-auto rounded-lg" />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center text-[#4A453E] text-xs">
                    {t('generatingQr')}
                  </div>
                )}

                {/* Overlaid Red Seal Stamp (-3deg tilt) */}
                {monumentSeal && (
                  <div
                    className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full border-2 border-dashed border-[#9E1B32] p-1 bg-white shadow-md flex items-center justify-center"
                    style={{ transform: 'rotate(-4deg)' }}
                    title={monumentSeal.displayMotto || 'Bảo chứng Di sản'}
                  >
                    <div className="w-full h-full rounded-full border border-[#9E1B32] flex flex-col items-center justify-center text-[7px] text-[#9E1B32] font-black leading-tight">
                      <span className="material-symbols-outlined text-[14px]">
                        {monumentSeal.motif_icon || 'local_florist'}
                      </span>
                      <span className="truncate max-w-[50px]">{monumentSeal.seal_code}</span>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-[#4A453E] leading-snug">{t('scanOnSiteHint')}</p>

              <div className="flex items-center justify-center gap-2 pt-1">
                {qrDataUrl && (
                  <a
                    href={qrDataUrl}
                    download={`SenMap_QR_DiTich_${localizedMonument.id}_DongThap.png`}
                    className="btn-washi-outline py-1.5 px-3 rounded-xl text-xs flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('downloadQrBtn')}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-lotus-crimson py-1.5 px-3 rounded-xl text-xs flex items-center gap-1 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('printA5Btn')}</span>
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 6. DI TÍCH LÂN CẬN (NEARBY HERITAGE SITES)                    */}
            {/* ============================================================ */}
            <div className="bg-white p-5 rounded-3xl border border-[#E6DEC8] shadow-xs space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#1E1B18] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D5C390]" />
                <span>{t('nearbyMonumentsTitle')}</span>
              </h4>

              <div className="space-y-2">
                {localizedNearby.map((near) => (
                  <div
                    key={near.id}
                    onClick={() => navigate(`/di-tich/${near.id}`)}
                    className="p-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F4ECE7] border border-[#E6DEC8] cursor-pointer transition-all flex items-center gap-2.5 group"
                  >
                    <img
                      src={near.thumbnail || `/images/monuments/monument_${near.id}.jpg`}
                      alt=""
                      aria-label={near.displayName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/images/monuments/monument_${near.id}.jpg`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-xs font-bold text-[#1E1B18] truncate group-hover:text-[#9E1B32] transition-colors">
                        {near.displayName}
                      </h5>
                      <p className="text-[10px] text-[#4A453E]">
                        {t('distanceKmAway')} {near.distance} km
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4A453E] group-hover:text-[#9E1B32] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 360° VR PANORAMA MODAL                                       */}
      {/* ============================================================ */}
      {showVrModal && (
        <div className="fixed inset-0 z-[1200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E6DEC8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#9E1B32]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E1B18]">
                  {isEn ? '360° Virtual Reality Panoramic Tour' : 'Không Gian Thực Tế Ảo 360°'} — {localizedMonument.displayName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVrModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6DEC8] text-[#4A453E] hover:text-[#9E1B32] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Panorama Simulated Viewer */}
            <div className="relative w-full h-80 sm:h-[460px] bg-slate-900 overflow-hidden group">
              <img
                src={selectedImage || localizedMonument.thumbnail || `/images/monuments/monument_${localizedMonument.id}.jpg`}
                alt="360 View"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* 360 Badge Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-mono flex items-center gap-2 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>360° INTERACTIVE PANORAMA</span>
              </div>

              {/* Hotspot hints */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs flex flex-wrap items-center justify-between gap-3 bg-black/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                <span className="font-sans">
                  {isEn
                    ? 'Drag or swipe to rotate 360 degrees around the heritage precinct.'
                    : 'Kéo hoặc vuốt màn hình để xoay góc nhìn 360 độ quanh khuôn viên di tích.'}
                </span>
                <span className="font-mono text-[11px] text-[#D5C390] font-bold">
                  PRECINCT VR VIEW • ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
