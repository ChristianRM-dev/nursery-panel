import { render } from '@redwoodjs/testing/web'

import AdminNewSaleNotePage from './AdminNewSaleNotePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewSaleNotePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewSaleNotePage />)
    }).not.toThrow()
  })
})
