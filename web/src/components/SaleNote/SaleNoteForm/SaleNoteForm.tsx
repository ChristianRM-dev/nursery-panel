// web/src/components/SaleNote/SaleNoteForm/SaleNoteForm.tsx
import React, { useEffect, useState } from 'react'

import {
  Button,
  Group,
  Box,
  Select,
  Text,
  Tabs,
  Stack,
  Divider,
  Alert,
  Table,
  ActionIcon,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconAlertCircle,
  IconPlant,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'

import AddPlantModal from 'src/components/Plant/AddPlantModal/AddPlantModal'
import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useFilterCustomers } from 'src/hooks/Customers/useFilterCustomers'
import { useFilterNurseries } from 'src/hooks/Nurseries/useFilterNurseries'

import { SaleNoteFormValues, saleNoteSchema } from './SaleNoteForm.schema'
import { SaleNoteFormPlantModal } from './SaleNoteFormPlantModal'

interface SaleNoteFormProps {
  onSubmit: (values: SaleNoteFormValues) => void
  loading: boolean
  defaultValues?: Partial<SaleNoteFormValues>
}

export const SaleNoteForm: React.FC<SaleNoteFormProps> = ({
  onSubmit,
  loading,
  defaultValues = {},
}) => {
  const [addPlantModalOpened, setAddPlantModalOpened] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)
  const [activePlantTab, setActivePlantTab] = useState<
    'registered' | 'external'
  >('registered')

  // Customer filter
  const {
    filteredCustomers,
    loading: loadingCustomers,
    handleFilter: handleFilterCustomers,
  } = useFilterCustomers({ initialQuery: '' })

  // Nursery filter
  const {
    filteredNurseries,
    loading: loadingNurseries,
    handleFilter: handleFilterNurseries,
  } = useFilterNurseries({ initialQuery: '' })

  const form = useForm<SaleNoteFormValues>({
    initialValues: {
      customerId: defaultValues.customerId || '',
      nurseryId: defaultValues.nurseryId || '',
      saleDetails: defaultValues.saleDetails || [],
      externalPlants: defaultValues.externalPlants || [],
    },
    validate: (values) => {
      const result = saleNoteSchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  const [customers, setCustomers] = useState<
    { value: string; label: string }[]
  >([])
  const [nurseries, setNurseries] = useState<
    { value: string; label: string }[]
  >([])

  useEffect(() => {
    setCustomers(filteredCustomers.map((c) => ({ value: c.id, label: c.name })))
  }, [filteredCustomers])

  useEffect(() => {
    setNurseries(filteredNurseries.map((n) => ({ value: n.id, label: n.name })))
  }, [filteredNurseries])

  const handleAddRegisteredPlant = (plant: {
    plantId: string
    name: string // Nuevo campo
    price: number
    quantity: number
  }) => {
    form.insertListItem('saleDetails', plant)
  }

  const handleAddExternalPlant = (plant: {
    name: string
    price: number
    quantity: number
    presentationType: string
    presentationDetails: string
  }) => {
    form.insertListItem('externalPlants', plant)
  }

  const handleRemoveRegisteredPlant = (index: number) => {
    form.removeListItem('saleDetails', index)
  }

  const handleRemoveExternalPlant = (index: number) => {
    form.removeListItem('externalPlants', index)
  }

  const hasPlants =
    form.values.saleDetails.length > 0 || form.values.externalPlants.length > 0

  const openModal = (tab: 'registered' | 'external') => {
    setActivePlantTab(tab)
    setModalOpened(true)
  }

  return (
    <>
      <AddPlantModal
        opened={addPlantModalOpened}
        onClose={() => setAddPlantModalOpened(false)}
      />
      <Box style={{ position: 'relative' }}>
        {loading && <FormOverlay />}

        <SaleNoteFormPlantModal
          opened={modalOpened}
          tab={activePlantTab}
          registeredPlantsAdded={form.values.saleDetails.map((x) => x.plantId)}
          onClose={() => setModalOpened(false)}
          onAddRegisteredPlant={handleAddRegisteredPlant}
          onAddExternalPlant={handleAddExternalPlant}
        />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap="md">
            {/* Customer and Nursery Selection */}
            <Select
              label="Cliente"
              placeholder="Seleccione un cliente"
              {...form.getInputProps('customerId')}
              data={customers}
              searchable
              clearable
              onSearchChange={handleFilterCustomers}
              nothingFoundMessage="No se encontraron clientes"
              disabled={loading || loadingCustomers}
              required
            />

            <Select
              label="Vivero"
              placeholder="Seleccione un vivero"
              {...form.getInputProps('nurseryId')}
              data={nurseries}
              searchable
              clearable
              onSearchChange={handleFilterNurseries}
              nothingFoundMessage="No se encontraron viveros"
              disabled={loading || loadingNurseries}
              required
            />

            <Divider my="sm" />

            {/* Plants Section */}
            <Tabs defaultValue="registered">
              <Tabs.List>
                <Tabs.Tab value="registered">Plantas Registradas</Tabs.Tab>
                <Tabs.Tab value="external">Plantas Externas</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="registered" pt="md">
                <Group justify="space-between" mb="md">
                  <Text size="lg">Plantas Registradas</Text>
                  <Group>
                    <Button
                      onClick={() => openModal('registered')}
                      disabled={loading}
                      variant="outline"
                      leftSection={<IconPlus size="1rem" />}
                    >
                      Agregar Planta
                    </Button>
                    <Button
                      onClick={() => setAddPlantModalOpened(true)}
                      disabled={loading}
                      variant="outline"
                      leftSection={<IconPlant size="1rem" />}
                      ml="sm"
                    >
                      Registrar Nueva Planta
                    </Button>
                  </Group>
                </Group>

                {form.values.saleDetails.length === 0 ? (
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Sin plantas"
                    color="blue"
                    mb="md"
                  >
                    No hay plantas registradas agregadas
                  </Alert>
                ) : (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Precio Unitario</Table.Th>
                        <Table.Th>Cantidad</Table.Th>
                        <Table.Th>Subtotal</Table.Th>
                        <Table.Th>Acciones</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {form.values.saleDetails.map((item, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>{item.name}</Table.Td>
                          <Table.Td>${item.price.toFixed(2)}</Table.Td>
                          <Table.Td>{item.quantity}</Table.Td>
                          <Table.Td>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              {/* <ActionIcon
                              color="blue"
                              onClick={() => handleEditRegisteredPlant(index)}
                            >
                              <IconEdit size="1rem" />
                            </ActionIcon> */}
                              <ActionIcon
                                color="red"
                                onClick={() =>
                                  handleRemoveRegisteredPlant(index)
                                }
                              >
                                <IconTrash size="1rem" />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="external" pt="md">
                <Group justify="space-between" mb="md">
                  <Text size="lg">Plantas Externas</Text>
                  <Button
                    onClick={() => openModal('external')}
                    disabled={loading}
                    variant="outline"
                    leftSection={<IconPlus size="1rem" />}
                  >
                    Agregar Planta
                  </Button>
                </Group>

                {form.values.externalPlants.length === 0 ? (
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Sin plantas"
                    color="blue"
                    mb="md"
                  >
                    No hay plantas externas agregadas
                  </Alert>
                ) : (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Precio Unitario</Table.Th>
                        <Table.Th>Cantidad</Table.Th>
                        <Table.Th>Subtotal</Table.Th>
                        <Table.Th>Acciones</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {form.values.externalPlants.map((item, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>{item.name}</Table.Td>
                          <Table.Td>${item.price.toFixed(2)}</Table.Td>
                          <Table.Td>{item.quantity}</Table.Td>
                          <Table.Td>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              {/* <ActionIcon
                              color="blue"
                              onClick={() => handleEditExternalPlant(index)}
                            >
                              <IconEdit size="1rem" />
                            </ActionIcon> */}
                              <ActionIcon
                                color="red"
                                onClick={() => handleRemoveExternalPlant(index)}
                              >
                                <IconTrash size="1rem" />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                )}
              </Tabs.Panel>
            </Tabs>

            {!hasPlants && (
              <Alert color="red" icon={<IconAlertCircle size="1rem" />}>
                Debes agregar al menos una planta (registrada o externa)
              </Alert>
            )}

            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                disabled={loading || !hasPlants}
                loading={loading}
              >
                Guardar Nota de Venta
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </>
  )
}
