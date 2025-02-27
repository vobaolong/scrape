import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React from 'react'
import NodeParamField from './NodeParamField'
import { ColorForHandle } from './common'
import useFlowValidation from '@/components/hooks/useFlowValidation'

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-2 divide-y'>{children}</div>
}

export function NodeInput({
  input,
  nodeId
}: {
  input: TaskParam
  nodeId: string
}) {
  const { invalidInputs } = useFlowValidation()
  const edges = useEdges()
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  )

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInputs) => invalidInputs === input.name)

  return (
    <div
      className={cn(
        'relative flex justify-start w-full p-3 bg-secondary',
        hasErrors && 'bg-destructive/30'
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
            ColorForHandle[input.type]
          )}
          type='target'
          position={Position.Left}
          id={input.name}
          isConnectable={!isConnected}
        />
      )}
    </div>
  )
}
