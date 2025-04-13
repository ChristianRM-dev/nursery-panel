import {
  Container,
  Title,
  Text,
  Group,
  Badge,
  Card,
  SimpleGrid,
  Stack,
  Breadcrumbs,
  Anchor,
  Divider,
  Table,
  Button,
  Image,
  LoadingOverlay,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { Link, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import 'react-image-gallery/styles/css/image-gallery.css'

import ImageGallery from 'src/components/Shared/ImageGallery/ImageGallery'
import { useGetPlantDetails } from 'src/hooks/Plants/useGetPlantDetails'
import { formatPlantPresentationType } from 'src/utils/Formatters'

import classes from './PlantDetailsPage.module.css'

const PlantDetailsPage: React.FC = () => {
  const { id } = useParams()
  const { plant, loading, error } = useGetPlantDetails({ id })

  const items = [
    { title: 'Inicio', href: routes.home() },
    { title: 'Catálogo', href: routes.catalog() },
    {
      title: loading ? 'Cargando...' : plant?.category.name,
      href: loading ? '#' : routes.categoryPlants({ id: plant?.category.id }),
    },
    { title: loading ? 'Cargando...' : plant?.name, href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  if (loading) {
    return <LoadingOverlay visible />
  }

  if (error) return <div>Error al cargar la planta: {error.message}</div>
  if (!plant) return <div>Planta no encontrada</div>

  const galleryImages = plant.photos.map((photo) => ({
    original: photo.url,
    thumbnail: photo.url,
    originalAlt: plant.name,
    thumbnailAlt: plant.name,
  }))

  return (
    <>
      <Metadata
        title={`Los Laureles - ${plant.name}`}
        description={`Vivero los laureles - ${plant.name}`}
      />
      <Container size="lg" py="xl">
        <Breadcrumbs mb="xl">{items}</Breadcrumbs>

        <Button
          component={Link}
          to={routes.categoryPlants({ id: plant.category.id })}
          leftSection={<IconArrowLeft size={14} />}
          variant="subtle"
          mb="xl"
          className={classes.backButton}
        >
          Volver a {plant.category.name}
        </Button>

        {/* Main plant info card */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <SimpleGrid cols={{ base: 1 }} spacing="xl">
            <Stack>
              <Group justify="space-between" align="flex-start">
                <div>
                  <Title order={1}>{plant.name}</Title>
                  <Group mt="sm">
                    <Badge color="blue" variant="light">
                      {formatPlantPresentationType(plant.presentationType)}
                    </Badge>
                    <Badge color="teal" variant="light">
                      {plant.category.name}
                    </Badge>
                  </Group>
                </div>
                {/* Uncomment if you want to show price */}
                {/* <Badge color="green" size="xl" variant="light">
                ${plant.price.toFixed(2)}
              </Badge> */}
              </Group>

              {plant.presentationDetails && (
                <Text size="lg" mt="sm">
                  {plant.presentationDetails}
                </Text>
              )}

              <Divider my="md" />

              <Table
                striped
                highlightOnHover
                withTableBorder
                className={classes.detailsTable}
              >
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th>Tipo de Presentación</Table.Th>
                    <Table.Td>
                      {formatPlantPresentationType(plant.presentationType)}
                    </Table.Td>
                  </Table.Tr>
                  {plant.presentationDetails && (
                    <Table.Tr>
                      <Table.Th>Detalles de Presentación</Table.Th>
                      <Table.Td>{plant.presentationDetails}</Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Stack>
          </SimpleGrid>
        </Card>

        {/* Full-width gallery section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">
            Galería de imágenes
          </Title>
          {galleryImages.length > 0 ? (
            <ImageGallery images={galleryImages} />
          ) : (
            <Image
              src="/plant-placeholder.jpg"
              alt={plant.name}
              radius="md"
              height={400}
              fit="cover"
              w="100%"
            />
          )}
        </Card>
      </Container>
    </>
  )
}

export default PlantDetailsPage
