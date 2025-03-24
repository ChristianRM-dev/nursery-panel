import { render } from '@redwoodjs/testing/web'

import AdminNurseryDetailsPage from './AdminNurseryDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNurseryDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNurseryDetailsPage />)
    }).not.toThrow()
  })
})
