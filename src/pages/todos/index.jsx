import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import {
  Box,
  Text,
  Input,
  Button,
  Switch,
  Stack,
  HStack,
} from '@chakra-ui/react';

import { useHashChange } from './useHashChange';
import { todosMachine } from '../../machine/todos/todosMachine';

import { Todo } from './todo';
import { PageContainer } from '../../components/PageContainer';

function filterTodos(filter, todos) {
  if (filter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}
const persistedTodosMachine = todosMachine.withConfig(
  {
    actions: {
      persist: (ctx) => {
        try {
          localStorage.setItem('todos-xstate', JSON.stringify(ctx.todos));
        } catch (e) {
          console.log(e);
        }
      },
    },
  },

  // Initial state from localstorage
  {
    todo: 'Learn state machines',
    todos: (() => {
      try {
        return JSON.parse(localStorage.getItem('todos-xstate')) || [];
      } catch (e) {
        console.log(e);
        return [];
      }
    })(),
  }
);

export default function TodosPage() {
  const [state, send] = useMachine(persistedTodosMachine, { devTools: true });

  useHashChange(() => {
    send({ type: 'SHOW', filter: window.location.hash.slice(2) || 'all' });
  });

  // Capture initial state of browser hash
  useEffect(() => {
    window.location.hash.slice(2) &&
      send({ type: 'SHOW', filter: window.location.hash.slice(2) });
  }, [send]);

  const { todos, todo, filter } = state.context;

  // Filtered todos (to be rendered)
  const filteredTodos = filterTodos(filter, todos);
  const isEmpty = filteredTodos.length === 0;

  const numActiveTodos = todos.filter((todo) => !todo.completed).length;
  const allCompleted = todos.length > 0 && numActiveTodos === 0;

  // Mark todos
  const mark = !allCompleted ? 'completed' : 'active';
  const markEvent = `MARK.${mark}`;

  return (
    <PageContainer title="todos">
      <Box py={4} w="80%">
        {/* Input Todo */}
        <Input
          type="text"
          value={todo}
          onChange={(e) =>
            send({ type: 'NEWTODO.CHANGE', value: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              send({ type: 'NEWTODO.COMMIT', value: e.target.value });
            }
          }}
          placeholder="What needs to be done?"
          autoFocus
        />
      </Box>

      {/* Toggle Complete/Active button */}
      {!isEmpty && (
        <Stack direction="row" py={4}>
          <Text>Mark all as {mark}</Text>
          <Switch onChange={(e) => send(markEvent)} isChecked={allCompleted} />
        </Stack>
      )}

      {/* Render Todos */}
      <Box border="1px solid #ededed" rounded="lg">
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todoRef={todo.ref} />
        ))}
      </Box>

      <Stack spacing={6} direction="row" align="center" py={6}>
        <Text fontSize="sm">
          {numActiveTodos} item{numActiveTodos === 1 ? '' : 's'} left
        </Text>

        <HStack spacing={1}>
          <Button size="xs" isActive={filter === 'all'}>
            <a href="#/">All</a>
          </Button>
          <Button size="xs" isActive={filter === 'active'}>
            <a href="#/active">Active</a>
          </Button>
          <Button size="xs" isActive={filter === 'completed'}>
            <a href="#/completed">Completed</a>
          </Button>
        </HStack>
      </Stack>

      {numActiveTodos < todos.length && (
        <Button size="xs" onClick={(_) => send('CLEAR_COMPLETED')}>
          Clear completed
        </Button>
      )}

      <Box py={6}>
        <Text fontSize="xs" color="gray.600">
          {filteredTodos.length > 0
            ? 'Click to edit todo'
            : 'Press Enter to input todo'}
        </Text>
      </Box>
    </PageContainer>
  );
}
