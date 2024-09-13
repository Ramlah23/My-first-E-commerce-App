// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth(); // Asegúrate de que estás accediendo a signup
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.nombre); 
      // Usa signup para registrar al usuario
      toast({
        title: "Registro exitoso.",
        description: "Te has registrado exitosamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/');// Redirigir al usuario a la página de inicio o login si es necesario
    } catch (error) {
      toast({
        title: "Fallo en el registro.",
        description: "Por favor, verifica tus datos e intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg="gray.100"
      p={4}
    >
      <Box
        width={{ base: '90%', sm: '400px' }}
        p={6}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        boxShadow="md"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Registro
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors.nombre}>
            <FormLabel mb={4} htmlFor="nombre">Nombre completo</FormLabel>
            <Input
              id="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && <Text color="red.500">{errors.nombre.message}</Text>}
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            mb={4}
          >
            Registrar
          </Button>
        </form>
        <Flex justify="center">
          <Button as={Link} to="/login" colorScheme="teal" variant="outline">
            ¿Ya tienes una cuenta? Inicia sesión
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;