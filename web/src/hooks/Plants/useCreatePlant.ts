// web/src/hooks/Plants/useCreatePlant.ts
import { ApolloError, gql, useMutation } from '@apollo/client'
import { CreatePlant, CreatePlantVariables } from 'types/graphql' // Adjust the import path as needed

export const CREATE_PLANT = gql`
  mutation CreatePlant($input: CreatePlantInput!) {
    createPlant(input: $input) {
      id
      name
      price
      stock
      presentationType
      presentationDetails
      photos {
        id
        url
      }
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

interface UseCreatePlantProps {
  onCompleted?: (data: CreatePlant['createPlant']) => void // Correct type for onCompleted
  onError?: (error: ApolloError) => void
}

export const useCreatePlant = ({
  onCompleted,
  onError,
}: UseCreatePlantProps = {}) => {
  const [createPlantMutation, { loading, error }] = useMutation<
    CreatePlant, // Correct type for mutation response
    CreatePlantVariables // Correct type for mutation variables
  >(CREATE_PLANT, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.createPlant) // Pass the mutation result to onCompleted
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const createPlant = (input: CreatePlantVariables['input']) => {
    return createPlantMutation({ variables: { input } })
  }

  return {
    createPlant,
    loading,
    error,
  }
}
