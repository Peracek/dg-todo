'use client'

import { Task } from '@prisma/client'
import { useState } from 'react'
import { TaskCard } from './TaskCard'
import { TaskModal } from './TaskModal'
import { useTasks } from '@/db/StoreContext'

export const TaskList = () => {
  const [openedTask, setOpenedTask] = useState<Task | undefined>()
  const { tasks } = useTasks()
  const closeDialog = () => setOpenedTask(undefined)

  return (
    <>
      <div className="max-w-xl">
        {tasks.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            onClick={() => setOpenedTask(task)}
          />
        ))}
      </div>
      <TaskModal task={openedTask} onClose={closeDialog} />
    </>
  )
}
