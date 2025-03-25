// web/src/pages/PlantDetailsPage/PlantDetailsPage.tsx
import {
  Container,
  Image,
  Title,
  Text,
  Group,
  Badge,
  Card,
  SimpleGrid,
} from '@mantine/core'

import { useParams } from '@redwoodjs/router'

import { useGetPlantDetails } from 'src/hooks/Plants/useGetPlantDetails'

const PlantDetailsPage: React.FC = () => {
  const { id } = useParams()
  const { plant, loading, error } = useGetPlantDetails({ id })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading plant: {error.message}</div>
  if (!plant) return <div>Plant not found</div>

  return (
    <Container size="lg" py="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={1}>{plant.name}</Title>
          <Badge color="teal" size="xl">
            ${plant.price.toFixed(2)}
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <div>
            {plant.photos.length > 0 ? (
              <Image
                src={plant.photos[0].url}
                alt={plant.name}
                radius="md"
                height={400}
                fit="cover"
              />
            ) : (
              <Image
                src="/plant-placeholder.jpg"
                alt="Placeholder"
                height={400}
                radius="md"
              />
            )}
          </div>

          <div>
            <Group mb="md">
              <Badge color="blue" variant="light">
                {plant.presentationType}
              </Badge>
              <Badge color="green" variant="light">
                {plant.category.name}
              </Badge>
            </Group>

            {plant.presentationDetails && (
              <Text size="lg" mb="md">
                <Text span fw={500}>
                  Presentation Details:
                </Text>{' '}
                {plant.presentationDetails}
              </Text>
            )}

            <Text size="lg" mb="md">
              <Text span fw={500}>
                Stock:
              </Text>{' '}
              {plant.stock} available
            </Text>

            {plant.photos.length > 1 && (
              <>
                <Title order={3} mt="xl" mb="sm">
                  More Images
                </Title>
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
                  {plant.photos.slice(1).map((photo, index) => (
                    <Image
                      key={index}
                      src={photo.url}
                      alt={`${plant.name} ${index + 2}`}
                      radius="sm"
                      height={120}
                    />
                  ))}
                </SimpleGrid>
              </>
            )}
          </div>
        </SimpleGrid>
      </Card>
    </Container>
  )
}

export default PlantDetailsPage
