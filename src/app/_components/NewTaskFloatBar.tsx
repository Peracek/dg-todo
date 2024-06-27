'use client'

import { useTasks } from '@/db/StoreContext'
import { Input } from '@headlessui/react'
import { KeyboardEventHandler, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = { title: string; description: string }

export const NewTaskFloatBar = ({ userId }: { userId: string }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { register, handleSubmit, reset, formState } = useForm<Inputs>({
    defaultValues: { title: '', description: '' },
  })
  const { addTask } = useTasks()

  const handleAdd: SubmitHandler<Inputs> = (data) => {
    addTask({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      authorId: userId,
    })
    reset()
    setIsFocused(false)
  }

  const handleKeyDown: KeyboardEventHandler = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit(handleAdd)()
    }
  }

  const expanded = isFocused || formState.isDirty

  return (
    <form
      className="card card-hover flex flex-col"
      onSubmit={handleSubmit(handleAdd)}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Input
        {...register('title')}
        placeholder={isFocused ? 'Title' : 'Create new task...'}
        className="outline-none"
      />
      <Input
        {...register('description')}
        placeholder="Description"
        className={`outline-none text-sm mt-1 ${expanded ? '' : 'hidden'}`}
      />
    </form>
  )
}
