import { render } from '@redwoodjs/testing/web'

import PlantDetailsPage from './PlantDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlantDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlantDetailsPage />)
    }).not.toThrow()
  })
})
