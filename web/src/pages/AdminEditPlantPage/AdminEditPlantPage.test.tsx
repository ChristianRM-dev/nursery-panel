import { render } from '@redwoodjs/testing/web'

import AdminEditPlantPage from './AdminEditPlantPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminEditPlantPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditPlantPage />)
    }).not.toThrow()
  })
})
