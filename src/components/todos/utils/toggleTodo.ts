import produce from 'immer'
import { ITodo } from '../types/Todo'
import { toggleTodoById } from './toggleTodoById'

export const toggleTodo = async (todos: ITodo[], { id }: { id: number }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({ completed: true }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  if (res.ok && Array.isArray(todos)) {
    return toggleTodoById(todos, id)
  }

  throw new Error('Something went wrong!')
}
