// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase'; // Asegúrate de que esta importación sea correcta
import { doc, getDoc } from 'firebase/firestore'; // Importa las funciones necesarias
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const OrderSummary = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDocRef = doc(db, 'orders', id); // Usa 'doc' para obtener una referencia del documento
        const orderDoc = await getDoc(orderDocRef); // Obtén el documento
        if (orderDoc.exists()) {
          setOrder(orderDoc.data());
        } else {
          console.error('Orden no encontrada');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Box p={5}>
      <Heading>Resumen de la Orden</Heading>
      <VStack spacing={4} align="start">
        <Text>ID de la Orden: {id}</Text>
        <Text>Total: ${order.total}</Text>
        <Text>Fecha: {new Date(order.date).toLocaleString()}</Text>
        <Heading size="md" mt={4}>Detalles del Pedido</Heading>
        {order.items.map(item => (
          <Box key={item.id} borderWidth="1px" borderRadius="md" p={4}>
            <Text>Producto: {item.name}</Text>
            <Text>Precio: ${item.Price}</Text>
            <Text>Cantidad: {item.quantity}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OrderSummary;