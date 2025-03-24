import { render } from '@redwoodjs/testing/web'

import AdminNewNurseryPage from './AdminNewNurseryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewNurseryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewNurseryPage />)
    }).not.toThrow()
  })
})
