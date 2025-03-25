// api/src/graphql/categories.sdl.ts
export const schema = gql`
  type Category {
    id: String!
    name: String!
    description: String
    image: String
    plants: [Plant]!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
  }

  type CategoriesResponse {
    data: [Category!]!
    meta: PaginationMeta!
  }

  type PublicCategory {
    id: String!
    name: String!
    description: String
    image: String
    plants: [PublicPlant]!
  }

  type PublicPlant {
    id: String!
    name: String!
    price: Float!
    mainPhoto: String
    presentationType: PresentationType!
  }

  type Query {
    # Admin queries (require authentication)
    categories(
      pagination: PaginationInput!
      sort: SortInput
      search: SearchInput
    ): CategoriesResponse! @requireAuth
    category(id: String!): Category @requireAuth

    # Public queries (no authentication required)
    publicCategoriesWithPlants: [PublicCategory!]! @skipAuth
    publicCategoryWithPlants(id: String!): PublicCategory @skipAuth
  }

  input CreateCategoryInput {
    name: String!
    description: String
    image: String
    deletedAt: DateTime
  }

  input UpdateCategoryInput {
    name: String
    description: String
    image: String
    deletedAt: DateTime
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: String!, input: UpdateCategoryInput!): Category!
      @skipAuth
    deleteCategory(id: String!): Category! @requireAuth
  }
`
