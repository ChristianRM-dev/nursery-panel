import type { Meta, StoryObj } from '@storybook/react'

import AdminPlantsPage from './AdminPlantsPage'

const meta: Meta<typeof AdminPlantsPage> = {
  component: AdminPlantsPage,
}

export default meta

type Story = StoryObj<typeof AdminPlantsPage>

export const Primary: Story = {}
