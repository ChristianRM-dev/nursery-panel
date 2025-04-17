// web/src/hooks/Plants/useFilterPlants.ts
import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GetPlants, GetPlantsVariables } from 'types/graphql'

const GET_PLANTS = gql`
  query GetPlants(
    $pagination: PaginationInput!
    $search: SearchInput
    $excludeIds: [String!]
  ) {
    plants(pagination: $pagination, search: $search, excludeIds: $excludeIds) {
      data {
        id
        name
        price
      }
      meta {
        total
      }
    }
  }
`

interface UseFilterPlantsProps {
  initialQuery?: string
  excludeIds?: string[]
}

type FilteredPlants = GetPlants['plants']['data']

export const useFilterPlants = ({
  initialQuery = '',
  excludeIds = [],
}: UseFilterPlantsProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredPlants, setFilteredPlants] = useState<FilteredPlants>([])

  const { data, loading, error, refetch } = useQuery<
    GetPlants,
    GetPlantsVariables
  >(GET_PLANTS, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
      excludeIds: excludeIds.length > 0 ? excludeIds : null,
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
