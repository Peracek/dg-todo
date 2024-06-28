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
import {
  addTaskToServer,
  syncTasksToServer,
  updateTaskAtServer,
} from './helpers'

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
    async (taskToUpdate: Task) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? taskToUpdate : task
      )
      setTasks(updatedTasks)
      try {
        await updateTaskAtServer(taskToUpdate)
      } catch (e) {
        debugger
        if (!navigator.onLine) {
          notSyncedTasks.current.push(taskToUpdate)
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
    <StoreContext.Provider value={{ tasks, addTask, updateTask }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useTasks = () => useContext(StoreContext)

const startBackOnlineListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('online', async () => {
    await syncTasksToServer(notSyncedTasks)
    notSyncedTasks = []
  })
}

const startUnloadListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('beforeunload', (event) => {
    const anyPendingTasks = notSyncedTasks.length > 0
    if (anyPendingTasks) {
      // FIXME: fix deprecated
      event.returnValue = `Are you sure you want to leave?`
    }
  })
}
