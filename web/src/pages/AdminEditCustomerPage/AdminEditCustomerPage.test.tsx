import { render } from '@redwoodjs/testing/web'

import AdminEditCustomerPage from './AdminEditCustomerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditCustomerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditCustomerPage />)
    }).not.toThrow()
  })
})
