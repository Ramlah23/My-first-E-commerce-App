// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Box, VStack, Text, Heading, Button, useToast,HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, placeOrder } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Text>Tu carrito está vacío.</Text>;
  }

  const total = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      toast({
        title: 'Pedido realizado',
        description: 'Tu pedido se ha realizado con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      toast({
        title: 'Error al realizar el pedido',
        description: 'Hubo un problema al procesar tu pedido. Intenta nuevamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGoBack = () => {
    navigate('/cart');
  };

  return (
    <Box p={5}>
    <Heading mb={4}>Confirmar Pedido</Heading>
    <VStack spacing={4} align="start">
      {/* Lista de productos */}
      {cart.map((item) => (
        <Box key={item.id} borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold">{item.name}</Text>
          <Text>Cantidad: {item.quantity}</Text>
          <Text>Precio Total: ${(item.Price * item.quantity).toFixed(2)}</Text>
        </Box>
      ))}
    </VStack>
    <Text mt={4} fontWeight="bold">
      Total: ${total.toFixed(2)}
    </Text>
  
    {/* Ajuste de botones en HStack para alinearlos horizontalmente */}
    <HStack mt={6} spacing={4}>
      <Button colorScheme="teal" onClick={handlePlaceOrder}>
        Realizar Pedido
      </Button>
      <Button colorScheme="gray" onClick={handleGoBack}>
        Volver Atrás
      </Button>
    </HStack>
  </Box>
  );
};

export default Checkout;
