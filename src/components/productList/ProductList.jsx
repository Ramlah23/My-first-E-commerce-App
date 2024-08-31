// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // Para manejar las cantidades seleccionadas

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Función para manejar el cambio de cantidad
  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  // Función para manejar el clic en el botón de compra
  const handleBuyClick = (productId) => {
    const quantity = quantities[productId] || 1;
    console.log(`Compra de ${quantity} unidades del producto ${productId}`);
    // Aquí podrías implementar la lógica para agregar el producto al carrito, por ejemplo
  };

  return (
    <Box p={5}>
      {products.length === 0 ? (
        <Text>No products available</Text>
      ) : (
        <VStack spacing={5} align="start">
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              p={4}
            >
              <Link to={`/product/${product.id}`}>
                <Image
                  src={product.ImageUrl}
                  alt={product.name}
                  boxSize="300px"
                  objectFit="cover"
                />
              </Link>
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                {product.name}
              </Text>
              <Text>Price: ${product.Price}</Text>
              <Text>Stock: {product.Stock}</Text>
              <Text>{product.Description}</Text>
              <HStack spacing={4} mt={4}>
                <NumberInput
                  min={1}
                  value={quantities[product.id] || 1}
                  onChange={(valueString) =>
                    handleQuantityChange(product.id, parseInt(valueString, 10))
                  }
                  width="120px"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  colorScheme="teal"
                  onClick={() => handleBuyClick(product.id)}
                >
                 Comprar
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ProductList;
