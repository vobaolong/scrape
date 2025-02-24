'use server'
import { waitFor } from '@/lib/helper/waitFor'
import prisma from '@/lib/prisma'
import { WorkFlowStatus } from '@/types/workflows'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import React from 'react'

export async function UpdateWorkFlow({
  id,
  definition
}: {
  id: string
  definition: string
}) {
  await waitFor(3000)
  const { userId } = await auth()

  if (!userId) throw new Error('unauthenticated')

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id,
      userId
    }
  })

  if (!workflow) throw new Error('workflow not found')
  if (workflow.status !== WorkFlowStatus.DRAFT)
    throw new Error('workflow is not a draft')

  await prisma.workFlow.update({
    data: { definition },
    where: {
      id,
      userId
    }
  })

  revalidatePath('/workflows')
}
