// web/src/components/Category/CategoryTable/CategoryTable.types.ts
import { TableRow } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

export interface CategoryTableRow extends TableRow {
  name: string
  description?: string // Optional description field
  plantsCount?: number // Optional field to display the number of plants in the category
}
