import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params
  const { userId } = await auth()
  if (!userId) return <div>unauthenticated</div>

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  })

  if (!workflow) return <div>workflow not found</div>

  return <pre className='h-screen'>{JSON.stringify(workflow, null, 4)}</pre>
}

export default page
