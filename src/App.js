import React from 'react';
import { Box, Container, Flex, Heading, Select } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Container maxW="3xl">
        <Flex direction="column" align="center">
          <Heading>Xstate covid</Heading>

          <Box maxW="xl">
            <Select>
              <option value="test">test</option>
            </Select>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default App;
