import { render } from '@redwoodjs/testing/web'

import AdminEditSaleNotePage from './AdminEditSaleNotePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditSaleNotePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditSaleNotePage />)
    }).not.toThrow()
  })
})
