// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// /* AUTH */
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// /* ADMIN */
// import AdminLayout from "./pages/admin/AdminLayout";
// import Dashboard from "./pages/admin/Dashboard";
// import AdminProducts from "./pages/admin/Products";
// import AddProduct from "./pages/admin/AddProduct";
// import Categories from "./pages/admin/Categories";
// import AddCategory from "./pages/admin/AddCategory";
// import Orders from "./pages/admin/Orders";
// import Boxes from "./pages/admin/Boxes";
// import CustomerList from "./pages/admin/CustomerList";
// import Cart from "./pages/customer/Cart";
// import AddAddress from "./pages/customer/AddAddress";
// import Payment from "./pages/customer/Payment";
// import OrderSummary from "./pages/customer/OrderSummary";

// /* CUSTOMER */
// import CustomerProducts from "./pages/customer/Products";
// import ProductDetails from "./pages/customer/ProductDetails";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ROOT */}
//         <Route
//           path="/"
//           element={<Navigate to="/login" replace />}
//         />

//         {/* AUTH */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ================= ADMIN ================= */}
//         <Route path="/admin" element={<AdminLayout />}>

//           <Route index element={<Dashboard />} />

//           {/* PRODUCTS */}
//           <Route
//             path="products"
//             element={<AdminProducts />}
//           />
//           <Route
//             path="products/add"
//             element={<AddProduct />}
//           />

//           {/* CATEGORIES */}
//           <Route
//             path="categories"
//             element={<Categories />}
//           />
//           <Route
//             path="categories/add"
//             element={<AddCategory />}
//           />

//           {/* ORDERS */}
//           <Route
//             path="orders"
//             element={<Orders />}
//           />

//           {/* BOXES */}
//           <Route
//             path="boxes"
//             element={<Boxes />}
//           />

//           {/* CUSTOMERS */}
//           <Route
//             path="customers"
//             element={<CustomerList />}
//           />

//         </Route>

//         {/* ================= CUSTOMER ================= */}
//         <Route
//           path="/products" 
//           element={<CustomerProducts />}
//         />
//         <Route
//           path="/products/:id"
//           element={<ProductDetails />}
//         />

//         {/* 404 */}
//         <Route
//           path="*"
//           element={<h1>404 - Page Not Found</h1>}
//         />

//         <Route path="/customer/cart" element={<Cart />} />
//         <Route path="/customer/address" element={<AddAddress />} />
//         <Route path="/customer/payment" element={<Payment />} />
//         <Route path="/customer/order-summary" element={<OrderSummary />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

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
import Cart from "./pages/customer/Cart";
import AddAddress from "./pages/customer/AddAddress";
import Payment from "./pages/customer/Payment";
import OrderSummary from "./pages/customer/OrderSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PAGE = PRODUCTS */}
        <Route path="/" element={<CustomerProducts />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER */}
        <Route path="/products" element={<CustomerProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddAddress />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />

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
        </Route>

        {/* Redirect old customer URLs */}
        <Route
          path="/customer/cart"
          element={<Navigate to="/cart" replace />}
        />
        <Route
          path="/customer/address"
          element={<Navigate to="/address" replace />}
        />
        <Route
          path="/customer/payment"
          element={<Navigate to="/payment" replace />}
        />
        <Route
          path="/customer/order-summary"
          element={<Navigate to="/order-summary" replace />}
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