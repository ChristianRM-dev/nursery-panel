import { useEffect, useRef } from 'react';
import { Link, navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth();

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
    const password = formData.get('password') as string;

    const response = await signUp({ username, password });

    if (response.message) {
      notifications.show({
        title: 'Message',
        message: response.message,
        color: 'blue',
        icon: <IconCheck />,
      });
    } else if (response.error) {
      notifications.show({
        title: 'Error',
        message: response.error,
        color: 'red',
        icon: <IconX />,
      });
    } else {
      notifications.show({
        title: 'Success',
        message: 'Welcome!',
        color: 'green',
        icon: <IconCheck />,
      });
    }
  };

  return (
    <>
      <Metadata title="Signup" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Sign Up
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
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
              />
              <Button type="submit" fullWidth>
                Sign Up
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="md">
            Already have an account?{' '}
            <Anchor component={Link} to={routes.login()}>
              Log in!
            </Anchor>
          </Text>
        </Card>
      </Flex>
    </>
  );
};

export default SignupPage;