'use server'

import prisma from '@/lib/prisma'
import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan'
import { WorkFlowExecutionPlan } from '@/types/workflows'
import { auth } from '@clerk/nextjs/server'
import { off } from 'process'

export async function RunWorkFlow(form: {
  workflowId: string
  flowDefinition?: string
}) {
  const { userId } = await auth()

  if (!userId) throw new Error('Unauthenticated user')

  const { workflowId, flowDefinition } = form
  if (!workflowId) throw new Error('WorkflowId is required')

  const workFlow = await prisma.workFlow.findUnique({
    where: {
      userId,
      id: workflowId
    }
  })

  if (!workFlow) throw new Error('workFlow not found')

  let executionPlan: WorkFlowExecutionPlan
  if (!flowDefinition) throw new Error('Flow definition not found')

  const flow = JSON.parse(flowDefinition)
  const result = FlowToExecutionPlan(flow.nodes, flow.edges)

  if (result.error) throw new Error('flow definition not valid')

  if (!result.executionPlan) throw new Error('no execution plan generated')

  executionPlan = result.executionPlan

  console.log('ExecutePlan', executionPlan)
}
