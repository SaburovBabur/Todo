import React from 'react'

interface IProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  type: 'primary' | 'danger'
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ leftIcon, children, type, onClick, rightIcon }: IProps) => {
  return (
    <div className='flex items-center justify-end | py-5'>
      <button
        onClick={onClick}
        type='submit'
        className='bg-[#EB5757] text-white font-semibold text-sm | py-2.5 pr-8 pl-6 | flex items-center justify-center | active:scale-95 duration-200 rounded-md'
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    </div>
  )
}

export default Button
