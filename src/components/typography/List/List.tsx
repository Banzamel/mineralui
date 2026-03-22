import type {HTMLAttributes} from 'react'
import type {ListProps} from './List.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './List.css'

// Render ordered or unordered lists with shared typography tokens.
export function List({ordered = false, color, fcolor, className, children, ...rest}: ListProps) {
    const Component = ordered ? 'ol' : 'ul'

    return (
        <Component
            className={cn('list', ordered && 'ordered', ...getAppearanceClassNames({color, fcolor}), className)}
            {...rest}
        >
            {children}
        </Component>
    )
}

// Render a list item that inherits the parent list styling.
export function ListItem({className, children, ...rest}: HTMLAttributes<HTMLLIElement>) {
    return (
        <li className={cn('item', className)} {...rest}>
            {children}
        </li>
    )
}
