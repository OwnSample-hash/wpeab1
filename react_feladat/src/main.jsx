import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Nav from "./nav";
import Chat from "./chat/chat";
import Calc from "./calc/calc";
import B2B from "./b2b";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/react/"
        element={
          <div>
            <Nav />
            <div className="flex justify-center text-4xl font-bold">
              <span>Web-programozás-1 Előadás Házi feladat</span>
            </div>
          </div>
        }
      />
      <Route path="/react/chat" element={<Chat />} />
      <Route path="/react/calc" element={<Calc />} />
      <Route path="/" element={<B2B />} />
    </Routes>
  </BrowserRouter>
);
