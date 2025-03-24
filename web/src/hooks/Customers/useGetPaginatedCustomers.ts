// web/src/hooks/Customers/useGetPaginatedCustomers.ts
import { gql, useQuery } from '@apollo/client'
import {
  GetPaginatedCustomers,
  GetPaginatedCustomersVariables,
} from 'types/graphql'

const GET_PAGINATED_CUSTOMERS = gql`
  query GetPaginatedCustomers(
    $pagination: PaginationInput!
    $sort: SortInput
    $search: SearchInput
  ) {
    customers(pagination: $pagination, sort: $sort, search: $search) {
      data {
        id
        name
        phone
        email
        saleNotes {
          id
        }
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

interface UseGetPaginatedCustomersProps {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export type GetPaginatedCustomersItem =
  GetPaginatedCustomers['customers']['data']

export const useGetPaginatedCustomers = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
}: UseGetPaginatedCustomersProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetPaginatedCustomers,
    GetPaginatedCustomersVariables
  >(GET_PAGINATED_CUSTOMERS, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
    },
    fetchPolicy: 'network-only',
  })

  return {
    customers: data?.customers.data || [],
    meta: data?.customers.meta || { total: 0, page, pageSize, totalPages: 0 },
    loading,
    error,
    refetch,
  }
}
