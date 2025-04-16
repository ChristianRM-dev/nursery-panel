// web/src/utils/Mappers/CustomerMappers.ts
import { CreateCustomerInput, UpdateCustomerInput } from 'types/graphql'

import { CustomerFormValues } from 'src/components/Customer/CustomerForm/CustomerForm.schema'
import { CustomerTableRow } from 'src/components/Customer/CustomerTable/CustomerTable.types'
import { GetPaginatedCustomersItem } from 'src/hooks/Customers/useGetPaginatedCustomers'

/**
 * Maps `GetPaginatedCustomersItem` to the `CustomerTableRow` expected by the PaginatedTable<CustomerTableRow> component.
 */
export const mapGetPaginatedCustomersItemToCustomerTableRow = (
  customers: GetPaginatedCustomersItem
): CustomerTableRow[] => {
  return customers.map((customer) => ({
    ...customer,
    email: customer.email || '',
    phone: customer.phone || '',
  }))
}

/**
 * Maps `CustomerFormValues` to the `CreateCustomerInput` expected by the mutation.
 */
export const mapCustomerFormValuesToCreateCustomerInput = (
  values: CustomerFormValues
): CreateCustomerInput => {
  return {
    name: values.name,
    phone: values.phone,
    email: values.email || null, // Convert empty string to null
  }
}

/**
 * Maps `CustomerFormValues` to the `UpdateCustomerInput` expected by the mutation.
 */
export const mapCustomerFormValuesToUpdateCustomerInput = (
  values: CustomerFormValues
): UpdateCustomerInput => {
  return {
    name: values.name,
    phone: values.phone,
    email: values.email || null, // Convert empty string to null
  }
}
