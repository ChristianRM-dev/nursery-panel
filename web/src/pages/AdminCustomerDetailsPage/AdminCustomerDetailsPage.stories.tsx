import type { Meta, StoryObj } from '@storybook/react'

import AdminCustomerDetailsPage from './AdminCustomerDetailsPage'

const meta: Meta<typeof AdminCustomerDetailsPage> = {
  component: AdminCustomerDetailsPage,
}

export default meta

type Story = StoryObj<typeof AdminCustomerDetailsPage>

export const Primary: Story = {}
