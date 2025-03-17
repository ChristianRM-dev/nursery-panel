// web/src/components/Plants/PlantForm/PlantForm.tsx
import React from 'react'
import { useForm } from '@mantine/form'
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Group,
  Text,
  Box,
  ActionIcon,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react'
import { PlantFormValues, plantSchema } from './PlantForm.schems'
import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'

interface PlantFormProps {
  onSubmit: (values: PlantFormValues) => void
  loading: boolean // Add loading prop
}

export const PlantForm: React.FC<PlantFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<PlantFormValues>({
    initialValues: {
      name: '',
      price: 0,
      stock: 0,
      category: '',
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

  const handleDrop = (files: File[]) => {
    form.setFieldValue('photos', [...form.values.photos, ...files])
  }

  const handleRemoveImage = (index: number) => {
    const updatedPhotos = form.values.photos.filter((_, i) => i !== index)
    form.setFieldValue('photos', updatedPhotos)
  }

  return (
    <Box style={{ position: 'relative' }}>
      {/* Loading Overlay */}
      {loading && <FormOverlay />}

      {/* Form */}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Name"
          {...form.getInputProps('name')}
          disabled={loading}
        />
        <NumberInput
          label="Price"
          {...form.getInputProps('price')}
          disabled={loading}
        />
        <NumberInput
          label="Stock"
          {...form.getInputProps('stock')}
          disabled={loading}
        />
        <TextInput
          label="Category"
          {...form.getInputProps('category')}
          disabled={loading}
        />
        <Textarea
          label="Presentation Details"
          {...form.getInputProps('presentationDetails')}
          disabled={loading}
        />
        <Dropzone
          onDrop={handleDrop}
          onReject={() => console.log('Rejected files')}
          maxSize={5 * 1024 ** 2} // 5 MB
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
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>

        {/* Display selected files with remove option */}
        {form.values.photos.length > 0 && (
          <Box mt="md">
            <Text size="md" mb="sm">
              Selected files:
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {form.values.photos.map((file, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
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
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
