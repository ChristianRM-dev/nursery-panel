// web/src/utils/Mappers/SaleNoteMappers.ts
import {
  CreateSaleNoteInput,
  UpdateSaleNoteInput,
} from 'types/graphql'

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
    folio: values.folio,
    saleDetails: values.saleDetails.map(detail => ({
      plantId: detail.plantId,
      price: detail.price,
      quantity: detail.quantity,
    })),
  }
}

/**
 * Maps `SaleNoteFormValues` to the `UpdateSaleNoteInput` expected by the mutation.
 */
export const mapSaleNoteFormValuesToUpdateSaleNoteInput = (
  values: SaleNoteFormValues
): UpdateSaleNoteInput => {
  return {
    customerId: values.customerId,
    nurseryId: values.nurseryId,
    folio: values.folio,
    saleDetails: {
      // For update, we might need to handle existing vs new details differently
      create: values.saleDetails.map(detail => ({
        plantId: detail.plantId,
        price: detail.price,
        quantity: detail.quantity,
      })),
      // You might want to add update/delete operations for existing details
    },
  }
}
