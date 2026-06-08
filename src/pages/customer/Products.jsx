import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CustomerNavbar from "./CustomerNavbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ---------------- API ---------------- */
  const fetchProducts = async () => {
    const res = await api.get("/Product/GetAllProducts");
    const data = res.data.Data || [];
    setProducts(data);
    setFiltered(data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/Categories/GetAllCategories");
    setCategories(res.data.Data || []);
  };

  /* ---------------- FILTER ---------------- */
  const filterByCategory = (id) => {
    setSelectedCategoryId(id);

    if (id === 0) {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.CategoryId === id));
    }
  };

  /* ---------------- ADD TO CART ---------------- */
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) => item.Id === product.Id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));

  alert("Added to cart");
};
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* NAVBAR */}
      <CustomerNavbar />

      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center p-3 bg-white shadow">
        <h1 className="font-bold">Products</h1>

        <button
          onClick={() => setOpenSidebar(true)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      <div className="flex">

        {/* BACKDROP (FIX 1) */}
        {openSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpenSidebar(false)}
          />
        )}

        {/* SIDEBAR (FIX 2 - FULL CONTROL) */}
        <aside
          className={`
            fixed md:static top-0 left-0 h-full w-64 bg-white shadow p-4 z-50
            transform transition-transform duration-300
            ${openSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >

          {/* CLOSE BUTTON (mobile only) */}
          <div className="flex justify-between items-center md:hidden mb-3">
            <h2 className="font-bold">Categories</h2>

            <button
              onClick={() => setOpenSidebar(false)}
              className="text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          {/* ALL CATEGORY */}
          <button
            onClick={() => {
              filterByCategory(0);
              setOpenSidebar(false);   // FIX 3
            }}
            className={`w-full text-left p-2 rounded ${selectedCategoryId === 0
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
              }`}
          >
            All Products
          </button>

          {/* CATEGORY LIST */}
          {categories.map(c => (
            <button
              key={c.Id}
              onClick={() => {
                filterByCategory(c.Id);
                setOpenSidebar(false);   // FIX 4
              }}
              className={`w-full text-left p-2 mt-1 rounded ${selectedCategoryId === c.Id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
                }`}
            >
              {c.Name}
            </button>
          ))}

        </aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1 p-4 md:p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

            {filtered.map(p => (
              <div key={p.Id} className="bg-white shadow rounded p-3">

                <img
                  src={p.ImageUrl}
                  className="h-40 w-full object-cover rounded"
                />

                <h2 className="font-semibold mt-2">
                  {p.Name}
                </h2>

                <p className="text-green-600 font-bold">
                  ₹{p.Price}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded"
                  >
                    Add
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/products/${p.Id}`)
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Buy
                  </button>

                </div>

              </div>
            ))}

          </div>

        </main>

      </div>
    </div>
  );
}
