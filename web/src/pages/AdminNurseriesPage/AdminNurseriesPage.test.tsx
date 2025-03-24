import { render } from '@redwoodjs/testing/web'

import AdminNurseriesPage from './AdminNurseriesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNurseriesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNurseriesPage />)
    }).not.toThrow()
  })
})
