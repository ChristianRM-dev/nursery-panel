import { db } from 'src/lib/db'
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
  const { sortField, sortOrder } = sort || { sortField: 'createdAt', sortOrder: 'desc' }
  const { search: searchTerm } = search || { search: '' }

  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { presentationDetails: { contains: searchTerm, mode: 'insensitive' } },
        ],
      }
    : {}

  const total = await db.plant.count({ where })
  const plants = await db.plant.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortField]: sortOrder },
    include: { category: true, photos: true, saleDetails: true },
  })

  return {
    data: plants,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  }
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