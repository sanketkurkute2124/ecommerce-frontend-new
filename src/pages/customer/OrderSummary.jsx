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
    alert("Order Placed Successfully");

    localStorage.removeItem("cart");
  };

  return (
    <div className="container mt-4">
      <h2>Order Summary</h2>

      <h4>Products</h4>

      {cartItems.map((item) => (
        <div key={item.id}>
          {item.name} × {item.quantity}
        </div>
      ))}

      <hr />

      <h4>Address</h4>

      <p>
        {address.addressLine1}, {address.city},
        {address.state} - {address.pincode}
      </p>

      <hr />

      <h4>Payment</h4>
      <p>{paymentMethod}</p>

      <h3>Total ₹{total}</h3>

      <button
        className="btn btn-success"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}