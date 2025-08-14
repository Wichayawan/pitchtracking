import React from "react";
import loginImage from "../assets/Kobelco-Logo.png";
import { IoIosLogOut } from "react-icons/io";

export default function Header({ title = "" }) {
  return (
    <header className="h-14 w-full bg-[#FFFFFF] text-[#2A2A2A] flex items-center justify-between px-4 shadow">
      <div className="flex items-center gap-3">
        <img src={loginImage} 
        alt="KOBELCO" 
        className="h-25 w-auto" />
        {title ? (
          <span className="text-sm opacity-90 hidden sm:inline">• {title}</span>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm opacity-90 hidden sm:inline">Hi…</span>
        <span className="font-semibold">Admin</span>
        <button
          title="Logout"
          className="ml-2 rounded-md hover:bg-gray-200 p-2"
        >
          <IoIosLogOut size={20} color="#BC3535"/>
        </button>
      </div>
    </header>
  );
}
