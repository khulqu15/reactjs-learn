import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const OWM_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const OWM_GEOCODE = "https://api.openweathermap.org/geo/1.0/direct";
const KEY = import.meta.env.VITE_OWM_KEY;

// ===== Helpers =====
async function fetchWeatherByCoords(lat, lon) {
  const url = `${OWM_WEATHER}?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&lang=id`;
  const { data } = await axios.get(url);
  return normalizeWeather(data);
}

async function fetchWeatherByCity(city) {
  const url = `${OWM_WEATHER}?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric&lang=id`;
  const { data } = await axios.get(url);
  return normalizeWeather(data);
}

function normalizeWeather(data) {
  return {
    name: data.name,
    coord: data.coord, // {lat, lon}
    temp: Math.round(data.main.temp),
    desc: data.weather?.[0]?.description ?? "-",
    icon: data.weather?.[0]?.icon ?? "01d",
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
}

async function geocode(query, limit = 5) {
  if (!query?.trim()) return [];
  const url =
    `${OWM_GEOCODE}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${KEY}`;
  const { data } = await axios.get(url);
  // hasil: [{name,state,country,lat,lon}, ...]
  return data;
}

async function onLogout() {
  const confirmation = confirm("Yakin Logout?");
  if (!confirmation) return;
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export default function Weather() {
  // state data cuaca
  const [w, setW] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // state pencarian
  const [query, setQuery] = useState("Purwosari, ID");
  const [suggestions, setSuggestions] = useState([]);
  const [finding, setFinding] = useState(false);

  // fetch default saat mount (Purwosari,ID)
  useEffect(() => {
    (async () => {
      try {
        setW(await fetchWeatherByCity("Purwosari,ID"));
      } catch {
        setErr("Gagal memuat cuaca awal. Cek API key & jaringan.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // debounce pencarian
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        setFinding(true);
        const items = await geocode(query, 6);
        setSuggestions(items);
      } catch {
        // biarkan kosong jika gagal
      } finally {
        setFinding(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  // handler pilih suggestion
  async function pickSuggestion(item) {
    try {
      setLoading(true);
      setErr("");
      setSuggestions([]);
      setQuery(`${item.name}${item.state ? ", " + item.state : ""}, ${item.country}`);
      const data = await fetchWeatherByCoords(item.lat, item.lon);
      setW(data);
    } catch {
      setErr("Gagal memuat cuaca untuk lokasi terpilih.");
    } finally {
      setLoading(false);
    }
  }

  // submit manual dengan Enter/klik tombol Cari
  async function onSearch(e) {
    e?.preventDefault?.();
    if (!query?.trim()) return;
    try {
      setLoading(true);
      setErr("");
      const data = await fetchWeatherByCity(query.trim());
      setW(data);
      setSuggestions([]);
    } catch {
      setErr("Lokasi tidak ditemukan. Coba format: Kota, Negara (mis: Purwosari, ID).");
    } finally {
      setLoading(false);
    }
  }

  // gunakan GPS
  async function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setErr("Geolocation tidak didukung browser ini.");
      return;
    }
    try {
      setLoading(true);
      setErr("");
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000 })
      );
      const { latitude: lat, longitude: lon } = pos.coords;
      const data = await fetchWeatherByCoords(lat, lon);
      setW(data);
      setQuery(`${data.name}, ID`); // heuristik kecil; country bisa tidak selalu ID
    } catch {
      setErr("Gagal mengambil lokasi. Pastikan izin GPS diizinkan.");
    } finally {
      setLoading(false);
    }
  }

  const gmapsHref = useMemo(() => {
    if (!w?.coord) return null;
    const { lat, lon } = w.coord;
    return `https://www.google.com/maps?q=${lat},${lon}`;
  }, [w?.coord]);

  // UI
  if (loading && !w) return <div className="skeleton h-32 w-full" />;
  if (err && !w) return <div className="alert alert-error">{err}</div>;

  return (
    <div className="grid gap-4 max-w-md mx-auto">
      {/* Search bar */}
      <form onSubmit={onSearch} className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Cari lokasi (cth: Purwosari, ID)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary join-item" type="submit">
          Cari
        </button>
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="menu bg-base-200 rounded-box shadow max-h-56 overflow-auto">
          {suggestions.map((it, i) => (
            <li key={`${it.lat}-${it.lon}-${i}`}>
              <button type="button" onClick={() => pickSuggestion(it)}>
                {it.name}
                {it.state ? `, ${it.state}` : ""}, {it.country}
              </button>
            </li>
          ))}
          {finding && <li className="opacity-60 px-4 py-2">Mencari…</li>}
        </ul>
      )}

      {/* Weather card */}
      {w && (
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-start justify-between gap-3">
              <h2 className="card-title">{w.name}</h2>
              {gmapsHref && (
                <a className="link link-primary text-sm" href={gmapsHref} target="_blank" rel="noreferrer">
                  Lihat di Peta
                </a>
              )}
            </div>

            <div className="flex items-center gap-4">
              <img alt="ikon" src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />
              <div>
                <div className="text-4xl font-bold">{w.temp}°C</div>
                <div className="capitalize">{w.desc}</div>
                <div className="text-sm opacity-70">
                  Kelembapan {w.humidity}% • Angin {w.wind} m/s
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button className="btn btn-outline" onClick={() => location.reload()}>
          Muat Ulang
        </button>
        <button className="btn" onClick={useMyLocation}>
          Gunakan Lokasiku
        </button>
        <button className="btn btn-error ml-auto" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Error inline (non-blocking) */}
      {err && w && <div className="alert alert-warning">{err}</div>}
    </div>
  );
}
