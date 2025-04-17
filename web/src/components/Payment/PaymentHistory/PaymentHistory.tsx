// web/src/components/Payment/PaymentHistory/PaymentHistory.tsx
import {
  Card,
  Text,
  Group,
  Button,
  Table,
  NumberFormatter,
  Tooltip,
  ActionIcon,
} from '@mantine/core'
import {
  IconPlus,
  IconEdit,
  IconCash,
  IconCreditCard,
  IconReceipt,
} from '@tabler/icons-react'
import { PaymentMethod } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { formatPaymentMethod } from 'src/utils/Formatters'

interface Payment {
  id: string
  createdAt: string
  method: string
  amount: number
  reference?: string
  notes?: string
}

interface PaymentHistoryProps {
  payments: Payment[]
  loadingPayments: boolean
  saleNoteId: string
  paidAmount: number
  status: string
}

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'CASH':
      return <IconCash size={16} />
    case 'CREDIT_CARD':
    case 'DEBIT_CARD':
      return <IconCreditCard size={16} />
    default:
      return <IconReceipt size={16} />
  }
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  payments,
  loadingPayments,
  saleNoteId,
  paidAmount,
  status,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={500}>
          Historial de Pagos
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          disabled={status == 'PAID'}
          size="sm"
          onClick={() =>
            navigate(routes.adminAddPaymentToSaleNote({ id: saleNoteId }))
          }
        >
          Nuevo Pago
        </Button>
      </Group>

      {loadingPayments ? (
        <Text>Cargando pagos...</Text>
      ) : payments?.length > 0 ? (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Fecha</Table.Th>
              <Table.Th>Método</Table.Th>
              <Table.Th>Monto</Table.Th>
              <Table.Th>Referencia</Table.Th>
              <Table.Th>Notas</Table.Th>
              <Table.Th>Opciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments.map((payment) => (
              <Table.Tr key={payment.id}>
                <Table.Td>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {getPaymentMethodIcon(payment.method)}
                    <Text>
                      {formatPaymentMethod(payment.method as PaymentMethod)}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <NumberFormatter
                    prefix="$"
                    value={payment.amount}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Table.Td>
                <Table.Td>{payment.reference || '-'}</Table.Td>
                <Table.Td>{payment.notes || '-'}</Table.Td>
                <Table.Td>
                  <Tooltip label={'Editar Pago'}>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => {
                        navigate(
                          routes.adminEditSaleNotePayment({
                            id: payment.id,
                          })
                        )
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Tooltip>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
          <Table.Tfoot>
            <Table.Tr>
              <Table.Th colSpan={2}>Total Pagado</Table.Th>
              <Table.Th>
                <NumberFormatter
                  prefix="$"
                  value={paidAmount}
                  thousandSeparator
                  decimalScale={2}
                />
              </Table.Th>
              <Table.Th colSpan={2}></Table.Th>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      ) : (
        <Text>No hay pagos registrados</Text>
      )}
    </Card>
  )
}
