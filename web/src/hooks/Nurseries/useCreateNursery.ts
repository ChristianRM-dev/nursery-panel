// web/src/hooks/Nurseries/useCreateNursery.ts
import { ApolloError, gql, useMutation } from '@apollo/client'
import { CreateNursery, CreateNurseryVariables } from 'types/graphql'

export const CREATE_NURSERY = gql`
  mutation CreateNursery($input: CreateNurseryInput!) {
    createNursery(input: $input) {
      id
      name
      address
      phone
      logo
      rfc
      createdAt
      updatedAt
    }
  }
`

interface UseCreateNurseryProps {
  onCompleted?: (data: CreateNursery['createNursery']) => void
  onError?: (error: ApolloError) => void
}

export const useCreateNursery = ({
  onCompleted,
  onError,
}: UseCreateNurseryProps = {}) => {
  const [createNurseryMutation, { loading, error }] = useMutation<
    CreateNursery,
    CreateNurseryVariables
  >(CREATE_NURSERY, {
    onCompleted: (data) => {
      if (onCompleted) {
        onCompleted(data.createNursery)
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  const createNursery = (input: CreateNurseryVariables['input']) => {
    return createNurseryMutation({ variables: { input } })
  }

  return {
    createNursery,
    loading,
    error,
  }
}
