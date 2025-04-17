// web/src/hooks/Payments/useUpdatePayment.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdatePayment,
  UpdatePaymentInput,
  UpdatePaymentVariables,
} from 'types/graphql'

const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: String!, $input: UpdatePaymentInput!) {
    updatePayment(id: $id, input: $input) {
      id
      amount
      method
      reference
      notes
      saleNote {
        id
        folio
        total
        paidAmount
      }
    }
  }
`

interface UseUpdatePaymentProps {
  onCompleted?: (data: UpdatePayment['updatePayment']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdatePayment = ({
  onCompleted,
  onError,
}: UseUpdatePaymentProps) => {
  const [updatePayment, { loading, error }] = useMutation<
    UpdatePayment,
    UpdatePaymentVariables
  >(UPDATE_PAYMENT, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.updatePayment)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleUpdatePayment = async (id: string, input: UpdatePaymentInput) => {
    try {
      const result = await updatePayment({
        variables: { id, input },
      })
      return result.data?.updatePayment
    } catch (error) {
      console.error('Error updating payment:', error)
      throw error
    }
  }

  return {
    updatePayment: handleUpdatePayment,
    loading,
    error,
  }
}
