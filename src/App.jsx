import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Categories from "./pages/admin/Categories";
import AddCategory from "./pages/admin/AddCategory";
import Orders from "./pages/admin/Orders";
import Boxes from "./pages/admin/Boxes";
import CustomerList from "./pages/admin/CustomerList";

/* CUSTOMER */
import CustomerProducts from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Dashboard />} />

          {/* PRODUCTS */}
          <Route
            path="products"
            element={<AdminProducts />}
          />
          <Route
            path="products/add"
            element={<AddProduct />}
          />

          {/* CATEGORIES */}
          <Route
            path="categories"
            element={<Categories />}
          />
          <Route
            path="categories/add"
            element={<AddCategory />}
          />

          {/* ORDERS */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* BOXES */}
          <Route
            path="boxes"
            element={<Boxes />}
          />

          {/* CUSTOMERS */}
          <Route
            path="customers"
            element={<CustomerList />}
          />

        </Route>

        {/* ================= CUSTOMER ================= */}
        <Route
          path="/products"
          element={<CustomerProducts />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;