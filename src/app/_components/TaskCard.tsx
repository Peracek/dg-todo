import { MdCheckCircleOutline } from 'react-icons/md'
import { Task, useTasks } from '@/db/StoreContext'
import { MouseEventHandler } from 'react'

export const TaskCard = ({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) => {
  const { updateTask } = useTasks()
  const handleFinished: MouseEventHandler = (e) => {
    e.stopPropagation()
    updateTask({ ...task, isCompleted: !task.isCompleted })
  }

  const buttonOpracityStyle = task.isCompleted
    ? 'opacity-100'
    : 'opacity-25 hover:opacity-100'
  const strikedStyle = task.isCompleted ? 'line-through' : ''

  return (
    <div
      role="button"
      onClick={onClick}
      className={`card hover:card-hover flex gap-4 items-center ${strikedStyle}`}
    >
      <button onClick={handleFinished}>
        <MdCheckCircleOutline className={`text-lg ${buttonOpracityStyle}`} />
      </button>
      <div className="whitespace-nowrap overflow-hidden">
        <p className="tracking-tight text-gray-900 overflow-hidden text-ellipsis">
          {task.title}
        </p>
        <p className="pt-2 text-gray-700 text-sm overflow-hidden text-ellipsis empty:hidden">
          {task.description}
        </p>
      </div>
    </div>
  )
}
