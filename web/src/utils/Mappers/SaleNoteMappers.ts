// web/src/utils/Mappers/SaleNoteMappers.ts
import { CreateSaleNoteInput, UpdateSaleNoteInput } from 'types/graphql'

import { SaleNoteFormValues } from 'src/components/SaleNote/SaleNoteForm/SaleNoteForm.schema'
import { SaleNoteTableRow } from 'src/components/SaleNote/SaleNoteTable/SaleNoteTable.types'
import { GetPaginatedSaleNotesItem } from 'src/hooks/SaleNotes/useGetPaginatedSaleNotes'

/**
 * Maps `GetPaginatedSaleNotesItem` to the `SaleNoteTableRow` expected by the PaginatedTable component.
 */
export const mapGetPaginatedSaleNotesItemToSaleNoteTableRow = (
  saleNotes: GetPaginatedSaleNotesItem
): SaleNoteTableRow[] => {
  return saleNotes.map((saleNote) => ({
    ...saleNote,
    customer: saleNote.customer.name,
    nursery: saleNote.nursery.name,
    total: saleNote.total,
    folio: saleNote.folio,
    createdAt: saleNote.createdAt,
  }))
}

/**
 * Maps `SaleNoteFormValues` to the `CreateSaleNoteInput` expected by the mutation.
 */
export const mapSaleNoteFormValuesToCreateSaleNoteInput = (
  values: SaleNoteFormValues
): CreateSaleNoteInput => {
  return {
    customerId: values.customerId,
    nurseryId: values.nurseryId,
    saleDetails: values.saleDetails.map((detail) => ({
      plantId: detail.plantId,
      price: detail.price,
      quantity: detail.quantity,
    })),
    externalPlants: values.externalPlants,
  }
}

/**
 * Maps `SaleNoteFormValues` to the `UpdateSaleNoteInput` expected by the mutation.
 * Note: This assumes the frontend doesn't track existing sale detail IDs during edit.
 * If you need to track existing IDs, you'll need to include them in the form values.
 */
export const mapSaleNoteFormValuesToUpdateSaleNoteInput = (
  values: SaleNoteFormValues
): UpdateSaleNoteInput => {
  return {
    customerId: values.customerId,
    nurseryId: values.nurseryId,
    // For update, we provide the full list of sale details
    // The backend service will handle updating/deleting existing records
    saleDetails: values.saleDetails.map((detail) => ({
      // If your form tracks existing IDs, include them here
      // id: detail.id, // Uncomment if you add ID tracking to form values
      plantId: detail.plantId,
      price: detail.price,
      quantity: detail.quantity,
    })),
    externalPlants: values.externalPlants,
  }
}
