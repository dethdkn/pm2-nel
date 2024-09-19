import { z } from 'zod'

export const AuthSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export type Auth = z.infer<typeof AuthSchema>
