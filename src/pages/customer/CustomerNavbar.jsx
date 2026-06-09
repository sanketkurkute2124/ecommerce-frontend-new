import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerNavbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [customerName, setCustomerName] = useState("");

  /* ---------------- LOAD USER NAME ---------------- */
  const loadUser = () => {
    const name = localStorage.getItem("customerName");
    setCustomerName(name);
  };

  /* ---------------- LOAD CART ---------------- */
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    loadUser();
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("customerId");
    localStorage.removeItem("customerName");
    localStorage.removeItem("cart");

    setCustomerName("");
    setCartCount(0);

    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-50">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/products")}
        className="text-lg font-bold text-pink-600 cursor-pointer"
      >
        🛍 MyShop
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* CART */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* USER SECTION */}
        {customerName ? (
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-1 text-gray-700">
              <User size={18} />
              <span className="text-sm font-medium">
                Hello, {customerName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm transition"
          >
            Login
          </Link>
        )}

      </div>
    </div>
  );
}