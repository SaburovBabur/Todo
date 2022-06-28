import React, { useCallback, useEffect, useId, useState } from 'react'
import Tabs from '../../components/Tabs'
import useSWR, { Fetcher, Key } from 'swr'
import clsx from 'clsx'
import Map from '../../components/Map'
import SHOW from '../../components/SHOWIF'
import produce from 'immer'
import { Empty } from '../../components/Empty'
import TodoAddForm from '../../block/todos/TodoAddForm'
import TodoList from '../../block/todos/TodoList'
import Button from '../../components/Button'
import SvgTrash from '../../icons/SvgTrash'

interface IProps {
  children?: React.ReactNode
}

const { Tab } = Tabs

interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

const fetcher: Fetcher<Todo[], string> = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }

    throw new Error('Error occured! Try back later!')
  })

function Todos(props: IProps) {
  const uid: Key = 'https://jsonplaceholder.typicode.com/todos?userId=1'
  const [todoTitle, setTodoTitle] = useState('')
  const { data: todos, error, mutate } = useSWR<Todo[]>(uid, fetcher)
  const id = useId()

  const removeTodosHandler = useCallback(async () => {
    if (Array.isArray(todos)) {
      mutate(todoRemoveAll(), {
        optimisticData: todos.filter((todo) => !todo.completed),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      })
    }
  }, [todos])

  const addTodoHandler = useCallback(
    async ({ title }: { title: string }) => {
      setTodoTitle('')

      const newTodo = {
        id: Math.floor(Math.random() * 100),
        userId: 1,
        completed: false,
        title,
      }

      console.log(todos)

      mutate(addTodo(newTodo), {
        optimisticData: [...todos!, newTodo],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      })
    },
    [todos]
  )

  const addTodo = useCallback(
    async (newTodo: Todo): Promise<Todo[]> => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const data = await res.json()

      if (Array.isArray(todos) && res.ok) {
        return produce(todos, (draft) => {
          draft.push(data)
          return draft
        })
      }

      throw new Error('Something went wrong!')
    },
    [todos]
  )

  const todoRemoveAll = useCallback(async (): Promise<Todo[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    const data = await res.json()

    if (res.ok && Array.isArray(todos)) {
      return produce(todos, (draft) => {
        return draft.filter((todo) => !todo.completed)
      })
    }

    throw new Error('Something went wrong!')
  }, [todos])

  const toggleTodo = useCallback(
    ({ id }: { id: Todo[`id`] }) => {
      if (Array.isArray(todos)) {
        mutate(
          (async (id) => {
            const res = await fetch(
              'https://jsonplaceholder.typicode.com/posts/1',
              {
                method: 'PUT',
                body: JSON.stringify({ completed: true }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }
            )

            if (res.ok && Array.isArray(todos)) {
              return produce(todos, (draft) => {
                draft.forEach((todo) => {
                  if (todo.id === id) {
                    todo.completed = !todo.completed
                  }

                  return todo
                })

                return draft
              })
            }

            throw new Error('Something went wrong!')
          })(id),
          {
            optimisticData: produce(todos, (draft) => {
              draft.forEach((todo) => {
                if (todo.id === id) {
                  todo.completed = !todo.completed
                }

                return todo
              })

              return draft
            }),
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
          }
        )
      }
    },
    [todos]
  )

  const uncompletedTodos = useCallback(() => {
    if (Array.isArray(todos)) {
      return todos.filter((todo) => !todo.completed)
    }

    return todos
  }, [todos])

  const completedTodos = useCallback(() => {
    if (Array.isArray(todos)) {
      return todos.filter((todo) => todo.completed)
    }

    return todos
  }, [todos])

  return (
    <section className='flex flex-col items-center h-screen'>
      <h1 className='font-bold text-3xl py-10'>#Todo</h1>

      <div className='w-2/5'>
        <Tabs>
          <Tab id={1} title={`All`}>
            <TodoAddForm onAdd={(title) => addTodoHandler({ title })} />

            <TodoList
              onToggle={(id) => toggleTodo({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={todos}
            />
          </Tab>

          <Tab id={2} title={`Active`}>
            <TodoAddForm onAdd={(title) => addTodoHandler({ title })} />

            <TodoList
              onToggle={(id) => toggleTodo({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={uncompletedTodos()}
            />
          </Tab>

          <Tab id={3} title={`Completed`}>
            <TodoAddForm onAdd={(title) => addTodoHandler({ title })} />

            <TodoList
              onToggle={(id) => toggleTodo({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={completedTodos()}
            />

            <SHOW
              IF={
                Array.isArray(completedTodos()) && completedTodos()!.length > 0
              }
            >
              <Button
                onClick={removeTodosHandler}
                type='danger'
                leftIcon={
                  <SvgTrash className='h-4 w-4 | text-white | cursor-pointer | duration-200 | mr-3' />
                }
              >
                delete all
              </Button>
            </SHOW>
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

export default Todos

// export async function addTodo(todo) {
//   await delay();
//   if (Math.random() < 0.5) throw new Error('Failed to add new item!');
//   todos = [...todos, todo];
//   return todos;
// }
