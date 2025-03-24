// web/src/hooks/Nurseries/useDeleteNursery.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import { DeleteNursery, DeleteNurseryVariables } from 'types/graphql'

const DELETE_NURSERY = gql`
  mutation DeleteNursery($id: String!) {
    deleteNursery(id: $id) {
      id
      name
    }
  }
`

interface UseDeleteNurseryProps {
  onCompleted?: (data: DeleteNursery) => void
  onError?: (error: ApolloError) => void
}

export const useDeleteNursery = ({
  onCompleted,
  onError,
}: UseDeleteNurseryProps) => {
  const [deleteNursery, { loading, error }] = useMutation<
    DeleteNursery,
    DeleteNurseryVariables
  >(DELETE_NURSERY, {
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
    deleteNursery: (id: string) => deleteNursery({ variables: { id } }),
    loading,
    error,
  }
}
