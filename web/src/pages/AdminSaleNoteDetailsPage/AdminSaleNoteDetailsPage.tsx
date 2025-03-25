import {
  Title,
  Container,
  Card,
  Text,
  Group,
  Badge,
  Button,
  Table,
} from '@mantine/core'
import { IconArrowLeft, IconEdit } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useGetSaleNoteById } from 'src/hooks/SaleNotes/useGetSaleNoteById'

const AdminSaleNoteDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { saleNote, loading, error } = useGetSaleNoteById({ id })

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar la nota de venta: {error.message}</div>
  }

  if (!saleNote) {
    return <div>Nota de venta no encontrada</div>
  }

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
            <Text fw={500}>Total:</Text>
            <Text fw={700}>${saleNote.total}</Text>
          </Group>
        </Card>

        {/* Sale Details Table */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Detalles de la Venta
          </Text>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Planta</Table.Th>
                <Table.Th>Precio Unitario</Table.Th>
                <Table.Th>Cantidad</Table.Th>
                <Table.Th>Subtotal</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {saleNote.saleDetails.map((detail, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{detail.plant.name}</Table.Td>
                  <Table.Td>${detail.price}</Table.Td>
                  <Table.Td>{detail.quantity}</Table.Td>
                  <Table.Td>${detail.price * detail.quantity}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Th colSpan={3}>Total</Table.Th>
                <Table.Th>${saleNote.total}</Table.Th>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Card>
      </Container>
    </>
  )
}

export default AdminSaleNoteDetailsPage
