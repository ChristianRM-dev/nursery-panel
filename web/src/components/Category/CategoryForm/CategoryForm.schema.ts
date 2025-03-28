// web/src/components/Category/CategoryForm/CategoryForm.schema.ts
import { z } from 'zod'

// Schema for existing image
const existingImageSchema = z.object({
  url: z.string(),
})

// Schema for new image (File object)
const newImageSchema = z.instanceof(File)

// Union schema for image
const imageSchema = z.union([existingImageSchema, newImageSchema])

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  description: z.string().optional(),
  image: imageSchema, // Required image field (not optional like in Nursery)
})

export type CategoryFormValues = z.infer<typeof categorySchema>
