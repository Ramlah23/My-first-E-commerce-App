import { Box, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import VisaLogo from "../../assets/imagenesPagos/logotipo-de-la-visa.webp";
import MasterCardLogo from "../../assets/imagenesPagos/mastercard.jpg";
import PayPalLogo from "../../assets/imagenesPagos/paypal.jpg";
import CuentaDniLogo from "../../assets/imagenesPagos/cuentaDNI.jpg";
import MercadoPagoLogo from "../../assets/imagenesPagos/mercadoPago.png";

const PaymentMethods = () => {
    const methods = [
        { logo: VisaLogo, name: 'Visa' },
        { logo: MasterCardLogo, name: 'MasterCard' },
        { logo: PayPalLogo, name: 'PayPal' },
        { logo: MercadoPagoLogo, name: 'MercadoPago' },
        { logo: CuentaDniLogo, name: 'CuentaDNI' },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? methods.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === methods.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      return (
       
        <Box position="relative" width="80%" mt={8} overflow="hidden">
          <Flex justifyContent="center" alignItems="center">
            <IconButton
              aria-label="previous slide"
              icon={<FaChevronLeft />}
              onClick={prevSlide}
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'teal.200' }}
              mr={4}
            />
            {methods.map((method, index) => (
              <Box
              key={index}
              display={index === currentIndex ? 'block' : 'none'}
              p={4}
              textAlign="center"
              bg="transparent" // Asegúrate de que este es el color que coincide con el fondo de tu página
            >
              <Image src={method.logo} alt={method.name} boxSize="80px" mb={2} mx="auto" />
              <Text fontSize="lg" fontWeight="bold">
                {method.name}
              </Text>
            </Box>
            ))}
            <IconButton
              aria-label="next slide"
              icon={<FaChevronRight />}
              onClick={nextSlide}
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'teal.200' }}
              ml={4}
            />
          </Flex>
        </Box>
      );
    };

export default PaymentMethods;
