// web/src/components/Plant/PlantTable/PlantTable.config.tsx
import { Badge, NumberFormatter } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { PlantTableRow } from './PlantTable.types'

export const plantTableConfig: TableConfig<PlantTableRow> = {
  columns: [
    { field: 'name', header: 'Nombre' },
    {
      field: 'price',
      header: 'Precio',
      formatter: (value: number) => (
        <>
          <NumberFormatter
            prefix="$"
            suffix=" MXN"
            value={value}
            thousandSeparator
          />
        </>
      ),
    },
    {
      field: 'category',
      header: 'Categoría',
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
      header: 'Tipo de Presentación',
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
    {
      type: 'Details',
      icon: <IconDetails />,
      tooltip: 'Ver Detalles de la Planta',
    },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Editar Planta' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Eliminar Planta' },
  ],
  searchPlaceholder: 'Buscar plantas...',
}
