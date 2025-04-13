// web/src/pages/AdminEditPlantPage/AdminEditPlantPage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { PlantForm } from 'src/components/Plant/PlantForm/PlantForm'
import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
import { useGetPlantById } from 'src/hooks/Plants/useGetPlantById'
import { useUpdatePlant } from 'src/hooks/Plants/useUpdatePlant'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapPlantFormValuesToUpdatePlantInput } from 'src/utils/Mappers'

const AdminEditPlantPage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    plant,
    loading: loadingPlant,
    error: errorPlant,
  } = useGetPlantById({ id })

  const { updatePlant, loading: updatingPlant } = useUpdatePlant({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Planta "${data.name}" actualizada correctamente!`
      )
      navigate(routes.adminPlants())
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar la planta. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating plant:', error)
    },
  })
  const defaultValues: PlantFormValues = plant
    ? {
        name: plant.name,
        price: plant.price,
        stock: plant.stock,
        categoryId: plant.categoryId,
        presentationType: plant.presentationType,
        presentationDetails: plant.presentationDetails,
        photos: plant.photos.map((photo) => ({
          id: photo.id,
          url: photo.url,
        })),
      }
    : {
        name: '',
        price: 1,
        stock: 1,
        categoryId: '',
        presentationType: '',
        presentationDetails: '',
        photos: [],
      }

  const handleSubmit = async (values: PlantFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapPlantFormValuesToUpdatePlantInput(values)

      // Call the updatePlant mutation
      await updatePlant(id, input)

      // Handle success (e.g., show a notification, redirect, etc.)
      console.log('Planta actualizada correctamente')
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error al actualizar la planta:', error)
    }
  }

  if (loadingPlant) {
    return <LoadingOverlay visible />
  }

  if (errorPlant) {
    return <div>Error al cargar la planta: {errorPlant.message}</div>
  }

  return (
    <>
      <Metadata
        title="AdminEditPlant"
        description="Página de Edición de Plantas"
      />{' '}
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminPlants())}
          >
            Volver
          </Button>
        </Group>
        {/* Page Title */}
        <Title order={1} mb="xl">
          Editar Planta
        </Title>
        <PlantForm
          onSubmit={handleSubmit}
          loading={updatingPlant}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminEditPlantPage
