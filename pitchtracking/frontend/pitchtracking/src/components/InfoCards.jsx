import React from "react";

/**
 * items: [{ icon: node|string, label: string, value: string|number }]
 * cols: จำนวนคอลัมน์บนจอกว้าง (default 3)
 */
export default function InfoCards({ items = [], cols = 3 }) {
  const colsClass = `sm:grid-cols-${cols}`;
  return (
    <section className={`grid grid-cols-1 ${colsClass} gap-4 mt-4`}>
      {items.map((c, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <div className="text-[#00ABD0] text-2xl">{c.icon}</div>
          <div>
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-semibold">{c.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
