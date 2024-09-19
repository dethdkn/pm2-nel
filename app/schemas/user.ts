import { z } from 'zod'

const zodPass = z.string().refine(v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+[\]{}|\\,./<>?]).{8,}$/.test(v))

export const PasswordSchema = z.object({
  password: zodPass,
  confirmPassword: zodPass,
}).refine(v => v.password === v.confirmPassword)

export type Password = z.infer<typeof PasswordSchema>

export const UserSchema = z.object({
  name: z.string().min(1),
  password: zodPass,
  level: z.enum(['admin', 'user']),
})

export type Users = z.infer<typeof UserSchema>

export const UpdateUserSchema = UserSchema.extend({
  id: z.string().min(1),
  password: zodPass.optional(),
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>
