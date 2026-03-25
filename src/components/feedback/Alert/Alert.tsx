import type {AlertProps} from './Alert.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Alert.css'

// Render inline status messaging with optional heading content.
export function Alert({color = 'info', fcolor, title, className, children, ...rest}: AlertProps) {
    return (
        <div className={cn('alert', color, ...getAppearanceClassNames({fcolor}), className)} role="status" {...rest}>
            {title && <div className="title">{title}</div>}
            {children && <div className="content">{children}</div>}
        </div>
    )
}
