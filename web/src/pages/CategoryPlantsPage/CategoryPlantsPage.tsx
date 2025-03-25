// web/src/pages/CategoryPlantsPage/CategoryPlantsPage.tsx
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Skeleton,
} from '@mantine/core'

import { Link, routes, useParams } from '@redwoodjs/router'

import { useGetCategoryWithPlants } from 'src/hooks/Categories/useGetCategoryWithPlants'

const CategoryPlantsPage: React.FC = () => {
  const { id } = useParams()
  const { category, loading, error } = useGetCategoryWithPlants({
    id,
  })

  if (error) return <div>Error loading category</div>
  if (!category && !loading) return <div>Category not found</div>

  return (
    <Container size="xl" py={50}>
      {loading ? (
        <>
          <Skeleton h={42} mb={50} />
          <Skeleton h={24} mb={50} />
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {[...Array(6)].map((_, index) => (
              <Card key={index} shadow="sm" p="lg">
                <Card.Section>
                  <Skeleton h={200} />
                </Card.Section>
                <Skeleton h={28} mt="md" />
                <Skeleton h={24} mt="sm" />
              </Card>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <>
          <Title order={1} mb={50}>
            {category.name}
          </Title>
          <Text mb={50}>{category.description}</Text>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {category.plants.map((plant) => (
              <Card
                key={plant.id}
                shadow="sm"
                p="lg"
                component={Link}
                to={routes.plantDetails({ id: plant.id })}
              >
                <Card.Section>
                  {/* <Image
                    src={plant.photos[0]?.url || '/plant-placeholder.jpg'}
                    h={200}
                    alt={plant.name}
                  /> */}
                </Card.Section>
                <Title order={3} mt="md">
                  {plant.name}
                </Title>
                <Text mt="sm" fw={500}>
                  ${plant.price.toFixed(2)}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  )
}

export default CategoryPlantsPage
