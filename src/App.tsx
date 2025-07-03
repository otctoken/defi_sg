import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AA from "./pages/AA";
import BB from "./pages/BB";
import CC from "./pages/CC";
import DD from "./pages/DD";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AA" element={<AA />} />
          <Route path="/BB" element={<BB />} />
          <Route path="/CC" element={<CC />} />
          <Route path="/DD" element={<DD />} />
        </Routes>
      </main>
    </div>
  );
}
