import type { ReactNode } from 'react';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import { ApolloLink } from '@apollo/client'; // Import ApolloLink

import { Box, LoadingOverlay, MantineProvider } from '@mantine/core';
import theme from '../config/mantine.config';
import '@mantine/core/styles.css';

import FatalErrorPage from 'src/pages/FatalErrorPage';

import { AuthProvider, useAuth } from './auth';

import './index.css';
import './scaffold.css';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { createLoadingLink } from './lib/apolloLink';

interface AppProps {
  children?: ReactNode;
}

const LoadingIndicatorContent = () => {
  const { isLoading } = useLoading();
  console.log('Loading state:', isLoading); // Debugging
  return (
    <Box pos="relative" style={{ minHeight: '100vh' }}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
    </Box>
  );
};

const App = ({ children }: AppProps) => {
  const { startLoading, stopLoading } = useLoading();

  // Create the custom Apollo Link with startLoading and stopLoading
  const loadingLink = createLoadingLink(startLoading, stopLoading);

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <MantineProvider theme={theme}>
          <AuthProvider>
            <LoadingProvider>
              {/* Show the loading overlay globally */}
              {/* <LoadingIndicatorContent /> */}

              {/* Configure the Apollo Client with the custom link */}
              <RedwoodApolloProvider
                useAuth={useAuth}
                graphQLClientConfig={{
                  link: (redwoodApolloLinks) => {
                    // Combine the custom loading link with Redwood's default links
                    return ApolloLink.from([loadingLink, ...redwoodApolloLinks.map(({ link }) => link)]);
                  },
                }}
              >
                {children}
              </RedwoodApolloProvider>
            </LoadingProvider>
          </AuthProvider>
        </MantineProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  );
};

export default App;