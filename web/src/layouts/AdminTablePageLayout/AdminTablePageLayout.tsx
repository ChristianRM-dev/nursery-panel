// web/src/layouts/AdminTablePageLayout/AdminTablePageLayout.tsx
import React, { memo } from 'react'

import { Title, Container, Group } from '@mantine/core'

import { FloatingActionButton } from 'src/components/Shared/FloatingActionButton/FloatingActionButton'

interface AdminTablePageLayoutProps {
  title: string
  children: React.ReactNode
  onFabClick?: () => void
  actionButtons?: React.ReactNode
}

/**
 * A layout component specifically designed for table-based admin pages.
 * It includes a title, a content area (for the table), and a floating action button (FAB).
 */
export const AdminTablePageLayout: React.FC<AdminTablePageLayoutProps> = memo(
  ({ title, children, onFabClick, actionButtons }) => {
    return (
      <Container size="xl" py="xs">
        {/* Page Title */}
        <Group justify={'space-between'}>
          <Title order={1} mb="xl">
            {title}
          </Title>
          {actionButtons}
        </Group>

        {/* Content Area (Mainly for Tables) */}
        <div>{children}</div>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={onFabClick} />
      </Container>
    )
  }
)

export default AdminTablePageLayout
