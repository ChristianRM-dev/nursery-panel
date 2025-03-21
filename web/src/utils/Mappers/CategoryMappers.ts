// web/src/utils/Mappers/CategoryMappers.ts
import { CreateCategoryInput, UpdateCategoryInput } from 'types/graphql'

import { CategoryFormValues } from 'src/components/Category/CategoryForm/CategoryForm.schema'
import { CategoryTableRow } from 'src/components/Category/CategoryTable/CategoryTable.types'
import { GetPaginatedCategoriesItem } from 'src/hooks/Categories/useGetPaginatedCategories'

/**
 * Maps `GetPaginatedCategoriesItem` to the `CategoryTableRow` expected by the PaginatedTable<CategoryTableRow> component.
 */
export const mapGetPaginatedCategoriesItemToCategoryTableRow = (
  categories: GetPaginatedCategoriesItem
): CategoryTableRow[] => {
  return categories.map((category) => ({
    ...category,
    // Add any additional mappings if needed
  }))
}

/**
 * Maps `CategoryFormValues` to the `CreateCategoryInput` expected by the mutation.
 */
export const mapCategoryFormValuesToCreateCategoryInput = (
  values: CategoryFormValues
): CreateCategoryInput => {
  return {
    name: values.name,
    description: values.description || undefined, // Ensure description is undefined if empty
  }
}

/**
 * Maps `CategoryFormValues` to the `UpdateCategoryInput` expected by the mutation.
 */
export const mapCategoryFormValuesToUpdateCategoryInput = (
  values: CategoryFormValues
): UpdateCategoryInput => {
  return {
    name: values.name,
    description: values.description || undefined, // Ensure description is undefined if empty
  }
}
