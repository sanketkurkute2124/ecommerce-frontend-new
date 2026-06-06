import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

import { Card, CardContent } from "../../components/ui/card";
import {
  Users,
  ShoppingBag,
  ClipboardList,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [customersRes, productsRes, ordersRes] = await Promise.all([
        axiosInstance.get("/Customers/GetAllCustomers"),
        axiosInstance.get("/Product/GetAllProducts"),
        axiosInstance.get("/Orders/GetAllOrders"), // Change if your endpoint differs
      ]);

      setCustomerCount(customersRes.data?.Data?.length || 0);
      setProductCount(productsRes.data?.Data?.length || 0);
      setOrderCount(ordersRes.data?.Data?.length || 0);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Customers */}
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Customers</p>
              <h2 className="text-4xl font-bold">
                {customerCount}
              </h2>
            </div>

            <Users size={40} />
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Products</p>
              <h2 className="text-4xl font-bold">
                {productCount}
              </h2>
            </div>

            <ShoppingBag size={40} />
          </CardContent>
        </Card>

        {/* Orders */}
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Orders</p>
              <h2 className="text-4xl font-bold">
                {orderCount}
              </h2>
            </div>

            <ClipboardList size={40} />
          </CardContent>
        </Card>

        {/* Revenue Placeholder */}
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h2 className="text-4xl font-bold">
                ₹0
              </h2>
            </div>

            <IndianRupee size={40} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}