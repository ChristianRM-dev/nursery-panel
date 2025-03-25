// web/src/pages/CatalogPage/CatalogPage.tsx
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Skeleton,
} from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

import { useGetCategoriesWithPlants } from 'src/hooks/Categories/useGetCategoriesWithPlants'

const CatalogPage: React.FC = () => {
  const { categories, loading, error } = useGetCategoriesWithPlants()

  if (error) return <div>Error loading categories</div>

  return (
    <Container size="xl" py={50}>
      <Title order={1} mb={50} ta="center">
        Our Plant Catalog
      </Title>

      {loading ? (
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
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {categories.map((category) => (
            <Card
              key={category.id}
              shadow="sm"
              p="lg"
              component={Link}
              to={routes.categoryPlants({ id: category.id })}
            >
              <Card.Section>
                <Image
                  src={category.image || '/plant-placeholder.jpg'}
                  h={200}
                  alt={category.name}
                />
              </Card.Section>
              <Title order={3} mt="md">
                {category.name}
              </Title>
              <Text mt="sm" c="dimmed">
                {category.plants.length} plants available
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default CatalogPage
