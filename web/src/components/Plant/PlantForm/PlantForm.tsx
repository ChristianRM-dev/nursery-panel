// web/src/components/Plant/PlantForm/PlantForm.tsx
import React, { useEffect, useState } from 'react'

import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Group,
  Text,
  Box,
  ActionIcon,
  Select,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useFilterCategories } from 'src/hooks/Categories/useFilterCategories'

import { PlantFormValues, plantSchema } from './PlantForm.schema'

interface PlantFormProps {
  onSubmit: (values: PlantFormValues) => void
  loading: boolean
  defaultValues: PlantFormValues
}

export const PlantForm: React.FC<PlantFormProps> = ({
  onSubmit,
  loading,
  defaultValues,
}) => {
  const {
    filteredCategories,
    loading: loadingCategories,
    handleFilter: handleFilterCategories,
  } = useFilterCategories({ initialQuery: '' })

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([])

  const form = useForm<PlantFormValues>({
    initialValues: {
      name: defaultValues?.name || '',
      price: defaultValues?.price || 1,
      stock: defaultValues?.stock || 1,
      categoryId: defaultValues?.categoryId || '',
      presentationType: defaultValues?.presentationType || '',
      presentationDetails: defaultValues?.presentationDetails || '',
      photos: defaultValues?.photos || [],
    },
    validate: (values) => {
      const result = plantSchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  const handleDrop = (files: File[]) => {
    form.setFieldValue('photos', [...form.values.photos, ...files])
  }

  const handleRemoveImage = (index: number) => {
    const updatedPhotos = form.values.photos.filter((_, i) => i !== index)
    form.setFieldValue('photos', updatedPhotos)
  }

  useEffect(() => {
    setCategories(
      filteredCategories.map((c) => ({ value: c.id, label: c.name }))
    )
  }, [filteredCategories])

  return (
    <Box style={{ position: 'relative' }}>
      {loading && <FormOverlay />}

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Nombre"
          {...form.getInputProps('name')}
          disabled={loading}
        />
        <NumberInput
          label="Precio"
          {...form.getInputProps('price')}
          disabled={loading}
        />
        <NumberInput
          label="Inventario"
          {...form.getInputProps('stock')}
          disabled={loading}
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
          disabled={loading || loadingCategories}
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
          disabled={loading}
        />
        <Textarea
          label="Detalles de la Presentación"
          {...form.getInputProps('presentationDetails')}
          disabled={loading}
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
                Adjunte tantos archivos como desee, cada archivo no debe exceder
                5 MB
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
          <Box mt="md">
            <Text size="md" mb="sm">
              Archivos seleccionados:
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {form.values.photos.map((photo, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  {'url' in photo ? (
                    <img
                      src={photo.url}
                      alt={`Vista previa ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(photo as File)}
                      alt={`Vista previa ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <ActionIcon
                    style={{ position: 'absolute', top: 5, right: 5 }}
                    color="red"
                    variant="filled"
                    onClick={() => handleRemoveImage(index)}
                    disabled={loading}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </div>
              ))}
            </div>
          </Box>
        )}

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </Group>
      </form>
    </Box>
  )
}
