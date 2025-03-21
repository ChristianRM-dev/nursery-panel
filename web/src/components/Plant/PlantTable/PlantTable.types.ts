import { TableRow } from 'src/components/Shared/PaginatedTable/PaginatedTable.types'

export interface PlantTableRow extends TableRow {
  name: string
  price: number
  stock: number
  category: string
  presentationType: string
}
