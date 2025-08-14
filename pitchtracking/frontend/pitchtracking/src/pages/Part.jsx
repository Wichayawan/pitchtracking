import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Part() {
  return (
    <div className="min-h-screen bg-[#E8EEF4]">
      <Header title="จัดการพาร์ท" />
      <div className="flex">
        <Sidebar current="parts" />
        <main className="flex-1 p-6">
          {/* วางคอนเทนต์จริงของหน้า Part ตรงนี้ */}
        </main>
      </div>
    </div>
  );
}
