// api/src/graphql/saleNotes.sdl.ts
export const schema = gql`
  type ExternalPlant {
    name: String!
    price: Float!
    quantity: Int!
    presentationType: String
    presentationDetails: String
  }
  type SaleNote {
    id: String!
    customerId: String!
    customer: Customer!
    nurseryId: String!
    nursery: Nursery!
    saleDetails: [SaleDetail!]!
    externalPlants: [ExternalPlant!]
    total: Float!
    folio: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type SaleNotesReportResponse {
    folio: String!
    createdAt: DateTime!
    customer: Customer!
    nursery: Nursery!
    total: Float!
    plantDetails: [SaleDetailReport!]!
  }

  type SaleDetailReport {
    id: String
    name: String!
    price: Float!
    quantity: Int!
    total: Float!
    category: String
    presentationType: String
    presentationDetails: String
    isExternal: Boolean!
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

  input ExternalPlantInput {
    name: String!
    price: Float!
    quantity: Int!
    presentationType: String
    presentationDetails: String
  }

  input CreateSaleNoteInput {
    customerId: String!
    nurseryId: String!
    externalPlants: [ExternalPlantInput!]
    saleDetails: [SaleDetailInput!]!
  }

  input UpdateSaleNoteInput {
    customerId: String
    nurseryId: String
    externalPlants: [ExternalPlantInput!]
    saleDetails: [UpdateSaleDetailInput!]
  }

  type Query {
    saleNotes(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): SaleNotesResponse! @requireAuth
    saleNote(id: String!): SaleNote @requireAuth
    saleNotesReport(
      startDate: DateTime!
      endDate: DateTime!
    ): [SaleNotesReportResponse!]! @requireAuth
  }

  type Mutation {
    createSaleNote(input: CreateSaleNoteInput!): SaleNote! @requireAuth
    updateSaleNote(id: String!, input: UpdateSaleNoteInput!): SaleNote!
      @requireAuth
    deleteSaleNote(id: String!): SaleNote! @requireAuth
  }
`
