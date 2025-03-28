import { put, del } from '@vercel/blob'
import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const categories: QueryResolvers['categories'] = async ({
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
    db.category,
    {},
    { plants: true },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder, // Use validated sortOrder
      search: searchTerm,
      searchFields: ['name', 'description'],
    }
  )
}

export const category: QueryResolvers['category'] = ({ id }) => {
  return db.category.findUnique({
    where: { id },
  })
}

export const createCategory: MutationResolvers['createCategory'] = async ({
  input,
}) => {
  const { image, ...rest } = input

  // First, create the category in the database to get its ID
  const category = await db.category.create({
    data: {
      ...rest,
      image: null, // Temporarily set image to null
    },
  })

  let imageUrl: string | null = null

  // Upload image to Vercel Blob (required for categories)
  if (image) {
    const binaryData = Buffer.from(image.content, 'base64')
    const file = new File([binaryData], image.path, { type: 'image/jpeg' })

    // Use the folder path in the Blob path
    const blob = await put(
      `categories/${category.id}/image/${image.path}`,
      file,
      {
        access: 'public',
      }
    )

    imageUrl = blob.url
  }

  // Update the category with the image URL
  return db.category.update({
    where: { id: category.id },
    data: {
      image: imageUrl, // Save the image URL
    },
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = async ({
  id,
  input,
}) => {
  const { image, ...rest } = input

  // Fetch the existing category to check for an existing image
  const existingCategory = await db.category.findUnique({
    where: { id },
  })

  if (!existingCategory) {
    throw new Error('Category not found')
  }

  let imageUrl: string | null = existingCategory.image

  // If a new image is provided, upload it to Vercel Blob
  if (image) {
    // Delete the old image if it exists
    if (existingCategory.image) {
      await del(existingCategory.image) // Delete the old image from Vercel Blob
    }

    // Upload the new image
    const binaryData = Buffer.from(image.content, 'base64')
    const file = new File([binaryData], image.path, { type: 'image/jpeg' })

    // Use the folder path in the Blob path
    const blob = await put(`categories/${id}/image/${image.path}`, file, {
      access: 'public',
    })

    imageUrl = blob.url
  }

  // Update the category with the new data and image URL
  return db.category.update({
    where: { id },
    data: {
      ...rest,
      image: imageUrl, // Save the new image URL
    },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const publicCategoriesWithPlants = () => {
  return db.category.findMany({
    where: {
      plants: {
        some: {
          deletedAt: null,
          stock: {
            gt: 0, // Only show categories with available plants
          },
        },
      },
    },
    include: {
      plants: {
        where: {
          deletedAt: null,
          stock: { gt: 0 },
        },
        take: 4, // Limit plants per category for preview
        select: {
          id: true,
          name: true,
          price: true,
          presentationType: true,
          photos: {
            take: 1,
            select: { url: true },
          },
        },
      },
    },
  })
}

export const publicCategoryWithPlants = ({ id }) => {
  return db.category
    .findUnique({
      where: {
        id,
        plants: {
          some: {
            deletedAt: null,
            stock: { gt: 0 },
          },
        },
      },
      include: {
        plants: {
          where: {
            deletedAt: null,
            stock: { gt: 0 },
          },
          include: {
            photos: {
              take: 1,
              select: { url: true },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((category) => {
      if (!category) return null

      return {
        ...category,
        plants: category.plants.map((plant) => ({
          ...plant,
          mainPhoto: plant.photos[0]?.url || null,
        })),
      }
    })
}

export const Category: CategoryRelationResolvers = {
  plants: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).plants()
  },
}
