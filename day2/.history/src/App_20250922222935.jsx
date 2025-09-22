import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* tambahkan route lain di sini */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
