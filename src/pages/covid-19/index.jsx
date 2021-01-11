import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';

import { Box, Container, Flex, Heading, Select, Code } from '@chakra-ui/react';

import { covidMachine } from '../../machine/covid-19/covidMachine';
import Indicator from './Indicator';
import { PageContainer } from '../../components/PageContainer';

export const MachineProvider = createContext();

export default function CovidPage() {
  const [current, send] = useMachine(covidMachine);
  const { countryStat } = current.context;

  return (
    <MachineProvider.Provider value={countryStat}>
      <PageContainer title="xstate covid">
        {/* state display */}
        <Box py={6}>
          <Code>
            {covidMachine.id} state: {current.toStrings().join(' ')}
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
      </PageContainer>
    </MachineProvider.Provider>
  );
}
