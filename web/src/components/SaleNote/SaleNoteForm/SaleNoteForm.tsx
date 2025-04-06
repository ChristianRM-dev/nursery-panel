import React, { useEffect, useState } from 'react'

import {
  NumberInput,
  Button,
  Group,
  Box,
  Select,
  Text,
  TextInput,
  Tabs,
  Stack,
  Divider,
  Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconPlus } from '@tabler/icons-react'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useFilterCustomers } from 'src/hooks/Customers/useFilterCustomers'
import { useFilterNurseries } from 'src/hooks/Nurseries/useFilterNurseries'
import { useFilterPlants } from 'src/hooks/Plants/useFilterPlants'

import { SaleNoteFormValues, saleNoteSchema } from './SaleNoteForm.schema'

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

  // Plant filter
  const {
    filteredPlants,
    loading: loadingPlants,
    handleFilter: handleFilterPlants,
  } = useFilterPlants({ initialQuery: '' })

  const [customers, setCustomers] = useState<
    { value: string; label: string }[]
  >([])
  const [nurseries, setNurseries] = useState<
    { value: string; label: string }[]
  >([])
  const [plants, setPlants] = useState<{ value: string; label: string }[]>([])

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

  useEffect(() => {
    setCustomers(filteredCustomers.map((c) => ({ value: c.id, label: c.name })))
  }, [filteredCustomers])

  useEffect(() => {
    setNurseries(filteredNurseries.map((n) => ({ value: n.id, label: n.name })))
  }, [filteredNurseries])

  useEffect(() => {
    setPlants(filteredPlants.map((p) => ({ value: p.id, label: p.name })))
  }, [filteredPlants])

  const handleAddRegisteredPlant = () => {
    form.insertListItem('saleDetails', {
      plantId: '',
      price: 0,
      quantity: 1,
    })
  }

  const handleAddExternalPlant = () => {
    form.insertListItem('externalPlants', {
      name: '',
      price: 0,
      quantity: 1,
      presentationType: '',
      presentationDetails: '',
    })
  }

  const handleRemoveRegisteredPlant = (index: number) => {
    form.removeListItem('saleDetails', index)
  }

  const handleRemoveExternalPlant = (index: number) => {
    form.removeListItem('externalPlants', index)
  }

  const hasPlants =
    form.values.saleDetails.length > 0 || form.values.externalPlants.length > 0

  return (
    <Box style={{ position: 'relative' }}>
      {loading && <FormOverlay />}

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
              <Text size="lg" mb="sm">
                Plantas Registradas
              </Text>

              {form.values.saleDetails.length === 0 && (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Sin plantas"
                  color="blue"
                  mb="md"
                >
                  No hay plantas registradas agregadas
                </Alert>
              )}

              {form.values.saleDetails.map((_, index) => (
                <Box
                  key={index}
                  mb="md"
                  p="md"
                  style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}
                >
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Planta Registrada #{index + 1}</Text>
                    <Button
                      variant="outline"
                      color="red"
                      size="xs"
                      onClick={() => handleRemoveRegisteredPlant(index)}
                      disabled={loading}
                    >
                      Eliminar
                    </Button>
                  </Group>

                  <Select
                    label="Planta"
                    placeholder="Seleccione una planta"
                    {...form.getInputProps(`saleDetails.${index}.plantId`)}
                    data={plants}
                    searchable
                    clearable
                    onSearchChange={handleFilterPlants}
                    nothingFoundMessage="No se encontraron plantas"
                    disabled={loading || loadingPlants}
                    required
                  />

                  <NumberInput
                    label="Precio"
                    min={0.01}
                    step={0.01}
                    {...form.getInputProps(`saleDetails.${index}.price`)}
                    disabled={loading}
                    required
                  />

                  <NumberInput
                    label="Cantidad"
                    min={1}
                    {...form.getInputProps(`saleDetails.${index}.quantity`)}
                    disabled={loading}
                    required
                  />
                </Box>
              ))}

              <Button
                onClick={handleAddRegisteredPlant}
                disabled={loading}
                variant="outline"
                leftSection={<IconPlus size="1rem" />}
                fullWidth
              >
                Agregar Planta Registrada
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value="external" pt="md">
              <Text size="lg" mb="sm">
                Plantas Externas
              </Text>

              {form.values.externalPlants.length === 0 && (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Sin plantas"
                  color="blue"
                  mb="md"
                >
                  No hay plantas externas agregadas
                </Alert>
              )}

              {form.values.externalPlants.map((_, index) => (
                <Box
                  key={index}
                  mb="md"
                  p="md"
                  style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}
                >
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Planta Externa #{index + 1}</Text>
                    <Button
                      variant="outline"
                      color="red"
                      size="xs"
                      onClick={() => handleRemoveExternalPlant(index)}
                      disabled={loading}
                    >
                      Eliminar
                    </Button>
                  </Group>

                  <TextInput
                    label="Nombre"
                    placeholder="Nombre de la planta"
                    {...form.getInputProps(`externalPlants.${index}.name`)}
                    disabled={loading}
                    required
                  />

                  <NumberInput
                    label="Precio"
                    min={0.01}
                    step={0.01}
                    {...form.getInputProps(`externalPlants.${index}.price`)}
                    disabled={loading}
                    required
                  />

                  <NumberInput
                    label="Cantidad"
                    min={1}
                    {...form.getInputProps(`externalPlants.${index}.quantity`)}
                    disabled={loading}
                    required
                  />

                  <TextInput
                    label="Tipo de Presentación"
                    placeholder="Ej: Maceta, Bolsa, etc."
                    {...form.getInputProps(
                      `externalPlants.${index}.presentationType`
                    )}
                    disabled={loading}
                  />

                  <TextInput
                    label="Detalles de Presentación"
                    placeholder="Ej: Tamaño, color, etc."
                    {...form.getInputProps(
                      `externalPlants.${index}.presentationDetails`
                    )}
                    disabled={loading}
                  />
                </Box>
              ))}

              <Button
                onClick={handleAddExternalPlant}
                disabled={loading}
                variant="outline"
                leftSection={<IconPlus size="1rem" />}
                fullWidth
              >
                Agregar Planta Externa
              </Button>
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
  )
}
