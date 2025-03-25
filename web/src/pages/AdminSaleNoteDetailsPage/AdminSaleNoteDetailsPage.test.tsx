import { render } from '@redwoodjs/testing/web'

import AdminSaleNoteDetailsPage from './AdminSaleNoteDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminSaleNoteDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSaleNoteDetailsPage />)
    }).not.toThrow()
  })
})
