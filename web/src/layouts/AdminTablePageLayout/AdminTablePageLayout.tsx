import React, { memo } from 'react';
import { Title, Container } from '@mantine/core';
import { FloatingActionButton } from 'src/components/Shared/FloatingActionButton/FloatingActionButton';

interface AdminTablePageLayoutProps {
  title: string; // Title of the page
  children: React.ReactNode; // Content of the page (e.g., a table)
  onFabClick?: () => void; // Optional callback for the FAB click
}

/**
 * A layout component specifically designed for table-based admin pages.
 * It includes a title, a content area (for the table), and a floating action button (FAB).
 */
export const AdminTablePageLayout: React.FC<AdminTablePageLayoutProps> = memo(({
  title,
  children,
  onFabClick,
}) => {
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
  );
});

export default AdminTablePageLayout;