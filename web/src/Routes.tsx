import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'
import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      {/* Public Routes */}
      <Route path="/" page={HomePage} name="home" />
      {/* <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contact" page={ContactPage} name="contact" /> */}

      {/* Authentication Routes */}
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

      {/* Admin Routes */}
      <PrivateSet unauthenticated="login" role="admin">
        <Set wrap={AdminLayout}>
          <Route path="/admin/dashboard" page={AdminDashboardPage} name="adminDashboard" />
          {/* Plants routes */}
          <Route path="/admin/plants" page={AdminPlantsPage} name="adminPlants" />
          <Route path="/admin/plant/new" page={AdminNewPlantPage} name="adminNewPlant" />
        </Set>
        {/* <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
        <Route path="/admin/settings" page={AdminSettingsPage} name="adminSettings" /> */}
      </PrivateSet>

      {/* Not Found Route */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
