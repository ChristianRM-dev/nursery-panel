import React, { useCallback, useMemo } from 'react';
import {
  GetPaginatedPlantsItem,
  useGetPaginatedPlants,
} from 'src/hooks/Plants/useGetPaginatedPlants';
import { PlantsTableRow } from './PlantsTable.types';
import { plantsTableConfig } from './PlantsTable.config';
import { TableActionEvent, TableQuery } from 'src/components/Shared/PaginatedTable/PaginatedTable.types';
import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable';

const PlantsTable = () => {
  console.log('PlantsTable rendered'); // Debug log

  const { plants, meta, refetch, loading } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  });

  // Memoize the table data
  const tableData = useMemo(() => {
    return plants.map((plant) => ({
      ...plant,
      // Add any additional transformations here
    }));
  }, [plants]);

  // Memoize the handleAction function
  const handleAction = useCallback((event: TableActionEvent<PlantsTableRow>) => {
    console.log('Action:', event.type, 'on row:', event.row);
  }, []);

  // Memoize the handleQueryChange function
  const handleQueryChange = useCallback((query: TableQuery) => {
    console.log('Refetching with query:', query); // Debug log
    refetch(query);
  }, [refetch]);

  return (
    <>
      <PaginatedTable<PlantsTableRow>
        data={tableData}
        config={plantsTableConfig}
        pagination={{
          ...meta,
        }}
        onAction={handleAction}
        onQueryChange={handleQueryChange}
        loading={loading} // Pass loading state to the table
      />
    </>
  );
};

export default React.memo(PlantsTable); // Memoize the component