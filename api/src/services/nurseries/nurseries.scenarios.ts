import type { Prisma, Nursery } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NurseryCreateArgs>({
  nursery: {
    one: {
      data: {
        name: 'String',
        address: 'String',
        phone: 'String',
        rfc: 'String',
        updatedAt: '2025-03-16T17:06:52.934Z',
      },
    },
    two: {
      data: {
        name: 'String',
        address: 'String',
        phone: 'String',
        rfc: 'String',
        updatedAt: '2025-03-16T17:06:52.934Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Nursery, 'nursery'>
