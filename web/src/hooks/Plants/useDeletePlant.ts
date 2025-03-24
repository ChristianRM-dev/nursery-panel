// web/src/hooks/Plants/useDeletePlant.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import { DeletePlant, DeletePlantVariables } from 'types/graphql'

const DELETE_PLANT = gql`
  mutation DeletePlant($id: String!) {
    deletePlant(id: $id) {
      id
      name
    }
  }
`

interface UseDeletePlantProps {
  onCompleted?: (data: DeletePlant) => void
  onError?: (error: ApolloError) => void
}

export const useDeletePlant = ({
  onCompleted,
  onError,
}: UseDeletePlantProps) => {
  const [deletePlant, { loading, error }] = useMutation<
    DeletePlant,
    DeletePlantVariables
  >(DELETE_PLANT, {
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
    deletePlant: (id: string) => deletePlant({ variables: { id } }),
    loading,
    error,
  }
}
