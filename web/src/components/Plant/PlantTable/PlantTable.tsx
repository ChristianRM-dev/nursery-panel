import React, { useCallback, useMemo } from 'react';
import {
  useGetPaginatedPlants,
} from 'src/hooks/Plants/useGetPaginatedPlants';
import { PlantTableRow } from './PlantTable.types';
import { plantTableConfig } from './PlantTable.config';
import { TableActionEvent, TableQuery } from 'src/components/Shared/PaginatedTable/PaginatedTable.types';
import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable';

const PlantTable = () => {
  console.log('PlantTable rendered'); // Debug log

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
  const handleAction = useCallback((event: TableActionEvent<PlantTableRow>) => {
    console.log('Action:', event.type, 'on row:', event.row);
  }, []);

  // Memoize the handleQueryChange function
  const handleQueryChange = useCallback((query: TableQuery) => {
    console.log('Refetching with query:', query); // Debug log
    refetch(query);
  }, [refetch]);

  return (
    <>
      <PaginatedTable<PlantTableRow>
        data={tableData}
        config={plantTableConfig}
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

export default React.memo(PlantTable); // Memoize the component