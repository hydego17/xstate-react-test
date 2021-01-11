import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';

import { Box, Container, Flex, Heading, Select, Code } from '@chakra-ui/react';

import { covidMachine } from './machine/covidMachine';
import Indicator from './Indicator';

export const MachineProvider = createContext();

function App() {
  const [current, send] = useMachine(covidMachine);
  const { countryStat } = current.context;

  return (
    <MachineProvider.Provider value={countryStat}>
      <Container maxW="3xl">
        <Flex direction="column" align="center">
          {/* Header */}

          <Box as="header" pt={8}>
            <Heading>Xstate covid</Heading>
          </Box>

          {/* state display */}

          <Box py={6}>
            <Code>
              {' '}
              {covidMachine.id} state: {current.toStrings().join(' ')}{' '}
            </Code>
          </Box>

          {/* Country Select */}

          <Box maxW="xl">
            <Select
              onChange={(e) => send('SELECT', { name: e.target.value })}
              placeholder="Select Country"
            >
              {current.context.listCountries.map((country) => {
                return <option key={country.name}>{country.name}</option>;
              })}
            </Select>
          </Box>

          {/* Indicator */}

          <Box py={6}>{countryStat && <Indicator />}</Box>
        </Flex>
      </Container>
    </MachineProvider.Provider>
  );
}

export default App;
