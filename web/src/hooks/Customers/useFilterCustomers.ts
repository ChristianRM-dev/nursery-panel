// web/src/hooks/Customers/useFilterCustomers.ts
import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GetCustomers, GetCustomersVariables } from 'types/graphql'

const GET_CUSTOMERS = gql`
  query GetCustomers($pagination: PaginationInput!, $search: SearchInput) {
    customers(pagination: $pagination, search: $search) {
      data {
        id
        name
        phone
      }
      meta {
        total
      }
    }
  }
`

interface UseFilterCustomersProps {
  initialQuery?: string
}

export const useFilterCustomers = ({
  initialQuery = '',
}: UseFilterCustomersProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredCustomers, setFilteredCustomers] = useState<
    { id: string; name: string; phone: string }[]
  >([])

  const { data, loading, error, refetch } = useQuery<
    GetCustomers,
    GetCustomersVariables
  >(GET_CUSTOMERS, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.customers?.data) {
      setFilteredCustomers(data.customers.data)
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
    filteredCustomers,
    loading,
    error,
    handleFilter,
  }
}
