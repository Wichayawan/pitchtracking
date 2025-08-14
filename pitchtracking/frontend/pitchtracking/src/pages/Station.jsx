import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfoCards from "../components/InfoCards";
import DataTable from "../components/DataTable";
import AddItemModal from "../components/AddItemModal";

const seed = [
  { id:1, line:"Assy Upper", station:"STANBY", part:"YQ15406358", time:"50 นาที", rackStatus:true, owner:"wichayawan" },
  { id:2, line:"Assy Upper", station:"VALVE",  part:"YN15436533", time:"40 นาที", rackStatus:false, owner:"wichayawan" },
  { id:3, line:"Assy Upper", station:"FLOORPLATE", part:"LPI2400126", time:"40 นาที", rackStatus:true, owner:"wichayawan" },
];

export default function Station() {
  const [list, setList] = useState(seed);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const pageSize = 7;

  const cards = [
    { icon:"🏭", label:"Assy UPPER", value:7 },
    { icon:"🏭", label:"Main Line", value:7 },
  ];

  const columns = [
    { key:"line",    header:"Line", className:"font-medium" },
    { key:"station", header:"Station" },
    { key:"part",    header:"พาร์ทปัจจุบัน" },
    { key:"time",    header:"เวลาการทำงาน" },
    { key:"rackStatus", header:"สถานะแรค", render:(r)=>(
      <div className="flex items-center">
        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${r.rackStatus?"bg-green-500":"bg-gray-300"}`}></span>
      </div>
    )},
    { key:"owner",   header:"ชื่อผู้เพิ่ม Station" },
  ];

  const fields = [
    { name:"line", label:"Line", required:true, placeholder:"เช่น Assy Upper" },
    { name:"station", label:"Station", required:true },
    { name:"part", label:"พาร์ทปัจจุบัน" },
    { name:"time", label:"เวลาการทำงาน", placeholder:"เช่น 40 นาที" },
    { name:"rackStatus", label:"สถานะแรค", type:"select", options:["ใช้งาน","ไม่ใช้งาน"] },
    { name:"owner", label:"ชื่อผู้เพิ่ม Station" },
  ];

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return list;
    return list.filter(x =>
      x.line.toLowerCase().includes(s) ||
      x.station.toLowerCase().includes(s) ||
      x.part.toLowerCase().includes(s)
    );
  },[q,list]);

  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  const addItem = (v)=>{
    const id = list.length ? Math.max(...list.map(x=>x.id))+1 : 1;
    const row = { ...v, rackStatus: v.rackStatus==="ใช้งาน" ? true : false };
    setList([{ id, ...row }, ...list]);
    setPage(1);
  };
  const removeItem = (row)=>{
    if(!confirm(`ลบ Station ${row.station}?`)) return;
    setList(list.filter(x=>x.id!==row.id));
  };

  return (
    <div className="min-h-screen bg-[#E8EEF4]">
      <Header title="จัดการสเตชัน" />
      <div className="flex">
        <Sidebar current="stations" />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-slate-800">จัดการสเตชัน</h1>

          <InfoCards items={cards} cols={2} />

          <section className="mt-5 flex items-center justify-between gap-3">
            <input
              value={q}
              onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
              placeholder="เช่น Assy Upper"
              className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00ABD0]"
            />
            <button onClick={()=>setOpenAdd(true)} className="inline-flex items-center gap-2 bg-[#21B573] hover:bg-[#1ca565] text-white px-4 py-2 rounded-md shadow">
              ＋ เพิ่มแรค
            </button>
          </section>

          <DataTable
            title="รายการสเตชัน"
            columns={columns}
            data={paged}
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            indexOffset={(page-1)*pageSize}
            onPageChange={setPage}
            actions={[
              { label:"แก้ไข", onClick:(r)=>alert(`(เดโม่) แก้ไข ${r.station}`), className:"px-3 py-1 rounded-md bg-[#FFB74D] hover:bg-[#ffa833] text-white text-sm" },
              { label:"ลบ", onClick:removeItem, className:"px-3 py-1 rounded-md bg-[#EF5350] hover:bg-[#e04744] text-white text-sm" },
            ]}
          />
        </main>
      </div>

      <AddItemModal open={openAdd} title="เพิ่ม Station" fields={fields} onSave={addItem} onClose={()=>setOpenAdd(false)} />
    </div>
  );
}
