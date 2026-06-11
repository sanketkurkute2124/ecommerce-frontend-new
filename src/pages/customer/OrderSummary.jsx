import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ SAFE DATA ACCESS
  const cartItems = state?.cartItems || [];
  const address = state?.selectedAddress || {};
  const paymentMethod = state?.paymentMethod || "COD";

  const customerId = localStorage.getItem("customerId");

  // ✅ TOTAL CALCULATION
  const total = cartItems.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  /* ---------------- PLACE ORDER API ---------------- */
  const placeOrder = async () => {
    try {
      if (!address?.Id) {
        alert("Address not found!");
        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty!");
        return;
      }

      const payload = {
        customerId: Number(customerId),
        billingAddressId: address.Id,
        shippingAddressId: address.Id,
        orderItems: cartItems.map(item => ({
          productId: item.Id,
          quantity: item.quantity
        }))
      };

      const res = await api.post(
        "/Orders/CreateOrder",
        payload
      );

      console.log("ORDER CREATED:", res.data);
      console.log("ORDER SUMMARY STATE:", state);
      // clear cart
      localStorage.removeItem("cart");

      alert("🎉 Order Placed Successfully!");

      navigate("/success", {
        state: res.data.data
      });

    } catch (error) {
      console.error(error);
      alert("❌ Order failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">

      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800">
          Order Summary
        </h2>

        {/* PRODUCTS */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-lg font-semibold mb-4">
            Products
          </h3>

          {cartItems.length === 0 ? (
            <p className="text-red-500">
              ❌ No products found
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.Id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.Name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-green-600">
                  ₹{item.Price * item.quantity}
                </p>
              </div>
            ))
          )}

        </div>

        {/* ADDRESS */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-lg font-semibold mb-3">
            Delivery Address
          </h3>

          {address?.AddressLine1 ? (
            <p className="text-gray-700">
              {address.AddressLine1}, {address.AddressLine2},{" "}
              {address.City}, {address.State} - {address.PostalCode}
            </p>
          ) : (
            <p className="text-red-500">
              ❌ No address selected
            </p>
          )}

        </div>

        {/* PAYMENT */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-lg font-semibold mb-2">
            Payment Method
          </h3>

          <p className="text-gray-700 capitalize">
            {paymentMethod}
          </p>

        </div>

        {/* TOTAL + BUTTON */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">

          <div>
            <p className="text-gray-500">
              Total Amount
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              ₹{total}
            </h3>
          </div>

          <button
            onClick={placeOrder}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}