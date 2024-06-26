'use server'

import { Task } from '@prisma/client'
import { cache, useEffect, useState } from 'react'
import prisma from './prismaClient'

// FIXME: cache?
export const getTasks = async () => prisma.task.findMany()
