import React, { useState } from 'react'
import {
  Table,
  Pagination,
  TextInput,
  ActionIcon,
  Tooltip,
  Box,
  Flex,
} from '@mantine/core'
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react'
import {
  TableActionEvent,
  TableConfig,
  TablePagination,
  TableQuery,
} from './PaginatedTable.types'

// PaginatedTable Component
const PaginatedTable = <T extends { id: number }>({
  data,
  config,
  pagination,
  onAction,
  onQueryChange,
}: {
  data: T[]
  config: TableConfig<T>
  pagination: TablePagination
  onAction: (event: TableActionEvent<T>) => void
  onQueryChange: (query: TableQuery) => void
}) => {
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<string>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Handle page change
  const handlePageChange = (page: number) => {
    onQueryChange({
      pagination: { page, pageSize: pagination.pageSize }, // Only include page and pageSize
      sort: { sortField, sortOrder },
      search: search ? { search } : undefined,
    })
  }

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    onQueryChange({
      pagination: { page: 1, pageSize: pagination.pageSize }, // Reset to page 1 when searching
      sort: { sortField, sortOrder },
      search: { search: event.target.value },
    })
  }

  // Handle sorting
  const handleSort = (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortField(field)
    setSortOrder(newSortOrder)
    onQueryChange({
      pagination: { page: 1, pageSize: pagination.pageSize }, // Reset to page 1 when sorting
      sort: { sortField: field, sortOrder: newSortOrder },
      search: search ? { search } : undefined,
    })
  }

  return (
    <Box>
      {/* Search Input */}
      <TextInput
        placeholder={config.searchPlaceholder || 'Search...'}
        value={search}
        onChange={handleSearchChange}
        mb="md"
      />

      {/* Table */}
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {config.columns.map((column) => (
              <Table.Th
                key={column.field as string}
                onClick={() => handleSort(column.field as string)}
                style={{ cursor: 'pointer' }}
              >
                {column.header}
                {sortField === column.field && (
                  <span style={{ marginLeft: '5px' }}>
                    {sortOrder === 'asc' ? (
                      <IconArrowUp size={14} />
                    ) : (
                      <IconArrowDown size={14} />
                    )}
                  </span>
                )}
              </Table.Th>
            ))}
            {config.actions.length > 0 && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.id}>
              {config.columns.map((column) => (
                <Table.Td key={column.field as string}>
                  {column.formatter
                    ? column.formatter(row[column.field], row)
                    : (row[column.field] as React.ReactNode)}
                </Table.Td>
              ))}
              {config.actions.length > 0 && (
                <Table.Td>
                  {config.actions.map((action) => (
                    <Tooltip label={action.tooltip} key={action.type}>
                      <ActionIcon
                        variant="subtle"
                        onClick={() => onAction({ type: action.type, row })}
                      >
                        {action.icon}
                      </ActionIcon>
                    </Tooltip>
                  ))}
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="center" mt="md">
        <Pagination
          value={pagination.page}
          onChange={handlePageChange}
          total={pagination.totalPages}
          withEdges
        />
      </Flex>
    </Box>
  )
}

export default PaginatedTable
