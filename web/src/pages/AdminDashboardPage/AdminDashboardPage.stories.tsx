import type { Meta, StoryObj } from '@storybook/react'

import AdminDashboardPage from './AdminDashboardPage'

const meta: Meta<typeof AdminDashboardPage> = {
  component: AdminDashboardPage,
}

export default meta

type Story = StoryObj<typeof AdminDashboardPage>

export const Primary: Story = {}
