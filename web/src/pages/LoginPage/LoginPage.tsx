import { useEffect, useRef, useState } from 'react'

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

const WELCOME_MESSAGE = '¡Bienvenido de nuevo!'
const REDIRECT = routes.adminDashboard()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )

  // Redirect after login or WebAuthn setup
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT)
    }
  }, [isAuthenticated, shouldShowWebAuthn, webAuthn])

  // Show WebAuthn prompt on page load if enabled
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated])

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

    const webAuthnSupported = await webAuthn.isSupported()

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true)
    }

    const response = await logIn({ username, password })

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
      if (webAuthnSupported) {
        setShowWebAuthn(true)
      } else {
        notifications.show({
          title: 'Éxito',
          message: WELCOME_MESSAGE,
          color: 'green',
          icon: <IconCheck />,
        })
      }
    }
  }

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
      notifications.show({
        title: 'Éxito',
        message: WELCOME_MESSAGE,
        color: 'green',
        icon: <IconCheck />,
      })
      navigate(REDIRECT)
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        notifications.show({
          title: 'Error',
          message:
            'Dispositivo no encontrado, inicie sesión con nombre de usuario/contraseña para continuar',
          color: 'red',
          icon: <IconX />,
        })
        setShowWebAuthn(false)
      } else {
        notifications.show({
          title: 'Error',
          message: e.message,
          color: 'red',
          icon: <IconX />,
        })
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      notifications.show({
        title: 'Éxito',
        message: WELCOME_MESSAGE,
        color: 'green',
        icon: <IconCheck />,
      })
      navigate(REDIRECT)
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX />,
      })
    }
  }

  const onSkip = () => {
    notifications.show({
      title: 'Éxito',
      message: WELCOME_MESSAGE,
      color: 'green',
      icon: <IconCheck />,
    })
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => (
    <Card withBorder shadow="sm" p="lg">
      <Title order={2} ta="center" mb="md">
        Inicio de sesión con WebAuthn activado
      </Title>
      <Text ta="center" mb="lg">
        Inicie sesión con su huella digital, rostro o PIN{' '}
      </Text>
      <Button fullWidth onClick={onAuthenticate}>
        Abrir autenticador
      </Button>
    </Card>
  )

  const RegisterWebAuthnPrompt = () => (
    <Card withBorder shadow="sm" p="lg">
      <Title order={2} ta="center" mb="md">
        ¡No más contraseñas!
      </Title>
      <Text ta="center" mb="lg">
        Dependiendo de su dispositivo, podrá iniciar sesión con su huella
        digital, rostro o PIN la próxima vez.
      </Text>
      <Stack>
        <Button fullWidth onClick={onRegister}>
          Activar
        </Button>
        <Button variant="outline" fullWidth onClick={onSkip}>
          Omitir por ahora
        </Button>
      </Stack>
    </Card>
  )

  const PasswordForm = () => (
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
        <Anchor component={Link} to={routes.forgotPassword()} size="sm">
          ¿Olvidó su contraseña?
        </Anchor>
        <Button type="submit" fullWidth>
          Iniciar sesión
        </Button>
      </Stack>
    </form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      return webAuthn.isEnabled() ? (
        <AuthWebAuthnPrompt />
      ) : (
        <RegisterWebAuthnPrompt />
      )
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <Text ta="center" mt="md">
            o inicie sesión con{' '}
            <Anchor component={Link} to="?type=password">
              nombre de usuario y contraseña
            </Anchor>
          </Text>
        )
      }
    } else {
      return (
        <Text ta="center" mt="md">
          ¿No tiene una cuenta?{' '}
          <Anchor component={Link} to={routes.signup()}>
            ¡Regístrese!
          </Anchor>
        </Text>
      )
    }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <Metadata title="Iniciar sesión" />
      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Iniciar sesión
          </Title>
          {formToRender()}
          {linkToRender()}
        </Card>
      </Flex>
    </>
  )
}

export default LoginPage
