import { memo } from 'react'
import { NodeProps } from '@xyflow/react'
import NodeCard from './NodeCard'

const NodeComponent = memo((props: NodeProps) => {
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      AppNode
    </NodeCard>
  )
})

export default NodeComponent
NodeComponent.displayName = 'Node Component'
