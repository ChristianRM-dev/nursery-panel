import type { Meta, StoryObj } from '@storybook/react'

import AdminPlantDetailsPage from './AdminPlantDetailsPage'

const meta: Meta<typeof AdminPlantDetailsPage> = {
  component: AdminPlantDetailsPage,
}

export default meta

type Story = StoryObj<typeof AdminPlantDetailsPage>

export const Primary: Story = {}
