// web/src/pages/AdminCustomersPage/AdminCustomersPage.tsx
import React, { useCallback, memo } from 'react'

import { routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import CustomerTable from 'src/components/Customer/CustomerTable/CustomerTable'
import { AdminTablePageLayout } from 'src/layouts/AdminTablePageLayout/AdminTablePageLayout'

const AdminCustomersPage: React.FC = memo(() => {
  const handleFabClick = useCallback(() => {
    navigate(routes.adminNewCustomer())
  }, [])

  return (
    <>
      <Metadata
        title="AdminCustomers"
        description="Página de Administración de Clientes"
      />
      <AdminTablePageLayout title="Clientes" onFabClick={handleFabClick}>
        <CustomerTable />
      </AdminTablePageLayout>
    </>
  )
})

export default AdminCustomersPage
