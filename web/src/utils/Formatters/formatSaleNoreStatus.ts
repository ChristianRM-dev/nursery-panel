import { SaleStatus } from 'types/graphql'

export const formatSaleNoreStatus = (status: SaleStatus): string => {
  switch (status) {
    case 'CANCELLED':
      return 'CANCELADA'
    case 'PAID':
      return 'PAGADA'
    case 'PARTIALLY_PAID':
      return 'PAGO PARCIAL'
    case 'PENDING':
      return 'PENDIENTE'
    default:
      return 'estado no valido'
  }
}
