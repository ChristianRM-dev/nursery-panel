import { TableRow } from "src/components/Shared/PaginatedTable/PaginatedTable.types"

export interface PlantsTableRow extends TableRow {
  name: string
  price: number
  stock: number
}