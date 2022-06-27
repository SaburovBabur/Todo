import React, { useCallback, useEffect, useId, useState } from 'react';
import Tabs from '../../components/Tabs';
import useSWR, { Fetcher, Key } from 'swr';
import clsx from 'clsx';
import Map from '../../components/Map';
import SHOW from '../../components/SHOWIF';

interface IProps {
  children?: React.ReactNode;
}

const { Tab } = Tabs;

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const fetcher: Fetcher<Todo[], string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Error occured! Try back later!');
  });

function Todos(props: IProps) {
  const uid: Key = 'https://jsonplaceholder.typicode.com/todos?userId=1';
  const [todoTitle, setTodoTitle] = useState('');
  const { data: todos, error, mutate } = useSWR<Todo[]>(uid, fetcher);
  const id = useId();

  const addTodoHandler = useCallback(
    async ({ title }: { title: string }) => {
      setTodoTitle('');

      const newTodo = {
        id: Math.floor(Math.random() * 100),
        userId: 1,
        completed: false,
        title,
      };

      mutate(addTodo(newTodo), {
        optimisticData: [...todos!, newTodo],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
    },
    [todos]
  );

  const addTodo = useCallback(
    async (newTodo: Todo): Promise<Todo[]> => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await res.json();

      if (Array.isArray(todos) && res.ok) {
        return [...todos, data];
      }

      throw new Error('Something went wrong!');
    },
    [todos]
  );

  const onAddBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addTodoHandler({ title: todoTitle });
  };

  const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addTodoHandler({ title: todoTitle });
    }
  };

  const uncompletedTodos = useCallback(() => {
    if (Array.isArray(todos)) {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  }, [todos]);

  return (
    <section className='flex flex-col items-center h-screen'>
      <h1 className='font-bold text-3xl py-10'>#Todo</h1>

      <div className='w-2/5'>
        <Tabs>
          <Tab id={1} title={`All`}>
            {/* <TodoAddForm onAdd={(todo) => todoAddHandler(todo)} /> */}
            <div className='space-x-5 py-5 flex justify-between items-center'>
              <input
                type='text'
                placeholder='Todo...'
                name='todo__title'
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.currentTarget.value)}
                onKeyUp={onInputEnter}
                className='text-sm | py-3.5 w-4/5 px-3 focus:outline-none outline-none | border border-gray-300 focus:border-[#2F80ED] focus:shadow-sm shadow-[#2F80ED] rounded-xl duration-200'
              />
              <button
                onClick={onAddBtnClick}
                type='submit'
                className='outline-none focus:outline-none | font-semibold text-sm | bg-[#2F80ED] w-1/5 text-white px-7 py-3.5 rounded-lg active:scale-95 duration-200'
              >
                Add
              </button>
            </div>

            <div className='div | pl-2 space-y-5 pb-5'>
              <SHOW IF={!todos && !error}>Loading..</SHOW>
              <SHOW IF={!todos && error}>{error?.message}</SHOW>
              <SHOW IF={Array.isArray(todos) && todos!.length === 0 && !error}>
                +Create
              </SHOW>
              <SHOW IF={Array.isArray(todos) && todos.length > 0 && !error}>
                <Map datas={todos!}>
                  {(todo, idx) => (
                    <label
                      key={todo.id}
                      htmlFor={`${id}-'todo'-${idx}`}
                      className='flex items-center space-x-3'
                    >
                      <input
                        type='checkbox'
                        name={`${id}-'todo'-${idx}`}
                        id={`${id}-'todo'-${idx}`}
                        checked={todo.completed}
                        className='h-5 w-5 | rounded-md border-none outline-none'
                      />
                      <p
                        className={clsx({
                          'font-medium': true,
                          'line-through': todo.completed,
                        })}
                      >
                        {todo.title}
                      </p>
                    </label>
                  )}
                </Map>
              </SHOW>
            </div>
          </Tab>

          <Tab id={2} title={`Active`}>
            <div className='space-x-5 py-5 flex justify-between items-center'>
              <input
                type='text'
                placeholder='Todo...'
                name='todo__title'
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.currentTarget.value)}
                onKeyUp={onInputEnter}
                className='text-sm | py-3.5 w-4/5 px-3 focus:outline-none outline-none | border border-gray-300 focus:border-[#2F80ED] focus:shadow-sm shadow-[#2F80ED] rounded-xl duration-200'
              />
              <button
                onClick={onAddBtnClick}
                type='submit'
                className='outline-none focus:outline-none | font-semibold text-sm | bg-[#2F80ED] w-1/5 text-white px-7 py-3.5 rounded-lg active:scale-95 duration-200'
              >
                Add
              </button>
            </div>

            <div className='div | pl-2 space-y-5'>
              <SHOW IF={Array.isArray(todos) && todos.length > 0 && !error}>
                <Map datas={uncompletedTodos()!}>
                  {(todo, idx) => (
                    <label
                      key={todo.id}
                      htmlFor={`${id}-'todo'-${idx}`}
                      className='flex items-center space-x-3'
                    >
                      <input
                        type='checkbox'
                        name={`${id}-'todo'-${idx}`}
                        id={`${id}-'todo'-${idx}`}
                        checked={todo.completed}
                        className='h-5 w-5 | rounded-md border-none outline-none'
                      />
                      <p
                        className={clsx({
                          'font-medium': true,
                          'line-through': todo.completed,
                        })}
                      >
                        {todo.title}
                      </p>
                    </label>
                  )}
                </Map>
              </SHOW>
            </div>
          </Tab>

          <Tab id={3} title={`Completed`}>
            <div className='div | pl-2 space-y-5 py-5'>
              {[1, 2].map((todo, idx) => (
                <div className='flex justify-between'>
                  <label
                    htmlFor={`${id}-'todo'-${idx}`}
                    className='flex items-center space-x-3'
                  >
                    <input
                      type='checkbox'
                      defaultChecked={true}
                      name={`${id}-'todo'-${idx}`}
                      id={`${id}-'todo'-${idx}`}
                      className='h-5 w-5 | rounded-md border-none outline-none'
                    />
                    <p className='font-medium'>Do coding challenges</p>
                  </label>

                  <div
                    className='trash | h-6 w-6 flex items-center justify-center'
                    onClick={(e) => alert(e)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                      className='h-full w-full | text-[#BDBDBD] | cursor-pointer | hover:text-red-500/75 duration-200'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-end | py-5'>
              <button
                type='submit'
                className='bg-[#EB5757] text-white font-semibold text-sm | py-2.5 pr-8 pl-6 | flex items-center justify-center | active:scale-95 duration-200 rounded-md'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                  className='h-4 w-4 | text-white | cursor-pointer | duration-200 | mr-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
                delete all
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default Todos;

// export async function addTodo(todo) {
//   await delay();
//   if (Math.random() < 0.5) throw new Error('Failed to add new item!');
//   todos = [...todos, todo];
//   return todos;
// }
