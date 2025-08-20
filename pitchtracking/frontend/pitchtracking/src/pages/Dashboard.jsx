import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#E8EEF4]">
      <Header title="" />
      <div className="flex">
        <Sidebar current="dashboard" />
        <main className="flex-1 p-6">
          {/* หน้านี้เว้นว่างไว้ตามที่ขอ */}
        </main>
      </div>
    </div>
  );
}