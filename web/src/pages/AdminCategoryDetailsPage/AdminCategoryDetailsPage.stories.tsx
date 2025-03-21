import type { Meta, StoryObj } from '@storybook/react'

import AdminCategoryDetailsPage from './AdminCategoryDetailsPage'

const meta: Meta<typeof AdminCategoryDetailsPage> = {
  component: AdminCategoryDetailsPage,
}

export default meta

type Story = StoryObj<typeof AdminCategoryDetailsPage>

export const Primary: Story = {}
