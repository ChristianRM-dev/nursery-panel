import { render } from '@redwoodjs/testing/web'

import AdminNewPlantPage from './AdminNewPlantPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewPlantPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewPlantPage />)
    }).not.toThrow()
  })
})
