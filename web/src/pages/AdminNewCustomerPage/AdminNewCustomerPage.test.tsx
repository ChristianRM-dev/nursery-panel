import { render } from '@redwoodjs/testing/web'

import AdminNewCustomerPage from './AdminNewCustomerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewCustomerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewCustomerPage />)
    }).not.toThrow()
  })
})
