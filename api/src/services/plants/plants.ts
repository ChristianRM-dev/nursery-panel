// api/src/services/plants/plants.ts
import { db } from 'src/lib/db'
import { paginate } from 'src/lib/pagination'
import { put } from '@vercel/blob';
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

export const createPlant: MutationResolvers['createPlant'] = async ({ input }) => {
  const { photos, ...rest } = input;

  // Upload photos to Vercel Blob
  const uploadedPhotos = await Promise.all(
    photos.map(async (photo) => {
      // Convert the photo data to a format compatible with Vercel Blob
      const file = new File([photo.content], photo.path, { type: 'image/jpeg' }); // Adjust the MIME type as needed

      // Upload the file to Vercel Blob
      const blob = await put(photo.path, file, {
        access: 'public', // Make the files publicly accessible
      });

      return {
        url: blob.url, // Store the Blob URL
        pathname: blob.pathname, // Use `pathname` instead of `path`
      };
    })
  );

  // Create the plant in the database with the Blob URLs
  return db.plant.create({
    data: {
      name: rest.name,
      price: rest.price,
      stock: rest.stock,
      category: {
        connect: { id: rest.categoryId }, // Connect to the Category by ID
      },
      presentationType: rest.presentationType, // Use `presentationType` instead of `presentation`
      presentationDetails: rest.presentationDetails,
      photos: {
        create: uploadedPhotos.map((photo) => ({
          url: photo.url,
        })),
      },
    },
    include: {
      photos: true, // Include photos in the response
      category: true, // Include category in the response
    },
  });
};

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