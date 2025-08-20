// App.jsx — ตัวจัดเส้นทาง (routing) ด้วย React Router v6
// โค้ดนี้ทำ auth แบบฝั่ง client ง่าย ๆ ด้วย localStorage ("auth" === "true")
// - ตอน "ล็อกอินสำเร็จ" ให้ทำ: localStorage.setItem("auth", "true")
// - ตอน "ล็อกเอาต์" ให้ทำ: localStorage.removeItem("auth") หรือ setItem("auth", "false")

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Part from "./pages/Part";
import Rack from "./pages/Rack";
import Station from "./pages/Station";

// ฟังก์ชันตรวจสอบสถานะล็อกอิน
// คืนค่า true ถ้า localStorage มีคีย์ "auth" เท่ากับ "true"
const isAuthed = () => localStorage.getItem("auth") === "true";

// คอมโพเนนต์ "รั้ว" กันเส้นทาง (ProtectedRoute)
// - ถ้าไม่ผ่านการยืนยันตัวตน → เด้งไป /login (และ replace history เพื่อกันวนกลับ)
// - ถ้าผ่าน → แสดง children (หน้าที่ถูกป้องกัน)
function ProtectedRoute({ children }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthed() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/parts"    element={<ProtectedRoute><Part /></ProtectedRoute>} />
        <Route path="/racks"    element={<ProtectedRoute><Rack /></ProtectedRoute>} />
        <Route path="/stations" element={<ProtectedRoute><Station /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
