import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Plus,
  Tags,
  ShoppingCart,
  Package,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [openProducts, setOpenProducts] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-white text-black p-2 rounded flex items-center gap-2"
      : "p-2 hover:bg-gray-800 rounded flex items-center gap-2 text-gray-200";

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        {/* HEADER */}
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          🛒 Admin Panel
        </div>

        {/* MENU */}
        <nav className="flex flex-col p-2 gap-1">

          {/* DASHBOARD */}
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* PRODUCTS DROPDOWN */}
          <div className="flex flex-col">

            <button
              onClick={() => setOpenProducts(!openProducts)}
              className="p-2 hover:bg-gray-800 rounded flex items-center gap-2 w-full text-left text-gray-200"
            >
              <ShoppingBag size={18} />
              Products
              <span className="ml-auto text-xs">
                {openProducts ? "▲" : "▼"}
              </span>
            </button>

            {openProducts && (
              <div className="ml-6 flex flex-col gap-1 mt-1">

                <NavLink to="/admin/products" className={linkClass}>
                  <List size={16} />
                  View Products
                </NavLink>

                <NavLink to="/admin/products/add" className={linkClass}>
                  <Plus size={16} />
                  Add Product
                </NavLink>

              </div>
            )}
          </div>

          {/* CATEGORIES */}
          <NavLink to="/admin/categories" className={linkClass}>
            <Tags size={18} />
            Categories
          </NavLink>

          {/* ORDERS */}
          <NavLink to="/admin/orders" className={linkClass}>
            <ShoppingCart size={18} />
            Orders
          </NavLink>

          {/* BOXES */}
          <NavLink to="/admin/boxes" className={linkClass}>
            <Package size={18} />
            Boxes
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <div className="mt-auto p-3 border-t border-gray-700">
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}