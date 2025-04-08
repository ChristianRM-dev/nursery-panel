export const schema = gql`
  type Payment {
    id: String!
    saleNoteId: String!
    saleNote: SaleNote!
    amount: Float!
    method: PaymentMethod!
    reference: String
    notes: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum PaymentMethod {
    CASH
    CREDIT_CARD
    DEBIT_CARD
    BANK_TRANSFER
    DIGITAL_WALLET
    CHECK
    OTHER
  }

  type PaymentResponse {
    data: [Payment!]!
    meta: PaginationMeta!
  }

  type Query {
    payments(
      saleNoteId: String
      pagination: PaginationInput!
    ): PaymentResponse! @requireAuth
    payment(id: String!): Payment @requireAuth
  }

  input CreatePaymentInput {
    saleNoteId: String!
    amount: Float!
    method: PaymentMethod!
    reference: String
    notes: String
  }

  input UpdatePaymentInput {
    amount: Float
    method: PaymentMethod
    reference: String
    notes: String
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment! @requireAuth
    updatePayment(id: String!, input: UpdatePaymentInput!): Payment!
      @requireAuth
    deletePayment(id: String!): Payment! @requireAuth
  }
`
