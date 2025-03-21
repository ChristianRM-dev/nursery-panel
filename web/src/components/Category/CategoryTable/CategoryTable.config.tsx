// web/src/components/Category/CategoryTable/CategoryTable.config.tsx
import { Badge } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { CategoryTableRow } from './CategoryTable.types'

export const categoryTableConfig: TableConfig<CategoryTableRow> = {
  columns: [
    {
      field: 'name',
      header: 'Nombre',
      formatter: (value: string) => (
        <>
          <Badge color="teal" variant="light">
            {value}
          </Badge>
        </>
      ),
    },
    {
      field: 'description',
      header: 'Descripción',
    },
  ],
  actions: [
    {
      type: 'Details',
      icon: <IconDetails />,
      tooltip: 'Ver Detalles de la Categoría',
    },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Editar Categoría' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Eliminar Categoría' },
  ],
  searchPlaceholder: 'Buscar categorías...',
}
