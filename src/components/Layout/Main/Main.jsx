

import { Box } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const Main = ({ children }) => {
  return (
    <Box as="main" p={4} >
      {children}
    </Box>
  );
};

export default Main;