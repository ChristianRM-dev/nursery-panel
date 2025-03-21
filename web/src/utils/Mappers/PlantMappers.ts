// web/src/utils/Mappers/PlantMappers.ts
import {
  CreatePlantInput,
  PresentationType,
  UpdatePlantInput,
} from 'types/graphql'

import { PlantFormValues } from 'src/components/Plant/PlantForm/PlantForm.schema'
import { PlantTableRow } from 'src/components/Plant/PlantTable/PlantTable.types'
import { GetPaginatedPlantsItem } from 'src/hooks/Plants/useGetPaginatedPlants'

import { fileToBase64 } from '../Converters'

/**
 * Maps `GetPaginatedPlantsItem` to the `PlantTableRow` expected by the PaginatedTable<PlantTableRow> component .
 */

export const mapGetPaginatedPlantsItemToPlantTableRow = (
  plants: GetPaginatedPlantsItem
): PlantTableRow[] => {
  return plants.map((plant) => ({
    ...plant,
    category: plant.category.name,
    presentationType: plant.presentationType,
  }))
}

/**
 * Maps `PlantFormValues` to the `CreatePlantInput` expected by the mutation.
 */
export const mapPlantFormValuesToCreatePlantInput = async (
  values: PlantFormValues
): Promise<CreatePlantInput> => {
  // Convert File objects to base64-encoded strings
  type PhotoType = CreatePlantInput['photos'][number]
  const photos: PhotoType[] = await Promise.all(
    values.photos.map(async (file: File) => {
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
export const mapPlantFormValuesToUpdatePlantInput = async (
  values: PlantFormValues
): Promise<UpdatePlantInput> => {
  type PhotoType = UpdatePlantInput['photos'][number]

  // Convert files to base64 asynchronously
  const photos: PhotoType[] = await Promise.all(
    values.photos.map(async (photo) => {
      if ('id' in photo) {
        return { id: photo.id } // Existing photo
      } else {
        const file = photo as File
        const content = await fileToBase64(file) // Convert file to base64
        return {
          file: {
            path: file.name, // Use file name as path
            content,
          },
        } // New photo (File object)
      }
    })
  )

  return {
    name: values.name,
    price: values.price,
    stock: values.stock,
    categoryId: values.categoryId,
    presentationType: values.presentationType as PresentationType,
    presentationDetails: values.presentationDetails,
    photos,
  }
}
