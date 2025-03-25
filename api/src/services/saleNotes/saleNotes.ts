// api/src/services/saleNotes/saleNotes.ts
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const saleNotes: QueryResolvers['saleNotes'] = async ({
  pagination,
  sort,
  search,
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {}
  const { search: searchTerm } = search || {}

  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  return paginate(
    db.saleNote,
    {},
    {
      customer: true,
      nursery: true,
      saleDetails: { include: { plant: true } },
    },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder,
      search: searchTerm,
      searchFields: ['folio', 'customer.name', 'nursery.name'],
    }
  )
}

export const saleNote: QueryResolvers['saleNote'] = ({ id }) => {
  return db.saleNote.findUnique({
    where: { id },
    include: {
      customer: true,
      nursery: true,
      saleDetails: {
        include: {
          plant: true,
        },
      },
    },
  })
}

export const createSaleNote: MutationResolvers['createSaleNote'] = async ({
  input,
}) => {
  const { saleDetails, ...rest } = input

  // Calculate total from sale details
  const total = saleDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Generate folio (YYYY-MM-XXX) where XXX is the count of sales this month
  const now = new Date()
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const countThisMonth = await db.saleNote.count({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), 1),
        lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      },
    },
  })

  const folio = `${yearMonth}-${String(countThisMonth + 1).padStart(3, '0')}`

  return db.saleNote.create({
    data: {
      ...rest,
      total,
      folio,
      saleDetails: {
        create: saleDetails.map((detail) => ({
          plantId: detail.plantId,
          price: detail.price,
          quantity: detail.quantity,
        })),
      },
    },
    include: {
      customer: true,
      nursery: true,
      saleDetails: {
        include: {
          plant: true,
        },
      },
    },
  })
}

export const updateSaleNote: MutationResolvers['updateSaleNote'] = async ({
  id,
  input,
}) => {
  const { saleDetails, ...rest } = input

  // Calculate new total if sale details are provided
  const total = saleDetails
    ? saleDetails.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      )
    : undefined

  return db.$transaction(async (tx) => {
    // First update the sale note
    const updatedSaleNote = await tx.saleNote.update({
      where: { id },
      data: {
        ...rest,
        ...(total !== undefined && { total }),
      },
    })

    // Handle sale details updates if provided
    if (saleDetails) {
      // Delete existing details not present in the update
      await tx.saleDetail.deleteMany({
        where: {
          saleNoteId: id,
          NOT: {
            id: {
              in: saleDetails
                .map((detail) => detail.id)
                .filter(Boolean) as string[],
            },
          },
        },
      })

      // Update or create new details
      await Promise.all(
        saleDetails.map(async (detail) => {
          if (detail.id) {
            // Update existing detail
            return tx.saleDetail.update({
              where: { id: detail.id },
              data: {
                plantId: detail.plantId,
                price: detail.price,
                quantity: detail.quantity,
              },
            })
          } else {
            // Create new detail
            return tx.saleDetail.create({
              data: {
                saleNoteId: id,
                plantId: detail.plantId,
                price: detail.price,
                quantity: detail.quantity,
              },
            })
          }
        })
      )
    }

    return tx.saleNote.findUnique({
      where: { id },
      include: {
        customer: true,
        nursery: true,
        saleDetails: {
          include: {
            plant: true,
          },
        },
      },
    })
  })
}

export const deleteSaleNote: MutationResolvers['deleteSaleNote'] = async ({
  id,
}) => {
  return db.$transaction(async (tx) => {
    // First delete all sale details
    await tx.saleDetail.deleteMany({
      where: { saleNoteId: id },
    })

    // Then delete the sale note
    return tx.saleNote.delete({
      where: { id },
    })
  })
}
