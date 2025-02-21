import { AppNode } from '@/types/appNode'
import {
  WorkFlowExecutionPlan,
  WorkFlowExecutionPlanPhase
} from '@/types/workflows'
import { Edge, getIncomers } from '@xyflow/react'
import { TaskRegistry } from './task/registry'

type FlowToExecutionPlan = {
  executionPlan?: WorkFlowExecutionPlan
}

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlan {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  )

  if (!entryPoint) {
    throw new Error('TODO: HANDLE THIS ERROR')
  }

  const planned = new Set<string>()
  const executionPlan: WorkFlowExecutionPlan = [
    { phase: 1, nodes: [entryPoint] }
  ]

  for (let phase = 2; phase <= planned.size || phase <= nodes.length; phase++) {
    const nextPhase: WorkFlowExecutionPlanPhase = { phase, nodes: [] }
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue
      }
      const invalidInputs = getInvalidInputs(currentNode, edges, planned)
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges)
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.log('invalid')
          throw new Error('TODO')
        } else {
          continue
        }
      }

      nextPhase.nodes.push(currentNode)
      planned.add(currentNode.id)
    }
  }
  return { executionPlan }
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = []
  const inputs = TaskRegistry[node.data.type].inputs

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name]
    const inputValueProvided = inputValue?.length > 0

    if (inputValueProvided) {
      continue
    }

    //if a value is not provided by the user then we need to check
    // if there is an output linked to the current input
    const incomingEdges = edges.filter((edge) => {
      edge.target === node.id
    })

    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    )

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source)

    if (requiredInputProvidedByVisitedOutput) {
      // the inputs is required and we have a valid value for it
      // provided by a task that is already checked
      continue
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue
      }
    }

    invalidInputs.push(input.name)
  }
  return invalidInputs
}
