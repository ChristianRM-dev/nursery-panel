// web/src/components/SaleNote/SaleNoteTable/SaleNoteTable.tsx
import React, { useCallback } from 'react'

import { Text } from '@mantine/core'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useDeleteSaleNote } from 'src/hooks/SaleNotes/useDeleteSaleNote'
import { useGetPaginatedSaleNotes } from 'src/hooks/SaleNotes/useGetPaginatedSaleNotes'
import { useConfirmModal } from 'src/hooks/useConfirmModal'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapGetPaginatedSaleNotesItemToSaleNoteTableRow } from 'src/utils/Mappers/SaleNoteMappers'

import { saleNoteTableConfig } from './SaleNoteTable.config'
import { SaleNoteTableRow } from './SaleNoteTable.types'

const SaleNoteTable = () => {
  const { saleNotes, meta, refetch, loading } = useGetPaginatedSaleNotes({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deleteSaleNote } = useDeleteSaleNote({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Nota de venta #${data.deleteSaleNote.folio} eliminada correctamente!`
      )
      refetch({})
    },
    onError: (error) => {
      showErrorNotification(
        'Error al eliminar la nota de venta. Por favor, inténtelo de nuevo.'
      )
      console.error('Error deleting sale note:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
    navigate(routes.adminSaleNoteDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditSaleNote({ id }))
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      deleteSaleNote(id)
    },
    [deleteSaleNote]
  )

  const handleShowDeleteConfirm = useCallback(
    (id: string, folio: string) => {
      openConfirmModal({
        title: 'Eliminar Nota de Venta',
        message: (
          <>
            <Text>
              {`¿Está seguro de que desea eliminar la nota de venta #${folio}? Esta acción no se puede deshacer.`}
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

  const handleDownloadSaleNotePDF = useCallback((id: string) => {
    const url = routes.adminSaleNotePdf({ id })
    window.open(url, '_blank')
  }, [])

  const handleAddPayment = useCallback((id: string) => {
    navigate(routes.adminAddPaymentToSaleNote({ id }))
  }, [])

  const handleAction = useCallback(
    (event: TableActionEvent<SaleNoteTableRow>) => {
      const { type, row } = event
      const { id, folio } = row
      switch (type) {
        case 'Details':
          handleSeeDetails(id)
          break
        case 'Edit':
          handleEdit(id)
          break
        case 'Delete':
          handleShowDeleteConfirm(id, folio)
          break
        case 'DownloadFile':
          handleDownloadSaleNotePDF(id)
          break
        case 'AddPayment':
          handleAddPayment(id)
          break
        default:
          console.log('Action:', type, 'on row:', row)
          break
      }
    },
    [
      handleDownloadSaleNotePDF,
      handleEdit,
      handleSeeDetails,
      handleShowDeleteConfirm,
    ]
  )

  const handleQueryChange = useCallback(
    (query: TableQuery) => {
      refetch(query)
    },
    [refetch]
  )

  return (
    <PaginatedTable<SaleNoteTableRow>
      data={mapGetPaginatedSaleNotesItemToSaleNoteTableRow(saleNotes)}
      config={saleNoteTableConfig}
      pagination={{
        ...meta,
      }}
      onAction={handleAction}
      onQueryChange={handleQueryChange}
      loading={loading}
    />
  )
}

export default React.memo(SaleNoteTable)
