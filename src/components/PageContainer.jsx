import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export const PageContainer = ({ children, title }) => {
  return (
    <Box mt={6}>
      <Flex direction="column" align="center">
        <Box as="header" pt={8}>
          <Heading as="h2" size="lg">
            {title}
          </Heading>
        </Box>

        {children}
      </Flex>
    </Box>
  );
};
