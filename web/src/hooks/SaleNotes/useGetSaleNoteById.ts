// web/src/hooks/SaleNotes/useGetSaleNoteById.ts
import { useQuery, gql } from '@apollo/client'
import { GetSaleNoteById, GetSaleNoteByIdVariables } from 'types/graphql'

const GET_SALE_NOTE_BY_ID = gql`
  query GetSaleNoteById($id: String!) {
    saleNote(id: $id) {
      id
      folio
      total
      paidAmount
      status
      customer {
        id
        name
        phone
      }
      nursery {
        id
        name
        phone
        logo
        rfc
        address
        ownerName
      }
      saleDetails {
        id
        plant {
          id
          name
          price
        }
        price
        quantity
      }
      externalPlants {
        name
        price
        quantity
      }
      createdAt
    }
  }
`

interface UseGetSaleNoteByIdProps {
  id: string
}

export const useGetSaleNoteById = ({ id }: UseGetSaleNoteByIdProps) => {
  const { data, loading, error } = useQuery<
    GetSaleNoteById,
    GetSaleNoteByIdVariables
  >(GET_SALE_NOTE_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only',
  })

  return {
    saleNote: data?.saleNote,
    loading,
    error,
  }
}
