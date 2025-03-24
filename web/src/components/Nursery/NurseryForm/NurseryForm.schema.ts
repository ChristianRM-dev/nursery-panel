// web/src/components/Nursery/NurseryForm/NurseryForm.schema.ts
import { z } from 'zod'

// Schema for existing logo
const existingLogoSchema = z.object({
  url: z.string(),
})

// Schema for new logo (File object)
const newLogoSchema = z.instanceof(File)

// Union schema for logo
const logoSchema = z.union([existingLogoSchema, newLogoSchema])

export const nurserySchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  address: z.string().min(1, { message: 'La dirección es requerida' }),
  phone: z.string().min(1, { message: 'El teléfono es requerido' }),
  rfc: z.string().min(1, { message: 'El RFC es requerido' }),
  logo: logoSchema.optional(), // Optional logo field
})

export type NurseryFormValues = z.infer<typeof nurserySchema>
