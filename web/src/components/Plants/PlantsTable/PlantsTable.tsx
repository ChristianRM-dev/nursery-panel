import React from 'react'

import {
  GetPaginatedPlantsItem,
  useGetPaginatedPlants,
} from 'src/hooks/Plants/useGetPaginatedPlants'
import { PlantsTableRow } from './PlantsTable.types'
import { plantsTableConfig } from './PlantsTable.config'
import { TableActionEvent, TableQuery } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'

const PlantsTable = () => {
  const { plants, meta, refetch } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  })

  const handleAction = (event: TableActionEvent<PlantsTableRow>) => {
    console.log('Action:', event.type, 'on row:', event.row)
  }

  const handleQueryChange = (query: TableQuery) => {
    refetch(query)
  }

  // Mapper function
  const getPaginatedPlantsToPlantsTableRow = (
    plants: GetPaginatedPlantsItem
  ): PlantsTableRow[] => {
    return plants
  }

  return (
    <>
      <PaginatedTable<PlantsTableRow>
        data={getPaginatedPlantsToPlantsTableRow(plants)}
        config={plantsTableConfig}
        pagination={{
          ...meta,
        }}
        onAction={handleAction}
        onQueryChange={handleQueryChange}
      />
    </>
  )
}

export default PlantsTable
