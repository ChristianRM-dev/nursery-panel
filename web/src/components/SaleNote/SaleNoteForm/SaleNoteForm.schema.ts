// web/src/components/SaleNote/SaleNoteForm/SaleNoteForm.schema.ts
import { z } from 'zod'

const saleDetailSchema = z.object({
  plantId: z.string().min(1, { message: 'Seleccione una planta' }),
  price: z.number().min(0.01, { message: 'El precio debe ser positivo' }),
  quantity: z.number().min(1, { message: 'La cantidad debe ser al menos 1' }),
})

const externalPlantSchema = z.object({
  name: z.string().min(1, { message: 'Nombre es requerido' }),
  price: z.number().min(0.01, { message: 'El precio debe ser positivo' }),
  quantity: z.number().min(1, { message: 'La cantidad debe ser al menos 1' }),
  presentationType: z.string().optional(),
  presentationDetails: z.string().optional(),
})

export const saleNoteSchema = z.object({
  customerId: z.string().min(1, { message: 'Seleccione un cliente' }),
  nurseryId: z.string().min(1, { message: 'Seleccione un vivero' }),
  saleDetails: z
    .array(saleDetailSchema)
    .min(1, { message: 'Agregue al menos una planta' }),
  externalPlants: z.array(externalPlantSchema).default([]), // Add this line
})

export type SaleNoteFormValues = z.infer<typeof saleNoteSchema>
