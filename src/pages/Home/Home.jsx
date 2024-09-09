import { Button, Box, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Función para redirigir a la página de productos
  const goToProducts = () => {
    navigate('/products');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="teal.100"
      p={4} // Padding general
    >
      <VStack spacing={4} align="center">
        <Heading size={{ base: "md", md: "lg", lg: "xl" }} textAlign="center">
          Bienvenido a mi PetShop
        </Heading>
        <Button
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          onClick={goToProducts}
          width={{ base: "90%", sm: "80%", md: "50%" }} // Ajustes de anchura responsiva
          isTruncated // Trunca el texto si es demasiado largo
        >
          Los mejores productos para tu mascota
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;