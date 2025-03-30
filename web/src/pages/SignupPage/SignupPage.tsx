import { useEffect, useRef } from 'react'

import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Title,
  Text,
  Flex,
  Stack,
  Anchor,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.admin())
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
    const password = formData.get('password') as string

    const response = await signUp({ username, password })

    if (response.message) {
      notifications.show({
        title: 'Mensaje',
        message: response.message,
        color: 'blue',
        icon: <IconCheck />,
      })
    } else if (response.error) {
      notifications.show({
        title: 'Error',
        message: response.error,
        color: 'red',
        icon: <IconX />,
      })
    } else {
      notifications.show({
        title: 'Éxito',
        message: '¡Bienvenido!',
        color: 'green',
        icon: <IconCheck />,
      })
    }
  }

  return (
    <>
      <Metadata title="Registro" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Registrarse
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
              <PasswordInput
                name="password"
                label="Contraseña"
                placeholder="Ingrese su contraseña"
                required
              />
              <Button type="submit" fullWidth>
                Registrarse
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="md">
            ¿Ya tienes una cuenta?{' '}
            <Anchor component={Link} to={routes.login()}>
              ¡Inicia sesión!
            </Anchor>
          </Text>
        </Card>
      </Flex>
    </>
  )
}

export default SignupPage
