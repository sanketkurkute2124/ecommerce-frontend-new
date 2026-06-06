import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(
        `/Product/GetProductById/${id}`
      );
      setProduct(res.data.Data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return (
      <div className="p-6 text-center">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate("/products")}
        className="flex items-center gap-2 mb-4 text-sm md:text-base bg-white px-3 py-2 rounded shadow hover:bg-gray-100"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      {/* ================= MAIN CARD ================= */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.ImageUrl}
            className="w-full max-h-[350px] md:max-h-[450px] object-cover rounded-lg"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">

          {/* NAME */}
          <h1 className="text-xl md:text-3xl font-bold">
            {product.Name}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            {product.Description}
          </p>

          {/* PRICE */}
          <p className="text-2xl md:text-3xl font-bold text-green-600 mt-4">
            ₹{product.Price}
          </p>

          {/* EXTRA INFO (Meesho style) */}
          <div className="mt-4 bg-gray-100 p-3 rounded text-sm space-y-1">
            <p>✔ Free Delivery</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ 7 Days Return Policy</p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button className="flex-1 bg-yellow-500 text-white py-2 rounded font-medium">
              Add to Cart
            </button>

            <button className="flex-1 bg-blue-600 text-white py-2 rounded font-medium">
              Buy Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}