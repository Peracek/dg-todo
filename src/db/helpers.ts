'use server'

import { Task } from '@prisma/client'
import prisma from './prismaClient'

export const addTaskToServer = async (task: Task) =>
  prisma.task.create({ data: task })

export const updateTaskAtServer = async (task: Task) =>
  prisma.task.update({ data: task, where: { id: task.id } })

export const syncTasksToServer = async (tasks: Task[]) =>
  Promise.all(
    tasks.map((task) =>
      prisma.task.upsert({
        create: task,
        update: task,
        where: { id: task.id },
      })
    )
  )
