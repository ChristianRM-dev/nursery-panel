// web/src/pages/AdminCustomerDetailsPage/AdminCustomerDetailsPage.tsx
import {
  Title,
  Container,
  Card,
  Text,
  Group,
  Badge,
  Button,
  LoadingOverlay,
} from '@mantine/core'
import { IconArrowLeft, IconEdit } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import SaleNoteTable from 'src/components/SaleNote/SaleNoteTable/SaleNoteTable'
import { useGetCustomerById } from 'src/hooks/Customers/useGetCustomerById'

const AdminCustomerDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { customer, loading, error } = useGetCustomerById({ id })

  if (loading) {
    return <LoadingOverlay visible />
  }

  if (error) {
    return <div>Error al cargar el cliente: {error.message}</div>
  }

  if (!customer) {
    return <div>Cliente no encontrado</div>
  }

  return (
    <>
      <Metadata
        title="Detalles del Cliente"
        description="Página de Detalles del Cliente"
      />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminCustomers())}
          >
            Volver
          </Button>

          {/* Edit Button */}
          <Button
            leftSection={<IconEdit size={16} />}
            variant="filled"
            onClick={() =>
              navigate(routes.adminEditCustomer({ id: customer.id }))
            }
          >
            Editar
          </Button>
        </Group>

        {/* Page Title */}
        <Title order={1} mb="xl">
          {customer.name}
        </Title>

        {/* Customer Details */}
        <Card shadow="sm" padding="lg" radius="md" mb="xl" withBorder>
          <Text size="lg" fw={500} mb="md">
            Detalles del Cliente
          </Text>

          <Group mb="sm">
            <Text fw={500}>Teléfono:</Text>
            <Text>{customer.phone}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Email:</Text>
            <Text>{customer.email || 'No proporcionado'}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Notas de Venta:</Text>
            <Badge color="teal" variant="light">
              {customer.saleNotes.length} ventas
            </Badge>
          </Group>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" mb="xl" withBorder>
          <SaleNoteTable customerId={id} />
        </Card>
      </Container>
    </>
  )
}

export default AdminCustomerDetailsPage
