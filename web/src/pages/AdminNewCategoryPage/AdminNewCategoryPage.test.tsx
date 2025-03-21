import { render } from '@redwoodjs/testing/web'

import AdminNewCategoryPage from './AdminNewCategoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewCategoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewCategoryPage />)
    }).not.toThrow()
  })
})
