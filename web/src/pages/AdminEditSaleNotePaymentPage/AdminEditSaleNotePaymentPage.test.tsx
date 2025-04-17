import { render } from '@redwoodjs/testing/web'

import AdminEditSaleNotePaymentPage from './AdminEditSaleNotePaymentPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditSaleNotePaymentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditSaleNotePaymentPage />)
    }).not.toThrow()
  })
})
