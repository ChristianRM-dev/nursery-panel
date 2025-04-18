// web/src/hooks/Payments/useGetPaymentById.ts
import { useQuery, gql } from '@apollo/client'
import { GetPaymentById, GetPaymentByIdVariables } from 'types/graphql'

const GET_PAYMENT_BY_ID = gql`
  query GetPaymentById($id: String!) {
    payment(id: $id) {
      id
      amount
      method
      reference
      notes
      createdAt
      updatedAt
      saleNote {
        id
        folio
        total
        status
        paidAmount
      }
    }
  }
`

interface UseGetPaymentByIdProps {
  id: string
}

export const useGetPaymentById = ({ id }: UseGetPaymentByIdProps) => {
  const { data, loading, error } = useQuery<
    GetPaymentById,
    GetPaymentByIdVariables
  >(GET_PAYMENT_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only', // Ensures fresh data is fetched
  })

  return {
    payment: data?.payment, // The fetched payment data
    loading,
    error,
  }
}
