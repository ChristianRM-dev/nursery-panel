// web/src/hooks/Nurseries/useGetPaginatedNurseries.ts
import { gql, useQuery } from '@apollo/client'
import { GetPaginatedNurseries, GetPaginatedNurseriesVariables } from 'types/graphql'

const GET_PAGINATED_NURSERIES = gql`
  query GetPaginatedNurseries(
    $pagination: PaginationInput!
    $sort: SortInput
    $search: SearchInput
  ) {
    nurseries(pagination: $pagination, sort: $sort, search: $search) {
      data {
        id
        name
        address
        phone
        logo
        rfc
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

interface UseGetPaginatedNurseriesProps {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export type GetPaginatedNurseriesItem = GetPaginatedNurseries['nurseries']['data']

export const useGetPaginatedNurseries = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
}: UseGetPaginatedNurseriesProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetPaginatedNurseries,
    GetPaginatedNurseriesVariables
  >(GET_PAGINATED_NURSERIES, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
    },
    fetchPolicy: 'network-only',
  })

  return {
    nurseries: data?.nurseries.data || [],
    meta: data?.nurseries.meta || { total: 0, page, pageSize, totalPages: 0 },
    loading,
    error,
    refetch,
  }
}
