import type { Photo } from '@prisma/client'

import { photos, photo, createPhoto, updatePhoto, deletePhoto } from './photos'
import type { StandardScenario } from './photos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('photos', () => {
  scenario('returns all photos', async (scenario: StandardScenario) => {
    const result = await photos()

    expect(result.length).toEqual(Object.keys(scenario.photo).length)
  })

  scenario('returns a single photo', async (scenario: StandardScenario) => {
    const result = await photo({ id: scenario.photo.one.id })

    expect(result).toEqual(scenario.photo.one)
  })

  scenario('creates a photo', async (scenario: StandardScenario) => {
    const result = await createPhoto({
      input: { url: 'String', plantId: scenario.photo.two.plantId },
    })

    expect(result.url).toEqual('String')
    expect(result.plantId).toEqual(scenario.photo.two.plantId)
  })

  scenario('updates a photo', async (scenario: StandardScenario) => {
    const original = (await photo({ id: scenario.photo.one.id })) as Photo
    const result = await updatePhoto({
      id: original.id,
      input: { url: 'String2' },
    })

    expect(result.url).toEqual('String2')
  })

  scenario('deletes a photo', async (scenario: StandardScenario) => {
    const original = (await deletePhoto({ id: scenario.photo.one.id })) as Photo
    const result = await photo({ id: original.id })

    expect(result).toEqual(null)
  })
})
