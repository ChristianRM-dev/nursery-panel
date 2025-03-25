import { render } from '@redwoodjs/testing/web'

import CatalogPage from './CatalogPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CatalogPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CatalogPage />)
    }).not.toThrow()
  })
})
