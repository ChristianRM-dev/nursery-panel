import { gql, useQuery } from '@apollo/client'

const GET_PAGINATED_CATEGORIES = gql`
  query GetPaginatedCategories($pagination: PaginationInput!, $sort: SortInput, $search: SearchInput) {
    categories(pagination: $pagination, sort: $sort, search: $search) {
      data {
        id
        name
        description
        plants {
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

interface UseGetPaginatedCategoriesProps {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export const useGetPaginatedCategories = ({
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  search = '',
}: UseGetPaginatedCategoriesProps) => {
  const { data, loading, error, refetch } = useQuery(GET_PAGINATED_CATEGORIES, {
    variables: {
      pagination: { page, pageSize },
      sort: sortField ? { sortField, sortOrder } : null,
      search: search ? { search } : null,
    },
    fetchPolicy: 'cache-and-network',
  })

  return {
    categories: data?.categories.data || [],
    meta: data?.categories.meta || { total: 0, page, pageSize, totalPages: 0 },
    loading,
    error,
    refetch,
  }
}