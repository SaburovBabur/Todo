import React from 'react'
import useSWR, { Fetcher } from 'swr'
import { ITodo } from '../components/todos/types/Todo'

const fetcher: Fetcher<ITodo[], string> = (url: string) => {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }

    throw new Error('Error occured! Try back later!')
  })
}

export function useTodos() {
  const {
    data: todos,
    error,
    mutate,
    ...rest
  } = useSWR<ITodo[]>(
    `https://jsonplaceholder.typicode.com/todos?userId=1`,
    fetcher
  )

  return {
    todos,
    error,
    mutate,
    rest,
  }
}
