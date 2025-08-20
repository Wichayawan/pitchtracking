import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfoCards from "../components/InfoCards"; // การ์ดแสดงข้อมูลรวม
import DataTable from "../components/DataTable"; // ตารางแสดงรายการ
import AddItemModal from "../components/AddItemModal";

// ข้อมูลตัวอย่าง
const seed = [
  { id:1, code:"YQ15406358", status:"pending",   start:"1 ชม. 30 นาที", stop:"1 ชม. 30 นาที", total:"1 ชม. 30 นาที", owner:"wichayawan" },
  { id:2, code:"YN15436533", status:"completed", start:"1 ชม. 20 นาที", stop:"1 ชม. 20 นาที", total:"1 ชม. 20 นาที", owner:"wichayawan" },
  { id:3, code:"LPI2400126", status:"In Progress",   start:"1 ชม. 20 นาที", stop:"1 ชม. 20 นาที", total:"1 ชม. 20 นาที", owner:"wichayawan" },
];

export default function Part() {
  const [list, setList] = useState(seed); // state เก็บรายการพาร์ท
  const [q, setQ] = useState(""); // state คำค้นหา
  const [page, setPage] = useState(1); // state หน้าปัจจุบัน
  const [openAdd, setOpenAdd] = useState(false); // state เปิด/ปิด modal เพิ่มพาร์ท
  const pageSize = 7; // จำนวนข้อมูลต่อหน้า

  // การ์ดข้อมูลรวมด้านบน
  const cards = [
    { icon: "🚚", label: "ผลิต ณ ตอนนี้", value: 8 },
    { icon: "🏁", label: "เป้าหมายวันนี้", value: "12/20" },
    { icon: "📅", label: "พาร์ททั้งหมด/เดือน", value: "119/165" },
  ];

  // คอนฟิกคอลัมน์ของตาราง
  const columns = [
    { key:"code",   header:"รหัสพาร์ท", className:"font-medium text-slate-700" },
    { key:"status", header:"สถานะ", render:(r)=>(
      // สถานะพร้อมสีพื้นหลัง
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        r.status==="completed"?"bg-green-100 text-green-700":
        r.status==="ใช้งาน"?"bg-cyan-100 text-cyan-700":
        "bg-gray-100 text-gray-700"
      }`}>{r.status}</span>
    )},
    { key:"start",  header:"เวลาเริ่มต้น" },
    { key:"stop",   header:"เวลาหยุด" },
    { key:"total",  header:"เวลาทั้งหมด" },
    { key:"owner",  header:"ชื่อผู้เพิ่มพาร์ท" },
  ];

  // กำหนด fields สำหรับฟอร์มใน modal เพิ่มพาร์ท
  const fields = [
    { name:"code", label:"รหัสพาร์ท", required:true, placeholder:"เช่น LC14-BJMOA", full:true },
    { name:"status", label:"สถานะ", type:"select", options:["pending","completed","ใช้งาน"] },
    { name:"start", label:"เวลาเริ่มต้น", placeholder:"เช่น 1 ชม. 20 นาที" },
    { name:"stop",  label:"เวลาหยุด" },
    { name:"total", label:"เวลาทั้งหมด", full:true },
    { name:"owner", label:"ชื่อผู้เพิ่มพาร์ท" },
  ];

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return list;
    return list.filter(r =>
      r.code.toLowerCase().includes(s) ||
      r.status.toLowerCase().includes(s) ||
      r.owner.toLowerCase().includes(s)
    );
  },[q,list]);

  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  const addItem = (v)=>{
    const id = list.length ? Math.max(...list.map(x=>x.id))+1 : 1;
    setList([{ id, ...v }, ...list]);
    setPage(1);
  };
  const removeItem = (row)=>{
    if(!confirm(`ลบพาร์ท ${row.code}?`)) return;
    setList(list.filter(x=>x.id!==row.id));
  };

  return (
    <div className="min-h-screen bg-[#E8EEF4]">
      <Header title="" />
      <div className="flex">
        <Sidebar current="parts" />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-[#B3B3B3]">จัดการพาร์ท</h1>
          <h2 className="text-base text-[#13213C]/80 ">ภาพรวมของพาร์ท</h2>

          <InfoCards items={cards} />

          {/* แถวค้นหา + ปุ่มเพิ่มพาร์ท */}
          <section className="mt-5 flex items-end justify-between gap-3">
            <div className="w-full max-w-md">
              <label className="block text-base text-[#13213C]/80 mb-1">
                ค้นหา
              </label>
              <input
                value={q}
                onChange={(e)=>{setQ(e.target.value); setPage(1);}}
                placeholder="เช่น รหัสพาร์ท"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00ABD0]"
              />
            </div>
            <button
            onClick={()=>setOpenAdd(true)}
            className="inline-flex items-center gap-2 bg-[#21B573] hover:bg-[#1ca565] text-white px-4 py-2 rounded-md shadow"
          >
            ＋ เพิ่มพาร์ท
          </button>
          </section>
          {/* หัวข้อของตาราง (อยู่นอก DataTable) */}
        <div className="mt-6 mb-2 flex items-center justify-between">
          <h3 className="text-base text-[#13213C]/80">
            รายการพาร์ท
          </h3>
        </div>

          <DataTable
            columns={columns}
            data={paged}
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            indexOffset={(page-1)*pageSize}
            onPageChange={setPage}
            actions={[
              { label:"แก้ไข", onClick:(r)=>alert(`(เดโม่) แก้ไข ${r.code}`), className:"px-3 py-1 rounded-md bg-[#FFB74D] hover:bg-[#ffa833] text-white text-sm" },
              { label:"ลบ", onClick:removeItem, className:"px-3 py-1 rounded-md bg-[#EF5350] hover:bg-[#e04744] text-white text-sm" },
            ]}
          />
        </main>
      </div>

      <AddItemModal open={openAdd} title="เพิ่มพาร์ท" fields={fields} onSave={addItem} onClose={()=>setOpenAdd(false)} />
    </div>
  );
}
