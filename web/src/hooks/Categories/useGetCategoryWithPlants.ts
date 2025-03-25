// web/src/hooks/Categories/useGetCategoryWithPlants.ts
import { gql, useQuery } from '@apollo/client'
import { GetPublicCategoryWithPlants } from 'types/graphql'

const GET_PUBLIC_CATEGORY_WITH_PLANTS = gql`
  query GetPublicCategoryWithPlants($id: String!) {
    publicCategoryWithPlants(id: $id) {
      id
      name
      description
      image
      plants {
        id
        name
        price
        mainPhoto
        presentationType
      }
    }
  }
`

interface UseGetCategoryWithPlantsProps {
  id: string
}

export const useGetCategoryWithPlants = ({
  id,
}: UseGetCategoryWithPlantsProps) => {
  const { data, loading, error } = useQuery<GetPublicCategoryWithPlants>(
    GET_PUBLIC_CATEGORY_WITH_PLANTS,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    }
  )

  return {
    category: data?.publicCategoryWithPlants,
    loading,
    error,
  }
}
