// web/src/pages/AdminPlantsPage/AdminPlantsPage.tsx
import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import PlantTable from 'src/components/Plant/PlantTable/PlantTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminPlantsPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewPlant())
  }, [])

  return (
    <>
      <Metadata
        title="AdminPlants"
        description="Página de Administración de Plantas"
      />
      <AdminTablePageLayout title="Plantas" onFabClick={handleFabClick}>
        <PlantTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminPlantsPage
