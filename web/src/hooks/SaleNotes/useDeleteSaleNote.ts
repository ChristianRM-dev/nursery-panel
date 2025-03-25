import { useMutation, gql, ApolloError } from '@apollo/client'
import { DeleteSaleNote, DeleteSaleNoteVariables } from 'types/graphql'

const DELETE_SALE_NOTE = gql`
  mutation DeleteSaleNote($id: String!) {
    deleteSaleNote(id: $id) {
      id
      folio
    }
  }
`

interface UseDeleteSaleNoteProps {
  onCompleted?: (data: DeleteSaleNote) => void
  onError?: (error: ApolloError) => void
}

export const useDeleteSaleNote = ({
  onCompleted,
  onError,
}: UseDeleteSaleNoteProps) => {
  const [deleteSaleNote, { loading, error }] = useMutation<
    DeleteSaleNote,
    DeleteSaleNoteVariables
  >(DELETE_SALE_NOTE, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  return {
    deleteSaleNote: (id: string) => deleteSaleNote({ variables: { id } }),
    loading,
    error,
  }
}
