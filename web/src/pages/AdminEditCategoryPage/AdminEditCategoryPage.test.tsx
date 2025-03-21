import { render } from '@redwoodjs/testing/web'

import AdminEditCategoryPage from './AdminEditCategoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditCategoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditCategoryPage />)
    }).not.toThrow()
  })
})
