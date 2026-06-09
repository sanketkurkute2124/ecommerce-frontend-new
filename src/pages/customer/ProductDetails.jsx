// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";
// import CustomerNavbar from "./CustomerNavbar";
// import { ArrowLeft } from "lucide-react";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     const res = await api.get(
//       `/Product/GetProductById/${id}`
//     );
//     setProduct(res.data.Data);
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen">

//       <CustomerNavbar />

//       <div className="p-4 md:p-8">

//         <button
//           onClick={() => navigate("/products")}
//           className="flex items-center gap-2 mb-4 bg-white px-3 py-2 rounded shadow"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>

//         <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-6">

//           <img
//             src={product.ImageUrl}
//             className="w-full h-[350px] object-cover rounded"
//           />

//           <div>

//             <h1 className="text-2xl font-bold">
//               {product.Name}
//             </h1>

//             <p className="text-gray-600 mt-2">
//               {product.Description}
//             </p>

//             <p className="text-2xl font-bold text-green-600 mt-4">
//               ₹{product.Price}
//             </p>

//             <div className="flex gap-3 mt-6">

//               <button className="flex-1 bg-yellow-500 text-white py-2 rounded">
//                 Add to Cart
//               </button>

//               <button className="flex-1 bg-blue-600 text-white py-2 rounded">
//                 Buy Now
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CustomerNavbar from "./CustomerNavbar";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [productRes, feedbackRes] = await Promise.all([
        api.get(`/Product/GetProductById/${id}`),
        api.get(`/Feedback/GetFeedbackForProduct/${id}`)
      ]);

      setProduct(productRes.data.Data);
      setFeedback(feedbackRes.data.Data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <CustomerNavbar />
        <div className="p-6 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <CustomerNavbar />
        <div className="p-6 text-center">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <CustomerNavbar />

      <div className="max-w-6xl mx-auto p-4 md:p-8">

        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-lg shadow"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Product Image */}
          <div className="bg-white p-6 rounded-xl shadow">

            <img
              src={product.ImageUrl}
              alt={product.Name}
              className="w-full h-[400px] object-contain"
            />

          </div>

          {/* Product Information */}
          <div className="space-y-4">

            <div className="bg-white p-6 rounded-xl shadow">

              <h1 className="text-2xl md:text-3xl font-bold">
                {product.Name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">

                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ {feedback?.AverageRating?.toFixed(1) || "0.0"}
                </div>

                <span className="text-gray-600">
                  {feedback?.Feedbacks?.length || 0} Reviews
                </span>

              </div>

              {/* Price */}
              <div className="mt-6">

                <p className="text-3xl font-bold text-green-600">
                  ₹{product.Price}
                </p>

              </div>

              {/* Delivery */}
              <div className="mt-4">

                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Free Delivery
                </span>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">

                <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium">
                  Add to Cart
                </button>

                <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium">
                  Buy Now
                </button>

              </div>

            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-lg font-semibold mb-3">
                Product Details
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {product.Description}
              </p>

            </div>

          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-6">
            Customer Reviews
          </h2>

          {feedback?.Feedbacks?.length > 0 ? (

            <div className="space-y-6">

              {feedback.Feedbacks.map((item) => (

                <div
                  key={item.Id}
                  className="border-b last:border-b-0 pb-4"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {item.CustomerName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          item.CreatedAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      ⭐ {item.Rating}
                    </div>

                  </div>

                  <p className="mt-3 text-gray-700">
                    {item.Comment}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No reviews available for this product.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}