// web/src/pages/AdminNurseriesPage/AdminNurseriesPage.tsx
import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import NurseryTable from 'src/components/Nursery/NurseryTable/NurseryTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminNurseriesPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewNursery())
  }, [])

  return (
    <>
      <Metadata
        title="AdminNurseries"
        description="Página de Administración de Viveros"
      />
      <AdminTablePageLayout title="Viveros" onFabClick={handleFabClick}>
        <NurseryTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminNurseriesPage
