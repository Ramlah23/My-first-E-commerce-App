// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Image,
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";  // Importa el contexto del carrito

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();  // Obtén la función addToCart del contexto del carrito

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

  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  const handleBuyClick = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);  // Agrega el producto al carrito con la cantidad seleccionada
    alert(`Agregaste ${quantity} unidades de ${product.name} al carrito`);  // Muestra un mensaje de éxito
  };

  return (
    <Box p={5}>
      {products.length === 0 ? (
        <Text>No products available</Text>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {products.map((product) => (
            <GridItem key={product.id} borderWidth={1} borderRadius="md" p={4}>
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
                  onClick={() => handleBuyClick(product)}
                >
                  Comprar
                </Button>
              </HStack>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;