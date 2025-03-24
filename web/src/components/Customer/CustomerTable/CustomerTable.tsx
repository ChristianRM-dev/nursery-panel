// web/src/components/Customer/CustomerTable/CustomerTable.tsx
import React, { useCallback } from 'react'

import { Text } from '@mantine/core'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useDeleteCustomer } from 'src/hooks/Customers/useDeleteCustomer'
import { useGetPaginatedCustomers } from 'src/hooks/Customers/useGetPaginatedCustomers'
import { useConfirmModal } from 'src/hooks/useConfirmModal'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapGetPaginatedCustomersItemToCustomerTableRow } from 'src/utils/Mappers/CustomerMappers'

import { customerTableConfig } from './CustomerTable.config'
import { CustomerTableRow } from './CustomerTable.types'

const CustomerTable = () => {
  const { customers, meta, refetch, loading } = useGetPaginatedCustomers({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deleteCustomer } = useDeleteCustomer({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Cliente "${data.deleteCustomer.name}" eliminado correctamente!`
      )
      refetch({})
    },
    onError: (error) => {
      showErrorNotification(
        'Error al eliminar el cliente. Por favor, inténtelo de nuevo.'
      )
      console.error('Error deleting customer:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
    navigate(routes.adminCustomerDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditCustomer({ id }))
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      deleteCustomer(id)
    },
    [deleteCustomer]
  )

  const handleShowDeleteConfirm = useCallback(
    (id: string, name: string) => {
      openConfirmModal({
        title: 'Eliminar Cliente',
        message: (
          <>
            <Text>
              {`¿Está seguro de que desea eliminar a "${name}"? Esta acción no se puede deshacer.`}
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
    (event: TableActionEvent<CustomerTableRow>) => {
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
    <PaginatedTable<CustomerTableRow>
      data={mapGetPaginatedCustomersItemToCustomerTableRow(customers)}
      config={customerTableConfig}
      pagination={{
        ...meta,
      }}
      onAction={handleAction}
      onQueryChange={handleQueryChange}
      loading={loading}
    />
  )
}

export default React.memo(CustomerTable)
