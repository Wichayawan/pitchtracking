import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// คอมโพเนนต์ Sidebar แถบเมนูด้านซ้าย
// props: current = หน้าปัจจุบัน เช่น "dashboard" | "parts" | "racks" | "rfid" | "stations" | "reports"
export default function Sidebar({ current }) {
  // สร้าง state สำหรับควบคุมการเปิด/ปิดเมนูย่อย
  // โดยค่าเริ่มต้นจะเปิดเฉพาะเมนูที่ตรงกับหน้าปัจจุบัน
  const [open, setOpen] = useState({
    parts:    current === "parts",
    racks:    current === "racks",
    rfid:     current === "rfid",
    stations: current === "stations",
    });
   const navigate = useNavigate();

  // เมื่อเปลี่ยนหน้า ให้ปิดเมนูย่อยที่ไม่เกี่ยวข้อง
  useEffect(() => {
    setOpen({
      parts: current === "parts",
      racks: current === "racks",
      rfid: current === "rfid",
      stations: current === "stations",
    });
  }, [current]);

  // class สำหรับปุ่มเมนูหลัก
  const item = "flex items-center justify-between w-full px-4 py-3 rounded-md text-sm hover:bg-white/10 transition";
  // class สำหรับเมนูที่ active (อยู่หน้าปัจจุบัน)
  const active = "bg-[#FFFFFF]/10 text-white shadow hover:bg-[#00ABD0] !cursor-default";
  // คอมโพเนนต์ย่อยสำหรับเมนู (เมนูที่อยู่ภายใต้หัวข้อหลัก)
  const Sub = ({ children, active }) => (
    <div className={`ml-2 mt-1 px-3 py-2 rounded-md text-sm ${active ? "bg-white/20 text-white" : "text-gray-200 hover:bg-white/5"}`}>
      {children}
    </div>
  );

  return (
  <>
    {/* แถบเมนูติดซ้าย ค้างตำแหน่ง */}
    <aside className="fixed left-0 top-14 w-64 h-[calc(100vh-56px)] bg-[#2E3C4A] text-white p-3 z-20 overflow-y-auto">
      {/* Dashboard */}
      <button className={`${item} ${current==="dashboard" ? active : ""}`} onClick={() => navigate("/dashboard")}>
        <span className="flex items-center gap-2">📊 แดชบอร์ด</span>
      </button>

      {/* Parts */}
      <div className="mt-2">
        <button className={`${item} ${current==="parts" ? active : ""}`} onClick={() => navigate("/parts")}>
          <span className="flex items-center gap-2">🧩 พาร์ท</span>
          {/* แสดงลูกศร ▾ ถ้าเมนูนี้ถูกเปิด, ▸ ถ้าปิด */}
          <span>{open.parts ? "▾" : "▸"}</span>
        </button>
        {/* แสดงเมนูย่อยถ้า open.parts = true */}
        {open.parts && <Sub active={current==="parts"}>จัดการพาร์ท</Sub>}
      </div>

      <div className="mt-2">
        <button className={`${item} ${current==="racks" ? active : ""}`} onClick={() => navigate("/racks")}>
          <span className="flex items-center gap-2">🗄️ แรค</span>
          <span>{open.racks ? "▾" : "▸"}</span>
        </button>
        {open.racks && <Sub active={current==="racks"}>จัดการแรค</Sub>}
      </div>

      <div className="mt-2">
        <button className={`${item} ${current==="stations" ? active : ""}`} onClick={() => navigate("/stations")}>
          <span className="flex items-center gap-2">🏭 สเตชัน</span>
          <span>{open.stations ? "▾" : "▸"}</span>
        </button>
        {open.stations && <Sub active={current==="stations"}>จัดการสเตชัน</Sub>}
      </div>

      <button className={`${item} mt-2 ${current==="reports" ? active : ""}`} onClick={() => navigate("/Reports")}>
        <span className="flex items-center gap-2">📝 สร้างรายงาน</span>
      </button>
    </aside>

    {/* spacer: กันพื้นที่กว้างเท่า sidebar เพื่อไม่ให้เนื้อหาทับ */}
    <div aria-hidden className="w-64 shrink-0" />
  </>
);

}
