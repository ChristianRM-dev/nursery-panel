export const schema = gql`
  type SaleNote {
    id: String!
    customerId: String!
    customer: Customer!
    nurseryId: String!
    nursery: Nursery!
    saleDetails: [SaleDetail]!
    total: Float!
    folio: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type Query {
    saleNotes: [SaleNote!]! @requireAuth
    saleNote(id: String!): SaleNote @requireAuth
  }

  input CreateSaleNoteInput {
    customerId: String!
    nurseryId: String!
    total: Float!
    folio: String!
    deletedAt: DateTime
  }

  input UpdateSaleNoteInput {
    customerId: String
    nurseryId: String
    total: Float
    folio: String
    deletedAt: DateTime
  }

  type Mutation {
    createSaleNote(input: CreateSaleNoteInput!): SaleNote! @requireAuth
    updateSaleNote(id: String!, input: UpdateSaleNoteInput!): SaleNote!
      @requireAuth
    deleteSaleNote(id: String!): SaleNote! @requireAuth
  }
`
