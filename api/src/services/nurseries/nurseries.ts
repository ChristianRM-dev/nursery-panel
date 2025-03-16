import type {
  QueryResolvers,
  MutationResolvers,
  NurseryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const nurseries: QueryResolvers['nurseries'] = () => {
  return db.nursery.findMany()
}

export const nursery: QueryResolvers['nursery'] = ({ id }) => {
  return db.nursery.findUnique({
    where: { id },
  })
}

export const createNursery: MutationResolvers['createNursery'] = ({
  input,
}) => {
  return db.nursery.create({
    data: input,
  })
}

export const updateNursery: MutationResolvers['updateNursery'] = ({
  id,
  input,
}) => {
  return db.nursery.update({
    data: input,
    where: { id },
  })
}

export const deleteNursery: MutationResolvers['deleteNursery'] = ({ id }) => {
  return db.nursery.delete({
    where: { id },
  })
}

export const Nursery: NurseryRelationResolvers = {
  saleNotes: (_obj, { root }) => {
    return db.nursery.findUnique({ where: { id: root?.id } }).saleNotes()
  },
}
