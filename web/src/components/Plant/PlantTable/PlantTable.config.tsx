
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { TableConfig } from 'src/components/Shared/PaginatedTable/PaginatedTable.types';
import { PlantTableRow } from './PlantTable.types';

export const plantTableConfig: TableConfig<PlantTableRow> = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: 'stock', header: 'Stock' },
  ],
  actions: [
    { type: 'Edit', icon: <IconEdit />, tooltip: 'Edit Plant' },
    { type: 'Delete', icon: <IconTrash />, tooltip: 'Delete Plant' },
  ],
  searchPlaceholder: 'Search plants...',
};