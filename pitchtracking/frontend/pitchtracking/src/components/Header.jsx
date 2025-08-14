import React from "react";
import logo from "../assets/Kobelco-Logo.png";

export default function Header({ title = "" }) {
  return (
    <header className="h-14 w-full bg-[#6E8096] text-white flex items-center justify-between px-4 shadow">
      <div className="flex items-center gap-3">
        <img src={logo} alt="KOBELCO" className="h-8 w-auto" />
        {title ? (
          <span className="text-sm opacity-90 hidden sm:inline">• {title}</span>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm opacity-90 hidden sm:inline">Hi…</span>
        <span className="font-semibold">Admin</span>
        <button
          title="Logout"
          className="ml-2 rounded-md bg-white/15 hover:bg-white/25 px-2 py-1 text-xs"
        >
          ⎋
        </button>
      </div>
    </header>
  );
}
