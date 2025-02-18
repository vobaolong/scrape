import { z } from 'zod'

export const createWorkFlowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional()
})

export type createWorkFlowSchemaType = z.infer<typeof createWorkFlowSchema>
