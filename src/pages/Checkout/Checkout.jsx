// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { usePayment } from '../../context/PaymentContext';

const Checkout = () => {
  const { selectPaymentMethod, processPayment } = usePayment();
  const [selectedMethod, setSelectedMethod] = useState('creditCard');

  const handlePayment = () => {
    // Llamar a la función para procesar el pago
    processPayment(100, { method: selectedMethod }); // Ejemplo: Monto de $100
  };

  return (
    <Box>
      <h2>Selecciona tu método de pago</h2>
      <RadioGroup onChange={setSelectedMethod} value={selectedMethod}>
        <Stack direction="column">
          <Radio value="creditCard">Tarjeta de Crédito</Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="crypto">Criptomonedas</Radio>
        </Stack>
      </RadioGroup>
      <Button mt={4} onClick={() => selectPaymentMethod(selectedMethod)}>
        Confirmar Método de Pago
      </Button>
      <Button mt={4} onClick={handlePayment}>
        Pagar
      </Button>
    </Box>
  );
};

export default Checkout;