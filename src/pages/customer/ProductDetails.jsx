import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CustomerNavbar from "./CustomerNavbar";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await api.get(
      `/Product/GetProductById/${id}`
    );
    setProduct(res.data.Data);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">

      <CustomerNavbar />

      <div className="p-4 md:p-8">

        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 mb-4 bg-white px-3 py-2 rounded shadow"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-6">

          <img
            src={product.ImageUrl}
            className="w-full h-[350px] object-cover rounded"
          />

          <div>

            <h1 className="text-2xl font-bold">
              {product.Name}
            </h1>

            <p className="text-gray-600 mt-2">
              {product.Description}
            </p>

            <p className="text-2xl font-bold text-green-600 mt-4">
              ₹{product.Price}
            </p>

            <div className="flex gap-3 mt-6">

              <button className="flex-1 bg-yellow-500 text-white py-2 rounded">
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-600 text-white py-2 rounded">
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}