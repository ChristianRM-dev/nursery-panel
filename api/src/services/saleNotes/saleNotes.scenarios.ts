import type { Prisma, SaleNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SaleNoteCreateArgs>({
  saleNote: {
    one: {
      data: {
        total: 3682075.5393667803,
        folio: 'String9765949',
        updatedAt: '2025-03-16T17:06:24.746Z',
        customer: {
          create: {
            name: 'String',
            phone: 'String4262534',
            updatedAt: '2025-03-16T17:06:24.755Z',
          },
        },
        nursery: {
          create: {
            name: 'String',
            address: 'String',
            phone: 'String',
            rfc: 'String',
            updatedAt: '2025-03-16T17:06:24.764Z',
          },
        },
      },
    },
    two: {
      data: {
        total: 8247420.381204924,
        folio: 'String843923',
        updatedAt: '2025-03-16T17:06:24.764Z',
        customer: {
          create: {
            name: 'String',
            phone: 'String2622228',
            updatedAt: '2025-03-16T17:06:24.773Z',
          },
        },
        nursery: {
          create: {
            name: 'String',
            address: 'String',
            phone: 'String',
            rfc: 'String',
            updatedAt: '2025-03-16T17:06:24.781Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<SaleNote, 'saleNote'>
