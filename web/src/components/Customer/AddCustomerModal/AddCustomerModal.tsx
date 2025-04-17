// web/src/components/Customer/AddCustomerModal/AddCustomerModal.tsx
import { Modal, TextInput, Group, Button, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'
import { useCreateCustomer } from 'src/hooks/Customers/useCreateCustomer'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapCustomerFormValuesToCreateCustomerInput } from 'src/utils/Mappers'

import {
  CustomerFormValues,
  customerSchema,
} from '../CustomerForm/CustomerForm.schema'

interface AddCustomerModalProps {
  opened: boolean
  onClose: () => void
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  opened,
  onClose,
}) => {
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { createCustomer, loading } = useCreateCustomer({
    onCompleted: (data) => {
      showSuccessNotification(`¡Cliente "${data.name}" creado correctamente!`)
      onClose()
      form.reset()
    },
    onError: (error) => {
      console.error('Error creating customer:', error)
      showErrorNotification(
        'Error al crear el cliente. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const form = useForm<CustomerFormValues>({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    validate: (values) => {
      const result = customerSchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      const input = mapCustomerFormValuesToCreateCustomerInput(values)
      await createCustomer(input)
    } catch (error) {
      console.error('Error in form submission:', error)
      showErrorNotification(
        'Error al crear el cliente. Por favor, inténtelo de nuevo.'
      )
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Registrar Nuevo Cliente"
      size="lg"
      fullScreen
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {loading && <FormOverlay />}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nombre"
            placeholder="Nombre completo"
            {...form.getInputProps('name')}
            required
            disabled={loading}
          />
          <TextInput
            label="Teléfono"
            placeholder="Número de teléfono"
            {...form.getInputProps('phone')}
            disabled={loading}
          />
          <TextInput
            label="Email"
            placeholder="Correo electrónico"
            {...form.getInputProps('email')}
            disabled={loading}
          />
          <TextInput
            label="Dirección"
            placeholder="Dirección completa"
            {...form.getInputProps('address')}
            disabled={loading}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Guardar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}

export default AddCustomerModal
