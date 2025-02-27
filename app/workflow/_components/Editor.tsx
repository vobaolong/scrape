'use client'

import { WorkFlow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import TopBar from './topBar/TopBar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContextType'

function Editor({ workflow }: { workflow: WorkFlow }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className='flex flex-col w-full h-full overflow-hidden'>
          <TopBar
            title='Workflow editor'
            subtitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className='flex h-full overflow-auto'>
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  )
}

export default Editor
