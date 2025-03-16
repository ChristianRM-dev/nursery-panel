import { AppShell, Burger, Group, Text, ActionIcon, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSun, IconMoonStars, IconDashboard, IconUsers, IconSettings } from '@tabler/icons-react'
import { useMantineColorScheme } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

const AdminLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'



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
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="xl" fw="bold">
              Admin Panel
            </Text>
          </Group>
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar p="md">
        <NavLink
          label="Dashboard"
          leftSection={<IconDashboard size={20} />}
          component={Link}
          to={routes.adminDashboard()}
        />
        {/* <NavLink
          label="Users"
          leftSection={<IconUsers size={20} />}
          component={Link}
          to={routes.adminUsers()}
        />
        <NavLink
          label="Settings"
          leftSection={<IconSettings size={20} />}
          component={Link}
          to={routes.adminSettings()}
        /> */}
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AdminLayout