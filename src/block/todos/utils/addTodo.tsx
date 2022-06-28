import { Todo } from '../types/Todo'

export const addTodo = async (todos: Todo[], todo: Todo): Promise<Todo[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  const newTodo = await res.json()

  if (res.ok) {
    return [...todos, newTodo]
  }

  throw new Error('Something went wrong!')
}

export default addTodo
