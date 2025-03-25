import { ApolloError, gql, useMutation } from '@apollo/client'
import { CreateSaleNote, CreateSaleNoteVariables } from 'types/graphql'

export const CREATE_SALE_NOTE = gql`
  mutation CreateSaleNote($input: CreateSaleNoteInput!) {
    createSaleNote(input: $input) {
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
      createdAt
    }
  }
`

interface UseCreateSaleNoteProps {
  onCompleted?: (data: CreateSaleNote['createSaleNote']) => void
  onError?: (error: ApolloError) => void
}

export const useCreateSaleNote = ({
  onCompleted,
  onError,
}: UseCreateSaleNoteProps = {}) => {
  const [createSaleNoteMutation, { loading, error }] = useMutation<
    CreateSaleNote,
    CreateSaleNoteVariables
  >(CREATE_SALE_NOTE, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.createSaleNote)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const createSaleNote = (input: CreateSaleNoteVariables['input']) => {
    return createSaleNoteMutation({ variables: { input } })
  }

  return {
    createSaleNote,
    loading,
    error,
  }
}
