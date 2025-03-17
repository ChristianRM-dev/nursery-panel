import React, { memo } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = memo(({ onClick }) => {
  return (
    <ActionIcon
      variant="filled"
      color="blue"
      size={rem(56)}
      radius="xl"
      style={{
        position: 'fixed',
        bottom: rem(20),
        right: rem(20),
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      <IconPlus size={rem(24)} />
    </ActionIcon>
  );
});

export default FloatingActionButton;