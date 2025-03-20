import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import PlantTable from 'src/components/Plant/PlantTable/PlantTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminPlantsPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    console.log('Floating Action Button Clicked!')
    navigate(routes.adminNewPlant())
  }, [])

  return (
    <>
      <Metadata title="AdminPlants" description="AdminPlants page" />

      <AdminTablePageLayout title="Plants" onFabClick={handleFabClick}>
        <PlantTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminPlantsPage
