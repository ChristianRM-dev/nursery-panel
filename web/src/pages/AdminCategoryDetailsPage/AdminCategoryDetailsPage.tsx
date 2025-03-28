// web/src/pages/AdminCategoryDetailsPage/AdminCategoryDetailsPage.tsx
import {
  Title,
  Container,
  Image, // Added Image component
  Card,
  Text,
  Group,
  Badge,
  Button,
} from '@mantine/core'
import { IconArrowLeft, IconEdit } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useGetCategoryById } from 'src/hooks/Categories/useGetCategoryById'

const AdminCategoryDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { category, loading, error } = useGetCategoryById({ id })

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar la categoría: {error.message}</div>
  }

  if (!category) {
    return <div>Categoría no encontrada</div>
  }

  return (
    <>
      <Metadata
        title="Detalles de la Categoría"
        description="Página de Detalles de la Categoría"
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

          {/* Edit Button */}
          <Button
            leftSection={<IconEdit size={16} />}
            variant="filled"
            onClick={() =>
              navigate(routes.adminEditCategory({ id: category.id }))
            }
          >
            Editar
          </Button>
        </Group>

        {/* Page Title */}
        <Title order={1} mb="xl">
          {category.name}
        </Title>

        {/* Category Details */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Detalles de la Categoría
          </Text>

          <Group mb="sm">
            <Text fw={500}>Nombre:</Text>
            <Text>{category.name}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Descripción:</Text>
            <Text>{category.description || 'Sin descripción'}</Text>
          </Group>
        </Card>

        {/* Image Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Imagen de la Categoría
          </Text>

          {/* Display the image if available */}
          {category.image ? (
            <Image
              src={category.image}
              alt={`Imagen de la categoría ${category.name}`}
              height={160}
              width="auto"
              radius="md"
              fit="contain"
              style={{ maxWidth: '100%' }}
              loading="lazy"
            />
          ) : (
            <Text>No hay imagen disponible para esta categoría</Text>
          )}
        </Card>

        {/* Plants Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Plantas en esta Categoría
          </Text>

          {category.plants.length > 0 ? (
            <Group gap="md">
              {category.plants.map((plant) => (
                <Card
                  key={plant.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Text fw={500}>{plant.name}</Text>
                  <Text size="sm">Precio: ${plant.price}</Text>
                  <Text size="sm">Inventario: {plant.stock}</Text>
                  <Badge color="teal" variant="light" mt="sm">
                    {plant.presentationType}
                  </Badge>
                </Card>
              ))}
            </Group>
          ) : (
            <Text>No hay plantas en esta categoría.</Text>
          )}
        </Card>
      </Container>
    </>
  )
}

export default AdminCategoryDetailsPage
