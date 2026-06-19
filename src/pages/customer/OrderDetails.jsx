import { useLocation, useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) {
    return (
      <div className="p-5">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
      >
        Back
      </button>

      <div className="bg-white rounded-lg shadow p-5">

        <h2 className="text-2xl font-bold mb-4">
          Order Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <p>
              <strong>Order Number:</strong>
              {" "}
              {order.OrderNumber}
            </p>

            <p>
              <strong>Order Date:</strong>
              {" "}
              {new Date(order.OrderDate).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              <span className="text-orange-600">
                {order.OrderStatus}
              </span>
            </p>
          </div>

          <div>
            <p>
              <strong>Billing Address ID:</strong>
              {" "}
              {order.BillingAddressId}
            </p>

            <p>
              <strong>Shipping Address ID:</strong>
              {" "}
              {order.ShippingAddressId}
            </p>
          </div>

        </div>

        <hr className="my-5" />

        <h3 className="font-bold text-lg mb-3">
          Ordered Products
        </h3>

        {order.OrderItems.map((item) => (
          <div
            key={item.Id}
            className="border rounded p-4 mb-3"
          >
            <div className="grid md:grid-cols-2 gap-3">

              <div>
                <p>
                  <strong>Product ID:</strong>
                  {" "}
                  {item.ProductId}
                </p>

                <p>
                  <strong>Quantity:</strong>
                  {" "}
                  {item.Quantity}
                </p>
              </div>

              <div>
                <p>
                  <strong>Unit Price:</strong>
                  ₹{item.UnitPrice}
                </p>

                <p>
                  <strong>Discount:</strong>
                  ₹{item.Discount}
                </p>

                <p className="font-semibold text-green-600">
                  Total: ₹{item.TotalPrice}
                </p>
              </div>

            </div>
          </div>
        ))}

        <hr className="my-5" />

        <h3 className="font-bold text-lg mb-3">
          Price Summary
        </h3>

        <div className="space-y-2">

          <div className="flex justify-between">
            <span>Base Amount</span>
            <span>₹{order.TotalBaseAmount}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">
              - ₹{order.TotalDiscountAmount}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping Charges</span>
            <span>₹{order.ShippingCost}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Paid</span>
            <span>₹{order.TotalAmount}</span>
          </div>

        </div>

      </div>
    </div>
  );
}