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

export default function AddCategory() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(
        "Category Name is required"
      ),

      description: Yup.string().required(
        "Description is required"
      ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          Name: values.name,
          Description: values.description,
        };

        const response = await axiosInstance.post(
          "/Categories/CreateCategory",
          payload
        );

        alert("Category Added Successfully");

        console.log(response.data);

        resetForm();
      } catch (error) {
        console.error(error);

        alert("Failed To Add Category");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Category Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <Input
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <Button
              type="submit"
              className="w-full"
            >
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}