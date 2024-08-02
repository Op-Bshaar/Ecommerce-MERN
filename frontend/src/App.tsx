import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Register from "./pages/register";
import AuthProvider from "./context/Auth/AuthProvider";
import Cart from "./pages/cart";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Auth/cartProvider";
import Checkout from "./pages/checkout";
import Success from "./pages/success";
import Order from "./pages/order";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/order" element={<Order />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
