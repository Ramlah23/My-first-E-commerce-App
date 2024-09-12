// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useCart } from '../../context/CartContext'; 
import { Box, Badge } from '@chakra-ui/react';

const CartIcon = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Box position="relative">
  
      <Badge
        colorScheme="red"
        position="absolute"
        top="-20px"
        right="-1px"
        borderRadius="full"
        fontSize="0.5em"
        px="5px"
      >
        {itemCount}
      </Badge>
    </Box>
  );
};

export default CartIcon;