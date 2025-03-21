// web/src/hooks/Categories/useCreateCategory.ts
import { ApolloError, gql, useMutation } from '@apollo/client'
import { CreateCategory, CreateCategoryVariables } from 'types/graphql' // Adjust the import path as needed

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`

interface UseCreateCategoryProps {
  onCompleted?: (data: CreateCategory['createCategory']) => void
  onError?: (error: ApolloError) => void
}

export const useCreateCategory = ({
  onCompleted,
  onError,
}: UseCreateCategoryProps = {}) => {
  const [createCategoryMutation, { loading, error }] = useMutation<
    CreateCategory,
    CreateCategoryVariables
  >(CREATE_CATEGORY, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.createCategory)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const createCategory = (input: CreateCategoryVariables['input']) => {
    return createCategoryMutation({ variables: { input } })
  }

  return {
    createCategory,
    loading,
    error,
  }
}
