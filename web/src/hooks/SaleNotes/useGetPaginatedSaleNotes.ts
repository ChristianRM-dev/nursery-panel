import { gql, useQuery } from '@apollo/client'
import { GetPaginatedSaleNotes, GetPaginatedSaleNotesVariables } from 'types/graphql'

const GET_PAGINATED_SALE_NOTES = gql`
  query GetPaginatedSaleNotes(
    $pagination: PaginationInput!
    $sort: SortInput
    $search: SearchInput
  ) {
    saleNotes(pagination: $pagination, sort: $sort, search: $search) {
      data {
        id
        folio
        total
        customer {
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
}

export type GetPaginatedSaleNotesItem = GetPaginatedSaleNotes['saleNotes']['data']

export const useGetPaginatedSaleNotes = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
}: UseGetPaginatedSaleNotesProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetPaginatedSaleNotes,
    GetPaginatedSaleNotesVariables
  >(GET_PAGINATED_SALE_NOTES, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
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
