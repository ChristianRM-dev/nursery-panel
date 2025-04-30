// api/src/services/saleNotes/saleNotes.ts
import type { Prisma } from '@prisma/client'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

// Define the ExternalPlant type that matches your SDL
interface ExternalPlant {
  name: string
  price: number
  quantity: number
  presentationType?: string | null
  presentationDetails?: string | null
}

export const saleNotes: QueryResolvers['saleNotes'] = async ({
  pagination,
  sort,
  search,
  customerId, // Add this parameter
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {}
  const { search: searchTerm } = search || {}

  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  // Create base where clause
  const where: Prisma.SaleNoteWhereInput = {}

  // Add customer filter if provided
  if (customerId) {
    where.customerId = customerId
  }

  return paginate(
    db.saleNote,
    where,
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
  const { saleDetails = [], externalPlants = [], ...rest } = input

  // Type cast externalPlants to ensure correct structure
  const typedExternalPlants = (externalPlants || []) as ExternalPlant[]

  // Calculate total from both sale details and external plants with proper decimal handling
  const detailsTotal = saleDetails.reduce(
    (sum, item) =>
      sum + Number((item.price || 0).toFixed(2)) * (item.quantity || 0),
    0
  )

  const externalTotal = typedExternalPlants.reduce(
    (sum, plant) =>
      sum + Number((plant.price || 0).toFixed(2)) * (plant.quantity || 0),
    0
  )

  const total = Number((detailsTotal + externalTotal).toFixed(2))

  // Generate folio (YYYY-MM-XXX)
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

  // Start a transaction to ensure data consistency
  const result = await db.$transaction(async (prisma) => {
    // First update plant stocks
    for (const detail of saleDetails) {
      const quantity = detail.quantity || 0

      await prisma.plant.update({
        where: { id: detail.plantId },
        data: {
          stock: {
            // Using decrement to reduce stock
            decrement: quantity,
          },
        },
      })

      // Additional check to prevent negative stock
      const updatedPlant = await prisma.plant.findUnique({
        where: { id: detail.plantId },
        select: { stock: true },
      })

      if (updatedPlant && updatedPlant.stock < 0) {
        await prisma.plant.update({
          where: { id: detail.plantId },
          data: {
            stock: 0, // Set to 0 if it went negative
          },
        })
      }
    }

    // Then create the sale note with properly formatted prices
    return prisma.saleNote.create({
      data: {
        ...rest,
        total,
        folio,
        externalPlants:
          typedExternalPlants.length > 0 ? typedExternalPlants : undefined,
        saleDetails: {
          create: saleDetails.map((detail) => ({
            plantId: detail.plantId,
            price: Number((detail.price || 0).toFixed(2)), // Store unit price with 2 decimals
            quantity: detail.quantity || 0,
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
  })

  return result
}

export const updateSaleNote: MutationResolvers['updateSaleNote'] = async ({
  id,
  input,
}) => {
  const { saleDetails, externalPlants, ...rest } = input

  // Type cast externalPlants to ensure correct structure
  const typedExternalPlants = (externalPlants || []) as ExternalPlant[]

  // Calculate new total considering both sale details and external plants
  let total: number = 0
  if (saleDetails || typedExternalPlants) {
    const detailsTotal = saleDetails
      ? saleDetails.reduce(
          (sum, item) =>
            sum + Number((item.price || 0).toFixed(2)) * (item.quantity || 0),
          0
        )
      : 0

    const externalTotal = typedExternalPlants
      ? typedExternalPlants.reduce(
          (sum, plant) =>
            sum + Number((plant.price || 0).toFixed(2)) * (plant.quantity || 0),
          0
        )
      : 0

    total = Number((detailsTotal + externalTotal).toFixed(2))
  }

  return db.$transaction(async (tx) => {
    // First update the sale note
    const updatedSaleNote = await tx.saleNote.update({
      where: { id },
      data: {
        ...rest,
        ...(total !== undefined && { total }),
        ...(typedExternalPlants !== undefined && {
          externalPlants:
            typedExternalPlants.length > 0 ? typedExternalPlants : null,
        }),
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
          const price = Number((detail.price || 0).toFixed(2))
          const quantity = detail.quantity || 0

          if (detail.id) {
            return tx.saleDetail.update({
              where: { id: detail.id },
              data: {
                plantId: detail.plantId,
                price,
                quantity,
              },
            })
          } else {
            return tx.saleDetail.create({
              data: {
                saleNoteId: id,
                plantId: detail.plantId,
                price,
                quantity,
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

export const saleNotesReport: QueryResolvers['saleNotesReport'] = async ({
  startDate,
  endDate,
}) => {
  const notes = await db.saleNote.findMany({
    where: {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      deletedAt: null,
    },
    include: {
      customer: true,
      nursery: true,
      saleDetails: {
        include: {
          plant: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return notes.map((note) => {
    // Map registered plants
    const registeredPlants = note.saleDetails.map((detail) => ({
      id: detail.plant.id,
      name: detail.plant.name,
      price: detail.price,
      quantity: detail.quantity,
      total: detail.price * detail.quantity,
      category: detail.plant.category.name,
      presentationType: detail.plant.presentationType,
      presentationDetails: detail.plant.presentationDetails,
      isExternal: false,
    }))

    // Safely type cast external plants
    const externalPlants = ((note.externalPlants as ExternalPlant[]) || []).map(
      (plant) => ({
        id: null,
        name: plant.name,
        price: plant.price,
        quantity: plant.quantity,
        total: plant.price * plant.quantity,
        category: 'Externa',
        presentationType: plant.presentationType || null,
        presentationDetails: plant.presentationDetails || null,
        isExternal: true,
      })
    )

    return {
      folio: note.folio,
      createdAt: note.createdAt,
      customer: note.customer,
      nursery: note.nursery,
      total: note.total,
      plantDetails: [...registeredPlants, ...externalPlants],
    }
  })
}

export const paymentsBySaleNoteId: QueryResolvers['paymentsBySaleNoteId'] =
  async ({ saleNoteId }) => {
    return db.payment.findMany({
      where: { saleNoteId },
      include: {
        saleNote: true, // Include related sale note if needed
      },
      orderBy: {
        createdAt: 'desc', // Newest payments first
      },
    })
  }
