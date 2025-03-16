import type { Prisma, Photo } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PhotoCreateArgs>({
  photo: {
    one: {
      data: {
        url: 'String',
        plant: {
          create: {
            name: 'String',
            price: 3115908.798050502,
            stock: 7945162,
            presentationType: 'BAG',
            updatedAt: '2025-03-16T17:07:01.231Z',
            category: {
              create: {
                name: 'String4388073',
                updatedAt: '2025-03-16T17:07:01.239Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        url: 'String',
        plant: {
          create: {
            name: 'String',
            price: 422915.8821896761,
            stock: 9346385,
            presentationType: 'BAG',
            updatedAt: '2025-03-16T17:07:01.247Z',
            category: {
              create: {
                name: 'String3333929',
                updatedAt: '2025-03-16T17:07:01.256Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Photo, 'photo'>
