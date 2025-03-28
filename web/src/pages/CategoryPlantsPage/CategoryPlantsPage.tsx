// web/src/pages/CategoryPlantsPage/CategoryPlantsPage.tsx
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Skeleton,
  Image,
  Badge,
  Group,
  Stack,
  Breadcrumbs,
  Anchor,
} from '@mantine/core'

import { Link, routes, useParams } from '@redwoodjs/router'

import { useGetCategoryWithPlants } from 'src/hooks/Categories/useGetCategoryWithPlants'

import classes from './CategoryPlantsPage.module.css'

const CategoryPlantsPage: React.FC = () => {
  const { id } = useParams()
  const { category, loading, error } = useGetCategoryWithPlants({ id })

  if (error) return <div>Error al cargar la categoría</div>
  if (!category && !loading) return <div>Categoría no encontrada</div>

  const items = [
    { title: 'Inicio', href: routes.home() },
    { title: 'Catálogo', href: routes.catalog() },
    { title: loading ? 'Cargando...' : category?.name, href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  return (
    <Container size="xl" py="xl">
      <Breadcrumbs mb="xl">{items}</Breadcrumbs>

      {loading ? (
        <>
          <Skeleton height={42} mb="xl" width="60%" />
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {[...Array(6)].map((_, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Skeleton height={160} />
                </Card.Section>
                <Skeleton height={24} mt="md" width="70%" />
                <Skeleton height={20} mt="sm" width="40%" />
              </Card>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <>
          <Stack gap="xs" mb="xl">
            <Title order={1}>{category.name}</Title>
            <Text c="dimmed">{category.description}</Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {category.plants.map((plant) => (
              <Card
                key={plant.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                component={Link}
                to={routes.plantDetails({ id: plant.id })}
                className={classes.card}
              >
                <Card.Section>
                  {plant.mainPhoto ? (
                    <Image
                      src={plant.mainPhoto}
                      height={160}
                      alt={plant.name}
                    />
                  ) : (
                    <Image
                      src="/plant-placeholder.jpg"
                      height={160}
                      alt="Placeholder"
                    />
                  )}
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{plant.name}</Text>
                  <Badge color="green">${plant.price.toFixed(2)}</Badge>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  )
}

export default CategoryPlantsPage
