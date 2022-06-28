import produce from 'immer'
import { Todo } from '../types/Todo'

export const toggleTodo = async (todos: Todo[], { id }: { id: number }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({ completed: true }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

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
}
