// web/src/components/SaleNote/SaleNoteTable/SaleNoteTable.config.tsx
import { Badge, NumberFormatter } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { SaleNoteTableRow } from './SaleNoteTable.types'

export const saleNoteTableConfig: TableConfig<SaleNoteTableRow> = {
  columns: [
    {
      field: 'folio',
      header: 'Folio',
      formatter: (value: string) => (
        <>
          <Badge color="indigo" variant="light">
            {value}
          </Badge>
        </>
      ),
    },
    { field: 'customer', header: 'Cliente' },
    { field: 'nursery', header: 'Vivero' },
    {
      field: 'total',
      header: 'Total',
      formatter: (value: number) => (
        <NumberFormatter
          prefix="$"
          suffix=" MXN"
          value={value}
          thousandSeparator
          decimalScale={2}
        />
      ),
    },
    {
      field: 'createdAt',
      header: 'Fecha',
      formatter: (value: string) => new Date(value).toLocaleDateString(),
    },
  ],
  actions: [
    {
      type: 'Details',
      icon: <IconDetails />,
      tooltip: 'Ver Detalles de la Nota',
    },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Editar Nota' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Eliminar Nota' },
  ],
  searchPlaceholder: 'Buscar notas de venta...',
}
