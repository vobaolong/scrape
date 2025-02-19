'use client'

import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { WorkFlow } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import React from 'react'
import NodeComponent from './nodes/NodeComponent'

const nodeTypes = {
  ScrapeFlowNode: NodeComponent
}
function FlowEditor({ workflow }: { workflow: WorkFlow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER)
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  return (
    <main className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Controls position='top-left' />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
