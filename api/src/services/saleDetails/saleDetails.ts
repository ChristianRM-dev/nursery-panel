import type {
  QueryResolvers,
  MutationResolvers,
  SaleDetailRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const saleDetails: QueryResolvers['saleDetails'] = () => {
  return db.saleDetail.findMany()
}

export const saleDetail: QueryResolvers['saleDetail'] = ({ id }) => {
  return db.saleDetail.findUnique({
    where: { id },
  })
}

export const createSaleDetail: MutationResolvers['createSaleDetail'] = ({
  input,
}) => {
  return db.saleDetail.create({
    data: input,
  })
}

export const updateSaleDetail: MutationResolvers['updateSaleDetail'] = ({
  id,
  input,
}) => {
  return db.saleDetail.update({
    data: input,
    where: { id },
  })
}

export const deleteSaleDetail: MutationResolvers['deleteSaleDetail'] = ({
  id,
}) => {
  return db.saleDetail.delete({
    where: { id },
  })
}

export const SaleDetail: SaleDetailRelationResolvers = {
  saleNote: (_obj, { root }) => {
    return db.saleDetail.findUnique({ where: { id: root?.id } }).saleNote()
  },
  plant: (_obj, { root }) => {
    return db.saleDetail.findUnique({ where: { id: root?.id } }).plant()
  },
}
