import { render } from '@redwoodjs/testing/web'

import AdminCategoryDetailsPage from './AdminCategoryDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminCategoryDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminCategoryDetailsPage />)
    }).not.toThrow()
  })
})
