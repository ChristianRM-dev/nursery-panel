import { render } from '@redwoodjs/testing/web'

import CategoryPlantsPage from './CategoryPlantsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CategoryPlantsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryPlantsPage />)
    }).not.toThrow()
  })
})
