import React, { useState, useEffect } from "react";

/**
 * props ที่รับเข้ามา
 * open: true/false เปิด–ปิด modal
 * title: ชื่อหัว modal
 * fields: กำหนดฟอร์ม input เช่น 
 *    [{ name:'code', label:'รหัส', type:'text'|'select', options?:[], placeholder?, required?, full? }]
 * onSave: ฟังก์ชันตอนกดบันทึก → ส่ง values ออกไป
 * onClose: ฟังก์ชันตอนกดยกเลิก/ปิด
 */

export default function AddItemModal({
  open,
  title = "เพิ่มรายการ",
  fields = [],
  onSave,
  onClose,
}) {
  // กำหนดค่าเริ่มต้นจาก fields
  // ถ้า type = select → ใช้ค่าแรกของ options
  // ถ้าไม่ใช่ → ตั้งเป็น string ว่าง
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "select" ? (f.options?.[0] || "") : ""])
  );
  // state เก็บค่าของฟอร์ม
  const [values, setValues] = useState(initial);

  // เวลาเปิด modal ใหม่ → reset ค่าให้กลับเป็นค่าเริ่มต้น
  useEffect(() => {
    if (open) setValues(initial); // reset เมื่อเปิดใหม่
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ถ้า open = false → ไม่ render อะไรเลย (modal ปิด)
  if (!open) return null;

  // อัพเดตค่าใน state เวลา input เปลี่ยน
  const update = (name, val) => setValues((v) => ({ ...v, [name]: val }));
  // ฟังก์ชันกด submit
  const submit = (e) => {
    e.preventDefault(); // กันไม่ให้รีเฟรชหน้า
    onSave?.(values); // ส่งค่าฟอร์มออกไปให้ parent ผ่าน props onSave
    onClose?.(); // ปิด modal
  };

  return (
    // พื้นหลังดำโปร่ง ๆ + modal กลางจอ
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        {/* หัว modal */}
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        {/* ฟอร์ม */}
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
              <label className="block text-sm text-[#9E9E9E] mb-1">{f.label}</label>

              {/* ถ้าเป็น select → render <select> */}
              {f.type === "select" ? (
                <select
                  value={values[f.name] ?? ""}
                  onChange={(e) => update(f.name, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  required={f.required}
                >
                  {(f.options || []).map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              ) : (
                // ถ้าไม่ใช่ select → render <input>
                <input
                  type={f.type || "text"}
                  value={values[f.name] ?? ""}
                  onChange={(e) => update(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  required={f.required}
                />
              )}
            </div>
          ))}

          {/* ปุ่มด้านล่าง */}
          <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#21B573] text-white hover:bg-[#1ca565]"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
