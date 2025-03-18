import { Metadata } from '@redwoodjs/web'
import { useParams, navigate, routes } from '@redwoodjs/router'
import {
  Title,
  Container,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
} from '@mantine/core'
import { useGetPlantById } from 'src/hooks/Plants/useGetPlantById'
import { IconArrowLeft } from '@tabler/icons-react'

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
        <Grid>
          {/* Details Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
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
                  {plant.categoryId}
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
          </Grid.Col>

          {/* Photos Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" fw={500} mb="md">
                Photos
              </Text>

              <Grid>
                {plant.photos.map((photo, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                    <Image
                      src={photo}
                      alt={`Plant Photo ${index + 1}`}
                      radius="md"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export default AdminPlantDetailsPage
