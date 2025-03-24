// web/src/components/Customer/CustomerTable/CustomerTable.types.ts
import { TableRow } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

export interface CustomerTableRow extends TableRow {
  name: string
  phone: string
  email: string
}
