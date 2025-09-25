import { Outlet, NavLink } from "react-router-dom";

export default function ShopLayout() {
  const linkBase =
    "btn btn-sm sm:btn-md";
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <NavLink to="/shop" end className={({isActive}) => `${linkBase} ${isActive?'btn-primary':'btn-outline'}`}>
          Katalog
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
