// web/src/components/Nursery/NurseryTable/NurseryTable.tsx
import React, { useCallback } from 'react'

import { Text } from '@mantine/core'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useDeleteNursery } from 'src/hooks/Nurseries/useDeleteNursery'
import { useGetPaginatedNurseries } from 'src/hooks/Nurseries/useGetPaginatedNurseries'
import { useConfirmModal } from 'src/hooks/useConfirmModal'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapGetPaginatedNurseriesItemToNurseryTableRow } from 'src/utils/Mappers'

import { nurseryTableConfig } from './NurseryTable.config'
import { NurseryTableRow } from './NurseryTable.types'

const NurseryTable = () => {
  const { nurseries, meta, refetch, loading } = useGetPaginatedNurseries({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deleteNursery } = useDeleteNursery({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Vivero "${data.deleteNursery.name}" eliminado correctamente!`
      )
      refetch({})
    },
    onError: (error) => {
      showErrorNotification(
        'Error al eliminar el vivero. Por favor, inténtelo de nuevo.'
      )
      console.error('Error deleting nursery:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
    navigate(routes.adminNurseryDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditNursery({ id }))
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      deleteNursery(id)
    },
    [deleteNursery]
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
    (event: TableActionEvent<NurseryTableRow>) => {
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
      <PaginatedTable<NurseryTableRow>
        data={mapGetPaginatedNurseriesItemToNurseryTableRow(nurseries)}
        config={nurseryTableConfig}
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

export default React.memo(NurseryTable)
