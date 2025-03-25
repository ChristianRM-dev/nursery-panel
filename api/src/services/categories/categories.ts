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

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { id },
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
  return db.category.findUnique({
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
}

export const Category: CategoryRelationResolvers = {
  plants: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).plants()
  },
}
