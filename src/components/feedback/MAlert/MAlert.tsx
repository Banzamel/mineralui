import type {MAlertProps} from './MAlert.types'
import {cn} from '../../../utils/cn'
import {getStatusIcon} from '../statusIcons'
import './MAlert.css'

// Render inline status messaging with optional heading content.
export function MAlert({color = 'info', icon = true, title, className, children, ...rest}: MAlertProps) {
    const iconView = icon === false ? null : icon === true ? getStatusIcon(color) : icon

    return (
        <div className={cn('alert', `color-${color}`, className)} role="status" {...rest}>
            {iconView && <span className="icon">{iconView}</span>}
            <div className="main">
                {title && <div className="title">{title}</div>}
                {children && <div className="content">{children}</div>}
            </div>
        </div>
    )
}
