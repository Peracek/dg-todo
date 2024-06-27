'use client'

import { Task } from '@prisma/client'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { addTaskToServer } from './addTaskToServer'

const StoreContext = createContext<{
  tasks: Task[]
  addTask: (task: Task) => void
}>({ tasks: [], addTask: () => {} })

export const StoreContextProvider = (
  props: PropsWithChildren<{ tasks: Task[] }>
) => {
  const [tasks, setTasks] = useState(props.tasks ?? [])
  const notSyncedTasks = useRef<Task[]>([])

  useEffect(() => {
    startBackOnlineListener(notSyncedTasks.current)
  }, [])

  const addTask = useCallback(
    async (taskToAdd: Task) => {
      setTasks([...tasks, taskToAdd])
      // TODO: update db
      try {
        // FIXME: update ID
        await addTaskToServer(taskToAdd)
      } catch (e) {
        if (!navigator.onLine) {
          notSyncedTasks.current.push(taskToAdd)
          alert('oh shit')
          // FIXME: notify user
          // TODO: start listening for online
        } else {
          // FIXME: distinguish type of error
          debugger
          throw e
        }
      }
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

const startBackOnlineListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('online', () => {
    // FIXME: create bulk add tasks
    // addTasksToServer(notSyncedTasks)
    Promise.all(notSyncedTasks.map((task) => addTaskToServer(task))).then(
      () => {
        alert('synced')
      }
    )
  })
}
