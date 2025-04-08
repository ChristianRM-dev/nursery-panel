// web/src/hooks/Payments/useCreatePayment.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  CreatePayment,
  CreatePaymentInput,
  CreatePaymentVariables,
} from 'types/graphql'

const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
      amount
      method
      reference
      notes
      createdAt
      saleNote {
        id
        folio
        paidAmount
        status
      }
    }
  }
`

interface UseCreatePaymentProps {
  onCompleted?: (data: CreatePayment['createPayment']) => void
  onError?: (error: ApolloError) => void
}

export const useCreatePayment = ({
  onCompleted,
  onError,
}: UseCreatePaymentProps) => {
  const [createPayment, { loading, error }] = useMutation<
    CreatePayment,
    CreatePaymentVariables
  >(CREATE_PAYMENT, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.createPayment)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleCreatePayment = async (input: CreatePaymentInput) => {
    try {
      const result = await createPayment({
        variables: { input },
      })
      return result.data.createPayment
    } catch (error) {
      console.error('Error creating payment:', error)
      throw error
    }
  }

  return {
    createPayment: handleCreatePayment,
    loading,
    error,
  }
}
