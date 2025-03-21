// web/src/hooks/Plants/useFilterPlants.ts
import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'

const GET_PLANTS = gql`
  query GetPlants($pagination: PaginationInput!, $search: SearchInput) {
    plants(pagination: $pagination, search: $search) {
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

interface UseFilterPlantsProps {
  initialQuery?: string
}

export const useFilterPlants = ({
  initialQuery = '',
}: UseFilterPlantsProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredPlants, setFilteredPlants] = useState<
    { id: string; name: string }[]
  >([])

  const { data, loading, error, refetch } = useQuery(GET_PLANTS, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.plants?.data) {
      setFilteredPlants(data.plants.data)
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
    filteredPlants,
    loading,
    error,
    handleFilter,
  }
}
