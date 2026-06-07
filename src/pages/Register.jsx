import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      role: "Customer",
    },

    validateOnChange: true,
    validateOnBlur: true,

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required"),

      lastName: Yup.string()
        .required("Last Name is required"),

      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),

      phoneNumber: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "Phone Number must be exactly 10 digits"
        )
        .required("Phone Number is required"),

      dateOfBirth: Yup.date()
        .max(
          new Date(),
          "Date of Birth cannot be in the future"
        )
        .required("Date of Birth is required"),

      password: Yup.string()
        .min(
          8,
          "Password must be at least 8 characters"
        )
        .required("Password is required"),

      role: Yup.string()
        .required("Role is required"),
    }),

    onSubmit: async (
      values,
      { resetForm, setSubmitting }
    ) => {
      try {
        const payload = {
          FirstName: values.firstName,
          LastName: values.lastName,
          Email: values.email,
          PhoneNumber: values.phoneNumber,
          DateOfBirth: new Date(
            values.dateOfBirth
          ).toISOString(),
          Password: values.password,
          Role: values.role,
        };

        const response =
          await axiosInstance.post(
            "/Customers/RegisterCustomer",
            payload
          );

        if (response.data.Success) {
          alert("Registration Successful");

          resetForm();

          navigate("/");
        } else {
          alert("Registration Failed");
        }
      } catch (error) {
        console.error(error);

        if (error.response?.data) {
          alert(
            JSON.stringify(error.response.data)
          );
        } else {
          alert("Something went wrong");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register your account
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4"
        >
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.firstName &&
              formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </p>
              )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.lastName &&
              formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </p>
              )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.email &&
              formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              maxLength={10}
              value={formik.values.phoneNumber}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                formik.setFieldValue(
                  "phoneNumber",
                  value
                );
              }}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.phoneNumber &&
              formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phoneNumber}
                </p>
              )}
          </div>

          {/* Date Of Birth */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              max={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.dateOfBirth &&
              formik.errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.dateOfBirth}
                </p>
              )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            {formik.touched.password &&
              formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Role
            </label>

            <select
              name="role"
              value={formik.values.role}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            >
              <option value="Customer">
                Customer
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              !formik.isValid ||
              formik.isSubmitting
            }
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 disabled:bg-gray-400 transition"
          >
            {formik.isSubmitting
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}