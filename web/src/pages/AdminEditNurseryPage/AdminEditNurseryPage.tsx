// web/src/pages/AdminEditNurseryPage/AdminEditNurseryPage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { NurseryForm } from 'src/components/Nursery/NurseryForm/NurseryForm'
import { NurseryFormValues } from 'src/components/Nursery/NurseryForm/NurseryForm.schema'
import { useGetNurseryById } from 'src/hooks/Nurseries/useGetNurseryById'
import { useUpdateNursery } from 'src/hooks/Nurseries/useUpdateNursery'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapNurseryFormValuesToUpdateNurseryInput } from 'src/utils/Mappers'

const AdminEditNurseryPage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    nursery,
    loading: loadingNursery,
    error: errorNursery,
  } = useGetNurseryById({ id })

  const { updateNursery, loading: updatingNursery } = useUpdateNursery({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Vivero "${data.name}" actualizado correctamente!`
      )
      navigate(routes.adminNurseries())
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar el vivero. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating nursery:', error)
    },
  })

  const defaultValues: NurseryFormValues = nursery
    ? {
        name: nursery.name,
        address: nursery.address,
        phone: nursery.phone,
        rfc: nursery.rfc,
        logo: nursery.logo ? { url: nursery.logo } : null,
        email: nursery.email,
        ownerName: nursery.ownerName,
      }
    : {
        name: '',
        address: '',
        phone: '',
        rfc: '',
        logo: null,
        email: '',
        ownerName: '',
      }

  const handleSubmit = async (values: NurseryFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapNurseryFormValuesToUpdateNurseryInput(values)

      // Call the updateNursery mutation
      await updateNursery(id, input)

      // Handle success (e.g., show a notification, redirect, etc.)
      console.log('Vivero actualizado correctamente')
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error al actualizar el vivero:', error)
    }
  }

  if (loadingNursery) {
    return <LoadingOverlay visible />
  }

  if (errorNursery) {
    return <div>Error al cargar el vivero: {errorNursery.message}</div>
  }

  return (
    <>
      <Metadata
        title="AdminEditNursery"
        description="Página de Edición de Viveros"
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
          Editar Vivero
        </Title>
        <NurseryForm
          onSubmit={handleSubmit}
          loading={updatingNursery}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminEditNurseryPage
