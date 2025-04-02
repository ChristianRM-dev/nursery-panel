// web/src/pages/AdminSaleNoteReportsPage/AdminSaleNoteReportsPage.tsx
import { useState } from 'react'

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
import { IconCalendar, IconReport, IconPlant, IconX } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Metadata } from '@redwoodjs/web'

import { useGetSaleNotesReport } from 'src/hooks/SaleNotes/useGetSaleNotesReport'

const AdminSaleNoteReportsPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
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
                      <Text fw={500}>{note.folio}</Text>
                      <Group>
                        <Text>{note.customer.name}</Text>
                        <Badge variant="light" color="green">
                          {formatCurrency(note.total)}
                        </Badge>
                        <Text c="dimmed" size="sm">
                          {formatDate(note.createdAt)}
                        </Text>
                      </Group>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Planta</Table.Th>
                          <Table.Th>Categoría</Table.Th>
                          <Table.Th>Cantidad</Table.Th>
                          <Table.Th>Precio unitario</Table.Th>
                          <Table.Th>Total</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {note.saleDetails.map((detail, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>
                              <Group gap="sm">
                                <IconPlant size={14} />
                                {detail.plant.name}
                              </Group>
                            </Table.Td>
                            <Table.Td>{detail.plant.category.name}</Table.Td>
                            <Table.Td>{detail.quantity}</Table.Td>
                            <Table.Td>{formatCurrency(detail.price)}</Table.Td>
                            <Table.Td>{formatCurrency(detail.total)}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
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
