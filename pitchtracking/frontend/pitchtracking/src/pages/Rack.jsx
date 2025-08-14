import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfoCards from "../components/InfoCards";
import DataTable from "../components/DataTable";
import AddItemModal from "../components/AddItemModal";

const seed = [
  { id:1, rack:"AUPO10", line:"Assy UPPER", rfid:"1234567890A", status:"ใช้งาน",  owner:"wichayawan", date:"01-08-25" },
  { id:2, rack:"AUPO10", line:"Assy UPPER", rfid:"1234567890B", status:"ใช้งาน",  owner:"wichayawan", date:"01-08-25" },
  { id:3, rack:"AUPO20", line:"Assy UPPER", rfid:"1234567890C", status:"ใช้งาน",  owner:"wichayawan", date:"01-08-25" },
];

export default function Rack() {
  const [list, setList] = useState(seed);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const pageSize = 7;

  const cards = [
    { icon:"🚚", label:"แรคที่ใช้งาน", value:13 },
    { icon:"🚛", label:"แรคทั้งหมด", value:15 },
  ];

  const columns = [
    { key:"rack",   header:"รหัสแรค", className:"font-medium" },
    { key:"line",   header:"Line" },
    { key:"rfid",   header:"RFID" },
    { key:"status", header:"สถานะ", render:(r)=>(
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        r.status==="ใช้งาน" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
      }`}>{r.status}</span>
    )},
    { key:"owner",  header:"ชื่อผู้เพิ่มแรค" },
    { key:"date",   header:"วันที่เพิ่ม" },
  ];

  const fields = [
    { name:"rack",  label:"รหัสแรค", required:true, placeholder:"เช่น AUPO10" },
    { name:"line",  label:"Line", required:true, placeholder:"เช่น Assy UPPER" },
    { name:"rfid",  label:"RFID", required:true },
    { name:"status",label:"สถานะ", type:"select", options:["ใช้งาน","ไม่ใช้งาน"] },
    { name:"owner", label:"ชื่อผู้เพิ่มแรค" },
    { name:"date",  label:"วันที่เพิ่ม", placeholder:"เช่น 01-08-25" },
  ];

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return list;
    return list.filter(x =>
      x.rack.toLowerCase().includes(s) ||
      x.line.toLowerCase().includes(s) ||
      x.rfid.toLowerCase().includes(s)
    );
  },[q,list]);

  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  const addItem = (v)=>{
    const id = list.length ? Math.max(...list.map(x=>x.id))+1 : 1;
    setList([{ id, ...v }, ...list]);
    setPage(1);
  };
  const removeItem = (row)=>{
    if(!confirm(`ลบแรค ${row.rack}?`)) return;
    setList(list.filter(x=>x.id!==row.id));
  };

  return (
    <div className="min-h-screen bg-[#E8EEF4]">
      <Header title="จัดการแรค" />
      <div className="flex">
        <Sidebar current="racks" />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-slate-800">จัดการแรค</h1>

          <InfoCards items={cards} cols={2} />

          <section className="mt-5 flex items-center justify-between gap-3">
            <input
              value={q}
              onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
              placeholder="เช่น รหัสแรค"
              className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00ABD0]"
            />
            <button onClick={()=>setOpenAdd(true)} className="inline-flex items-center gap-2 bg-[#21B573] hover:bg-[#1ca565] text-white px-4 py-2 rounded-md shadow">
              ＋ เพิ่มแรค
            </button>
          </section>

          <DataTable
            title="รายการแรค"
            columns={columns}
            data={paged}
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            indexOffset={(page-1)*pageSize}
            onPageChange={setPage}
            actions={[
              { label:"แก้ไข", onClick:(r)=>alert(`(เดโม่) แก้ไข ${r.rack}`), className:"px-3 py-1 rounded-md bg-[#FFB74D] hover:bg-[#ffa833] text-white text-sm" },
              { label:"ลบ", onClick:removeItem, className:"px-3 py-1 rounded-md bg-[#EF5350] hover:bg-[#e04744] text-white text-sm" },
            ]}
          />
        </main>
      </div>

      <AddItemModal open={openAdd} title="เพิ่มแรค" fields={fields} onSave={addItem} onClose={()=>setOpenAdd(false)} />
    </div>
  );
}
