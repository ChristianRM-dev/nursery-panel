import type { Category } from '@prisma/client'

import {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory,
} from './categories'
import type { StandardScenario } from './categories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('categories', () => {
  scenario('returns all categories', async (scenario: StandardScenario) => {
    const result = await categories()

    expect(result.length).toEqual(Object.keys(scenario.category).length)
  })

  scenario('returns a single category', async (scenario: StandardScenario) => {
    const result = await category({ id: scenario.category.one.id })

    expect(result).toEqual(scenario.category.one)
  })

  scenario('creates a category', async () => {
    const result = await createCategory({
      input: { name: 'String9877337', updatedAt: '2025-03-16T17:01:49.894Z' },
    })

    expect(result.name).toEqual('String9877337')
    expect(result.updatedAt).toEqual(new Date('2025-03-16T17:01:49.894Z'))
  })

  scenario('updates a category', async (scenario: StandardScenario) => {
    const original = (await category({
      id: scenario.category.one.id,
    })) as Category
    const result = await updateCategory({
      id: original.id,
      input: { name: 'String81314872' },
    })

    expect(result.name).toEqual('String81314872')
  })

  scenario('deletes a category', async (scenario: StandardScenario) => {
    const original = (await deleteCategory({
      id: scenario.category.one.id,
    })) as Category
    const result = await category({ id: original.id })

    expect(result).toEqual(null)
  })
})
