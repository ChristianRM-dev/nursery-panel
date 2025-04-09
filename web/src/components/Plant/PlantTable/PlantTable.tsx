// web/src/components/Plant/PlantTable/PlantTable.tsx
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

const PlantTable: React.FC = () => {
  const { plants, meta, refetch, loading } = useGetPaginatedPlants({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deletePlant } = useDeletePlant({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Planta "${data.deletePlant.name}" eliminada correctamente!`
      )
      refetch({})
    },
    onError: (error) => {
      showErrorNotification(
        'Error al eliminar la planta. Por favor, inténtelo de nuevo.'
      )
      console.error('Error deleting plant:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
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
        title: 'Eliminar Elemento',
        message: (
          <>
            <Text>
              {`¿Está seguro de que desea eliminar "${name}"? Esta acción no se puede deshacer.`}{' '}
            </Text>
          </>
        ),
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        onConfirm: () => {
          handleDelete(id)
        },
        onCancel: () => {},
      })
    },
    [handleDelete, openConfirmModal]
  )

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

  const handleQueryChange = useCallback(
    (query: TableQuery) => {
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
        loading={loading}
      />
    </>
  )
}

export default React.memo(PlantTable)
