import { Flex, Card, Title, Text } from '@mantine/core'

// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful :)

// This import will be automatically removed when building for production

const CustomDevFatalErrorPage = () => (
  <Flex justify="center" align="center" h="100vh" bg="gray.1">
    <Card withBorder shadow="sm" p="lg" w={400}>
      <Title order={1} ta="center" mb="md">
        Algo salió mal {/* Translated to Spanish */}
      </Title>
      <Text ta="center" c="dimmed">
        Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.{' '}
        {/* Translated to Spanish */}
      </Text>
    </Card>
  </Flex>
)

export default CustomDevFatalErrorPage
