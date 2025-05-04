// web/src/components/SaleNote/SaleNoteForm/SaleNoteForm.schema.ts
import { z } from 'zod'

const saleDetailSchema = z.object({
  plantId: z.string().min(1, { message: 'Seleccione una planta' }),
  name: z.string().min(1, { message: 'Nombre es requerido' }), // Nuevo campo
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

export const saleNoteSchema = z
  .object({
    customerId: z.string().min(1, { message: 'Seleccione un cliente' }),
    nurseryId: z.string().min(1, { message: 'Seleccione un vivero' }),
    saleDetails: z.array(saleDetailSchema).optional().default([]),
    externalPlants: z.array(externalPlantSchema).optional().default([]),
  })
  .refine(
    (data) => data.saleDetails.length > 0 || data.externalPlants.length > 0,
    {
      message:
        'Debe agregar al menos una planta registrada o una planta externa',
      path: ['saleDetails'], // or ["externalPlants"], depending on which field you want to highlight
    }
  )

export type SaleNoteFormValues = z.infer<typeof saleNoteSchema>
