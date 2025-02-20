'use client'

import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { WorkFlow } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import React, { useCallback, useEffect } from 'react'
import NodeComponent from './nodes/NodeComponent'
import { AppNode } from '@/types/appNode'
import DeleteAbleEdge from './edges/DeleteAbleEdge'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { connect } from 'http2'

const nodeTypes = {
  ScrapeFlowNode: NodeComponent
}

const edgeTypes = { default: DeleteAbleEdge }

const snapGrid: [number, number] = [50, 50]

const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: WorkFlow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition)
      if (!flow) return

      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      if (!flow.viewport) return
      const { x = 0, y = 0, zoom = 1 } = flow.viewport

      setViewport({ x, y, zoom })
    } catch (error) {}
  }, [workflow.definition, setNodes, setEdges, setViewport])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const taskType = e.dataTransfer.getData('application/reactflow')

      if (typeof taskType === undefined || !taskType) return
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      })
      const newNode = CreateFlowNode(taskType as TaskType, position)
      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))

      if (!connection.targetHandle) return
      const node = nodes.find((nd) => nd.id === connection.target)
      if (!node) return

      const nodeInputs = node.data.inputs
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: ''
        }
      })
    },
    [setEdges, updateNodeData, nodes]
  )

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // no self-connection allowed
      if (connection.source === connection.target) {
        return false
      }

      // same taskParam type connection
      const source = nodes.find((node) => node.id === connection.source)
      const target = nodes.find((node) => node.id === connection.target)
      if (!source || !target) {
        console.error('invalid')
        return false
      }

      const sourceTask = TaskRegistry[source.data.type]
      const targetTask = TaskRegistry[target.data.type]
      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle
      )
      const input = targetTask.inputs.find(
        (o) => o.name === connection.targetHandle
      )

      if (input?.type !== output?.type) {
        console.error('error: type mismatch')
        return false
      }

      const hasCycle = (
        node: AppNode,
        visited = new Set<string>()
      ): boolean => {
        if (visited.has(node.id)) return true
        visited.add(node.id)

        const outgoers = getOutgoers(node, nodes, edges)
        for (const outgoer of outgoers) {
          if (outgoer.id === connection.source || hasCycle(outgoer, visited)) {
            return true
          }
        }
        visited.delete(node.id)
        return false
      }

      return !hasCycle(target)
    },
    [nodes, edges]
  )

  return (
    <main className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position='top-left' fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
