import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [product, setProduct] = useState({
    Id: 0,
    Name: "",
    Description: "",
    Price: "",
    StockQuantity: "",
    DiscountPercentage: "",
    CategoryId: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `/Product/GetProductById/${id}`
      );

      const data = response.data.Data;

      setProduct({
        Id: data.Id,
        Name: data.Name,
        Description: data.Description,
        Price: data.Price,
        StockQuantity: data.StockQuantity,
        DiscountPercentage: data.DiscountPercentage,
        CategoryId: data.CategoryId,
      });

      if (data.ImageUrl) {
        setPreviewImage(
          data.ImageUrl.startsWith("http")
            ? data.ImageUrl
            : `https://ecommerce-backend-oq9d.onrender.com${data.ImageUrl}`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load product details.");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("Id", product.Id);
      formData.append("Name", product.Name);
      formData.append("Description", product.Description);
      formData.append("Price", product.Price);
      formData.append("StockQuantity", product.StockQuantity);
      formData.append(
        "DiscountPercentage",
        product.DiscountPercentage
      );
      formData.append("CategoryId", product.CategoryId);

      if (selectedImage) {
        formData.append("Image", selectedImage);
      }

      const response = await axiosInstance.put(
        "/Product/UpdateProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.Success) {
        alert(response.data.Data.Message);

        navigate("/admin/products");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.Errors?.length > 0) {
        alert(error.response.data.Errors.join("\n"));
      } else {
        alert("Something went wrong.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">
              Product Name
            </label>

            <input
              type="text"
              name="Name"
              value={product.Name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              Description
            </label>

            <textarea
              name="Description"
              value={product.Description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Price
              </label>

              <input
                type="number"
                name="Price"
                value={product.Price}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1">
                Stock Quantity
              </label>

              <input
                type="number"
                name="StockQuantity"
                value={product.StockQuantity}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Discount %
              </label>

              <input
                type="number"
                name="DiscountPercentage"
                value={product.DiscountPercentage}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">
                Category Id
              </label>

              <input
                type="number"
                name="CategoryId"
                value={product.CategoryId}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded p-2"
            />
          </div>

          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover border rounded"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}