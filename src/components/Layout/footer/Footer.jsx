// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" p={4} textAlign="center">
      <Text>&copy; {new Date().getFullYear()} Mi primer E-commerce ❤️. Todos los derechos reservados.</Text>
    </Box>
  );
};

export default Footer;