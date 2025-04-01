import { render } from '@redwoodjs/testing/web'

import AdminSaleNotePdfPage from './AdminSaleNotePdfPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminSaleNotePdfPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSaleNotePdfPage />)
    }).not.toThrow()
  })
})
