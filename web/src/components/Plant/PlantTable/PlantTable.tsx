import React, { useCallback } from 'react'

import { Text } from '@mantine/core'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useDeletePlant } from 'src/hooks/Plants/useDeletePlant'
import { useGetPaginatedPlants } from 'src/hooks/Plants/useGetPaginatedPlants'
import { useConfirmModal } from 'src/hooks/useConfirmModal'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapGetPaginatedPlantsItemToPlantTableRow } from 'src/utils/Mappers'

import { plantTableConfig } from './PlantTable.config'
import { PlantTableRow } from './PlantTable.types'

const PlantTable = () => {
  const { plants, meta, refetch, loading } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deletePlant } = useDeletePlant({
    onCompleted: (data) => {
      showSuccessNotification(
        `Plant "${data.deletePlant.name}" deleted successfully!`
      )
      refetch({})
      // Optionally redirect or perform other actions
    },
    onError: (error) => {
      showErrorNotification('Failed to delete plant. Please try again.')
      console.error('Error deleting plant:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
    // Use the route function and pass the `id` as an argument
    navigate(routes.adminPlantDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditPlant({ id }))
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      deletePlant(id)
    },
    [deletePlant]
  )

  const handleShowDeleteConfirm = useCallback(
    (id: string, name: string) => {
      openConfirmModal({
        title: 'Delete Item',
        message: (
          <>
            <Text>
              {`Are you sure you want to "${name}". This action cannot be
              undone.`}
            </Text>
          </>
        ),
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        // eslint-disable-next-line prettier/prettier
        onConfirm: () => {
          handleDelete(id)
        },
        onCancel: () => {},
      })
    },
    [handleDelete, openConfirmModal]
  )

  // Memoize the handleAction function
  const handleAction = useCallback(
    (event: TableActionEvent<PlantTableRow>) => {
      const { type, row } = event
      const { id, name } = row
      switch (type) {
        case 'Details':
          handleSeeDetails(id)
          break
        case 'Edit':
          handleEdit(id)
          break
        case 'Delete':
          handleShowDeleteConfirm(id, name)
          break
        default:
          console.log('Action:', type, 'on row:', row)
          break
      }
    },
    [handleEdit, handleSeeDetails, handleShowDeleteConfirm]
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
