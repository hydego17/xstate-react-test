import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';

import CovidPage from './pages/covid-19';
import TodosPage from './pages/todos';

import NavLink from './components/NavLink';

function App() {
  return (
    <>
      <Container maxW="2xl" textAlign="center">
        <Box py={6}>
          <Heading>React XState </Heading>
          <Text>See Example:</Text>
        </Box>

        <Flex as="nav" justify="center">
          <NavLink to="/covid-19" label="Covid-19" />
          <NavLink to="/todos" label="Todos" />
        </Flex>

        <Switch>
          <Route path="/covid-19">
            <CovidPage />
          </Route>
          <Route path="/todos">
            <TodosPage />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
