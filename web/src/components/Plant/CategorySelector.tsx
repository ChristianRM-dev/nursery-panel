import { useState, useEffect } from 'react'
import { useFilterCategories } from 'src/hooks/Categories/useFilterCategories'
import { AutocompleteInput, AutocompleteInputOption } from '../Shared/Form/Inputs/AutocompleteInput/AutocompleteInput'

export const CategorySelector = () => {
  const { filteredCategories, loading, handleFilter } = useFilterCategories({ initialQuery: '' })
  const [options, setOptions] = useState<AutocompleteInputOption[]>([])

  useEffect(() => {
    setOptions(filteredCategories.map((c) => ({ value: c.id, label: c.name })))
  }, [filteredCategories])

  return (
    <AutocompleteInput options={options} loading={loading} onSearch={handleFilter} />
  )
}
