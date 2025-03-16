import { Prisma, SaleNote } from '@prisma/client'

import {
  saleNotes,
  saleNote,
  createSaleNote,
  updateSaleNote,
  deleteSaleNote,
} from './saleNotes'
import type { StandardScenario } from './saleNotes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('saleNotes', () => {
  scenario('returns all saleNotes', async (scenario: StandardScenario) => {
    const result = await saleNotes()

    expect(result.length).toEqual(Object.keys(scenario.saleNote).length)
  })

  scenario('returns a single saleNote', async (scenario: StandardScenario) => {
    const result = await saleNote({ id: scenario.saleNote.one.id })

    expect(result).toEqual(scenario.saleNote.one)
  })

  scenario('creates a saleNote', async (scenario: StandardScenario) => {
    const result = await createSaleNote({
      input: {
        customerId: scenario.saleNote.two.customerId,
        nurseryId: scenario.saleNote.two.nurseryId,
        total: 8344064.375545202,
        folio: 'String4349583',
        updatedAt: '2025-03-16T17:06:24.653Z',
      },
    })

    expect(result.customerId).toEqual(scenario.saleNote.two.customerId)
    expect(result.nurseryId).toEqual(scenario.saleNote.two.nurseryId)
    expect(result.total).toEqual(new Prisma.Decimal(8344064.375545202))
    expect(result.folio).toEqual('String4349583')
    expect(result.updatedAt).toEqual(new Date('2025-03-16T17:06:24.653Z'))
  })

  scenario('updates a saleNote', async (scenario: StandardScenario) => {
    const original = (await saleNote({
      id: scenario.saleNote.one.id,
    })) as SaleNote
    const result = await updateSaleNote({
      id: original.id,
      input: { total: 8952041.187235272 },
    })

    expect(result.total).toEqual(new Prisma.Decimal(8952041.187235272))
  })

  scenario('deletes a saleNote', async (scenario: StandardScenario) => {
    const original = (await deleteSaleNote({
      id: scenario.saleNote.one.id,
    })) as SaleNote
    const result = await saleNote({ id: original.id })

    expect(result).toEqual(null)
  })
})
