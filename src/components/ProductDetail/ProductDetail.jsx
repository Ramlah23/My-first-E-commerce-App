// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Image, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, HStack } from '@chakra-ui/react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyClick = () => {
    console.log(`Compra de ${quantity} unidades del producto ${productId}`);
    // Implementa la lógica para agregar el producto al carrito o realizar la compra
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <Box p={5}>
      <VStack spacing={5} align="start">
        <Image 
          src={product.ImageUrl} 
          alt={product.name} 
          boxSize="300px"
          objectFit="cover" 
        />
        <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
        <Text fontSize="xl">Price: ${product.Price}</Text>
        <Text fontSize="md">Stock: {product.Stock}</Text>
        <Text>{product.Description}</Text>
        <HStack spacing={4} mt={4}>
          <NumberInput
            min={1}
            value={quantity}
            onChange={(valueString) => setQuantity(parseInt(valueString, 10))}
            width="120px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme="teal" onClick={handleBuyClick}>
            Buy
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductDetail;