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
import { Textarea } from "../../components/ui/textarea";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
      // name: Yup.string().required("Product Name is required"),
      // description: Yup.string().required("Description is required"),
      // price: Yup.number().required("Price is required"),
      // stockQuantity: Yup.number().required("Stock Quantity is required"),
      // categoryId: Yup.number().required("Category is required"),
      name: Yup.string()
        .required("Product Name is required")
        .min(
          3,
          "Product Name must be at least 3 characters"
        )
        .max(
          100,
          "Product Name cannot exceed 100 characters"
        ),

      description: Yup.string()
        .required("Description is required")
        .min(
          10,
          "Description must be at least 10 characters"
        ),

      price: Yup.number()
        .required("Price is required")
        .min(
          0.01,
          "Price must be greater than 0"
        )
        .max(
          10000,
          "Price cannot exceed 10000"
        ),

      stockQuantity: Yup.number()
        .required(
          "Stock Quantity is required"
        )
        .min(
          0,
          "Stock Quantity cannot be negative"
        )
        .max(
          1000,
          "Stock Quantity cannot exceed 1000"
        ),

      discountPercentage: Yup.number()
        .min(
          0,
          "Discount Percentage cannot be negative"
        )
        .max(
          100,
          "Discount Percentage cannot exceed 100"
        ),

      categoryId: Yup.number().required(
        "Category is required"
      ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("Name", values.name);
        formData.append("Description", values.description);
        formData.append("Price", values.price);
        formData.append("StockQuantity", values.stockQuantity);
        formData.append(
          "DiscountPercentage",
          values.discountPercentage || 0
        );
        formData.append("CategoryId", values.categoryId);
        formData.append(
          "IsAvailable",
          values.isAvailable
        );

        if (image) {
          formData.append("Image", image);
        }

        const response = await axiosInstance.post(
          "/Product/CreateProduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        alert("Product Added Successfully");

        resetForm();
        setImage(null);

        // Clear file input
        document.querySelector(
          'input[type="file"]'
        ).value = "";
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(
            JSON.stringify(error.response.data)
          );
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
            <div className="space-y-2">
              <Input
                name="name"
                placeholder="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name &&
                formik.errors.name && (
                  <p className="text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.price &&
                formik.errors.price && (
                  <p className="text-sm text-red-500">
                    {formik.errors.price}
                  </p>
                )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Textarea
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.description &&
                formik.errors.description && (
                  <p className="text-sm text-red-500">
                    {formik.errors.description}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <Input
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={formik.values.stockQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.stockQuantity &&
                formik.errors.stockQuantity && (
                  <p className="text-sm text-red-500">
                    {formik.errors.stockQuantity}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <Select
                value={formik.values.categoryId?.toString()}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    "categoryId",
                    Number(value)
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.Id}
                      value={category.Id.toString()}
                    >
                      {category.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formik.touched.categoryId &&
                formik.errors.categoryId && (
                  <p className="text-sm text-red-500">
                    {formik.errors.categoryId}
                  </p>
                )}
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
            <div className="space-y-2">
              <Input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.discountPercentage &&
                formik.errors.discountPercentage && (
                  <p className="text-sm text-red-500">
                    {formik.errors.discountPercentage}
                  </p>
                )}
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