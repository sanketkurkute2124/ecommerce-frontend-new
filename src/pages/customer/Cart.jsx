import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.Id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.Id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(
      (item) => item.Id !== id
    );

    updateCart(updated);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen pb-28">
      <CustomerNavbar />

      <div className="max-w-5xl mx-auto p-4">

        <h2 className="text-2xl font-bold mb-4">
          Shopping Cart ({totalItems})
        </h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded text-center shadow">
            <h3 className="text-xl font-semibold">
              Your Cart is Empty
            </h3>

            <button
              onClick={() => navigate("/products")}
              className="mt-4 bg-pink-600 text-white px-5 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.Id}
                className="bg-white rounded-xl shadow mb-4 p-4 flex gap-4"
              >
                <img
                  src={item.ImageUrl}
                  alt={item.Name}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {item.Name}
                  </h3>

                  <p className="text-green-600 font-bold text-xl mt-2">
                    ₹{item.Price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQty(item.Id)}
                      className="bg-gray-200 w-8 h-8 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.Id)}
                      className="bg-pink-600 text-white w-8 h-8 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.Id)}
                      className="ml-5 text-red-500"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t">
          <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Amount
              </p>

              <h3 className="text-2xl font-bold text-green-600">
                ₹{totalPrice}
              </h3>
            </div>

            <button
              onClick={() =>
                navigate("/customer/address")
              }
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}