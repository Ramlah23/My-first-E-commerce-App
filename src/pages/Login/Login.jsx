// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate(); // Importa useNavigate para redirigir

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/"); // Redirige al usuario a la página principal después del login
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100" p={4}>
      <Box
        width={{ base: "90%", sm: "400px" }}
        p={6}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        boxShadow="md"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mb={4}>
            Iniciar Sesión
          </Button>
          <Box mt={4}>
            <Text textAlign="center"fontSize="sm" mb="10px">
              <Link to="/forgot-password" style={{ color: "teal" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Text>
          </Box>
        </form>
        <Flex justify="center">
          <Button as={Link} to="/register" colorScheme="teal" variant="outline">
            ¿No tienes una cuenta? Regístrate
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
