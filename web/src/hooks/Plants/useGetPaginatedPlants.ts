import { gql, useQuery } from '@apollo/client'
import { GetPaginatedPlants, GetPaginatedPlantsVariables } from 'types/graphql'

const GET_PAGINATED_PLANTS = gql`
  query GetPaginatedPlants(
    $pagination: PaginationInput!
    $sort: SortInput
    $search: SearchInput
  ) {
    plants(pagination: $pagination, sort: $sort, search: $search) {
      data {
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
      meta {
        total
        page
        pageSize
        totalPages
      }
    }
  }
`

interface UseGetPaginatedPlantsProps {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export type GetPaginatedPlantsItem = GetPaginatedPlants['plants']['data']

export const useGetPaginatedPlants = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
}: UseGetPaginatedPlantsProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetPaginatedPlants,
    GetPaginatedPlantsVariables
  >(GET_PAGINATED_PLANTS, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
    },
    fetchPolicy: 'network-only',
  })

  return {
    plants: data?.plants.data || [],
    meta: data?.plants.meta || { total: 0, page, pageSize, totalPages: 0 },
    loading,
    error,
    refetch,
  }
}
