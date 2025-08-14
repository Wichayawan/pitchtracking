import React from "react";

/**
 * columns: [{ key:'code', header:'รหัสพาร์ท', render?:(row)=>node, className? }]
 * data: array of rows
 * page, pageSize, total, onPageChange: pagination
 * actions: [{ label:'แก้ไข', onClick:(row)=>{}, className: '...' }, ...]
 * indexOffset: เริ่มเลขลำดับ (คำนวณจากหน้า)
 */
export default function DataTable({
  title = "รายการทั้งหมด",
  columns = [],
  data = [],
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  actions = [],
  indexOffset = 0,
}) {
  const start = indexOffset + 1;
  const end = indexOffset + data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-5 bg-white rounded-xl shadow overflow-hidden">
      <div className="bg-gradient-to-r from-[#0090b6] to-[#00ABD0] text-white px-5 py-3 font-medium">
        {title}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b bg-gray-50">
              <th className="px-5 py-3 w-16">No.</th>
              {columns.map((c) => (
                <th key={c.key} className={`px-5 py-3 ${c.headerClassName || ""}`}>{c.header}</th>
              ))}
              {actions.length > 0 && <th className="px-5 py-3 w-40">การกระทำ</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id ?? i} className="border-b last:border-b-0 hover:bg-gray-50/70">
                <td className="px-5 py-3">{indexOffset + i + 1}</td>
                {columns.map((c) => (
                  <td key={c.key} className={`px-5 py-3 ${c.className || ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {actions.map((a, j) => (
                        <button
                          key={j}
                          onClick={() => a.onClick?.(row)}
                          className={a.className || "px-3 py-1 rounded-md border"}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={(columns.length + 1 + (actions.length ? 1 : 0))} className="px-5 py-8 text-center text-gray-500">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
        <span className="text-sm text-gray-600">
          แสดง {data.length ? start : 0} ถึง {end} จาก {total} รายการ
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange?.(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange?.(i + 1)}
              className={`px-3 py-1 rounded-md border ${page === i + 1 ? "bg-[#00ABD0] text-white border-[#00ABD0]" : "bg-white hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </section>
  );
}
