
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="lg" mb={6}>
        La página que estás buscando no se encontró.
      </Text>
      <Button as={Link} to="/" colorScheme="teal">
        Volver a la página principal
      </Button>
    </Box>
  );
};

export default NotFound;