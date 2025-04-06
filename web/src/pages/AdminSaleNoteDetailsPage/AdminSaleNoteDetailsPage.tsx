import {
  Title,
  Container,
  Card,
  Text,
  Group,
  Badge,
  Button,
  Table,
  NumberFormatter,
} from '@mantine/core'
import {
  IconArrowLeft,
  IconEdit,
  IconPlant,
  IconLeaf,
} from '@tabler/icons-react'

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
            <NumberFormatter
              prefix="$"
              value={saleNote.total}
              thousandSeparator
              decimalScale={2}
            />
          </Group>
        </Card>

        {/* Plant Details Table */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Plantas Vendidas
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
              {plantDetails.map((plant, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Group gap="sm">
                      {plant.isExternal ? (
                        <IconLeaf size={14} />
                      ) : (
                        <IconPlant size={14} />
                      )}
                      {plant.name}
                      {plant.isExternal && (
                        <Badge size="xs" color="blue" variant="light">
                          Externa
                        </Badge>
                      )}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      prefix="$"
                      value={plant.price}
                      thousandSeparator
                      decimalScale={2}
                    />
                  </Table.Td>
                  <Table.Td>{plant.quantity}</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      prefix="$"
                      value={plant.total}
                      thousandSeparator
                      decimalScale={2}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Th colSpan={3}>Total</Table.Th>
                <Table.Th>
                  <NumberFormatter
                    prefix="$"
                    value={saleNote.total}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Table.Th>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Card>
      </Container>
    </>
  )
}

export default AdminSaleNoteDetailsPage
