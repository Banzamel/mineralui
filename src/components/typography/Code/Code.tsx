import type {CodeProps} from './Code.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Code.css'

// Render inline code tokens with semantic color support.
export function Code({color, fcolor, className, children, ...rest}: CodeProps) {
    return (
        <code className={cn('code', ...getAppearanceClassNames({color, fcolor}), className)} {...rest}>
            {children}
        </code>
    )
}
