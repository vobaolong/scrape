'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react'
import React from 'react'

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType]
  return (
    <div className='flex items-center gap-2 p-2'>
      <task.icon size={16} />
      <div className='flex items-center justify-between w-full'>
        <p className='text-xs font-black uppercase text-muted-foreground'>
          {task.label}
        </p>
        <div className='flex items-center gap-1'>
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className='flex items-center gap-2 text-xs'>
            <CoinsIcon size={16} />
            TODO
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button variant={'ghost'} size={'icon'}>
                <TrashIcon size={12} />
              </Button>

              <Button variant={'ghost'} size={'icon'}>
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            variant={'ghost'}
            size={'icon'}
            className='drag-handle cursor-grab'
          >
            <GripVerticalIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NodeHeader
