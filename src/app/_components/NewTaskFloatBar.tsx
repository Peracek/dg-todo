'use client'

import { useTasks } from '@/db/Store'
import { Button } from '@headlessui/react'

export const NewTaskFloatBar = () => {
  const { addTask } = useTasks()

  return (
    <div className="card card-hover">
      <Button
        onClick={() =>
          addTask({
            id: 'test',
            title: 'test title',
            description: 'test description',
            authorId: null,
          })
        }
      >
        vytvorit poznamku
      </Button>
    </div>
  )
}
