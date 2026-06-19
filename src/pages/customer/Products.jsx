import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import CustomerNavbar from "./CustomerNavbar";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

const BASE_URL =
  "https://ecommerce-backend-oq9d.onrender.com";

export default function Products() {
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(0);

  const [openSidebar, setOpenSidebar] =
    useState(false);

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useCategories();

  const loading =
    productsLoading || categoriesLoading;

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === 0)
      return products;

    return products.filter(
      (p) => p.CategoryId === selectedCategoryId
    );
  }, [products, selectedCategoryId]);

  const addToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item.Id === product.Id
    );

    if (existing) {
      existing.quantity =
        (existing.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  if (loading) {
    return (
      <>
        <CustomerNavbar />
        <div className="text-center p-10">
          Loading products...
        </div>
      </>
    );
  }

  if (productsError) {
    return (
      <>
        <CustomerNavbar />
        <div className="text-center text-red-500 p-10">
          Failed to load products.
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <CustomerNavbar />

      {/* Mobile Header */}
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
        {openSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpenSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 h-full w-64 bg-white shadow p-4 z-50
            transform transition-transform duration-300
            ${
              openSidebar
                ? "translate-x-0"
                : "-translate-x-full"
            }
            md:translate-x-0
          `}
        >
          <div className="flex justify-between md:hidden mb-3">
            <h2 className="font-bold">
              Categories
            </h2>

            <button
              onClick={() => setOpenSidebar(false)}
              className="text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          <button
            onClick={() =>
              setSelectedCategoryId(0)
            }
            className={`w-full text-left p-2 rounded ${
              selectedCategoryId === 0
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All Products
          </button>

          {categories.map((c) => (
            <button
              key={c.Id}
              onClick={() => {
                setSelectedCategoryId(c.Id);
                setOpenSidebar(false);
              }}
              className={`w-full text-left p-2 mt-1 rounded ${
                selectedCategoryId === c.Id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {c.Name}
            </button>
          ))}
        </aside>

        {/* Products */}
        <main className="flex-1 p-4 md:p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-semibold text-gray-700">
                No Products Available
              </h2>

              <p className="text-gray-500 mt-2 text-center">
                Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <div
                  key={p.Id}
                  className="bg-white shadow rounded p-3"
                >
                  <img
                    src={
                      p.ImageUrl?.startsWith("http")
                        ? p.ImageUrl
                        : `${BASE_URL}${p.ImageUrl}`
                    }
                    alt={p.Name}
                    loading="lazy"
                    className="h-40 w-full object-cover rounded cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/products/${p.Id}`
                      )
                    }
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />

                  <h2 className="font-semibold mt-2">
                    {p.Name}
                  </h2>

                  <p className="text-green-600 font-bold">
                    ₹{p.Price}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        addToCart(p)
                      }
                      className="flex-1 bg-yellow-500 text-white py-2 rounded"
                    >
                      Add
                    </button>

                    <button
                      onClick={() => {
                        addToCart(p);
                        navigate("/cart");
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}