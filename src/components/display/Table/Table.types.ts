import type {HTMLAttributes, ReactNode, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes} from 'react'

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

export interface TableRootProps extends TableHTMLAttributes<HTMLTableElement> {
    children?: ReactNode
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode
}

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode
}
