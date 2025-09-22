export default function Hero() {
  return (
    <section className="hero min-h-[60vh] bg-base-200 rounded-box">
      <div className="hero-content flex-col md:flex-row-reverse">
        <img src="/assets/hero.jpg" alt="Hero"
             className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Landing Page Sederhana</h1>
          <p className="py-6">SMKN 1 Purwosari</p>
          <a href="#contact" className="btn btn-primary">Coba Sekarang</a>
        </div>
      </div>
    </section>
  );
}
