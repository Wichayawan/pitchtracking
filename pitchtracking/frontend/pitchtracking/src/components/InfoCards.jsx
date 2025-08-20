import React from "react";

/**
 * props:
 *  items: [{ icon: node|string, label: string, value: string|number }]
 *         → คือข้อมูลการ์ดแต่ละใบ เช่น { icon:"📦", label:"จำนวนพาร์ท", value:120 }
 *  cols: จำนวนคอลัมน์ที่จะแสดงตอนจอกว้าง (ค่าได้ 2–4), ถ้าไม่ใส่ default = 3
 *  className: เอาไว้ต่อเติม class ของ Tailwind ภายนอก
 */

export default function InfoCards({ items = [], cols = 3, className = "" }) {
  // ป้องกันปัญหา tailwind กับ dynamic class: map เป็นคลาสคงที่
  const gridCols =
    {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
    }[cols] || "sm:grid-cols-3";

  return (
    // เริ่มจาก 1 คอลัมน์เสมอ (มือถือ) → พอจอใหญ่ขึ้นจะใช้ gridCols
    <section className={`grid grid-cols-1 ${gridCols} gap-4 mt-4 ${className}`}>
      {items.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center justify-between"
        >
          {/* ฝั่งซ้าย: แสดง label + value */}
          <div>
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="text-3xl font-semibold text-slate-800 mt-1">
              {c.value}
            </p>
          </div>

          {/* กล่องไอคอนแบบการ์ดในภาพตัวอย่าง */}
          {/* ฝั่งขวา: กล่องไอคอน (พื้นหลังฟ้า Kobelco, ตัวอักษรขาว, ขนาด 48px) */}
          <div className="w-12 h-12 rounded-xl bg-[#00ABD0] text-white flex items-center justify-center text-xl">
            <span aria-hidden>{c.icon}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
