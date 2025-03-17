import { useEffect, useRef, useState } from 'react';
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

const WELCOME_MESSAGE = 'Welcome back!';
const REDIRECT = routes.home();

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth();
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false);
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  );

  // Redirect after login or WebAuthn setup
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT);
    }
  }, [isAuthenticated, shouldShowWebAuthn]);

  // Show WebAuthn prompt on page load if enabled
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate();
    }
  }, [loading, isAuthenticated]);

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

    const webAuthnSupported = await webAuthn.isSupported();

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true);
    }

    const response = await logIn({ username, password });

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
      if (webAuthnSupported) {
        setShowWebAuthn(true);
      } else {
        notifications.show({
          title: 'Success',
          message: WELCOME_MESSAGE,
          color: 'green',
          icon: <IconCheck />,
        });
      }
    }
  };

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate();
      await reauthenticate();
      notifications.show({
        title: 'Success',
        message: WELCOME_MESSAGE,
        color: 'green',
        icon: <IconCheck />,
      });
      navigate(REDIRECT);
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        notifications.show({
          title: 'Error',
          message: 'Device not found, log in with Username/Password to continue',
          color: 'red',
          icon: <IconX />,
        });
        setShowWebAuthn(false);
      } else {
        notifications.show({
          title: 'Error',
          message: e.message,
          color: 'red',
          icon: <IconX />,
        });
      }
    }
  };

  const onRegister = async () => {
    try {
      await webAuthn.register();
      notifications.show({
        title: 'Success',
        message: WELCOME_MESSAGE,
        color: 'green',
        icon: <IconCheck />,
      });
      navigate(REDIRECT);
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const onSkip = () => {
    notifications.show({
      title: 'Success',
      message: WELCOME_MESSAGE,
      color: 'green',
      icon: <IconCheck />,
    });
    setShouldShowWebAuthn(false);
  };

  const AuthWebAuthnPrompt = () => (
    <Card withBorder shadow="sm" p="lg">
      <Title order={2} ta="center" mb="md">
        WebAuthn Login Enabled
      </Title>
      <Text ta="center" mb="lg">
        Log in with your fingerprint, face, or PIN
      </Text>
      <Button fullWidth onClick={onAuthenticate}>
        Open Authenticator
      </Button>
    </Card>
  );

  const RegisterWebAuthnPrompt = () => (
    <Card withBorder shadow="sm" p="lg">
      <Title order={2} ta="center" mb="md">
        No More Passwords!
      </Title>
      <Text ta="center" mb="lg">
        Depending on your device, you can log in with your fingerprint, face, or PIN next time.
      </Text>
      <Stack>
        <Button fullWidth onClick={onRegister}>
          Turn On
        </Button>
        <Button variant="outline" fullWidth onClick={onSkip}>
          Skip for Now
        </Button>
      </Stack>
    </Card>
  );

  const PasswordForm = () => (
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
        <Anchor component={Link} to={routes.forgotPassword()} size="sm">
          Forgot Password?
        </Anchor>
        <Button type="submit" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );

  const formToRender = () => {
    if (showWebAuthn) {
      return webAuthn.isEnabled() ? <AuthWebAuthnPrompt /> : <RegisterWebAuthnPrompt />;
    } else {
      return <PasswordForm />;
    }
  };

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <Text ta="center" mt="md">
            or login with{' '}
            <Anchor component={Link} to="?type=password">
              username and password
            </Anchor>
          </Text>
        );
      }
    } else {
      return (
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} to={routes.signup()}>
            Sign up!
          </Anchor>
        </Text>
      );
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Metadata title="Login" />

      <Flex justify="center" align="center" h="100vh">
        <Card withBorder shadow="sm" p="lg" w={400}>
          <Title order={2} ta="center" mb="lg">
            Login
          </Title>
          {formToRender()}
          {linkToRender()}
        </Card>
      </Flex>
    </>
  );
};

export default LoginPage;