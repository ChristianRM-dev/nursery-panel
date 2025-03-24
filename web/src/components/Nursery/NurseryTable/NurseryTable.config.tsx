// web/src/components/Nursery/NurseryTable/NurseryTable.config.tsx
import { Badge } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { NurseryTableRow } from './NurseryTable.types'

export const nurseryTableConfig: TableConfig<NurseryTableRow> = {
  columns: [
    { field: 'name', header: 'Nombre' },
    { field: 'address', header: 'Dirección' },
    { field: 'phone', header: 'Teléfono' },
    {
      field: 'rfc',
      header: 'RFC',
      formatter: (value: string) => (
        <>
          <Badge color="teal" variant="light">
            {value}
          </Badge>
        </>
      ),
    },
  ],
  actions: [
    {
      type: 'Details',
      icon: <IconDetails />,
      tooltip: 'Ver Detalles del Vivero',
    },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Editar Vivero' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Eliminar Vivero' },
  ],
  searchPlaceholder: 'Buscar viveros...',
}
