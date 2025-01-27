import { z } from 'zod'

export const AppSchema = z.object({
  name: z.string().min(1),
})

export type App = z.infer<typeof AppSchema>
