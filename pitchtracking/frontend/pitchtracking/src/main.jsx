import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx' // คอมโพเนนต์รากของแอป (รวมหน้า/Routes/เลย์เอาต์ทั้งหมด)


// สร้าง "root" ของ React แล้วเรนเดอร์แอปลงไป
createRoot(document.getElementById('root')).render(
  // StrictMode จะ "จำลอง" การเรียกบาง lifecycle/Effects ซ้ำในโหมดพัฒนา
  // เพื่อเตือน side effects ที่ไม่บริสุทธิ์ (production จะไม่เรียกซ้ำและไม่มีผลกับประสิทธิภาพ)
  <StrictMode>
    <App />
  </StrictMode>,
)
