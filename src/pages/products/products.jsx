import { Box, Grid, Text } from "@chakra-ui/react";
import  ProductList  from '../../components/productList/ProductList';

const Products = () => {
  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Nuestros Productos</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <ProductList />
      </Grid>
    </Box>
  );
  
};

export default Products;