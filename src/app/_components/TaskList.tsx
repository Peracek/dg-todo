'use client'

import { useState } from 'react'
import { TaskCard } from './TaskCard'
import { TaskModal } from './TaskModal'
import { Task, useTasks } from '@/db/StoreContext'

export const TaskList = () => {
  const [openedTask, setOpenedTask] = useState<Task | undefined>()
  const { tasks } = useTasks()
  const closeDialog = () => setOpenedTask(undefined)

  return (
    <>
      <div className="w-56 flex flex-col items-stretch gap-1">
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
