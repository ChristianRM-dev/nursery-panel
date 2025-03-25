import { render } from '@redwoodjs/testing/web'

import AdminSaleNotesPage from './AdminSaleNotesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminSaleNotesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSaleNotesPage />)
    }).not.toThrow()
  })
})
