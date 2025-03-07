import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Nav from "./nav";
import Chat from "./chat/chat";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
