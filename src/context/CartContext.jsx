// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';
import { saveOrder } from '../services/api'; // Asegúrate de que esta función esté bien implementada

// Crea el contexto
const CartContext = createContext();

// Proveedor del contexto
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agrega un producto al carrito
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      const updatedCart = productInCart
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevCart, { ...product, quantity }];
      
      console.log('Cart after addToCart:', updatedCart); // Verificar el carrito
      return updatedCart;
    });
  };

  // Elimina un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getCartItemCount = () => {
    // Calcula la cantidad total de ítems en el carrito
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Modifica la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  // Calcula el total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Guarda el pedido y limpia el carrito
  const placeOrder = async () => {
    try {
      const order = {
        items: cart,
        totalAmount: getTotal(),
        // Añade otros detalles del pedido aquí, como nombre del cliente, dirección, etc.
      };
      const orderId = await saveOrder(order);
      console.log('Order saved with ID:', orderId);
      // Limpia el carrito después de guardar el pedido
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  // Cancela la compra, limpia el carrito y, opcionalmente, puede realizar otras acciones
  const cancelOrder = () => {
    setCart([]);
  };

  // Proporciona el estado y las funciones del carrito
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, placeOrder, getTotal, cancelOrder,getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);