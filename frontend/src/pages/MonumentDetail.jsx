import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { monumentApi } from '../services/api';
import { calculateDistanceKm, formatCurrency, getGoogleMapsDirUrl } from '../utils/geoUtils';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { createMonumentIcon } from '../components/map/leafletIcons';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMonument } from '../data/monumentsTranslationsEn';
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
  FastForward,
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

export default function MonumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
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
      setSelectedImage(found.thumbnail || `/images/monuments/monument_${found.id}.jpg`);

      // Generate QR Code with current language query param preserved
      const currentUrl = `${window.location.origin}/di-tich/${found.id}?lang=${lang}`;
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: { dark: '#131B2E', light: '#FFFFFF' },
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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-canvas-bg">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-10 h-10 border-4 border-lotus-200 border-t-lotus-600 rounded-full animate-spin" />
          <p className="text-xs font-semibold">{t('loadingHeritage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-canvas-bg pb-16">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 truncate">
            <Link to="/" className="flex items-center gap-1 hover:text-lotus-600 font-semibold">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToMap')}</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 truncate hidden sm:inline">
              {localizedMonument.displayDistrict}
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-bold text-slate-800 truncate">
              {localizedMonument.displayName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getGoogleMapsDirUrl(userLocation, localizedMonument.coordinates)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-tram-600 hover:bg-tram-700 text-white font-bold text-xs shadow-xs transition-colors"
              title={t('openGoogleMaps')}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('googleMapsBtn')}</span>
            </a>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-lotus-50 text-lotus-600 border-lotus-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={t('saveFavorite')}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-lotus-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors"
              title={t('shareMonument')}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 space-y-8">
        {/* ============================================================ */}
        {/* 1. HERO BANNER & HEADER SECTION                              */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80">
          <div className="relative w-full h-72 sm:h-96 bg-slate-900">
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

            {/* Ranking Badge Top-Left */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lotus-600 text-white text-xs font-bold shadow-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              <span>{localizedMonument.displayRanking}</span>
            </div>

            {/* Title & Metadata Bottom */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-lotus-200">
                  {localizedMonument.displayCategory}
                </span>
                {localizedMonument.displayOtherName && (
                  <span className="text-xs text-slate-300 italic">
                    {localizedMonument.displayOtherName}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                {localizedMonument.displayName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-lotus-400 shrink-0" />
                  <span>{localizedMonument.displayAddress}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>
                    {t('viewsCount', { count: (localizedMonument.views || 4850).toLocaleString() })}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <ScanLine className="w-4 h-4 text-tram-400" />
                  <span>
                    {t('qrScansCount', {
                      count: (localizedMonument.qrScans || 1420).toLocaleString(),
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50 border-t border-slate-200/80 text-xs">
            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lotus-100 text-lotus-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">
                  {t('heritageRankCol')}
                </p>
                <p className="font-bold text-slate-800">{localizedMonument.displayRanking}</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-tram-100 text-tram-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">
                  {t('openingHoursCol')}
                </p>
                <p className="font-bold text-slate-800">{localizedMonument.displayOpeningHours}</p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">
                  {t('admissionFeeCol')}
                </p>
                <p className="font-bold text-slate-800">
                  {localizedMonument.ticketPrice > 0
                    ? formatCurrency(localizedMonument.ticketPrice)
                    : t('freeAdmission')}
                </p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold">
                  {t('districtCol')}
                </p>
                <p className="font-bold text-slate-800">{localizedMonument.displayDistrict}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. AUDIO TOUR PLAYER & NARRATOR (Web Speech API Enabled)     */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-br from-white via-lotus-50/30 to-tram-50/20 p-5 sm:p-7 rounded-3xl border border-lotus-200/80 shadow-md shadow-lotus-600/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-lotus-600 text-white flex items-center justify-center shadow-lg shadow-lotus-600/30 shrink-0">
                <span className="material-symbols-outlined text-[26px]">headphones</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{t('audioTourTitle')}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-lotus-100 text-lotus-700 font-extrabold text-[10px] uppercase">
                    {t('aiVoiceBadge')}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{t('audioTourSubtitle')}</p>
              </div>
            </div>

            {/* Voice Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {t('voiceLabel')}
              </span>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="h-8 px-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-lotus-500"
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

          {/* Progress Bar & Timers */}
          <div className="space-y-1.5 pt-1">
            <div className="relative w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden cursor-pointer group">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-lotus-600 to-rose-400 rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{monument.audioDuration || '04:25'}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => {
                  const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                  setPlaybackSpeed(nextSpeed);
                }}
                className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Play / Pause Main CTA with Web Speech API */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRestartAudio}
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleAudio}
                className="w-12 h-12 rounded-full bg-lotus-600 hover:bg-lotus-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-lotus-600/30 transition-all"
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
              <span className="text-[11px] text-tram-700 font-bold bg-tram-50 px-2 py-1 rounded-lg">
                {t('audioQuality')}
              </span>
            </div>
          </div>

          {/* Real-time Subtitle box */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 text-xs text-slate-700 italic leading-relaxed">
            <span className="font-bold text-lotus-700 not-italic mr-1.5">
              {t('narratorQuoteLabel')}
            </span>
            "{localizedMonument.displayAudioScript || localizedMonument.displayHistory}"
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. NỘI DUNG LỊCH SỬ & THƯ VIỆN ẢNH KHẢO CỔ                   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái (2/3): Lịch sử & Thư viện ảnh */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lịch sử di tích */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-lotus-600 text-[22px]">
                  history_edu
                </span>
                <span>{t('historyValueTitle')}</span>
              </h3>
              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="first-letter:text-3xl first-letter:font-extrabold first-letter:text-lotus-700 first-letter:mr-1">
                  {localizedMonument.displayHistory}
                </p>
                <p>{t('historyParagraph2')}</p>
              </div>

              {/* Lưu ý tham quan */}
              {localizedMonument.displayNote && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-amber-800">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>{t('visitorNoticeTitle')}</span>
                  </span>
                  <p className="leading-relaxed">{localizedMonument.displayNote}</p>
                </div>
              )}
            </div>

            {/* Bộ sưu tập hình ảnh */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-tram-600 text-[22px]">
                  photo_library
                </span>
                <span>{t('photoGalleryTitle')}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {localizedMonument.gallery?.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`h-24 sm:h-28 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                      selectedImage === imgUrl
                        ? 'border-lotus-600 scale-95 shadow-md'
                        : 'border-transparent hover:border-slate-300'
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

          {/* Cột phải (1/3): Bản đồ thu nhỏ, QR Code & Di tích lân cận */}
          <div className="space-y-6">
            {/* 1. Bản đồ GIS Thu nhỏ */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-lotus-600" />
                  <span>{t('spatialGisTitle')}</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  {localizedMonument.lat.toFixed(4)}°, {localizedMonument.lon.toFixed(4)}°
                </span>
              </div>

              <div className="relative h-52 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <MapContainer
                  center={localizedMonument.coordinates}
                  zoom={14}
                  className="w-full h-full"
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url={`https://mt1.google.com/vt/lyrs=m&hl=${lang === 'en' ? 'en' : 'vi'}&x={x}&y={y}&z={z}`}
                    attribution="&copy; Google Maps"
                    maxZoom={20}
                  />
                  <MapResizeFix />
                  <Marker
                    position={localizedMonument.coordinates}
                    icon={createMonumentIcon(localizedMonument, true)}
                  />
                </MapContainer>
              </div>

              <div className="pt-1 flex gap-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 py-2 px-3 rounded-xl bg-lotus-50 hover:bg-lotus-100 text-lotus-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('openWebGisBtn')}</span>
                </button>

                <a
                  href={getGoogleMapsDirUrl(userLocation, localizedMonument.coordinates)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-tram-600 hover:bg-tram-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
                  title={t('openGoogleMaps')}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('googleMapsBtn')}</span>
                </a>
              </div>
            </div>

            {/* 2. Mã QR Định danh di tích */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <QrIcon className="w-4 h-4 text-tram-600" />
                <span>{t('identityQrTitle')}</span>
              </div>

              <div className="inline-block p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Mã QR" className="w-36 h-36 mx-auto rounded-lg" />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center text-slate-300 text-xs">
                    {t('generatingQr')}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">{t('scanOnSiteHint')}</p>

              <div className="flex items-center justify-center gap-2 pt-1">
                {qrDataUrl && (
                  <a
                    href={qrDataUrl}
                    download={`SenMap_QR_DiTich_${localizedMonument.id}_DongThap.png`}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('downloadQrBtn')}</span>
                  </a>
                )}
                <button
                  onClick={() => window.print()}
                  className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('printA5Btn')}</span>
                </button>
              </div>
            </div>

            {/* 3. Di tích lân cận */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('nearbyMonumentsTitle')}</span>
              </h4>

              <div className="space-y-2">
                {localizedNearby.map((near) => (
                  <div
                    key={near.id}
                    onClick={() => navigate(`/di-tich/${near.id}`)}
                    className="p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all flex items-center gap-2.5 group"
                  >
                    <img
                      src={near.thumbnail || `/images/monuments/monument_${near.id}.jpg`}
                      alt=""
                      aria-label={near.displayName}
                      className="w-11 h-11 rounded-xl object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/images/monuments/monument_${near.id}.jpg`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 truncate group-hover:text-lotus-600 transition-colors">
                        {near.displayName}
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        {t('distanceKmAway')} {near.distance} km
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-lotus-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
