// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Box, Button, Heading, Text, Input, VStack, HStack, IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useCart();

  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(); // Llama a la función placeOrder para realizar el pedido
      alert('Pedido realizado con éxito');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Hubo un error al realizar el pedido');
    }
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
                <Text>Precio: ${item.price}</Text>
              </Box>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e)}
                min="1"
                w="100px"
              />
              <IconButton 
                icon={<MdDelete />} 
                aria-label="Eliminar" 
                onClick={() => removeFromCart(item.id)} 
                colorScheme="red"
              />
            </HStack>
          ))}
          <Button 
            colorScheme="teal" 
            onClick={handlePlaceOrder}
            mt={4}
          >
            Realizar Pedido
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;