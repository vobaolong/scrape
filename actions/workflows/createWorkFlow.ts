'use server'

import prisma from '@/lib/prisma'
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType
} from '@/schema/workflows'
import { WorkFlowStatus } from '@/types/workflows'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function CreateWorkFlow(form: createWorkFlowSchemaType) {
  const { success, data } = createWorkFlowSchema.safeParse(form)
  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not found')
  }

  const result = await prisma.workFlow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: 'TODO',
      ...data
    }
  })

  if (!result) {
    throw new Error('Failed to create workflow')
  }

  redirect(`/workflow/edit/${result.id}`)
}
