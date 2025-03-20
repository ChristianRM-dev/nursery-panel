import { useQuery, gql } from '@apollo/client'
import { GetPlantById, GetPlantByIdVariables } from 'types/graphql'

const GET_PLANT_BY_ID = gql`
  query GetPlantById($id: String!) {
    plant(id: $id) {
      id
      name
      price
      stock
      categoryId
      category {
        name
      }
      presentationType
      presentationDetails
      photos {
        id
        url
      }
    }
  }
`

interface UseGetPlantByIdProps {
  id: string
}

export const useGetPlantById = ({ id }: UseGetPlantByIdProps) => {
  const { data, loading, error } = useQuery<
    GetPlantById,
    GetPlantByIdVariables
  >(GET_PLANT_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only', // Ensures fresh data is fetched
  })

  return {
    plant: data?.plant, // The fetched plant data
    loading,
    error,
  }
}
