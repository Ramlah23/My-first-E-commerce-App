// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'; 
import { useCart } from '../../context/CartContext';
import { Box, Button, Heading, Text, VStack, HStack, Input, IconButton, useToast } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from '../../services/firebase'; 

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder, cancelOrder } = useCart();
  const { currentUser } = useAuth(); // Usamos currentUser aquí para ver si está autenticado
  const navigate = useNavigate();
  const toast = useToast();

  // Estado local para las cantidades
  const [localQuantities, setLocalQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, value) => {
    // Permitir que el valor sea vacío temporalmente mientras el usuario edita
    setLocalQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleQuantityBlur = (id, value) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      toast({
        title: "Cantidad inválida",
        description: "La cantidad debe ser un número mayor a 0.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLocalQuantities((prev) => ({
        ...prev,
        [id]: 1,
      }));
      updateQuantity(id, 1);
    }
  };

  // Nueva función para manejar la realización del pedido
  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast({
        title: "Usuario no autenticado",
        description: "Por favor, inicia sesión para realizar el pedido.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        userId: currentUser.uid,
        items: cart,
        total: cart.reduce((total, item) => total + item.Price * item.quantity, 0),
        date: new Date().toISOString(),
      };

      const orderDocRef = await addDoc(collection(db, 'orders'), orderData);
      placeOrder();
      navigate(`/order-summary/${orderDocRef.id}`);
      toast({
        title: "Pedido realizado",
        description: "Tu pedido ha sido realizado con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Hubo un error al realizar el pedido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelOrder = () => {
    cancelOrder(); // Ejecuta la función cancelOrder para resetear el carrito
    navigate('/'); // Redirige a la página de inicio o la que tú desees
    toast({
      title: "Compra cancelada",
      description: "La compra ha sido cancelada.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Carrito de Compras</Heading>
      {cart.length === 0 ? (
        <Text>Tu carrito está vacío</Text>
      ) : (
        <VStack spacing={4} align="start">
          {cart.map((item) => (
            <HStack key={item.id} borderWidth={1} borderRadius="md" p={4} spacing={4} align="center" bg="gray.50" w="full">
              <Box flex="1">
                <Heading size="md">{item.name}</Heading>
                <Text>Precio: ${item.Price}</Text>
                <Text>Total: ${(item.Price * item.quantity).toFixed(2)}</Text>
              </Box>
              <Input
                type="number"
                value={localQuantities[item.id] || ''}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                onBlur={(e) => handleQuantityBlur(item.id, e.target.value)}
                min="1"
                w="100px"
              />
              <IconButton icon={<MdDelete />} aria-label="Eliminar" onClick={() => removeFromCart(item.id)} colorScheme="red" />
            </HStack>
          ))}
          <Button colorScheme="teal" onClick={handlePlaceOrder} mt={4}>Realizar Pedido</Button>
          <Button colorScheme="red" onClick={handleCancelOrder} mt={4}>Cancelar Compra</Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;