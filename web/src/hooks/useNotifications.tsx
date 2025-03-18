// web/src/hooks/useNotifications.ts
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useNotifications = () => {
  const showSuccessNotification = (message: string) => {
    showNotification({
      title: 'Success',
      message,
      color: 'teal',
      icon: <IconCheck />,
    });
  };

  const showErrorNotification = (message: string) => {
    showNotification({
      title: 'Error',
      message,
      color: 'red',
      icon: <IconX />,
    });
  };

  return { showSuccessNotification, showErrorNotification };
};