import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await axiosInstance.get(
        "/Orders/GetAllOrders"
      );

      setOrders(response.data.Data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order No</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Customer Id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.Id}>
                  <TableCell>
                    {order.OrderNumber}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      order.OrderDate
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {order.CustomerId}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.OrderStatus === "Pending"
                          ? "bg-yellow-500"
                          : order.OrderStatus === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.OrderStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    {order.OrderItems?.length}
                  </TableCell>

                  <TableCell>
                    ₹{order.TotalAmount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center"
                >
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}