'use client'

import { TaskCard } from './_components/TaskCard'
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
} from '@headlessui/react'
import { useState } from 'react'
import { tasks } from './dummyTasks'
import { Task } from './types'
import { signIn } from '@/auth'
import { SignIn, signInAction } from './_components/SignInButton'

const TaskDialog = ({
  task,
  onClose,
}: {
  task?: Task
  onClose: (value: boolean) => void
}) => {
  const open = !!task

  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        {task && (
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">{task.title}</DialogTitle>
              <Description>{task.description}</Description>
              {/* <p>{activeTask.description}</p> */}
              <div className="flex gap-4">
                {/* <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
              </div>
            </DialogPanel>
          </div>
        )}
      </Dialog>
    </>
  )
}

const NewTaskBar = () => {
  return <div className="card card-hover">vytvorit poznamku</div>
}

export default function Home() {
  const [openedTask, setOpenedTask] = useState<Task | undefined>()
  const closeDialog = () => setOpenedTask(undefined)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={signInAction}>
        <button type="submit">Signin with Github</button>
      </form>
      <NewTaskBar />
      <div className="max-w-xl">
        {tasks.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            onClick={() => setOpenedTask(task)}
          />
        ))}
      </div>

      <TaskDialog task={openedTask} onClose={closeDialog} />
    </main>
  )
}
