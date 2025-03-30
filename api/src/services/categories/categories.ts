// api/src/services/categories/categories.ts
import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { safeDeleteFromBlob, uploadToBlob } from 'src/lib/blob'
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

  const category = await db.category.create({
    data: {
      ...rest,
      image: null,
    },
  })

  let imageUrl: string | null = null

  if (image) {
    imageUrl = await uploadToBlob('categories', category.id, image)
  }

  return db.category.update({
    where: { id: category.id },
    data: { image: imageUrl },
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = async ({
  id,
  input,
}) => {
  const { image, ...rest } = input

  const existingCategory = await db.category.findUnique({
    where: { id },
  })

  if (!existingCategory) {
    throw new Error('Category not found')
  }

  let imageUrl: string | null = existingCategory.image

  if (image) {
    await safeDeleteFromBlob(existingCategory.image)
    imageUrl = await uploadToBlob('categories', id, image)
  }

  return db.category.update({
    where: { id },
    data: {
      ...rest,
      image: imageUrl,
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
