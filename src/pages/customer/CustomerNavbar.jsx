import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const token = localStorage.getItem("token");
export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(count);
  };

  useEffect(() => {
    loadCartCount();

    window.addEventListener(
      "cartUpdated",
      loadCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );
    };
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-50">

      <h1 className="text-lg font-bold text-blue-600">
        🛍 MyShop
      </h1>

      <div className="flex items-center gap-4">

        {/* CART */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/customer/cart")}
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">

          {!token ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/cart">🛒 Cart</Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("customerId");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )}

        </div>
        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}