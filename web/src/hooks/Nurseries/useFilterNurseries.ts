// web/src/hooks/Nurseries/useFilterNurseries.ts
import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GetNurseries, GetNurseriesVariables } from 'types/graphql'

const GET_NURSERIES = gql`
  query GetNurseries($pagination: PaginationInput!, $search: SearchInput) {
    nurseries(pagination: $pagination, search: $search) {
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

interface UseFilterNurseriesProps {
  initialQuery?: string
}

type FilteredNurseries = GetNurseries['nurseries']['data']

export const useFilterNurseries = ({
  initialQuery = '',
}: UseFilterNurseriesProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredNurseries, setFilteredNurseries] = useState<FilteredNurseries>(
    []
  )

  const { data, loading, error, refetch } = useQuery<
    GetNurseries,
    GetNurseriesVariables
  >(GET_NURSERIES, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.nurseries?.data) {
      setFilteredNurseries(data.nurseries.data)
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
    filteredNurseries,
    loading,
    error,
    handleFilter,
  }
}
