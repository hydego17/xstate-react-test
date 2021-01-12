import React from 'react';
import { useMachine } from '@xstate/react';
import { Box, Text, Input } from '@chakra-ui/react';

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

  const { todos, todo, filter } = state.context;

  // Filtered todos (to be rendered)
  const filteredTodos = filterTodos(filter, todos);

  return (
    <PageContainer title="todos">
      <Box py={4} w={400}>
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

        {/* Toggle Complete button */}
      </Box>

      {/* Render Todos */}
      <Box>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todoRef={todo.ref} />
        ))}
      </Box>

      {filteredTodos.length > 0 && (
        <Box py={6}>
          <Text fontSize="xs" color="gray.600">
            Click to edit todo
          </Text>
        </Box>
      )}
    </PageContainer>
  );
}
