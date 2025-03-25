// web/src/components/SaleNote/SaleNoteForm/SaleNoteForm.tsx
import React, { useEffect, useState } from 'react'

import { NumberInput, Button, Group, Box, Select, Text } from '@mantine/core'
import { useForm } from '@mantine/form'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useFilterCustomers } from 'src/hooks/Customers/useFilterCustomers'
import { useFilterNurseries } from 'src/hooks/Nurseries/useFilterNurseries'
import { useFilterPlants } from 'src/hooks/Plants/useFilterPlants'

import { SaleNoteFormValues, saleNoteSchema } from './SaleNoteForm.schema'

interface SaleNoteFormProps {
  onSubmit: (values: SaleNoteFormValues) => void
  loading: boolean
  defaultValues: SaleNoteFormValues
}

export const SaleNoteForm: React.FC<SaleNoteFormProps> = ({
  onSubmit,
  loading,
  defaultValues,
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
      customerId: defaultValues?.customerId || '',
      nurseryId: defaultValues?.nurseryId || '',
      saleDetails: defaultValues?.saleDetails || [],
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

  const handleAddPlant = () => {
    form.insertListItem('saleDetails', {
      plantId: '',
      price: 0,
      quantity: 1,
    })
  }

  const handleRemovePlant = (index: number) => {
    form.removeListItem('saleDetails', index)
  }

  return (
    <Box style={{ position: 'relative' }}>
      {loading && <FormOverlay />}

      <form onSubmit={form.onSubmit(onSubmit)}>
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
        />

        <Text size="lg" mt="md" mb="sm">
          Plantas vendidas
        </Text>

        {form.values.saleDetails.map((_, index) => (
          <Box
            key={index}
            mb="md"
            p="md"
            style={{ border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Planta #{index + 1}</Text>
              <Button
                variant="outline"
                color="red"
                size="xs"
                onClick={() => handleRemovePlant(index)}
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
            />

            <NumberInput
              label="Precio"
              {...form.getInputProps(`saleDetails.${index}.price`)}
              disabled={loading}
            />

            <NumberInput
              label="Cantidad"
              min={1}
              {...form.getInputProps(`saleDetails.${index}.quantity`)}
              disabled={loading}
            />
          </Box>
        ))}

        <Button
          onClick={handleAddPlant}
          disabled={loading}
          variant="outline"
          fullWidth
          mt="md"
        >
          Agregar Planta
        </Button>

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </Group>
      </form>
    </Box>
  )
}
