import { useEffect, useState } from "react";

const THEMES = ["light", "dark", "cupcake"];

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <select
      className={`select select-bordered select-sm ${className}`}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      aria-label="Pilih tema"
    >
      {THEMES.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}
