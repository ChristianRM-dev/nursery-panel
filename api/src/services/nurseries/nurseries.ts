// api/src/services/nurseries/nurseries.ts
import { put, del } from '@vercel/blob'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'

export const nurseries: QueryResolvers['nurseries'] = async ({
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
    db.nursery,
    {},
    { saleNotes: true }, // Include related saleNotes if needed
    {
      page,
      pageSize,
      sortField,
      sortOrder: validatedSortOrder, // Use validated sortOrder
      search: searchTerm,
      searchFields: ['name', 'address', 'phone', 'rfc'], // Searchable fields
    }
  )
}

export const nursery: QueryResolvers['nursery'] = ({ id }) => {
  return db.nursery.findUnique({
    where: { id },
    include: {
      saleNotes: true, // Include related saleNotes if needed
    },
  })
}

export const createNursery: MutationResolvers['createNursery'] = async ({
  input,
}) => {
  const { logo, ...rest } = input

  // First, create the nursery in the database to get its ID
  const nursery = await db.nursery.create({
    data: {
      ...rest,
      logo: null, // Temporarily set logo to null
    },
  })

  let logoUrl: string | null = null

  // Upload logo to Vercel Blob if provided
  if (logo) {
    const binaryData = Buffer.from(logo.content, 'base64')
    const file = new File([binaryData], logo.path, { type: 'image/jpeg' })

    // Use the folder path in the Blob path
    const blob = await put(`nurseries/${nursery.id}/logo/${logo.path}`, file, {
      access: 'public',
    })

    logoUrl = blob.url
  }

  // Update the nursery with the logo URL
  return db.nursery.update({
    where: { id: nursery.id },
    data: {
      logo: logoUrl, // Save the logo URL
    },
  })
}

export const updateNursery: MutationResolvers['updateNursery'] = async ({
  id,
  input,
}) => {
  const { logo, ...rest } = input

  // Fetch the existing nursery to check for an existing logo
  const existingNursery = await db.nursery.findUnique({
    where: { id },
  })

  if (!existingNursery) {
    throw new Error('Nursery not found')
  }

  let logoUrl: string | null = existingNursery.logo

  // If a new logo is provided, upload it to Vercel Blob
  if (logo) {
    // Delete the old logo if it exists
    if (existingNursery.logo) {
      await del(existingNursery.logo) // Delete the old logo from Vercel Blob
    }

    // Upload the new logo
    const binaryData = Buffer.from(logo.content, 'base64')
    const file = new File([binaryData], logo.path, { type: 'image/jpeg' })

    // Use the folder path in the Blob path
    const blob = await put(`nurseries/${id}/logo/${logo.path}`, file, {
      access: 'public',
    })

    logoUrl = blob.url
  }

  // Update the nursery with the new data and logo URL
  return db.nursery.update({
    where: { id },
    data: {
      ...rest,
      logo: logoUrl, // Save the new logo URL
    },
  })
}

export const deleteNursery: MutationResolvers['deleteNursery'] = async ({
  id,
}) => {
  // Fetch the nursery to check for an existing logo
  const nursery = await db.nursery.findUnique({
    where: { id },
  })

  if (!nursery) {
    throw new Error('Nursery not found')
  }

  // Delete the logo from Vercel Blob if it exists
  if (nursery.logo) {
    await del(nursery.logo) // Delete the logo from Vercel Blob
  }

  // Delete the nursery
  return db.nursery.delete({
    where: { id },
  })
}
