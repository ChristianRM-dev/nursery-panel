// web/src/hooks/Categories/useGetCategoryById.ts
import { useQuery, gql } from '@apollo/client'
import { GetCategoryById, GetCategoryByIdVariables } from 'types/graphql' // Adjust the import path as needed

const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: String!) {
    category(id: $id) {
      id
      name
      description
      plants {
        id
        name
        price
        stock
        presentationType
      }
      createdAt
      updatedAt
    }
  }
`

interface UseGetCategoryByIdProps {
  id: string
}

export const useGetCategoryById = ({ id }: UseGetCategoryByIdProps) => {
  const { data, loading, error } = useQuery<
    GetCategoryById,
    GetCategoryByIdVariables
  >(GET_CATEGORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only', // Ensures fresh data is fetched
  })

  return {
    category: data?.category, // The fetched category data
    loading,
    error,
  }
}
