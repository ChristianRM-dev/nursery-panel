// web/src/components/Category/CategoryForm/CategoryForm.tsx
import React from 'react'

import { TextInput, Textarea, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

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
    },
    validate: (values) => {
      const result = categorySchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

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

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </Group>
      </form>
    </Box>
  )
}
