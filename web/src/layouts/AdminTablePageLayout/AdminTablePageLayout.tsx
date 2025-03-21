// web/src/layouts/AdminTablePageLayout/AdminTablePageLayout.tsx
import React, { memo } from 'react'

import { Title, Container } from '@mantine/core'

import { FloatingActionButton } from 'src/components/Shared/FloatingActionButton/FloatingActionButton'

interface AdminTablePageLayoutProps {
  title: string
  children: React.ReactNode
  onFabClick?: () => void
}

/**
 * A layout component specifically designed for table-based admin pages.
 * It includes a title, a content area (for the table), and a floating action button (FAB).
 */
export const AdminTablePageLayout: React.FC<AdminTablePageLayoutProps> = memo(
  ({ title, children, onFabClick }) => {
    return (
      <Container size="xl" py="xs">
        {/* Page Title */}
        <Title order={1} mb="xl">
          {title}
        </Title>

        {/* Content Area (Mainly for Tables) */}
        <div>{children}</div>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={onFabClick} />
      </Container>
    )
  }
)

export default AdminTablePageLayout
