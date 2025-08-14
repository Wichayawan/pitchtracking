import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Part from "./pages/Part"; // Uncomment to switch to Part page
import Rack from "./pages/Rack";
import Station from "./pages/Station";

export default function App() {
  return <Part />;   // ชั่วคราว: ถ้าจะดูหน้าเมนูให้สลับเป็น <Part />
}
