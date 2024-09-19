import { z } from 'zod'

export const IdSchema = z.object({
  id: z.string().min(1),
})

export type Id = z.infer<typeof IdSchema>
