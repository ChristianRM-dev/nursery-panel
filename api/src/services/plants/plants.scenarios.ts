import type { Prisma, Plant } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PlantCreateArgs>({
  plant: {
    one: {
      data: {
        name: 'String',
        price: 5606910.937739758,
        stock: 1121416,
        presentationType: 'BAG',
        updatedAt: '2025-03-16T17:01:35.782Z',
        category: {
          create: {
            name: 'String3597568',
            updatedAt: '2025-03-16T17:01:35.792Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        price: 1038186.7544462731,
        stock: 7408620,
        presentationType: 'BAG',
        updatedAt: '2025-03-16T17:01:35.792Z',
        category: {
          create: {
            name: 'String7646759',
            updatedAt: '2025-03-16T17:01:35.801Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Plant, 'plant'>
