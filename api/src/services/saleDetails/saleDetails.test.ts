import { Prisma, SaleDetail } from '@prisma/client'

import {
  saleDetails,
  saleDetail,
  createSaleDetail,
  updateSaleDetail,
  deleteSaleDetail,
} from './saleDetails'
import type { StandardScenario } from './saleDetails.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('saleDetails', () => {
  scenario('returns all saleDetails', async (scenario: StandardScenario) => {
    const result = await saleDetails()

    expect(result.length).toEqual(Object.keys(scenario.saleDetail).length)
  })

  scenario(
    'returns a single saleDetail',
    async (scenario: StandardScenario) => {
      const result = await saleDetail({ id: scenario.saleDetail.one.id })

      expect(result).toEqual(scenario.saleDetail.one)
    }
  )

  scenario('creates a saleDetail', async (scenario: StandardScenario) => {
    const result = await createSaleDetail({
      input: {
        saleNoteId: scenario.saleDetail.two.saleNoteId,
        plantId: scenario.saleDetail.two.plantId,
        price: 1014150.9290890726,
        quantity: 8111788,
        updatedAt: '2025-03-16T17:06:44.008Z',
      },
    })

    expect(result.saleNoteId).toEqual(scenario.saleDetail.two.saleNoteId)
    expect(result.plantId).toEqual(scenario.saleDetail.two.plantId)
    expect(result.price).toEqual(new Prisma.Decimal(1014150.9290890726))
    expect(result.quantity).toEqual(8111788)
    expect(result.updatedAt).toEqual(new Date('2025-03-16T17:06:44.008Z'))
  })

  scenario('updates a saleDetail', async (scenario: StandardScenario) => {
    const original = (await saleDetail({
      id: scenario.saleDetail.one.id,
    })) as SaleDetail
    const result = await updateSaleDetail({
      id: original.id,
      input: { price: 9679285.393663295 },
    })

    expect(result.price).toEqual(new Prisma.Decimal(9679285.393663295))
  })

  scenario('deletes a saleDetail', async (scenario: StandardScenario) => {
    const original = (await deleteSaleDetail({
      id: scenario.saleDetail.one.id,
    })) as SaleDetail
    const result = await saleDetail({ id: original.id })

    expect(result).toEqual(null)
  })
})
