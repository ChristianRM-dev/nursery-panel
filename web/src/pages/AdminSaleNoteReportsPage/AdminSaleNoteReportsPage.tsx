// web/src/pages/AdminSaleNoteReportsPage/AdminSaleNoteReportsPage.tsx
import { useMemo, useState } from 'react'
import { useRef } from 'react'

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
  NumberFormatter,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  IconCalendar,
  IconReport,
  IconPlant,
  IconX,
  IconLeaf,
} from '@tabler/icons-react'
import { IconCopy } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import html2canvas from 'html2canvas'
import { PresentationType } from 'types/graphql'

import { Metadata } from '@redwoodjs/web'

import { useGetSaleNotesReport } from 'src/hooks/SaleNotes/useGetSaleNotesReport'
import { useNotifications } from 'src/hooks/useNotifications'
import { formatPlantPresentationType } from 'src/utils/Formatters'

const AdminSaleNoteReportsPage: React.FC = () => {
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const reportRef = useRef<HTMLDivElement>(null)
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

  const handleCopyAsImage = async () => {
    if (!reportRef.current || !reportData || reportData.length === 0) return
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: 'tomato',
        logging: false,
        useCORS: true,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) return

        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ])
          showSuccessNotification(
            'Reporte copiado como imagen. Puedes pegarlo en WhatsApp.'
          )
        } catch (err) {
          console.error('Error al copiar:', err)
          // Alternativa: Descargar la imagen
          const link = document.createElement('a')
          link.download = `reporte-ventas-${new Date().toISOString()}.png`
          link.href = canvas.toDataURL('image/png')
          link.click()
          showErrorNotification(
            'No se pudo copiar al portapapeles, pero se descargó la imagen'
          )
        }
      })
    } catch (error) {
      console.error('Error al generar imagen:', error)
    }
  }

  const formatDateRangeText = (startDate: Date, endDate: Date): string => {
    return startDate && endDate
      ? `Del ${format(startDate, 'd MMMM yyyy', { locale: es })} al ${format(endDate, 'd MMMM yyyy', { locale: es })}`
      : 'Reporte sin rango de fechas'
  }

  return (
    <>
      <Metadata
        title="Reporte de Notas de Venta"
        description="Página de reportes de notas de venta"
      />
      {/* Contenedor oculto para la captura */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        {reportData?.length > 0 && (
          <div
            ref={reportRef}
            style={{
              padding: '24px',
              backgroundColor: 'white',
              fontFamily: 'Arial, sans-serif',
              width: '794px', // Tamaño A4
              color: '#333', // Color de texto más oscuro
              lineHeight: '1.5',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '10px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th colSpan={7}>{formatDateRangeText(startDate, endDate)}</th>
                </tr>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Folio
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Fecha
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Cliente
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Planta
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Cantidad
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Precio
                  </th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((note, noteIndex) => (
                  <>
                    {note.plantDetails.map((plant, plantIndex) => (
                      <tr key={`${noteIndex}-${plantIndex}`}>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {plantIndex === 0 ? note.folio : ''}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {plantIndex === 0 ? formatDate(note.createdAt) : ''}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {plantIndex === 0 ? note.customer.name : ''}
                        </td>
                        <td
                          style={{ padding: '8px', border: '1px solid #ddd' }}
                        >
                          {plant.name} (
                          {formatPlantPresentationType(
                            plant.presentationType as PresentationType
                          )}
                          )
                        </td>
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            textAlign: 'right',
                          }}
                        >
                          {plant.quantity}
                        </td>
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            textAlign: 'right',
                          }}
                        >
                          <NumberFormatter
                            prefix="$ "
                            value={plant.price}
                            thousandSeparator
                          />
                        </td>
                        <td
                          style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            textAlign: 'right',
                          }}
                        >
                          <NumberFormatter
                            prefix="$ "
                            value={plant.total}
                            thousandSeparator
                          />
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <td
                        colSpan={6}
                        style={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'right',
                          fontWeight: 'bold',
                        }}
                      >
                        Total nota:
                      </td>
                      <td
                        style={{
                          padding: '8px',
                          border: '1px solid #ddd',
                          textAlign: 'right',
                          fontWeight: 'bold',
                        }}
                      >
                        <NumberFormatter
                          prefix="$ "
                          value={note.total}
                          thousandSeparator
                        />
                      </td>
                    </tr>
                    {noteIndex < reportData.length - 1 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '10px 0' }}>
                          <div
                            style={{
                              borderBottom: '2px dashed #ddd',
                              margin: '10px 0',
                            }}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

            <div
              style={{
                marginTop: '20px',
                textAlign: 'right',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Total general:{' '}
              <NumberFormatter
                prefix="$ "
                value={reportData.reduce((sum, note) => sum + note.total, 0)}
                thousandSeparator
              />
            </div>
          </div>
        )}
      </div>

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
            {reportData?.length > 0 && (
              <Button
                onClick={handleCopyAsImage}
                leftSection={<IconCopy size={16} />}
                variant="outline"
              >
                Copiar como imagen
              </Button>
            )}
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
                          Total:{' '}
                          <NumberFormatter
                            prefix="$ "
                            value={note.total}
                            thousandSeparator
                          />
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
                            <Table.Td>
                              {' '}
                              <NumberFormatter
                                prefix="$ "
                                value={plant.price}
                                thousandSeparator
                              />
                            </Table.Td>
                            <Table.Td>
                              {' '}
                              <NumberFormatter
                                prefix="$ "
                                value={plant.total}
                                thousandSeparator
                              />
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                      <Table.Tfoot>
                        <Table.Tr>
                          <Table.Th colSpan={6}>Total general</Table.Th>
                          <Table.Th>
                            <NumberFormatter
                              prefix="$ "
                              value={note.total}
                              thousandSeparator
                            />
                          </Table.Th>
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
