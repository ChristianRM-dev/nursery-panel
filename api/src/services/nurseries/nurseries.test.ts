import type { Nursery } from '@prisma/client'

import {
  nurseries,
  nursery,
  createNursery,
  updateNursery,
  deleteNursery,
} from './nurseries'
import type { StandardScenario } from './nurseries.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('nurseries', () => {
  scenario('returns all nurseries', async (scenario: StandardScenario) => {
    const result = await nurseries()

    expect(result.length).toEqual(Object.keys(scenario.nursery).length)
  })

  scenario('returns a single nursery', async (scenario: StandardScenario) => {
    const result = await nursery({ id: scenario.nursery.one.id })

    expect(result).toEqual(scenario.nursery.one)
  })

  scenario('creates a nursery', async () => {
    const result = await createNursery({
      input: {
        name: 'String',
        address: 'String',
        phone: 'String',
        rfc: 'String',
        updatedAt: '2025-03-16T17:06:52.879Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.address).toEqual('String')
    expect(result.phone).toEqual('String')
    expect(result.rfc).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-03-16T17:06:52.879Z'))
  })

  scenario('updates a nursery', async (scenario: StandardScenario) => {
    const original = (await nursery({ id: scenario.nursery.one.id })) as Nursery
    const result = await updateNursery({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a nursery', async (scenario: StandardScenario) => {
    const original = (await deleteNursery({
      id: scenario.nursery.one.id,
    })) as Nursery
    const result = await nursery({ id: original.id })

    expect(result).toEqual(null)
  })
})
