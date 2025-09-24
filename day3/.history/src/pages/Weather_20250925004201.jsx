import { useEffect, useState } from "react";
import axios from "axios"; 

const OWM = "https://api.openweathermap.org/data/2.5/weather";
const CITY = "Purwosari,ID";
const KEY = import.meta.env.VITE_OWM_KEY;

async function fetchWeather() {
  const url = `${OWM}?q=${encodeURIComponent(CITY)}&appid=${KEY}&units=metric&lang=id`;
  const { data } = await axios.get(url); 
  return {
    name: data.name,
    temp: Math.round(data.main.temp),
    desc: data.weather?.[0]?.description ?? "-",
    icon: data.weather?.[0]?.icon ?? "01d",
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
}

export default function Weather() {
  const [w, setW] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setW(await fetchWeather()); }
      catch { setErr("Gagal memuat cuaca. Cek API key & jaringan."); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="skeleton h-32 w-full" />;
  if (err) return <div className="alert alert-error">{err}</div>;

  return (
    <div className="grid gap-4 max-w-md mx-auto">
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">{w.name}</h2>
          <div className="flex items-center gap-4">
            <img alt="ikon" src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />
            <div>
              <div className="text-4xl font-bold">{w.temp}°C</div>
              <div className="capitalize">{w.desc}</div>
              <div className="text-sm opacity-70">Kelembapan {w.humidity}% • Angin {w.wind} m/s</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-outline" onClick={() => location.reload()}>Muat Ulang</button>
      <button className="btn btn-error">Logout</button>
    </div>
  );
}
