import { useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usermame, setUsername] = useState("eve.holt@reqres.in");
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      const { data } = await api.post("https://reqres.in/api/login", { email, password });
      login(data.token);
      nav("/weather");
    } catch (e) {
      setErr("Login gagal. Coba email/password contoh di atas.");
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-sm mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-2">
        <input className="input input-bordered w-full" placeholder="Email"
               value={usermame} onChange={e=>setUsername(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        <button className={`btn ${loading?'btn-disabled':'btn-primary'} w-full`}>
          {loading ? "..." : "Masuk"}
        </button>
        <p>Belum punya akun ? <a className="text-primary" href="/register">Register</a></p>
      </form>
      {err && <div className="alert alert-error">{err}</div>}
    </div>
  );
}
