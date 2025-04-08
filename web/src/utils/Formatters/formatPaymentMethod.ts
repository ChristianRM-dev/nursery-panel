import { PaymentMethod } from 'types/graphql'

export const formatPaymentMethod = (paymentMethod: PaymentMethod): string => {
  switch (paymentMethod) {
    case 'CASH':
      return 'Efectivo'
    case 'CREDIT_CARD':
      return 'Tarjeta Crédito'
    case 'DEBIT_CARD':
      return 'Tarjeta Débito'
    case 'BANK_TRANSFER':
      return 'Transferencia'
    case 'DIGITAL_WALLET':
      return 'Billetera Digital'
    case 'CHECK':
      return 'Cheque'
    case 'OTHER':
      return 'Otro'
    default:
      return 'Forma de pago no valida'
  }
}
