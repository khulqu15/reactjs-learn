import Hero from "../sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="features" className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Cepat</h3>
            <p>Vite + React = dev cepat.</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Responsif</h3>
            <p>Tampil rapi di HP–Desktop.</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Sederhana</h3>
            <p>Kode mudah dipahami.</p>
          </div>
        </div>
      </div>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Kontak</h2>
        <form className="flex flex-col sm:flex-row gap-2">
          <input className="input input-bordered w-full" placeholder="Nama" />
          <input className="input input-bordered w-full" placeholder="Email" />
          <button className="btn btn-primary">Kirim</button>
        </form>
      </section>
    </>
  );
}
