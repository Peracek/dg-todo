import { Button } from '@headlessui/react'
import { Task } from '@prisma/client'

export const TaskCard = ({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) => (
  <div role="button" onClick={onClick} className="card hover:card-hover">
    <h5 className="mb-2 tracking-tight text-gray-900">{task.title}</h5>
    <p className="text-gray-700 text-sm">{task.description}</p>
  </div>
)
