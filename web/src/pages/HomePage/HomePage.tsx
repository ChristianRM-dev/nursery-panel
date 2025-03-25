// web/src/pages/HomePage/HomePage.tsx
import {
  Button,
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
} from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

const HomePage: React.FC = () => {
  return (
    <>
      <Container
        size="md"
        h={500}
        style={{
          backgroundImage: 'url(/nursery-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        p="md"
      >
        <Title order={1} c="white" mb="xl">
          Welcome to Our Nursery
        </Title>
        <Text c="white" size="xl" mb="xl">
          Discover the perfect plants for your home and garden
        </Text>
        <Button
          component={Link}
          to={routes.catalog()}
          size="lg"
          variant="white"
        >
          Browse Our Catalog
        </Button>
      </Container>

      <Container py={50}>
        <Title order={2} ta="center" mb={50}>
          Featured Categories
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {featuredCategories.map((category) => (
            <Card
              key={category.id}
              shadow="sm"
              p="lg"
              component={Link}
              to={routes.categoryPlants({ id: category.id })}
            >
              <Card.Section>
                <Image src={category.image} h={200} alt={category.name} />
              </Card.Section>
              <Title order={3} mt="md">
                {category.name}
              </Title>
              <Text mt="sm" c="dimmed">
                {category.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

// Temporary data - replace with actual data from your API
const featuredCategories = [
  {
    id: '1',
    name: 'Indoor Plants',
    description: 'Perfect for your home interior',
    image: '/indoor-plants.jpg',
  },
  // Add more categories...
]

export default HomePage
