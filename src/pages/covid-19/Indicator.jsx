import React, { useContext } from 'react';
import { useService } from '@xstate/react';
import CountUp from 'react-countup';

import {
  Text,
  Box,
  Code,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spinner,
} from '@chakra-ui/react';

import { MachineProvider } from './index';

export default function Indicator() {
  const service = useContext(MachineProvider);

  const [current] = useService(service);
  const { confirmed, deaths, recovered, lastUpdate } = current.context;

  if (current.value === 'loading') return <Spinner />;

  return (
    <Box textAlign="center">
      <Box py={2}>
        <Code>
          {service.machine.id} state: {current.toStrings().join(' ')}
        </Code>
      </Box>

      <StatGroup my={2} p={2} bg="gray.100" w={300} rounded="lg">
        <Stat>
          <StatLabel py={2}>Confirmed</StatLabel>
          <StatNumber py={2}>
            <CountUp start={0} end={confirmed} duration={2} />
          </StatNumber>
        </Stat>
      </StatGroup>

      <StatGroup my={2} p={2} bg="gray.100" w={300} rounded="lg">
        <Stat>
          <StatLabel py={2}>Deaths</StatLabel>
          <StatNumber py={2}>
            <CountUp start={0} end={deaths} duration={2} />
          </StatNumber>
        </Stat>
      </StatGroup>

      <StatGroup my={2} p={2} bg="gray.100" w={300} rounded="lg">
        <Stat>
          <StatLabel py={2}>Recovered</StatLabel>
          <StatNumber py={2}>
            <CountUp start={0} end={recovered} duration={2} />
          </StatNumber>
        </Stat>
      </StatGroup>

      <Box py={2}>
        <Text>Last Update: {lastUpdate.substring(0, 10)} </Text>
      </Box>
    </Box>
  );
}
