// api/src/graphql/customers.sdl.ts
export const schema = gql`
  type Customer {
    id: String!
    name: String!
    phone: String
    email: String
    address: String
    saleNotes: [SaleNote]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type CustomersResponse {
    data: [Customer!]!
    meta: PaginationMeta!
  }

  type Query {
    customers(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): CustomersResponse! @requireAuth
    customer(id: String!): Customer @requireAuth
  }

  input CreateCustomerInput {
    name: String!
    phone: String
    email: String
    address: String
  }

  input UpdateCustomerInput {
    name: String
    phone: String
    email: String
    address: String
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @requireAuth
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
      @requireAuth
    deleteCustomer(id: String!): Customer! @requireAuth
  }
`
