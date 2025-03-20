// web/src/pages/AdminNewPlantPage/AdminNewPlantPage.tsx
import { Title, Container } from '@mantine/core'

import { Metadata } from '@redwoodjs/web'

import { PlantForm } from 'src/components/Plant/PlantForm/PlantForm'
import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
import { useCreatePlant } from 'src/hooks/Plants/useCreatePlant'
import { useNotifications } from 'src/hooks/useNotifications' // Import the custom hook
import { mapPlantFormValuesToCreatePlantInput } from 'src/utils/Mappers'

const AdminNewPlantPage: React.FC = () => {
  const defaultValues: PlantFormValues = {
    name: '',
    price: 1,
    stock: 1,
    categoryId: '',
    presentationType: '',
    presentationDetails: '',
    photos: [],
  }
  const { showSuccessNotification, showErrorNotification } = useNotifications() // Use the custom hook

  const { createPlant, loading } = useCreatePlant({
    onCompleted: (data) => {
      console.log('Plant created successfully:', data)
      showSuccessNotification('Plant created successfully!') // Show success notification
      // Optionally redirect or show a success message
    },
    onError: (error) => {
      console.error('Error creating plant:', error)
      showErrorNotification('Failed to create plant. Please try again.') // Show error notification
      // Optionally show an error message
    },
  })

  const handleSubmit = async (values: PlantFormValues) => {
    try {
      console.log('handleSubmit', values)

      // Map form values to the input expected by the mutation
      const input = await mapPlantFormValuesToCreatePlantInput(values).then()

      // Call the createPlant mutation
      await createPlant(input)

      // Handle success (e.g., show a notification, redirect, etc.)
      console.log('Plant created successfully')
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error creating plant:', error)
    }
  }

  return (
    <>
      <Metadata title="AdminPlantsNew" description="AdminPlantsNew page" />
      <Container size="xl" py="xs">
        {/* Page Title */}
        <Title order={1} mb="xl">
          Create Plant
        </Title>
        <PlantForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminNewPlantPage
