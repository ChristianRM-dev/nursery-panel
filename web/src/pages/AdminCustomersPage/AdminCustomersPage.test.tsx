import { render } from '@redwoodjs/testing/web'

import AdminCustomersPage from './AdminCustomersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminCustomersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminCustomersPage />)
    }).not.toThrow()
  })
})
