// web/src/pages/AdminNurseryDetailsPage/AdminNurseryDetailsPage.tsx
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
import { IconArrowLeft, IconEdit } from '@tabler/icons-react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useGetNurseryById } from 'src/hooks/Nurseries/useGetNurseryById'

const AdminNurseryDetailsPage: React.FC = () => {
  const { id } = useParams()

  const { nursery, loading, error } = useGetNurseryById({ id })

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar el vivero: {error.message}</div>
  }

  if (!nursery) {
    return <div>Vivero no encontrado</div>
  }

  return (
    <>
      <Metadata
        title="Detalles del Vivero"
        description="Página de Detalles del Vivero"
      />
      <Container size="xl" py="xs">
        {/* Back and Edit Buttons */}
        <Group justify="space-between" mb="md">
          {/* Back Button */}
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminNurseries())}
          >
            Volver
          </Button>

          {/* Edit Button */}
          <Button
            leftSection={<IconEdit size={16} />}
            variant="filled"
            onClick={() =>
              navigate(routes.adminEditNursery({ id: nursery.id }))
            }
          >
            Editar
          </Button>
        </Group>

        {/* Page Title */}
        <Title order={1} mb="xl">
          {nursery.name}
        </Title>

        {/* Nursery Details */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Text size="lg" fw={500} mb="md">
            Detalles del Vivero
          </Text>

          <Group mb="sm">
            <Text fw={500}>Dirección:</Text>
            <Text>{nursery.address}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>Teléfono:</Text>
            <Text>{nursery.phone}</Text>
          </Group>

          <Group mb="sm">
            <Text fw={500}>RFC:</Text>
            <Badge color="teal" variant="light">
              {nursery.rfc}
            </Badge>
          </Group>
        </Card>

        {/* Logo Section */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={500} mb="md">
            Logo
          </Text>

          {/* Display the logo if available */}
          {nursery.logo && (
            <Image
              src={nursery.logo}
              alt="Logo del vivero"
              height={160} // Reduced from 300px
              width="auto" // Maintain aspect ratio
              radius="md"
              fit="contain" // Changed from cover to prevent cropping
              style={{ maxWidth: '100%' }} // Prevent overflow on mobile
              loading="lazy" // Enable lazy loading
            />
          )}
        </Card>
      </Container>
    </>
  )
}

export default AdminNurseryDetailsPage
