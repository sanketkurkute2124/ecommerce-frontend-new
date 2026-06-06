import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Plus,
  Tags,
  ShoppingCart,
  Package,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Button } from "../../components/ui/button";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [openProducts, setOpenProducts] = useState(true);
  const [openCategories, setOpenCategories] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isProductRoute =
    location.pathname.startsWith("/admin/products");

  const isCategoryRoute =
    location.pathname.startsWith("/admin/categories");

  return (
    <div className="flex h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`
          bg-slate-900 text-white flex flex-col
          transition-all duration-300 shadow-xl
          ${sidebarCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-bold">
              🛒 Admin Panel
            </h1>
          )}

          <button
            onClick={() =>
              setSidebarCollapsed(!sidebarCollapsed)
            }
            className="p-2 rounded hover:bg-slate-800"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-3 space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-slate-800 text-slate-200"
              }`
            }
          >
            <LayoutDashboard size={20} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </NavLink>

          {/* PRODUCTS */}
          <button
            onClick={() =>
              setOpenProducts(!openProducts)
            }
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
            ${
              isProductRoute
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <ShoppingBag size={20} />

            {!sidebarCollapsed && (
              <>
                <span className="ml-3">
                  Products
                </span>

                <span className="ml-auto">
                  {openProducts ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              </>
            )}
          </button>

          {!sidebarCollapsed && openProducts && (
            <div className="ml-6 flex flex-col gap-1">
              <NavLink
                to="/admin/products"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-slate-800 text-slate-300"
                  }`
                }
              >
                <List size={16} />
                View Products
              </NavLink>

              <NavLink
                to="/admin/products/add"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-slate-800 text-slate-300"
                  }`
                }
              >
                <Plus size={16} />
                Add Product
              </NavLink>
            </div>
          )}

          {/* CATEGORIES */}
          <button
            onClick={() =>
              setOpenCategories(!openCategories)
            }
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all
            ${
              isCategoryRoute
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <Tags size={20} />

            {!sidebarCollapsed && (
              <>
                <span className="ml-3">
                  Categories
                </span>

                <span className="ml-auto">
                  {openCategories ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              </>
            )}
          </button>

          {!sidebarCollapsed && openCategories && (
            <div className="ml-6 flex flex-col gap-1">
              <NavLink
                to="/admin/categories"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-slate-800 text-slate-300"
                  }`
                }
              >
                <List size={16} />
                View Categories
              </NavLink>

              <NavLink
                to="/admin/categories/add"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-slate-800 text-slate-300"
                  }`
                }
              >
                <Plus size={16} />
                Add Category
              </NavLink>
            </div>
          )}

          {/* ORDERS */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-slate-800 text-slate-200"
              }`
            }
          >
            <ShoppingCart size={20} />
            {!sidebarCollapsed && (
              <span>Orders</span>
            )}
          </NavLink>

          {/* BOXES */}
          <NavLink
            to="/admin/boxes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-slate-800 text-slate-200"
              }`
            }
          >
            <Package size={20} />
            {!sidebarCollapsed && (
              <span>Boxes</span>
            )}
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t border-slate-700">
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut size={18} />
            {!sidebarCollapsed && (
              <span>Logout</span>
            )}
          </Button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}