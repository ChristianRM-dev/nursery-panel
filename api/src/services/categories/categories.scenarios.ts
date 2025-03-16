import type { Prisma, Category } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: {
      data: { name: 'String4732106', updatedAt: '2025-03-16T17:01:49.949Z' },
    },
    two: {
      data: { name: 'String8647718', updatedAt: '2025-03-16T17:01:49.949Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Category, 'category'>
