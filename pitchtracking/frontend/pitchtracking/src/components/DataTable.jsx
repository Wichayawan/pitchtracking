import React from "react";

/**
 * props ที่รับเข้ามา
 * columns: คอนฟิกคอลัมน์ เช่น [{ key:'code', header:'รหัสพาร์ท', render?:(row)=>node }]
 * data: ข้อมูลที่จะแสดงในตาราง (array ของ object)
 * page: หน้าปัจจุบัน (เลขเพจ)
 * pageSize: จำนวนข้อมูลต่อหน้า
 * total: จำนวนข้อมูลทั้งหมด
 * onPageChange: ฟังก์ชันเปลี่ยนหน้า
 * actions: ปุ่มการทำงาน (array) เช่น [{ label:'แก้ไข', onClick:(row)=>{} }]
 * indexOffset: เอาไว้เลื่อนเลขลำดับ (เวลาแบ่งหน้า)
 */

export default function DataTable({
  columns = [],
  data = [],
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  actions = [],
  indexOffset = 0,
}) {
  // start = ลำดับแรกที่แสดงในเพจนี้
  const start = indexOffset + 1;
  // end = ลำดับสุดท้ายที่แสดงในเพจนี้
  const end = indexOffset + data.length;
  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          {/* คุมความกว้างคอลัมน์ให้หัว-ตัวตารางตรงกัน */}
          <colgroup>
            <col className="w-16" /> {/* No. */}
            {columns.map((_, i) => <col key={i} />)}
            {actions.length > 0 && <col className="w-40" />} {/* การดำเนินการ */}
          </colgroup>

          {/* หัวตารางไล่เฉดสี */}
          <thead className="bg-gradient-to-r from-[#00ABD0] to-[#005D73] text-white">
            <tr>
              <th className="px-5 py-3 text-center align-middle first:rounded-tl-2xl">
                No.
              </th>
              {columns.map((c, i) => (
                <th
                  key={c.key}
                  className={`px-5 py-3 text-center align-middle whitespace-nowrap ${c.headerClassName || ""} ${
                    i === columns.length - 1 && actions.length === 0 ? "last:rounded-tr-2xl" : ""
                  }`}
                >
                  {c.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-5 py-3 text-center align-middle last:rounded-tr-2xl whitespace-nowrap">
                  การดำเนินการ
                </th>
              )}
            </tr>
          </thead>

          {/* ตัวตาราง */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row, i) => (
              <tr key={row.id ?? i} className="hover:bg-slate-50">
                {/* แสดงลำดับ */}
                <td className="px-5 py-3 text-center align-middle">
                  {indexOffset + i + 1}
                </td>

                {/* แสดงค่าของแต่ละคอลัมน์ */}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-5 py-3 text-center align-middle ${c.className || ""}`}
                  >
                    {/* ถ้ามี render ใช้ render(row) ไม่งั้นใช้ค่าตาม key */}
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="px-5 py-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      {actions.map((a, j) => (
                        <button
                          key={j}
                          onClick={() => a.onClick?.(row)} // กดแล้วเรียกฟังก์ชัน
                          className={a.className || "px-3 py-1 rounded-md border text-sm hover:bg-gray-100"}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {/* ถ้าไม่มีข้อมูล */}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1 + (actions.length ? 1 : 0)}
                  className="px-5 py-8 text-center text-gray-500 align-middle"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
        {/* ข้อความบอกว่าตอนนี้แสดงแถวไหนถึงไหน */}
        <span className="text-sm text-[#94A3B8]">
          แสดง {data.length ? start : 0} ถึง {end} จาก {total} รายการ
        </span>

        {/* ปุ่มเปลี่ยนหน้า */}
        <div className="flex items-center gap-2">
          {/* ปุ่มก่อนหน้า */}
          <button
            onClick={() => onPageChange?.(Math.max(1, page - 1))}
            disabled={page === 1}
            className="h-8 px-3 rounded-md border text-sm text-[#94A3B8]"
          >
            ก่อนหน้า
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange?.(i + 1)}
              className={`h-8 px-3 rounded-md border text-sm ${
                page === i + 1
                  ? "bg-gradient-to-r from-[#00ABD0] to-[#005D73] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* ปุ่มไปหน้าถัดไป */}
          <button
            onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="h-8 px-3 rounded-md border text-sm text-[#94A3B8]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </section>
  );
}
