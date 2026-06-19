import { useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import { useMyOrders } from "../../hooks/useMyOrders";

export default function MyOrders() {
  const customerId = localStorage.getItem("customerId");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useMyOrders(customerId);

  if (isLoading) {
    return (
      <>
        <CustomerNavbar />
        <div className="p-10 text-center">
          Loading orders...
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <CustomerNavbar />
        <div className="p-10 text-center text-red-500">
          Failed to load orders
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNavbar />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            No Orders Found
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.Id}
                className="bg-white rounded-lg shadow p-5"
              >
                {/* Order Summary */}
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold text-lg">
                      {order.OrderNumber}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(order.OrderDate).toLocaleString()}
                    </p>

                    <p className="mt-2">
                      Status :
                      <span className="ml-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {order.OrderStatus}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{order.TotalAmount}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order.Id
                            ? null
                            : order.Id
                        )
                      }
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      {expandedOrder === order.Id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.Id && (
                  <div className="mt-6 border-t pt-4">

                    <h4 className="font-bold text-lg mb-3">
                      Order Details
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">

                      <div>
                        <p>
                          <strong>Order ID:</strong> {order.Id}
                        </p>

                        <p>
                          <strong>Customer ID:</strong>{" "}
                          {order.CustomerId}
                        </p>

                        <p>
                          <strong>Billing Address ID:</strong>{" "}
                          {order.BillingAddressId}
                        </p>

                        <p>
                          <strong>Shipping Address ID:</strong>{" "}
                          {order.ShippingAddressId}
                        </p>

                        <p>
                          <strong>Order Status:</strong>{" "}
                          {order.OrderStatus}
                        </p>
                      </div>

                      <div>
                        <p>
                          <strong>Base Amount:</strong> ₹
                          {order.TotalBaseAmount}
                        </p>

                        <p>
                          <strong>Discount:</strong> ₹
                          {order.TotalDiscountAmount}
                        </p>

                        <p>
                          <strong>Shipping:</strong> ₹
                          {order.ShippingCost}
                        </p>

                        <p className="text-lg font-bold text-green-600">
                          Total: ₹{order.TotalAmount}
                        </p>
                      </div>

                    </div>

                    {/* Products */}
                    <div className="mt-6">
                      <h4 className="font-bold mb-3">
                        Ordered Products
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full border">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border p-2">
                                Product ID
                              </th>
                              <th className="border p-2">
                                Quantity
                              </th>
                              <th className="border p-2">
                                Unit Price
                              </th>
                              <th className="border p-2">
                                Discount
                              </th>
                              <th className="border p-2">
                                Total
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {order.OrderItems?.map((item) => (
                              <tr key={item.Id}>
                                <td className="border p-2">
                                  {item.ProductId}
                                </td>

                                <td className="border p-2">
                                  {item.Quantity}
                                </td>

                                <td className="border p-2">
                                  ₹{item.UnitPrice}
                                </td>

                                <td className="border p-2">
                                  ₹{item.Discount}
                                </td>

                                <td className="border p-2 font-semibold">
                                  ₹{item.TotalPrice}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}