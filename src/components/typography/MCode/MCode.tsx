import type {MCodeProps} from './MCode.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './MCode.css'

// Render inline code tokens with semantic color support.
export function MCode({color, className, children, ...rest}: MCodeProps) {
    return (
        <code className={cn('code', ...getAppearanceClassNames({color}), className)} {...rest}>
            {children}
        </code>
    )
}
