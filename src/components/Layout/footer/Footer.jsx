
import { Box } from "@chakra-ui/react";
import PaymentMethods from "../../../components/PaymentMethods/PaymentMethods";

const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" p={4} textAlign="center">
      <PaymentMethods />

     
    </Box>
  );
};

export default Footer;
