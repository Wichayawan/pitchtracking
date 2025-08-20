import React from "react";
import loginImage from "../assets/Kobelco-Logo.png";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// คอมโพเนนต์ Header (หัวเว็บด้านบน)
export default function Header({ title = "" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // เคลียร์สถานะล็อกอิน
    navigate("/login", { replace: true }); // กลับไปหน้า login
  };

  return (
    <header className="h-14 w-full bg-[#FFFFFF] text-[#2A2A2A] flex items-center justify-between px-4 shadow">
      {/* ฝั่งซ้าย: โลโก้ + ชื่อหน้า */}
      <div className="flex items-center gap-3">
        <img src={loginImage} alt="KOBELCO" className="h-25 w-auto" />
        {title ? ( // ถ้ามีส่ง title มา → แสดงชื่อหน้า
          <span className="text-sm opacity-90 hidden sm:inline">• {title}</span>
        ) : null}
      </div>

      {/* ฝั่งขวา: แสดงชื่อ user + ปุ่ม logout */}
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-90 hidden sm:inline">Hi…</span>
        <span className="font-semibold">Admin</span>
        {/* ปุ่ม logout */}
        <button
          title="Logout" onClick={handleLogout}
          className="ml-2 rounded-md hover:bg-gray-200 p-2"
        >
          {/* ไอคอน logout สีแดงเข้ม */}
          <IoIosLogOut size={20} color="#BC3535" />
        </button>
      </div>
    </header>
  );
}
