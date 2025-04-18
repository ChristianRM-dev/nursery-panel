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

const SignupPage: React.FC = () => {
  const { isAuthenticated, signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))

    // Validate password match when either password or confirm password changes
    if (name === 'password' || name === 'confirmPassword') {
      if (
        name === 'password' &&
        formValues.confirmPassword &&
        value !== formValues.confirmPassword
      ) {
        setPasswordError('Las contraseñas no coinciden')
      } else if (
        name === 'confirmPassword' &&
        formValues.password &&
        value !== formValues.password
      ) {
        setPasswordError('Las contraseñas no coinciden')
      } else {
        setPasswordError('')
      }
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    const response = await signUp({
      username: formValues.username,
      password: formValues.password,
    })

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
    setLoading(false)
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
                value={formValues.username}
                onChange={handleInputChange}
                required
              />
              <PasswordInput
                name="password"
                label="Contraseña"
                placeholder="Ingrese su contraseña"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
              <PasswordInput
                name="confirmPassword"
                label="Confirmar contraseña"
                placeholder="Confirme su contraseña"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                error={passwordError}
                required
              />
              <Button
                type="submit"
                fullWidth
                disabled={
                  loading ||
                  !!passwordError ||
                  !formValues.username ||
                  !formValues.password ||
                  !formValues.confirmPassword
                }
              >
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
