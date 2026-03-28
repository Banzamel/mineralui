import type {AlertProps} from './Alert.types'
import type {ReactNode} from 'react'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {ErrorIcon, InfoIcon, NeutralIcon, SuccessIcon, WarningIcon} from '../../../icons'
import './Alert.css'

const icons: Record<string, ReactNode> = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    danger: <ErrorIcon />,
    info: <InfoIcon />,
    primary: <InfoIcon />,
    neutral: <NeutralIcon />,
}

// Render inline status messaging with optional heading content.
export function Alert({color = 'info', fcolor, icon = true, title, className, children, ...rest}: AlertProps) {
    const iconView = icon === false ? null : icon === true ? (icons[color] ?? icons.info) : icon

    return (
        <div className={cn('alert', color, ...getAppearanceClassNames({fcolor}), className)} role="status" {...rest}>
            {iconView && <span className="icon">{iconView}</span>}
            <div className="main">
                {title && <div className="title">{title}</div>}
                {children && <div className="content">{children}</div>}
            </div>
        </div>
    )
}
