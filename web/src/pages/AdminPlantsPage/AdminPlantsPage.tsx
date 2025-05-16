// web/src/pages/AdminPlantsPage/AdminPlantsPage.tsx
import React, { useCallback, memo } from 'react'

import { Button, LoadingOverlay } from '@mantine/core'
import { IconFileExcel } from '@tabler/icons-react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import PlantTable from 'src/components/Plant/PlantTable/PlantTable'
import { useDownloadPlantsExcel } from 'src/hooks/Plants/useDownloadPlantsExcel'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminPlantsPage: React.FC = memo(() => {
  const { download, loading, error } = useDownloadPlantsExcel()
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewPlant())
  }, [])

  const handleDownloadCatalog = () => {
    console.log('handleDownloadCatalog')
    download()
  }

  if (loading) {
    return <LoadingOverlay visible />
  }

  if (error) {
    console.log('Error:', error)
    return <>Error</>
  }

  return (
    <>
      <Metadata
        title="AdminPlants"
        description="Página de Administración de Plantas"
      />
      <AdminTablePageLayout
        title="Plantas"
        onFabClick={handleFabClick}
        actionButtons={
          <>
            <Button
              leftSection={<IconFileExcel size={16} />}
              variant="filled"
              onClick={() => handleDownloadCatalog()}
            >
              Descargar catalogo
            </Button>
          </>
        }
      >
        <PlantTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminPlantsPage
