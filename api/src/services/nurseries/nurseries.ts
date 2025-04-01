// api/src/services/nurseries/nurseries.ts
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { uploadToBlob, safeDeleteFromBlob } from 'src/lib/blob'
import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const nurseries: QueryResolvers['nurseries'] = async ({
  pagination,
  sort,
  search,
}) => {
  const { page, pageSize } = pagination
  const { sortField, sortOrder = 'desc' } = sort || {}
  const { search: searchTerm } = search || {}

  const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

  return paginate(
    db.nursery,
    {},
    { saleNotes: true },
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder,
      search: searchTerm,
      searchFields: ['name', 'address', 'phone', 'rfc', 'email', 'ownerName'],
    }
  )
}

export const nursery: QueryResolvers['nursery'] = ({ id }) => {
  return db.nursery.findUnique({
    where: { id },
    include: {
      saleNotes: true,
    },
  })
}

export const createNursery: MutationResolvers['createNursery'] = async ({
  input,
}) => {
  const { logo, ...rest } = input

  // First upload the logo if it exists
  let logoUrl: string | null = null
  if (logo) {
    logoUrl = await uploadToBlob('nurseries', rest.name, logo)
  }

  // Then create the nursery with the logo URL (or null if no logo)
  return db.nursery.create({
    data: {
      ...rest,
      logo: logoUrl, // This can now be null
    },
  })
}

export const updateNursery: MutationResolvers['updateNursery'] = async ({
  id,
  input,
}) => {
  const { logo, ...rest } = input

  const existingNursery = await db.nursery.findUnique({
    where: { id },
  })

  if (!existingNursery) {
    throw new Error('Nursery not found')
  }

  let logoUrl: string | null = existingNursery.logo

  if (logo) {
    if (existingNursery.logo) {
      await safeDeleteFromBlob(existingNursery.logo)
    }
    logoUrl = await uploadToBlob('nurseries', id, logo)
  }

  return db.nursery.update({
    where: { id },
    data: {
      ...rest,
      logo: logoUrl,
    },
  })
}
export const deleteNursery: MutationResolvers['deleteNursery'] = async ({
  id,
}) => {
  const nursery = await db.nursery.findUnique({
    where: { id },
  })

  if (!nursery) {
    throw new Error('Nursery not found')
  }

  await safeDeleteFromBlob(nursery.logo)

  return db.nursery.delete({
    where: { id },
  })
}
