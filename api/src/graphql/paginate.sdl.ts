// api/src/graphql/paginate.sdl.ts
export const schema = gql`
  input PaginationInput {
    page: Int!
    pageSize: Int!
  }

  input SortInput {
    sortField: String!
    sortOrder: String! # 'asc' or 'desc'
  }

  input SearchInput {
    search: String
  }

  type PaginationMeta {
    total: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }
`