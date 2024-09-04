// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Heading, Button, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';


const Header = () => {
  return (
    <Box as="header" bg="teal.500" color="white" p={4} display="flex" alignItems="center" justifyContent="space-between">
      <Heading as="h1" size="lg">Mi primer E-commerce ❤️ </Heading>
    
      <Box>
        <Button as={Link} to="/" colorScheme="teal" ml={4}>Home</Button>
        <Button as={Link} to="/products" colorScheme="teal" ml={4}>Products</Button>
        <IconButton 
          as={Link} 
          to="/cart" 
          icon={<BsCart />} 
          colorScheme="teal" 
          aria-label="Cart" 
          ml={4} 
        />
           <Button as={Link} to="/login" colorScheme="teal" ml={4}>Ingresar / Crear cuenta</Button>
           <Button as={Link} to="/orders" colorScheme="teal" ml={4}>Mi orden</Button>
      </Box>
      
    </Box>
  );
};

export default Header;