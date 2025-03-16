export const schema = gql`
  type Customer {
    id: String!
    name: String!
    phone: String!
    email: String
    saleNotes: [SaleNote]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type Query {
    customers: [Customer!]! @requireAuth
    customer(id: String!): Customer @requireAuth
  }

  input CreateCustomerInput {
    name: String!
    phone: String!
    email: String
    deletedAt: DateTime
  }

  input UpdateCustomerInput {
    name: String
    phone: String
    email: String
    deletedAt: DateTime
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @requireAuth
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
      @requireAuth
    deleteCustomer(id: String!): Customer! @requireAuth
  }
`
