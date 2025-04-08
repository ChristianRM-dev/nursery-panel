import { z } from 'zod'

export const paymentFormSchema = z.object({
  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número',
    })
    .positive('El monto debe ser positivo')
    .min(0.01, 'El monto mínimo es 0.01'),
  method: z
    .string({
      required_error: 'Seleccione un método de pago',
    })
    .min(1, 'Seleccione un método de pago'),
  reference: z
    .string()
    .max(50, 'La referencia no puede exceder 50 caracteres')
    .optional(),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional(),
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>
