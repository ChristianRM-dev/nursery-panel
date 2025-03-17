// web/src/components/Plant/PlantForm/PlantForm.schems.ts
import { z } from 'zod';

export const plantSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  stock: z.number().min(0, { message: 'Stock must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  presentationDetails: z.string().min(1, { message: 'Presentation details are required' }),
  photos: z.array(z.instanceof(File)).min(1, { message: 'At least one photo is required' }),
});

export type PlantFormValues = z.infer<typeof plantSchema>;