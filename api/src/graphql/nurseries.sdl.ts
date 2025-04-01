export const schema = gql`
  type Nursery {
    id: String!
    name: String!
    address: String!
    phone: String!
    email: String!
    ownerName: String!
    logo: String
    rfc: String!
    saleNotes: [SaleNote]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  input PhotoInput {
    path: String!
    content: String! # Base64-encoded file data
  }

  type NurseriesResponse {
    data: [Nursery!]!
    meta: PaginationMeta!
  }

  type Query {
    nurseries(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): NurseriesResponse! @requireAuth
    nursery(id: String!): Nursery @requireAuth
  }

  input CreateNurseryInput {
    name: String!
    address: String!
    phone: String!
    email: String!
    ownerName: String!
    logo: PhotoInput # Changed from String to PhotoInput
    rfc: String!
    deletedAt: DateTime
  }

  input UpdateNurseryInput {
    name: String
    address: String
    phone: String
    email: String
    ownerName: String
    logo: PhotoInput # Changed from String to PhotoInput
    rfc: String
    deletedAt: DateTime
  }

  type Mutation {
    createNursery(input: CreateNurseryInput!): Nursery! @requireAuth
    updateNursery(id: String!, input: UpdateNurseryInput!): Nursery!
      @requireAuth
    deleteNursery(id: String!): Nursery! @requireAuth
  }
`
