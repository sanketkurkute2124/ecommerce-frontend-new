import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePayment = () => {
    localStorage.setItem("paymentMethod", paymentMethod);

    navigate("/customer/order-summary");
  };

  return (
    <div className="container mt-4">
      <h2>Select Payment</h2>

      <div className="form-check">
        <input
          type="radio"
          checked={paymentMethod === "COD"}
          onChange={() => setPaymentMethod("COD")}
        />
        <label>Cash On Delivery</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          checked={paymentMethod === "Online"}
          onChange={() => setPaymentMethod("Online")}
        />
        <label>Online Payment</label>
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={handlePayment}
      >
        Review Order
      </button>
    </div>
  );
}