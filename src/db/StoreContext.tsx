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
import toast from 'react-hot-toast'

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
        if (!navigator.onLine) {
          notSyncedTasks.current.push(taskToUpdate)
          toast.error(
            `You're offline. But no worries, your work will be synced when back online!`
          )
        } else {
          toast.error(
            `Something went wrong 😬. Apologies for the hassle, but this app's is not being looked after. If the issue lasts for a while, you might wanna dig into another to-do list app!`
          )
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
  window.addEventListener('online', async () => {
    if (notSyncedTasks.length > 0) {
      await syncTasksToServer(notSyncedTasks)
      // FIXME: no good, i cant change reference
      notSyncedTasks = []
      toast.success(
        `You're back online! All the changes you made are now safe.`
      )
    }
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
