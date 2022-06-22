import React, { useEffect, useReducer, useState } from 'react';
import produce from 'immer';

function hasIdProperty(prop: any): boolean {
  if (!prop || typeof prop != 'object' || !('id' in prop)) {
    return true;
  }

  return false;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

type TodoActions =
  | 'ADD'
  | 'TOGGLE'
  | 'DELETE'
  | 'DELETE_ALL'
  | 'UNCHECK_ALL'
  | 'CHECK'
  | 'CHECK_ALL'
  | 'DELETE_ALL'
  | 'INIT'
  | 'DELETE';

type FetchState = 'LOADING' | 'ERROR' | 'SUCCESS';

const TodoContext = React.createContext([] as Todo[]);

function todoReducer(
  state: Todo[],
  { type, payload }: { type: TodoActions; payload?: any }
) {
  return produce(state, (draft) => {
    switch (type) {
      case 'INIT':
        return (draft = payload);

      case 'CHECK_ALL':
        return draft.forEach((todo: Todo) => {
          todo.completed = true;
        });

      case 'TOGGLE':
        if (hasIdProperty(payload)) {
          throw new Error('Todo ID for TOGGLE dispatch is not provided!');
        }

        const todo = draft.find((todo) => todo.id == payload!.id);

        if (todo != null) {
          todo.completed = !todo.completed;
        }

        break;

      case 'DELETE_ALL':
        return [];

      case 'UNCHECK_ALL':
        return draft.forEach((todo: Todo) => {
          todo.completed = false;
        });

      default:
        console.error(`Non existing Todo dispatch type!`);
        return state;
    }
  });
}

function useTodos() {
  const defaultTodos = React.useContext(TodoContext);
  const [todos, dispatch] = useReducer(todoReducer, defaultTodos as Todo[]);

  return {
    todos,
    dispatch,
  };
}

export { TodoContext };

export default useTodos;
