'use client'

import TooltipWrapper from '@/components/TooltipWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { WorkFlowStatus } from '@/types/workflows'
import { WorkFlow } from '@prisma/client'
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DeleteWorkFlowDialog from './DeleteWorkFlowDialog'

const statusColors = {
  [WorkFlowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkFlowStatus.PUBLISHED]: 'bg-primary'
}

function WorkFlowCard({ workflow }: { workflow: WorkFlow }) {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT
  return (
    <Card className='overflow-hidden border border-separate rounded-lg shadow-sm hover:shadow-md dark:shadow-primary/30'>
      <CardContent className='p-4 h-[100px] flex items-center justify-between'>
        <div className='flex items-center justify-end space-x-3'>
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              statusColors[workflow.status as WorkFlowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className='w-5 h-5' />
            ) : (
              <PlayIcon className='w-5 h-5 text-white' />
            )}
          </div>
          <div>
            <h3 className='flex items-center text-base font-bold text-muted-foreground'>
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className='flex items-center hover:underline'
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className='ml-2 py-0.5 font-medium text-xs bg-yellow-100 text-yellow-800 rounded-full px-2'>
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm'
              }),
              'flex items-center gap-2'
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkFlowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
    </Card>
  )
}
function WorkFlowActions({
  workflowName,
  workflowId
}: {
  workflowName: string
  workflowId: string
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
      <DeleteWorkFlowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <TooltipWrapper content={'More actions'}>
              <div className='flex items-center justify-center w-full h-full'>
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex items-center gap-2 text-destructive'
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default WorkFlowCard
