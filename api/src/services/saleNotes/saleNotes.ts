import type {
  QueryResolvers,
  MutationResolvers,
  SaleNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const saleNotes: QueryResolvers['saleNotes'] = () => {
  return db.saleNote.findMany()
}

export const saleNote: QueryResolvers['saleNote'] = ({ id }) => {
  return db.saleNote.findUnique({
    where: { id },
  })
}

export const createSaleNote: MutationResolvers['createSaleNote'] = ({
  input,
}) => {
  return db.saleNote.create({
    data: input,
  })
}

export const updateSaleNote: MutationResolvers['updateSaleNote'] = ({
  id,
  input,
}) => {
  return db.saleNote.update({
    data: input,
    where: { id },
  })
}

export const deleteSaleNote: MutationResolvers['deleteSaleNote'] = ({ id }) => {
  return db.saleNote.delete({
    where: { id },
  })
}

export const SaleNote: SaleNoteRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.saleNote.findUnique({ where: { id: root?.id } }).customer()
  },
  nursery: (_obj, { root }) => {
    return db.saleNote.findUnique({ where: { id: root?.id } }).nursery()
  },
  saleDetails: (_obj, { root }) => {
    return db.saleNote.findUnique({ where: { id: root?.id } }).saleDetails()
  },
}
