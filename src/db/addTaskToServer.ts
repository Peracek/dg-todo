'use server'

import { Task } from '@prisma/client'
import prisma from './prismaClient'

export const addTaskToServer = async (task: Task | Task[]) =>
  prisma.task.createMany({ data: task })
