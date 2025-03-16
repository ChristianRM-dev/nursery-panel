import type { Prisma, SaleDetail } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SaleDetailCreateArgs>({
  saleDetail: {
    one: {
      data: {
        price: 1866078.10112978,
        quantity: 6457776,
        updatedAt: '2025-03-16T17:06:44.177Z',
        saleNote: {
          create: {
            total: 7084978.864920335,
            folio: 'String633656',
            updatedAt: '2025-03-16T17:06:44.185Z',
            customer: {
              create: {
                name: 'String',
                phone: 'String9904275',
                updatedAt: '2025-03-16T17:06:44.194Z',
              },
            },
            nursery: {
              create: {
                name: 'String',
                address: 'String',
                phone: 'String',
                rfc: 'String',
                updatedAt: '2025-03-16T17:06:44.203Z',
              },
            },
          },
        },
        plant: {
          create: {
            name: 'String',
            price: 5207820.755701316,
            stock: 5648364,
            presentationType: 'BAG',
            updatedAt: '2025-03-16T17:06:44.211Z',
            category: {
              create: {
                name: 'String6034548',
                updatedAt: '2025-03-16T17:06:44.220Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        price: 7690019.4860878335,
        quantity: 7898610,
        updatedAt: '2025-03-16T17:06:44.220Z',
        saleNote: {
          create: {
            total: 9283385.03956133,
            folio: 'String7808873',
            updatedAt: '2025-03-16T17:06:44.228Z',
            customer: {
              create: {
                name: 'String',
                phone: 'String2309938',
                updatedAt: '2025-03-16T17:06:44.236Z',
              },
            },
            nursery: {
              create: {
                name: 'String',
                address: 'String',
                phone: 'String',
                rfc: 'String',
                updatedAt: '2025-03-16T17:06:44.244Z',
              },
            },
          },
        },
        plant: {
          create: {
            name: 'String',
            price: 7482229.376151312,
            stock: 2091589,
            presentationType: 'BAG',
            updatedAt: '2025-03-16T17:06:44.253Z',
            category: {
              create: {
                name: 'String4804506',
                updatedAt: '2025-03-16T17:06:44.262Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<SaleDetail, 'saleDetail'>
