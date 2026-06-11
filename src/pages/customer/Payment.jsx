import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";

export default function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [bank, setBank] = useState("");

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

 const handlePay = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const paymentMethod = localStorage.getItem("paymentMethod");

  navigate("/order-summary", {
    state: {
      cartItems,
      selectedAddress,
      paymentMethod
    }
  });
};
  return (
    <div className="bg-gray-100 min-h-screen pb-28">
      <CustomerNavbar />

      <div className="max-w-4xl mx-auto p-4">

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-3 flex justify-between">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">
              FREE
            </span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="text-xl font-bold mb-4">
            Select Payment Method
          </h2>

          {/* COD */}
          <label className="flex items-center gap-3 border rounded-lg p-4 mb-3 cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() =>
                setPaymentMethod("COD")
              }
            />

            <span className="font-medium">
              Cash On Delivery
            </span>
          </label>

          {/* UPI */}
          <label className="block border rounded-lg p-4 mb-3 cursor-pointer">

            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "UPI"}
                onChange={() =>
                  setPaymentMethod("UPI")
                }
              />

              <span className="font-medium">
                UPI Payment
              </span>
            </div>

            {paymentMethod === "UPI" && (
              <div className="mt-4">

                <div className="grid grid-cols-3 gap-3">

                  <button className="border rounded-lg p-3">
                    Google Pay
                  </button>

                  <button className="border rounded-lg p-3">
                    PhonePe
                  </button>

                  <button className="border rounded-lg p-3">
                    Paytm
                  </button>

                </div>

                <div className="mt-5 text-center">

                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
                    alt="QR"
                    className="mx-auto"
                  />

                  <p className="text-gray-500 mt-2">
                    Scan QR using any UPI App
                  </p>

                </div>

              </div>
            )}
          </label>

          {/* CARD */}
          <label className="block border rounded-lg p-4 mb-3 cursor-pointer">

            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "CARD"}
                onChange={() =>
                  setPaymentMethod("CARD")
                }
              />

              <span className="font-medium">
                Credit / Debit Card
              </span>
            </div>

            {paymentMethod === "CARD" && (
              <div className="mt-4 space-y-3">

                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full border p-3 rounded"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="border p-3 rounded"
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    className="border p-3 rounded"
                  />

                </div>

              </div>
            )}
          </label>

          {/* NET BANKING */}
          <label className="block border rounded-lg p-4">

            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={
                  paymentMethod === "NETBANKING"
                }
                onChange={() =>
                  setPaymentMethod(
                    "NETBANKING"
                  )
                }
              />

              <span className="font-medium">
                Net Banking
              </span>
            </div>

            {paymentMethod === "NETBANKING" && (
              <select
                value={bank}
                onChange={(e) =>
                  setBank(e.target.value)
                }
                className="w-full mt-4 border p-3 rounded"
              >
                <option value="">
                  Select Bank
                </option>

                <option>
                  State Bank of India
                </option>

                <option>HDFC Bank</option>

                <option>ICICI Bank</option>

                <option>Axis Bank</option>

                <option>Kotak Bank</option>

                <option>
                  Bank of Baroda
                </option>
              </select>
            )}

          </label>

        </div>

      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">

        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">

          <div>
            <p className="text-gray-500">
              Total Payable
            </p>

            <h2 className="font-bold text-2xl text-green-600">
              ₹{totalAmount}
            </h2>
          </div>

          <button
            onClick={handlePay}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Pay Now
          </button>

        </div>

      </div>
    </div>
  );
}