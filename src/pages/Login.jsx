// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useFormik } from "formik";
// import axios from "axios";

// export default function Login() {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     onSubmit: async (values) => {
//       const res = await axios.post(
//         "https://ecommerce-backend-oq9d.onrender.com/api/Customers/Login",
//         values
//       );

//       const data = res.data.Data;

//       localStorage.setItem("token", data.Token);
//       localStorage.setItem("role", data.Role);

//       if (data.Role === "Admin") navigate("/admin");
//       else navigate("/customer");
//     },
//   });

//   return (
//     <div className="flex h-screen items-center justify-center">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="w-96 p-6 border rounded-xl space-y-4"
//       >
//         <h1 className="text-xl font-bold">Login</h1>

//         <Input
//           name="email"
//           placeholder="Email"
//           onChange={formik.handleChange}
//         />

//         <Input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={formik.handleChange}
//         />

//         <Button className="w-full">Login</Button>

//         <p
//           onClick={() => navigate("/register")}
//           className="text-sm text-blue-500 cursor-pointer"
//         >
//           Create account
//         </p>
//       </form>
//     </div>
//   );
// }

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Please enter a valid email address"
        )
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),

    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      try {
        const payload = {
          Email: values.email,
          Password: values.password,
        };

        const response = await axiosInstance.post(
          "/Customers/Login",
          payload
        );

        console.log(response.data);

        if (response.data.Success) {
          const data = response.data.Data;

          localStorage.setItem("token", data.Token);
          localStorage.setItem("role", data.Role);
          localStorage.setItem("customerId", data.CustomerId);
          localStorage.setItem("customerName", data.CustomerName);

          alert("Login Successful");

          if (data.Role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/products");
          }
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          alert(
            error.response.data?.Errors?.join(", ") ||
            "Login failed"
          );
        } else {
          alert("Unable to connect to server");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />

            {formik.touched.email &&
              formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />

            {formik.touched.password &&
              formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!formik.isValid}
            className="w-full bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 disabled:bg-gray-400"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-5">
          <p className="text-gray-600">
            Not registered yet?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}