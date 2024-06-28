'use server'

import { Task } from '@prisma/client'
import prisma from './prismaClient'

export const updateTaskToServer = async (task: Task) =>
  prisma.task.update({ data: task, where: { id: task.id } })
