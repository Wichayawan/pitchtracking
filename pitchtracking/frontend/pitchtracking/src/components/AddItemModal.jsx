import React, { useState, useEffect } from "react";

/**
 * open: boolean
 * title: string
 * fields: [{ name:'code', label:'รหัส', type:'text'|'select', options?:['a','b'], placeholder?, required? }]
 * onSave: (values)=>void
 * onClose: ()=>void
 */
export default function AddItemModal({ open, title = "เพิ่มรายการ", fields = [], onSave, onClose }) {
  const initial = Object.fromEntries(fields.map(f => [f.name, f.type === "select" ? (f.options?.[0] || "") : ""]));
  const [values, setValues] = useState(initial);

  useEffect(() => { if (open) setValues(initial); /* reset when open */ }, [open]); // eslint-disable-line

  if (!open) return null;

  const update = (name, val) => setValues((v) => ({ ...v, [name]: val }));
  const submit = (e) => { e.preventDefault(); onSave?.(values); onClose?.(); };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
              <label className="block text-sm text-gray-600 mb-1">{f.label}</label>
              {f.type === "select" ? (
                <select
                  value={values[f.name] ?? ""}
                  onChange={(e) => update(f.name, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  required={f.required}
                >
                  {(f.options || []).map((op) => <option key={op} value={op}>{op}</option>)}
                </select>
              ) : (
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

          <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">ยกเลิก</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-[#21B573] text-white hover:bg-[#1ca565]">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
