// web/src/pages/AdminNewPlantPage/AdminNewPlantPage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { PlantForm } from 'src/components/Plant/PlantForm/PlantForm'
import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
import { useCreatePlant } from 'src/hooks/Plants/useCreatePlant'
import { useNotifications } from 'src/hooks/useNotifications'
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
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const { createPlant, loading } = useCreatePlant({
    onCompleted: (data) => {
      showSuccessNotification(`¡Planta "${data.name}" creada correctamente!`)
      navigate(routes.adminPlants())
    },
    onError: (error) => {
      console.error('Error creating plant:', error)
      showErrorNotification(
        'Error al crear la planta. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const handleSubmit = async (values: PlantFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapPlantFormValuesToCreatePlantInput(values).then()

      // Call the createPlant mutation
      await createPlant(input)

      // Handle success (e.g., show a notification, redirect, etc.)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error creating plant:', error)
    }
  }

  return (
    <>
      <Metadata
        title="AdminPlantsNew"
        description="Página de Creación de Plantas"
      />
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
          Crear Planta
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
