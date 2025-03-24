// web/src/hooks/Nurseries/useUpdateNursery.ts
import { useMutation, gql, ApolloError } from '@apollo/client'
import {
  UpdateNursery,
  UpdateNurseryInput,
  UpdateNurseryVariables,
} from 'types/graphql'

const UPDATE_NURSERY = gql`
  mutation UpdateNursery($id: String!, $input: UpdateNurseryInput!) {
    updateNursery(id: $id, input: $input) {
      id
      name
      address
      phone
      logo
      rfc
    }
  }
`

interface UseUpdateNurseryProps {
  onCompleted?: (data: UpdateNursery['updateNursery']) => void
  onError?: (error: ApolloError) => void
}

export const useUpdateNursery = ({
  onCompleted,
  onError,
}: UseUpdateNurseryProps) => {
  const [updateNursery, { loading, error }] = useMutation<
    UpdateNursery,
    UpdateNurseryVariables
  >(UPDATE_NURSERY, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.updateNursery)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const handleUpdateNursery = async (id: string, input: UpdateNurseryInput) => {
    try {
      const result = await updateNursery({
        variables: { id, input },
      })
      return result.data.updateNursery
    } catch (error) {
      console.error('Error updating nursery:', error)
      throw error
    }
  }

  return {
    updateNursery: handleUpdateNursery,
    loading,
    error,
  }
}
