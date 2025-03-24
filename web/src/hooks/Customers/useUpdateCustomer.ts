import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdateCustomer,
  UpdateCustomerInput,
  UpdateCustomerVariables,
} from 'types/graphql'

const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: String!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      id
      name
      phone
      email
    }
  }
`

interface UseUpdateCustomerProps {
  onCompleted?: (data: UpdateCustomer['updateCustomer']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdateCustomer = ({
  onCompleted,
  onError,
}: UseUpdateCustomerProps) => {
  const [updateCustomer, { loading, error }] = useMutation<
    UpdateCustomer,
    UpdateCustomerVariables
  >(UPDATE_CUSTOMER, {
    onCompleted: (data) => {
      if (onCompleted) onCompleted(data.updateCustomer)
    },
    onError: (error) => {
      if (onError) onError(error)
    },
  })

  const handleUpdateCustomer = async (
    id: string,
    input: UpdateCustomerInput
  ) => {
    try {
      const result = await updateCustomer({ variables: { id, input } })
      return result.data.updateCustomer
    } catch (error) {
      console.error('Error updating customer:', error)
      throw error
    }
  }

  return {
    updateCustomer: handleUpdateCustomer,
    loading,
    error,
  }
}
