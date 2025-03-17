// web/src/hooks/Categories/useFilterCategories.ts
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

const GET_CATEGORIES = gql`
  query GetCategories($pagination: PaginationInput!, $search: SearchInput) {
    categories(pagination: $pagination, search: $search) {
      data {
        id
        name
      }
      meta {
        total
      }
    }
  }
`

interface UseFilterCategoriesProps {
  initialQuery?: string
}

export const useFilterCategories = ({
  initialQuery = '',
}: UseFilterCategoriesProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredCategories, setFilteredCategories] = useState<
    { id: string; name: string }[]
  >([])

  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.categories?.data) {
      setFilteredCategories(data.categories.data)
    }
  }, [data])

  const handleFilter = (newQuery: string) => {
    setQuery(newQuery)
    refetch({
      pagination: { page: 1, pageSize: 10 },
      search: { search: newQuery },
    })
  }

  return {
    filteredCategories,
    loading,
    error,
    handleFilter,
  }
}
