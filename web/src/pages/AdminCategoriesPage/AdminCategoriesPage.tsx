// web/src/pages/AdminCategoriesPage/AdminCategoriesPage.tsx
import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import CategoryTable from 'src/components/Category/CategoryTable/CategoryTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminCategoriesPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewCategory())
  }, [])

  return (
    <>
      <Metadata
        title="AdminCategories"
        description="Página de Administración de Categorías"
      />
      <AdminTablePageLayout title="Categorías" onFabClick={handleFabClick}>
        <CategoryTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminCategoriesPage
