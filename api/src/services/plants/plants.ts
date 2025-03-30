import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { uploadToBlob, safeDeleteFromBlob } from 'src/lib/blob'
import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const plants: QueryResolvers['plants'] = async ({
  pagination,
  sort,
  search,
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {}
  const { search: searchTerm } = search || {}

  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  return paginate(
    db.plant,
    {},
    { category: true, photos: true, saleDetails: true },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder,
      search: searchTerm,
      searchFields: ['name', 'presentationDetails'],
    }
  )
}

export const plant: QueryResolvers['plant'] = ({ id }) => {
  return db.plant.findUnique({
    where: { id },
    include: {
      category: true,
      photos: true,
      saleDetails: true,
    },
  })
}

export const createPlant: MutationResolvers['createPlant'] = async ({
  input,
}) => {
  const { photos, ...rest } = input

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

  // Upload photos to Vercel Blob
  const uploadedPhotos = await Promise.all(
    photos.map(async (photo) => {
      const url = await uploadToBlob('plants', plant.id, photo)
      return { url }
    })
  )

  return db.plant.update({
    where: { id: plant.id },
    data: {
      photos: {
        create: uploadedPhotos,
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

  const existingPlant = await db.plant.findUnique({
    where: { id },
    include: { photos: true },
  })

  if (!existingPlant) {
    throw new Error('Plant not found')
  }

  // Handle photo deletions
  const photoIdsToKeep = photos
    .filter((photo) => photo.id)
    .map((photo) => photo.id)

  const photosToDelete = existingPlant.photos.filter(
    (photo) => !photoIdsToKeep.includes(photo.id)
  )

  // Safely delete photos from blob storage and database
  await Promise.all(
    photosToDelete.map(async (photo) => {
      await safeDeleteFromBlob(photo.url)
    })
  )

  await db.photo.deleteMany({
    where: {
      id: {
        in: photosToDelete.map((photo) => photo.id),
      },
    },
  })

  // Upload new photos
  const newPhotos = photos.filter((photo) => photo.file)
  const uploadedPhotos = await Promise.all(
    newPhotos.map(async (photo) => {
      const url = await uploadToBlob('plants', id, photo.file)
      return { url }
    })
  )

  return db.plant.update({
    where: { id },
    data: {
      ...rest,
      photos: {
        create: uploadedPhotos,
      },
    },
    include: {
      photos: true,
      category: true,
    },
  })
}

export const deletePlant: MutationResolvers['deletePlant'] = async ({ id }) => {
  const plant = await db.plant.findUnique({
    where: { id },
    include: { photos: true },
  })

  if (!plant) {
    throw new Error('Plant not found')
  }

  // Safely delete all photos from blob storage
  await Promise.all(
    plant.photos.map(async (photo) => {
      await safeDeleteFromBlob(photo.url)
    })
  )

  await db.photo.deleteMany({
    where: {
      plantId: id,
    },
  })

  return db.plant.delete({
    where: { id },
  })
}

export const publicPlant = ({ id }) => {
  return db.plant.findUnique({
    where: {
      id,
      deletedAt: null,
      stock: { gt: 0 },
    },
    include: {
      category: true,
      photos: true,
    },
  })
}
