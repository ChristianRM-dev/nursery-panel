// web/src/components/Category/CategoryForm/CategoryForm.tsx
import React from 'react'

import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Text,
  ActionIcon,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react'

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
                Arrastre la imagen aquí o haga clic para seleccionar un archivo
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
          <Box mt="md">
            <Text size="md" mb="sm">
              Imagen seleccionada:
            </Text>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={
                  form.values.image instanceof File
                    ? URL.createObjectURL(form.values.image)
                    : form.values.image.url
                }
                alt="Imagen de la categoría"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <ActionIcon
                style={{ position: 'absolute', top: 5, right: 5 }}
                color="red"
                variant="filled"
                onClick={handleRemoveImage}
                disabled={loading}
              >
                <IconTrash size={16} />
              </ActionIcon>
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
