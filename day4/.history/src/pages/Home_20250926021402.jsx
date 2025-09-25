// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products?limit=6", {
          baseURL: "https://dummyjson.com",
        });
        setProducts(data.products || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-12">

      {/* HERO */}
      <section className="hero min-h-[60vh] bg-base-200 rounded-box">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Bangun Aplikasi Modern: <span className="text-primary">React</span>, API, & UI Cepat
            </h1>
            <p className="mt-4 opacity-85">
              Demo pembelajaran: autentikasi sederhana, cuaca OpenWeather,
              katalog produk DummyJSON, dan routing yang rapih.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary">Mulai Belanja Demo</Link>
              <a href="#features" className="btn btn-outline">Lihat Fitur</a>
              <Link to="/weather" className="btn btn-ghost">Cek Cuaca</Link>
            </div>
          </div>
          <div>
            <img
              src="https://ninnoelka.ee.student.pens.ac.id/_nuxt/avatar.gnkExDND.png"
              alt="Ilustrasi Home"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="grid md:grid-cols-3 gap-3">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Komponen</div>
          <div className="stat-value text-primary">20+</div>
          <div className="stat-desc">DaisyUI siap pakai</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Kecepatan Dev</div>
          <div className="stat-value text-secondary">Vite</div>
          <div className="stat-desc">Hot reload ngebut</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Belajar</div>
          <div className="stat-value">Praktis</div>
          <div className="stat-desc">Autentikasi & API</div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Auth Sederhana",
            desc: "Login/Register dummy (Reqres) + Protected Route.",
            icon: "🔐",
          },
          {
            title: "Cuaca Realtime",
            desc: "OpenWeather dengan search lokasi & GPS.",
            icon: "⛅",
          },
          {
            title: "Katalog Produk",
            desc: "DummyJSON Products + search, cache, favorites.",
            icon: "🛒",
          },
        ].map((f) => (
          <div key={f.title} className="card bg-base-200">
            <div className="card-body">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="card-title">{f.title}</h3>
              <p className="opacity-85">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Produk Terbaru</h2>
            <p className="opacity-70 text-sm">Data dari DummyJSON (6 item)</p>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm">Lihat Semua</Link>
        </div>

        {loading && <div className="skeleton h-32 w-full" />}
        {!loading && products.length === 0 && (
          <div className="alert alert-warning">Tidak ada produk.</div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <article key={p.id} className="card bg-base-200">
                <figure className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-base sm:text-lg">{p.title}</h3>
                  <p className="opacity-80 text-sm line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="badge badge-outline">${p.price}</span>
                    <Link to={`/shop/${p.id}`} className="btn btn-sm btn-outline">
                      Detail
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* WEATHER TEASER */}
      <section className="card bg-base-200">
        <div className="card-body md:flex md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="card-title">Cek Cuaca Purwosari & Sekitarnya</h3>
            <p className="opacity-80">
              Akses halaman cuaca dengan pencarian lokasi & dukungan GPS. Halaman ini dilindungi —
              silakan login terlebih dahulu.
            </p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/weather" className="btn btn-primary">Buka Weather</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL RINGKAS */}
      <section className="grid md:grid-cols-2 gap-4">
        {[
          { name: "Siswa RPL", quote: "Belajar React jadi cepat paham!", role: "Kelas XII" },
          { name: "Guru Pembina", quote: "Struktur komponen membuat rapi.", role: "Pembina LKS" },
        ].map((t, i) => (
          <blockquote key={i} className="card bg-base-200">
            <div className="card-body">
              <p className="italic">“{t.quote}”</p>
              <footer className="text-sm opacity-70">— {t.name}, {t.role}</footer>
            </div>
          </blockquote>
        ))}
      </section>

      {/* CALL TO ACTION */}
      <section className="card bg-gradient-to-br from-primary/10 to-base-200">
        <div className="card-body md:flex md:items-center md:justify-between gap-4">
          <div>
            <h3 className="card-title">Siap Mencoba Semua Fitur?</h3>
            <p className="opacity-80">
              Daftar atau masuk, lalu jelajahi produk & halaman cuaca. Sempurna untuk latihan React modern.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <Link to="/register" className="btn btn-primary">Daftar</Link>
            <Link to="/login" className="btn btn-outline">Masuk</Link>
            <Link to="/shop" className="btn btn-ghost">Ke Katalog</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
