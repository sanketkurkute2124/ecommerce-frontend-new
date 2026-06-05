import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const res = await axios.post(
        "https://ecommerce-backend-oq9d.onrender.com/api/Customers/Login",
        values
      );

      const data = res.data.Data;

      localStorage.setItem("token", data.Token);
      localStorage.setItem("role", data.Role);

      if (data.Role === "Admin") navigate("/admin");
      else navigate("/customer");
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-96 p-6 border rounded-xl space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <Input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
        />

        <Button className="w-full">Login</Button>

        <p
          onClick={() => navigate("/register")}
          className="text-sm text-blue-500 cursor-pointer"
        >
          Create account
        </p>
      </form>
    </div>
  );
}