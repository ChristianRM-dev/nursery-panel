import type { Meta, StoryObj } from '@storybook/react'

import AdminNewCustomerPage from './AdminNewCustomerPage'

const meta: Meta<typeof AdminNewCustomerPage> = {
  component: AdminNewCustomerPage,
}

export default meta

type Story = StoryObj<typeof AdminNewCustomerPage>

export const Primary: Story = {}
