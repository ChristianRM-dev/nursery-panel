// web/src/hooks/Nurseries/useGetNurseryById.ts
import { useQuery, gql } from '@apollo/client'
import { GetNurseryById, GetNurseryByIdVariables } from 'types/graphql'

const GET_NURSERY_BY_ID = gql`
  query GetNurseryById($id: String!) {
    nursery(id: $id) {
      id
      name
      address
      phone
      email
      ownerName
      logo
      rfc
      createdAt
      updatedAt
    }
  }
`

interface UseGetNurseryByIdProps {
  id: string
}

export const useGetNurseryById = ({ id }: UseGetNurseryByIdProps) => {
  const { data, loading, error } = useQuery<
    GetNurseryById,
    GetNurseryByIdVariables
  >(GET_NURSERY_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only', // Ensures fresh data is fetched
  })

  return {
    nursery: data?.nursery, // The fetched nursery data
    loading,
    error,
  }
}
