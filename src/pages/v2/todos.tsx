import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'
import Tabs from '../../components/global/Tabs'
import SHOW from '../../components/global/SHOWIF'
import produce from 'immer'
import TodoAddForm from '../../components/todos/TodoAddForm'
import TodoList from '../../components/todos/TodoList'
import Button from '../../components/global/Button'
import SvgTrash from '../../icons/SvgTrash'
import addTodo from '../../components/todos/utils/addTodo'
import { toggleTodo } from '../../components/todos/utils/toggleTodo'
import { toggleTodoById } from '../../components/todos/utils/toggleTodoById'
import { useTodos } from '../../hooks'
import { ITodo } from '../../components/todos/types/ITodo'

interface IProps {
  children?: React.ReactNode
}

const { Tab } = Tabs

function Todos(props: IProps) {
  // ========================
  // STATE
  // ========================
  const { todos, error, mutate } = useTodos()
  const [completedTodos, uncompletedTodos] = useMemo(
    () => [
      todos?.filter((todo) => todo.completed),
      todos?.filter((todo) => !todo.completed),
    ],
    [todos]
  )

  // ========================
  // HANDLERS
  // ========================
  const addTodoHandler = useCallback(
    async ({ title }: { title: string }) => {
      const newTodo = {
        id: Math.floor(Math.random() * 10000),
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
    ({ id }: { id: ITodo[`id`] }) => {
      if (Array.isArray(todos)) {
        mutate(toggleTodo(todos, { id }), {
          optimisticData: toggleTodoById(todos, id), // Getas all todos and toggles completed to !completed
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

  const todoRemoveAll = useCallback(async (): Promise<ITodo[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (res.ok && Array.isArray(todos)) {
      return produce(todos, (draft) => {
        return draft.filter((todo) => !todo.completed)
      })
    }

    throw new Error('Something went wrong!')
  }, [todos])

  return (
    <section className='flex flex-col items-center h-screen'>
      <h1 className='font-bold text-3xl py-10'>#Todo</h1>

      <div className='w-2/5'>
        <Tabs>
          <Tab id={1} title={`All`}>
            {/* <Todos.All /> */}
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
              data={uncompletedTodos}
            />
          </Tab>

          <Tab id={3} title={`Completed`}>
            {/* <Todos.Completed /> */}

            <TodoList
              onToggle={(id) => toggleTodoHandler({ id })}
              isLoading={!todos && !error}
              isError={!todos && error}
              data={completedTodos}
            />

            <SHOW
              IF={Array.isArray(completedTodos) && completedTodos!.length > 0}
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
