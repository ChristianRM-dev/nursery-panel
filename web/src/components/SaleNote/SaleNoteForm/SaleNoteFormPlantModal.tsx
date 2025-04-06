// web/src/components/SaleNote/SaleNoteForm/SaleNoteFormPlantModal.tsx
import React, { useEffect, useMemo, useState } from 'react'

import {
  Modal,
  Tabs,
  Group,
  Button,
  Select,
  NumberInput,
  TextInput,
  Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { useFilterPlants } from 'src/hooks/Plants/useFilterPlants'
import { debounce } from 'src/utils/debounce'

interface PlantFormValues {
  plantId: string
  name: string
  price: number
  quantity: number
}

interface ExternalPlantFormValues {
  name: string
  price: number
  quantity: number
  presentationType: string
  presentationDetails: string
}

interface SaleNoteFormPlantModalProps {
  opened: boolean
  tab: 'registered' | 'external'
  registeredPlantsAdded: string[]
  onClose: () => void
  onAddRegisteredPlant: (plant: PlantFormValues) => void
  onAddExternalPlant: (plant: ExternalPlantFormValues) => void
}

export const SaleNoteFormPlantModal: React.FC<SaleNoteFormPlantModalProps> = ({
  opened,
  onClose,
  onAddRegisteredPlant,
  onAddExternalPlant,
  tab,
  registeredPlantsAdded,
}) => {
  const [activeTab, setActiveTab] = useState<'registered' | 'external'>(tab)

  // Plant filter
  const {
    filteredPlants,
    loading: loadingPlants,
    handleFilter: handleFilterPlants,
  } = useFilterPlants({ initialQuery: '', excludeIds: registeredPlantsAdded })

  const registeredPlantForm = useForm<PlantFormValues>({
    initialValues: {
      plantId: '',
      name: '',
      price: 0,
      quantity: 1,
    },
    validate: {
      plantId: (value) => (value ? null : 'Seleccione una planta'),
      price: (value) =>
        value > 0 ? null : 'El precio debe ser mayor que cero',
      quantity: (value) =>
        value > 0 ? null : 'La cantidad debe ser mayor que cero',
    },
  })

  const externalPlantForm = useForm<ExternalPlantFormValues>({
    initialValues: {
      name: '',
      price: 0,
      quantity: 1,
      presentationType: '',
      presentationDetails: '',
    },
    validate: {
      name: (value) => (value.trim() ? null : 'Ingrese el nombre de la planta'),
      price: (value) =>
        value > 0 ? null : 'El precio debe ser mayor que cero',
      quantity: (value) =>
        value > 0 ? null : 'La cantidad debe ser mayor que cero',
    },
  })

  const handleSubmitRegisteredPlant = (values: PlantFormValues) => {
    onAddRegisteredPlant({
      ...values,
      name:
        filteredPlants.find((p) => p.id === values.plantId)?.name ||
        'Planta no encontrada',
    })
    registeredPlantForm.reset()
    onClose()
  }

  const handleSubmitExternalPlant = (values: ExternalPlantFormValues) => {
    onAddExternalPlant(values)
    externalPlantForm.reset()
    onClose()
  }

  const handlePlantSelect = (plantId: string) => {
    const selectedPlant = filteredPlants.find((p) => p.id === plantId)
    if (selectedPlant) {
      registeredPlantForm.setValues({
        ...registeredPlantForm.values,
        plantId,
        price: selectedPlant.price, // Set the plant's price as initial value
        name: selectedPlant.name,
      })
    }
  }

  const debouncedFilterPlants = useMemo(() => {
    return debounce((query: string) => {
      handleFilterPlants(query)
    }, 500)
  }, [handleFilterPlants]) // Still only depends on handleFilterPlants

  const plants = filteredPlants.map((p) => ({ value: p.id, label: p.name }))

  useEffect(() => {
    setActiveTab(tab)
  }, [opened, tab])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Agregar Planta"
      size="lg"
      centered
    >
      <Tabs
        value={activeTab}
        onChange={(tab: 'registered' | 'external') => setActiveTab(tab)}
      >
        <Tabs.List>
          <Tabs.Tab value="registered">Planta Registrada</Tabs.Tab>
          <Tabs.Tab value="external">Planta Externa</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="registered" pt="md">
          <form
            onSubmit={registeredPlantForm.onSubmit(handleSubmitRegisteredPlant)}
          >
            <Stack gap="md">
              <Select
                label="Planta"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                placeholder="Seleccione una planta"
                value={registeredPlantForm.values.plantId}
                onChange={(value) => {
                  registeredPlantForm.getInputProps('plantId').onChange(value)
                  if (value) handlePlantSelect(value)
                }}
                data={plants}
                searchable
                clearable
                onSearchChange={debouncedFilterPlants}
                nothingFoundMessage="No se encontraron plantas"
                disabled={loadingPlants}
                required
              />

              <NumberInput
                label="Precio"
                min={0.01}
                step={0.01}
                {...registeredPlantForm.getInputProps('price')}
                required
              />

              <NumberInput
                label="Cantidad"
                min={1}
                {...registeredPlantForm.getInputProps('quantity')}
                required
              />

              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!registeredPlantForm.isValid()}>
                  Agregar Planta
                </Button>
              </Group>
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="external" pt="md">
          <form
            onSubmit={externalPlantForm.onSubmit(handleSubmitExternalPlant)}
          >
            <Stack gap="md">
              <TextInput
                label="Nombre"
                placeholder="Nombre de la planta"
                {...externalPlantForm.getInputProps('name')}
                required
              />

              <NumberInput
                label="Precio"
                min={0.01}
                step={0.01}
                {...externalPlantForm.getInputProps('price')}
                required
              />

              <NumberInput
                label="Cantidad"
                min={1}
                {...externalPlantForm.getInputProps('quantity')}
                required
              />

              <TextInput
                label="Tipo de Presentación"
                placeholder="Ej: Maceta, Bolsa, etc."
                {...externalPlantForm.getInputProps('presentationType')}
              />

              <TextInput
                label="Detalles de Presentación"
                placeholder="Ej: Tamaño, color, etc."
                {...externalPlantForm.getInputProps('presentationDetails')}
              />

              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!externalPlantForm.isValid()}>
                  Agregar Planta
                </Button>
              </Group>
            </Stack>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  )
}
