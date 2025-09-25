import { createContext, useContext, useEffect, useState } from "react";

const FavCtx = createContext(null);
export const useFav = () => useContext(FavCtx);

export default function FavProvider({ children }) {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("FAVS") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("FAVS", JSON.stringify(favs));
  }, [favs]);

  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const isFav = (id) => favs.includes(id);

  return (
    <FavCtx.Provider value={{ favs, toggleFav, isFav }}>
      {children}
    </FavCtx.Provider>
  );
}
