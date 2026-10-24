import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { monumentApi } from '../services/api';
import {
  ArrowLeft,
  Flashlight,
  FlashlightOff,
  Volume2,
  VolumeX,
  Scan,
  Sparkles,
  QrCode,
  Upload,
  CheckCircle2,
  Camera,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export default function QrScannerView() {
  const navigate = useNavigate();
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scanner State
  const [torchOn, setTorchOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanSuccessItem, setScanSuccessItem] = useState(null);
  const [selectedSimulateTab, setSelectedSimulateTab] = useState('all');

  const videoRef = useRef(null);

  // Load all 20 monuments for quick testing/simulation
  useEffect(() => {
    monumentApi.getAll().then((data) => {
      setMonuments(data);
      setLoading(false);
    });
  }, []);

  // Try to start live camera
  useEffect(() => {
    let stream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play().catch(() => {});
            setCameraActive(true);
          }
        })
        .catch((err) => {
          console.info('Live camera not available or permission denied, using simulation viewfinder.', err);
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Simulate scanning a monument's QR code
  const handleScanMonument = async (m) => {
    // Record scan in API
    await monumentApi.recordQrScan(m.id);
    setScanSuccessItem(m);

    // After 1.2s show effect, redirect to monument detail
    setTimeout(() => {
      navigate(`/di-tich/${m.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* ============================================================== */}
      {/* TOP HEADER CONTROLS (Back, Title, Flash, Sound)                */}
      {/* ============================================================== */}
      <header className="px-4 py-4 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Link
          to="/"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="text-center">
          <h1 className="text-base font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
            <QrCode className="w-4 h-4 text-lotus-400" />
            <span>Quét Mã QR Di Tích</span>
          </h1>
          <p className="text-[11px] text-slate-400">Đồng Tháp Smart Heritage QR</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              torchOn ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/30' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Bật/Tắt đèn Flash"
          >
            {torchOn ? <Flashlight className="w-5 h-5" /> : <FlashlightOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
            title="Âm thanh phản hồi"
          >
            {soundOn ? <Volume2 className="w-5 h-5 text-tram-400" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* CENTER SCANNER VIEWPORT WITH TARGETING RETICLE & LASER LINE    */}
      {/* ============================================================== */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-4">
        {/* Viewfinder Target Frame */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl flex items-center justify-center bg-black/60 backdrop-blur-xs">
          {/* Live Video Feed or Fallback Poster */}
          {cameraActive ? (
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/80">
              <Camera className="w-10 h-10 text-slate-500 mb-2 animate-pulse" />
              <p className="text-xs text-slate-300 font-semibold">Ống kính thực địa sẵn sàng</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                Bạn có thể quét camera hoặc chọn nhanh 1 trong 20 di tích bên dưới để mô phỏng.
              </p>
            </div>
          )}

          {/* 4 Corner Targeting Marks (Matching Stitch Design) */}
          <div className="absolute top-2 left-2 w-7 h-7 border-t-4 border-l-4 border-lotus-500 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-2 right-2 w-7 h-7 border-t-4 border-r-4 border-lotus-500 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-7 h-7 border-b-4 border-l-4 border-lotus-500 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-7 h-7 border-b-4 border-r-4 border-lotus-500 rounded-br-xl pointer-events-none" />

          {/* Animated Laser Scanning Line */}
          <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-lotus-500 to-transparent shadow-[0_0_12px_#E11D48] animate-[bounce_2.5s_infinite] pointer-events-none" />

          {/* Center Crosshair */}
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-lotus-500" />
          </div>

          {/* Success Overlay on Scan */}
          {scanSuccessItem && (
            <div className="absolute inset-0 bg-tram-600/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-14 h-14 text-white mb-2 animate-bounce" />
              <h3 className="text-base font-extrabold text-white">Quét mã thành công!</h3>
              <p className="text-xs text-tram-100 font-medium truncate max-w-[240px] mt-0.5">
                {scanSuccessItem.name}
              </p>
              <span className="text-[10px] text-tram-200 mt-2">Đang mở hồ sơ thuyết minh...</span>
            </div>
          )}
        </div>

        {/* User Guidance Instructions */}
        <p className="text-xs text-slate-300 font-medium text-center mt-5 max-w-sm px-4 leading-relaxed">
          Hướng camera về phía tem QR in trên bia giới thiệu hoặc bảng chỉ dẫn tại di tích Đồng Tháp
        </p>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM DRAWER: SIMULATE SCANNING ANY OF 20 MONUMENTS           */}
      {/* ============================================================== */}
      <div className="z-20 bg-slate-900/95 border-t border-white/10 rounded-t-3xl backdrop-blur-xl p-4 sm:p-5 max-h-[46vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tram-400">qr_code_scanner</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Chọn nhanh mã QR để kiểm thử (20 Di tích)
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
            Chế độ thực địa
          </span>
        </div>

        {/* Scrollable List of 20 Monuments for 1-Click Simulated Scanning */}
        <div className="flex-1 overflow-y-auto pt-3 space-y-2 no-scrollbar">
          {monuments.map((m) => {
            const isSpecial = m.ranking === 'Quốc gia đặc biệt';
            return (
              <div
                key={m.id}
                onClick={() => handleScanMonument(m)}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-lotus-500/50 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                    <img src={m.thumbnail} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                          isSpecial ? 'bg-lotus-500/20 text-lotus-400' : 'bg-tram-500/20 text-tram-400'
                        }`}
                      >
                        {m.ranking}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">{m.district}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-lotus-300 transition-colors">
                      {m.name}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-lotus-600 group-hover:bg-lotus-500 text-white font-bold text-[11px] shrink-0 flex items-center gap-1 shadow-sm transition-all"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Quét QR</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
