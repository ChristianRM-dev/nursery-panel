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
import { IconArrowLeft } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useGetPlantById } from 'src/hooks/Plants/useGetPlantById'

const AdminPlantDetailsPage: React.FC = () => {
  const { id } = useParams() // Get the plant ID from the URL

  // Fetch the plant data
  const { plant, loading, error } = useGetPlantById({ id })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading plant: {error.message}</div>
  }

  if (!plant) {
    return <div>Plant not found</div>
  }

  return (
    <>
      <Metadata title="Plant Details" description="Plant Details page" />
      <Container size="xl" py="xs">
        {/* Back Button */}
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          onClick={() => navigate(routes.adminPlants())} // Go back to the previous page
          mb="md"
        >
          Back
        </Button>

        {/* Page Title */}
        <Title order={1} mb="xl">
          {plant.name}
        </Title>

        {/* Plant Details */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Plant Details
          </Text>

          <Group mb="sm">
            <Text fw={500}>Price:</Text>
            <Text>${plant.price}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Stock:</Text>
            <Text>{plant.stock}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Category:</Text>
            <Badge color="teal" variant="light">
              {plant.category.name}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Presentation Type:</Text>
            <Badge color="blue" variant="light">
              {plant.presentationType}
            </Badge>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Presentation Details:</Text>
            <Text>{plant.presentationDetails}</Text>
          </Group>
        </Card>

        {/* Carousel Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Photos
          </Text>

          {/* Mantine Carousel */}
          <Carousel
            withIndicators
            height={300} // Adjust height as needed
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
                  alt={`Plant ${index + 1}`} // Improved alt text
                  height={300} // Set a fixed height for consistency
                  radius="md" // Rounded corners
                  fit="cover" // Ensures the image covers the container
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
