import { render } from '@redwoodjs/testing/web'

import AdminPlantsPage from './AdminPlantsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminPlantsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminPlantsPage />)
    }).not.toThrow()
  })
})
