// web/src/utils/Mappers/PaymentMappers.ts
import {
  CreatePaymentInput,
  PaymentMethod,
  UpdatePaymentInput,
} from 'types/graphql'

import { PaymentFormValues } from 'src/components/Payment/PaymentForm/PaymentForm.schema'

/**
 * Maps `PaymentFormValues` to the `CreatePaymentInput` expected by the mutation.
 * @param values - Form values from PaymentForm
 * @param saleNoteId - ID of the sale note this payment belongs to
 * @returns CreatePaymentInput for the mutation
 */
export const mapPaymentFormValuesToCreatePaymentInput = (
  values: PaymentFormValues,
  saleNoteId: string
): CreatePaymentInput => ({
  saleNoteId,
  amount: values.amount,
  method: values.method as PaymentMethod,
  reference: values.reference || undefined, // Convert empty string to undefined
  notes: values.notes || undefined, // Convert empty string to undefined
})

/**
 * Maps `PaymentFormValues` to the `UpdatePaymentInput` expected by the mutation.
 * @param values - Form values from PaymentForm
 * @returns UpdatePaymentInput for the mutation
 */
export const mapPaymentFormValuesToUpdatePaymentInput = (
  values: PaymentFormValues
): UpdatePaymentInput => ({
  amount: values.amount,
  method: values.method as PaymentMethod,
  reference: values.reference || undefined, // Convert empty string to undefined
  notes: values.notes || undefined, // Convert empty string to undefined
})
