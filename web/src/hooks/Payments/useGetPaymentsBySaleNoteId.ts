// web/src/hooks/Payments/useGetPaymentsBySaleNoteId.ts
import { gql, useQuery } from '@apollo/client'
import {
  GetPaymentsBySaleNoteId,
  GetPaymentsBySaleNoteIdVariables,
} from 'types/graphql'

const GET_PAYMENTS_BY_SALE_NOTE_ID = gql`
  query GetPaymentsBySaleNoteId($saleNoteId: String!) {
    paymentsBySaleNoteId(saleNoteId: $saleNoteId) {
      id
      amount
      method
      reference
      notes
      createdAt
      saleNote {
        id
        folio
      }
    }
  }
`

export const useGetPaymentsBySaleNoteId = ({
  saleNoteId,
}: {
  saleNoteId: string
}) => {
  const { data, loading, error } = useQuery<
    GetPaymentsBySaleNoteId,
    GetPaymentsBySaleNoteIdVariables
  >(GET_PAYMENTS_BY_SALE_NOTE_ID, {
    variables: { saleNoteId },
    fetchPolicy: 'cache-and-network', // Good for frequently updated data
  })

  return {
    payments: data?.paymentsBySaleNoteId || [],
    loading,
    error,
  }
}
