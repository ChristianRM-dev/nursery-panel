// web/src/hooks/Plants/useGetPlantDetails.ts
import { gql, useQuery } from '@apollo/client'
import { GetPublicPlantDetails } from 'types/graphql'

const GET_PUBLIC_PLANT_DETAILS = gql`
  query GetPublicPlantDetails($id: String!) {
    publicPlant(id: $id) {
      id
      name
      price
      stock
      presentationType
      presentationDetails
      category {
        id
        name
      }
      photos {
        id
        url
      }
    }
  }
`

interface UseGetPlantDetailsProps {
  id: string
}

export const useGetPlantDetails = ({ id }: UseGetPlantDetailsProps) => {
  const { data, loading, error } = useQuery<GetPublicPlantDetails>(
    GET_PUBLIC_PLANT_DETAILS,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    }
  )

  return {
    plant: data?.publicPlant,
    loading,
    error,
  }
}
