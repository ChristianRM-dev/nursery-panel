import type { Meta, StoryObj } from '@storybook/react'

import CategoryPlantsPage from './CategoryPlantsPage'

const meta: Meta<typeof CategoryPlantsPage> = {
  component: CategoryPlantsPage,
}

export default meta

type Story = StoryObj<typeof CategoryPlantsPage>

export const Primary: Story = {}
