import { useEffect, useRef, useState } from 'react'

import {
  PasswordInput,
  Button,
  Card,
  Title,
  Flex,
  Stack,
  Loader,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // Validate the reset token
  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        notifications.show({
          title: 'Error',
          message: response.error,
          color: 'red',
          icon: <IconX />,
        })
      } else {
        setEnabled(true)
      }
      setIsValidatingToken(false)
    }
    validateToken()
  }, [resetToken, validateResetToken])

  // Focus on the password field on page load
  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = formData.get('password') as string

    const response = await resetPassword({
      resetToken,
      password,
    })

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
        message: '¡Contraseña cambiada!',
        color: 'green',
        icon: <IconCheck />,
      })
      await reauthenticate()
      navigate(routes.login())
    }
  }

  if (isValidatingToken) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Loader size="lg" />
      </Flex>
    )
  }

  return (
    <>
      <Metadata title="Restablecer Contraseña" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Restablecer Contraseña
          </Title>

          <form onSubmit={onSubmit}>
            <Stack>
              <PasswordInput
                name="password"
                label="Nueva Contraseña"
                placeholder="Ingrese su nueva contraseña"
                ref={passwordRef}
                disabled={!enabled}
                required
              />
              <Button type="submit" fullWidth disabled={!enabled}>
                Enviar
              </Button>
            </Stack>
          </form>
        </Card>
      </Flex>
    </>
  )
}

export default ResetPasswordPage
