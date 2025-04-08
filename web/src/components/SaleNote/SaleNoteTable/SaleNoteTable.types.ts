// web/src/components/SaleNote/SaleNoteTable/SaleNoteTable.types.ts
import { SaleStatus } from 'types/graphql'

import { TableRow } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

export interface SaleNoteTableRow extends TableRow {
  folio: string
  customer: string
  nursery: string
  total: number
  status: SaleStatus
  createdAt: string
}
