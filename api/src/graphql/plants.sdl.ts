// api/src/graphql/plants.sdl.ts
export const schema = gql`
  type Plant {
    id: String!
    name: String!
    price: Float!
    stock: Int!
    categoryId: String!
    category: Category!
    presentationType: PresentationType!
    presentationDetails: String
    photos: [Photo]!
    saleDetails: [SaleDetail]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  enum PresentationType {
    BAG
    POT
    HANGING
  }

  type PlantsResponse {
    data: [Plant!]!
    meta: PaginationMeta!
  }

  type Query {
    plants(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): PlantsResponse! @requireAuth
    plant(id: String!): Plant @requireAuth
  }

  input CreatePlantInput {
  name: String!
  price: Float!
  stock: Int!
  categoryId: String! # Changed from categoryId to category
  presentationType: PresentationType! # Changed from presentationType to presentation
  presentationDetails: String
  photos: [PhotoInput!]! # Added photos field
}

input PhotoInput {
  path: String!
  content: String! # Base64-encoded file data
}

  input UpdatePlantInput {
    name: String
    price: Float
    stock: Int
    categoryId: String
    presentationType: PresentationType
    presentationDetails: String
  }

  type Mutation {
    createPlant(input: CreatePlantInput!): Plant! @requireAuth
    updatePlant(id: String!, input: UpdatePlantInput!): Plant! @requireAuth
    deletePlant(id: String!): Plant! @requireAuth
  }
`