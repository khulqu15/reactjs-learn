import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../lib/axios";
import { useFav } from "../../context/FavContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFav, toggleFav } = useFav();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`, {
          baseURL: "https://dummyjson.com",
        });
        setP(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="skeleton h-32 w-full" />;
  if (!p) return <div className="alert alert-error">Produk tidak ditemukan.</div>;

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Link to="/shop" className="btn btn-ghost">← Kembali</Link>
      </div>

      <div className="card bg-base-200">
        <div className="card-body grid gap-4 md:grid-cols-2">
          <figure className="w-full aspect-[4/3] overflow-hidden rounded-box">
            <img src={p.thumbnail} alt={p.title} className="object-cover w-full h-full" />
          </figure>

          <div className="space-y-3">
            <h2 className="card-title">{p.title}</h2>
            <p className="opacity-80">{p.description}</p>
            <div className="flex items-center gap-2">
              <span className="badge badge-outline">Price: ${p.price}</span>
              <span className="badge badge-outline">Brand: {p.brand}</span>
              <span className="badge badge-outline">Category: {p.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`btn ${isFav(p.id) ? "btn-secondary" : "btn-outline"}`}
                onClick={() => toggleFav(p.id)}
              >
                {isFav(p.id) ? "★ Favorit" : "☆ Favorit"}
              </button>
              <a
                href={p?.images?.[0] || p.thumbnail}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Lihat Gambar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
