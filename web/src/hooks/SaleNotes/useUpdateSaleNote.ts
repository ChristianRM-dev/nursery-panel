import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdateSaleNote,
  UpdateSaleNoteInput,
  UpdateSaleNoteVariables,
} from 'types/graphql'

const UPDATE_SALE_NOTE = gql`
  mutation UpdateSaleNote($id: String!, $input: UpdateSaleNoteInput!) {
    updateSaleNote(id: $id, input: $input) {
      id
      folio
      total
      customer {
        id
        name
      }
      nursery {
        id
        name
      }
      saleDetails {
        id
        plant {
          id
          name
        }
        price
        quantity
      }
    }
  }
`

interface UseUpdateSaleNoteProps {
  onCompleted?: (data: UpdateSaleNote['updateSaleNote']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdateSaleNote = ({
  onCompleted,
  onError,
}: UseUpdateSaleNoteProps) => {
  const [updateSaleNote, { loading, error }] = useMutation<
    UpdateSaleNote,
    UpdateSaleNoteVariables
  >(UPDATE_SALE_NOTE, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.updateSaleNote)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleUpdateSaleNote = async (id: string, input: UpdateSaleNoteInput) => {
    try {
      const result = await updateSaleNote({
        variables: { id, input },
      })
      return result.data.updateSaleNote
    } catch (error) {
      console.error('Error updating sale note:', error)
      throw error
    }
  }

  return {
    updateSaleNote: handleUpdateSaleNote,
    loading,
    error,
  }
}
