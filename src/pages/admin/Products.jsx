// import { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       const res = await axiosInstance.get("/Product/GetAllProducts");
//       setProducts(res.data.Data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // DELETE PRODUCT (frontend logic ready)
//   const handleDelete = (id) => {
//     const updated = products.filter((p) => p.Id !== id);
//     setProducts(updated);

//     // later connect API:
//     // await axiosInstance.delete(`/Product/DeleteProduct/${id}`)
//   };

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//       <div className="border rounded-lg bg-white">

//         <Table>

//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Stock</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {products.map((p) => (
//               <TableRow key={p.Id}>

//                 <TableCell>{p.Id}</TableCell>

//                 <TableCell className="font-medium">
//                   {p.Name}
//                 </TableCell>

//                 <TableCell>₹{p.Price}</TableCell>

//                 <TableCell>{p.StockQuantity}</TableCell>

//                 <TableCell>
//                   <Badge className={p.IsAvailable ? "bg-green-500" : "bg-red-500"}>
//                     {p.IsAvailable ? "Active" : "Inactive"}
//                   </Badge>
//                 </TableCell>

//                 <TableCell className="flex gap-2">

//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => alert("Edit: " + p.Id)}
//                   >
//                     Edit
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleDelete(p.Id)}
//                   >
//                     Delete
//                   </Button>

//                 </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>

//         </Table>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/Product/GetAllProducts"
      );

      setProducts(res.data?.Data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    try {
      // Uncomment when API is ready
      // await axiosInstance.delete(`/Product/DeleteProduct/${id}`);

      setProducts((prev) =>
        prev.filter((p) => p.Id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <div className="text-gray-500">
          Total Products: {products.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length > 0 ? (
              products.map((p) => (
                <TableRow key={p.Id}>
                  <TableCell>{p.Id}</TableCell>

                  <TableCell>
                    <img
                      src={
                        p.ImageUrl
                          ? p.ImageUrl.startsWith("http")
                            ? p.ImageUrl
                            : `https://ecommerce-backend-oq9d.onrender.com${p.ImageUrl}`
                          : "/no-image.png"
                      }
                      alt={p.Name}
                      className="w-20 h-20 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "/no-image.png";
                      }}
                    />
                  </TableCell>

                  <TableCell className="font-semibold">
                    {p.Name}
                  </TableCell>

                  <TableCell>
                    ₹{p.Price}
                  </TableCell>

                  <TableCell>
                    {p.StockQuantity}
                  </TableCell>

                  <TableCell>
                    {p.DiscountPercentage
                      ? `${p.DiscountPercentage}%`
                      : "0%"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        p.IsAvailable
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {p.IsAvailable
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/admin/edit-product/${p.Id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDelete(p.Id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-10"
                >
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}