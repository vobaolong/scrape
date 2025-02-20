'use server'

import prisma from '@/lib/prisma'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType
} from '@/schema/workflows'
import { AppNode } from '@/types/appNode'
import { TaskType } from '@/types/task'
import { WorkFlowStatus } from '@/types/workflows'
import { auth } from '@clerk/nextjs/server'
import { Edge } from '@xyflow/react'
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

  const initialFlow: {
    nodes: AppNode[]
    edges: Edge[]
  } = {
    nodes: [],
    edges: []
  }

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workFlow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data
    }
  })

  if (!result) {
    throw new Error('Failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}`)
}
