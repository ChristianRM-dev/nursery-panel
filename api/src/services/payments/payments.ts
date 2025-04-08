// api/src/services/payments/payments.ts
import type {
  QueryResolvers,
  MutationResolvers,
  PaymentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { paginate } from 'src/lib/pagination'

export const payments: QueryResolvers['payments'] = async ({
  pagination,
  saleNoteId,
}) => {
  const { page, pageSize } = pagination

  return paginate(
    db.payment,
    { saleNoteId }, // Filter by sale note if provided
    { saleNote: true }, // Include related sale note
    {
      page,
      pageSize,
      sortField: 'createdAt', // Default sort by creation date
      sortOrder: 'desc', // Newest first
    }
  )
}

export const payment: QueryResolvers['payment'] = ({ id }) => {
  return db.payment.findUnique({
    where: { id },
    include: {
      saleNote: true,
    },
  })
}

export const createPayment: MutationResolvers['createPayment'] = async ({
  input,
}) => {
  try {
    // First verify the sale note exists
    const saleNote = await db.saleNote.findUnique({
      where: { id: input.saleNoteId },
    })

    if (!saleNote) {
      throw new Error('Sale note not found')
    }

    // Round the payment amount to 2 decimal places to avoid floating point issues
    const paymentAmount = Math.round(input.amount * 100) / 100

    // Create the payment in a transaction to ensure data consistency
    const result = await db.$transaction(async (prisma) => {
      // Create the payment
      const payment = await prisma.payment.create({
        data: {
          amount: paymentAmount,
          method: input.method,
          reference: input.reference,
          notes: input.notes,
          saleNote: {
            connect: { id: input.saleNoteId },
          },
        },
      })

      // Calculate new paid amount (rounded to 2 decimals)
      const newPaidAmount =
        Math.round((Number(saleNote.paidAmount) + paymentAmount) * 100) / 100

      // Calculate remaining amount (rounded to 2 decimals)
      const remainingAmount =
        Math.round((Number(saleNote.total) - newPaidAmount) * 100) / 100

      // Determine status (use <= 0.01 tolerance for floating point comparisons)
      const newStatus =
        remainingAmount <= 0.01
          ? 'PAID'
          : newPaidAmount > 0
            ? 'PARTIALLY_PAID'
            : 'PENDING'

      // Update the sale note
      await prisma.saleNote.update({
        where: { id: input.saleNoteId },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus,
        },
      })

      return payment
    })

    // Return the payment with sale note relation
    return db.payment.findUnique({
      where: { id: result.id },
      include: {
        saleNote: true,
      },
    })
  } catch (error) {
    logger.error({ error, input }, 'Error creating payment')
    throw new Error('Failed to create payment')
  }
}

// Helper function to format currency in frontend (if needed)
export const formatCurrency = (amount: number): string => {
  return (Math.round(amount * 100) / 100).toFixed(2)
}

export const updatePayment: MutationResolvers['updatePayment'] = async ({
  id,
  input,
}) => {
  try {
    const existingPayment = await db.payment.findUnique({
      where: { id },
      include: { saleNote: true },
    })

    if (!existingPayment) {
      throw new Error('Payment not found')
    }

    // If amount is being updated, we need to adjust the sale note's paid amount
    if (input.amount !== undefined && input.amount !== existingPayment.amount) {
      const amountDifference = input.amount - existingPayment.amount
      const newPaidAmount =
        existingPayment.saleNote.paidAmount + amountDifference
      const newStatus = calculateSaleNoteStatus(
        newPaidAmount,
        existingPayment.saleNote.total
      )

      // Update payment and sale note in a transaction
      return await db.$transaction([
        db.payment.update({
          where: { id },
          data: {
            amount: input.amount,
            method: input.method,
            reference: input.reference,
            notes: input.notes,
          },
          include: {
            saleNote: true,
          },
        }),
        db.saleNote.update({
          where: { id: existingPayment.saleNoteId },
          data: {
            paidAmount: newPaidAmount,
            status: newStatus,
          },
        }),
      ])[0] // Return the updated payment
    }

    // If amount isn't changing, just update the payment
    return db.payment.update({
      where: { id },
      data: {
        method: input.method,
        reference: input.reference,
        notes: input.notes,
      },
      include: {
        saleNote: true,
      },
    })
  } catch (error) {
    logger.error({ error, id, input }, 'Error updating payment')
    throw new Error('Failed to update payment')
  }
}

export const deletePayment: MutationResolvers['deletePayment'] = async ({
  id,
}) => {
  try {
    const payment = await db.payment.findUnique({
      where: { id },
      include: { saleNote: true },
    })

    if (!payment) {
      throw new Error('Payment not found')
    }

    // Calculate new paid amount and status after payment deletion
    const newPaidAmount = payment.saleNote.paidAmount - payment.amount
    const newStatus = calculateSaleNoteStatus(
      newPaidAmount,
      payment.saleNote.total
    )

    // Delete payment and update sale note in a transaction
    return await db.$transaction(async (tx) => {
      await tx.saleNote.update({
        where: { id: payment.saleNoteId },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus,
        },
      })

      return tx.payment.delete({
        where: { id },
      })
    })
  } catch (error) {
    logger.error({ error, id }, 'Error deleting payment')
    throw new Error('Failed to delete payment')
  }
}

export const Payment: PaymentRelationResolvers = {
  saleNote: (_obj, { root }) => {
    return db.payment.findUnique({ where: { id: root?.id } }).saleNote()
  },
}

// Helper function to determine sale note status based on payments
function calculateSaleNoteStatus(paidAmount: number, total: number) {
  if (paidAmount <= 0) return 'PENDING'
  if (paidAmount >= total) return 'PAID'
  return 'PARTIALLY_PAID'
}
