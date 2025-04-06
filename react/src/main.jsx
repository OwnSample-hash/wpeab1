import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Nav from "./nav";
import Chat from "./chat/chat";
import Calc from "./calc/calc";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/calc" element={<Calc />} />
    </Routes>
  </BrowserRouter>
);
