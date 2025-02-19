'use client'

import { WorkFlow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import TopBar from './topBar/TopBar'

function Editor({ workflow }: { workflow: WorkFlow }) {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <TopBar
          title='Workflow editor'
          subtitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className='flex h-full overflow-auto'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor
