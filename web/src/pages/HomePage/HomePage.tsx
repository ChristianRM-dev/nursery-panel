// web/src/pages/HomePage/HomePage.tsx
import { Button, Title, Text, Overlay, Container } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'

import classes from './HomePage.module.css'

const HomePage: React.FC = () => {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 100%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Bienvenidos a <span className={classes.highlight}>Los Laureles</span>
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Descubre la belleza natural en nuestro vivero. Plantas de calidad para
          tu hogar y jardín.
        </Text>
        <Button
          component={Link}
          to={routes.catalog()}
          size="xl"
          radius="xl"
          className={classes.control}
          mt={40}
        >
          Ver Catálogo
        </Button>
      </Container>
    </div>
  )
}

export default HomePage
