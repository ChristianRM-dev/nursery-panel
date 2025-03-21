// web/src/hooks/Categories/useUpdateCategory.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdateCategory,
  UpdateCategoryInput,
  UpdateCategoryVariables,
} from 'types/graphql' // Adjust the import path as needed

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`

interface UseUpdateCategoryProps {
  onCompleted?: (data: UpdateCategory['updateCategory']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdateCategory = ({
  onCompleted,
  onError,
}: UseUpdateCategoryProps) => {
  const [updateCategory, { loading, error }] = useMutation<
    UpdateCategory,
    UpdateCategoryVariables
  >(UPDATE_CATEGORY, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.updateCategory)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleUpdateCategory = async (
    id: string,
    input: UpdateCategoryInput
  ) => {
    try {
      const result = await updateCategory({
        variables: { id, input },
      })
      return result.data.updateCategory
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  return {
    updateCategory: handleUpdateCategory,
    loading,
    error,
  }
}
