'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetWorkFlowsForUser() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not found')
  }

  return prisma.workFlow.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
}
