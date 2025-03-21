import { Badge, NumberFormatter } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { PlantTableRow } from './PlantTable.types'

export const plantTableConfig: TableConfig<PlantTableRow> = {
  columns: [
    { field: 'name', header: 'Name' },
    {
      field: 'price',
      header: 'Price',
      formatter: (value: number) => (
        <>
          <NumberFormatter
            prefix="$"
            suffix="MXN"
            value={value}
            thousandSeparator
          />
        </>
      ),
    },
    {
      field: 'category',
      header: 'Category',
      formatter: (value: string) => (
        <>
          <Badge color="teal" variant="light">
            {value}
          </Badge>
        </>
      ),
    },
    {
      field: 'presentationType',
      header: 'Presentation Type',
      formatter: (value: string) => (
        <>
          <Badge color="blue" variant="light">
            {value}
          </Badge>
        </>
      ),
    },
  ],
  actions: [
    { type: 'Details', icon: <IconDetails />, tooltip: 'See Plant Details' },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Edit Plant' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Delete Plant' },
  ],
  searchPlaceholder: 'Search plants...',
}
