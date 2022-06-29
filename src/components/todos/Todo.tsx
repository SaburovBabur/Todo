import clsx from 'clsx'
import React from 'react'
import { ITodo } from './types/Todo'

interface IProps {
  title: React.ReactNode
  idx: string | number
  completed: boolean
  onToggle: (id: ITodo[`id`]) => void
  id: ITodo[`id`]
}

const Todo = ({ title, idx, completed, onToggle, id }: IProps) => {
  return (
    <label htmlFor={`todo-${idx}`} className='flex items-center space-x-3'>
      <input
        type='checkbox'
        name={`todo-${idx}`}
        id={`todo-${idx}`}
        checked={completed}
        onChange={() => onToggle(id)}
        className='h-5 w-5 | rounded-md border-none outline-none'
      />
      <p
        className={clsx({
          'font-medium': true,
          'line-through': completed,
        })}
      >
        {title}
      </p>
    </label>
  )
}

export default Todo
