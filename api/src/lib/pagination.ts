import { Prisma } from '@prisma/client'

interface PaginationOptions {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  searchFields?: string[]
}

export const paginate = async <T>(
  model: any, // Prisma model (e.g., db.plant, db.category)
  where: Prisma.Args<T, 'findMany'>['where'],
  include: Prisma.Args<T, 'findMany'>['include'],
  {
    page,
    pageSize,
    sortField = 'createdAt',
    sortOrder = 'desc',
    search,
    searchFields,
  }: PaginationOptions
) => {
  const offset = (page - 1) * pageSize

  // Add search functionality if search term and fields are provided
  if (search && searchFields) {
    where = {
      ...where,
      OR: searchFields.map((field) => ({
        [field]: { contains: search, mode: 'insensitive' },
      })),
    }
  }

  const total = await model.count({ where })

  const data = await model.findMany({
    where,
    skip: offset,
    take: pageSize,
    orderBy: { [sortField]: sortOrder },
    include,
  })

  return {
    data,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  }
}
