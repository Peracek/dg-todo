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
import { updateTaskToServer } from './updateTaskToServer'

const StoreContext = createContext<{
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
}>({ tasks: [], addTask: () => {}, updateTask: () => {} })

export const StoreContextProvider = (
  props: PropsWithChildren<{ tasks: Task[] }>
) => {
  const [tasks, setTasks] = useState(props.tasks ?? [])
  const notSyncedTasks = useRef<Task[]>([])

  useEffect(() => {
    startBackOnlineListener(notSyncedTasks.current)
    startUnloadListener(notSyncedTasks.current)
  }, [])

  const addTask = useCallback(
    async (taskToAdd: Task) => {
      setTasks([taskToAdd, ...tasks])
      // TODO: update db
      try {
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

  const updateTask = useCallback(
    (taskToUpdate: Task) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? taskToUpdate : task
      )
      setTasks(updatedTasks)
      // FIXME: try and..
      updateTaskToServer(taskToUpdate)
    },
    [tasks]
  )

  return (
    <StoreContext.Provider value={{ tasks, addTask, updateTask }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useTasks = () => {
  const { tasks, addTask, updateTask } = useContext(StoreContext)
  return { tasks, addTask, updateTask }
}

const startBackOnlineListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('online', async () => {
    await addTaskToServer(notSyncedTasks)
    notSyncedTasks = []
  })
}

const startUnloadListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('beforeunload', (event) => {
    const anyPendingTasks = notSyncedTasks.length > 0
    if (anyPendingTasks) {
      event.returnValue = `Are you sure you want to leave?`
    }
  })
}
