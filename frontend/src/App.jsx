import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import MapView from './pages/MapView';
import MonumentDetail from './pages/MonumentDetail';
import QrScannerView from './pages/QrScannerView';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-bg text-on-surface">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* 1. Sơ đồ Bản đồ số WebGIS Desktop & Mobile Bottom Sheet */}
          <Route path="/" element={<MapView />} />

          {/* 2. Chi tiết Di tích & Thuyết minh Audio Tour */}
          <Route path="/di-tich/:id" element={<MonumentDetail />} />

          {/* 3. Quét mã QR Di tích Thực địa */}
          <Route path="/quet-qr" element={<QrScannerView />} />

          {/* 4. Quản trị CMS Di tích & Ghim Tọa độ Bản đồ */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback route */}
          <Route path="*" element={<MapView />} />
        </Routes>
      </div>
    </div>
  );
}
