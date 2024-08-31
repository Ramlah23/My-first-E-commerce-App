
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase'; // Ajusta la ruta según tu estructura
import { collection, getDocs } from 'firebase/firestore';
import { Box, Text, VStack } from '@chakra-ui/react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box p={5}>
      {orders.length === 0 ? (
        <Text>No orders available</Text>
      ) : (
        <VStack spacing={5} align="start">
          {orders.map(order => (
            <Box key={order.id} borderWidth={1} borderRadius="md" overflow="hidden" p={4}>
              <Text fontSize="xl" fontWeight="bold">Order ID: {order.id}</Text>
              <Text>Customer: {order.customerName}</Text>
              <Text>Total: ${order.totalAmount}</Text>
              <Text>Status: {order.status}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Orders;