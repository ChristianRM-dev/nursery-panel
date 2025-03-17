import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'
import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

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

export const Category: CategoryRelationResolvers = {
  plants: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).plants()
  },
}