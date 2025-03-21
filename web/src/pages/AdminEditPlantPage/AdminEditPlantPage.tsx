// web/src/pages/AdminEditPlantPage/AdminEditPlantPage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
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
  const { id } = useParams() // Get the plant ID from the URL
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  // Fetch the plant data
  const {
    plant,
    loading: loadingPlant,
    error: errorPlant,
  } = useGetPlantById({ id })

  // Mutation to update the plant
  const { updatePlant, loading: updatingPlant } = useUpdatePlant({
    onCompleted: (data) => {
      showSuccessNotification(`Plant ${data.name} updated successfully!`)
      // Optionally redirect or show a success message
      navigate(routes.adminPlants())
    },
    onError: (error) => {
      showErrorNotification('Failed to update plant. Please try again.')
      console.error('Error updating plant:', error)
    },
  })

  // Map the fetched plant data to the form's default values
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
        })), // Map existing photos
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
      console.log('Plant updated successfully')
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error updating plant:', error)
    }
  }

  if (loadingPlant) {
    return <div>Loading...</div>
  }

  if (errorPlant) {
    return <div>Error loading plant: {errorPlant.message}</div>
  }

  return (
    <>
      <Metadata title="AdminEditPlant" description="AdminEditPlant page" />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminPlants())} // Go back to the previous page
          >
            Back
          </Button>
        </Group>
        {/* Page Title */}
        <Title order={1} mb="xl">
          Edit Plant
        </Title>
        <PlantForm
          onSubmit={handleSubmit}
          loading={updatingPlant}
          defaultValues={defaultValues} // Pass the mapped default values
        />
      </Container>
    </>
  )
}

export default AdminEditPlantPage
