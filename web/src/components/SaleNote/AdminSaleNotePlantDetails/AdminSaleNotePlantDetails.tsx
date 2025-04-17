// web/src/components/SaleNote/AdminSaleNotePlantDetails/AdminSaleNotePlantDetails.tsx
import { Card, Text, Table, NumberFormatter, Group, Badge } from '@mantine/core'
import { IconPlant, IconLeaf } from '@tabler/icons-react'

interface PlantDetail {
  name: string
  price: number
  quantity: number
  total: number
  isExternal: boolean
}

interface AdminSaleNotePlantDetailsProps {
  plantDetails: PlantDetail[]
  total: number
}

export const AdminSaleNotePlantDetails: React.FC<
  AdminSaleNotePlantDetailsProps
> = ({ plantDetails, total }) => {
  return (
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
                value={total}
                thousandSeparator
                decimalScale={2}
              />
            </Table.Th>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </Card>
  )
}
