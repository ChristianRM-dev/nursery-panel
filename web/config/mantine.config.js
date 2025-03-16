// web/config/mantine.config.js
import { createTheme } from '@mantine/core';

/**
 * This object will be used to override Mantine theme defaults.
 * See https://mantine.dev/theming/mantine-provider/#theme-object for theming options
 * @type {import("@mantine/core").MantineThemeOverride}
 */
export const theme = createTheme({
  // Default color scheme (can be overridden by the user)
  colorScheme: 'dark',

  // Define colors for both light and dark themes
  colors: {
    // Dark theme colors
    dark: [
      '#d5d7e0', // Lightest
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d', // Default
      '#1d1e30',
      '#0c0d21',
      '#01010a', // Darkest
    ],

    // Light theme colors
    gray: [
      '#f8f9fa', // Lightest
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96', // Default
      '#495057',
      '#343a40',
      '#212529', // Darkest
    ],
  },

  // Primary color (used for buttons, links, etc.)
  primaryColor: 'blue',

  // Font family
  fontFamily: 'Open Sans, sans-serif',

  // Other global theme customizations
  globalStyles: (theme) => ({
    body: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color:
        theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    },
  }),

  // Component-specific overrides
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[0]
              : theme.colors.gray[7],
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2],
          },
        },
      }),
    },
  },
});

export default theme;