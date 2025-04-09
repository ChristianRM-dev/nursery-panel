// web/src/components/Category/CategoryTable/CategoryTable.tsx
import React, { useCallback } from 'react'

import { Text } from '@mantine/core'

import { navigate, routes } from '@redwoodjs/router'

import PaginatedTable from 'src/components/Shared/PaginatedTable/PaginatedTable'
import {
  TableActionEvent,
  TableQuery,
} from 'src/components/Shared/PaginatedTable/PaginatedTable.types'
import { useDeleteCategory } from 'src/hooks/Categories/useDeleteCategory'
import { useGetPaginatedCategories } from 'src/hooks/Categories/useGetPaginatedCategories'
import { useConfirmModal } from 'src/hooks/useConfirmModal'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapGetPaginatedCategoriesItemToCategoryTableRow } from 'src/utils/Mappers'

import { categoryTableConfig } from './CategoryTable.config'
import { CategoryTableRow } from './CategoryTable.types'

const CategoryTable: React.FC = () => {
  const { categories, meta, refetch, loading } = useGetPaginatedCategories({
    page: 1,
    pageSize: 10,
  })
  const { showSuccessNotification, showErrorNotification } = useNotifications()
  const { openConfirmModal } = useConfirmModal()
  const { deleteCategory } = useDeleteCategory({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Categoría "${data.deleteCategory.name}" eliminada correctamente!`
      )
      refetch({})
    },
    onError: (error) => {
      showErrorNotification(
        'Error al eliminar la categoría. Por favor, inténtelo de nuevo.'
      )
      console.error('Error deleting category:', error)
    },
  })

  const handleSeeDetails = useCallback((id: string) => {
    navigate(routes.adminCategoryDetails({ id }))
  }, [])

  const handleEdit = useCallback((id: string) => {
    navigate(routes.adminEditCategory({ id }))
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      deleteCategory(id)
    },
    [deleteCategory]
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
    (event: TableActionEvent<CategoryTableRow>) => {
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
      <PaginatedTable<CategoryTableRow>
        data={mapGetPaginatedCategoriesItemToCategoryTableRow(categories)}
        config={categoryTableConfig}
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

export default React.memo(CategoryTable)
