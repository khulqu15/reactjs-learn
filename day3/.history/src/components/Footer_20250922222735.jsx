import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer items-center p-4 mt-12 bg-base-200 text-base-content rounded-box">
      <aside className="items-center grid-flow-col">
        <span className="font-semibold">MyLanding</span>
        <p>© {new Date().getFullYear()}</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link className="link link-hover" to="/about">Tentang</Link>
        <a className="link link-hover" href="#contact">Kontak</a>
      </nav>
    </footer>
  );
}
