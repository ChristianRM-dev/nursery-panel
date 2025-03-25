// web/src/hooks/Categories/useGetCategoriesWithPlants.ts
import { gql, useQuery } from '@apollo/client'
import { GetPublicCategoriesWithPlants } from 'types/graphql'

const GET_PUBLIC_CATEGORIES_WITH_PLANTS = gql`
  query GetPublicCategoriesWithPlants {
    publicCategoriesWithPlants {
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

export const useGetCategoriesWithPlants = () => {
  const { data, loading, error } = useQuery<GetPublicCategoriesWithPlants>(
    GET_PUBLIC_CATEGORIES_WITH_PLANTS,
    {
      fetchPolicy: 'cache-and-network', // Better UX for public content
    }
  )

  return {
    categories: data?.publicCategoriesWithPlants || [],
    loading,
    error,
  }
}
