import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GetSaleNotes, GetSaleNotesVariables } from 'types/graphql'

const GET_SALE_NOTES = gql`
  query GetSaleNotes($pagination: PaginationInput!, $search: SearchInput) {
    saleNotes(pagination: $pagination, search: $search) {
      data {
        id
        folio
        customer {
          name
        }
      }
      meta {
        total
      }
    }
  }
`

interface UseFilterSaleNotesProps {
  initialQuery?: string
}

export const useFilterSaleNotes = ({
  initialQuery = '',
}: UseFilterSaleNotesProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [filteredSaleNotes, setFilteredSaleNotes] = useState<
    { id: string; folio: string; customer: string }[]
  >([])

  const { data, loading, error, refetch } = useQuery<
    GetSaleNotes,
    GetSaleNotesVariables
  >(GET_SALE_NOTES, {
    variables: {
      pagination: { page: 1, pageSize: 10 },
      search: { search: query },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.saleNotes?.data) {
      setFilteredSaleNotes(
        data.saleNotes.data.map((note) => ({
          id: note.id,
          folio: note.folio,
          customer: note.customer.name,
        }))
      )
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
    filteredSaleNotes,
    loading,
    error,
    handleFilter,
  }
}
