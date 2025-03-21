// web/src/pages/AdminNewCategoryPage/AdminNewCategoryPage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { CategoryForm } from 'src/components/Category/CategoryForm/CategoryForm'
import { CategoryFormValues } from 'src/components/Category/CategoryForm/CategoryForm.schema'
import { useCreateCategory } from 'src/hooks/Categories/useCreateCategory'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapCategoryFormValuesToCreateCategoryInput } from 'src/utils/Mappers'

const AdminNewCategoryPage: React.FC = () => {
  const defaultValues: CategoryFormValues = {
    name: '',
    description: '',
  }

  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const { createCategory, loading } = useCreateCategory({
    onCompleted: (data) => {
      showSuccessNotification(`¡Categoría "${data.name}" creada correctamente!`)
      navigate(routes.adminCategories())
    },
    onError: (error) => {
      console.error('Error creating category:', error)
      showErrorNotification(
        'Error al crear la categoría. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const handleSubmit = async (values: CategoryFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapCategoryFormValuesToCreateCategoryInput(values)

      // Call the createCategory mutation
      await createCategory(input)

      // Handle success (e.g., show a notification, redirect, etc.)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error creating category:', error)
    }
  }

  return (
    <>
      <Metadata
        title="AdminCategoriesNew"
        description="Página de Creación de Categorías"
      />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminCategories())}
          >
            Volver
          </Button>
        </Group>
        {/* Page Title */}
        <Title order={1} mb="xl">
          Crear Categoría
        </Title>
        <CategoryForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminNewCategoryPage
