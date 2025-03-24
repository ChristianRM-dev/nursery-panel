import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      {/* Public Routes */}
      <Route path="/" page={HomePage} name="home" />

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
          <Route path="/admin/plant/new" page={AdminNewPlantPage} name="adminNewPlant" />
          <Route path="/admin/plant/{id:String}/edit" page={AdminEditPlantPage} name="adminEditPlant" />
          <Route path="/admin/plant/{id:String}" page={AdminPlantDetailsPage} name="adminPlantDetails" />
          <Route path="/admin/plants" page={AdminPlantsPage} name="adminPlants" />
          {/* Categories routes */}
          <Route path="/admin/categories/new" page={AdminNewCategoryPage} name="adminNewCategory" />
          <Route path="/admin/categories/{id:String}/edit" page={AdminEditCategoryPage} name="adminEditCategory" />
          <Route path="/admin/categories/{id:String}" page={AdminCategoryDetailsPage} name="adminCategoryDetails" />
          <Route path="/admin/categories" page={AdminCategoriesPage} name="adminCategories" />
          {/* Nurseries routes */}
          <Route path="/admin/nurseries/new" page={AdminNewNurseryPage} name="adminNewNursery" />
          <Route path="/admin/nurseries/{id:String}/edit" page={AdminEditNurseryPage} name="adminEditNursery" />
          <Route path="/admin/nurseries/{id:String}" page={AdminNurseryDetailsPage} name="adminNurseryDetails" />
          <Route path="/admin/nurseries" page={AdminNurseriesPage} name="adminNurseries" />
        </Set>
      </PrivateSet>

      {/* Not Found Route */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
