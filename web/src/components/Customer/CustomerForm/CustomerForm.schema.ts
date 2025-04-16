// web/src/components/Customer/CustomerForm/CustomerForm.schema.ts
import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .optional()
    .or(z.literal('')), // Allow empty string
  address: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>
