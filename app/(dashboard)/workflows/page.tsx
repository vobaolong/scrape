import { GetWorkFlowsForUser } from '@/actions/workflows/getWorkFlowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkFlowDialog from './_components/CreateWorkFlowDialog'
import WorkFlowCard from './_components/WorkFlowCard'

function page() {
  return (
    <div className='flex flex-col flex-1 h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>Manage your workflows</p>
        </div>
        <CreateWorkFlowDialog />
      </div>

      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkFlowsSkeleton />}>
          <UserWorkFlows />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkFlowsSkeleton() {
  return (
    <div className='space-y-2'>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className='w-full h-32' />
      ))}
    </div>
  )
}

async function UserWorkFlows() {
  const workflows = await GetWorkFlowsForUser()

  if (!workflows) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }
  if (workflows.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <div className='flex items-center justify-center w-20 h-20 rounded-full bg-accent'>
          <InboxIcon size={40} className='stroke-primary' />
        </div>
        <div className='flex flex-col gap-1 text-center'>
          <p className='font-bold'>No workflow created yet</p>
          <p className='text-sm text-muted-foreground'>
            Click the button below to create your first workflow.
          </p>
        </div>
        <CreateWorkFlowDialog triggerText='Create your first Workflow' />
      </div>
    )
  }
  return (
    <div className='grid grid-cols-1 gap-4'>
      {workflows.map((workflow) => (
        <WorkFlowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}

export default page
