import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Nav from "./nav";
import Chat from "./chat/chat";
import Calc from "./calc/calc";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/react/" element={<Nav />} />
      <Route path="/react/chat" element={<Chat />} />
      <Route path="/react/calc" element={<Calc />} />
    </Routes>
  </BrowserRouter>
);
