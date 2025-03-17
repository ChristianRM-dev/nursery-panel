import React from 'react';
import { LoadingOverlay as MantineLoadingOverlay, Box } from '@mantine/core';

interface LoadingOverlayProps {
  visible: boolean; // Controls whether the overlay is visible
}

/**
 * A full-screen loading overlay with a spinner.
 * Use this to indicate loading states during GraphQL operations.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  return (
    <Box style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <MantineLoadingOverlay
        visible={visible}
        overlayProps={{ blur: 2 }} // Optional blur effect
        loaderProps={{ type: 'dots' }} // Use dots as the spinner
      />
    </Box>
  );
};