// web/src/components/Category/CategoryForm/CategoryForm.schema.ts
import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(), // Description is optional
})

export type CategoryFormValues = z.infer<typeof categorySchema>
