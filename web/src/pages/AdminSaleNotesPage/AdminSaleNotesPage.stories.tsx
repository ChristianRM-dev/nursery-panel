import type { Meta, StoryObj } from '@storybook/react'

import AdminSaleNotesPage from './AdminSaleNotesPage'

const meta: Meta<typeof AdminSaleNotesPage> = {
  component: AdminSaleNotesPage,
}

export default meta

type Story = StoryObj<typeof AdminSaleNotesPage>

export const Primary: Story = {}
