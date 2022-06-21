import React, { useState } from 'react';
import Map from '../components/Map';

interface IProps {
  children?: React.ReactNode;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function Todos(props: IProps) {
  const [todos, setTodos] = useState<Todo[]>([
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: true,
    },
  ] as Todo[]);

  function completeAllTodos() {
    setTodos((todos): Todo[] =>
      todos.map((todo) => {
        todo.completed = true;
        return todo;
      })
    );
  }

  function removeAllTodos() {
    setTodos([]);
  }

  function unCompleteAllTodos() {
    setTodos((todos): Todo[] =>
      todos.map((todo) => {
        todo.completed = false;
        return todo;
      })
    );
  }

  function checkTodo({ todoID }: { todoID: Todo['id'] }) {
    const newTodos = todos.map((todo) => {
      if (todoID === todo.id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(newTodos);
  }

  return (
    <>
      <h1>Daily TODOS</h1>
      <ul>
        <Map datas={todos}>
          {(todo, idx) => (
            <li key={idx}>
              <>
                <label htmlFor={`todo_${idx}`} style={{ display: 'flex' }}>
                  <input
                    checked={todo.completed}
                    onChange={() => checkTodo({ todoID: todo.id })}
                    type='checkbox'
                    name={`todo[]`}
                    id={`todo_${idx}`}
                  />

                  <p
                    style={{
                      padding: '0',
                      margin: 0,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.title}
                  </p>
                </label>
              </>
            </li>
          )}
        </Map>
      </ul>

      <button onClick={completeAllTodos}>Complete ALL</button>
      <button onClick={removeAllTodos}>Remove ALL</button>
      <button onClick={unCompleteAllTodos}>Uncheck ALL</button>
    </>
  );
}

export default Todos;
