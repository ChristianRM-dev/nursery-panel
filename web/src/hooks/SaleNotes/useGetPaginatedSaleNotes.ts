import { gql, useQuery } from '@apollo/client'
import {
  GetPaginatedSaleNotes,
  GetPaginatedSaleNotesVariables,
} from 'types/graphql'

const GET_PAGINATED_SALE_NOTES = gql`
  query GetPaginatedSaleNotes(
    $pagination: PaginationInput!
    $sort: SortInput
    $search: SearchInput
    $customerId: String
  ) {
    saleNotes(
      pagination: $pagination
      sort: $sort
      search: $search
      customerId: $customerId
    ) {
      data {
        id
        folio
        status
        total
        customer {
          id
          name
        }
        nursery {
          name
        }
        createdAt
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

interface UseGetPaginatedSaleNotesProps {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  customerId?: string | null
}

export type GetPaginatedSaleNotesItem =
  GetPaginatedSaleNotes['saleNotes']['data']

export const useGetPaginatedSaleNotes = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
  customerId = null,
}: UseGetPaginatedSaleNotesProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetPaginatedSaleNotes,
    GetPaginatedSaleNotesVariables
  >(GET_PAGINATED_SALE_NOTES, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
      customerId: customerId || undefined,
    },
    fetchPolicy: 'network-only',
  })

  return {
    saleNotes: data?.saleNotes.data || [],
    meta: data?.saleNotes.meta || { total: 0, page, pageSize, totalPages: 0 },
    loading,
    error,
    refetch,
  }
}
