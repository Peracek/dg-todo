'use server'

import prisma from './prismaClient'

export const getTasks = async () => prisma.task.findMany()
