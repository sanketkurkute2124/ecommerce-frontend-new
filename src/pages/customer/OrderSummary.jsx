export default function OrderSummary() {
  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  const address =
    JSON.parse(localStorage.getItem("address")) || {};

  const paymentMethod =
    localStorage.getItem("paymentMethod");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    alert("Order Placed Successfully 🎉");
    localStorage.removeItem("cart");
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

          <div className="space-y-3">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-green-600">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* ADDRESS */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-lg font-semibold mb-3">
            Delivery Address
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {address.addressLine1}, {address.city},{" "}
            {address.state} - {address.pincode}
          </p>

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
            <p className="text-gray-500">Total Amount</p>
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