import { Button } from '@headlessui/react'
import { Task } from '../types'

export const TaskCard = ({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) => (
  <Button
    onClick={onClick}
    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
  >
    <h5 className="mb-2 text-lg font-bolder tracking-tight text-gray-900">
      {task.title}
    </h5>
    <p className="font-normal text-gray-700 text-sm">{task.description}</p>
  </Button>
)
