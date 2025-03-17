import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'
import type {
  QueryResolvers,
  MutationResolvers,
  PlantResolvers,
} from 'types/graphql'

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

export const createPlant: MutationResolvers['createPlant'] = ({ input }) => {
  return db.plant.create({
    data: input,
  })
}

export const updatePlant: MutationResolvers['updatePlant'] = ({ id, input }) => {
  return db.plant.update({
    data: input,
    where: { id },
  })
}

export const deletePlant: MutationResolvers['deletePlant'] = ({ id }) => {
  return db.plant.delete({
    where: { id },
  })
}