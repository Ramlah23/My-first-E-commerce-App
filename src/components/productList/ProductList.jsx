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
  VStack,
  Spinner, // Importa el Spinner
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
      setLoading(false); // Establece loading a false cuando la carga termine
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    addToCart(product, 0);
    navigate(`/product/${product.id}`);
  };

  return (
    <Box p={5}>
      {loading ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : products.length === 0 ? (
        <Text>No products available</Text>
      ) : (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={6}>
          {products.map((product) => (
            <GridItem key={product.id} borderWidth="1px" borderRadius="md" p={4} minHeight="420px">
              <VStack spacing={4} align="stretch">
                <Link to={`/product/${product.id}`}>
                  <Image
                    src={product.ImageUrl}
                    alt={product.name}
                    boxSize="300px"  // Asegúrate de que todas las imágenes tengan el mismo tamaño
                    objectFit="cover"
                  />
                </Link>
                <Text fontSize="xl" fontWeight="bold" noOfLines={1} width="230px">
                  {product.name}
                </Text>
                <Text fontSize="lg">Price: ${product.Price}</Text>
                <Text fontSize="lg">Stock: {product.Stock}</Text>
                <Text fontSize="sm" noOfLines={2}>{product.Description}</Text>
                <Button colorScheme="teal" onClick={() => handleBuyClick(product)}>
                  Comprar
                </Button>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;