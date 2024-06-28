'use client'

import { Task as PrismaTask } from '@prisma/client'
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
import toast from 'react-hot-toast'

export type Task = Omit<PrismaTask, 'createdAt'>

const offlineMsg = `You're offline. But no worries, your work will be synced when back online!`
const backOnlineMsg = `You're back online! All the changes you made are now safe.`
const unknownErrorMsg = `Something went wrong 😬. Apologies for the hassle, but this app's is not being looked after. If the issue lasts for a while, you might wanna dig into another to-do list app!`

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
      try {
        await addTaskToServer(taskToAdd)
      } catch (e) {
        if (!navigator.onLine) {
          notSyncedTasks.current.push(taskToAdd)
          toast.error(offlineMsg)
        } else {
          toast.error(unknownErrorMsg)
          console.error(e)
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
        if (!navigator.onLine) {
          notSyncedTasks.current.push(taskToUpdate)
          toast.error(offlineMsg)
        } else {
          toast.error(unknownErrorMsg)
          console.error(e)
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
  window.ononline = async () => {
    if (notSyncedTasks.length > 0) {
      await syncTasksToServer(notSyncedTasks)
      notSyncedTasks.splice(0)
      toast.success(backOnlineMsg)
    }
  }
}

const startUnloadListener = (notSyncedTasks: Task[]) => {
  window.addEventListener('beforeunload', (event) => {
    const anyPendingTasks = notSyncedTasks.length > 0
    if (anyPendingTasks) {
      event.preventDefault()
    }
  })
}
