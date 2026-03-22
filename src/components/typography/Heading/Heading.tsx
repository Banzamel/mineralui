import {createElement} from 'react'
import type {HeadingProps} from './Heading.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Heading.css'

// Render semantic heading levels with shared MineralUI typography tokens.
export function Heading({level = 2, color, fcolor, className, children, ...rest}: HeadingProps) {
    return createElement(
        `h${level}`,
        {className: cn('heading', `h${level}`, ...getAppearanceClassNames({color, fcolor}), className), ...rest},
        children
    )
}
