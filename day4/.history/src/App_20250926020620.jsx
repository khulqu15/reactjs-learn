import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Weather from "./pages/Weather";

// Tambahan:
import FavProvider from "./context/FavContext";
import ShopLayout from "./pages/shop/ShopLayout";
import ShopList from "./pages/shop/ShopList";
import ProductDetail from "./pages/shop/ProductDetail";

export default function App() {
  return (
    <AuthProvider>
      <FavProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/weather"
                element={
                  <ProtectedRoute>
                    <Weather />
                  </ProtectedRoute>
                }
              />

              {/* ====== Nested Routes untuk Shop ====== */}
              <Route path="/shop" element={<ShopLayout />}>
                <Route index element={<ShopList />} />
                <Route path=":id" element={<ProductDetail />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FavProvider>
    </AuthProvider>
  );
}
