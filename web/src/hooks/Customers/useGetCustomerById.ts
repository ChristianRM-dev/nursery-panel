import { useQuery, gql } from '@apollo/client'
import { GetCustomerById, GetCustomerByIdVariables } from 'types/graphql'

const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: String!) {
    customer(id: $id) {
      id
      name
      phone
      email
      address
      saleNotes {
        id
        folio
        total
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`

interface UseGetCustomerByIdProps {
  id: string
}

export const useGetCustomerById = ({ id }: UseGetCustomerByIdProps) => {
  const { data, loading, error } = useQuery<
    GetCustomerById,
    GetCustomerByIdVariables
  >(GET_CUSTOMER_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  return {
    customer: data?.customer,
    loading,
    error,
  }
}
