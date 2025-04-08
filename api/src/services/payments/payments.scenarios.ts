import type { Prisma, Payment } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PaymentCreateArgs>({
  payment: {
    one: {
      data: {
        amount: 535607.729353147,
        method: 'CASH',
        updatedAt: '2025-04-08T14:39:29.740Z',
        saleNote: {
          create: {
            externalPlants: { foo: 'bar' },
            total: 6746250.183543638,
            folio: 'String6792384',
            updatedAt: '2025-04-08T14:39:29.817Z',
            customer: {
              create: {
                name: 'String',
                phone: 'String3360195',
                updatedAt: '2025-04-08T14:39:29.866Z',
              },
            },
            nursery: {
              create: {
                name: 'String',
                address: 'String',
                phone: 'String',
                email: 'String',
                ownerName: 'String',
                logo: 'String',
                rfc: 'String',
                updatedAt: '2025-04-08T14:39:29.923Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 355645.97704556666,
        method: 'CASH',
        updatedAt: '2025-04-08T14:39:29.923Z',
        saleNote: {
          create: {
            externalPlants: { foo: 'bar' },
            total: 4264948.49468108,
            folio: 'String5227210',
            updatedAt: '2025-04-08T14:39:29.980Z',
            customer: {
              create: {
                name: 'String',
                phone: 'String6175455',
                updatedAt: '2025-04-08T14:39:30.040Z',
              },
            },
            nursery: {
              create: {
                name: 'String',
                address: 'String',
                phone: 'String',
                email: 'String',
                ownerName: 'String',
                logo: 'String',
                rfc: 'String',
                updatedAt: '2025-04-08T14:39:30.088Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Payment, 'payment'>
