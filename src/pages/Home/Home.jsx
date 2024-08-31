
import { Button, Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';


const Home = () => {
  const navigate = useNavigate();

  // Función para redirigir a la página de productos
  const goToProducts = () => {
    navigate('/products'); // Cambia '/products' por la ruta que desees para la página de productos
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="teal.100" // Color de fondo
    >
      <Heading mb={4}>Bienvenido a mi PetShop</Heading>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={goToProducts}
      >
      Los mejores productos para tu mascota.
      </Button>

      
      <PaymentMethods />
      Medios de pago
    </Box>
  );
};

export default Home;