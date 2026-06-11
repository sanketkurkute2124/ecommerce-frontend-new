import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state || null;

  useEffect(() => {
    if (!order) {
      // fallback if user refreshes page
      navigate("/products");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl"></div>

        {/* SUCCESS ICON */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <span className="text-5xl">🎉</span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-600 mt-5">
          Order Confirmed!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase 💚
        </p>

        {/* ORDER CARD */}
        <div className="mt-6 bg-gray-50 border rounded-2xl p-5 text-left space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-800">
              {order?.orderNumber || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-bold text-green-600">
              ₹{order?.totalAmount || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
              {order?.orderStatus || "Confirmed"}
            </span>
          </div>

        </div>

        {/* DELIVERY INFO */}
        <div className="mt-5 bg-green-50 text-green-700 p-3 rounded-xl text-sm">
          🚚 Estimated Delivery: 3–5 Business Days
        </div>

        {/* STEPS */}
        <div className="mt-6 flex justify-between text-xs text-gray-500">

          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
            <p>Placed</p>
          </div>

          <div className="text-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto"></div>
            <p>Shipped</p>
          </div>

          <div className="text-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto"></div>
            <p>Delivered</p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>

        </div>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 mt-5">
          We’ll notify you when your order is shipped 📦
        </p>

      </div>
    </div>
  );
}