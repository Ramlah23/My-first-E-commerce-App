// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { Box, Input, Button, Text } from '@chakra-ui/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth(); // Usamos el contexto para llamar a resetPassword
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await resetPassword(email);
      setMessage('Hemos enviado un enlace para restablecer tu contraseña a tu correo.');
    } catch (error) {
      setError('No pudimos enviar el correo. Por favor, verifica tu dirección.');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="sm" mx="auto">
      <Text fontSize="lg" mb={4}>Recuperar Contraseña</Text>
      {message && <Text color="green.500">{message}</Text>}
      {error && <Text color="red.500">{error}</Text>}
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
        required
      />
      <Button type="submit" colorScheme="teal" width="100%">Enviar enlace</Button>
    </Box>
  );
};

export default ForgotPassword;