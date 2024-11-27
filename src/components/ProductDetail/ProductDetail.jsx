// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Image, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, HStack } from '@chakra-ui/react';
import { useCart } from '../../context/CartContext';  // Importa el contexto del carrito
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();  // Obtén la función addToCart del contexto del carrito
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: productId, ...docSnap.data() });  // Incluye el productId en el producto
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
    if (product) {
      addToCart(product, quantity);  // Agrega el producto al carrito con la cantidad seleccionada
      alert(`Agregaste ${quantity} unidades de ${product.name} al carrito`);
      navigate('/products'); 
    }
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <Box p={5}>
      <VStack spacing={5} align="center">
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
            Comprar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductDetail;