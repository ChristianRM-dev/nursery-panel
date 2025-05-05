// web/src/pages/AdminEditCustomerPage/AdminEditCustomerPage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { CustomerForm } from 'src/components/Customer/CustomerForm/CustomerForm'
import { CustomerFormValues } from 'src/components/Customer/CustomerForm/CustomerForm.schema'
import { useGetCustomerById } from 'src/hooks/Customers/useGetCustomerById'
import { useUpdateCustomer } from 'src/hooks/Customers/useUpdateCustomer'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapCustomerFormValuesToUpdateCustomerInput } from 'src/utils/Mappers/CustomerMappers'

const AdminEditCustomerPage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    customer,
    loading: loadingCustomer,
    error: errorCustomer,
  } = useGetCustomerById({ id })

  const { updateCustomer, loading: updatingCustomer } = useUpdateCustomer({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Cliente "${data.name}" actualizado correctamente!`
      )
      navigate(routes.adminCustomers())
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar el cliente. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating customer:', error)
    },
  })

  const defaultValues: CustomerFormValues = customer
    ? {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address || '',
      }
    : {
        name: '',
        phone: '',
        email: '',
        address: '',
      }

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      const input = mapCustomerFormValuesToUpdateCustomerInput(values)
      await updateCustomer(id, input)
    } catch (error) {
      console.error('Error al actualizar el cliente:', error)
    }
  }

  if (loadingCustomer) {
    return <LoadingOverlay visible />
  }

  if (errorCustomer) {
    return <div>Error al cargar el cliente: {errorCustomer.message}</div>
  }

  return (
    <>
      <Metadata
        title="AdminEditCustomer"
        description="Página de Edición de Clientes"
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
          Editar Cliente
        </Title>
        <CustomerForm
          onSubmit={handleSubmit}
          loading={updatingCustomer}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminEditCustomerPage
