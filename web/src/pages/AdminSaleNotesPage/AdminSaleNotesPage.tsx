// web/src/pages/AdminSaleNotesPage/AdminSaleNotesPage.tsx
import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import SaleNoteTable from 'src/components/SaleNote/SaleNoteTable/SaleNoteTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminSaleNotesPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewSaleNote())
  }, [])

  return (
    <>
      <Metadata
        title="AdminSaleNotes"
        description="Página de Administración de Notas de Venta"
      />
      <AdminTablePageLayout title="Notas de Venta" onFabClick={handleFabClick}>
        <SaleNoteTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminSaleNotesPage
