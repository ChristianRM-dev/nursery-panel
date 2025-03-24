// web/src/pages/AdminNewCustomerPage/AdminNewCustomerPage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { CustomerForm } from 'src/components/Customer/CustomerForm/CustomerForm'
import { CustomerFormValues } from 'src/components/Customer/CustomerForm/CustomerForm.schema'
import { useCreateCustomer } from 'src/hooks/Customers/useCreateCustomer'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapCustomerFormValuesToCreateCustomerInput } from 'src/utils/Mappers/CustomerMappers'

const AdminNewCustomerPage: React.FC = () => {
  const defaultValues: CustomerFormValues = {
    name: '',
    phone: '',
    email: '',
  }

  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const { createCustomer, loading } = useCreateCustomer({
    onCompleted: (data) => {
      showSuccessNotification(`¡Cliente "${data.name}" creado correctamente!`)
      navigate(routes.adminCustomers())
    },
    onError: (error) => {
      console.error('Error creating customer:', error)
      showErrorNotification(
        'Error al crear el cliente. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      const input = mapCustomerFormValuesToCreateCustomerInput(values)
      await createCustomer(input)
    } catch (error) {
      console.error('Error creating customer:', error)
    }
  }

  return (
    <>
      <Metadata
        title="AdminCustomersNew"
        description="Página de Creación de Clientes"
      />
      <Container size="xl" py="xs">
        <Group justify="space-between" mb="md">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminCustomers())}
          >
            Volver
          </Button>
        </Group>
        <Title order={1} mb="xl">
          Crear Cliente
        </Title>
        <CustomerForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminNewCustomerPage
