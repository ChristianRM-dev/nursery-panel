import React from 'react';
import { IconEdit, IconTrash, IconTicket } from '@tabler/icons-react';
import { TableActionEvent, TableActionType, TableConfig, TableQuery } from '../Shared/PaginatedTable/PaginatedTable.types';
import { useGetPaginatedPlants } from 'src/hooks/Plants/useGetPaginatedPlants';
import PaginatedTable from '../Shared/PaginatedTable/PaginatedTable';

const PlantsTable = () => {
  const { plants, meta, loading, error, refetch } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  });

  const config: TableConfig<typeof plants[0]> = {
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'stock', header: 'Stock' },
    ],
    actions: [
      { type: TableActionType.Edit, icon: <IconEdit />, tooltip: 'Edit Plant' },
      { type: TableActionType.Delete, icon: <IconTrash />, tooltip: 'Delete Plant' },
      { type: TableActionType.CreateOrderTicket, icon: <IconTicket />, tooltip: 'Create Order Ticket' },
    ],
    searchPlaceholder: 'Search plants...',
  };

  const handleAction = (event: TableActionEvent<typeof plants[0]>) => {
    console.log('Action:', event.type, 'on row:', event.row);
  };

  const handleQueryChange = (query: TableQuery) => {
    refetch(query);
  };

  return (
    <PaginatedTable
      data={plants}
      config={config}
      pagination={{
        page: meta.page,
        pageSize: meta.pageSize,
        total: meta.total,
        totalPages: meta.totalPages,
      }}
      onAction={handleAction}
      onQueryChange={handleQueryChange}
    />
  );
};

export default PlantsTable;