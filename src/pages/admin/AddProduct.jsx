import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "/Categories/GetAllCategories"
      );

      setCategories(response.data.Data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      // imageUrl: "",
      discountPercentage: "",
      categoryId: "",
      isAvailable: true,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Product Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      stockQuantity: Yup.number().required("Stock Quantity is required"),
      categoryId: Yup.number().required("Category is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("Name", values.name);
        formData.append(
          "Description",
          values.description
        );
        formData.append(
          "Price",
          values.price
        );
        formData.append(
          "StockQuantity",
          values.stockQuantity
        );
        formData.append(
          "DiscountPercentage",
          values.discountPercentage || 0
        );
        formData.append(
          "CategoryId",
          values.categoryId
        );

        if (image) {
          formData.append("Image", image);
        }

        await axiosInstance.post(
          "/Product/CreateProduct",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
        // console.log(response.data);

        alert("Product Added Successfully");

        resetForm();
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.log(error.response.data);
          alert(JSON.stringify(error.response.data));
        } else {
          alert(error.message);
        }
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Product Name */}
            <div>
              <Input
                name="name"
                placeholder="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-sm">
                {formik.touched.name && formik.errors.name}
              </p>
            </div>

            {/* Price */}
            <div>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Input
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>

            {/* Stock */}
            <div>
              <Input
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={formik.values.stockQuantity}
                onChange={formik.handleChange}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category.Id}
                    value={category.Id}
                  >
                    {category.Name}
                  </option>
                ))}
              </select>

              <p className="text-red-500 text-sm">
                {formik.touched.categoryId &&
                  formik.errors.categoryId}
              </p>
            </div>

            <div className="md:col-span-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Discount */}
            <div>
              <Input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
              />
            </div>

            {/* Available */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formik.values.isAvailable}
                onChange={formik.handleChange}
              />
              <label>Available</label>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}