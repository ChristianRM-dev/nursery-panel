import { Prisma, Payment } from '@prisma/client'

import {
  payments,
  payment,
  createPayment,
  updatePayment,
  deletePayment,
} from './payments'
import type { StandardScenario } from './payments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('payments', () => {
  scenario('returns all payments', async (scenario: StandardScenario) => {
    const result = await payments()

    expect(result.length).toEqual(Object.keys(scenario.payment).length)
  })

  scenario('returns a single payment', async (scenario: StandardScenario) => {
    const result = await payment({ id: scenario.payment.one.id })

    expect(result).toEqual(scenario.payment.one)
  })

  scenario('creates a payment', async (scenario: StandardScenario) => {
    const result = await createPayment({
      input: {
        saleNoteId: scenario.payment.two.saleNoteId,
        amount: 8172550.864222643,
        method: 'CASH',
        updatedAt: '2025-04-08T14:39:28.766Z',
      },
    })

    expect(result.saleNoteId).toEqual(scenario.payment.two.saleNoteId)
    expect(result.amount).toEqual(new Prisma.Decimal(8172550.864222643))
    expect(result.method).toEqual('CASH')
    expect(result.updatedAt).toEqual(new Date('2025-04-08T14:39:28.766Z'))
  })

  scenario('updates a payment', async (scenario: StandardScenario) => {
    const original = (await payment({ id: scenario.payment.one.id })) as Payment
    const result = await updatePayment({
      id: original.id,
      input: { amount: 7156648.177594105 },
    })

    expect(result.amount).toEqual(new Prisma.Decimal(7156648.177594105))
  })

  scenario('deletes a payment', async (scenario: StandardScenario) => {
    const original = (await deletePayment({
      id: scenario.payment.one.id,
    })) as Payment
    const result = await payment({ id: original.id })

    expect(result).toEqual(null)
  })
})
