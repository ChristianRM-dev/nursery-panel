import { render } from '@redwoodjs/testing/web'

import AdminEditNurseryPage from './AdminEditNurseryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditNurseryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditNurseryPage />)
    }).not.toThrow()
  })
})
