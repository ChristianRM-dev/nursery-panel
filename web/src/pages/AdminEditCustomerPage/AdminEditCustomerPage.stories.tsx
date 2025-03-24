import type { Meta, StoryObj } from '@storybook/react'

import AdminEditCustomerPage from './AdminEditCustomerPage'

const meta: Meta<typeof AdminEditCustomerPage> = {
  component: AdminEditCustomerPage,
}

export default meta

type Story = StoryObj<typeof AdminEditCustomerPage>

export const Primary: Story = {}
