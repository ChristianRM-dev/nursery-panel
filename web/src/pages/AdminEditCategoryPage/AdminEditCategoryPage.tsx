// web/src/pages/AdminEditCategoryPage/AdminEditCategoryPage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { CategoryForm } from 'src/components/Category/CategoryForm/CategoryForm'
import { CategoryFormValues } from 'src/components/Category/CategoryForm/CategoryForm.schema'
import { useGetCategoryById } from 'src/hooks/Categories/useGetCategoryById'
import { useUpdateCategory } from 'src/hooks/Categories/useUpdateCategory'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapCategoryFormValuesToUpdateCategoryInput } from 'src/utils/Mappers'

const AdminEditCategoryPage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    category,
    loading: loadingCategory,
    error: errorCategory,
  } = useGetCategoryById({ id })

  const { updateCategory, loading: updatingCategory } = useUpdateCategory({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Categoría "${data.name}" actualizada correctamente!`
      )
      navigate(routes.adminCategories())
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar la categoría. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating category:', error)
    },
  })

  const defaultValues: CategoryFormValues = category
    ? {
        name: category.name,
        description: category.description || '',
        image: category.image ? { url: category.image } : null,
      }
    : {
        name: '',
        description: '',
        image: null,
      }

  const handleSubmit = async (values: CategoryFormValues) => {
    try {
      // Map form values to the input expected by the mutation
      const input = await mapCategoryFormValuesToUpdateCategoryInput(values)

      // Call the updateCategory mutation
      await updateCategory(id, input)

      // Handle success (e.g., show a notification, redirect, etc.)
      console.log('Categoría actualizada correctamente')
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error al actualizar la categoría:', error)
    }
  }

  if (loadingCategory) {
    return <LoadingOverlay visible />
  }

  if (errorCategory) {
    return <div>Error al cargar la categoría: {errorCategory.message}</div>
  }

  return (
    <>
      <Metadata
        title="AdminEditCategory"
        description="Página de Edición de Categorías"
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
          Editar Categoría
        </Title>
        <CategoryForm
          onSubmit={handleSubmit}
          loading={updatingCategory}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminEditCategoryPage
