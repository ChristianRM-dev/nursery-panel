import type { Meta, StoryObj } from '@storybook/react'

import AdminCategoriesPage from './AdminCategoriesPage'

const meta: Meta<typeof AdminCategoriesPage> = {
  component: AdminCategoriesPage,
}

export default meta

type Story = StoryObj<typeof AdminCategoriesPage>

export const Primary: Story = {}
