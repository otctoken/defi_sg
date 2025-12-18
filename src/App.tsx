import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FooterTable from "./components/FooterTable";
import Home from "./pages/Home";
import AA from "./pages/AA";
import BB from "./pages/BB";
import CC from "./pages/CC";
import DD from "./pages/DD";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-2 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AA" element={<AA />} />
          <Route path="/BB" element={<BB />} />
          <Route path="/CC" element={<CC />} />
          <Route path="/DD" element={<DD />} />
        </Routes>
      </main>
      <FooterTable />
      <footer className="col-span-1 sm:col-span-2 mt-2 py-2 text-center text-gray-500 text-sm border-t border-gray-700/30">
        &copy; 2026 All rights reserved
      </footer>
    </div>
  );
}
