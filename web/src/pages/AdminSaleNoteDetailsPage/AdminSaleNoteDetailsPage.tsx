// web/src/pages/AdminSaleNoteDetailsPage/AdminSaleNoteDetailsPage.tsx
import {
  Title,
  Container,
  Card,
  Text,
  Group,
  Badge,
  Button,
  NumberFormatter,
  LoadingOverlay,
} from '@mantine/core'
import { IconArrowLeft, IconEdit, IconPlus } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { PaymentHistory } from 'src/components/Payment/PaymentHistory/PaymentHistory'
import { AdminSaleNotePlantDetails } from 'src/components/SaleNote/AdminSaleNotePlantDetails/AdminSaleNotePlantDetails'
import { useGetPaymentsBySaleNoteId } from 'src/hooks/Payments/useGetPaymentsBySaleNoteId'
import { useGetSaleNoteById } from 'src/hooks/SaleNotes/useGetSaleNoteById'
import { formatSaleNoreStatus } from 'src/utils/Formatters'

const AdminSaleNoteDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { saleNote, loading, error } = useGetSaleNoteById({ id })
  const { payments, loading: loadingPayments } = useGetPaymentsBySaleNoteId({
    saleNoteId: id,
  })

  if (loading) {
    return <LoadingOverlay visible />
  }

  if (error) {
    return <div>Error al cargar la nota de venta: {error.message}</div>
  }

  if (!saleNote) {
    return <div>Nota de venta no encontrada</div>
  }

  // Combine registered and external plants with only essential fields
  const plantDetails = [
    ...(saleNote.saleDetails?.map((detail) => ({
      name: detail.plant.name,
      price: detail.price,
      quantity: detail.quantity,
      total: detail.price * detail.quantity,
      isExternal: false,
    })) || []),
    ...((
      saleNote.externalPlants as Array<{
        name: string
        price: number
        quantity: number
      }>
    )?.map((plant) => ({
      name: plant.name,
      price: plant.price,
      quantity: plant.quantity,
      total: plant.price * plant.quantity,
      isExternal: true,
    })) || []),
  ]

  return (
    <>
      <Metadata
        title="Detalles de la Nota de Venta"
        description="Página de Detalles de la Nota de Venta"
      />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminSaleNotes())}
          >
            Volver
          </Button>

          <Group>
            <Button
              leftSection={<IconPlus size={16} />}
              variant="light"
              disabled={saleNote.status == 'PAID'}
              onClick={() =>
                navigate(routes.adminAddPaymentToSaleNote({ id: saleNote.id }))
              }
            >
              Agregar Pago
            </Button>
            <Button
              leftSection={<IconEdit size={16} />}
              variant="filled"
              onClick={() =>
                navigate(routes.adminEditSaleNote({ id: saleNote.id }))
              }
            >
              Editar
            </Button>
          </Group>
        </Group>

        {/* Page Title */}
        <Title order={1} mb="xl">
          Nota de Venta #{saleNote.folio}
        </Title>

        {/* Sale Note Details */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Información General
          </Text>

          <Group mb="sm">
            <Text fw={500}>Cliente:</Text>
            <Badge color="teal" variant="light">
              {saleNote.customer.name}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Vivero:</Text>
            <Badge color="blue" variant="light">
              {saleNote.nursery.name}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Fecha:</Text>
            <Text>{new Date(saleNote.createdAt).toLocaleDateString()}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Estado:</Text>
            <Badge
              color={
                saleNote.status === 'PAID'
                  ? 'green'
                  : saleNote.status === 'PARTIALLY_PAID'
                    ? 'yellow'
                    : 'red'
              }
            >
              {formatSaleNoreStatus(saleNote.status)}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Total:</Text>
            <NumberFormatter
              prefix="$"
              value={saleNote.total}
              thousandSeparator
              decimalScale={2}
            />
          </Group>

          <Group mb="sm">
            <Text fw={500}>Pagado:</Text>
            <NumberFormatter
              prefix="$"
              value={saleNote.paidAmount}
              thousandSeparator
              decimalScale={2}
            />
          </Group>

          <Group mb="sm">
            <Text fw={500}>Pendiente:</Text>
            <NumberFormatter
              prefix="$"
              value={saleNote.total - saleNote.paidAmount}
              thousandSeparator
              decimalScale={2}
            />
          </Group>
        </Card>

        {/* Payment History */}

        <PaymentHistory
          payments={payments}
          loadingPayments={loadingPayments}
          saleNoteId={saleNote.id}
          paidAmount={saleNote.paidAmount}
          status={saleNote.status}
        />

        {/* Plant Details Table */}
        <AdminSaleNotePlantDetails
          plantDetails={plantDetails}
          total={saleNote.total}
        />
      </Container>
    </>
  )
}

export default AdminSaleNoteDetailsPage
