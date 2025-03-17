import { ApolloLink } from '@apollo/client'; // Import ApolloLink

export const createLoadingLink = (startLoading: () => void, stopLoading: () => void) => {
  return new ApolloLink((operation, forward) => {
    // Start loading when a request is made
    startLoading();

    // Continue the request chain
    return forward(operation).map((response) => {
      // Stop loading when the request completes
      stopLoading();
      return response;
    });
  });
};