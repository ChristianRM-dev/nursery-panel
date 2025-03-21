import type { Meta, StoryObj } from '@storybook/react'

import AdminNewCategoryPage from './AdminNewCategoryPage'

const meta: Meta<typeof AdminNewCategoryPage> = {
  component: AdminNewCategoryPage,
}

export default meta

type Story = StoryObj<typeof AdminNewCategoryPage>

export const Primary: Story = {}
