// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Box, Button, Heading, Text, VStack, HStack, IconButton, useToast } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, cancelOrder } = useCart(); 
  const { currentUser } = useAuth(); // Verifica si el usuario está autenticado
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckout = () => {
    if (!currentUser) {
      toast({
        title: 'Usuario no autenticado',
        description: 'Por favor, inicia sesión para realizar el pedido.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast({
        title: 'Carrito vacío',
        description: 'No puedes realizar un pedido con el carrito vacío.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    navigate('/checkout'); // Redirigir al checkout
  };

  const handleCancelPurchase = () => {
    cancelOrder(); // Limpia el carrito
    navigate('/'); // Redirige a la página principal
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Carrito de Compras</Heading>
      {cart.length === 0 ? (
        <Text>Tu carrito está vacío</Text>
      ) : (
        <VStack spacing={4} align="start">
          {cart.map((item) => (
            <HStack
              key={item.id}
              borderWidth={1}
              borderRadius="md"
              p={4}
              spacing={4}
              align="center"
              bg="gray.50"
              w="full"
            >
              <Box flex="1">
                <Heading size="md">{item.name}</Heading>
                <Text>Precio: ${item.Price}</Text>
                <Text>Total: ${(item.Price * item.quantity).toFixed(2)}</Text>
              </Box>
              <IconButton
                icon={<MdDelete />}
                aria-label="Eliminar"
                onClick={() => removeFromCart(item.id)}
                colorScheme="red"
              />
            </HStack>
          ))}
          <Button colorScheme="teal" onClick={handleCheckout} mt={4}>
            Continuar
          </Button>
          {/* Botón Cancelar Compra */}
          <Button colorScheme="red" onClick={handleCancelPurchase} mt={4}>
            Cancelar Compra
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;