import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdatePlant,
  UpdatePlantInput,
  UpdatePlantVariables,
} from 'types/graphql'

const UPDATE_PLANT = gql`
  mutation UpdatePlant($id: String!, $input: UpdatePlantInput!) {
    updatePlant(id: $id, input: $input) {
      id
      name
      price
      stock
      categoryId
      presentationType
      presentationDetails
      photos {
        id
        url
      }
    }
  }
`

interface UseUpdatePlantProps {
  onCompleted?: (data: UpdatePlant['updatePlant']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdatePlant = ({
  onCompleted,
  onError,
}: UseUpdatePlantProps) => {
  const [updatePlant, { loading, error }] = useMutation<
    UpdatePlant,
    UpdatePlantVariables
  >(UPDATE_PLANT, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.updatePlant)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleUpdatePlant = async (id: string, input: UpdatePlantInput) => {
    try {
      const result = await updatePlant({
        variables: { id, input },
      })
      return result.data.updatePlant
    } catch (error) {
      console.error('Error updating plant:', error)
      throw error
    }
  }

  return {
    updatePlant: handleUpdatePlant,
    loading,
    error,
  }
}
