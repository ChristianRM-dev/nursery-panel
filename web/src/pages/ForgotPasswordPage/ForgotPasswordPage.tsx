import { useEffect, useRef } from 'react'

import { TextInput, Button, Card, Title, Flex, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // Focus on the username field on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string

    const response = await forgotPassword(username)

    if (response.error) {
      notifications.show({
        title: 'Error',
        message: response.error,
        color: 'red',
        icon: <IconX />,
      })
    } else {
      notifications.show({
        title: 'Éxito',
        message: `Se envió un enlace para restablecer su contraseña a ${response.email}`,
        color: 'green',
        icon: <IconCheck />,
      })
      navigate(routes.login())
    }
  }

  return (
    <>
      <Metadata title="Olvidé mi Contraseña" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Olvidé mi Contraseña
          </Title>

          <form onSubmit={onSubmit}>
            <Stack>
              <TextInput
                name="username"
                label="Nombre de usuario"
                placeholder="Ingrese su nombre de usuario"
                ref={usernameRef}
                required
              />
              <Button type="submit" fullWidth>
                Enviar
              </Button>
            </Stack>
          </form>
        </Card>
      </Flex>
    </>
  )
}

export default ForgotPasswordPage
