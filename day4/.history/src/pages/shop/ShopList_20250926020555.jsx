import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../lib/axios";
import { useFav } from "../../context/FavContext";

const cache = new Map(); // key: `${q}|${page}` -> data

const LIMIT = 12;

export default function ShopList() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [page, setPage] = useState(Number(params.get("page") || 1));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFav, toggleFav } = useFav();

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (page > 1) sp.set("page", String(page));
    setParams(sp, { replace: true });
  }, [q, page, setParams]);

  async function fetchProducts() {
    const key = `${q}|${page}`;
    if (cache.has(key)) {
      setData(cache.get(key));
      setLoading(false);
      return;
    }
    setLoading(true);
    const skip = (page - 1) * LIMIT;
    const url = q
      ? `/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&skip=${skip}`
      : `/products?limit=${LIMIT}&skip=${skip}`;
    const { data } = await api.get(url, { baseURL: "https://dummyjson.com" });
    cache.set(key, data);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts().catch(() => setLoading(false));
  }, [q, page]);

  const products = data?.products ?? [];
  const hasPrev = page > 1;
  const hasNext = useMemo(() => {
    if (!data) return true;
    const nextSkip = page * LIMIT;
    return nextSkip < (data.total ?? nextSkip + 1);
  }, [data, page]);

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          fetchProducts();
        }}
        className="join w-full"
      >
        <input
          className="input input-bordered join-item w-full"
          placeholder="Cari produk (mis. phone)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-primary join-item" type="submit">
          Cari
        </button>
      </form>

      {loading && <div className="skeleton h-32 w-full" />}
      {!loading && products.length === 0 && (
        <div className="alert alert-warning">Tidak ada produk.</div>
      )}

      {!loading && products.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="card bg-base-200">
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
                  <p className="text-sm opacity-80 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="badge badge-outline">${p.price}</span>
                    <button
                      className={`btn btn-xs ${isFav(p.id) ? "btn-secondary" : "btn-ghost"}`}
                      onClick={() => toggleFav(p.id)}
                    >
                      {isFav(p.id) ? "★ Fav" : "☆ Fav"}
                    </button>
                  </div>
                  <div className="card-actions mt-2">
                    <Link className="btn btn-sm btn-outline" to={`/shop/${p.id}`}>
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="join mt-2">
            <button
              className="btn join-item"
              disabled={!hasPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button
              className="btn join-item"
              disabled={!hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
