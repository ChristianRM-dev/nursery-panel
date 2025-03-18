import { render } from '@redwoodjs/testing/web'

import AdminPlantDetailsPage from './AdminPlantDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminPlantDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminPlantDetailsPage id={'42'} />)
    }).not.toThrow()
  })
})
