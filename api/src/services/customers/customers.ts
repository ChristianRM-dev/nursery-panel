// api/src/services/customers/customers.ts
import type {
  QueryResolvers,
  MutationResolvers,
  CustomerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const customers: QueryResolvers['customers'] = async ({
  pagination,
  sort,
  search,
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {}
  const { search: searchTerm } = search || {}

  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  return paginate(
    db.customer,
    {},
    { saleNotes: true },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder,
      search: searchTerm,
      searchFields: ['name', 'phone', 'email', 'address'], // Added address to searchable fields
    }
  )
}

export const customer: QueryResolvers['customer'] = ({ id }) => {
  return db.customer.findUnique({
    where: { id },
    include: {
      saleNotes: {
        include: {
          saleDetails: true,
          nursery: true,
        },
      },
    },
  })
}

export const createCustomer: MutationResolvers['createCustomer'] = ({
  input,
}) => {
  return db.customer.create({
    data: {
      name: input.name,
      phone: input.phone || null, // Handle optional phone
      email: input.email || null,
      address: input.address || null, // Added address field
    },
    include: {
      saleNotes: true,
    },
  })
}

export const updateCustomer: MutationResolvers['updateCustomer'] = async ({
  id,
  input,
}) => {
  return db.customer.update({
    where: { id },
    data: {
      ...input,
      // Ensure optional fields are properly handled
      phone: input.phone === undefined ? undefined : input.phone || null,
      email: input.email === undefined ? undefined : input.email || null,
      address: input.address === undefined ? undefined : input.address || null,
    },
    include: {
      saleNotes: true,
    },
  })
}

export const deleteCustomer: MutationResolvers['deleteCustomer'] = async ({
  id,
}) => {
  // First check if customer has any sale notes
  const customerWithSales = await db.customer.findUnique({
    where: { id },
    include: {
      saleNotes: {
        select: { id: true },
      },
    },
  })

  if (!customerWithSales) {
    throw new Error('Customer not found')
  }

  if (customerWithSales.saleNotes.length > 0) {
    throw new Error('Cannot delete customer with existing sales')
  }

  return db.customer.delete({
    where: { id },
  })
}

export const Customer: CustomerRelationResolvers = {
  saleNotes: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).saleNotes({
      include: {
        saleDetails: true,
        nursery: true,
      },
    })
  },
}
