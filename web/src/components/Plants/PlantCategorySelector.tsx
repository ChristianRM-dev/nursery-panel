import { useState, useEffect } from 'react'
import { useFilterPlants } from 'src/hooks/Plants/useFilterPlants'
import { AutocompleteInput, AutocompleteInputOption } from '../Shared/Form/Inputs/AutocompleteInput/AutocompleteInput'

export const PlantSelector = () => {
  const { filteredPlants, loading, handleFilter } = useFilterPlants({ initialQuery: '' })
  const [options, setOptions] = useState<AutocompleteInputOption[]>([])

  useEffect(() => {
    setOptions(filteredPlants.map((p) => ({ value: p.id, label: p.name })))
  }, [filteredPlants])

  return (
    <AutocompleteInput options={options} loading={loading} onSearch={handleFilter} />
  )
}
