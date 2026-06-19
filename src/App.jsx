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
import EditProduct from "./pages/admin/EditProduct";

/* CUSTOMER */
import CustomerProducts from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import AddAddress from "./pages/customer/AddAddress";
import Payment from "./pages/customer/Payment";
import OrderSummary from "./pages/customer/OrderSummary";
import Success from "./pages/customer/Success";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetails from "./pages/customer/OrderDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER FLOW */}
        <Route path="/products" element={<CustomerProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddAddress />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />  
  

        {/* ✅ SUCCESS PAGE (FIXED) */}
        <Route path="/success" element={<Success />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />

          <Route path="orders" element={<Orders />} />
          <Route path="boxes" element={<Boxes />} />
          <Route path="customers" element={<CustomerList />} />

          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

        {/* OLD ROUTES FIX */}
        <Route path="/customer/cart" element={<Navigate to="/cart" replace />} />
        <Route path="/customer/address" element={<Navigate to="/address" replace />} />
        <Route path="/customer/payment" element={<Navigate to="/payment" replace />} />
        <Route path="/customer/order-summary" element={<Navigate to="/order-summary" replace />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

