// web/src/hooks/Customers/useCreateCustomer.ts
import { ApolloError, gql, useMutation } from '@apollo/client'
import { CreateCustomer, CreateCustomerVariables } from 'types/graphql'

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      name
      phone
      email
      createdAt
      updatedAt
    }
  }
`

interface UseCreateCustomerProps {
  onCompleted?: (data: CreateCustomer['createCustomer']) => void
  onError?: (error: ApolloError) => void
}

export const useCreateCustomer = ({
  onCompleted,
  onError,
}: UseCreateCustomerProps = {}) => {
  const [createCustomerMutation, { loading, error }] = useMutation<
    CreateCustomer,
    CreateCustomerVariables
  >(CREATE_CUSTOMER, {
    onCompleted: (data) => {
      if (onCompleted) onCompleted(data.createCustomer)
    },
    onError: (error) => {
      if (onError) onError(error)
    },
  })

  const createCustomer = (input: CreateCustomerVariables['input']) => {
    return createCustomerMutation({ variables: { input } })
  }

  return { createCustomer, loading, error }
}
