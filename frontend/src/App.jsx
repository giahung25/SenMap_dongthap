import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import MapView from './pages/MapView';
import MonumentDetail from './pages/MonumentDetail';
import QrScannerView from './pages/QrScannerView';
import AdminDashboard from './pages/AdminDashboard';
export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-canvas-bg text-on-surface">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Routes>
            {/* 1. Trang chủ Văn hóa 6 Tầng SenMap Đồng Tháp */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Bản đồ số WebGIS Toàn Màn hình */}
            <Route path="/ban-do" element={<MapView />} />

            {/* 3. Chi tiết Di tích & Thuyết minh Audio Tour */}
            <Route path="/di-tich/:id" element={<MonumentDetail />} />

            {/* 4. Quét mã QR Di tích Thực địa */}
            <Route path="/quet-qr" element={<QrScannerView />} />

            {/* 5. Quản trị CMS Di tích & Ghim Tọa độ Bản đồ */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </LanguageProvider>
  );
}
