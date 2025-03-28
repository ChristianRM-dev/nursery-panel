// web/src/pages/CatalogPage/CatalogPage.tsx
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Skeleton,
  Badge,
  Group,
  Center,
} from '@mantine/core'
import { IconPlant } from '@tabler/icons-react'

import { Link, routes } from '@redwoodjs/router'

import { useGetCategoriesWithPlants } from 'src/hooks/Categories/useGetCategoriesWithPlants'

import classes from './CatalogPage.module.css'

const CatalogPage: React.FC = () => {
  const { categories, loading, error } = useGetCategoriesWithPlants()

  if (error) return <div>Error al cargar las categorías</div>

  const placeholderCategories = [...Array(6)].map((_, index) => (
    <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={160} />
      </Card.Section>
      <Skeleton height={24} mt="md" width="70%" />
      <Skeleton height={16} mt="sm" width="40%" />
    </Card>
  ))

  return (
    <Container size="xl" py="xl">
      <Title order={1} ta="center" mb="xl" mt="xl">
        Nuestras Categorías de Plantas
      </Title>

      {loading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {placeholderCategories}
        </SimpleGrid>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {categories.map((category) => (
            <Card
              key={category.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              component={Link}
              to={routes.categoryPlants({ id: category.id })}
              className={classes.card}
            >
              <Card.Section>
                {category.image ? (
                  <Image
                    src={category.image}
                    height={160}
                    alt={category.name}
                  />
                ) : (
                  <Center bg="gray.1" h={160}>
                    <IconPlant
                      size="3rem"
                      color="var(--mantine-color-green-6)"
                    />
                  </Center>
                )}
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{category.name}</Text>
                <Badge color="green" variant="light">
                  {category.plants.length} plantas
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2}>
                {category.description ||
                  'Descubre nuestra selección de plantas en esta categoría'}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default CatalogPage
