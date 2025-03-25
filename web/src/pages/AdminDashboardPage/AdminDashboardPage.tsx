// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AdminDashboardPage: React.FC = () => {
  return (
    <>
      <Metadata title="AdminDashboard" description="AdminDashboard page" />

      <h1>AdminDashboardPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AdminDashboardPage/AdminDashboardPage.tsx</code>
      </p>
      {/*
          My default route is named `adminDashboard`, link to me with:
          `<Link to={routes.adminDashboard()}>AdminDashboard</Link>`
      */}
    </>
  )
}

export default AdminDashboardPage
