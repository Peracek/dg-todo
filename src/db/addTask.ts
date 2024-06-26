'use server'

import { Task } from '@prisma/client'
import prisma from './prismaClient'

export const addTask = (task: Task) =>
  prisma.task.create({ data: task, select: {} })
