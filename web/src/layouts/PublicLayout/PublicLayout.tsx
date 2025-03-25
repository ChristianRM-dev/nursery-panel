// web/src/layouts/PublicLayout/PublicLayout.tsx
import { Container, AppShell, Group, Button, Image } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

const PublicLayout = ({ children }) => {
  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Link to={routes.home()}>
            <Image src="/logo.png" alt="Nursery Logo" height={40} />
          </Link>
          <Group>
            <Button component={Link} to={routes.catalog()} variant="subtle">
              Catalog
            </Button>
            {/* <Button component={Link} to={routes.about()} variant="subtle">
              About Us
            </Button>
            <Button component={Link} to={routes.contact()} variant="subtle">
              Contact
            </Button> */}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl">{children}</Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default PublicLayout
