import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Navigate to="/register" /> } />
        <Route path="/register" element={ user ? <Navigate to="/" /> : <Register /> } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;