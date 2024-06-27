'use server'

import { Task } from '@prisma/client'
import prisma from './prismaClient'

export const addTaskToServer = (task: Task) =>
  prisma.task.create({ data: task, select: { id: true } })
