import { Metadata } from '@redwoodjs/web'
import { useParams } from '@redwoodjs/router'
import { Title, Container } from '@mantine/core'
import { PlantForm } from 'src/components/Plant/PlantForm/PlantForm'
import { useNotifications } from 'src/hooks/useNotifications'
import { useGetPlantById } from 'src/hooks/Plants/useGetPlantById'
import { useUpdatePlant } from 'src/hooks/Plants/useUpdatePlant'
import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
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
      showSuccessNotification('Plant updated successfully!')
      // Optionally redirect or show a success message
    },
    onError: (error) => {
      showErrorNotification('Failed to update plant. Please try again.')
      console.error('Error updating plant:', error)
    },
  })

  const handleSubmit = async (values: PlantFormValues) => {
    try {
      console.log('handleSubmit', values)

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
        {/* Page Title */}
        <Title order={1} mb="xl">
          Edit Plant
        </Title>
        <PlantForm
          onSubmit={handleSubmit}
          loading={updatingPlant}
          defaultValues={plant} // Pass the fetched plant data as default values
        />
      </Container>
    </>
  )
}

export default AdminEditPlantPage
