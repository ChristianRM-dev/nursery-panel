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
    include: { category: true, photos: true, saleDetails: true },
  })
}

export const createPlant: MutationResolvers['createPlant'] = async ({
  input,
}) => {
  const { photos, ...rest } = input

  // Upload photos to Vercel Blob
  const uploadedPhotos = await Promise.all(
    photos.map(async (photo) => {
      // Decode the base64 data
      const binaryData = Buffer.from(photo.content, 'base64')

      // Create a File object with the decoded data
      const file = new File([binaryData], photo.path, { type: 'image/jpeg' }) // Adjust the MIME type as needed

      // Upload the file to Vercel Blob
      const blob = await put(photo.path, file, {
        access: 'public', // Make the files publicly accessible
      })

      return {
        url: blob.url, // Store the Blob URL
        pathname: blob.pathname, // Use `pathname` instead of `path`
      }
    })
  )

  // Create the plant in the database with the Blob URLs
  return db.plant.create({
    data: {
      name: rest.name,
      price: rest.price,
      stock: rest.stock,
      category: {
        connect: { id: rest.categoryId }, // Connect to the Category by ID
      },
      presentationType: rest.presentationType, // Use `presentationType` instead of `presentation`
      presentationDetails: rest.presentationDetails,
      photos: {
        create: uploadedPhotos.map((photo) => ({
          url: photo.url,
        })),
      },
    },
    include: {
      photos: true, // Include photos in the response
      category: true, // Include category in the response
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
      const file = new File([binaryData], photo.file.path, { type: 'image/jpeg' })

      const blob = await put(photo.file.path, file, {
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

export const deletePlant: MutationResolvers['deletePlant'] = ({ id }) => {
  return db.plant.delete({
    where: { id },
  })
}
