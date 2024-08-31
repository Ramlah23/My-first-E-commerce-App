// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';
import { saveOrder } from '../services/api';

// Crea el contexto
const CartContext = createContext();

// Proveedor del contexto
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agrega un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica si el producto ya está en el carrito
      const productInCart = prevCart.find((item) => item.id === product.id);

      if (productInCart) {
        // Actualiza la cantidad si el producto ya está en el carrito
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Agrega el producto al carrito si no está presente
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Elimina un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Modifica la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Guarda el pedido y limpia el carrito
  const placeOrder = async () => {
    try {
      const order = {
        items: cart,
        // Añade otros detalles del pedido aquí
      };
      const orderId = await saveOrder(order);
      console.log('Order saved with ID:', orderId);
      // Limpia el carrito después de guardar el pedido
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  // Proporciona el estado y las funciones del carrito
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);