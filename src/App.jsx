import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';

import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

import CovidPage from './pages/covid-19';

function App() {
  return (
    <Container maxW="2xl" textAlign="center">
      <Box py={6}>
        <Heading>React XState </Heading>
        <Text>See Example:</Text>
      </Box>

      <Router>
        <Flex as="nav" justify="center">
          <Button size="sm" mr={6}>
            <Link to="/covid-19">covid-19</Link>
          </Button>
          <Button size="sm">todos</Button>
        </Flex>

        <Switch>
          <Route path="/covid-19">
            <CovidPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
