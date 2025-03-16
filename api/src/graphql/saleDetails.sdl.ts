export const schema = gql`
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

  type Query {
    saleDetails: [SaleDetail!]! @requireAuth
    saleDetail(id: String!): SaleDetail @requireAuth
  }

  input CreateSaleDetailInput {
    saleNoteId: String!
    plantId: String!
    price: Float!
    quantity: Int!
  }

  input UpdateSaleDetailInput {
    saleNoteId: String
    plantId: String
    price: Float
    quantity: Int
  }

  type Mutation {
    createSaleDetail(input: CreateSaleDetailInput!): SaleDetail! @requireAuth
    updateSaleDetail(id: String!, input: UpdateSaleDetailInput!): SaleDetail!
      @requireAuth
    deleteSaleDetail(id: String!): SaleDetail! @requireAuth
  }
`
