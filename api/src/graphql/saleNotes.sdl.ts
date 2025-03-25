// api/src/graphql/saleNotes.sdl.ts
export const schema = gql`
  type SaleNote {
    id: String!
    customerId: String!
    customer: Customer!
    nurseryId: String!
    nursery: Nursery!
    saleDetails: [SaleDetail!]!
    total: Float!
    folio: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type SaleNotesResponse {
    data: [SaleNote!]!
    meta: PaginationMeta!
  }

  type SaleDetail {
    id: String!
    saleNoteId: String!
    saleNote: SaleNote!
    plantId: String!
    plant: Plant!
    price: Float!
    quantity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input SaleDetailInput {
    plantId: String!
    price: Float!
    quantity: Int!
  }

  input UpdateSaleDetailInput {
    id: String # For existing details
    plantId: String
    price: Float
    quantity: Int
  }

  input CreateSaleNoteInput {
    customerId: String!
    nurseryId: String!
    saleDetails: [SaleDetailInput!]!
  }

  input UpdateSaleNoteInput {
    customerId: String
    nurseryId: String
    saleDetails: [UpdateSaleDetailInput!]
  }

  type Query {
    saleNotes(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): SaleNotesResponse! @requireAuth
    saleNote(id: String!): SaleNote @requireAuth
  }

  type Mutation {
    createSaleNote(input: CreateSaleNoteInput!): SaleNote! @requireAuth
    updateSaleNote(id: String!, input: UpdateSaleNoteInput!): SaleNote!
      @requireAuth
    deleteSaleNote(id: String!): SaleNote! @requireAuth
  }
`
