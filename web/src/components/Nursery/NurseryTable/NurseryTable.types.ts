// web/src/components/Nursery/NurseryTable/NurseryTable.types.ts
import { TableRow } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

export interface NurseryTableRow extends TableRow {
  name: string
  address: string
  phone: string
  rfc: string
}
