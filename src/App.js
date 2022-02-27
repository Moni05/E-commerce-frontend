import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import "./App.css"
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AdminHome from "./pages/adminPanel/home/AdminHome";
import UserList from "./pages/adminPanel/userList/UserList";
import User from "./pages/adminPanel/user/User";
import NewUser from "./pages/adminPanel/newUser/NewUser";
import ProuctListDashboard from "./pages/adminPanel/productList/ProductListDashboard";
import ProductDashboard from "./pages/adminPanel/product/ProductDashboard";
import NewProduct from "./pages/adminPanel/newProduct/NewProduct";
import EditProduct from "./pages/adminPanel/editProduct/EditProduct"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector((state) => state.user.currentUser);
  const admin = user ? user.isAdmin : false;
  console.log(admin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Navigate to="/register" /> } />
        <Route path="/register" element={ user ? <Navigate to="/" /> : <Register /> } />
        <Route path="/cart" element={user ?<Cart />: <Navigate to="/login" />} />
        <Route path="/success" element={user ?<Success />: <Navigate to="/login" />} />
        <Route path="/products/:category" element={user ?<ProductList /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={user ? <Product /> : <Navigate to="/login" /> } />
        <Route path="/login" element={ !user ? <Login/> : <Navigate to="/" />} />
        <Route path="/admin" element={ admin ? <AdminHome /> : <Navigate to="/" />} />
        <Route path="/admin/userlist" element={ admin ? <UserList /> : <Navigate to="/" />} />
        <Route path="/admin/users" element={ admin ? <User /> : <Navigate to="/" />} />
        <Route path="/admin/newuser" element={ admin ? <NewUser /> : <Navigate to="/" />} />
        <Route path="/admin/products" element={ admin ? <ProuctListDashboard /> : <Navigate to="/" />} />
        <Route path="/admin/product/:productId" element={ admin ? <ProductDashboard /> : <Navigate to="/" />} />
        <Route path="/admin/edit-product/:productId" element={ admin ? <EditProduct /> : <Navigate to="/" />} />
        <Route path="/admin/newproduct" element={ admin ? <NewProduct /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;