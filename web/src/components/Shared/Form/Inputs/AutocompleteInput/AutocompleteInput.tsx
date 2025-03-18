import { Autocomplete, AutocompleteProps, ComboboxItem } from '@mantine/core';
import { useState } from 'react';

interface AutocompleteInputProps
  extends Omit<AutocompleteProps, 'data' | 'onChange'> {
  options: ComboboxItem[]; // Use Mantine's ComboboxItem type
  loading?: boolean;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void; // Add onChange prop to handle value changes
}

export const AutocompleteInput = ({
  options,
  loading = false,
  onSearch,
  onChange,
  ...rest
}: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState('');

  // Handle input changes and trigger onSearch
  const handleInputChange = (value: string) => {
    setInputValue(value); // Update the input value as the user types
    onSearch?.(value); // Trigger the search callback
  };

  // Handle selection changes and trigger onChange with the value (ID)
  const handleChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setInputValue(selectedOption.label); // Update the input value to show the label
      onChange?.(selectedOption.value); // Return the value (ID) to the parent
    } else {
      setInputValue(value); // Allow free-form input (if needed)
      onChange?.(value); // Return the raw value to the parent
    }
  };

  return (
    <Autocomplete
      data={options}
      value={inputValue}
      onChange={handleChange} // Use handleChange to manage value
      onInput={(event) => handleInputChange(event.currentTarget.value)} // Use handleInputChange to manage input
      {...rest}
      clearable
    />
  );
};