// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'; 
import { Box, Heading, Button, IconButton, Text, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { useAuth } from '../../../context/AuthContext'; 
import { useCart } from '../../../context/CartContext'; // Asegúrate de importar correctamente el CartContext

const Header = () => {
  const { currentUser, logout } = useAuth(); 
  const { getCartItemCount } = useCart(); // Obtener la cantidad de ítems en el carrito

  useEffect(() => {
    console.log('Current User:', currentUser); // Verifica el valor de currentUser
  }, [currentUser]);

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
        
        {/* Icono del carrito con la cantidad de productos */}
        <Box position="relative" display="inline-block">
          <IconButton 
            as={Link} 
            to="/cart" 
            icon={<BsCart />} 
            colorScheme="teal" 
            aria-label="Cart" 
            ml={4} 
          />
          {/* Badge para mostrar la cantidad de productos */}
          {getCartItemCount() > 0 && (
            <Badge 
              colorScheme="red" 
              position="absolute" 
              top="-1" 
              right="-1" 
              borderRadius="full" 
              px={2} 
              py={1}
              fontSize="0.8em"
            >
              {getCartItemCount()}
            </Badge>
          )}
        </Box>
        
        {/* Mostrar el nombre del usuario si está autenticado */}
        {currentUser ? (
          <Box display="flex" alignItems="center">
            <Text mr={4}>Hola, {currentUser.displayName || 'Usuario'}</Text> {/* Muestra el nombre del usuario */}
            <Button onClick={handleLogout} colorScheme="red" ml={4}>Cerrar sesión</Button>
            <Button as={Link} to="/orders" colorScheme="teal" ml={4}>Mi orden</Button>
          </Box>
        ) : (
          <Button as={Link} to="/login" colorScheme="teal" ml={4}>Ingresar / Crear cuenta</Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;