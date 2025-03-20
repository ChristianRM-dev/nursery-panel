// web/src/components/Plant/PlantForm/PlantForm.schema.ts
import { z } from 'zod'

// Schema for existing photos
const existingPhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
})

// Schema for new photos (File objects)
const newPhotoSchema = z.instanceof(File)

// Union schema for photos
const photoSchema = z.union([existingPhotoSchema, newPhotoSchema])

export const plantSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(1, { message: 'Price must be a positive number' }),
  stock: z.number().min(1, { message: 'Stock must be a positive number' }),
  categoryId: z.string().min(1, { message: 'Select a Category' }),
  presentationType: z
    .string()
    .min(1, { message: 'Select a Presentation type' }),
  presentationDetails: z
    .string()
    .min(1, { message: 'Presentation details are required' }),
  photos: z
    .array(photoSchema)
    .min(1, { message: 'At least one photo is required' }), // Updated validation for photos
})

export type PlantFormValues = z.infer<typeof plantSchema>
