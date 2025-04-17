import React from 'react'

import {
  NumberInput,
  Select,
  Textarea,
  TextInput,
  Button,
  Group,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { PaymentFormValues, paymentFormSchema } from './PaymentForm.schema'

interface PaymentFormProps {
  onSubmit: (values: PaymentFormValues) => void
  loading?: boolean
  defaultValues: PaymentFormValues
  saleNote?: {
    total: number
    paidAmount: number
  }
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  loading = false,
  saleNote,
  defaultValues,
}) => {
  const form = useForm<PaymentFormValues>({
    initialValues: defaultValues,
    validate: (values) => {
      const result = paymentFormSchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  // Calculate remaining amount if saleNote is provided
  const remainingAmount = saleNote
    ? saleNote.total - saleNote.paidAmount
    : undefined

  // Set maximum amount to remaining balance if available
  const maxAmount = remainingAmount !== undefined ? remainingAmount : undefined

  return (
    <Box style={{ position: 'relative' }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <NumberInput
          label="Monto del pago"
          description={
            remainingAmount !== undefined
              ? `Total pendiente: $${remainingAmount.toFixed(2)}`
              : undefined
          }
          withAsterisk
          min={0.01}
          max={maxAmount}
          step={0.01}
          decimalScale={2}
          {...form.getInputProps('amount')}
          disabled={loading}
        />

        <Select
          label="Método de pago"
          withAsterisk
          data={[
            { value: 'CASH', label: 'Efectivo' },
            { value: 'CREDIT_CARD', label: 'Tarjeta de crédito' },
            { value: 'DEBIT_CARD', label: 'Tarjeta de débito' },
            { value: 'BANK_TRANSFER', label: 'Transferencia bancaria' },
            { value: 'DIGITAL_WALLET', label: 'Billetera digital' },
            { value: 'CHECK', label: 'Cheque' },
            { value: 'OTHER', label: 'Otro' },
          ]}
          {...form.getInputProps('method')}
          disabled={loading}
        />

        <TextInput
          label="Referencia (opcional)"
          description="Número de transacción, último 4 dígitos de tarjeta, etc."
          {...form.getInputProps('reference')}
          disabled={loading}
        />

        <Textarea
          label="Notas (opcional)"
          description="Detalles adicionales sobre el pago"
          {...form.getInputProps('notes')}
          disabled={loading}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={loading}>
            Enviar
          </Button>
        </Group>
      </form>
    </Box>
  )
}
