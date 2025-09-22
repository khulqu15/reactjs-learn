import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg ${isActive ? "bg-base-200" : "hover:bg-base-200"}`;

  return (
    <div className="navbar bg-base-100 border-b sticky top-0 z-40">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <button className="btn btn-ghost md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            ☰
          </button>
          {open && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>Beranda</NavLink></li>
              <li><NavLink to="/about" onClick={() => setOpen(false)} className={linkClass}>Tentang</NavLink></li>
            </ul>
          )}
        </div>

        <Link to="/" className="btn btn-ghost text-xl">MyLanding</Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/" className={linkClass}>Beranda</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>Tentang</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        <Link to="#contact" className="btn btn-primary">Mulai</Link>
      </div>
    </div>
  );
}
