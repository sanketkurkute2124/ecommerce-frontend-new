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

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required"),

      lastName: Yup.string()
        .required("Last Name is required"),

      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),

      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
        .required("Phone Number is required"),

      dateOfBirth: Yup.string()
        .required("Date of Birth is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

      role: Yup.string()
        .required("Role is required"),
    }),

    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm }) => {
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

        console.log(payload);

        const response = await axiosInstance.post(
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

        if (error.response) {
          console.log(error.response.data);
          alert(JSON.stringify(error.response.data));
        } else {
          alert("Something went wrong");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

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
              className="w-full border rounded-lg p-3"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              className="w-full border rounded-lg p-3"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              className="w-full border rounded-lg p-3"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.phoneNumber &&
              formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phoneNumber}
                </p>
              )}
          </div>

          {/* DOB */}
          <div>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full border rounded-lg p-3"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              placeholder="Password"
              className="w-full border rounded-lg p-3"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <select
              name="role"
              className="w-full border rounded-lg p-3"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="Customer">
                Customer
              </option>
              <option value="Admin">
                Admin
              </option>
            </select>

            {formik.touched.role &&
              formik.errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.role}
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid}
            className="w-full bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 disabled:bg-gray-400"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}