import produce from 'immer'
import { ITodo } from '../types/ITodo'

export const toggleTodoById = (todos: ITodo[], todoId: ITodo[`id`]) => {
  return produce(todos, (draft) => {
    draft.forEach((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed
      }

      return todo
    })

    return draft
  })
}
