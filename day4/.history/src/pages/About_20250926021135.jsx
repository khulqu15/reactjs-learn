// src/pages/About.jsx
export default function About() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* 1) HERO */}
      <section className="hero">
        <div className="hero-content flex-col md:flex-row gap-8 md:gap-12">
          <div className="avatar">
            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://ninnoelka.ee.student.pens.ac.id/_nuxt/me.DfbVArMF.png" alt="Mohammad Khusnul Khuluq" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Mohammad Khusnul Khuluq
            </h1>
            <p className="mt-2 opacity-80">
              Full-Stack Engineer — <span className="font-medium">Software</span> &amp;{" "}
              <span className="font-medium">Hardware</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#contact" className="btn btn-primary">Hubungi Saya</a>
              <a href="#projects" className="btn btn-outline">Lihat Proyek</a>
              <a href="/resume.pdf" target="_blank" className="btn btn-ghost">CV / Resume</a>
            </div>
          </div>
        </div>
      </section>

      {/* container global */}
      <div className="container mx-auto px-4 py-8 space-y-12">

        {/* 2) QUICK STATS */}
        <section className="grid md:grid-cols-3 gap-3">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Pengalaman</div>
            <div className="stat-value text-primary">7+ th</div>
            <div className="stat-desc">Web, IoT, dan Integrasi</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Proyek</div>
            <div className="stat-value text-secondary">40+</div>
            <div className="stat-desc">Produk, internal & klien</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Kepuasan Klien</div>
            <div className="stat-value">98%</div>
            <div className="stat-desc">Rata-rata ulasan</div>
          </div>
        </section>

        {/* 3) BIO / RINGKASAN */}
        <section id="bio" className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Tentang Saya</h2>
            <p className="opacity-90">
              Saya Full-Stack Engineer yang menikmati membangun solusi ujung-ke-ujung:
              dari arsitektur backend, antarmuka frontend, hingga integrasi hardware/IoT.
              Fokus pada performa, aksesibilitas, dan DX yang bersih. Senang memaketkan
              ide menjadi produk yang siap pakai.
            </p>
          </div>
        </section>

        {/* 4) SKILLS (Software & Hardware) */}
        <section id="skills" className="grid lg:grid-cols-2 gap-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Software</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript/TypeScript","React","Next.js","Node.js","Express",
                  "REST/GraphQL","Prisma/ORM","PostgreSQL","MongoDB",
                  "Tailwind/DaisyUI","Vite","Vitest/Jest","CI/CD","Docker"
                ].map(s=>(
                  <span key={s} className="badge badge-outline">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Hardware & Embedded</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "ESP32/ESP8266","Arduino","Raspberry Pi","Micropython/C",
                  "Sensor & Aktuator","MQTT","OTA Update","3D Printing (enclosure)",
                  "PCB prototyping","Node-RED","Home Assistant","BLE/Wi-Fi"
                ].map(s=>(
                  <span key={s} className="badge badge-outline">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5) PENGALAMAN (Timeline sederhana) */}
        <section id="experience" className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Pengalaman Terpilih</h3>
            <ol className="relative border-l border-base-300 pl-4 space-y-6">
              {[
                {
                  t:"2024 — sekarang",
                  r:"Full-Stack Engineer (Freelance/Consult)",
                  d:"Bangun dashboard IoT & layanan API untuk manufaktur kecil, optimasi stack React + Node."
                },
                {
                  t:"2021 — 2024",
                  r:"Software Engineer",
                  d:"Kembangkan aplikasi internal (React/Next) & microservice Node; integrasi pembayaran & SSO."
                },
                {
                  t:"2018 — 2021",
                  r:"IoT & Prototyping",
                  d:"Rancang perangkat monitoring (ESP32 + MQTT), gateway Raspberry Pi, dan sistem logging."
                }
              ].map((item,i)=>(
                <li key={i}>
                  <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary"></div>
                  <time className="text-sm opacity-70">{item.t}</time>
                  <h4 className="font-semibold">{item.r}</h4>
                  <p className="opacity-80">{item.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6) PROJECT HIGHLIGHTS */}
        <section id="projects" className="grid md:grid-cols-3 gap-4">
          {[
            {
              title:"Smart Greenhouse",
              desc:"Monitoring suhu/kelembapan, kontrol pompa & kipas, notifikasi Telegram.",
              tag:["ESP32","MQTT","React Dashboard"]
            },
            {
              title:"E-Commerce Lite",
              desc:"Frontend Next.js, API Gateway Node, pembayaran & admin sederhana.",
              tag:["Next.js","Node.js","Postgres"]
            },
            {
              title:"Fleet Tracker",
              desc:"Pelacakan GPS ringan + geofence; visualisasi peta & laporan harian.",
              tag:["Raspberry Pi","Leaflet","Timeseries"]
            }
          ].map((p,i)=>(
            <article key={i} className="card bg-base-200">
              <div className="card-body">
                <h4 className="card-title">{p.title}</h4>
                <p className="opacity-85">{p.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.tag.map(t=> <span key={t} className="badge badge-outline">{t}</span>)}
                </div>
                <div className="card-actions justify-end">
                  <a href="#" className="btn btn-outline btn-sm">Detail</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* 7) SERTIFIKASI / PENGHARGAAN */}
        <section className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Sertifikasi & Penghargaan</h3>
            <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside">
              <li>Certified React Developer — (tahun)</li>
              <li>IoT Practitioner — (tahun)</li>
              <li>Juara Proyek Inovasi Internal — (tahun)</li>
              <li>Kontributor OSS (komponen UI & util)</li>
            </ul>
          </div>
        </section>

        {/* 8) CONTACT / CTA */}
        <section id="contact" className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Kontak</h3>
            <p className="opacity-80">Terbuka untuk kerja sama, freelance, atau konsultasi singkat.</p>
            <div className="flex flex-wrap gap-2">
              <a href="mailto:you@example.com" className="btn btn-primary">Email</a>
              <a href="https://wa.me/6281234567890" target="_blank" className="btn btn-outline" rel="noreferrer">WhatsApp</a>
              <a href="https://linkedin.com/in/username" target="_blank" className="btn btn-ghost" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/username" target="_blank" className="btn btn-ghost" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
