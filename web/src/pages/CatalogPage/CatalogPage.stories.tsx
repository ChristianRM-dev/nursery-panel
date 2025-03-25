import type { Meta, StoryObj } from '@storybook/react'

import CatalogPage from './CatalogPage'

const meta: Meta<typeof CatalogPage> = {
  component: CatalogPage,
}

export default meta

type Story = StoryObj<typeof CatalogPage>

export const Primary: Story = {}
