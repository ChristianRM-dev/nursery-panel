// web/src/components/Category/CategoryForm/CategoryForm.tsx
import React, { useState } from 'react'

import { TextInput, Textarea, Button, Group, Box, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'

import { FormImagePreview } from 'src/components/Shared/Form/FormImagePreview/FormImagePreview'
import { FormImagesThumbnail } from 'src/components/Shared/Form/FormImagesThumbnail/FormImagesThumbnail'
import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'

import { CategoryFormValues, categorySchema } from './CategoryForm.schema'

interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void
  loading: boolean
  defaultValues: CategoryFormValues
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  loading,
  defaultValues,
}) => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)
  const form = useForm<CategoryFormValues>({
    initialValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      image: defaultValues?.image || null,
    },
    validate: (values) => {
      const result = categorySchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      form.setFieldValue('image', files[0]) // Only allow one image file
    }
  }

  const handleRemoveImage = () => {
    form.setFieldValue('image', null)
  }

  return (
    <>
      <FormImagePreview
        openedIndex={openedIndex}
        onClose={() => setOpenedIndex(null)}
        onChangeIndex={(newIndex) => setOpenedIndex(newIndex)}
        photos={[form.values.image]}
      />
      <Box style={{ position: 'relative' }}>
        {loading && <FormOverlay />}

        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Nombre"
            placeholder="Nombre de la categoría"
            {...form.getInputProps('name')}
            disabled={loading}
            required
            mb="md"
          />
          <Textarea
            label="Descripción"
            placeholder="Descripción de la categoría"
            {...form.getInputProps('description')}
            disabled={loading}
            mb="md"
          />

          {/* Image Upload */}
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
                  Arrastre la imagen aquí o haga clic para seleccionar un
                  archivo
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  El archivo no debe exceder 5 MB
                </Text>
              </div>
            </Group>
          </Dropzone>

          {form.errors.image && (
            <Text color="red" size="sm" mt="xs">
              {form.errors.image}
            </Text>
          )}

          {form.values.image && (
            <FormImagesThumbnail
              photos={[form.values.image]}
              loading={loading}
              description="Imagen de la categoría"
              onRemove={handleRemoveImage}
              onPreview={setOpenedIndex}
            />
          )}

          <Group justify="flex-end" mt="md">
            <Button type="submit" disabled={loading}>
              Enviar
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
