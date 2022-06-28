import React, { useCallback, useEffect, useId, useState } from 'react'
import Tabs from '../../components/Tabs'
import useSWR, { Fetcher, Key } from 'swr'
import SHOW from '../../components/SHOWIF'
import produce from 'immer'
import TodoAddForm from '../../block/todos/TodoAddForm'
import TodoList from '../../block/todos/TodoList'
import Button from '../../components/Button'
import SvgTrash from '../../icons/SvgTrash'
import addTodo from '../../block/todos/utils/addTodo'
import { toggleTodo } from '../../block/todos/utils/toggleTodo'

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
  const { data: todos, error, mutate } = useSWR<Todo[]>(uid, fetcher)

  const addTodoHandler = useCallback(
    async ({ title }: { title: string }) => {
      const newTodo = {
        id: Math.floor(Math.random() * 100),
        userId: 1,
        completed: false,
        title,
      }

      if (Array.isArray(todos)) {
        mutate(addTodo(todos, newTodo), {
          optimisticData: [...todos!, newTodo],
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        })
      }
    },
    [todos]
  )

  const toggleTodoHandler = useCallback(
    ({ id }: { id: Todo[`id`] }) => {
      if (Array.isArray(todos)) {
        mutate(toggleTodo(todos, { id }), {
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
        })
      }
    },
    [todos]
  )

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
              onToggle={(id) => toggleTodoHandler({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={todos}
            />
          </Tab>

          <Tab id={2} title={`Active`}>
            <TodoAddForm onAdd={(title) => addTodoHandler({ title })} />

            <TodoList
              onToggle={(id) => toggleTodoHandler({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={uncompletedTodos()}
            />
          </Tab>

          <Tab id={3} title={`Completed`}>
            <TodoAddForm onAdd={(title) => addTodoHandler({ title })} />

            <TodoList
              onToggle={(id) => toggleTodoHandler({ id })}
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
