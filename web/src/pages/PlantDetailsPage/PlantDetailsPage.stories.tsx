import type { Meta, StoryObj } from '@storybook/react'

import PlantDetailsPage from './PlantDetailsPage'

const meta: Meta<typeof PlantDetailsPage> = {
  component: PlantDetailsPage,
}

export default meta

type Story = StoryObj<typeof PlantDetailsPage>

export const Primary: Story = {}
