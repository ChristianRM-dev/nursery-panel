import type { Meta, StoryObj } from '@storybook/react'

import AdminCustomersPage from './AdminCustomersPage'

const meta: Meta<typeof AdminCustomersPage> = {
  component: AdminCustomersPage,
}

export default meta

type Story = StoryObj<typeof AdminCustomersPage>

export const Primary: Story = {}
