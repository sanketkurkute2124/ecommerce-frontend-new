import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Products</h2>
          <p className="text-gray-500">120</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Orders</h2>
          <p className="text-gray-500">45</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Customers</h2>
          <p className="text-gray-500">30</p>
        </CardContent>
      </Card>

    </div>
  );
}