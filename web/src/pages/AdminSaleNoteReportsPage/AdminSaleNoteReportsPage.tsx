// web/src/pages/AdminSaleNoteReportsPage/AdminSaleNoteReportsPage.tsx
import { useMemo, useState } from 'react'

import {
  Card,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Table,
  LoadingOverlay,
  Accordion,
  Badge,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  IconCalendar,
  IconReport,
  IconPlant,
  IconX,
  IconLeaf,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { PresentationType } from 'types/graphql'

import { Metadata } from '@redwoodjs/web'

import { useGetSaleNotesReport } from 'src/hooks/SaleNotes/useGetSaleNotesReport'
import { formatPlantPresentationType } from 'src/utils/Formatters'

const AdminSaleNoteReportsPage: React.FC = () => {
  const defaultStartDate = useMemo(() => {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - 1)
    return currentDate
  }, [])
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate)
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const { reportData, loading, refetch } = useGetSaleNotesReport({
    startDate: startDate?.toISOString() || '',
    endDate: endDate?.toISOString() || '',
  })

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      refetch()
    }
  }

  const handleClearDates = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP', { locale: es })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount)
  }

  return (
    <>
      <Metadata
        title="Reporte de Notas de Venta"
        description="Página de reportes de notas de venta"
      />

      <Card withBorder shadow="sm" radius="md">
        <Title order={2} mb="md">
          Reporte de Notas de Venta
        </Title>

        <Text mb="xl">
          Seleccione un rango de fechas para generar el reporte de notas de
          venta.
        </Text>

        <Stack mb="xl">
          <Group grow>
            <DatePickerInput
              label="Fecha de inicio"
              value={startDate}
              onChange={setStartDate}
              locale="es"
              firstDayOfWeek={0}
              weekendDays={[0]}
              leftSection={<IconCalendar size={16} />}
              maxDate={endDate || new Date()}
              clearable
            />
            <DatePickerInput
              label="Fecha de fin"
              value={endDate}
              onChange={setEndDate}
              locale="es"
              firstDayOfWeek={0}
              weekendDays={[0]}
              leftSection={<IconCalendar size={16} />}
              minDate={startDate}
              maxDate={new Date()}
              clearable
            />
          </Group>

          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={handleClearDates}
              leftSection={<IconX size={16} />}
              disabled={!startDate && !endDate}
            >
              Limpiar
            </Button>
            <Button
              onClick={handleGenerateReport}
              leftSection={<IconReport size={16} />}
              disabled={!startDate || !endDate}
            >
              Generar Reporte
            </Button>
          </Group>
        </Stack>

        <div style={{ position: 'relative' }}>
          <LoadingOverlay
            visible={loading}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />

          {reportData?.length > 0 ? (
            <Accordion variant="separated">
              {reportData.map((note) => (
                <Accordion.Item key={note.folio} value={note.folio}>
                  <Accordion.Control>
                    <Group justify="space-between">
                      <Group>
                        <Text fw={500}>{note.folio}</Text>
                        <Text>{note.customer.name}</Text>
                      </Group>
                      <Group>
                        <Badge variant="light" color="green">
                          Total: {formatCurrency(note.total)}
                        </Badge>
                        <Text c="dimmed" size="sm">
                          {formatDate(note.createdAt)}
                        </Text>
                      </Group>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Table striped highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Tipo</Table.Th>
                          <Table.Th>Nombre</Table.Th>
                          <Table.Th>Categoría</Table.Th>
                          <Table.Th>Presentación</Table.Th>
                          <Table.Th>Cantidad</Table.Th>
                          <Table.Th>Precio unitario</Table.Th>
                          <Table.Th>Total</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {note.plantDetails.map((plant, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>
                              {plant.isExternal ? (
                                <Badge color="blue" variant="light">
                                  Externa
                                </Badge>
                              ) : (
                                <Badge color="green" variant="light">
                                  Registrada
                                </Badge>
                              )}
                            </Table.Td>
                            <Table.Td>
                              <Group gap="sm">
                                {plant.isExternal ? (
                                  <IconLeaf size={14} />
                                ) : (
                                  <IconPlant size={14} />
                                )}
                                {plant.name}
                              </Group>
                            </Table.Td>
                            <Table.Td>{plant.category}</Table.Td>
                            <Table.Td>
                              {formatPlantPresentationType(
                                plant.presentationType as PresentationType
                              )}
                            </Table.Td>
                            <Table.Td>{plant.quantity}</Table.Td>
                            <Table.Td>{formatCurrency(plant.price)}</Table.Td>
                            <Table.Td>{formatCurrency(plant.total)}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                      <Table.Tfoot>
                        <Table.Tr>
                          <Table.Th colSpan={6}>Total general</Table.Th>
                          <Table.Th>{formatCurrency(note.total)}</Table.Th>
                        </Table.Tr>
                      </Table.Tfoot>
                    </Table>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            !loading && (
              <Text ta="center" c="dimmed" py="xl">
                No hay notas de venta en el rango de fechas seleccionado
              </Text>
            )
          )}
        </div>
      </Card>
    </>
  )
}

export default AdminSaleNoteReportsPage
