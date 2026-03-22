import type {HTMLAttributes} from 'react'
import type {TableCellProps, TableHeadCellProps, TableProps, TableRootProps} from './Table.types'
import {cn} from '../../../utils/cn'
import './Table.css'

// Provide the scroll container and outer surface for semantic table markup.
export function Table({className, children, ...rest}: TableProps) {
    return (
        <div className={cn('table-wrapper', className)} {...rest}>
            {children}
        </div>
    )
}

// Render the actual table element so subcomponents stay semantic.
export function TableRoot({className, children, ...rest}: TableRootProps) {
    return (
        <table className={cn('table', className)} {...rest}>
            {children}
        </table>
    )
}

// Render the table head section.
export function TableHead({className, children, ...rest}: HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead className={cn('head', className)} {...rest}>
            {children}
        </thead>
    )
}

// Render the table body section.
export function TableBody({className, children, ...rest}: HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody className={cn('body', className)} {...rest}>
            {children}
        </tbody>
    )
}

// Render a semantic table row.
export function TableRow({className, children, ...rest}: HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr className={cn('row', className)} {...rest}>
            {children}
        </tr>
    )
}

// Render a semantic header cell.
export function TableHeadCell({className, children, ...rest}: TableHeadCellProps) {
    return (
        <th className={cn('head-cell', className)} {...rest}>
            {children}
        </th>
    )
}

// Render a semantic table data cell.
export function TableCell({className, children, ...rest}: TableCellProps) {
    return (
        <td className={cn('cell', className)} {...rest}>
            {children}
        </td>
    )
}
