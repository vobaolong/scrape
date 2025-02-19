'use client'

import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
function NodeCard({
  children,
  nodeId,
  isSelected
}: {
  children: ReactNode
  nodeId: string
  isSelected: boolean
}) {
  const { getNode, setCenter } = useReactFlow()
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId)
        if (!node) return
        const { position, measured } = node
        if (!position || !measured) return

        const { width, height } = measured
        const x = position.x
        const y = position.y
        if (!x || !y) return
        setCenter(x, y, {
          zoom: 1,
          duration: 500
        })
      }}
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1',
        isSelected && 'border-primary'
      )}
    >
      {children}
    </div>
  )
}

export default NodeCard
