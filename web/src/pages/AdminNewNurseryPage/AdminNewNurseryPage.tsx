// web/src/pages/AdminNewNurseryPage/AdminNewNurseryPage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { NurseryForm } from 'src/components/Nursery/NurseryForm/NurseryForm'
import { NurseryFormValues } from 'src/components/Nursery/NurseryForm/NurseryForm.schema'
import { useCreateNursery } from 'src/hooks/Nurseries/useCreateNursery'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapNurseryFormValuesToCreateNurseryInput } from 'src/utils/Mappers'

const AdminNewNurseryPage: React.FC = () => {
  const defaultValues: NurseryFormValues = {
    name: '',
    address: '',
    phone: '',
    rfc: '',
    logo: null, // Initialize logo as null
  }
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const { createNursery, loading } = useCreateNursery({
    onCompleted: (data) => {
      showSuccessNotification(`¡Vivero "${data.name}" creado correctamente!`)
      navigate(routes.adminNurseries())
    },
    onError: (error) => {
      console.error('Error creating nursery:', error)
      showErrorNotification(
        'Error al crear el vivero. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const handleSubmit = async (values: NurseryFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapNurseryFormValuesToCreateNurseryInput(values)

      // Call the createNursery mutation
      await createNursery(input)

      // Handle success (e.g., show a notification, redirect, etc.)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error creating nursery:', error)
    }
  }

  return (
    <>
      <Metadata
        title="AdminNurseriesNew"
        description="Página de Creación de Viveros"
      />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminNurseries())}
          >
            Volver
          </Button>
        </Group>
        {/* Page Title */}
        <Title order={1} mb="xl">
          Crear Vivero
        </Title>
        <NurseryForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminNewNurseryPage
