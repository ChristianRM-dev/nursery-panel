import { render } from '@redwoodjs/testing/web'

import AdminSaleNoteReportsPage from './AdminSaleNoteReportsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminSaleNoteReportsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSaleNoteReportsPage />)
    }).not.toThrow()
  })
})
