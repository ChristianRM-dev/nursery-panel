import { Autocomplete, AutocompleteProps } from '@mantine/core'
import { useEffect, useState } from 'react'

export interface AutocompleteInputOption {
  value: string
  label: string
}

interface AutocompleteInputProps extends Omit<AutocompleteProps, 'data'> {
  options: AutocompleteInputOption[]
  loading?: boolean
  onSearch?: (query: string) => void
}

export const AutocompleteInput = ({
  options,
  loading = false,
  onSearch,
  ...rest
}: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Autocomplete
      data={options}
      value={inputValue}
      onChange={setInputValue}
      onInput={(event) => onSearch?.(event.currentTarget.value)}
      {...rest}
    />
  )
}
