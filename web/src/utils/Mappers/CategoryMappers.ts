// web/src/utils/Mappers/CategoryMappers.ts
import { CreateCategoryInput, UpdateCategoryInput } from 'types/graphql'

import { CategoryFormValues } from 'src/components/Category/CategoryForm/CategoryForm.schema'
import { CategoryTableRow } from 'src/components/Category/CategoryTable/CategoryTable.types'
import { GetPaginatedCategoriesItem } from 'src/hooks/Categories/useGetPaginatedCategories'

import { fileToBase64 } from '../Converters'

/**
 * Maps `GetPaginatedCategoriesItem` to the `CategoryTableRow` expected by the PaginatedTable<CategoryTableRow> component.
 */
export const mapGetPaginatedCategoriesItemToCategoryTableRow = (
  categories: GetPaginatedCategoriesItem
): CategoryTableRow[] => {
  return categories.map((category) => ({
    ...category,
  }))
}

/**
 * Maps `CategoryFormValues` to the `CreateCategoryInput` expected by the mutation.
 */
export const mapCategoryFormValuesToCreateCategoryInput = async (
  values: CategoryFormValues
): Promise<CreateCategoryInput> => {
  let imageInput: CreateCategoryInput['image'] = null

  // Handle image upload (required field)
  if (values.image) {
    // New image (File object)
    const file = values.image as File
    const content = await fileToBase64(file) // Convert file to base64
    imageInput = {
      path: file.name, // Use file name as path
      content, // Add base64-encoded file content
    }
  }

  return {
    name: values.name,
    description: values.description || undefined,
    image: imageInput, // This is now required
  }
}

/**
 * Maps `CategoryFormValues` to the `UpdateCategoryInput` expected by the mutation.
 */
export const mapCategoryFormValuesToUpdateCategoryInput = async (
  values: CategoryFormValues
): Promise<UpdateCategoryInput> => {
  let imageInput: UpdateCategoryInput['image'] = null

  // Handle image upload if provided
  if (values.image) {
    if (values.image instanceof File) {
      // New image (File object)
      const file = values.image
      const content = await fileToBase64(file) // Convert file to base64
      imageInput = {
        path: file.name, // Use file name as path
        content, // Add base64-encoded file content
      }
    }
    // If it's not a File, it's an existing image and we don't need to update it
  }

  return {
    name: values.name,
    description: values.description || undefined,
    image: imageInput, // Can be null if not updating the image
  }
}
