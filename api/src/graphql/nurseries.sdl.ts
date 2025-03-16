export const schema = gql`
  type Nursery {
    id: String!
    name: String!
    address: String!
    phone: String!
    logo: String
    rfc: String!
    saleNotes: [SaleNote]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type Query {
    nurseries: [Nursery!]! @requireAuth
    nursery(id: String!): Nursery @requireAuth
  }

  input CreateNurseryInput {
    name: String!
    address: String!
    phone: String!
    logo: String
    rfc: String!
    deletedAt: DateTime
  }

  input UpdateNurseryInput {
    name: String
    address: String
    phone: String
    logo: String
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
