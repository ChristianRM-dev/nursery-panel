// web/src/layouts/PublicLayout/PublicLayout.tsx
import { Container, AppShell, Group, Button, Text } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

const PublicLayout = ({ children }) => {
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header px="md">
        <Group justify="space-between" h="100%">
          <Link to={routes.home()} style={{ textDecoration: 'none' }}>
            <Text
              size="xl"
              fw={700}
              style={{
                fontFamily: 'Georgia, serif',
                color: '#2b8a3e', // A deep green color
                fontSize: '1.8rem',
                letterSpacing: '1px',
              }}
            >
              Los Laureles
            </Text>
          </Link>
          <Group gap="lg"></Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl" px={0}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default PublicLayout
