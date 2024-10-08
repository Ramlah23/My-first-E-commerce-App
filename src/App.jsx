import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./routes/PrivateRoute";
import Orders from "./pages/Orders/Orders";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/products/products";
import ProductDetail from './components/ProductDetail/ProductDetail';
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import Footer from "./components/Layout/footer/Footer";
import Cart from "./components/Cart/cart";
import NotFound from "./pages/NotFound/NotFound";
import OrderSummary from './pages/OrderSummary/OrderSummary';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/order-summary/:id" element={<OrderSummary />} />
          
          {/* Ruta para el carrito */}
          <Route path="/cart" element={<Cart />} />


          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          {/* Rutas adicionales */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
      
    </>
  );
}

export default App;
