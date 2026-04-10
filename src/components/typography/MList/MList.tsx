import type {HTMLAttributes} from 'react'
import type {MListProps} from './MList.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './MList.css'

// Render ordered or unordered lists with shared typography tokens.
export function MList({ordered = false, color, className, children, ...rest}: MListProps) {
    const Component = ordered ? 'ol' : 'ul'

    return (
        <Component
            className={cn('list', ordered && 'ordered', ...getAppearanceClassNames({color}), className)}
            {...rest}
        >
            {children}
        </Component>
    )
}

// Render a list item that inherits the parent list styling.
export function MListItem({className, children, ...rest}: HTMLAttributes<HTMLLIElement>) {
    return (
        <li className={cn('item', className)} {...rest}>
            {children}
        </li>
    )
}
