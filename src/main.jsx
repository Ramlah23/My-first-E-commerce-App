import React from "react"; 
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext"; // Importar PaymentProvider
import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <PaymentProvider> {/* Añadir PaymentProvider aquí */}
          <ChakraProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </PaymentProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);