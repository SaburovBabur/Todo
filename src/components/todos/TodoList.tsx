import clsx from 'clsx'
import { memo, useId } from 'react'
import { Empty } from '../../components/global/Empty'
import Map from '../../components/global/Map'
import SHOW from '../../components/global/SHOWIF'
import Todo from './Todo'
import { ITodo } from './types/Todo'

interface IProps {
  isLoading: boolean
  isError: false | Error
  onToggle: (id: number) => void
  data?: ITodo[]
}

function TodoList({ isLoading, isError, data, onToggle }: IProps) {
  return (
    <div className='div | space-y-3 pl-2 pb-5'>
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
            <Todo
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              idx={idx}
              onToggle={onToggle}
            />
          )}
        </Map>
      </SHOW>
    </div>
  )
}

export default memo(TodoList)
