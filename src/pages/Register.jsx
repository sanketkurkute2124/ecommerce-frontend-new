import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "Customer",
    },
    onSubmit: async (values) => {
      await axios.post(
        "https://ecommerce-backend-oq9d.onrender.com/api/Customers/RegisterCustomer",
        values
      );

      navigate("/login");
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-96 space-y-3" onSubmit={formik.handleSubmit}>
        <Input name="firstName" placeholder="First Name" onChange={formik.handleChange} />
        <Input name="lastName" placeholder="Last Name" onChange={formik.handleChange} />
        <Input name="email" placeholder="Email" onChange={formik.handleChange} />
        <Input name="phoneNumber" placeholder="Phone" onChange={formik.handleChange} />
        <Input name="password" type="password" placeholder="Password" onChange={formik.handleChange} />

        <Button className="w-full">Register</Button>
      </form>
    </div>
  );
}