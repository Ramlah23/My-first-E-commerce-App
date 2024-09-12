// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Heading, Button, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { useAuth } from '../../../context/AuthContext'; 
import CartIcon from '../../../components/CartIcon/CartIcon';

const Header = () => {
  const { currentUser, logout } = useAuth(); // Usa 'currentUser' del contexto de autenticación

  const handleLogout = async () => {
    try {
      await logout();
      // Redirige a la página de inicio de sesión después de cerrar sesión
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Box as="header" bg="teal.500" color="white" p={4} display="flex" alignItems="center" justifyContent="space-between">
      <Heading as="h1" size="lg">Mi primer E-commerce ❤️</Heading>
      
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
        <CartIcon />
        {/* Mostrar el botón "Mi orden" cuando el usuario esté logueado */}
        {currentUser ? (
          <Box display="flex" alignItems="center">
            <Text mr={4}>{currentUser.displayName || 'Usuario'}</Text> {/* Muestra el nombre del usuario */}
            <Button onClick={handleLogout} colorScheme="red" ml={4}>Cerrar sesión</Button>
            <Button as={Link} to="/orders" colorScheme="teal" ml={4}>Mi orden</Button> {/* Botón "Mi orden" */}
            
          </Box>
        ) : (
          <>
            <Button as={Link} to="/login" colorScheme="teal" ml={4}>Ingresar / Crear cuenta</Button>
           
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;