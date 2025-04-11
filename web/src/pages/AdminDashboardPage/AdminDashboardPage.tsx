import { ReactNode } from 'react'

import {
  Card,
  SimpleGrid,
  ThemeIcon,
  Text,
  Group,
  Title,
  Stack,
} from '@mantine/core'
import {
  IconPlant,
  IconReceipt,
  IconUserPlus,
  IconDashboard,
} from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AdminDashboardPage: React.FC = () => {
  return (
    <>
      <Metadata
        title="PanelAdministrativo"
        description="Página de panel administrativo"
      />

      <Stack gap="xl">
        {/* Dashboard Header */}
        <Group>
          <ThemeIcon variant="light" color="blue" size="lg">
            <IconDashboard size="1.2rem" />
          </ThemeIcon>
          <Title order={2}>Panel de Administración</Title>
        </Group>

        {/* Quick Actions Section */}
        <div>
          <Text size="sm" c="dimmed" mb="sm">
            Acciones Rápidas
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <QuickActionCard
              icon={<IconPlant size="1.8rem" />}
              color="green"
              label="Nueva Planta"
              description="Agregar una nueva planta al inventario"
              onClick={() => navigate(routes.adminNewPlant())}
            />
            <QuickActionCard
              icon={<IconReceipt size="1.8rem" />}
              color="blue"
              label="Nueva Nota de Venta"
              description="Crear una nueva transacción de venta"
              onClick={() => navigate(routes.adminNewSaleNote())}
            />
            <QuickActionCard
              icon={<IconUserPlus size="1.8rem" />}
              color="orange"
              label="Nuevo Cliente"
              description="Registrar un nuevo cliente"
              onClick={() => navigate(routes.adminNewCustomer())}
            />
          </SimpleGrid>
        </div>
      </Stack>
    </>
  )
}

interface QuickActionCardProps {
  icon: ReactNode
  color: string
  label: string
  description?: string
  onClick: () => void
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  color,
  label,
  description,
  onClick,
}) => {
  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      component="a"
    >
      <Card.Section ta="center" p="md">
        <ThemeIcon variant="light" color={color} size="xl" radius="xl" mb="sm">
          {icon}
        </ThemeIcon>
        <Text fw={500} size="lg">
          {label}
        </Text>
        {description && (
          <Text size="sm" c="dimmed" mt="xs">
            {description}
          </Text>
        )}
      </Card.Section>
    </Card>
  )
}

export default AdminDashboardPage
