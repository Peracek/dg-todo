"use client";

import { Task } from "./_components/Task";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
} from "@headlessui/react";
import { useState } from "react";
import { tasks } from "./dummyTasks";

const TaskDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              {/* <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default function Home() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-xl">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            onClick={() => setDialogIsOpen(true)}
          />
        ))}
      </div>
      <Button onClick={() => setDialogIsOpen(true)}>add task</Button>
      <TaskDialog
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(!dialogIsOpen)}
      />
    </main>
  );
}
