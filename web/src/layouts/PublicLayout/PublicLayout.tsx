// web/src/layouts/PublicLayout/PublicLayout.tsx
import { Container, AppShell, Group, Button, Image } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

const PublicLayout = ({ children }) => {
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header px="md">
        <Group justify="space-between" h="100%">
          <Link to={routes.home()}>
            <Image
              src="/logo.png"
              alt="Logo de The Laurels"
              height={50}
              fit="contain"
            />
          </Link>
          <Group gap="lg">
            <Button
              component={Link}
              to={routes.catalog()}
              variant="subtle"
              size="md"
            >
              Catálogo
            </Button>
            {/* <Button
              component={Link}
              to={routes.about()}
              variant="subtle"
              size="md"
            >
              Nosotros
            </Button>
            <Button
              component={Link}
              to={routes.contact()}
              variant="subtle"
              size="md"
            >
              Contacto
            </Button> */}
          </Group>
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
