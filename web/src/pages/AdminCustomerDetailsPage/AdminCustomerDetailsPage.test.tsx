import { render } from '@redwoodjs/testing/web'

import AdminCustomerDetailsPage from './AdminCustomerDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminCustomerDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminCustomerDetailsPage />)
    }).not.toThrow()
  })
})
