import clsx from 'clsx'
import { useId } from 'react'
import { Empty } from '../../components/Empty'
import Map from '../../components/Map'
import SHOW from '../../components/SHOWIF'
import { Todo } from './types/Todo'

interface IProps {
  isLoading: boolean
  isError: false | Error
  onToggle: (id: number) => void
  data?: Todo[]
}

function TodoList({ isLoading, isError, data, onToggle }: IProps) {
  const id = useId()

  return (
    <div className='div | pl-2 space-y-5 pb-5'>
      <SHOW IF={isLoading}>Loading..</SHOW>
      <SHOW IF={isError === false ? false : true}>
        {(isError as Error)?.message}
      </SHOW>
      <SHOW IF={Array.isArray(data) && data!.length === 0 && !isError}>
        <SHOW IF={Array.isArray(data) && data.length === 0}>
          <div className='flex justify-center items-center py-5'>
            <Empty className='h-48' />
          </div>
        </SHOW>
      </SHOW>
      <SHOW IF={Array.isArray(data) && data.length > 0 && !isError}>
        <Map datas={data!}>
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
                onChange={() => onToggle(todo.id)}
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
  )
}

export default TodoList
