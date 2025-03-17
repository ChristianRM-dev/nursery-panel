// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { PlantForm } from 'src/components/Plant/PlantForm/PlantForm'
import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schems'
import { Title, Container } from '@mantine/core'

const AdminNewPlantPage: React.FC = () => {
  const handleSubmit = async (values: PlantFormValues) => {
    try {
      console.log("handleSubmit",values)
      // Replace with your actual API call
      const response = await fetch('/api/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to create plant')
      }

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
        <PlantForm onSubmit={handleSubmit} loading={true} />
      </Container>
    </>
  )
}

export default AdminNewPlantPage
