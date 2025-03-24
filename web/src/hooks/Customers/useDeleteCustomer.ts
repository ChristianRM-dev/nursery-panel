// web/src/hooks/Customers/useDeleteCustomer.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import { DeleteCustomer, DeleteCustomerVariables } from 'types/graphql'

const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: String!) {
    deleteCustomer(id: $id) {
      id
      name
    }
  }
`

interface UseDeleteCustomerProps {
  onCompleted?: (data: DeleteCustomer) => void
  onError?: (error: ApolloError) => void
}

export const useDeleteCustomer = ({
  onCompleted,
  onError,
}: UseDeleteCustomerProps) => {
  const [deleteCustomer, { loading, error }] = useMutation<
    DeleteCustomer,
    DeleteCustomerVariables
  >(DELETE_CUSTOMER, {
    onCompleted: (data) => {
      if (onCompleted) onCompleted(data)
    },
    onError: (error) => {
      if (onError) onError(error)
    },
  })

  return {
    deleteCustomer: (id: string) => deleteCustomer({ variables: { id } }),
    loading,
    error,
  }
}
