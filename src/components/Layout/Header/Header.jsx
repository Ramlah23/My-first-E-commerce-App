// eslint-disable-next-line no-unused-vars 
import React, { useEffect } from 'react'; 
import { Box, Heading, Button, IconButton, Text, Badge, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi'; // Ícono de hamburguesa de react-icons
import { useAuth } from '../../../context/AuthContext'; 
import { useCart } from '../../../context/CartContext';

const Header = () => {
  const { currentUser, logout } = useAuth(); 
  const { getCartItemCount } = useCart(); 
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controlador del Drawer

  useEffect(() => {
    console.log('Current User:', currentUser); 
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Box as="header" bg="teal.500" color="white" p={4} display="flex" alignItems="center" justifyContent="space-between">
      {/* Título del header */}
      <Heading as="h1" size="lg">Mi primer E-commerce ❤️</Heading>

      {/* Botones del menú en modo desktop */}
      <Box display={{ base: "none", md: "flex" }} alignItems="center">
        <Button as={Link} to="/" colorScheme="teal" ml={4}>Inicio</Button>
        <Button as={Link} to="/products" colorScheme="teal" ml={4}>Productos</Button>
        <Box position="relative" display="inline-block">
          <IconButton 
            as={Link} 
            to="/cart" 
            icon={<BsCart />} 
            colorScheme="teal" 
            aria-label="Cart" 
            ml={4} 
          />
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
        {currentUser ? (
          <Box display="flex" alignItems="center">
            <Text mr={4}>Hola, {currentUser.displayName || 'Usuario'}</Text>
            <Button onClick={handleLogout} colorScheme="red" ml={4}>Cerrar sesión</Button>
            <Button as={Link} to="/orders" colorScheme="teal" ml={4}>Mi orden</Button>
          </Box>
        ) : (
          <Button as={Link} to="/login" colorScheme="teal" ml={4}>Ingresar / Crear cuenta</Button>
        )}
      </Box>

      {/* Menú hamburguesa en modo mobile */}
      <IconButton
  icon={<GiHamburgerMenu />}  // Ícono de hamburguesa
  aria-label="Abrir menú"
  display={{ base: "flex", md: "none" }} // Mostrar solo en mobile
  onClick={onOpen} // Función que abre el menú
  bg="teal.600"
  _hover={{ bg: "teal.700" }}
/>

      {/* Drawer para el menú hamburguesa */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody display="flex" flexDirection="column" gap="1rem" mt={4}>
            <Button as={Link} to="/" colorScheme="teal" variant="ghost" onClick={onClose}>
              Inicio
            </Button>
            <Button as={Link} to="/products" colorScheme="teal" variant="ghost" onClick={onClose}>
              Productos
            </Button>
            <Button as={Link} to="/cart" colorScheme="teal" variant="ghost" onClick={onClose}>
              Carrito
            </Button>
            {currentUser ? (
              <>
                <Text>Hola, {currentUser.displayName || 'Usuario'}</Text>
                <Button onClick={handleLogout} colorScheme="red" variant="ghost" mt={4}>
                  Cerrar sesión
                </Button>
                <Button as={Link} to="/orders" colorScheme="teal" variant="ghost" mt={2} onClick={onClose}>
                  Mi orden
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" colorScheme="teal" variant="ghost" onClick={onClose}>
                Ingresar / Crear cuenta
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;