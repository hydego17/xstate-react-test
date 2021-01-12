import { createMachine, assign, spawn } from 'xstate';
import { v4 as uuidv4 } from 'uuid';

import { createTodoMachine } from './todoMachine';

const createTodo = (title) => {
  return {
    id: uuidv4(),
    title,
    completed: false,
  };
};

export const todosMachine = createMachine({});
