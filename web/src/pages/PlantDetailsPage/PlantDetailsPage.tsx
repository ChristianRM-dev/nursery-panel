// web/src/pages/PlantDetailsPage/PlantDetailsPage.tsx
import {
  Container,
  Title,
  Text,
  Group,
  Badge,
  Card,
  SimpleGrid,
  Skeleton,
  Stack,
  Breadcrumbs,
  Anchor,
  Divider,
  Table,
  Button,
  Image, // Import Image from Mantine
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { Link, routes, useParams } from '@redwoodjs/router'

import ImageGallery from 'src/components/Shared/ImageGallery/ImageGallery'
import { useGetPlantDetails } from 'src/hooks/Plants/useGetPlantDetails'

import 'react-image-gallery/styles/css/image-gallery.css'
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

  if (loading)
    return (
      <Container size="lg" py="xl">
        <Skeleton height={30} mb="xl" width="60%" />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Skeleton height={400} />
          <Stack>
            <Skeleton height={40} width="80%" />
            <Skeleton height={30} width="60%" />
            <Skeleton height={100} />
            <Skeleton height={200} />
          </Stack>
        </SimpleGrid>
      </Container>
    )

  if (error) return <div>Error al cargar la planta: {error.message}</div>
  if (!plant) return <div>Planta no encontrada</div>

  const galleryImages = plant.photos.map((photo) => ({
    original: photo.url,
    thumbnail: photo.url,
    originalAlt: plant.name,
    thumbnailAlt: plant.name,
  }))

  return (
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

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <div className={classes.galleryContainer}>
            {galleryImages.length > 0 ? (
              <>
                <ImageGallery images={galleryImages} />
              </>
            ) : (
              <Image
                src="/plant-placeholder.jpg"
                alt={plant.name}
                radius="md"
                height={400}
                fit="cover"
              />
            )}
          </div>

          <Stack>
            <Group justify="space-between">
              <Title order={1}>{plant.name}</Title>
              {/* <Badge color="green" size="xl" variant="light">
                ${plant.price.toFixed(2)}
              </Badge> */}
            </Group>

            <Group>
              <Badge color="blue" variant="light">
                {plant.presentationType}
              </Badge>
              <Badge color="teal" variant="light">
                {plant.category.name}
              </Badge>
            </Group>

            {plant.presentationDetails && (
              <Text size="lg">{plant.presentationDetails}</Text>
            )}

            <Divider my="sm" />

            <Table
              striped
              highlightOnHover
              withTableBorder
              className={classes.detailsTable}
            >
              <Table.Tbody>
                <Table.Tr>
                  {/* <Table.Th>Disponibilidad</Table.Th>
                  <Table.Td>
                    {plant.stock > 0 ? (
                      <Badge color="green">En stock ({plant.stock})</Badge>
                    ) : (
                      <Badge color="red">Agotado</Badge>
                    )}
                  </Table.Td> */}
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Tipo de Presentación</Table.Th>
                  <Table.Td>
                    {plant.presentationType === 'BAG' && 'Bolsa'}
                    {plant.presentationType === 'POT' && 'Maceta'}
                    {plant.presentationType === 'HANGING' && 'Colgante'}
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

            {/* <Button
              leftSection={<IconShoppingCart size={20} />}
              size="lg"
              radius="xl"
              mt="xl"
              disabled={plant.stock <= 0}
              className={classes.addToCartButton}
            >
              {plant.stock > 0 ? 'Añadir al carrito' : 'No disponible'}
            </Button> */}
          </Stack>
        </SimpleGrid>
      </Card>
    </Container>
  )
}

export default PlantDetailsPage
