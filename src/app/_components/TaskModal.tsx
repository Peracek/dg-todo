import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Task } from '@prisma/client'

export const TaskModal = ({
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
