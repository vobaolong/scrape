import { LucideProps } from 'lucide-react'
import { TaskParam, TaskType } from './task'
import { AppNode } from './appNode'

export enum WorkFlowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export type WorkFlowTask = {
  label: string
  icon: React.FC<LucideProps>
  type: TaskType
  isEntryPoint?: boolean
  inputs: TaskParam[]
  outputs: TaskParam[]
  credits: number
}

export type WorkFlowExecutionPlanPhase = {
  phase: number
  nodes: AppNode[]
}

export type WorkFlowExecutionPlan = WorkFlowExecutionPlanPhase[]
