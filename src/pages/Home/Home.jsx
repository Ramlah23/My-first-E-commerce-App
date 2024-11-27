// eslint-disable-next-line no-unused-vars
import React from "react";

import { Button, Box, Heading, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promo1 from "/src/assets/Promo1jpeg.jpeg";
import promo3 from "/src/assets/promo3.jpg.webp";
import promo4 from "/src/assets/promo4.webp";
import promo5 from "/src/assets/Unik-promo2.jpg";

const images = [promo1, promo3, promo4, promo5];

const Home = () => {
  const navigate = useNavigate();

  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Función para redirigir a la página de productos
  const goToProducts = () => {
    navigate("/products");
  };

  return (
    
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="teal.100"
      p={4}
    >
      {/* Slider */}
      <Box width={{ base: "90%", md: "80%", lg: "60%" }} mb={6}>
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <Box key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                maxHeight="400px" // Limita la altura máxima
                objectFit="contain" // Asegura que la imagen se ajuste sin recortarse
                borderRadius="md"
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Contenido de bienvenida */}
      <VStack spacing={4} align="center">
        <Heading size={{ base: "md", md: "lg", lg: "xl" }} textAlign="center">
          Bienvenido a mi PetShop
        </Heading>
        <Button
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          onClick={goToProducts}
          width={{ base: "90%", sm: "80%", md: "50%" }}
          isTruncated
        >
          Los mejores productos para tu mascota
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
