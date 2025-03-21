import { Carousel } from '@mantine/carousel'
import {
  Title,
  Container,
  Image,
  Card,
  Text,
  Group,
  Badge,
  Button,
} from '@mantine/core'
import { IconArrowLeft, IconEdit } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useGetPlantById } from 'src/hooks/Plants/useGetPlantById'

const AdminPlantDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { plant, loading, error } = useGetPlantById({ id })

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar la planta: {error.message}</div>
  }

  if (!plant) {
    return <div>Planta no encontrada</div>
  }

  return (
    <>
      <Metadata
        title="Detalles de la Planta"
        description="Página de Detalles de la Planta"
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

          {/* Edit Button */}
          <Button
            leftSection={<IconEdit size={16} />}
            variant="filled"
            onClick={() => navigate(routes.adminEditPlant({ id: plant.id }))}
          >
            Editar
          </Button>
        </Group>

        {/* Page Title */}
        <Title order={1} mb="xl">
          {plant.name}
        </Title>

        {/* Plant Details */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Detalles de la Planta
          </Text>

          <Group mb="sm">
            <Text fw={500}>Precio:</Text>
            <Text>${plant.price}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Inventario:</Text>
            <Text>{plant.stock}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Categoría:</Text>
            <Badge color="teal" variant="light">
              {plant.category.name}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Tipo de Presentación:</Text>{' '}
            <Badge color="blue" variant="light">
              {plant.presentationType}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Detalles de la Presentación:</Text>{' '}
            <Text>{plant.presentationDetails}</Text>
          </Group>
        </Card>

        {/* Carousel Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Fotos
          </Text>

          {/* Mantine Carousel */}
          <Carousel
            withIndicators
            height={300}
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
            slideGap={{ base: 0, sm: 'md' }}
            loop
            dragFree
            draggable
            align="start"
          >
            {plant.photos.map((photo, index) => (
              <Carousel.Slide key={index}>
                <Image
                  src={photo.url}
                  alt={`Planta ${index + 1}`}
                  height={300}
                  radius="md"
                  fit="cover"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card>
      </Container>
    </>
  )
}

export default AdminPlantDetailsPage
