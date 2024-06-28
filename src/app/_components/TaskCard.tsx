import { MdCheckCircleOutline } from 'react-icons/md'
import { Task } from '@prisma/client'

export const TaskCard = ({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) => (
  <div
    role="button"
    onClick={onClick}
    className="card hover:card-hover flex gap-4 items-center"
  >
    <button>
      <MdCheckCircleOutline className="w-5 h-5 opacity-25 hover:opacity-100" />
    </button>
    <div className="whitespace-nowrap overflow-hidden">
      <p className="mb-2 tracking-tight text-gray-900 overflow-hidden text-ellipsis">
        {task.title}
      </p>
      <p className="text-gray-700 text-sm overflow-hidden text-ellipsis">
        {task.description}
      </p>
    </div>
  </div>
)
