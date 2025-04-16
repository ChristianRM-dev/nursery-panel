// web/src/components/Customer/CustomerForm/CustomerForm.tsx
import React from 'react'

import { TextInput, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'

import { CustomerFormValues, customerSchema } from './CustomerForm.schema'

interface CustomerFormProps {
  onSubmit: (values: CustomerFormValues) => void
  loading: boolean
  defaultValues: CustomerFormValues
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  loading,
  defaultValues,
}) => {
  const form = useForm<CustomerFormValues>({
    initialValues: {
      name: defaultValues?.name || '',
      phone: defaultValues?.phone || '',
      email: defaultValues?.email || '',
    },
    validate: (values) => {
      const result = customerSchema.safeParse(values)
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
          placeholder="Nombre"
          {...form.getInputProps('name')}
          disabled={loading}
        />
        <TextInput
          label="Teléfono"
          placeholder="Teléfono"
          {...form.getInputProps('phone')}
          disabled={loading}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
          disabled={loading}
        />
        <TextInput
          label="Dirección"
          placeholder="Dirección"
          {...form.getInputProps('address')}
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
