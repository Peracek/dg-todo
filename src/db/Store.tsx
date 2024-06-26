'use client'

import { Task } from '@prisma/client'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

const StoreContext = createContext<{
  tasks: Task[]
  addTask: (task: Task) => void
}>({ tasks: [], addTask: () => {} })

export const StoreContextProvider = (
  props: PropsWithChildren<{ tasks: Task[] }>
) => {
  const [tasks, setTasks] = useState(props.tasks ?? [])
  const addTask = useCallback(
    (taskToAdd: Task) => {
      setTasks([...tasks, taskToAdd])
      // TODO: update db
    },
    [tasks]
  )

  return (
    <StoreContext.Provider value={{ tasks, addTask }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useTasks = () => {
  const { tasks, addTask } = useContext(StoreContext)
  // FIXME: check if used in Context context :)
  return { tasks, addTask }
}
