'use client'

import { useTasks } from '@/db/Store'
import { Button, Input } from '@headlessui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = { title: string }

export const NewTaskFloatBar = ({ userId }: { userId: string }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const { addTask } = useTasks()
  const handleAdd: SubmitHandler<Inputs> = (data) => {
    addTask({
      id: crypto.randomUUID(),
      title: data.title,
      description: 'test description',
      authorId: userId,
    })
    reset()
  }

  return (
    <form className="card card-hover" onSubmit={handleSubmit(handleAdd)}>
      <Input
        placeholder="Create new task..."
        className="outline-none"
        {...register('title')}
      />
    </form>
  )
}
