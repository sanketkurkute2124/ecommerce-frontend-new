import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/Product/GetAllProducts");
      setProducts(res.data.Data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT (frontend logic ready)
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.Id !== id);
    setProducts(updated);

    // later connect API:
    // await axiosInstance.delete(`/Product/DeleteProduct/${id}`)
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="border rounded-lg bg-white">

        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.Id}>

                <TableCell>{p.Id}</TableCell>

                <TableCell className="font-medium">
                  {p.Name}
                </TableCell>

                <TableCell>₹{p.Price}</TableCell>

                <TableCell>{p.StockQuantity}</TableCell>

                <TableCell>
                  <Badge className={p.IsAvailable ? "bg-green-500" : "bg-red-500"}>
                    {p.IsAvailable ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                <TableCell className="flex gap-2">

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert("Edit: " + p.Id)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(p.Id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>

      </div>
    </div>
  );
}