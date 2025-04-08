import { render } from '@redwoodjs/testing/web'

import AdminAddPaymentToSaleNotePage from './AdminAddPaymentToSaleNotePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminAddPaymentToSaleNotePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminAddPaymentToSaleNotePage />)
    }).not.toThrow()
  })
})
