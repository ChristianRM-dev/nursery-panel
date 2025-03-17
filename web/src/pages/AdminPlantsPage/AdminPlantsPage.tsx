import { Metadata } from '@redwoodjs/web'
import React, { useCallback, memo } from 'react'
import PlantsTable from 'src/components/Plants/PlantsTable/PlantsTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminPlantsPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    console.log('Floating Action Button Clicked!')
    // Add your logic for handling the FAB click (e.g., open a modal to add a new plant)
  }, [])

  return (
    <>
      <Metadata title="AdminPlants" description="AdminPlants page" />

      <AdminTablePageLayout title="Plants" onFabClick={handleFabClick}>
        <PlantsTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminPlantsPage
