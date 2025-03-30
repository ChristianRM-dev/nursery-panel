// web/src/Routes.tsx
import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      {/* Public Routes */}
      <Set wrap={PublicLayout}>
        <Route path="/" page={HomePage} name="home" />
        {/* <Route path="/about" page={AboutPage} name="about" />
        <Route path="/contact" page={ContactPage} name="contact" /> */}
        <Route path="/catalog" page={CatalogPage} name="catalog" />
        <Route path="/catalog/category/{id:String}" page={CategoryPlantsPage} name="categoryPlants" />
        <Route path="/plant/{id:String}" page={PlantDetailsPage} name="plantDetails" />
      </Set>

      {/* Authentication Routes */}
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

      {/* Redirect to Admin main page */}
      <Route path="/admin" redirect="adminDashboard" name="admin" />

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
          {/* Customers routes */}
          <Route path="/admin/customers/new" page={AdminNewCustomerPage} name="adminNewCustomer" />
          <Route path="/admin/customers/{id:String}/edit" page={AdminEditCustomerPage} name="adminEditCustomer" />
          <Route path="/admin/customers/{id:String}" page={AdminCustomerDetailsPage} name="adminCustomerDetails" />
          <Route path="/admin/customers" page={AdminCustomersPage} name="adminCustomers" />
          {/* SaleNote routes */}
          <Route path="/admin/sale-note/new" page={AdminNewSaleNotePage} name="adminNewSaleNote" />
          <Route path="/admin/sale-note/{id:String}/edit" page={AdminEditSaleNotePage} name="adminEditSaleNote" />
          <Route path="/admin/sale-note/{id:String}" page={AdminSaleNoteDetailsPage} name="adminSaleNoteDetails" />
          <Route path="/admin/sale-notes" page={AdminSaleNotesPage} name="adminSaleNotes" />
        </Set>
      </PrivateSet>

      {/* Not Found Route */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
