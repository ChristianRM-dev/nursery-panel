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
      searchFields: ['name', 'phone', 'email'],
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
      phone: input.phone,
      email: input.email,
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
    data: input,
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
