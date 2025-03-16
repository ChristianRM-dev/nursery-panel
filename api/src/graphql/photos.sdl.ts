export const schema = gql`
  type Photo {
    id: String!
    url: String!
    plantId: String!
    plant: Plant!
    createdAt: DateTime!
  }

  type Query {
    photos: [Photo!]! @requireAuth
    photo(id: String!): Photo @requireAuth
  }

  input CreatePhotoInput {
    url: String!
    plantId: String!
  }

  input UpdatePhotoInput {
    url: String
    plantId: String
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): Photo! @requireAuth
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @requireAuth
    deletePhoto(id: String!): Photo! @requireAuth
  }
`
