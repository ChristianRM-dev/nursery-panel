// api/src/services/plants/plants.ts
import { del, put } from '@vercel/blob'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const plants: QueryResolvers['plants'] = async ({
  pagination,
  sort,
  search,
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {} // Default to 'desc'
  const { search: searchTerm } = search || {}

  // Ensure sortOrder is explicitly typed as "asc" | "desc"
  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  return paginate(
    db.plant,
    {},
    { category: true, photos: true, saleDetails: true },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder, // Use validated sortOrder
      search: searchTerm,
      searchFields: ['name', 'presentationDetails'],
    }
  )
}

export const plant: QueryResolvers['plant'] = ({ id }) => {
  return db.plant.findUnique({
    where: { id },
    include: {
      category: true, // Include the category
      photos: true, // Include the photos
      saleDetails: true, // Include the saleDetails
    },
  })
}

export const createPlant: MutationResolvers['createPlant'] = async ({
  input,
}) => {
  const { photos, ...rest } = input

  // First, create the plant in the database to get its ID
  const plant = await db.plant.create({
    data: {
      name: rest.name,
      price: rest.price,
      stock: rest.stock,
      category: {
        connect: { id: rest.categoryId },
      },
      presentationType: rest.presentationType,
      presentationDetails: rest.presentationDetails,
    },
  })

  // Generate the folder path using the plant's ID
  const folderPath = `plants/${plant.id}`

  // Upload photos to Vercel Blob in the folder
  const uploadedPhotos = await Promise.all(
    photos.map(async (photo) => {
      const binaryData = Buffer.from(photo.content, 'base64')
      const file = new File([binaryData], photo.path, { type: 'image/jpeg' })

      // Use the folder path in the Blob path
      const blob = await put(`${folderPath}/${photo.path}`, file, {
        access: 'public',
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
      }
    })
  )

  // Update the plant with the photos
  return db.plant.update({
    where: { id: plant.id },
    data: {
      photos: {
        create: uploadedPhotos.map((photo) => ({
          url: photo.url,
        })),
      },
    },
    include: {
      photos: true,
      category: true,
    },
  })
}

export const updatePlant: MutationResolvers['updatePlant'] = async ({
  id,
  input,
}) => {
  const { photos, ...rest } = input

  // Fetch the existing plant with its photos
  const existingPlant = await db.plant.findUnique({
    where: { id },
    include: { photos: true },
  })

  if (!existingPlant) {
    throw new Error('Plant not found')
  }

  // Generate the folder path using the plant's ID
  const folderPath = `plants/${existingPlant.id}`

  // Extract the IDs of the photos that are still present in the input
  const photoIdsToKeep = photos
    .filter((photo) => photo.id)
    .map((photo) => photo.id)

  // Identify photos to delete
  const photosToDelete = existingPlant.photos.filter(
    (photo) => !photoIdsToKeep.includes(photo.id)
  )

  // Delete photos from Vercel Blob
  await Promise.all(
    photosToDelete.map(async (photo) => {
      await del(photo.url) // Delete the photo from Vercel Blob
    })
  )

  // Delete photos from the database
  await db.photo.deleteMany({
    where: {
      id: {
        in: photosToDelete.map((photo) => photo.id),
      },
    },
  })

  // Upload new photos and create them in the database
  const newPhotos = photos.filter((photo) => photo.file)

  const uploadedPhotos = await Promise.all(
    newPhotos.map(async (photo) => {
      const binaryData = Buffer.from(photo.file.content, 'base64')
      const file = new File([binaryData], photo.file.path, {
        type: 'image/jpeg',
      })

      // Use the folder path in the Blob path
      const blob = await put(`${folderPath}/${photo.file.path}`, file, {
        access: 'public',
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
      }
    })
  )

  // Update the plant with the new data and photos
  return db.plant.update({
    where: { id },
    data: {
      ...rest,
      photos: {
        create: uploadedPhotos.map((photo) => ({
          url: photo.url,
        })),
      },
    },
    include: {
      photos: true,
      category: true,
    },
  })
}

export const deletePlant: MutationResolvers['deletePlant'] = async ({ id }) => {
  // Fetch the plant with its photos
  const plant = await db.plant.findUnique({
    where: { id },
    include: { photos: true },
  })

  if (!plant) {
    throw new Error('Plant not found')
  }

  // Delete photos from Vercel Blob
  await Promise.all(
    plant.photos.map(async (photo) => {
      await del(photo.url) // Delete the photo from Vercel Blob
    })
  )

  // Delete photos from the database
  await db.photo.deleteMany({
    where: {
      plantId: id, // Delete all photos associated with the plant
    },
  })

  // Delete the plant
  return db.plant.delete({
    where: { id },
  })
}

export const publicPlant = ({ id }) => {
  return db.plant.findUnique({
    where: {
      id,
      deletedAt: null, // Only non-deleted plants
      stock: { gt: 0 }, // Only plants with stock
    },
    include: {
      category: true,
      photos: true,
    },
  })
}
