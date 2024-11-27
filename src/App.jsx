import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <Main>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Rutas protegidas: Si el usuario está logueado, redirige a /products */}
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/products" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/products" /> : <Register />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Rutas para productos */}
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

          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </>
  );
}

export default App;