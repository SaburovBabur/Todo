import clsx from 'clsx'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
interface IProps {
  onAdd: (title: string) => void
}

const TodoAddForm = ({ onAdd }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = useCallback(
    (e: any) => {
      onAdd(e.todo__title)

      reset()
    },
    [onAdd, reset]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-x-5 py-5 flex justify-between items-center'
    >
      <input
        type='text'
        placeholder='Lets do something...'
        className={clsx({
          'text-sm | py-3.5 w-4/5 px-3 focus:outline-none outline-none | border focus:shadow-sm rounded-xl duration-200':
            true,
          'border-gray-300 focus:border-[#2F80ED] shadow-[#2F80ED]':
            !errors.todo__title,
          'border-red-300 shadow-red-500': errors.todo__title,
        })}
        {...register('todo__title', {
          required: true,
          maxLength: 20,
        })}
      />
      <button
        type='submit'
        className='outline-none focus:outline-none | font-semibold text-sm | bg-[#2F80ED] w-1/5 text-white px-7 py-3.5 rounded-lg active:scale-95 duration-200'
      >
        Add
      </button>
    </form>
  )
}

export default memo(TodoAddForm)
