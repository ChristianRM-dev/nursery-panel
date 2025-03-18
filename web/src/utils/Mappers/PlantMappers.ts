import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
import { CreatePlantInput, PresentationType } from 'types/graphql'
import { fileToBase64 } from '../Converters'
import { GetPaginatedPlantsItem } from 'src/hooks/Plants/useGetPaginatedPlants'
/**
 * Maps `GetPaginatedPlantsItem` to the `PlantTableRow` expected by the PaginatedTable<PlantTableRow> component .
 */

export const mapGetPaginatedPlantsItemToPlantTableRow = (
  plants: GetPaginatedPlantsItem
) => {
  return plants
}

/**
 * Maps `PlantFormValues` to the `CreatePlantInput` expected by the mutation.
 */
export const mapPlantFormValuesToCreatePlantInput = async (
  values: PlantFormValues
): Promise<CreatePlantInput> => {
  // Convert File objects to base64-encoded strings
  const photos = await Promise.all(
    values.photos.map(async (file) => {
      const content = await fileToBase64(file) // Convert file to base64
      return {
        path: file.name, // Use file name as path
        content, // Add base64-encoded file content
      }
    })
  )

  return {
    name: values.name,
    price: values.price,
    stock: values.stock,
    categoryId: values.categoryId, // Assuming `category` is already the ID
    presentationType: values.presentationType as PresentationType, // Cast to PresentationType
    presentationDetails: values.presentationDetails,
    photos,
  }
}

/**
 * Maps `PlantFormValues` to the `UpdatePlantInput` expected by the mutation.
 */
export const mapPlantFormValuesToUpdatePlantInput = (
  values: PlantFormValues
) => ({
  name: values.name,
  price: values.price,
  stock: values.stock,
  categoryId: values.categoryId,
  presentationType: values.presentationType,
  presentationDetails: values.presentationDetails,
  photos: values.photos,
});
