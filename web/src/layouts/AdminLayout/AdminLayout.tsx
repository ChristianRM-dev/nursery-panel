// web/src/layouts/AdminLayout/AdminLayout.tsx
import {
  AppShell,
  Burger,
  Group,
  Text,
  ActionIcon,
  NavLink,
  Button,
} from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconSun,
  IconMoonStars,
  IconDashboard,
  IconCategory,
  IconPlant,
  IconHomeEco,
  IconUsersGroup,
  IconReportAnalytics,
  IconReceipt,
} from '@tabler/icons-react'

import { Link, routes } from '@redwoodjs/router'

const createIcon = (IconComponent: React.FC<any>) => (
  <IconComponent size={24} stroke={1.5} />
)

const AdminLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const navbarOptions = [
    {
      label: 'Panel de Control',
      route: routes.adminDashboard(),
      icon: createIcon(IconDashboard),
    },
    {
      label: 'Plantas',
      route: routes.adminPlants(),
      icon: createIcon(IconPlant),
    },
    {
      label: 'Categorias (Plantas)',
      route: routes.adminCategories(),
      icon: createIcon(IconCategory),
    },
    {
      label: 'Viveros',
      route: routes.adminNurseries(),
      icon: createIcon(IconHomeEco),
    },
    {
      label: 'Clientes',
      route: routes.adminCustomers(),
      icon: createIcon(IconUsersGroup),
    },
    {
      label: 'Notas de Venta',
      route: routes.adminSaleNotes(),
      icon: createIcon(IconReceipt),
    },
    {
      label: 'Reportes (Notas de Venta)',
      route: routes.adminSaleNoteReports(),
      icon: createIcon(IconReportAnalytics),
    },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="xl" fw="bold">
              Panel de Administración
            </Text>
          </Group>
          <Group>
            <Button component={Link} to={routes.home()} variant="subtle">
              Catalogo
            </Button>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Cambiar tema"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar p="md">
        {navbarOptions.map((option, index) => (
          <NavLink
            key={index}
            label={option.label}
            leftSection={option.icon}
            component={Link}
            to={option.route}
          />
        ))}
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout
