import { Prisma, Plant } from '@prisma/client'

import { plants, plant, createPlant, updatePlant, deletePlant } from './plants'
import type { StandardScenario } from './plants.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('plants', () => {
  scenario('returns all plants', async (scenario: StandardScenario) => {
    const result = await plants()

    expect(result.length).toEqual(Object.keys(scenario.plant).length)
  })

  scenario('returns a single plant', async (scenario: StandardScenario) => {
    const result = await plant({ id: scenario.plant.one.id })

    expect(result).toEqual(scenario.plant.one)
  })

  scenario('creates a plant', async (scenario: StandardScenario) => {
    const result = await createPlant({
      input: {
        name: 'String',
        price: 2567149.537211353,
        stock: 8258266,
        categoryId: scenario.plant.two.categoryId,
        presentationType: 'BAG',
        updatedAt: '2025-03-16T17:01:35.706Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.price).toEqual(new Prisma.Decimal(2567149.537211353))
    expect(result.stock).toEqual(8258266)
    expect(result.categoryId).toEqual(scenario.plant.two.categoryId)
    expect(result.presentationType).toEqual('BAG')
    expect(result.updatedAt).toEqual(new Date('2025-03-16T17:01:35.706Z'))
  })

  scenario('updates a plant', async (scenario: StandardScenario) => {
    const original = (await plant({ id: scenario.plant.one.id })) as Plant
    const result = await updatePlant({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a plant', async (scenario: StandardScenario) => {
    const original = (await deletePlant({ id: scenario.plant.one.id })) as Plant
    const result = await plant({ id: original.id })

    expect(result).toEqual(null)
  })
})
