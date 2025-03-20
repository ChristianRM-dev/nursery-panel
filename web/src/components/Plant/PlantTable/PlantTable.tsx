import React, { useCallback } from 'react'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useGetPaginatedPlants } from 'src/hooks/Plants/useGetPaginatedPlants'
import { mapGetPaginatedPlantsItemToPlantTableRow } from 'src/utils/Mappers'

import { plantTableConfig } from './PlantTable.config'
import { PlantTableRow } from './PlantTable.types'

const PlantTable = () => {
  const { plants, meta, refetch, loading } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  })
  const handleSeeDetails = useCallback((id: string) => {
    // Use the route function and pass the `id` as an argument
    navigate(routes.adminPlantDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditPlant({ id }))
  }, [])

  // Memoize the handleAction function
  const handleAction = useCallback(
    (event: TableActionEvent<PlantTableRow>) => {
      const { type, row } = event
      const { id } = row
      switch (type) {
        case 'Details':
          handleSeeDetails(id)
          break
        case 'Edit':
          handleEdit(id)
          break
        default:
          console.log('Action:', type, 'on row:', row)
          break
      }
    },
    [handleSeeDetails]
  )

  // Memoize the handleQueryChange function
  const handleQueryChange = useCallback(
    (query: TableQuery) => {
      console.log('Refetching with query:', query) // Debug log
      refetch(query)
    },
    [refetch]
  )

  return (
    <>
      <PaginatedTable<PlantTableRow>
        data={mapGetPaginatedPlantsItemToPlantTableRow(plants)}
        config={plantTableConfig}
        pagination={{
          ...meta,
        }}
        onAction={handleAction}
        onQueryChange={handleQueryChange}
        loading={loading} // Pass loading state to the table
      />
    </>
  )
}

export default React.memo(PlantTable) // Memoize the component
