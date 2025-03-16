import { ReactNode } from 'react';

export interface TableColumn<T> {
  field: keyof T;
  header: string;
  formatter?: (value: T[keyof T], row: T) => ReactNode;
}

export enum TableActionType {
  Edit = 'Edit',
  Delete = 'Delete',
  CreateOrderTicket = 'CreateOrderTicket',
}

export interface TableAction {
  type: TableActionType;
  icon: ReactNode;
  tooltip?: string;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  actions: TableAction[];
  searchPlaceholder?: string;
}

export interface TableActionEvent<T> {
  type: TableActionType;
  row: T;
}

export interface TableQuery {
  pagination: { page: number; pageSize: number };
  sort?: { sortField: string; sortOrder: 'asc' | 'desc' };
  search?: { search: string };
}