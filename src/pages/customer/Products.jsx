import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { Menu } from "lucide-react";

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

  /* PRODUCTS */
  const fetchProducts = async () => {
    const res = await api.get("/Product/GetAllProducts");
    const data = res.data.Data || [];
    setProducts(data);
    setFiltered(data);
  };

  /* CATEGORIES */
  const fetchCategories = async () => {
    const res = await api.get("/Categories/GetAllCategories");
    setCategories(res.data.Data || []);
  };

  /* FILTER */
  const filterByCategory = (id) => {
    setSelectedCategoryId(id);
    setOpenSidebar(false);

    if (id === 0) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) => p.CategoryId === id)
      );
    }
  };

  /* CART */
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow p-3 flex items-center z-50">
        <button onClick={() => setOpenSidebar(true)}>
          <Menu />
        </button>
        <h1 className="ml-3 font-bold">Products</h1>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white shadow p-4 z-50
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-lg font-bold mb-4">
          Categories
        </h2>

        {/* ALL */}
        <button
          onClick={() => filterByCategory(0)}
          className={`w-full text-left p-2 rounded ${
            selectedCategoryId === 0
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          All Products
        </button>

        {/* CATEGORY LIST */}
        {categories.map((c) => (
          <button
            key={c.Id}
            onClick={() => filterByCategory(c.Id)}
            className={`w-full text-left p-2 mt-1 rounded ${
              selectedCategoryId === c.Id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {c.Name}
          </button>
        ))}

        {/* CLOSE BUTTON MOBILE */}
        <button
          className="md:hidden mt-4 bg-red-500 text-white w-full py-2 rounded"
          onClick={() => setOpenSidebar(false)}
        >
          Close
        </button>
      </aside>

      {/* BACKDROP */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* ================= PRODUCTS GRID ================= */}
      <main className="flex-1 p-4 md:p-6 mt-12 md:mt-0">

        <h1 className="hidden md:block text-2xl font-bold mb-5">
          All Products
        </h1>

        <div className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
        ">
          {filtered.map((p) => (
            <div
              key={p.Id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 md:p-4"
            >

              {/* IMAGE */}
              <img
                src={p.ImageUrl}
                className="h-40 w-full object-cover rounded"
              />

              {/* NAME */}
              <h2 className="font-semibold mt-2 text-sm md:text-base">
                {p.Name}
              </h2>

              {/* PRICE */}
              <p className="text-green-600 font-bold">
                ₹{p.Price}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded text-sm"
                >
                  Add
                </button>

                <button
                  onClick={() =>
                    navigate(`/products/${p.Id}`)
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                >
                  Buy
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}