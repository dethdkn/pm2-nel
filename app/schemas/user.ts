import { z } from 'zod'

// eslint-disable-next-line func-style
const validatePass = (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+[\]{}|\\,./<>?]).{8,}$/.test(v)

export const PasswordSchema = z.object({
  password: z.string().refine(validatePass),
  confirmPassword: z.string().refine(validatePass),
}).refine(v => v.password === v.confirmPassword)

export type Password = z.infer<typeof PasswordSchema>

export const UserSchema = z.object({
  name: z.string().min(1).trim().transform(v => v.replaceAll(/[^\w.-]/g, '')),
  password: z.string().refine(validatePass),
  level: z.enum(['admin', 'user']),
})

export type Users = z.infer<typeof UserSchema>

export const UpdateUserSchema = UserSchema.extend({
  id: z.number().min(1),
  password: z.string().optional().refine(v => v === undefined || v === '' || validatePass(v)),
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>

export const SearchUserSchema = z.object({
  page: z.number().int().positive(),
  search: z.string().optional(),
  sort: z.object({ column: z.string(), direction: z.enum(['asc', 'desc']) }),
})

export type SearchUser = z.infer<typeof SearchUserSchema>
