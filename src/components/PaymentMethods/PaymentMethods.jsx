import { Box, Image, Text, SimpleGrid } from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import React from "react";
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

  return (
    <Box width="100%" mt={8} textAlign="center" px={{ base: 2, md: 4 }}>
      <Text fontSize="lg" mb={4}>
        Métodos de pago:
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={5} justifyContent="center" alignItems="center">
        {methods.map((method, index) => (
          <Box key={index} textAlign="center">
            <Image src={method.logo} alt={method.name} boxSize="60px" mb={2} mx="auto" />
            <Text fontSize="sm" fontWeight="bold">
              {method.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Text mt='7'>
        &copy; {new Date().getFullYear()} Mi primer E-commerce ❤️ Todos los
        derechos reservados.
      </Text>
    </Box>
  );
};

export default PaymentMethods;