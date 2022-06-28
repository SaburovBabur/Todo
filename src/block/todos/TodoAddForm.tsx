import React, { useState } from 'react'

interface IProps {
  onAdd: (title: string) => void
}

const TodoAddForm = ({ onAdd }: IProps) => {
  const [todoTitle, setTodoTitle] = useState('')

  const onAddBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAdd(todoTitle)

    setTodoTitle('')
  }

  const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onAdd(todoTitle)

      setTodoTitle('')
    }
  }

  return (
    <div className='space-x-5 py-5 flex justify-between items-center'>
      <input
        type='text'
        placeholder='Todo...'
        name='todo__title'
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.currentTarget.value)}
        onKeyUp={onInputEnter}
        className='text-sm | py-3.5 w-4/5 px-3 focus:outline-none outline-none | border border-gray-300 focus:border-[#2F80ED] focus:shadow-sm shadow-[#2F80ED] rounded-xl duration-200'
      />
      <button
        onClick={onAddBtnClick}
        type='submit'
        className='outline-none focus:outline-none | font-semibold text-sm | bg-[#2F80ED] w-1/5 text-white px-7 py-3.5 rounded-lg active:scale-95 duration-200'
      >
        Add
      </button>
    </div>
  )
}

export default TodoAddForm
