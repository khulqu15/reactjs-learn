// src/pages/Register.jsx
import { useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [usermame, setUsername] = useState("");
  const [email, setEmail] = useState("");   // contoh yg didukung reqres
  const [password, setPassword] = useState("");         // contoh reqres
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const valid = email.includes("@") && password.length >= 4;

  async function onSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    setErr(""); setLoading(true);
    try {
      // Fake register (reqres): https://reqres.in/api/register
      // body minimal: { email, password } -> { id, token }
      const { data } = await api.post("https://reqres.in/api/register", { email, password });
      // langsung anggap “login” setelah register
      if (data?.token) {
        login(data.token);
        nav("/weather");
      } else {
        setErr("Registrasi berhasil tanpa token. Silakan login manual.");
        nav("/login");
      }
    } catch (e) {
      setErr("Register gagal. Coba email/password contoh di atas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Register</h1>

      <form onSubmit={onSubmit} className="space-y-2">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Password (min 4 karakter)"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          required
        />

        <button
          className={`btn ${valid && !loading ? "btn-primary" : "btn-disabled"} w-full`}
          disabled={!valid || loading}
        >
          {loading ? "..." : "Daftar"}
        </button>
      </form>

      {err && <div className="alert alert-error">{err}</div>}

      <div className="text-sm">
        Sudah punya akun? <Link to="/login" className="link link-primary">Masuk</Link>
      </div>
    </div>
  );
}
