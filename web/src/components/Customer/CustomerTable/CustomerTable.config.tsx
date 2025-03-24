// web/src/components/Customer/CustomerTable/CustomerTable.config.tsx
import { Text } from '@mantine/core'
import { IconDetails, IconEdit, IconTrash } from '@tabler/icons-react'

import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

import { CustomerTableRow } from './CustomerTable.types'

export const customerTableConfig: TableConfig<CustomerTableRow> = {
  columns: [
    { field: 'name', header: 'Nombre' },
    { field: 'phone', header: 'Teléfono' },
    {
      field: 'email',
      header: 'Email',
      formatter: (value: string) => <Text>{value || 'No proporcionado'}</Text>,
    },
  ],
  actions: [
    {
      type: 'Details',
      icon: <IconDetails />,
      tooltip: 'Ver Detalles del Cliente',
    },
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Editar Cliente' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Eliminar Cliente' },
  ],
  searchPlaceholder: 'Buscar clientes...',
}
