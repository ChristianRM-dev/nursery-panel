// web/src/components/Plant/AddPlantModal/AddPlantModal.tsx
import { useEffect, useState } from 'react'

import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Group,
  Button,
  Text,
  Stack,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'

import {
  PlantFormValues,
  plantSchema,
} from 'src/components/Plant/PlantForm/PlantForm.schema'
import { FormImagesThumbnail } from 'src/components/Shared/Form/FormImagesThumbnail/FormImagesThumbnail'
import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useFilterCategories } from 'src/hooks/Categories/useFilterCategories'
import { useCreatePlant } from 'src/hooks/Plants/useCreatePlant'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapPlantFormValuesToCreatePlantInput } from 'src/utils/Mappers'

interface AddPlantModalProps {
  opened: boolean
  onClose: () => void
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ opened, onClose }) => {
  const {
    filteredCategories,
    loading: loadingCategories,
    handleFilter: handleFilterCategories,
  } = useFilterCategories({ initialQuery: '' })
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([])
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { createPlant, loading } = useCreatePlant({
    onCompleted: (data) => {
      showSuccessNotification(`¡Planta "${data.name}" creada correctamente!`)
      onClose()
      form.reset()
    },
    onError: (error) => {
      console.error('Error creating plant:', error)
      showErrorNotification(
        'Error al crear la planta. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const form = useForm<PlantFormValues>({
    initialValues: {
      name: '',
      price: 1,
      stock: 1,
      categoryId: '',
      presentationType: '',
      presentationDetails: '',
      photos: [],
    },
    validate: (values) => {
      const result = plantSchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  useEffect(() => {
    setCategories(
      filteredCategories.map((c) => ({ value: c.id, label: c.name }))
    )
  }, [filteredCategories])

  const handleSubmit = async (values: PlantFormValues) => {
    try {
      console.log('Submitting form with values:', values)

      // Map form values to the input expected by the mutation
      const input = await mapPlantFormValuesToCreatePlantInput(values)

      // Call the createPlant mutation
      await createPlant(input)
    } catch (error) {
      console.error('Error in form submission:', error)
      showErrorNotification(
        'Error al crear la planta. Por favor, inténtelo de nuevo.'
      )
    }
  }

  const handleDrop = (files: File[]) => {
    form.setFieldValue('photos', [...form.values.photos, ...files])
  }

  const handleRemoveImage = (index: number) => {
    const updatedPhotos = form.values.photos.filter((_, i) => i !== index)
    form.setFieldValue('photos', updatedPhotos)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Registrar Nueva Planta"
      size="lg"
      fullScreen
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {loading && <FormOverlay />}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" mr={'20%'} ml={'20%'}>
          <TextInput label="Nombre" {...form.getInputProps('name')} required />
          <NumberInput
            label="Precio"
            {...form.getInputProps('price')}
            min={0}
            required
          />
          <NumberInput
            label="Inventario"
            {...form.getInputProps('stock')}
            min={1}
            required
          />
          <Select
            label="Categoría"
            placeholder="Seleccione una categoría"
            {...form.getInputProps('categoryId')}
            data={categories}
            searchable
            clearable
            onSearchChange={handleFilterCategories}
            nothingFoundMessage="No se encontraron categorías"
            disabled={loadingCategories}
          />
          <Select
            label="Presentación"
            placeholder="Seleccione un tipo de presentación"
            {...form.getInputProps('presentationType')}
            data={[
              { value: 'BAG', label: 'BOLSA' },
              { value: 'POT', label: 'MACETA' },
              { value: 'HANGING', label: 'COLGANTE' },
            ]}
          />
          <Textarea
            label="Detalles de la Presentación"
            {...form.getInputProps('presentationDetails')}
          />
          <Dropzone
            onDrop={handleDrop}
            onReject={() => {}}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            disabled={loading}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={52}
                  color="var(--mantine-color-blue-6)"
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={52}
                  color="var(--mantine-color-red-6)"
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  size={52}
                  color="var(--mantine-color-dimmed)"
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Arrastre imágenes aquí o haga clic para seleccionar archivos
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Adjunte tantos archivos como desee, cada archivo no debe
                  exceder 5 MB
                </Text>
              </div>
            </Group>
          </Dropzone>

          {form.errors.photos && (
            <Text color="red" size="sm" mt="xs">
              {form.errors.photos}
            </Text>
          )}

          {form.values.photos.length > 0 && (
            <FormImagesThumbnail
              photos={form.values.photos}
              loading={loading}
              description="Imágenes seleccionadas"
              onRemove={handleRemoveImage}
            />
          )}
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button disabled={loading} type="submit">
              Guardar y Agregar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}

export default AddPlantModal
