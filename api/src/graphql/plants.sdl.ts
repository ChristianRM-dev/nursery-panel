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

  type PublicPlant {
    id: String!
    name: String!
    price: Float!
    stock: Int!
    presentationType: PresentationType!
    presentationDetails: String
    photos: [Photo!]!
    category: Category!
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
    publicPlant(id: String!): PublicPlant @skipAuth
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

  input UpdatePhotoInput {
    id: String # For previous created photon
    file: PhotoInput # For new photos
  }

  input UpdatePlantInput {
    name: String
    price: Float
    stock: Int
    categoryId: String
    presentationType: PresentationType
    presentationDetails: String
    photos: [UpdatePhotoInput!]! # Added photos field
  }

  type Mutation {
    createPlant(input: CreatePlantInput!): Plant! @requireAuth
    updatePlant(id: String!, input: UpdatePlantInput!): Plant! @requireAuth
    deletePlant(id: String!): Plant! @requireAuth
  }
`
