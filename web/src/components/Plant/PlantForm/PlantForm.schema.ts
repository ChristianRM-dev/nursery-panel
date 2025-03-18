// web/src/components/Plant/PlantForm/PlantForm.schema.ts
import { z } from 'zod'

export const plantSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(1, { message: 'Price must be a positive number' }),
  stock: z.number().min(1, { message: 'Stock must be a positive number' }),
  category: z.string().min(1, { message: 'Select a Category' }),
  presentation: z.string().min(1, { message: 'Select a Presentation type' }),
  presentationDetails: z
    .string()
    .min(1, { message: 'Presentation details are required' }),
  photos: z
    .array(z.instanceof(File))
    .min(1, { message: 'At least one photo is required' }), // Validation for photos
})

export type PlantFormValues = z.infer<typeof plantSchema>
