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
        <Select
          label="Category"
          placeholder="Select a category"
          {...form.getInputProps('categoryId')}
          data={categories}
          searchable
          clearable
          onSearchChange={handleFilterCategories}
          nothingFoundMessage="No categories found"
          disabled={loading || loadingCategories}
        />
        <Select
          label="Presentation"
          placeholder="Select a presentation type"
          {...form.getInputProps('presentationType')}
          data={[
            { value: 'BAG', label: 'BAG' },
            { value: 'POT', label: 'POT' },
            { value: 'HANGING', label: 'HANGING' },
          ]}
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

        {form.errors.photos && (
          <Text color="red" size="sm" mt="xs">
            {form.errors.photos}
          </Text>
        )}

        {form.values.photos.length > 0 && (
          <Box mt="md">
            <Text size="md" mb="sm">
              Selected files:
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {form.values.photos.map((photo, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  {'url' in photo ? (
                    <img
                      src={photo.url}
                      alt={`Preview ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(photo as File)} // photo is guaranteed to be a File here
                      alt={`Preview ${index}`}
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
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
