import type { Prisma, Customer } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: {
        name: 'String',
        phone: 'String4047723',
        updatedAt: '2025-03-16T17:02:03.762Z',
      },
    },
    two: {
      data: {
        name: 'String',
        phone: 'String3211006',
        updatedAt: '2025-03-16T17:02:03.762Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Customer, 'customer'>
