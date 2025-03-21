import type { Meta, StoryObj } from '@storybook/react'

import AdminEditCategoryPage from './AdminEditCategoryPage'

const meta: Meta<typeof AdminEditCategoryPage> = {
  component: AdminEditCategoryPage,
}

export default meta

type Story = StoryObj<typeof AdminEditCategoryPage>

export const Primary: Story = {}
