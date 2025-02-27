import { useContext } from 'react'
import { FlowValidationContext } from '../context/FlowValidationContextType'

export default function useFlowValidation() {
  const context = useContext(FlowValidationContext)
  if (!context) {
    throw new Error('useFlowValidation: Flow validation context')
  }
  return context
}
