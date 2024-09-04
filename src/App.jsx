import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
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

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          
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
