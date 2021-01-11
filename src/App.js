import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';

import { Box, Container, Flex, Heading, Select } from '@chakra-ui/react';

import { covidMachine } from './machine/covidMachine';

export const MachineProvider = createContext();

function App() {
  const [current, send] = useMachine(covidMachine);
  const { countryStat } = current.context;

  console.log(current.value);

  return (
    <MachineProvider.Provider value={countryStat}>
      <Container maxW="3xl">
        <Flex direction="column" align="center">

          {/* Header */}
          
          <Box as="header" py={8}>
            <Heading>Xstate covid</Heading>
          </Box>

          {/* Country Select */}

          <Box maxW="xl">
            <Select onChange={(e) => send('SELECT', { name: e.target.value })}>
              <option disabled>Select one</option>
              {current.context.listCountries.map((country) => {
                return <option key={country.name}>{country.name}</option>;
              })}
            </Select>
          </Box>

          {/* Indicator */}
          
        </Flex>
      </Container>
    </MachineProvider.Provider>
  );
}

export default App;
