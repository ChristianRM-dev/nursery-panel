import { useEffect, useRef } from 'react';
import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import { TextInput, Button, Card, Title, Text, Flex, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  // Focus on the username field on page load
  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;

    const response = await forgotPassword(username);

    if (response.error) {
      notifications.show({
        title: 'Error',
        message: response.error,
        color: 'red',
        icon: <IconX />,
      });
    } else {
      notifications.show({
        title: 'Success',
        message: `A link to reset your password was sent to ${response.email}`,
        color: 'green',
        icon: <IconCheck />,
      });
      navigate(routes.login());
    }
  };

  return (
    <>
      <Metadata title="Forgot Password" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Forgot Password
          </Title>

          <form onSubmit={onSubmit}>
            <Stack>
              <TextInput
                name="username"
                label="Username"
                placeholder="Enter your username"
                ref={usernameRef}
                required
              />
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Stack>
          </form>
        </Card>
      </Flex>
    </>
  );
};

export default ForgotPasswordPage;