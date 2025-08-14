import React, { useState } from "react";

// ใช้ prop current เพื่อไฮไลต์เมนูปัจจุบัน: "dashboard" | "parts" | "racks" | "rfid" | "stations" | "reports"
export default function Sidebar({ current = "parts", onNavigate }) {
  const [open, setOpen] = useState({
    parts: true,
    racks: false,
    rfid: false,
    stations: false,
  });

  const item = "flex items-center justify-between w-full px-4 py-3 rounded-md text-sm hover:bg-white/10 transition";
  const active = "bg-[#00ABD0] text-white shadow hover:bg-[#00ABD0] !cursor-default";
  const Sub = ({ children, active }) => (
    <div className={`ml-2 mt-1 px-3 py-2 rounded-md text-sm ${active ? "bg-white/10 text-white" : "text-gray-200 hover:bg-white/5"}`}>
      {children}
    </div>
  );

  return (
    <aside className="w-64 bg-[#2E3C4A] text-white min-h-[calc(100vh-56px)] p-3">
      <button className={`${item} ${current==="dashboard"?active:""}`} onClick={()=>onNavigate?.("dashboard")}>
        <span className="flex items-center gap-2">📊 แดชบอร์ด</span>
      </button>

      <div className="mt-2">
        <button
          className={`${item} ${current==="parts"?active:""}`}
          onClick={() => { setOpen(s=>({ ...s, parts: !s.parts })); onNavigate?.("parts"); }}
        >
          <span className="flex items-center gap-2">🧩 พาร์ท</span>
          <span>{open.parts ? "▾" : "▸"}</span>
        </button>
        {open.parts && <Sub active>จัดการพาร์ท</Sub>}
      </div>

      <div className="mt-2">
        <button
          className={`${item} ${current==="racks"?active:""}`}
          onClick={() => { setOpen(s=>({ ...s, racks: !s.racks })); onNavigate?.("racks"); }}
        >
          <span className="flex items-center gap-2">🗄️ แรค</span>
          <span>{open.racks ? "▾" : "▸"}</span>
        </button>
        {open.racks && <Sub>จัดการแรค</Sub>}
      </div>

      <div className="mt-2">
        <button
          className={`${item} ${current==="rfid"?active:""}`}
          onClick={() => { setOpen(s=>({ ...s, rfid: !s.rfid })); onNavigate?.("rfid"); }}
        >
          <span className="flex items-center gap-2">📶 RFID</span>
          <span>{open.rfid ? "▾" : "▸"}</span>
        </button>
        {open.rfid && <Sub>จัดการ RFID</Sub>}
      </div>

      <div className="mt-2">
        <button
          className={`${item} ${current==="stations"?active:""}`}
          onClick={() => { setOpen(s=>({ ...s, stations: !s.stations })); onNavigate?.("stations"); }}
        >
          <span className="flex items-center gap-2">🏭 สเตชัน</span>
          <span>{open.stations ? "▾" : "▸"}</span>
        </button>
        {open.stations && <Sub>จัดการสเตชัน</Sub>}
      </div>

      <button className={`${item} mt-2 ${current==="reports"?active:""}`} onClick={()=>onNavigate?.("reports")}>
        <span className="flex items-center gap-2">📝 สร้างรายงาน</span>
      </button>
    </aside>
  );
}
