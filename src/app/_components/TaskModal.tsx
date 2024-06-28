import { Task, useTasks } from '@/db/StoreContext'
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

type Inputs = { title: string; description: string }

const EditForm = ({
  task,
  onClose,
  onSave,
}: {
  task?: Task
  onClose: (value: boolean) => void
  onSave: (values: Inputs) => void
}) => {
  const { register, handleSubmit, reset, formState, setFocus } =
    useForm<Inputs>({
      defaultValues: task,
    })
  useEffect(() => {
    setFocus('description')
  })

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="flex justify-between">
        <DialogTitle className="font-bold">
          <input className="outline-none" {...register('title')} />
        </DialogTitle>
        <button onClick={() => onClose(true)}>
          <MdClose className="text-gray-400 text-xl" />
        </button>
      </div>
      <Description>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full outline-none"
        />
      </Description>
      <div className="flex justify-center">
        <button
          type="submit"
          className="p-2 border hover:bg-green-50 rounded-md"
        >
          save
        </button>
      </div>
    </form>
  )
}

export const TaskModal = ({
  task,
  onClose,
}: {
  task?: Task
  onClose: (value: boolean) => void
}) => {
  const { updateTask } = useTasks()
  const handleSave = useCallback(
    (inputs: Inputs) => {
      if (task) {
        updateTask({ ...task, ...inputs })
      }
      onClose(true)
    },
    [task, updateTask, onClose]
  )

  return (
    <Dialog open={!!task} onClose={onClose} className="relative z-50" as="div">
      {task && (
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
          <DialogPanel
            transition
            className="card bg-white w-96 space-y-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <EditForm task={task} onClose={onClose} onSave={handleSave} />
          </DialogPanel>
        </div>
      )}
    </Dialog>
  )
}
