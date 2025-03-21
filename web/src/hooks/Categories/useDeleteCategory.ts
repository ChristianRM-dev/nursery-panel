// web/src/hooks/Categories/useDeleteCategory.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import { DeleteCategory, DeleteCategoryVariables } from 'types/graphql' // Adjust the import path as needed

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`

interface UseDeleteCategoryProps {
  onCompleted?: (data: DeleteCategory) => void
  onError?: (error: ApolloError) => void
}

export const useDeleteCategory = ({
  onCompleted,
  onError,
}: UseDeleteCategoryProps) => {
  const [deleteCategory, { loading, error }] = useMutation<
    DeleteCategory,
    DeleteCategoryVariables
  >(DELETE_CATEGORY, {
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
    deleteCategory: (id: string) => deleteCategory({ variables: { id } }),
    loading,
    error,
  }
}
